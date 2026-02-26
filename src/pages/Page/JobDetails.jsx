import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobsHeader from '../../Components/Jobs/JobsHeader';
import JobDetailsHeader from '../../Components/Jobs/JobDetailsHeader';
import JobDetailsContent from '../../Components/Jobs/JobDetailsContent';
import JobDetailsSidebar from '../../Components/Jobs/JobDetailsSidebar';
import Footer from '../../Components/Home/Footer';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data fetching
  useEffect(() => {
    const mockJob = {
      id: id,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Redux', 'Jest'],
      matchPercentage: 95,
      description: "We are looking for a Senior Frontend Developer who is passionate about building great products. You will be working on our core platform and helping us scale our frontend architecture. You will be responsible for leading the frontend team and ensuring high code quality.",
      companyRating: '4.8',
      industry: 'Software & IT',
      companyAbout: "TechFlow Systems is a leading global technology services and solutions provider. We specialize in digital transformation, cloud services, and custom software development. With a team of over 500+ experts, we help businesses across the globe to innovate and scale."
    };

    setTimeout(() => {
      setJob(mockJob);
      setLoading(false);
      window.scrollTo(0, 0);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <JobsHeader onMenuToggle={() => {}} />
      
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
