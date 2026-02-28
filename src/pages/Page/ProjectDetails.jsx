import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import Footer from '../../Components/Home/Footer';
import ProposalModal from '../../Components/Freelancing/ProposalModal';
import { IndianRupee, Clock, Briefcase, Star, ShieldCheck, Building2, Flame, Paperclip, MessageSquare } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Mock data fetching
    const mockProject = {
      id: id,
      title: 'Build React Admin Dashboard',
      clientName: 'SkillTech Pvt Ltd',
      budget: '₹45,000 – ₹60,000',
      duration: '2 Months',
      experience: 'Intermediate',
      skills: ['React', 'Tailwind', 'Node.js', 'PostgreSQL', 'Chart.js', 'Firebase Auth'],
      proposalsCount: 14,
      matchPercentage: 92,
      postedTime: '2 hrs ago',
      description: "We are seeking a talented React developer to build a comprehensive admin dashboard for our internal recruitment tool. The dashboard should include features like user management, data visualization (charts), and real-time notifications.",
      milestones: [
        { title: 'UI/UX Design & Prototyping', amount: '₹10,000', status: 'Pending' },
        { title: 'Frontend Core Implementation', amount: '₹20,000', status: 'Pending' },
        { title: 'API Integration & Testing', amount: '₹15,000', status: 'Pending' },
      ],
      clientRating: 4.9,
      clientProjectsCount: 12,
      paymentVerified: true
    };

    setTimeout(() => {
      setProject(mockProject);
      setLoading(false);
      window.scrollTo(0, 0);
    }, 300);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <UserNavbar onMenuToggle={() => {}} />
      
      <main className="pt-24 pb-12 max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Content (70%) */}
          <div className="flex-1 w-full space-y-6">
            {/* Project Title & Client Info */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              {project.matchPercentage >= 70 && (
                <div className="absolute top-0 right-0 px-4 py-2 bg-emerald-500 text-white text-xs font-bold rounded-bl-2xl flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 fill-white" />
                  {project.matchPercentage}% AI Skill Match
                </div>
              )}
              
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4 pr-32 leading-tight">
                {project.title}
              </h1>
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-500 mb-8">
                <div className="flex items-center gap-1.5 text-teal-600">
                  <Building2 className="w-4 h-4" />
                  {project.clientName}
                </div>
                <span className="opacity-30">•</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  {project.clientRating} Rating
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Project Description</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-base font-bold text-slate-900 mb-4">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.skills.map((skill, index) => (
                      <span key={index} className="px-4 py-2 bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-100">
                        {skill}
                      </span>
                    ))}
                  </div>
                </section>

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
                      <span className="text-[10px] text-slate-400 group-hover:text-teal-600 font-bold uppercase">Download</span>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-base font-bold text-slate-900 mb-4">Milestone Plan</h3>
                  <div className="space-y-3">
                    {project.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-xl">
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 bg-teal-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                            {idx + 1}
                          </div>
                          <p className="text-sm font-bold text-slate-700">{milestone.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-teal-600">{milestone.amount}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{milestone.status}</p>
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
                    <p className="text-sm font-bold text-slate-900">{project.budget}</p>
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
                    <p className="text-sm font-bold text-slate-900">{project.experience}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Expertise Level</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 mb-4"
              >
                Submit Proposal
              </button>
              
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                <MessageSquare className="w-4 h-4" />
                {project.proposalsCount} active proposals
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
                    <p className="text-[10px] text-slate-400 font-medium">Funds in Escrow</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center">
                    <Star className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Top Client</p>
                    <p className="text-[10px] text-slate-400 font-medium">{project.clientProjectsCount} Projects Completed</p>
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
