import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import Footer from '../../Components/Home/Footer';
import {
    PlusCircle,
    Trash2,
    Plus,
    Briefcase,
    DollarSign,
    Clock,
    Layers,
    Code2,
    Building2,
    FileText,
    Loader2,
    ShieldCheck ,
    X,
    ChevronDown,
    IndianRupee,
    CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { apiCall, PAYMENT_API_BASE_URL, RECRUITER_API_BASE_URL } from '../../utils/api';

const FreelancingPost = () => {
    const { user, token, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [formData, setFormData] = useState({
        companyName: user?.companyProfile?.companyName || '',
        title: '',
        description: '',
        skillsRequired: [],
        budget: { min: '', max: '' },
        duration: '',
        experienceLevel: 'Entry',
        milestonePlan: [{ title: '', amount: '' }]
    });

    const [currentSkill, setCurrentSkill] = useState('');

    // Razorpay script is already loaded in index.html

    // Role protection – only recruiter
    useEffect(() => {
        if (!authLoading && user) {
            const role = user.role || user.Role || '';
            const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
            if (roleStr !== 'recruiter') navigate('/user-home');
        } else if (!authLoading && !user) navigate('/login');
    }, [user, authLoading, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleBudgetChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            budget: { ...prev.budget, [name]: value }
        }));
    };

    const addSkill = (e) => {
        if (e.key === 'Enter' && currentSkill.trim()) {
            e.preventDefault();
            if (!formData.skillsRequired.includes(currentSkill.trim())) {
                setFormData(prev => ({
                    ...prev,
                    skillsRequired: [...prev.skillsRequired, currentSkill.trim()]
                }));
            }
            setCurrentSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData(prev => ({
            ...prev,
            skillsRequired: prev.skillsRequired.filter(skill => skill !== skillToRemove)
        }));
    };

    const addMilestone = () => {
        setFormData(prev => ({
            ...prev,
            milestonePlan: [...prev.milestonePlan, { title: '', amount: '' }]
        }));
    };

    const removeMilestone = (index) => {
        if (formData.milestonePlan.length > 1) {
            setFormData(prev => ({
                ...prev,
                milestonePlan: prev.milestonePlan.filter((_, i) => i !== index)
            }));
        }
    };

    const handleMilestoneChange = (index, field, value) => {
        const updatedMilestones = [...formData.milestonePlan];
        updatedMilestones[index][field] = value;
        setFormData(prev => ({
            ...prev,
            milestonePlan: updatedMilestones
        }));
    };

    const createProject = async () => {
        try {
            const payload = {
                ...formData,
                budget: {
                    min: Number(formData.budget.min),
                    max: Number(formData.budget.max)
                },
                milestonePlan: formData.milestonePlan.map(m => ({
                    title: m.title,
                    amount: Number(m.amount)
                }))
            };

            const response = await fetch(`${RECRUITER_API_BASE_URL}/create-freelance-project`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                setShowSuccessModal(true);
                setTimeout(() => navigate('/recruiter-home'), 3000);
            } else {
                toast.error(data.message || 'Failed to post freelance project');
            }
        } catch (error) {
            toast.error('Project creation failed but payment was successful. Please contact support.');
            console.error('Project creation error:', error);
        }
    };

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        
        // Basic Validation
        if (!formData.title || !formData.description || !formData.budget.min || !formData.budget.max) {
            toast.error('Please fill in all required fields.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Generate a temporary ID or use a placeholder since the project is created AFTER payment
            // The backend requires freelanceProjectId for the 'FREELANCE' postType
            const tempProjectId = "65f1a2b3c4d5e6f7a8b9c0d1"; // A valid-looking MongoDB ObjectId placeholder

            // 1. Create Payment Record and Get Order
            const paymentResponse = await apiCall(`${PAYMENT_API_BASE_URL}/create-record`, {
                method: 'POST',
                body: JSON.stringify({
                    recruiterId: user._id || user.id,
                    postType: "FREELANCE",
                    freelanceProjectId: tempProjectId,
                    totalAmount: 500 // Using the field name requested by backend error message
                })
            }, token);

            console.log('Payment API Response:', paymentResponse);

            // Extract Order ID with high flexibility
            // Based on your backend response, the Order ID is NOT present.
            // We will use the record _id if order_id is missing, or Razorpay will generate one.
            const orderId = paymentResponse.data?.razorpay_order_id || 
                            paymentResponse.razorpay_order_id ||
                            paymentResponse.data?.order_id ||
                            paymentResponse.order?.id ||
                            paymentResponse.data?._id; // Fallback to record ID

            // Extract Amount (default to 50000 paise if not found)
            const amount = (paymentResponse.data?.totalProjectAmount || 500) * 100;

            if (!window.Razorpay) {
                toast.error("Razorpay SDK not loaded.");
                setIsSubmitting(false);
                return;
            }

            // 2. Open Razorpay Popup
            const options = {
                key: "rzp_test_SUOXQBHdOQMjWB",
                amount: amount,
                currency: "INR",
                name: "SkillPORT",
                description: "Freelance Project Posting Fee",
                // Only provide order_id if it's a real Razorpay Order ID (starts with 'order_')
                ...(orderId && orderId.startsWith('order_') ? { order_id: orderId } : {}),
                handler: async function (response) {
                    try {
                        // 3. Verify Payment
                        const verifyResponse = await apiCall(`${PAYMENT_API_BASE_URL}/verify-payment`, {
                            method: 'POST',
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id || orderId,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                paymentRecordId: paymentResponse.data?._id // Pass the record ID for easier backend lookup
                            })
                        }, token);

                        if (verifyResponse.success) {
                            // 4. Create Project after successful payment
                            await createProject();
                        } else {
                            toast.error(verifyResponse.message || 'Payment verification failed.');
                        }
                    } catch (error) {
                        console.error('Verification Error:', error);
                        toast.error('Payment verification failed.');
                    } finally {
                        setIsSubmitting(false);
                    }
                },
                prefill: {
                    name: user.Fullname || "",
                    email: user.email || "",
                },
                theme: {
                    color: "#14B8A6",
                },
                modal: {
                    ondismiss: function () {
                        setIsSubmitting(false);
                    }
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                toast.error(`Payment Failed: ${response.error.description}`);
                setIsSubmitting(false);
            });
            rzp.open();

        } catch (error) {
            console.error('Submit error:', error);
            toast.error(error.message || 'An error occurred. Please try again.');
            setIsSubmitting(false);
        }
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
          <div className="max-w-5xl mx-auto">
            {/* Header Section */}
            <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                    <PlusCircle className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-[11px] font-black text-teal-600 uppercase tracking-[0.2em]">Freelance Workspace</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                  Create <span className="text-teal-600">Project</span>
                </h1>
                <p className="text-slate-500 font-bold text-sm">Post a new opportunity and find the best talent.</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="px-6 py-3.5 text-xs font-black text-slate-400 hover:text-slate-600 transition-all uppercase tracking-widest bg-white border border-slate-100 rounded-2xl shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => handleSubmit(e)}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-teal-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-teal-600/20 hover:bg-teal-500 transition-all active:scale-95 disabled:opacity-70 flex items-center gap-3 uppercase tracking-widest"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  {isSubmitting ? 'Posting...' : 'Post Project'}
                </button>
              </div>
            </header>

            <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
              <form onSubmit={handleSubmit}>
                {/* Project Basics Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] border-b border-slate-50">
                  <aside className="p-8 lg:p-10 bg-slate-50/50 border-r border-slate-50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-teal-100 text-teal-600 rounded-lg">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <h2 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Project Basics</h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Start with the essential details about your company and the project title.
                    </p>
                  </aside>

                  <div className="p-8 lg:p-10 space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Company Name</label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Tech Solutions"
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-bold text-slate-900 text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Title</label>
                        <input
                          type="text"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g. Full Stack Web Application"
                          className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-bold text-slate-900 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Project Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        placeholder="Describe the project goals, requirements, and scope..."
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none resize-none font-bold text-slate-900 text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                </div>

                {/* Requirements Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] border-b border-slate-50">
                  <aside className="p-8 lg:p-10 bg-slate-50/50 border-r border-slate-50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                        <Layers className="w-4 h-4" />
                      </div>
                      <h2 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Requirements</h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Define the skills, duration, and budget for the project.
                    </p>
                  </aside>

                  <div className="p-8 lg:p-10 space-y-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Skills Required (Press Enter to add)</label>
                      <div className="flex flex-wrap gap-2 mb-3">
                        <AnimatePresence>
                          {formData.skillsRequired.map((skill) => (
                            <motion.span
                              key={skill}
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.8, opacity: 0 }}
                              className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-tight shadow-sm"
                            >
                              {skill}
                              <button type="button" onClick={() => removeSkill(skill)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-3 h-3" />
                              </button>
                            </motion.span>
                          ))}
                        </AnimatePresence>
                      </div>
                      <input
                        type="text"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyDown={addSkill}
                        placeholder="e.g. React, Node.js, MongoDB"
                        className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-bold text-slate-900 text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Duration</label>
                        <div className="relative group/input">
                          <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within/input:text-teal-500 transition-colors" />
                          <input
                            type="text"
                            name="duration"
                            value={formData.duration}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g. 1 month"
                            className="w-full pl-12 pr-5 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none font-bold text-slate-900 text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Experience Level</label>
                        <div className="relative">
                          <select
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleInputChange}
                            className="w-full px-5 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/5 transition-all outline-none appearance-none cursor-pointer font-bold text-slate-900 text-sm"
                          >
                            <option value="Entry">Entry Level</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Expert">Expert</option>
                          </select>
                          <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Budget Range (USD)</label>
                        <div className="flex items-center gap-3">
                          <div className="relative flex-1">
                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                              type="number"
                              name="min"
                              value={formData.budget.min}
                              onChange={handleBudgetChange}
                              required
                              placeholder="Min"
                              className="w-full pl-10 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 transition-all outline-none font-bold text-slate-900 text-sm"
                            />
                          </div>
                          <span className="text-slate-300 font-black">-</span>
                          <div className="relative flex-1">
                            <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                              type="number"
                              name="max"
                              value={formData.budget.max}
                              onChange={handleBudgetChange}
                              required
                              placeholder="Max"
                              className="w-full pl-10 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:border-teal-500 transition-all outline-none font-bold text-slate-900 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestone Section */}
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
                  <aside className="p-8 lg:p-10 bg-slate-50/50 border-r border-slate-50">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <h2 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">Milestones</h2>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">
                      Break the project into smaller tasks with dedicated payment amounts.
                    </p>
                    <button
                      type="button"
                      onClick={addMilestone}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-purple-100 text-purple-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-50 transition-all shadow-sm shadow-purple-500/5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add New
                    </button>
                  </aside>

                  <div className="p-8 lg:p-10 space-y-4">
                    <AnimatePresence mode="popLayout">
                      {formData.milestonePlan.map((milestone, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-slate-50/30 p-4 rounded-2xl border border-slate-100 group/milestone hover:border-teal-200 transition-all"
                        >
                          <div className="flex-1 w-full space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Milestone Name</label>
                            <input
                              type="text"
                              value={milestone.title}
                              onChange={(e) => handleMilestoneChange(index, 'title', e.target.value)}
                              required
                              placeholder="e.g. Initial Prototype"
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-teal-500 transition-all outline-none font-bold text-slate-900 text-sm shadow-sm"
                            />
                          </div>
                          <div className="w-full md:w-48 space-y-1.5">
                            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount ($)</label>
                            <div className="relative">
                              <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                              <input
                                type="number"
                                value={milestone.amount}
                                onChange={(e) => handleMilestoneChange(index, 'amount', e.target.value)}
                                required
                                placeholder="0.00"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:border-teal-500 transition-all outline-none font-bold text-slate-900 text-sm shadow-sm"
                              />
                            </div>
                          </div>
                          <div className="pt-5 self-center">
                            <button
                              type="button"
                              onClick={() => removeMilestone(index)}
                              className={`p-3 rounded-xl transition-all ${
                                formData.milestonePlan.length > 1 
                                  ? 'text-slate-300 hover:text-rose-500 hover:bg-rose-50' 
                                  : 'text-slate-100 cursor-not-allowed'
                              }`}
                              disabled={formData.milestonePlan.length <= 1}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </form>
            </div>

            {/* Bottom Info Bar */}
            <div className="mt-8 flex items-center justify-between p-6 bg-teal-50/50 rounded-[24px] border border-teal-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Secure Posting</h4>
                  <p className="text-[10px] text-slate-500 font-bold">Your project will be reviewed and verified by our AI.</p>
                </div>
              </div>
              <p className="text-[10px] font-black text-teal-700 uppercase tracking-widest hidden md:block">
                SkillPORT Verified Partner
              </p>
            </div>
          </div>
        </main>
      </div>

      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowSuccessModal(false)} />
          <div className="relative bg-white rounded-[40px] p-10 text-center shadow-2xl max-w-sm w-full animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Project Posted Successfully</h3>
            <p className="text-slate-500 font-medium mb-8">Your freelance project has been created after successful payment. Redirecting to dashboard...</p>
            <button 
              onClick={() => navigate('/recruiter-home')}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all"
            >
              Great!
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }
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

export default FreelancingPost;
