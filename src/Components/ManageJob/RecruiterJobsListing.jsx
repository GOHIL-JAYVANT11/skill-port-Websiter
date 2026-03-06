import React, { useState, useEffect, useContext } from 'react';
import { ChevronDown, Filter, LayoutGrid, List, SlidersHorizontal, Sparkles } from 'lucide-react';
import RecruiterJobCard from './RecruiterJobCard';
import { AuthContext } from '../../Context/AuthContext';

const RecruiterJobsListing = () => {
  const [sortBy, setSortBy] = useState('Latest');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    // Prevent fetching if already loading or if required data is missing
    if (!token || !user?._id) return;

    const controller = new AbortController();
    const signal = controller.signal;

    // Wrap fetch in a timeout to debounce React Strict Mode double-invocation
    const timeoutId = setTimeout(() => {
        const fetchJobs = async () => {
          try {
            const response = await fetch(`http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-recruiter-jobs?userId=${user._id}`, {
              headers: {
                'Authorization': `Bearer ${token}`
              },
              signal // Pass signal to fetch
            });
            
            if (response.ok) {
              const data = await response.json();
              if (data.success && data.data) {
                // Map API response to job card format
                const mappedJobs = data.data.map(job => ({
                  id: job._id,
                  title: job.jobtitle,
                  status: 'Active', // Defaulting to Active as API doesn't have status field yet
                  experience: job.Experience,
                  salary: job.SalaryType === 'Negotiable' ? 'Negotiable' : `₹${(job.Salary?.minSalary/100000).toFixed(1)}L - ₹${(job.Salary?.maxSalary/100000).toFixed(1)}L PA`,
                  location: `${job.City} (${job.WorkMode})`,
                  applicants: Math.floor(Math.random() * (200 - 10 + 1) + 10), // Mock applicants count
                  matchPercentage: Math.floor(Math.random() * (99 - 60 + 1) + 60), // Mock match %
                  postedTime: new Date(job.createdAt).toLocaleDateString(),
                  skills: job.MandatorySkills?.filter(s => s) || ['React', 'Node.js'], // Filter empty strings
                  industry: job.Industry
                }));
                setJobs(mappedJobs);
              }
            }
          } catch (error) {
            if (error.name !== 'AbortError') {
                console.error('Error fetching recruiter jobs:', error);
            }
          } finally {
            if (!signal.aborted) {
                setLoading(false);
            }
          }
        };

        fetchJobs();
    }, 100); // Small delay to allow cancellation of first call in Strict Mode

    return () => {
        clearTimeout(timeoutId); // Cancel the timeout if unmounted
        controller.abort();
    };
  }, [token, user?._id]); // Only re-run if token or user ID changes, NOT the entire user object

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 ">
       

       
      </div>

      {/* Jobs Cards List */}
      <div className="space-y-6">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <RecruiterJobCard key={job.id} job={job} />
          ))
        ) : (
          <div className="text-center py-12 text-slate-400 font-medium">
            No active job listings found. Post a new job to get started!
          </div>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="mt-12 flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Showing {jobs.length} job listings</p>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 cursor-not-allowed uppercase tracking-widest transition-all">Previous</button>
          <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-teal-600 hover:bg-teal-50 hover:border-teal-200 transition-all shadow-md shadow-teal-500/5 active:scale-95 uppercase tracking-widest">Next Page</button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobsListing;
