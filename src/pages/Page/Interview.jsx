import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import UserSidebar from '../../Components/UserHomePage/UserSidebar';
import Footer from '../../Components/Home/Footer';
import InterviewCard from '../../Components/Interviews/InterviewCard';
import InterviewHeader from '../../Components/Interviews/InterviewHeader';
import { Calendar, Briefcase, Sparkles, BrainCircuit, Loader2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';

const Interview = () => {
  const { user, token, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [interviews, setInterviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInterviews = async () => {
      if (!token) return;
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/get-interviews", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json(); 
        if (result.success) {
          setInterviews(result.data);
        } else {
          toast.error(result.message || "Failed to fetch interviews");
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
        toast.error("An error occurred while fetching interviews");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchInterviews();
    }
  }, [token]);

  const filteredInterviews = interviews.filter(interview => {
    const status = interview.status || 'Upcoming';
    const matchesTab = activeTab === 'All' || 
                      (activeTab === 'Upcoming' && status === 'Upcoming') ||
                      status === activeTab;
    
    const companyName = interview.recruiterId?.Fullname || '';
    const jobTitle = interview.jobId?.jobtitle || '';
    
    const matchesSearch = companyName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (authLoading || (isLoading && token)) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
      </div>
    );
  }

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
                  <InterviewCard key={interview._id} interview={interview} />
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
