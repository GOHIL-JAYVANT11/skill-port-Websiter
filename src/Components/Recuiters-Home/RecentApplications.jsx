import React from 'react';
import { MoreHorizontal, MessageSquare, Calendar, CheckSquare, XCircle, ChevronRight, Zap } from 'lucide-react';

const ApplicationRow = ({ application }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-all group animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white text-lg font-black shadow-lg border-2 border-white overflow-hidden shrink-0 group-hover:scale-110 transition-transform">
          {application.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900 group-hover:text-teal-700 transition-colors">{application.name}</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{application.jobRole}</span>
            <span className="w-1 h-1 bg-slate-200 rounded-full" />
            <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded-md uppercase tracking-wider">{application.experience} Exp</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 sm:gap-6 ml-16 sm:ml-0">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-100">
            <Zap className="w-3.5 h-3.5 fill-amber-500" />
            <span className="text-xs font-black">{application.match}% Match</span>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center min-w-[100px]">
          <span className={`text-[10px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full border ${
            application.status === 'Applied' ? 'text-blue-600 bg-blue-50 border-blue-100' :
            application.status === 'Under Review' ? 'text-amber-600 bg-amber-50 border-amber-100' :
            'text-slate-600 bg-slate-50 border-slate-100'
          }`}>
            {application.status}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all active:scale-90 tooltip" title="Shortlist">
            <CheckSquare className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all active:scale-90 tooltip" title="Message">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all active:scale-90 tooltip" title="Schedule Interview">
            <Calendar className="w-5 h-5" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-90 tooltip" title="Reject">
            <XCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const RecentApplications = () => {
  const applications = [
    {
      id: 1,
      name: 'Alex Rivera',
      jobRole: 'Senior React Developer',
      experience: '6 Years',
      match: 95,
      status: 'Under Review',
    },
    {
      id: 2,
      name: 'Linda Johnson',
      jobRole: 'Full Stack Engineer',
      experience: '4 Years',
      match: 88,
      status: 'Applied',
    },
    {
      id: 3,
      name: 'Robert Smith',
      jobRole: 'Product Designer',
      experience: '5 Years',
      match: 92,
      status: 'Under Review',
    },
    {
      id: 4,
      name: 'Sarah Parker',
      jobRole: 'Backend Developer',
      experience: '3 Years',
      match: 84,
      status: 'Applied',
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden group">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Recent <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Applicants</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Review your latest talent pool</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-black text-teal-600 hover:text-teal-700 transition-colors uppercase tracking-widest group/btn">
          <span>View All</span>
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="divide-y divide-slate-50">
        {applications.map((app) => (
          <ApplicationRow key={app.id} application={app} />
        ))}
      </div>

      <div className="p-4 bg-slate-50 text-center">
        <p className="text-[11px] font-bold text-slate-500">Showing the latest 4 of 124 total applications</p>
      </div>
    </div>
  );
};

export default RecentApplications;
