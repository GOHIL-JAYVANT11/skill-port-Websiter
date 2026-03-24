import React, { useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  MapPin, 
  Briefcase, 
  FileText, 
  Zap, 
  Award, 
  CheckCircle2, 
  Calendar, 
  MessageCircle, 
  Clock, 
  PlusCircle, 
  Loader2 
} from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import Footer from '../../Components/Home/Footer';
import { toast, Toaster } from 'sonner';

// Modular Components
import ProposalStats from '../../Components/Proposals/ProposalStats';
import ProposalCard from '../../Components/Proposals/ProposalCard';
import ProposalHeader from '../../Components/Proposals/ProposalHeader';
import ProposalFilters from '../../Components/Proposals/ProposalFilters';

const Proposal = () => {
  const { user, loading, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [proposals, setProposals] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(null);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedJobId, setSelectedJobId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [isMessagePopupOpen, setIsMessagePopupOpen] = useState(false);

  // Role protection
  useEffect(() => {
    if (!loading && user) {
      const role = user.role || user.Role || '';
      const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
      if (roleStr !== 'recruiter') navigate('/user-home');
    } else if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  // Fetch Proposals
  const fetchProposals = useCallback(async () => {
    if (!token) return;
    setIsFetching(true);
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-freelance-proposals', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setProposals(data.data || []);
      } else {
        toast.error(data.message || 'Failed to fetch proposals');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('An error occurred while fetching proposals');
    } finally {
      setIsFetching(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  // Update Proposal Status
  const handleUpdateStatus = async (proposalId, newStatus) => {
    setIsUpdating(proposalId);
    try {
      const response = await fetch(`http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/update-proposal-status/${proposalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        toast.success(`Proposal ${newStatus} successfully!`);
        // Refresh proposals list
        fetchProposals();
      } else {
        toast.error(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error('An error occurred while updating status');
    } finally {
      setIsUpdating(null);
    }
  };

  // Stats Logic
  const stats = useMemo(() => {
    return {
      total: proposals.length,
      pending: proposals.filter(p => p.status === 'Pending').length,
      accepted: proposals.filter(p => p.status === 'Accepted').length,
      rejected: proposals.filter(p => p.status === 'Rejected').length
    };
  }, [proposals]);

  // Unique Projects for Header
  const uniqueProjects = useMemo(() => {
    const projectMap = new Map();
    proposals.forEach(p => {
      if (p.projectId && !projectMap.has(p.projectId._id)) {
        projectMap.set(p.projectId._id, p.projectId);
      }
    });
    return Array.from(projectMap.values());
  }, [proposals]);

  // Filtered Proposals
  const filteredProposals = useMemo(() => {
    return proposals.filter(p => {
      const matchesTab = activeTab === 'All' || p.status === activeTab;
      const matchesJob = selectedJobId === 'all' || p.projectId?._id === selectedJobId;
      const matchesSearch = p.freelancerId?.Fullname?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           p.freelancerId?.skill?.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesTab && matchesJob && matchesSearch;
    });
  }, [proposals, activeTab, selectedJobId, searchQuery]);

  if (loading || isFetching) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
        <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Syncing Proposals...</p>
      </div>
    );
  }

  const handleViewProfile = (proposal) => {
    setSelectedProposal(proposal);
    setIsDrawerOpen(true);
  };

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
            
            {/* Header Section */}
            <ProposalHeader 
              jobs={uniqueProjects} 
              selectedJobId={selectedJobId} 
              onJobChange={setSelectedJobId} 
            />

            {/* Analytics Section */}
            <ProposalStats stats={stats} />

            {/* Filter & Tabs Section */}
            <ProposalFilters 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />

            {/* Proposals List */}
            <div className="space-y-6">
              {filteredProposals.length > 0 ? (
                filteredProposals.map(proposal => (
                  <ProposalCard 
                    key={proposal._id} 
                    proposal={proposal}
                    onViewProfile={handleViewProfile}
                    onUpdateStatus={handleUpdateStatus}
                    onMessage={(p) => {
                      setSelectedProposal(p);
                      setIsMessagePopupOpen(true);
                    }}
                    isUpdating={isUpdating}
                  />
                ))
              ) : (
                <div className="bg-white rounded-[40px] border border-slate-100 p-24 text-center shadow-xl shadow-slate-200/50">
                  <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <FileText className="w-10 h-10 text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">No Proposals Found</h3>
                  <p className="text-slate-500 max-w-sm mx-auto text-sm font-bold leading-relaxed">
                    We couldn't find any freelance proposals matching your current filters or selected project.
                  </p>
                  <button 
                    onClick={() => navigate('/post-freelance')}
                    className="mt-8 px-8 py-3.5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2 mx-auto"
                  >
                    <PlusCircle className="w-4 h-4" /> Post New Project
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {/* Profile Detail Drawer */}
      {isDrawerOpen && selectedProposal && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-500" onClick={() => setIsDrawerOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-out animate-in slide-in-from-right-full">
            <div className="flex items-center justify-between p-8 border-b border-slate-100">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Proposal Detail</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="p-2.5 hover:bg-slate-100 rounded-xl transition-all group">
                <X className="w-6 h-6 text-slate-400 group-hover:text-slate-900" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              {/* Freelancer Header */}
              <div className="flex items-start gap-8 mb-10">
                <img 
                  src={selectedProposal.freelancerId?.profilePic?.trim().replace(/^`|`$/g, '') || `https://ui-avatars.com/api/?name=${selectedProposal.freelancerId?.Fullname}`} 
                  className="w-28 h-28 rounded-[2rem] object-cover shadow-2xl ring-8 ring-slate-50" 
                  alt="" 
                />
                <div className="space-y-3">
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{selectedProposal.freelancerId?.Fullname}</h3>
                  <p className="text-lg font-black text-teal-600 uppercase tracking-widest">{selectedProposal.freelancerId?.location || 'Remote'}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <Briefcase className="w-4 h-4 text-teal-500" /> Freelancer
                    </span>
                    <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      <Award className="w-4 h-4 text-teal-500" /> Top Choice
                    </span>
                  </div>
                </div>
              </div>

              {/* Proposal Stats Card */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-[2rem] bg-teal-50 border border-teal-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Zap className="w-12 h-12 text-teal-600" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-teal-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-teal-700">Proposed Budget</span>
                  </div>
                  <div className="text-4xl font-black text-teal-900 flex items-center gap-1.5">
                    <IndianRupee className="w-6 h-6" /> {selectedProposal.proposedBudget}
                  </div>
                  <p className="text-[11px] text-teal-700/70 font-bold mt-3 leading-relaxed">
                    This freelancer's bid for the project "{selectedProposal.projectId?.title}".
                  </p>
                </div>
                <div className="p-6 rounded-[2rem] bg-slate-900 border border-slate-800 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                    <Clock className="w-12 h-12 text-white" />
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-teal-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery Timeline</span>
                  </div>
                  <div className="text-4xl font-black text-white">{selectedProposal.deliveryDays} <span className="text-lg text-slate-500">Days</span></div>
                  <p className="text-[11px] text-slate-400 font-bold mt-3 leading-relaxed">
                    Estimated time to complete all project milestones.
                  </p>
                </div>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                    <div className="h-px bg-slate-100 flex-1" /> Cover Letter <div className="h-px bg-slate-100 flex-1" />
                  </h4>
                  <div className="p-8 bg-slate-50/50 rounded-[2rem] border border-slate-100/50 text-slate-700 leading-relaxed font-bold italic shadow-inner">
                    "{selectedProposal.coverLetter}"
                  </div>
                </section>

                <section>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                    <div className="h-px bg-slate-100 flex-1" /> Skill Set <div className="h-px bg-slate-100 flex-1" />
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {selectedProposal.freelancerId?.skill?.map((skill, idx) => (
                      <div key={idx} className="px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest bg-white border border-slate-100 shadow-sm flex items-center gap-2.5 hover:border-teal-500 hover:text-teal-600 transition-all cursor-default">
                        <CheckCircle2 className="w-4 h-4 text-teal-500" />
                        {skill}
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                    <div className="h-px bg-slate-100 flex-1" /> Attachments <div className="h-px bg-slate-100 flex-1" />
                  </h4>
                  {selectedProposal.attachments?.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProposal.attachments.map((file, i) => (
                        <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all group flex items-center gap-4 cursor-pointer">
                          <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText className="w-6 h-6 text-teal-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-black text-slate-900 truncate tracking-tight">Document {i + 1}</p>
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Click to view</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-10 bg-slate-50/50 rounded-[2rem] border-2 border-dashed border-slate-100 text-center">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">No attachments provided</p>
                    </div>
                  )}
                </section>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
              {selectedProposal.status === 'Pending' && (
                <>
                  <button 
                    onClick={() => {
                      handleUpdateStatus(selectedProposal._id, 'Accepted');
                      setIsDrawerOpen(false);
                    }}
                    disabled={isUpdating === selectedProposal._id}
                    className="flex-1 py-5 bg-teal-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-teal-700 shadow-xl shadow-teal-600/20 transition-all active:scale-95 flex items-center justify-center"
                  >
                    {isUpdating === selectedProposal._id ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Accept Proposal'}
                  </button>
                  <button 
                    onClick={() => {
                      handleUpdateStatus(selectedProposal._id, 'Rejected');
                      setIsDrawerOpen(false);
                    }}
                    disabled={isUpdating === selectedProposal._id}
                    className="flex-1 py-5 bg-white border border-rose-100 text-rose-600 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-rose-50 transition-all active:scale-95 flex items-center justify-center"
                  >
                    {isUpdating === selectedProposal._id ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Reject'}
                  </button>
                </>
              )}
              <button 
                onClick={() => setIsMessagePopupOpen(true)}
                className="px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-800 transition-all active:scale-95 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" /> Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Popup (Mock) */}
      {isMessagePopupOpen && selectedProposal && (
        <div className="fixed bottom-10 right-10 z-[110] w-full max-w-sm">
          <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 duration-500">
            <div className="bg-slate-900 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedProposal.freelancerId?.profilePic?.trim().replace(/^`|`$/g, '') || `https://ui-avatars.com/api/?name=${selectedProposal.freelancerId?.Fullname}`} 
                  className="w-10 h-10 rounded-xl object-cover shadow-lg" 
                  alt="" 
                />
                <div>
                  <p className="text-white text-sm font-black tracking-tight">{selectedProposal.freelancerId?.Fullname}</p>
                  <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest">Active Now</p>
                </div>
              </div>
              <button onClick={() => setIsMessagePopupOpen(false)} className="text-slate-400 hover:text-white transition-all hover:rotate-90">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="h-80 bg-slate-50/50 p-6 overflow-y-auto custom-scrollbar space-y-4">
              <div className="bg-white p-4 rounded-3xl rounded-tl-none text-xs font-bold text-slate-600 shadow-sm inline-block max-w-[85%] border border-slate-100 leading-relaxed">
                Hi {selectedProposal.freelancerId?.Fullname}, I've reviewed your proposal for "{selectedProposal.projectId?.title}".
              </div>
              <div className="bg-teal-600 p-4 rounded-3xl rounded-tr-none text-xs font-bold text-white shadow-lg shadow-teal-600/10 inline-block max-w-[85%] ml-[15%] leading-relaxed">
                Your portfolio looks impressive. Can we discuss the delivery timeline?
              </div>
            </div>
            <div className="p-6 bg-white border-t border-slate-100">
              <div className="relative">
                <input type="text" placeholder="Type your message..." className="w-full pl-6 pr-14 py-4 bg-slate-50 border-transparent rounded-2xl text-[11px] font-black focus:bg-white focus:ring-4 focus:ring-teal-500/5 transition-all outline-none" />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20 active:scale-95">
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
      `}} />
    </div>
  );
};

export default Proposal;
