import React, { useState } from 'react';
import { Filter, CheckCheck, ChevronDown, Bell } from 'lucide-react';
import NotificationCard from './NotificationCard';

const NotificationListing = () => {
  const [filter, setFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['All', 'Jobs', 'Applications', 'Interviews', 'Messages', 'Freelance', 'System'];

  const notifications = [
    {
      id: 1,
      type: 'job',
      category: 'Jobs',
      title: 'New job matched your React skills',
      description: 'A Senior Frontend Developer position in Ahmedabad matches 92% of your skills. Apply now to get prioritized.',
      timestamp: '2 hours ago',
      isRead: false,
      match: 92
    },
    {
      id: 2,
      type: 'application',
      category: 'Applications',
      title: 'Your application was shortlisted',
      description: 'Congratulations! Your application for Full Stack Developer at Nexus AI has been shortlisted for the next round.',
      timestamp: '5 hours ago',
      isRead: false
    },
    {
      id: 3,
      type: 'interview',
      category: 'Interviews',
      title: 'Interview scheduled',
      description: 'Your technical interview with SkillTech Pvt Ltd is scheduled for 26 Feb at 3:00 PM. Check your email for the meeting link.',
      timestamp: 'Yesterday',
      isRead: true
    },
    {
      id: 4,
      type: 'message',
      category: 'Messages',
      title: 'New message from ABC Company',
      description: 'The hiring manager from ABC Company sent you a message regarding your recent application.',
      timestamp: 'Yesterday',
      isRead: true
    },
    {
      id: 5,
      type: 'freelance',
      category: 'Freelance',
      title: 'Milestone payment released',
      description: 'Good news! Milestone 2 payment for "Build React Admin Dashboard" has been released from escrow to your wallet.',
      timestamp: '2 days ago',
      isRead: true
    },
    {
      id: 6,
      type: 'system',
      category: 'System',
      title: 'Profile completion alert',
      description: 'Your profile is only 60% complete. Adding your portfolio and education can increase your profile visibility by 3x.',
      timestamp: '3 days ago',
      isRead: true
    }
  ];

  const filteredNotifications = filter === 'All' 
    ? notifications 
    : notifications.filter(n => n.category === filter);

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg shadow-teal-600/20">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">Notifications</h1>
            <p className="text-xs font-bold text-teal-600 uppercase tracking-widest mt-0.5">
              {notifications.filter(n => !n.isRead).length} Unread Updates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mark All as Read */}
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 hover:text-teal-600 transition-all border border-slate-200 rounded-xl bg-white hover:border-teal-200">
            <CheckCheck className="w-4 h-4" />
            Mark all as read
          </button>

          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95 min-w-[120px] justify-between"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5" />
                {filter}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>

            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl z-20 p-1 animate-in fade-in zoom-in duration-200 origin-top-right">
                  {categories.map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => {
                        setFilter(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                        filter === cat 
                          ? 'bg-teal-50 text-teal-600' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Grouping and List */}
      <div className="space-y-8">
        {/* Today Group */}
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-1">Today</h3>
          <div className="space-y-3">
            {filteredNotifications.filter(n => n.timestamp.includes('hours')).length > 0 ? (
              filteredNotifications.filter(n => n.timestamp.includes('hours')).map(n => (
                <NotificationCard key={n.id} notification={n} />
              ))
            ) : (
              <p className="text-xs font-medium text-slate-400 italic py-2 pl-1">No updates for today</p>
            )}
          </div>
        </section>

        {/* Earlier Group */}
        <section>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-1">Earlier</h3>
          <div className="space-y-3">
            {filteredNotifications.filter(n => !n.timestamp.includes('hours')).map(n => (
              <NotificationCard key={n.id} notification={n} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotificationListing;
