import React, { useState, useEffect, useContext } from 'react';
import { Briefcase, MapPin, Bookmark } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RecentJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/get-all-jobs', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          // Map and take only the first 4 jobs
          const mappedJobs = data.data.slice(0, 4).map(job => ({
            _id: job._id,
            jobTitle: job.jobtitle || job.title || job.jobTitle,
            jobType: job.jobType || job.JobType || 'Full Time',
            companyName: job.companyName || job.company || 'Unknown Company',
            companyLogo: job.companyLogo || '',
            location: job.location || (job.City ? `${job.City}, ${job.Country || ''}` : 'Remote'),
            minSalary: job.Salary?.minSalary || job.minSalary,
            maxSalary: job.Salary?.maxSalary || job.maxSalary,
            salary: job.salary || (job.Salary ? `${job.Salary.minSalary}-${job.Salary.maxSalary}` : 'Not disclosed'),
            minExperience: job.Experience?.min || job.minExperience,
            maxExperience: job.Experience?.max || job.maxExperience,
            experience: typeof job.Experience === 'string' ? job.Experience : (job.minExperience ? `${job.minExperience}-${job.maxExperience}` : '0-1 Yrs'),
            description: job.description || job.Description || '',
            skills: job.MandatorySkills || job.skills || []
          }));
          setJobs(mappedJobs);
        }
      } catch (error) {
        console.error('Error fetching recent jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [token]);

  const handleSaveJob = async (e, jobId) => {
    e.stopPropagation();
    if (!token) {
      toast.error('Please login to save jobs');
      return;
    }

    try {
      const response = await fetch(`http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/save-job/${jobId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || 'Job saved successfully');
      } else {
        toast.error(data.message || 'Failed to save job');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      toast.error('Failed to save job');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-48 bg-slate-100 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (jobs.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800">Recent Jobs</h2>
        <button 
          onClick={() => navigate('/jobs')}
          className="text-sm font-medium text-teal-600 hover:text-teal-700 hover:underline"
        >
          View All Jobs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {jobs.map((job) => (
          <div 
            key={job._id}
            onClick={() => navigate(`/jobs/${job._id}`)}
            className="group border border-slate-100 rounded-xl p-4 hover:shadow-md hover:border-teal-100 transition-all duration-300 cursor-pointer bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-800 group-hover:text-teal-600 transition-colors line-clamp-1">
                  {job.jobTitle}
                </h3>
                <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-full">
                  {job.jobType || 'Full Time'}
                </span>
              </div>
              <button
                onClick={(e) => handleSaveJob(e, job._id)}
                className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              >
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1 overflow-hidden shrink-0">
                {job.companyLogo ? (
                  <img src={job.companyLogo} alt={job.companyName} className="w-full h-full object-contain" />
                ) : (
                  <Briefcase className="w-5 h-5 text-slate-300" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-700 truncate">{job.companyName}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{job.location || 'Remote'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3 text-xs text-slate-500 font-medium">
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                <span className="font-bold">₹</span>
                <span>
                  {job.minSalary && job.maxSalary 
                    ? `${job.minSalary} - ${job.maxSalary}`
                    : job.salary || 'Not disclosed'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded">
                <Briefcase className="w-3 h-3" />
                <span>
                  {job.minExperience && job.maxExperience
                    ? `${job.minExperience}-${job.maxExperience} Yrs`
                    : job.experience || '0-1 Yrs'}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
              {job.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {(job.skills || []).slice(0, 3).map((skill, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-slate-50 text-slate-600 text-[10px] font-medium rounded border border-slate-100"
                >
                  {skill}
                </span>
              ))}
              {(job.skills || []).length > 3 && (
                <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-medium rounded border border-slate-100">
                  +{(job.skills || []).length - 3}
                </span>
              )}
            </div>

            <button 
              className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-teal-600 transition-colors"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentJobs;
