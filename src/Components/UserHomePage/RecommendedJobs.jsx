import React, { useContext } from 'react';
import { MapPin, DollarSign, Bookmark, ChevronRight, BrainCircuit } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { JobContext } from '../../Context/JobContext';

const JobCard = ({ job, onOpen }) => {
  return (
    <div
      onClick={onOpen}
      className="min-w-[240px] xs:min-w-[260px] max-w-[280px] bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-teal-100 transition-all group shrink-0 relative overflow-hidden cursor-pointer"
    >
      {/* AI Match Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full border border-teal-100/50">
        <BrainCircuit className="w-3 h-3" />
        <span className="text-[9px] font-black uppercase tracking-wider">{job.match}% Match</span>
      </div>

      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500 shrink-0">
          {job.logo ? (
            <img src={job.logo} alt={job.company} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all" />
          ) : (
            <span className="text-xl font-bold text-slate-400">{job.company?.charAt(0)}</span>
          )}
        </div>
        <div className="flex-1 pr-12 pt-0.5">
          <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 text-sm leading-tight">{job.title}</h4>
          <p className="text-[11px] text-slate-500 font-bold mt-0.5">{job.company}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-[10px] font-bold truncate">{job.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
          <DollarSign className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-[10px] font-bold truncate">{job.salary}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5 h-[44px] overflow-hidden">
        {(job.skills || []).map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-[9px] font-black rounded-md uppercase tracking-wider group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <button className="flex-1 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5">
          Apply Now
        </button>
        <button className="p-2 border border-slate-100 text-slate-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50 rounded-xl transition-all">
          <Bookmark className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {job.isNew && (
        <div className="absolute -left-8 top-3.5 -rotate-45 bg-teal-500 text-white text-[7px] font-black px-10 py-1 uppercase tracking-widest shadow-sm">
          New
        </div>
      )}
    </div>
  );
};

const RecommendedJobs = () => {
  const { jobs: allJobs, loading } = useContext(JobContext);
  const navigate = useNavigate();

  if (loading) return <div className="py-10 text-center text-xs text-slate-400">Loading recommendations...</div>;

  // Map context jobs to local structure and take first 5
  const jobs = allJobs.slice(0, 5).map(job => ({
    ...job,
    company: job.companyName,
    logo: job.companyLogo,
    match: job.matchPercentage,
    skills: job.skills.slice(0, 3)
  }));

  if (jobs.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-5 px-1">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            Recommended jobs for you
            <span className="px-2 py-0.5 bg-teal-50 text-teal-700 text-[9px] font-black rounded-full uppercase tracking-widest border border-teal-100">{jobs.filter(j => j.isNew).length} New</span>
          </h2>
          <p className="text-[11px] text-slate-500 font-bold mt-0.5">Based on your profile strength and preferences</p>
        </div>
        <button className="text-[11px] font-black text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors bg-teal-50 px-3 py-1.5 rounded-full">
          <Link to="/jobs" className="flex items-center gap-1">
          View all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar mask-fade-right">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} onOpen={() => navigate(`/jobs/${job.id}`)} />
        ))}
      </div>
    </section>
  );
};

export default RecommendedJobs;
