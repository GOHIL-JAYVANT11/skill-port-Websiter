import React, { useState, useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import JobCard from './JobCard';
import { JobContext } from '../../Context/JobContext';

const JobsListing = () => {
  const [sortBy, setSortBy] = useState('Latest');
  const { jobs, loading, error } = useContext(JobContext);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading jobs...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error loading jobs: {error}</div>;

  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Explore Jobs</h1>
          <p className="text-sm text-slate-500 font-medium">Showing {jobs.length} total jobs</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Sort by:</span>
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-teal-500 transition-all min-w-[140px] justify-between">
              {sortBy}
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 p-1">
              {['Latest', 'Salary High to Low', 'Match %', 'Experience'].map((option) => (
                <button 
                  key={option}
                  onClick={() => setSortBy(option)}
                  className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-teal-600 rounded-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobsListing;
