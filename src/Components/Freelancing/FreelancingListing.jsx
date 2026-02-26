import React from 'react';
import ProjectCard from './ProjectCard';

const FreelancingListing = () => {
  // Mock data for freelance projects
  const projects = [
    {
      id: 1,
      title: 'Build React Admin Dashboard',
      clientName: 'SkillTech Pvt Ltd',
      budget: '₹45,000 – ₹60,000',
      duration: '2 Months',
      experience: 'Intermediate',
      skills: ['React', 'Tailwind', 'Node.js', 'PostgreSQL'],
      proposalsCount: 14,
      matchPercentage: 92,
      postedTime: '2 hrs ago'
    },
    {
      id: 2,
      title: 'E-commerce Mobile App (Flutter)',
      clientName: 'Innovate Solutions',
      budget: '₹80,000 – ₹1,20,000',
      duration: '3 Months',
      experience: 'Expert',
      skills: ['Flutter', 'Firebase', 'Dart', 'REST API'],
      proposalsCount: 8,
      matchPercentage: 85,
      postedTime: '5 hrs ago'
    },
    {
      id: 3,
      title: 'Landing Page SEO Optimization',
      clientName: 'Growth hackers',
      budget: '₹15,000 – ₹25,000',
      duration: '2 Weeks',
      experience: 'Beginner',
      skills: ['SEO', 'Google Analytics', 'Content Writing'],
      proposalsCount: 22,
      matchPercentage: 78,
      postedTime: '1 day ago'
    },
    {
      id: 4,
      title: 'AI Chatbot Integration',
      clientName: 'Nexus AI',
      budget: '₹50,000 – ₹75,000',
      duration: '1 Month',
      experience: 'Intermediate',
      skills: ['Python', 'OpenAI API', 'React'],
      proposalsCount: 5,
      matchPercentage: 88,
      postedTime: '3 hrs ago'
    }
  ];

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Freelance Projects</h1>
        <p className="text-sm text-slate-500 font-medium">Find high-quality projects matched to your specific skills</p>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default FreelancingListing;
