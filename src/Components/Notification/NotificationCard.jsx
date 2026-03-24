import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, FileText, Calendar, MessageSquare, Rocket, Shield, Clock, ExternalLink } from 'lucide-react';

const NotificationCard = ({ notification }) => {
  const navigate = useNavigate();

  const getIcon = (type) => {
    switch (type) {
      case 'job': return <Briefcase className="w-5 h-5 text-teal-600" />;
      case 'application': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'interview': return <Calendar className="w-5 h-5 text-amber-600" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-purple-600" />;
      case 'freelance': return <Rocket className="w-5 h-5 text-emerald-600" />;
      case 'system': return <Shield className="w-5 h-5 text-rose-600" />;
      default: return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  const isUnread = !notification.isRead;

  const handleClick = () => {
    if (notification.actionUrl) {
      navigate(notification.actionUrl);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`group relative p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
      isUnread 
        ? 'bg-teal-50/50 border-teal-100 shadow-sm' 
        : 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md'
    }`}>
      {/* Unread Indicator */}
      {isUnread && (
        <div className="absolute top-4 right-4 w-2 h-2 bg-red-500 rounded-full shadow-sm shadow-red-500/50"></div>
      )}

      <div className="flex gap-4">
        {/* Icon Container */}
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${
          isUnread ? 'bg-white shadow-sm' : 'bg-slate-50'
        }`}>
          {getIcon(notification.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
            <h4 className={`text-sm sm:text-base font-bold truncate pr-6 ${
              isUnread ? 'text-slate-900' : 'text-slate-700'
            }`}>
              {notification.title}
            </h4>
            <span className="text-[10px] sm:text-xs font-medium text-slate-400 whitespace-nowrap">
              {notification.timestamp}
            </span>
          </div>
          
          <p className="text-xs sm:text-sm text-slate-500 line-clamp-2 mb-3 leading-relaxed">
            {notification.description}
          </p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              {notification.match && (
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded uppercase tracking-wider">
                  {notification.match}% Match
                </span>
              )}
              <span className={`text-[10px] font-bold uppercase tracking-widest ${
                isUnread ? 'text-teal-600' : 'text-slate-400'
              }`}>
                {notification.category}
              </span>
            </div>
            
            <button className={`flex items-center gap-1.5 text-xs font-bold transition-all ${
              isUnread ? 'text-teal-600 hover:text-teal-700' : 'text-slate-500 hover:text-slate-900'
            }`}>
              View Details
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
