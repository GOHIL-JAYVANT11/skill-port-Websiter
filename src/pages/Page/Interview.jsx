import React, { useState } from 'react';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import UserSidebar from '../../Components/UserHomePage/UserSidebar';
import Footer from '../../Components/Home/Footer';
import InterviewCard from '../../Components/Interviews/InterviewCard';
import InterviewHeader from '../../Components/Interviews/InterviewHeader';
import { Calendar, Briefcase, Sparkles, BrainCircuit } from 'lucide-react';

const Interview = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const interviews = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechNova Pvt Ltd',
      logo: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png',
      round: 'Technical Round',
      date: '26 Feb 2026',
      time: '3:00 PM',
      mode: 'Online',
      platform: 'Google Meet',
      status: 'Scheduled',
      aiTip: 'Review React lifecycle methods and Tailwind CSS best practices before the technical round.',
      match: 92
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      company: 'Creative Studio',
      logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968264.png',
      round: 'Final HR Round',
      date: '28 Feb 2026',
      time: '11:00 AM',
      mode: 'Online',
      platform: 'Zoom Video',
      status: 'Scheduled',
      aiTip: 'Be prepared to discuss your design process and case studies from your portfolio.',
      match: 88
    },
    {
      id: 3,
      title: 'Full Stack Engineer',
      company: 'Nexus AI',
      logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968269.png',
      round: 'System Design',
      date: '20 Feb 2026',
      time: '2:00 PM',
      mode: 'Online',
      platform: 'Microsoft Teams',
      status: 'Completed',
      aiTip: 'Great job! You have already completed this round. Feedback is expected within 2 days.',
      match: 95
    },
    {
      id: 4,
      title: 'Backend Developer',
      company: 'SkillTech Solutions',
      logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
      round: 'Coding Challenge',
      date: '15 Feb 2026',
      time: '4:00 PM',
      mode: 'Offline',
      location: 'GIFT City, Gandhinagar, Gujarat',
      status: 'Rescheduled',
      aiTip: 'Practice data structures and algorithms. The venue has been updated to the GIFT City office.',
      match: 85
    }
  ];

  const filteredInterviews = interviews.filter(interview => {
    const matchesTab = activeTab === 'All' || 
                      (activeTab === 'Upcoming' && interview.status === 'Scheduled') ||
                      interview.status === activeTab;
    const matchesSearch = interview.company.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         interview.title.toLowerCase().includes(searchQuery.toLowerCase());
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
            <InterviewHeader 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <div className="grid grid-cols-1 gap-6">
              {filteredInterviews.length > 0 ? (
                filteredInterviews.map((interview) => (
                  <InterviewCard key={interview.id} interview={interview} />
                ))
              ) : (
                <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-2 tracking-tight">No interviews found</h3>
                  <p className="text-sm font-bold text-slate-500 mb-6">We couldn't find any interviews matching your current filter.</p>
                  <button 
                    onClick={() => {setActiveTab('All'); setSearchQuery('');}}
                    className="px-8 py-3 bg-teal-600 text-white font-black rounded-xl text-xs uppercase tracking-widest hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>

            {/* AI Pro-Tip Footer */}
            {/* <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-8 h-8 text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black tracking-tight mb-1">Boost Your Interview Success Rate ✨</h4>
                    <p className="text-sm font-medium text-slate-400">Candidates who research the company and practice mock interviews have a 30% higher success rate.</p>
                  </div>
                </div>
                <button className="px-8 py-4 bg-teal-500 text-white font-black rounded-2xl shadow-xl shadow-teal-500/20 hover:scale-105 transition-all active:scale-95 text-xs uppercase tracking-widest whitespace-nowrap">
                  Start Mock Interview
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Interview;
