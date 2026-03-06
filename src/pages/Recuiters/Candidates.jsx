import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import CandidateStats from '../../Components/Candidates/CandidateStats';
import CandidateFilterSidebar from '../../Components/Candidates/CandidateFilterSidebar';
import CandidateCard from '../../Components/Candidates/CandidateCard';
import Footer from '../../Components/Home/Footer';
import { PlusCircle, ChevronRight, Sparkles, SlidersHorizontal, ChevronDown, LayoutGrid, List, Search, BrainCircuit, Users } from 'lucide-react';

const Candidates = () => {
  const { user, loading, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Highest Match %');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [isLoadingCandidates, setIsLoadingCandidates] = useState(true);

  // Role Protection
  if (!loading && user) {
    const role = user.role || user.Role || '';
    const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
    if (roleStr !== 'recruiter') {
      navigate('/user-home');
    }
  }

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:4518/gknbvg/SkillPort-admin/ertqyuiok/get-all-users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && data.data.users) {
            // Map API user data to candidate card format
            const mappedCandidates = data.data.users.map(user => ({
              id: user._id,
              name: user.Fullname || 'Unknown Candidate',
              role: user.userstatus || 'Job Seeker', // Fallback role
              experience: 'Fresher', // API doesn't provide experience yet, assuming Fresher/0 years
              match: Math.floor(Math.random() * (99 - 70 + 1) + 70), // Mock match score for demo
              skills: user.skill || ['Communication', 'Teamwork'], // Fallback skills
              salary: 'Negotiable', // API doesn't provide salary expectation
              location: user.location || 'Remote',
              availability: 'Immediate', // Mock availability
              appliedTime: new Date(user.createdAt).toLocaleDateString(),
              isFreelancer: user.Role?.includes('Freelancer'),
              rating: 4.5, // Mock rating
              photo: user.profilePic || user.userimage
            }));
            setCandidates(mappedCandidates);
          }
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setIsLoadingCandidates(false);
      }
    };

    if (token) {
      fetchCandidates();
    }
  }, [token]);

  const handleViewProfile = (candidate) => {
    setSelectedCandidate(candidate);
    setIsDrawerOpen(true);
  };

  if (loading || isLoadingCandidates) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      {/* Top Navbar */}
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Left Sidebar (Filters replacing Navigation Sidebar) */}
        <aside className="hidden lg:block lg:w-[280px] shrink-0">
          <CandidateFilterSidebar />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pr-0">
          <div className="max-w-[1200px] mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 ">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <BrainCircuit className="w-5 h-5 text-teal-600" />
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">Talent Discovery</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                  Discover & Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Candidates</span>
                </h1>
                <p className="text-slate-500 text-sm mt-2 font-medium tracking-tight">Find the best talent using SkillPORT AI matching and skill analytics.</p>
              </div>

              
            </div>

            {/* Main Content Layout: Candidate Listing */}
            <div className="flex flex-col xl:flex-row gap-8">
              <div className="flex-1 min-w-0">
                {/* Sorting & View Options */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  

                  <div className="flex items-center gap-4">
                    

                    <div className="relative group">
                      
                      <div className="absolute right-0 top-full mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2 animate-in fade-in zoom-in-95 duration-200">
                        {['Highest Match %', 'Newest Profiles', 'Experience High to Low', 'Salary Low to High', 'Recently Active'].map((option) => (
                          <button 
                            key={option}
                            onClick={() => setSortBy(option)}
                            className={`w-full text-left px-4 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${
                              sortBy === option ? 'bg-teal-50 text-teal-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Candidate Cards */}
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                  {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                      <CandidateCard 
                        key={candidate.id} 
                        candidate={candidate} 
                        onViewProfile={() => handleViewProfile(candidate)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400 font-medium">No candidates found</div>
                  )}
                </div>

                {/* Pagination Footer */}
                <div className="mt-12 flex items-center justify-between p-6 bg-white border border-slate-100 rounded-3xl shadow-sm">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Showing {candidates.length} Candidates</p>
                  <div className="flex gap-3">
                    <button className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 cursor-not-allowed uppercase tracking-widest transition-all">Previous</button>
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black text-teal-600 hover:bg-teal-50 hover:border-teal-200 transition-all shadow-md shadow-teal-500/5 active:scale-95 uppercase tracking-widest">Next Page</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <Footer />

     

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 h-16 flex items-center justify-around px-4 z-50 shadow-2xl">
        <button className="flex flex-col items-center gap-1 text-teal-600">
          <div className="p-1.5 rounded-xl bg-teal-50">
            <Users className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">Talent</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <BrainCircuit className="w-5 h-5" />
          <span className="text-[10px] font-black uppercase tracking-widest">AI Match</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400">
          <div className="w-6 h-6 rounded-full bg-slate-200 border border-slate-300" />
          <span className="text-[10px] font-black uppercase tracking-widest">Account</span>
        </button>
      </div>
    </div>
  );
};

export default Candidates;
