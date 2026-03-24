import React, { useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Briefcase, Users, Zap, FileText, Calendar, X, ChevronDown, Search, SlidersHorizontal, MapPin, Clock, CheckCircle2, XCircle, MessageCircle, Eye, Star, Award, TrendingUp, Layers, Check, Loader2 } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import { JobContext } from '../../Context/JobContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import Footer from '../../Components/Home/Footer';
import ShortlistedCard from '../../Components/ShortlistProposals/ShortlistedCard';
import ShortlistFilterBar from '../../Components/ShortlistProposals/ShortlistFilterBar';
import ShortlistSummaryCards from '../../Components/ShortlistProposals/ShortlistSummaryCards';
import ComparisonModal from '../../Components/ShortlistProposals/ComparisonModal';
import { toast, Toaster } from 'sonner';

const ShortListProposals = () => {
  const { user, loading, token } = useContext(AuthContext);
  const { applications, applicationsLoading, jobs } = useContext(JobContext);
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  
  // New state for API data
  const [shortlistData, setShortlistData] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  // Role protection
  useEffect(() => {
    if (!loading && user) {
      const role = user.role || user.Role || '';
      const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
      if (roleStr !== 'recruiter') navigate('/user-home');
    } else if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  // Fetch Shortlisted Freelance Proposals
  const fetchShortlist = useCallback(async () => {
    if (!token) return;
    setIsFetching(true);
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/shortlist-freelance-proposals', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setShortlistData(data.data || []);
      } else {
        toast.error(data.message || 'Failed to fetch shortlist');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('An error occurred while fetching shortlisted proposals');
    } finally {
      setIsFetching(false);
    }
  }, [token]);

  useEffect(() => {
    fetchShortlist();
  }, [fetchShortlist]);

  if (loading || isFetching) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Analyzing Talent Pool...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      <Toaster position="top-right" richColors />
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="hidden lg:block lg:w-[260px] shrink-0 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto custom-scrollbar">
          <RecruiterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        <main className="flex-1 min-w-0 p-4 md:p-10">
          <div className="max-w-6xl mx-auto space-y-10">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                    <Star className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className="text-[11px] font-black text-teal-600 uppercase tracking-[0.2em]">Talent Analytics</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                  Shortlisted <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Proposals</span>
                </h1>
                <p className="text-slate-500 text-sm mt-3 font-medium">Compare top-tier freelance talent for your active projects.</p>
              </div>
            </div>

            {/* Summary Analytics Cards */}
            <ShortlistSummaryCards 
              shortlistedCount={shortlistData.reduce((acc, curr) => acc + curr.totalProposals, 0)}
              highMatchCount={shortlistData.reduce((acc, curr) => acc + curr.proposals.filter(p => p.matchScore >= 90).length, 0)}
            />

            {/* Filter Bar */}
            <ShortlistFilterBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCount={selectedCandidates.length}
              onCompare={() => setIsCompareOpen(true)}
            />

            {/* Project-wise Proposal Comparison */}
            <div className="space-y-12">
              {shortlistData.length > 0 ? (
                shortlistData.map((item) => {
                  const project = item.freelanceProject;
                  const proposals = item.proposals;

                  return (
                    <div key={project._id} className="space-y-6">
                      {/* Project Banner */}
                      <div className="flex items-center justify-between px-8 py-4 bg-slate-900 rounded-3xl shadow-xl shadow-slate-900/10">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          <div>
                            <h2 className="text-white font-black text-lg tracking-tight">{project.title}</h2>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">{project.companyName}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Project Budget</p>
                            <p className="text-teal-400 font-black text-sm tracking-tight">₹{project.budget.min} - ₹{project.budget.max}</p>
                          </div>
                          <div className="h-10 w-px bg-slate-800" />
                          <div className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                            <Users className="w-4 h-4 text-teal-400" />
                            <span className="text-white font-black text-xs">{item.totalProposals} Proposals</span>
                          </div>
                        </div>
                      </div>

                      {/* Grid of Proposal Cards for this Project */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {proposals.map((proposal, idx) => (
                          <ShortlistedCard 
                            key={proposal._id}
                            proposal={{
                              candidateName: proposal.freelancerId?.Fullname,
                              profilePic: proposal.freelancerId?.profilePic?.trim().replace(/^`|`$/g, ''),
                              matchScore: proposal.matchScore,
                              roleTitle: proposal.freelancerId?.role || "Freelancer",
                              location: proposal.freelancerId?.location || "Remote",
                              experience: proposal.freelancerId?.experience || "N/A",
                              skills: proposal.freelancerId?.skill || [],
                              matchedSkills: project.requiredSkills || []
                            }}
                            proposalNumber={idx + 1}
                            onViewProfile={() => {}}
                            onSchedule={() => {}}
                            onHire={() => {}}
                          />
                        ))}
                      </div>

                      {/* Project Stats Summary (Below Grid) */}
                      <div className="bg-slate-50/50 rounded-[32px] border border-slate-100 p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                          <div className="flex-1 space-y-4">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                              <Layers className="w-4 h-4 text-teal-600" /> Project Brief
                            </h3>
                            <p className="text-sm text-slate-600 font-bold leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap items-center gap-4 shrink-0">
                            <div className="px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                              <Clock className="w-4 h-4 text-teal-500" />
                              <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Duration</p>
                                <p className="text-xs font-black text-slate-900">{project.duration}</p>
                              </div>
                            </div>
                            <div className="px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                              <Award className="w-4 h-4 text-teal-500" />
                              <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
                                <p className="text-xs font-black text-slate-900">{project.experienceLevel}</p>
                              </div>
                            </div>
                            <div className="px-5 py-3 bg-teal-50 rounded-2xl border border-teal-100 shadow-sm flex items-center gap-3">
                              <Zap className="w-4 h-4 text-teal-500" />
                              <div>
                                <p className="text-[9px] font-black text-teal-600 uppercase tracking-widest">Budget</p>
                                <p className="text-xs font-black text-slate-900">₹{project.budget.min}-₹{project.budget.max}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="bg-white rounded-[40px] border border-slate-100 p-24 text-center shadow-xl shadow-slate-200/50">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <Star className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No Shortlisted Proposals</h3>
                  <p className="text-slate-500 max-w-sm mx-auto text-sm font-bold leading-relaxed">
                    You haven't shortlisted any freelance proposals yet. Head over to the Proposals page to start your talent search.
                  </p>
                  <button 
                    onClick={() => navigate('/proposals')}
                    className="mt-8 px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 mx-auto"
                  >
                    <FileText className="w-4 h-4" /> Go to Proposals
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default ShortListProposals;
