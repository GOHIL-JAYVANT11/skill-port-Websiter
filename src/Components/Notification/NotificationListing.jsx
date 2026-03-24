import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Filter, CheckCheck, ChevronDown, Bell, Loader2 } from 'lucide-react';
import NotificationCard from './NotificationCard';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'sonner';

const NotificationListing = () => {
  const { token } = useContext(AuthContext);
  const [filter, setFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ['All', 'Jobs', 'Applications', 'Interviews', 'Messages', 'Freelance', 'System'];

  const fetchNotifications = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/notifications', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        // Map API data to component format
        const mappedData = data.data.map(n => ({
          id: n._id,
          title: n.title,
          description: n.message,
          type: n.type.toLowerCase(), // application, job, etc.
          category: n.type === 'APPLICATION' ? 'Applications' : 
                    n.type === 'JOB' ? 'Jobs' : 
                    n.type === 'INTERVIEW' ? 'Interviews' : 
                    n.type === 'MESSAGE' ? 'Messages' : 
                    n.type === 'FREELANCE' ? 'Freelance' : 'System',
          timestamp: n.createdAt,
          isRead: n.isRead,
          actionUrl: n.actionUrl
        }));
        setNotifications(mappedData);
      } else {
        toast.error(data.message || 'Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('An error occurred while fetching notifications');
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const formatTimestamp = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const filteredNotifications = filter === 'All' 
    ? notifications 
    : notifications.filter(n => n.category === filter);

  // Grouping logic
  const isToday = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };

  const todayNotifications = filteredNotifications.filter(n => isToday(n.timestamp));
  const earlierNotifications = filteredNotifications.filter(n => !isToday(n.timestamp));

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin mb-4" />
        <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Syncing Updates...</p>
      </div>
    );
  }

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
            {todayNotifications.length > 0 ? (
              todayNotifications.map(n => (
                <NotificationCard 
                  key={n.id} 
                  notification={{
                    ...n,
                    timestamp: formatTimestamp(n.timestamp)
                  }} 
                />
              ))
            ) : (
              <p className="text-xs font-medium text-slate-400 italic py-2 pl-1">No updates for today</p>
            )}
          </div>
        </section>

        {/* Earlier Group */}
        {earlierNotifications.length > 0 && (
          <section>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-1">Earlier</h3>
            <div className="space-y-3">
              {earlierNotifications.map(n => (
                <NotificationCard 
                  key={n.id} 
                  notification={{
                    ...n,
                    timestamp: formatTimestamp(n.timestamp)
                  }} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NotificationListing;
