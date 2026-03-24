import React, { useState } from 'react';
import { Briefcase, Sparkles, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import MatchedCandidateCard from '../SkillMatch/MatchedCandidateCard';
import ScheduleInterviewModal from '../SkillMatch/ScheduleInterviewModal';
import { useAuth } from '../../Context/AuthContext';
import { toast } from 'sonner';

const JobCandidateMatchPanel = ({ matchData = [], onJoinMeeting }) => {
  const { token } = useAuth();
  const [modalState, setModalState] = useState({
    isOpen: false,
    candidate: null,
    job: null
  });

  const handleOpenModal = (candidate, job) => {
    setModalState({
      isOpen: true,
      candidate,
      job
    });
  };

  const handleCloseModal = () => {
    setModalState({
      isOpen: false,
      candidate: null,
      job: null
    });
  };

  const handleScheduleSubmit = async (formData) => {
    if (!token) {
      toast.error('Session expired. Please login again.');
      return;
    }

    const payload = {
      candidateId: modalState.candidate.userId,
      jobId: modalState.job?._id || modalState.job?.id || modalState.job,
      ...formData
    };

    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/schedule-meeting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Interview scheduled successfully!');
        handleCloseModal();
      } else {
        toast.error(result.message || 'Failed to schedule interview');
      }
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">
              AI Recommended Candidates
            </p>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              See which jobs best fit this profile
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-12">
        {matchData.map((jobGroup, groupIdx) => {
          if (jobGroup.applications.length === 0) return null;

          return (
            <JobGroupRow 
              key={jobGroup.jobPost._id || groupIdx} 
              jobGroup={jobGroup} 
              onSchedule={(candidate) => handleOpenModal(candidate, jobGroup.jobPost)}
              onJoinMeeting={onJoinMeeting}
            />
          );
        })}
        {matchData.every(g => g.applications.length === 0) && (
          <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center">
            <p className="text-slate-500 font-medium italic">No shortlisted applications found for your jobs.</p>
          </div>
        )}
      </div>

      <ScheduleInterviewModal
        isOpen={modalState.isOpen}
        onClose={handleCloseModal}
        onSubmit={handleScheduleSubmit}
        candidateName={modalState.candidate?.name}
        jobTitle={modalState.job?.jobtitle}
      />
    </section>
  );
};

const JobGroupRow = ({ jobGroup, onSchedule, onJoinMeeting }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentApp = jobGroup.applications[currentIndex];
  const totalApps = jobGroup.applications.length;

  const nextApp = () => setCurrentIndex((prev) => (prev + 1) % totalApps);
  const prevApp = () => setCurrentIndex((prev) => (prev - 1 + totalApps) % totalApps);

  // Map API application to MatchedCandidateCard format
  const mappedCandidate = {
    id: currentApp._id,
    userId: currentApp.userId?._id || currentApp.userId, // Safely get userId whether populated or not
    name: currentApp.Fullname || currentApp.userId?.Fullname || 'Unknown Candidate',
    role: currentApp.jobtitle || 'Candidate',
    match: currentApp.matchScore || 0,
    experience: currentApp.Experience || 'Not specified',
    location: currentApp.location || 'Remote',
    salary: currentApp.Salary?.ExpectedSalary ? `₹${currentApp.Salary.ExpectedSalary}` : 'Not disclosed',
    shortlisted: true,
    photo: currentApp.userId?.profilePic,
    skills: {
      matched: currentApp.Skill || [],
      missing: jobGroup.jobPost.MandatorySkills?.filter(s => !(currentApp.Skill || []).includes(s)) || [],
    },
    meetingStatus: currentApp.meetingStatus,
    meetingLink: currentApp.meetingLink,
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6">
      {/* Left: Big Card with Pagination */}
      <div className="xl:flex-[7] min-w-0 flex flex-col gap-4">
        <MatchedCandidateCard 
          candidate={mappedCandidate} 
          onSchedule={onSchedule}
          onJoinMeeting={onJoinMeeting}
        />
        
        {/* Pagination Bottom */}
        {totalApps > 1 && (
          <div className="flex items-center justify-center gap-4 bg-white/50 backdrop-blur-sm rounded-2xl py-2 px-4 border border-slate-100 w-fit mx-auto shadow-sm">
            <button 
              onClick={prevApp}
              className="p-1.5 rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-teal-600 border border-transparent hover:border-teal-100"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-1.5 px-3">
              <span className="text-sm font-black text-teal-600">{currentIndex + 1}</span>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">of</span>
              <span className="text-sm font-black text-slate-400">{totalApps}</span>
            </div>
            <button 
              onClick={nextApp}
              className="p-1.5 rounded-xl hover:bg-white hover:shadow-md transition-all text-slate-400 hover:text-teal-600 border border-transparent hover:border-teal-100"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Right: Small Job Card */}
      <aside className="xl:flex-[3] w-full xl:w-auto">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sticky top-24 space-y-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">
                Matching Job Listings
              </p>
              <h3 className="text-sm font-black text-slate-900 tracking-tight mt-1">
                Candidate's match for your job
              </h3>
            </div>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-teal-100 bg-teal-50/20 hover:bg-white transition-all group">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  {jobGroup.jobPost._id.slice(-6).toUpperCase()}
                </p>
                <p className="text-xs font-black text-slate-900 leading-snug">
                  {jobGroup.jobPost.jobtitle}
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-700 text-[9px] font-black uppercase tracking-widest border border-teal-200">
                {mappedCandidate.match}% Match
              </span>
            </div>

            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <Briefcase className="w-3 h-3" />
                <span>{jobGroup.jobPost.EmploymentType} · {jobGroup.jobPost.Experience} Exp</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <Sparkles className="w-3 h-3" />
                <span>{jobGroup.jobPost.MandatorySkills?.slice(0, 3).join(', ')}</span>
              </div>
            </div>

            <button className="w-full py-2 rounded-xl bg-white border border-slate-200 text-[10px] font-black text-slate-600 uppercase tracking-widest hover:border-teal-500 hover:text-teal-700 transition-all flex items-center justify-center gap-2">
              View job details
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="pt-4 border-t border-dashed border-slate-100">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em]">
              {totalApps} Total Applications for this job
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default JobCandidateMatchPanel;

