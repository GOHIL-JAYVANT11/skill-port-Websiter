import React from 'react';
import { Calendar, Clock, Video, MoreHorizontal, User, Briefcase, CheckCircle2, XCircle, RefreshCw, Trophy, ChevronRight } from 'lucide-react';

const InterviewCard = ({ interview }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 group relative flex flex-col h-full border-l-4 border-l-transparent hover:border-l-teal-500 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/10 transition-colors" />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-blue-700 flex items-center justify-center text-white text-lg font-black shadow-lg border-2 border-white overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
            {interview.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-700 transition-colors">{interview.name}</h4>
            <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <Briefcase className="w-3 h-3" />
              <span>{interview.role}</span>
            </div>
          </div>
        </div>
        <div className="px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 flex items-center gap-1.5 shadow-sm">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px] font-black uppercase tracking-wider">In 2 Hours</span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-5 relative z-10 flex-1">
        <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-black">{interview.date}</span>
        </div>
        <div className="flex items-center gap-2.5 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 group-hover:bg-white transition-colors">
          <Clock className="w-4 h-4 text-blue-500" />
          <span className="text-xs font-black">{interview.time}</span>
        </div>
        <button className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 p-2.5 rounded-xl border border-blue-100 transition-all active:scale-95 group/link">
          <Video className="w-4 h-4" />
          <span className="text-xs font-black">Join Meeting</span>
        </button>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 relative z-10">
        <button className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-teal-600 text-white py-2.5 rounded-2xl text-[10px] font-black transition-all active:scale-95 shadow-md hover:shadow-teal-500/20 group/btn">
          <Trophy className="w-3.5 h-3.5" />
          <span>Hire</span>
        </button>
        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-500 hover:text-blue-600 text-slate-600 py-2.5 rounded-2xl text-[10px] font-black transition-all active:scale-95 group/btn2">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reschedule</span>
        </button>
      </div>
    </div>
  );
};

const UpcomingInterviews = () => {
  const interviews = [
    {
      id: 1,
      name: 'Michael Chen',
      role: 'Full Stack Developer',
      date: 'Oct 24, 2023',
      time: '10:00 AM - 11:00 AM',
    },
    {
      id: 2,
      name: 'Emily Davis',
      role: 'Product Designer',
      date: 'Oct 24, 2023',
      time: '02:30 PM - 03:30 PM',
    },
    {
      id: 3,
      name: 'James Wilson',
      role: 'DevOps Engineer',
      date: 'Oct 25, 2023',
      time: '11:00 AM - 12:00 PM',
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Interviews</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Manage your scheduled meetings</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest group/btn">
          <span>Calendar View</span>
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview) => (
          <InterviewCard key={interview.id} interview={interview} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingInterviews;
