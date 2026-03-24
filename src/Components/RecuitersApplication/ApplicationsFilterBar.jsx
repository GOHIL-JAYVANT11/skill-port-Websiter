import React, { useContext, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { JobContext } from '../../Context/JobContext';

const statusOptions = [
  'All',
  'Under Review',
  'Shortlisted',
  'Interview Scheduled',
  'Rejected',
  'Hired',
];

const ApplicationsFilterBar = () => {
  const { applications } = useContext(JobContext);

  const jobs = useMemo(() => {
    if (!applications) return [];
    const jobMap = new Map();
    applications.forEach(app => {
      const job = app.jobId;
      if (job && job._id) {
        jobMap.set(job._id, job.jobtitle);
      }
    });
    return Array.from(jobMap.entries()).map(([id, title]) => ({ id, title }));
  }, [applications]);

  return (
    <section className="mb-6 bg-white border border-slate-100 rounded-3xl shadow-sm p-4 sm:p-5">
      <div className="flex flex-col gap-4">
        {/* Top row: search + job filter + status */}
        <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
          <div className="flex-1 flex items-center bg-slate-50 rounded-2xl px-3 py-2 border border-slate-100 focus-within:border-teal-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              type="text"
              placeholder="Search by candidate name..."
              className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
            />
          </div>

          <div className="flex flex-1 flex-col sm:flex-row gap-3">
            <select className="flex-1 text-xs sm:text-sm bg-slate-50 border border-slate-100 rounded-2xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/60">
              <option>All Jobs</option>
              {jobs.map(job => (
                <option key={job.id} value={job.id}>{job.title}</option>
              ))}
            </select>

            <select className="flex-1 text-xs sm:text-sm bg-slate-50 border border-slate-100 rounded-2xl px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/60">
              {statusOptions.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Second row: sliders */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">
              Match %
            </p>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="70"
                className="w-full accent-teal-500"
              />
              <span className="text-xs font-bold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg">
                70%+
              </span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">
              Experience
            </p>
            <div className="flex gap-2 flex-wrap">
              {['0-2 Yrs', '3-5 Yrs', '6-9 Yrs', '10+ Yrs'].map((range) => (
                <button
                  key={range}
                  className="px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-600 hover:border-teal-400 hover:text-teal-700 transition-all"
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1">
              Date Applied
            </p>
            <div className="flex gap-2 flex-wrap">
              {['Any time', 'Last 7 days', 'Last 30 days'].map((label, idx) => (
                <button
                  key={label}
                  className={`px-3 py-1.5 rounded-full border text-[11px] font-bold transition-all ${
                    idx === 0
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-400 hover:text-teal-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row: filters + reset */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <button className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Advanced Filters
          </button>

          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-[10px] font-black uppercase tracking-[0.25em] text-slate-600 hover:border-teal-500 hover:text-teal-700 transition-all">
            <RotateCcw className="w-3 h-3" />
            Reset Filters
          </button>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsFilterBar;

