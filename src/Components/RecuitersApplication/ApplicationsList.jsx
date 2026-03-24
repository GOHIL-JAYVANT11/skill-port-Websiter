import React, { useMemo, useState, useContext } from 'react';
import {
  ArrowUpDown,
  Download,
} from 'lucide-react';
import ApplicationCard from './ApplicationCard';
import { JobContext } from '../../Context/JobContext';

const ApplicationsList = ({ onViewProfile }) => {
  const [sortBy, setSortBy] = useState('Newest Application');
  const { applications, applicationsLoading } = useContext(JobContext);

  const mappedApplications = useMemo(() => {
    if (!applications) return [];
    return applications.map(app => ({
      id: app._id,
      candidateId: app.userId?._id,
      jobId: app.jobId?._id,
      candidateName: app.Fullname || app.userId?.Fullname || 'Unknown Candidate',
      roleTitle: app.jobtitle || app.jobId?.jobtitle || 'Unknown Role',
      jobTitle: app.jobId?.jobtitle || 'Unknown Job',
      experience: app.Experience || '0-1 Years',
      matchScore: app.has_required_skill ? 95 : 60, // Mock score for now
      status: app.status || 'Applied',
      appliedDate: app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) : 'N/A',
      applicationStatus: app.status || 'Applied',
      interviewStatus: app.status === 'Applied' ? 'Pending' : app.status,
      shortlistedBy: app.status === 'Shortlisted' ? 'Recruiter' : null,
      skills: app.userId?.skills || [], // If skills exist in userId
      education: app.userId?.education || '',
      certifications: app.userId?.certifications || [],
      profilePic: app.userId?.profilePic || '',
      email: app.userId?.email || '',
      number: app.number || app.userId?.number || '',
      location: app.location || 'Remote',
      resume: app.Resume || '',
      description: app.Description || '',
      salary: app.Salary || {},
      socialLinks: app.SocialLinks || {},
      experienceTimeline: [], // If available
      rating: 4, // Default rating
    }));
  }, [applications]);

  const sorted = useMemo(() => {
    const copy = [...mappedApplications];
    switch (sortBy) {
      case 'Highest Match %':
        copy.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'Experience High to Low':
        copy.sort(
          (a, b) =>
            parseInt(b.experience) - parseInt(a.experience),
        );
        break;
      case 'Recently Active':
      case 'Newest Application':
      default:
        copy.sort(
          (a, b) =>
            new Date(b.appliedDate).getTime() -
            new Date(a.appliedDate).getTime(),
        );
    }
    return copy;
  }, [mappedApplications, sortBy]);

  if (applicationsLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="bg-transparent">
      {/* Header */}
      <div className="px-1 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Applications ({sorted.length})
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mt-1">
            Review, shortlist, and move candidates through your hiring pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] pl-3 pr-7 py-2 rounded-full border border-slate-200 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/60 appearance-none cursor-pointer"
            >
              <option>Newest Application</option>
              <option>Highest Match %</option>
              <option>Experience High to Low</option>
              <option>Recently Active</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white text-[10px] font-black uppercase tracking-[0.25em] text-slate-700 hover:border-teal-500 hover:text-teal-700 transition-all shadow-sm">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-6">
        {sorted.length > 0 ? (
          sorted.map((app) => (
            <ApplicationCard 
              key={app.id} 
              application={app} 
              onViewProfile={onViewProfile} 
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <p className="text-slate-500 font-medium">No applications found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationsList;
