import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IndianRupee,
  Clock,
  Briefcase,
  Star,
  ShieldCheck,
  Flame,
  Paperclip,
  MessageSquare,
  Building2,
  Download,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import { toast, Toaster } from 'sonner';

const FreelancingPostDetials = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { token, user, loading: authLoading } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      const role = user.role || user.Role || '';
      const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
      if (roleStr !== 'recruiter') navigate('/user-home');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId, token]);

  const fetchProjectDetails = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        'http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-recruiter-freelance-projects',
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      if (response.ok && data.success) {
        const foundProject = data.data.find((p) => p._id === projectId);
        if (foundProject) {
          setProject(foundProject);
        } else {
          toast.error('Project not found');
        }
      } else {
        toast.error(data.message || 'Failed to load project details');
      }
    } catch (error) {
      console.error('Error fetching project details:', error);
      toast.error('An error occurred while fetching details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto">
            <Briefcase className="w-7 h-7 text-slate-300" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Project Not Found</h2>
          <button
            onClick={() => navigate('/recruiter/manage-freelance')}
            className="px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900">
      <Toaster position="top-center" richColors />
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <RecruiterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Page Content */}
        <main className="flex-1 min-w-0 p-4 md:p-8">

          {/* Back Button */}
          <button
            onClick={() => navigate('/recruiter/manage-freelance')}
            className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-all group font-semibold text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </button>

          {/* Two-Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── LEFT: Main Content ── */}
            <div className="flex-1 w-full min-w-0">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">

                {/* AI Match Badge */}
                <div className="absolute top-0 right-0 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-bl-2xl flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  92% AI Skill Match
                </div>

                {/* Title & Client Info */}
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 pr-36 leading-tight">
                  {project.title}
                </h1>
                <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 mb-8">
                  <div className="flex items-center gap-1.5 text-teal-600">
                    <Building2 className="w-4 h-4" />
                    {project.companyName}
                  </div>
                  <span className="opacity-30">•</span>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    4.9 Rating
                  </div>
                </div>

                <div className="space-y-8">

                  {/* Description */}
                  <section>
                    <h3 className="text-base font-bold text-slate-900 mb-3">Project Description</h3>
                    <p className="text-slate-600 leading-relaxed">{project.description}</p>
                  </section>

                  {/* Skills */}
                  <section>
                    <h3 className="text-base font-bold text-slate-900 mb-4">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {(project.skillsRequired || project.skills || []).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-100"
                        >
                          {typeof skill === 'string' ? skill.replace(/[.,]/g, '').trim() : skill}
                        </span>
                      ))}
                    </div>
                  </section>

                  {/* Attachments */}
                  <section>
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-teal-600" />
                      Attachments
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-teal-200 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-red-500 border border-slate-100">
                            <span className="text-[10px] font-bold">PDF</span>
                          </div>
                          <p className="text-xs font-bold text-slate-700">Project_Requirements.pdf</p>
                        </div>
                        <span className="text-[10px] text-slate-400 group-hover:text-teal-600 font-bold uppercase flex items-center gap-1">
                          <Download className="w-3 h-3" /> Download
                        </span>
                      </div>
                    </div>
                  </section>

                  {/* Milestone Plan */}
                  <section>
                    <h3 className="text-base font-bold text-slate-900 mb-4">Milestone Plan</h3>
                    <div className="space-y-3">
                      {(project.milestonePlan || project.milestones || []).map((milestone, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shrink-0">
                              {idx + 1}
                            </div>
                            <p className="text-sm font-bold text-slate-700">{milestone.title || milestone.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-teal-600 flex items-center justify-end gap-0.5">
                              <IndianRupee className="w-3.5 h-3.5" />
                              {(milestone.amount || milestone.budget)?.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                              {milestone.status || 'Pending'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                </div>
              </div>
            </div>

            {/* ── RIGHT: Sidebar ── */}
            <aside className="lg:w-[320px] w-full space-y-5 shrink-0 lg:sticky lg:top-24">

              {/* Stats + Recruiter Actions */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="space-y-5 mb-6">

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
                      <IndianRupee className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        ₹{project.budget?.min} – ₹{project.budget?.max}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Project Budget</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{project.duration}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Project Duration</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                      <Briefcase className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{project.experienceLevel || 'Expert'}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expertise Level</p>
                    </div>
                  </div>
                </div>

                {/* Recruiter-specific buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => navigate(`/recruiter/edit-freelance/${projectId}`)}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all active:scale-95 text-sm"
                  >
                    Edit Posting
                  </button>
                  <button
                    onClick={() => navigate(`/recruiter/proposals/${projectId}`)}
                    className="w-full py-3.5 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 text-sm"
                  >
                    View {project.proposalsCount || 0} Proposals
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 mt-4">
                  <MessageSquare className="w-4 h-4" />
                  {project.proposalsCount || 0} active proposals
                </div>
              </div>

              {/* Client Confidence */}
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Client Confidence
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Payment Verified</p>
                      <p className="text-[10px] text-slate-400 font-medium">Funds in Escrow</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                      <Star className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Top Recruiter</p>
                      <p className="text-[10px] text-slate-400 font-medium">95% Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>

            </aside>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FreelancingPostDetials;