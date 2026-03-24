import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import ManageFreelancingStats from '../../Components/ManageFreelancing/ManageFreelancingStats';
import ProjectCard from '../../Components/ManageFreelancing/ProjectCard';
import { 
  Plus, 
  Search, 
  Filter, 
  Briefcase, 
  Loader2,
  ChevronDown,
  Sparkles,
  LayoutGrid,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';

const ManageFreelnacing = () => {
  const { user, token, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');

  // Role protection
  useEffect(() => {
    if (!authLoading && user) {
      const role = user.role || user.Role || '';
      const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
      if (roleStr !== 'recruiter') {
        navigate('/user-home');
      }
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const fetchProjects = async () => {
    if (!token) return;
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-recruiter-freelance-projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setProjects(data.data || []);
      } else {
        toast.error(data.message || 'Failed to load projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('An error occurred while fetching projects');
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => {
    const title = p.title || '';
    const skills = p.skillsRequired || p.skills || [];
    const matchesSearch = title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         skills.some(s => typeof s === 'string' && s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || (p.status || '').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      <Toaster position="top-center" richColors />
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <RecruiterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pr-0">
          <div className="max-w-[1200px] mx-auto">
            
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-2 bg-teal-100 text-teal-600 rounded-xl">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">Recruiter Dashboard</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                  Freelance <span className="text-teal-600">Projects</span>
                </h1>
                <p className="text-slate-500 font-bold mt-2 text-sm tracking-tight">Manage and track your posted freelance work</p>
              </motion.div>

              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => navigate('/recruiter/post-freelance')}
                className="flex items-center justify-center gap-3 px-8 py-4.5 bg-slate-900 text-white rounded-[2rem] font-black shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all active:scale-95 group uppercase tracking-widest text-[10px]"
              >
                <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                Post New Project
              </motion.button>
            </div>

            {/* Stats Overview */}
            <ManageFreelancingStats projects={projects} />

            {/* Filters & Actions Bar */}
            <div className="flex flex-col lg:flex-row gap-4 mt-10 mb-8 items-stretch lg:items-center">
              <div className="flex-1 relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search by project title or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4.5 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:border-teal-500 transition-all text-slate-900 placeholder:text-slate-400 font-bold shadow-sm"
                />
              </div>

              <div className="flex gap-4">
                <div className="relative group">
                  <Filter className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="pl-12 pr-12 py-4.5 bg-white border border-slate-100 rounded-[2rem] focus:outline-none focus:border-teal-500 transition-all text-slate-900 appearance-none cursor-pointer font-bold shadow-sm min-w-[160px]"
                  >
                    <option value="All">All Status</option>
                    <option value="Open">Open</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                <div className="flex bg-white p-1.5 border border-slate-100 rounded-[2rem] shadow-sm">
                  <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-2xl transition-all ${viewMode === 'grid' ? 'bg-teal-50 text-teal-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-2xl transition-all ${viewMode === 'list' ? 'bg-teal-50 text-teal-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Project Display */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32 gap-6 bg-white/50 rounded-[3rem] border border-slate-50">
                <div className="relative">
                  <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
                  <div className="absolute inset-0 blur-xl bg-teal-500/20 animate-pulse" />
                </div>
                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Syncing projects...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-1 xl:grid-cols-1' : 'grid-cols-1'} gap-8`}>
                <AnimatePresence mode='popLayout'>
                  {filteredProjects.map((project, i) => (
                    <ProjectCard 
                      key={project._id} 
                      project={project} 
                    />
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-32 bg-white rounded-[4rem] border border-dashed border-slate-200 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-8 relative">
                  <div className="absolute inset-0 bg-teal-500/10 rounded-[2rem] animate-ping" />
                  <Briefcase className="w-10 h-10 text-slate-300 relative" />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">No projects found</h2>
                <p className="text-slate-400 font-bold mt-3 max-w-sm text-center leading-relaxed">
                  We couldn't find any freelance projects matching your current filters.
                </p>
                <button 
                  onClick={() => navigate('/recruiter/post-freelance')}
                  className="mt-10 px-10 py-5 bg-teal-600 hover:bg-teal-500 text-white rounded-[2rem] font-black shadow-2xl shadow-teal-600/20 transition-all active:scale-95 flex items-center gap-3 uppercase tracking-widest text-[10px]"
                >
                  <Plus className="w-5 h-5" />
                  Post Your First Project
                </button>
              </motion.div>
            )}
          </div>
        </main>
      </div>


      
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}} />
    </div>
  );
};

export default ManageFreelnacing;

