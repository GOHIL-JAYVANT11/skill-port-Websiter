import React, { useState } from 'react';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import UserSidebar from '../../Components/UserHomePage/UserSidebar';
import Footer from '../../Components/Home/Footer';
import ApplicationCard from '../../Components/MyApplication/ApplicationCard';
import ApplicationHeader from '../../Components/MyApplication/ApplicationHeader';

const MyApplication = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const applications = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechNova Pvt Ltd',
      logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      location: 'Ahmedabad, IN',
      salary: '₹12–18 LPA',
      experience: '3–5 Years',
      appliedDate: '12 Feb 2026',
      status: 'Shortlisted',
      match: 92,
      aiInsight: 'Matched because of React, Tailwind CSS, and Node.js skills.',
      recruiterActivity: 'Recruiter viewed your profile 2 days ago'
    },
    {
      id: 2,
      title: 'Full Stack Engineer (React/Node)',
      company: 'Nexus AI',
      logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968269.png',
      location: 'Bangalore, IN',
      salary: '₹18–25 LPA',
      experience: '4+ Years',
      appliedDate: '15 Feb 2026',
      status: 'Interview',
      match: 88,
      aiInsight: 'Strong match for Node.js backend architecture. Add MongoDB to reach 95%.',
      recruiterActivity: 'Hiring Manager messaged you yesterday',
      interviewDetails: {
        date: '26 Feb 2026',
        time: '3:00 PM',
        link: 'https://zoom.us/j/123456789'
      }
    },
    {
      id: 3,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968264.png',
      location: 'Remote',
      salary: '₹8–12 LPA',
      experience: '2–4 Years',
      appliedDate: '10 Feb 2026',
      status: 'Pending',
      match: 75,
      aiInsight: 'Portfolio matches brand design requirements. Complete Figma certification to boost.',
      recruiterActivity: 'Application submitted'
    },
    {
      id: 4,
      title: 'Backend Developer',
      company: 'SkillTech Pvt Ltd',
      logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
      location: 'Ahmedabad, IN',
      salary: '₹10–15 LPA',
      experience: '3+ Years',
      appliedDate: '05 Feb 2026',
      status: 'Rejected',
      match: 65,
      aiInsight: 'Missing required experience in AWS deployment and microservices.',
      recruiterActivity: 'Decision made 1 week ago'
    },
    {
      id: 5,
      title: 'Software Engineer Intern',
      company: 'InnoTech Solutions',
      logo: 'https://cdn-icons-png.flaticon.com/512/732/732172.png',
      location: 'Ahmedabad, IN',
      salary: '₹30k/mo',
      experience: 'Fresher',
      appliedDate: '20 Feb 2026',
      status: 'Hired',
      match: 95,
      aiInsight: 'Perfect match for academic projects and skill assessment score.',
      recruiterActivity: 'Onboarding in progress'
    }
  ];

  const filteredApplications = applications.filter(app => {
    const matchesTab = activeTab === 'All' || app.status === activeTab;
    const matchesSearch = app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         app.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <main className="pt-24 pb-12 max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Sidebar */}
          <aside className="hidden lg:block lg:w-[260px] shrink-0">
            <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 w-full space-y-8">
            <ApplicationHeader 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              searchQuery={searchQuery}
              setSearchType={setSearchQuery}
            />

            <div className="space-y-6">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <ApplicationCard key={app.id} application={app} />
                ))
              ) : (
                <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Briefcase className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">No applications found</h3>
                  <p className="text-sm font-bold text-slate-500 mb-6">We couldn't find any applications matching your current filter.</p>
                  <button 
                    onClick={() => {setActiveTab('All'); setSearchQuery('');}}
                    className="px-8 py-3 bg-teal-600 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MyApplication;
