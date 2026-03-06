import React, { useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import JobDetailsHeader from '../../Components/Jobs/JobDetailsHeader';
import JobDetailsContent from '../../Components/Jobs/JobDetailsContent';
import JobDetailsSidebar from '../../Components/Jobs/JobDetailsSidebar';
import Footer from '../../Components/Home/Footer';
import { AuthContext } from '../../Context/AuthContext';
import { JobContext } from '../../Context/JobContext';

const JobDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { jobs, loading } = useContext(JobContext);
  const isRecruiter = user?.role?.toLowerCase() === 'recruiter' || user?.Role?.[0]?.toLowerCase() === 'recruiter';

  const job = useMemo(() => jobs.find(j => String(j.id) === String(id)), [jobs, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
        {isRecruiter ? (
          <RecruiterNavbar onMenuToggle={() => {}} />
        ) : (
          <UserNavbar onMenuToggle={() => {}} />
        )}
        <main className="flex-1 max-w-[1280px] mx-auto px-4 sm:px-6 py-16">
          <div className="bg-white border border-slate-100 rounded-xl p-8 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Job not found</h2>
            <p className="text-slate-500">The job you are looking for may have been removed or is unavailable.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {isRecruiter ? (
        <RecruiterNavbar onMenuToggle={() => {}} />
      ) : (
        <UserNavbar onMenuToggle={() => {}} />
      )}
      
      {/* Sticky Job Header */}
      <JobDetailsHeader job={job} />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Content (70%) */}
          <div className="flex-1 lg:max-w-[calc(100%-340px)] w-full">
            <JobDetailsContent job={job} />
          </div>

          {/* Right Sidebar (300px fixed width for stability) */}
          <div className="lg:w-[320px] w-full shrink-0">
            <JobDetailsSidebar job={job} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JobDetails;
