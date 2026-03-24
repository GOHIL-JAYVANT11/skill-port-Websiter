import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import UserSidebar from '../../Components/UserHomePage/UserSidebar';
import Footer from '../../Components/Home/Footer';
import ApplicationCard from '../../Components/MyApplication/ApplicationCard';
import ApplicationHeader from '../../Components/MyApplication/ApplicationHeader';
import { AuthContext } from '../../Context/AuthContext';

const MyApplication = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const isRecruiter = user?.role?.toLowerCase() === 'recruiter' || user?.Role?.[0]?.toLowerCase() === 'recruiter';

  useEffect(() => {
    if (isRecruiter) {
      navigate('/recruiter-home');
    }
  }, [isRecruiter, navigate]);

  const fetchApplications = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/get-my-applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (result.success) {
        setApplications(result.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [token]);

  const filteredApplications = applications.filter(app => {
    const matchesTab = activeTab === 'All' || app.status === activeTab;
    const matchesSearch = (app.jobtitle || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
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
            <ApplicationHeader 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              searchQuery={searchQuery}
              setSearchType={setSearchQuery}
            />

            <div className="space-y-6">
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <ApplicationCard key={app._id} application={app} />
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
