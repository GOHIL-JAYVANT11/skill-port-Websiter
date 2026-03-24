import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarView = ({ interviews = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: daysInMonth(currentDate) }, (_, i) => i + 1);
  const padding = Array.from({ length: firstDayOfMonth(currentDate) }, (_, i) => i);

  const getInterviewsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    // Simple check: assuming interview.date is in YYYY-MM-DD or similar
    // For demo, let's just return matches
    return interviews.filter(i => {
      // Basic normalization for date comparison
      const iDate = new Date(i.date);
      return iDate.getDate() === day && 
             iDate.getMonth() === currentDate.getMonth() && 
             iDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return 'bg-amber-500';
      case 'Completed': return 'bg-emerald-500';
      case 'Cancelled': return 'bg-rose-500';
      case 'Rescheduled': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="bg-white rounded-[40px] p-8 shadow-sm border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <CalendarIcon className="w-6 h-6 text-teal-600" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
            Browse interviews by date
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={prevMonth}
            className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 hover:bg-white hover:text-teal-600 hover:border-teal-100 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-3 bg-slate-50 text-slate-400 rounded-2xl border border-slate-100 hover:bg-white hover:text-teal-600 hover:border-teal-100 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-4">
        {padding.map(p => <div key={`pad-${p}`} />)}
        {days.map(day => {
          const dayInterviews = getInterviewsForDate(day);
          const isToday = new Date().getDate() === day && 
                         new Date().getMonth() === currentDate.getMonth() && 
                         new Date().getFullYear() === currentDate.getFullYear();
          
          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
              className={`aspect-square rounded-[24px] border p-2 flex flex-col items-center justify-center relative transition-all duration-300
                ${isToday 
                  ? 'bg-teal-50 border-teal-200 ring-4 ring-teal-500/5 shadow-lg shadow-teal-500/10' 
                  : 'bg-white border-slate-50 hover:border-teal-100 hover:shadow-md'}`}
            >
              <span className={`text-sm font-black transition-colors ${isToday ? 'text-teal-700' : 'text-slate-700'}`}>
                {day}
              </span>
              
              <div className="flex flex-wrap justify-center gap-1 mt-1.5 max-w-full">
                {dayInterviews.map((i, idx) => (
                  <div 
                    key={idx} 
                    className={`w-1.5 h-1.5 rounded-full ${getStatusColor(i.status)}`} 
                  />
                ))}
              </div>

              {dayInterviews.length > 0 && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-teal-500 rounded-full border border-white" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Selected Day Info */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedDate.toDateString()}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 pt-10 border-t border-slate-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-sm font-black text-slate-900 tracking-tight uppercase">
              Interviews for {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h4>
            <span className="px-3 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-full uppercase">
              {getInterviewsForDate(selectedDate.getDate()).length} Scheduled
            </span>
          </div>

          <div className="space-y-3">
            {getInterviewsForDate(selectedDate.getDate()).length > 0 ? (
              getInterviewsForDate(selectedDate.getDate()).map((i, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:border-teal-100 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center font-black text-teal-600 text-xs">
                      {i.time.split(':')[0]}:{i.time.split(':')[1]}
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">{i.candidateName}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">{i.jobTitle}</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(i.status)}`} />
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-slate-50 rounded-[32px] border border-dashed border-slate-200">
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest italic">No interviews scheduled for this day</p>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CalendarView;
