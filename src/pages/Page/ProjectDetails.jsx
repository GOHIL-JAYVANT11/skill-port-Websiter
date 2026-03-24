import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import Footer from '../../Components/Home/Footer';
import ProposalModal from '../../Components/Freelancing/ProposalModal';
import { IndianRupee, Clock, Briefcase, Star, ShieldCheck, Building2, Flame, Paperclip, MessageSquare, ArrowLeft, Loader2, Download } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'sonner';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (token && id) {
      fetchProjectDetails();
    }
  }, [id, token]);

  const fetchProjectDetails = async () => {
    try {
      // Corrected to the recruiter namespace where the endpoint is located
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-recruiter/ertqyuiok/get-all-freelance-projects', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('Failed to parse response as JSON:', text.substring(0, 100));
        throw new Error('Invalid JSON response from server');
      }

      if (response.ok && data.success) {
        const foundProject = data.data.find(p => p._id === id);
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
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center mx-auto">
            <Briefcase className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Project Not Found</h2>
          <button 
            onClick={() => navigate('/freelance')}
            className="px-8 py-3 bg-teal-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <button 
          onClick={() => navigate('/freelance')}
          className="flex items-center gap-2 text-slate-400 hover:text-teal-600 transition-all group font-black uppercase tracking-widest text-[10px] mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Content (70%) */}
          <div className="flex-1 w-full space-y-6">
            {/* Project Title & Client Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-bl-2xl flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-white" />
                92% AI Skill Match
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 pr-32 leading-tight">
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
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 uppercase tracking-widest text-[11px]">Project Description</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-widest text-[11px]">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {(project.skillsRequired || project.skills || []).map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-100 uppercase tracking-tight">
                        {typeof skill === 'string' ? skill.replace(/[.,]/g, '').trim() : skill}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]">
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
                        Download <Download className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-slate-900 mb-4 uppercase tracking-widest text-[11px]">Milestone Plan</h3>
                  <div className="space-y-3">
                    {(project.milestonePlan || project.milestones || []).map((milestone, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </div>
                          <p className="text-sm font-bold text-slate-700">{milestone.title || milestone.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-teal-600 flex items-center justify-end gap-1">
                            <IndianRupee className="w-3 h-3" />
                            {(milestone.amount || milestone.budget)?.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{milestone.status || 'Pending'}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>

          {/* Right Sidebar (320px) */}
          <aside className="lg:w-[320px] w-full space-y-6 shrink-0 sticky top-24">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <div className="space-y-5 mb-8">
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

              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 mb-4 uppercase tracking-widest text-xs"
              >
                Submit Proposal
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <MessageSquare className="w-4 h-4" />
                {project.proposalsCount || 0} active proposals
              </div>
            </div>

            {/* Client Confidence Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Client Confidence</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Payment Verified</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase">Funds in Escrow</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Top Client</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase">12 Projects Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <ProposalModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        project={project} 
      />
      
      <Footer />
    </div>
  );
};

export default ProjectDetails;
