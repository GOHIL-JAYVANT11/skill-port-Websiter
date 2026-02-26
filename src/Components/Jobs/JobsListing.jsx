import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import JobCard from './JobCard';

const JobsListing = () => {
  const [sortBy, setSortBy] = useState('Latest');
  
  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 1,
      title: 'Senior Frontend Developer (React)',
      companyName: 'TechFlow Systems',
      companyLogo: '', 
      companyRating: '4.8',
      location: 'Remote, Bangalore',
      salary: '₹18L - ₹25L PA',
      experience: '3-5 Yrs',
      postedTime: '2 hrs ago',
      skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
      matchPercentage: 95,
      industry: 'Fintech'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      companyName: 'Nexus AI',
      companyLogo: '',
      companyRating: '4.5',
      location: 'Hybrid, Mumbai',
      salary: '₹12L - ₹18L PA',
      experience: '1-3 Yrs',
      postedTime: '5 hrs ago',
      skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
      matchPercentage: 82,
      industry: 'AI Research'
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      companyName: 'Creative Pulse',
      companyLogo: '',
      companyRating: '4.2',
      location: 'Onsite, Pune',
      salary: '₹8L - ₹12L PA',
      experience: '2-4 Yrs',
      postedTime: '1 day ago',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      matchPercentage: 78,
      industry: 'E-commerce'
    },
    {
      id: 4,
      title: 'Backend Developer (Python)',
      companyName: 'DataCrunch Solutions',
      companyLogo: '',
      companyRating: '4.6',
      location: 'Remote',
      salary: '₹20L - ₹30L PA',
      experience: '5+ Yrs',
      postedTime: '3 hrs ago',
      skills: ['Python', 'Django', 'PostgreSQL', 'Redis'],
      matchPercentage: 88,
      industry: 'Data Analytics'
    }
  ];

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
                  className="w-full text-left px-4 py-2 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-600 rounded-lg transition-colors"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} isLoggedIn={true} />
        ))}
      </div>
    </div>
  );
};

export default JobsListing;
