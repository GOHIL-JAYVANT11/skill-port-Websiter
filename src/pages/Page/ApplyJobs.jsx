import React, { useContext, useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserNavbar from '../../Components/UserHomePage/UserNavbar';
import Footer from '../../Components/Home/Footer';
import { JobContext } from '../../Context/JobContext';
import { AuthContext } from '../../Context/AuthContext';
import StepProgress from '../../Components/Apply Jobs/StepProgress';
import ExternalRedirectModal from '../../Components/Apply Jobs/ExternalRedirectModal';
import SuccessScreen from '../../Components/Apply Jobs/SuccessScreen';
import AIHints from '../../Components/Apply Jobs/AIHints';
import { MapPin, Briefcase, IndianRupee, Calendar, Building2, FileUp, Link as LinkIcon, X, Search, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { SKILLS_LIST } from '../../utils/constants';

const StepContainer = ({ children }) => (
  <div className="transition-all duration-300">{children}</div>
);

const ApplyJobs = () => {
  const { jobId } = useParams();
  const { jobs, loading } = useContext(JobContext);
  const { user, token } = useContext(AuthContext);
  const job = useMemo(() => jobs.find(j => String(j.id) === String(jobId)), [jobs, jobId]);

  const [step, setStep] = useState(1);
  const [useSavedResume, setUseSavedResume] = useState(true);
  const [resumeFile, setResumeFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [otherDoc, setOtherDoc] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    currentTitle: '',
    experience: '',
    currentCTC: '',
    expectedCTC: '',
    noticePeriod: '',
    relocate: false,
    portfolio: '',
    linkedin: '',
  });
  const [answers, setAnswers] = useState({});
  const [agree, setAgree] = useState({ a1: false, a2: false, a3: false });
  const [showExternal, setShowExternal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');

  const applyType = job?.applyType || 'portal';
  const externalUrl = job?.externalUrl || '';
  const applyEmail = job?.applyEmail || '';

  useEffect(() => {
    if (user || job) {
      setForm(prev => ({
        ...prev,
        fullName: user?.Fullname || user?.fullName || prev.fullName,
        email: user?.email || prev.email,
        phone: user?.number || prev.phone,
        location: user?.location || prev.location,
        currentTitle: user?.jobtitle || user?.jobTitle || user?.designation || job?.title || prev.currentTitle,
        experience: user?.Experience || prev.experience,
        portfolio: user?.SocialLinks?.Portfolio || prev.portfolio,
        linkedin: user?.SocialLinks?.LinkedIn || prev.linkedin,
      }));
      if (user?.skill && Array.isArray(user.skill)) {
        setSelectedSkills(user.skill);
      }
    }
  }, [user, job]);

  // Skill Input Logic
  useEffect(() => {
    if (skillInput.trim()) {
      const filtered = SKILLS_LIST.filter(skill => 
        skill.toLowerCase().includes(skillInput.toLowerCase()) && 
        !selectedSkills.includes(skill)
      );
      setSkillSuggestions(filtered.slice(0, 5));
    } else {
      setSkillSuggestions([]);
    }
  }, [skillInput, selectedSkills]);

  const addSkill = (skill) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSkillInput('');
      setSkillSuggestions([]);
    }
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const customQuestions = (job?.customQuestions && Array.isArray(job.customQuestions)) ? job.customQuestions : [
    { id: 'q3', label: `Do you have experience with ${job?.skills?.[0] || 'the required skill'}?`, type: 'radio', options: ['Yes', 'No'] },
    { id: 'q4', label: `Rate your proficiency in ${job?.skills?.[0] || 'this skill'} out of 10`, type: 'number' },
    { id: 'q5', label: 'Are you comfortable with night shifts?', type: 'radio', options: ['Yes', 'No'] },
    { id: 'q6', label: 'Share a relevant project link', type: 'url' },
  ];
  const allQuestions = [ ...customQuestions];

  const onNext = () => setStep((s) => Math.min(3, s + 1));
  const onBack = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async () => {
    if (applyType === 'external' && externalUrl) {
      setShowExternal(true);
      return;
    }
    if (applyType === 'email' && applyEmail) {
      const subject = encodeURIComponent(`Application for ${job?.title} - ${form.fullName || 'Candidate'}`);
      window.location.href = `mailto:${applyEmail}?subject=${subject}`;
      return;
    }

    if (!token) {
      toast.error('Please login to apply');
      return;
    }

    const recId = job.recId;
    if (!recId) {
      toast.error('Recruiter information missing for this job');
      return;
    }

    const payload = {
      Fullname: form.fullName,
      number: form.phone,
      location: form.location,
      jobtitle: job.title,
      Experience: form.experience,
      Salary: {
        CurrentSalary: form.currentCTC || '0',
        ExpectedSalary: form.expectedCTC || '0'
      },
      NoticePeriod: form.noticePeriod,
      willing_to_relocate: form.relocate,
      Resume: useSavedResume ? (user?.resume ) : 'https://example.com/resume.pdf',
      Description: coverLetter || "I am interested in this role.",
      Skill: selectedSkills,
      SocialLinks: {
        Portfolio: form.portfolio,
        LinkedIn: form.linkedin,
        project_link: answers['q6'] || ''
      },
      has_required_skill: answers['q3'] === 'Yes',
      confirm_info_accurate: agree.a1,
      agree_data_share: agree.a2,
      read_job_description: agree.a3,
      answers: answers // Include all answers for completeness
    };

    console.log('Submitting application payload:', payload);

    try {
      // Submit application
      const response = await fetch(`http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/apply-job?jobId=${job.id}&recId=${recId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const id = `APP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
        setApplicationId(id);
        setSubmitted(true);
        toast.success('Application submitted successfully!');
      } else {
        toast.error(data.message || 'Failed to submit application');
      }
    } catch (error) {
      console.error('Error applying for job:', error);
      toast.error('An error occurred while submitting application');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 border border-slate-100 text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Job not found</h2>
          <p className="text-slate-500">The job you are trying to apply for is unavailable.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC]">
        <UserNavbar onMenuToggle={() => {}} />
        <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
          <SuccessScreen
            applicationId={applicationId}
            jobTitle={job.title}
            companyName={job.companyName}
            email={form.email}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Glass Header */}
      <div className="sticky top-0 z-40 bg-white/70  border-b border-slate-100 shadow-sm">
        <UserNavbar onMenuToggle={() => {}} />
      </div>

      <header className="bg-gradient-to-r max-w-[1280px] mx-auto px-4 sm:px-6 h-[80px] rounded-xl mt-18 from-[#14B8A6] to-[#0F766E]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-6">
          <div className="text-white">
            <h1 className="text-xl sm:text-2xl font-extrabold">Apply to {job.title} <span className="text-sm font-medium  gap-2 text-slate-300 opacity-90">{job.companyName}</span></h1>
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Job Snapshot */}
          <aside className="lg:w-[360px] w-full shrink-0 sticky top-28">
            <div className="bg-white rounded-xl border border-slate-100 shadow-md overflow-hidden">
              <div className="p-6">
                <p className="text-[10px] font-bold text-teal-700 uppercase tracking-[0.25em] mb-3">You are applying to</p>
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 p-2 overflow-hidden">
                    <img src={job.companyLogo || 'https://via.placeholder.com/48'} alt={job.companyName} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 leading-tight">{job.title}</h3>
                    <p className="text-sm font-semibold text-slate-600">{job.companyName}</p>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <IndianRupee className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">{job.employmentType || 'Full-time'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-slate-700">Posted {job.postedTime}</span>
                  </div>
                  {job.deadline && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="font-medium text-slate-700">Apply by {job.deadline}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="px-6 py-3 bg-slate-50 border-t border-slate-100">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                  Keep this page open until you finish your application
                </p>
              </div>
            </div>
          </aside>

          {/* Right Form */}
          <div className="flex-1 w-full">
            <div className="bg-white rounded-xl border border-slate-100 shadow-md p-6 sm:p-8">
              {/* Stepper */}
              <StepProgress current={step} />

              <div className="mt-8 space-y-6">
                {step === 1 && (
                  <StepContainer>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Full Name *</label>
                        <input value={form.fullName} onChange={(e)=>setForm({...form, fullName: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="John Doe"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Email Address *</label>
                        <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} type="email" className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="john@example.com"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone Number *</label>
                        <input value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="+91 98765 43210"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Current Location *</label>
                        <input value={form.location} onChange={(e)=>setForm({...form, location: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="City, State"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Current Job Title</label>
                        <input value={form.currentTitle} onChange={(e)=>setForm({...form, currentTitle: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="Software Engineer"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Experience *</label>
                        <select value={form.experience} onChange={(e)=>setForm({...form, experience: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500">
                          <option value="">Select</option>
                          <option>Fresher (0 years)</option>
                          <option>1–2 Years</option>
                          <option>3–5 Years</option>
                          <option>5–10 Years</option>
                          <option>10+ Years</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Current CTC (optional)</label>
                        <input value={form.currentCTC} onChange={(e)=>setForm({...form, currentCTC: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="₹ LPA"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Expected CTC *</label>
                        <input value={form.expectedCTC} onChange={(e)=>setForm({...form, expectedCTC: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="₹ LPA"/>
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Notice Period *</label>
                        <select value={form.noticePeriod} onChange={(e)=>setForm({...form, noticePeriod: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500">
                          <option value="">Select</option>
                          <option>Immediate Joiner</option>
                          <option>15 Days</option>
                          <option>30 Days</option>
                          <option>60 Days</option>
                          <option>90 Days</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                          <Sparkles className="w-3 h-3 text-teal-600" />
                          Skills & Expertise *
                        </label>
                        <div className="mt-2 space-y-3">
                          {/* Selected Skills Capsules */}
                          <div className="flex flex-wrap gap-2">
                            {selectedSkills.map((skill) => (
                              <span
                                key={skill}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-xs font-bold text-teal-700 group animate-in fade-in zoom-in duration-200"
                              >
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="p-0.5 rounded-full hover:bg-teal-200 text-teal-400 hover:text-teal-700 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                            {selectedSkills.length === 0 && (
                              <span className="text-[11px] text-slate-400 italic">No skills selected yet</span>
                            )}
                          </div>

                          {/* Skill Input with Suggestions */}
                          <div className="relative">
                            <div className="flex items-center bg-white border border-slate-200 rounded-xl px-3 py-2.5 focus-within:ring-2 focus-within:ring-teal-500/20 focus-within:border-teal-500 transition-all shadow-sm">
                              <Search className="w-4 h-4 text-slate-400 mr-2" />
                              <input
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' && skillSuggestions.length > 0) {
                                    e.preventDefault();
                                    addSkill(skillSuggestions[0]);
                                  }
                                }}
                                className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 w-full"
                                placeholder="Search and add skills (e.g. React, Node.js...)"
                              />
                            </div>

                            {/* Suggestions Dropdown */}
                            {skillSuggestions.length > 0 && (
                              <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
                                {skillSuggestions.map((suggestion) => (
                                  <button
                                    key={suggestion}
                                    type="button"
                                    onClick={() => addSkill(suggestion)}
                                    className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 flex items-center justify-between group transition-colors"
                                  >
                                    {suggestion}
                                    <span className="text-[10px] font-black text-slate-300 group-hover:text-teal-400 uppercase tracking-widest">Add +</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2 flex items-center gap-3 mt-2">
                        <input id="relocate" type="checkbox" checked={form.relocate} onChange={(e)=>setForm({...form, relocate: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"/>
                        <label htmlFor="relocate" className="text-sm font-semibold text-slate-700">Willing to Relocate?</label>
                      </div>
                    </div>
                  </StepContainer>
                )}

                {step === 2 && (
                  <StepContainer>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" checked={useSavedResume} onChange={(e)=>setUseSavedResume(e.target.checked)} className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"/>
                          <span className="text-sm font-semibold text-slate-700">Use Saved Resume</span>
                        </label>
                        {useSavedResume && (
                          <span className="text-xs text-slate-500">resume_johndoe.pdf</span>
                        )}
                      </div>

                      {!useSavedResume && (
                        <div>
                          <div className="border-2 border-dashed border-teal-300/60 rounded-xl p-6 bg-teal-50/30">
                            <div className="flex flex-col items-center justify-center text-center">
                              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3">
                                <FileUp className="w-6 h-6 text-teal-600" />
                              </div>
                              <p className="text-sm font-semibold text-slate-700">Drag & Drop your resume here</p>
                              <p className="text-xs text-slate-500">PDF/DOC, max 5MB</p>
                              <label className="mt-3 inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-bold cursor-pointer hover:from-teal-600 hover:to-teal-800">
                                Browse File
                                <input type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={(e)=> setResumeFile(e.target.files?.[0] || null)} />
                              </label>
                              {resumeFile && (
                                <div className="mt-3 text-xs font-semibold text-slate-600">
                                  Selected: {resumeFile.name}
                                  <button className="ml-2 text-teal-700 font-bold" onClick={()=>setResumeFile(null)}>Remove</button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Cover Letter (optional)</label>
                        <textarea value={coverLetter} onChange={(e)=>setCoverLetter(e.target.value)} maxLength={500} rows={5} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="Write a short cover letter (max 500 chars)" />
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{coverLetter.length}/500</span>
                          <label className="text-[12px] font-bold text-teal-700 cursor-pointer">
                            Or upload file
                            <input type="file" className="hidden" onChange={(e)=>setCoverLetterFile(e.target.files?.[0] || null)} />
                          </label>
                        </div>
                        {coverLetterFile && (
                          <div className="mt-2 text-xs font-semibold text-slate-600">Selected: {coverLetterFile.name}</div>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Portfolio / Work Samples (URL)</label>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                              <LinkIcon className="w-4 h-4 text-slate-400" />
                            </div>
                            <input value={form.portfolio} onChange={(e)=>setForm({...form, portfolio: e.target.value})} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="https://"/>
                          </div>
                        </div>
                        <div>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">LinkedIn Profile</label>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                              <LinkIcon className="w-4 h-4 text-slate-400" />
                            </div>
                            <input value={form.linkedin} onChange={(e)=>setForm({...form, linkedin: e.target.value})} className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="https://linkedin.com/in/..."/>
                          </div>
                        </div>
                      </div>

                      
                    </div>
                  </StepContainer>
                )}

                {step === 3 && (
                  <StepContainer>
                    <div className="space-y-6">
                      {allQuestions.map((q) => (
                        <div key={q.id}>
                          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{q.label}</label>
                          {q.type === 'textarea' && (
                            <textarea value={answers[q.id] || ''} onChange={(e)=>setAnswers({...answers, [q.id]: e.target.value})} rows={5} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" />
                          )}
                          {q.type === 'text' && (
                            <input value={answers[q.id] || ''} onChange={(e)=>setAnswers({...answers, [q.id]: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" />
                          )}
                          {q.type === 'number' && (
                            <input type="number" value={answers[q.id] || ''} onChange={(e)=>setAnswers({...answers, [q.id]: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" />
                          )}
                          {q.type === 'url' && (
                            <input type="url" value={answers[q.id] || ''} onChange={(e)=>setAnswers({...answers, [q.id]: e.target.value})} className="mt-1 w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500" placeholder="https://"/>
                          )}
                          {q.type === 'radio' && (
                            <div className="mt-2 flex items-center gap-5">
                              {q.options?.map((opt) => (
                                <label key={opt} className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={q.id}
                                    checked={answers[q.id] === opt}
                                    onChange={()=>setAnswers({...answers, [q.id]: opt})}
                                    className="w-4 h-4 text-teal-600"
                                  />
                                  <span className="text-sm font-semibold text-slate-700">{opt}</span>
                                </label>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                        These questions help the recruiter evaluate your fit for the role.
                      </p>

                      <div className="pt-6 border-t border-slate-100 space-y-3">
                        <label className="flex items-center gap-3">
                          <input type="checkbox" checked={agree.a1} onChange={(e)=>setAgree({...agree, a1: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"/>
                          <span className="text-sm font-semibold text-slate-700">I confirm all the above information is accurate</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" checked={agree.a2} onChange={(e)=>setAgree({...agree, a2: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"/>
                          <span className="text-sm font-semibold text-slate-700">I agree to share my profile data with the recruiter</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input type="checkbox" checked={agree.a3} onChange={(e)=>setAgree({...agree, a3: e.target.checked})} className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"/>
                          <span className="text-sm font-semibold text-slate-700">I have read the job description fully</span>
                        </label>
                      </div>
                    </div>
                  </StepContainer>
                )}

                {/* Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <button
                    disabled={step === 1}
                    onClick={onBack}
                    className="px-5 py-2 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 disabled:opacity-50"
                  >
                    Back
                  </button>
                  {step < 3 ? (
                    <button
                      onClick={onNext}
                      className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-extrabold hover:from-teal-600 hover:to-teal-800 shadow-sm active:scale-95"
                    >
                      Next →
                    </button>
                  ) : (
                    <button
                      onClick={onSubmit}
                      disabled={!(agree.a1 && agree.a2 && agree.a3)}
                      className="w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-extrabold hover:from-teal-600 hover:to-teal-800 shadow-md active:scale-95 disabled:opacity-50"
                    >
                      🚀 Submit Application
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <AIHints />
        </div>
      </main>

      <Footer />

      <ExternalRedirectModal
        open={showExternal}
        url={externalUrl}
        onCancel={() => setShowExternal(false)}
        onContinue={() => {
          setShowExternal(false);
          window.open(externalUrl, '_blank', 'noopener');
        }}
      />
    </div>
  );
};

export default ApplyJobs;
