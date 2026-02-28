import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
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
      location: 'Ahmedabad, Gujarat (Remote)',
      salary: '₹12L - ₹18L per year',
      experience: '3-5 Years',
      jobType: 'Full-time',
      postedAt: '2 days ago',
      applications: 142,
      description: `
        ### About the Role
        We are looking for a passionate Senior Frontend Developer to join our growing team. You will be responsible for building high-quality, scalable web applications using React.js and modern frontend technologies.

        ### Responsibilities
        - Develop new user-facing features using React.js
        - Build reusable components and frontend libraries for future use
        - Optimize applications for maximum speed and scalability
        - Collaborate with back-end developers and web designers to improve usability
        - Ensure high quality graphic standards and brand consistency

        ### Requirements
        - 3+ years of professional experience with React.js
        - Proficiency in JavaScript, including DOM manipulation and the JavaScript object model
        - Experience with state management libraries like Redux or Context API
        - Knowledge of modern authorization mechanisms, such as JSON Web Token
        - Familiarity with modern frontend build pipelines and tools
        - Ability to understand business requirements and translate them into technical requirements
      `,
      skills: ['React', 'JavaScript', 'TypeScript', 'Redux', 'Tailwind CSS'],
      benefits: ['Remote Work', 'Health Insurance', 'Flexible Hours', 'Learning Stipend'],
      companyInfo: 'TechFlow Systems is a leading software solutions provider focused on building innovative digital products for global clients.'
    };

    setTimeout(() => {
      setJob(mockJob);
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onMenuToggle={() => {}} />
      
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
