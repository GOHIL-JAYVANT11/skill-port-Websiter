import React, { useRef, useContext, useState, useEffect } from 'react';
import { Edit3, Plus, FileText, Download, Check, Sparkles, ChevronRight ,Briefcase,  Globe, Github, Linkedin, Award, X, Loader2, Search, ChevronDown } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import { toast } from 'sonner';
import { SKILLS_LIST } from '../../utils/constants';
import * as DropdownOptions from '../../assets/Dropdown_sugeetions';

const SectionCard = ({ title, children, onEdit, onAdd, boost, id }) => (
  <div id={id} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 group/card relative scroll-mt-24">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
        {boost && (
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
            Add {boost}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {onEdit && (
          <button onClick={onEdit} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all">
            <Edit3 className="w-4 h-4" />
          </button>
        )}
        {onAdd && (
          <button onClick={onAdd} className="flex items-center gap-1.5 px-4 py-2 text-xs font-black text-teal-600 hover:bg-teal-50 rounded-xl transition-all uppercase tracking-widest">
            <Plus className="w-4 h-4" />
            Add {title.split(' ')[0]}
          </button>
        )}
      </div>
    </div>
    {children}
  </div>
);

const ProfileSections = ({ user, onUpdateProfile }) => {
  const fileInputRef = useRef(null);
  const { token, fetchProfile } = useContext(AuthContext);
  const [isUploading, setIsUploading] = useState(false);
  const [isHeadlineModalOpen, setIsHeadlineModalOpen] = useState(false);
  const [headline, setHeadline] = useState(user?.resumeHeadline || '');

  // Skills Modal State
  const [isSkillsModalOpen, setIsSkillsModalOpen] = useState(false);
  const [tempSkills, setTempSkills] = useState([]);
  const [skillSearch, setSkillSearch] = useState('');

  // Education Modal State
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [editingEduId, setEditingEduId] = useState(null);
  const [eduForm, setEduForm] = useState({
    qualification: '',
    university: '',
    course: '',
    specialization: '',
    courseType: 'Full time',
    startYear: '',
    endYear: '',
    gradingSystem: '',
    marks: ''
  });

  // Class XII & X State
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [activeClassType, setActiveClassType] = useState(null); // 'XII' or 'X'
  const [classForm, setClassForm] = useState({
    examinationBoard: '',
    mediumOfStudy: '',
    percentage: '',
    passingYear: ''
  });

  // Online Profile / Social Links State
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialForm, setSocialForm] = useState({
    github: '',
    linkdIn: '',
    portfolio: ''
  });

  // Projects State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [projectForm, setProjectForm] = useState({
    projectName: '',
    projectURL: '',
    projectSkills: [],
    details: '',
    startMonth: '',
    startYear: '',
    endMonth: '',
    endYear: '',
    isWorkingOn: false
  });
  const [projectSkillSearch, setProjectSkillSearch] = useState('');

  // Certification State
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);
  const [certForm, setCertForm] = useState({
    certificationName: '',
    certificationCompletionID: '',
    certificationURL: ''
  });

  useEffect(() => {
    if (user?.skill) {
      setTempSkills(user.skill);
    }
  }, [user?.skill]);

  const handleClassSave = async () => {
    const fieldName = activeClassType === 'XII' ? 'classXII' : 'classX';
    
    // According to the schema, classXII and classX are nested inside an education item.
    // We update the first education item (or primary one) if it exists.
    const education = user?.education || [];
    if (education.length > 0) {
      const updatedEducation = [...education];
      updatedEducation[0] = {
        ...updatedEducation[0],
        [fieldName]: [classForm]
      };
      
      const success = await onUpdateProfile({
        education: updatedEducation
      });
      if (success) {
        setIsClassModalOpen(false);
      }
    } else {
      // If no education exists, we might need to create one or handle it differently
      // but based on the provided schema, it's nested in the education array objects.
      toast.error("Please add your degree/diploma education first.");
    }
  };

  const handleSocialSave = async () => {
    const success = await onUpdateProfile({
      SocialLinks: [socialForm]
    });
    if (success) {
      setIsSocialModalOpen(false);
    }
  };

  const handleProjectSave = async () => {
    if (!projectForm.projectName) {
      toast.error('Project name is required');
      return;
    }

    const projectData = {
      projectName: projectForm.projectName,
      projectURL: projectForm.projectURL,
      projectSkills: projectForm.projectSkills,
      details: projectForm.details,
      startDate: `${projectForm.startMonth} ${projectForm.startYear}`,
      endDate: projectForm.isWorkingOn ? 'Present' : `${projectForm.endMonth} ${projectForm.endYear}`
    };

    let updatedProjects;
    if (editingProjectId) {
      // Update: Explicitly send projectId at the top level of the project object
      updatedProjects = [{ 
        projectId: editingProjectId, 
        ...projectData 
      }];
    } else {
      // New: No projectId
      updatedProjects = [projectData];
    }

    const success = await onUpdateProfile({
      projects: updatedProjects
    });

    if (success) {
      setIsProjectModalOpen(false);
      setEditingProjectId(null);
      setProjectForm({
        projectName: '',
        projectURL: '',
        projectSkills: [],
        details: '',
        startMonth: '',
        startYear: '',
        endMonth: '',
        endYear: '',
        isWorkingOn: false
      });
      setProjectSkillSearch('');
    }
  };

  const handleCertSave = async () => {
    if (!certForm.certificationName) {
      toast.error('Certification name is required');
      return;
    }

    const certData = {
      certificationName: certForm.certificationName,
      certificationCompletionID: certForm.certificationCompletionID,
      certificationURL: certForm.certificationURL
    };

    let updatedCert;
    if (editingCertId) {
      // Update: Send with certificationId
      updatedCert = [{ 
        certificationId: editingCertId, 
        ...certData 
      }];
    } else {
      // New: No ID
      updatedCert = [certData];
    }

    const success = await onUpdateProfile({
      certifications: updatedCert
    });

    if (success) {
      setIsCertModalOpen(false);
      setEditingCertId(null);
      setCertForm({
        certificationName: '',
        certificationCompletionID: '',
        certificationURL: ''
      });
    }
  };

  const handleHeadlineSave = async () => {
    const success = await onUpdateProfile({
      resumeHeadline: headline
    });
    if (success) {
      setIsHeadlineModalOpen(false);
    }
  };

  const handleSkillsSave = async () => {
    const success = await onUpdateProfile({
      skill: tempSkills
    });
    if (success) {
      setIsSkillsModalOpen(false);
    }
  };

  const handleAddSkill = (skill) => {
    if (!tempSkills.includes(skill)) {
      setTempSkills([...tempSkills, skill]);
    }
    setSkillSearch('');
  };

  const handleRemoveSkill = (skillToRemove) => {
    setTempSkills(tempSkills.filter(s => s !== skillToRemove));
  };

  const handleEduSave = async () => {
    // Basic validation
    if (!eduForm.qualification || !eduForm.university || !eduForm.course) {
      toast.error('Please fill required fields');
      return;
    }

    const educationData = {
      highestQualification: eduForm.qualification,
      universityInstitute: eduForm.university,
      course: eduForm.course,
      specialization: eduForm.specialization,
      courseType: eduForm.courseType,
      startingYear: parseInt(eduForm.startYear),
      passingYear: parseInt(eduForm.endYear),
      gradingSystem: eduForm.gradingSystem,
      percentage: eduForm.gradingSystem === '% Marks of 100 Maximum' ? eduForm.marks : '',
      cgpaOutOf: eduForm.gradingSystem !== '% Marks of 100 Maximum' ? eduForm.marks : '',
      isPrimary: !editingEduId && (!user?.education || user.education.length === 0)
    };

    let updatedEducation;
    if (editingEduId) {
      // Update: Send with educationId
      updatedEducation = [{ educationId: editingEduId, ...educationData }];
    } else {
      // New: Send without ID
      updatedEducation = [educationData];
    }

    const success = await onUpdateProfile({
      education: updatedEducation
    });

    if (success) {
      setIsEducationModalOpen(false);
      setEditingEduId(null);
      setEduForm({
        qualification: '',
        university: '',
        course: '',
        specialization: '',
        courseType: 'Full time',
        startYear: '',
        endYear: '',
        gradingSystem: '',
        marks: ''
      });
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Invalid file format', {
        description: 'Please upload your resume in PDF format only.'
      });
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error('File too large', {
        description: 'Resume size should be less than 20 MB.'
      });
      return;
    }

    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64String = reader.result;
        
        const success = await onUpdateProfile({
          resume: base64String
        });

        if (success) {
          toast.success('Resume uploaded successfully', {
            description: 'Your actual resume has been saved!'
          });
        }
        setIsUploading(false);
      };
      reader.onerror = (error) => {
        console.error('FileReader error:', error);
        toast.error('File reading failed');
        setIsUploading(false);
      };
    } catch (error) {
      console.error('Error uploading resume:', error);
      setIsUploading(false);
    } finally {
      e.target.value = ''; // Reset input
    }
  };

  const handleViewResume = () => {
    if (!user?.resume) return;
    
    const resumeData = user.resume.trim().replace(/^`|`$/g, '');
    
    if (resumeData.startsWith('data:application/pdf;base64,')) {
      // If it's a base64 string, create a blob and open it
      const base64Content = resumeData.split(',')[1];
      const byteCharacters = atob(base64Content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } else {
      // If it's a regular URL, just open it
      window.open(resumeData, '_blank');
    }
  };

  const educationDisplay = (user?.education && Array.isArray(user.education) && user.education.length > 0)
    ? user.education.map((edu) => {
        const university = edu.university || edu.universityInstitute || '';
        const endYear = edu.endYear || edu.passingYear || '';
        let marks = '';
        if (edu.marks) marks = edu.marks;
        else if (edu.gradingSystem === '% Marks of 100 Maximum' && edu.percentage) marks = `${edu.percentage}%`;
        else if (edu.cgpaOutOf) marks = `${edu.cgpaOutOf}`;
        return { 
          id: edu._id || edu.id,
          course: edu.course, 
          university, 
          endYear, 
          marks,
          // Store raw data for editing
          raw: edu
        };
      })
    : [];

  return (
    <div className="space-y-8 pb-20">
      {/* Resume Section */}
      <SectionCard title="Resume" boost="10%" id="resume">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleResumeUpload} 
          accept=".pdf" 
          className="hidden" 
        />
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Resume View (Only if resume exists) */}
            {user?.resume && (
              <div 
                onClick={handleViewResume}
                className="flex-1 border border-slate-100 rounded-3xl p-6 bg-white hover:bg-slate-50 transition-all cursor-pointer group/resume shadow-sm flex items-center gap-4 border-l-4 border-l-teal-500"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center shrink-0 group-hover/resume:scale-110 transition-transform">
                  <FileText className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-slate-900 truncate tracking-tight">
                    {user.Fullname ? `${user.Fullname.split(' ')[0]}_Resume.pdf` : 'My_Resume.pdf'}
                  </h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 flex items-center gap-1.5">
                    <Check className="w-3 h-3 text-emerald-500" /> 
                    Uploaded successfully
                  </p>
                </div>
                <div className="p-2 text-slate-300 group-hover/resume:text-teal-600 transition-colors">
                  <Download className="w-4 h-4" />
                </div>
              </div>
            )}

            {/* Right: Upload/Update Area */}
            <div 
              onClick={() => !isUploading && fileInputRef.current?.click()}
              className={`flex-[1.5] border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center transition-all cursor-pointer group/upload ${
                isUploading ? 'bg-slate-100 border-slate-200 cursor-not-allowed' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-200'
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-3 group-hover/upload:scale-110 transition-transform duration-500">
                {isUploading ? (
                  <Loader2 className="w-6 h-6 text-teal-600 animate-spin" />
                ) : (
                  <Plus className="w-6 h-6 text-teal-600" />
                )}
              </div>
              <p className="text-sm font-bold text-slate-900 mb-1">
                {isUploading ? 'Uploading...' : user?.resume ? 'Update your resume' : 'Already have a resume?'} 
                {!isUploading && <span className="text-teal-600 ml-1">Upload resume</span>}
              </p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Supported Formats: PDF only, upto 20 MB</p>
            </div>
          </div>

          {/* Resume Headline Section */}
          <div className="pt-6 border-t border-slate-50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-black text-slate-900 tracking-tight">Resume headline</h4>
              <button 
                onClick={() => {
                  setHeadline(user?.resumeHeadline || '');
                  setIsHeadlineModalOpen(true);
                }}
                className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              {user?.resumeHeadline || 'Add a professional headline to your profile to stand out to recruiters...'}
            </p>
          </div>
        </div>
      </SectionCard>

      {/* Resume Headline Modal */}
      {isHeadlineModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900">Resume headline</h2>
              <button onClick={() => setIsHeadlineModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-xs text-slate-500">
                It is the first thing recruiters notice in your profile. Write a concise headline introducing your professional identity of 5-10 words.
              </p>
              <textarea
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full h-32 px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm resize-none"
                placeholder="e.g. Passionate Full Stack Developer with 3+ years of experience in React and Node.js"
              />
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsHeadlineModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleHeadlineSave}
                  className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-black rounded-full shadow-lg shadow-teal-500/20 transition-all active:scale-95"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Key Skills */}
      <SectionCard title="Key skills" boost="8%" id="skills" onEdit={() => {
        setTempSkills(user?.skill || []);
        setIsSkillsModalOpen(true);
      }}>
        <div className="flex flex-wrap gap-2">
          {(user?.skill || ['React.js', 'Tailwind CSS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redux', 'AWS']).map((skill) => (
            <div key={skill} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 hover:border-teal-200 transition-all cursor-default group/skill">
              <span className="text-sm font-bold text-slate-700 group-hover/skill:text-teal-700 transition-colors">{skill}</span>
            </div>
          ))}
          <button 
            onClick={() => {
              setTempSkills(user?.skill || []);
              setIsSkillsModalOpen(true);
            }}
            className="px-4 py-2 border border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-400 hover:border-teal-500 hover:text-teal-600 transition-all"
          >
            + Add Skill
          </button>
        </div>
        <div className="mt-6 p-4 bg-teal-50/50 rounded-2xl border border-teal-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-teal-600 animate-pulse" />
            <p className="text-xs font-bold text-slate-600">AI Suggested: <span className="text-teal-700">Next.js, Docker, GraphQL</span></p>
          </div>
          <button className="text-[10px] font-black text-teal-600 hover:underline uppercase tracking-widest">Add All</button>
        </div>
      </SectionCard>

      {/* Skills Modal */}
      {isSkillsModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900">Key Skills</h2>
              <button onClick={() => setIsSkillsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <p className="text-xs text-slate-500">
                Add skills that best describe your professional expertise. Recruiters use these to find relevant profiles.
              </p>
              
              {/* Selected Skills */}
              <div className="flex flex-wrap gap-2 min-h-[40px] p-3 rounded-2xl border border-slate-100 bg-slate-50/50">
                {tempSkills.map(skill => (
                  <div key={skill} className="px-3 py-1.5 bg-white border border-slate-200 rounded-xl flex items-center gap-2 shadow-sm group/tag">
                    <span className="text-sm font-bold text-slate-700">{skill}</span>
                    <button onClick={() => handleRemoveSkill(skill)} className="text-slate-300 hover:text-rose-500 transition-colors">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {tempSkills.length === 0 && (
                  <span className="text-sm text-slate-400 font-medium italic">No skills added yet...</span>
                )}
              </div>

              {/* Skill Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  placeholder="Search and add skills (e.g. React, Node.js)"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm"
                />
                
                {skillSearch && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-xl z-10 max-h-60 overflow-y-auto p-2">
                    {SKILLS_LIST.filter(s => s.toLowerCase().includes(skillSearch.toLowerCase()) && !tempSkills.includes(s)).map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleAddSkill(skill)}
                        className="w-full text-left px-4 py-2.5 hover:bg-teal-50 rounded-xl text-sm font-bold text-slate-700 hover:text-teal-700 transition-colors flex items-center justify-between group"
                      >
                        {skill}
                        <Plus className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                    {SKILLS_LIST.filter(s => s.toLowerCase().includes(skillSearch.toLowerCase())).length === 0 && (
                      <button
                        onClick={() => handleAddSkill(skillSearch)}
                        className="w-full text-left px-4 py-2.5 hover:bg-teal-50 rounded-xl text-sm font-bold text-slate-700 hover:text-teal-700 transition-colors flex items-center justify-between"
                      >
                        Add "{skillSearch}"
                        <Plus className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-4 pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsSkillsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSkillsSave}
                  className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-black rounded-full shadow-lg shadow-teal-500/20 transition-all active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Education */}
      <SectionCard title="Education" boost="10%" id="education" onAdd={() => setIsEducationModalOpen(true)}>
        <div className="space-y-8">
          {/* Degree Educations */}
          <div className="space-y-6">
            {educationDisplay.map((edu, idx) => (
              <div key={idx} className="flex gap-4 relative group/edu">
                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover/edu:bg-teal-50 group-hover/edu:border-teal-100 transition-all">
                  <Award className="w-6 h-6 text-teal-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-slate-900 truncate tracking-tight">
                      {edu.course} from {edu.university}
                    </h4>
                    <button 
                      onClick={() => {
                        const raw = edu.raw;
                        // Use the backend's educationId or _id for editing
                        setEditingEduId(raw.educationId || raw._id);
                        setEduForm({
                          qualification: raw.highestQualification || '',
                          university: raw.universityInstitute || '',
                          course: raw.course || '',
                          specialization: raw.specialization || '',
                          courseType: raw.courseType || 'Full time',
                          startYear: raw.startingYear?.toString() || '',
                          endYear: raw.passingYear?.toString() || '',
                          gradingSystem: raw.gradingSystem || '',
                          marks: raw.gradingSystem === '% Marks of 100 Maximum' ? raw.percentage : raw.cgpaOutOf
                        });
                        setIsEducationModalOpen(true);
                      }}
                      className="p-1 text-slate-300 hover:text-teal-600 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                    <span>Graduating in {edu.endYear}, Full Time</span>
                    <span className="w-1 h-1 bg-slate-200 rounded-full" />
                    <span className="text-teal-600">{edu.marks}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Class XII */}
          <div className="pt-6 border-t border-slate-50 space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-slate-900 tracking-tight">Class XII</h4>
              <button 
                onClick={() => {
                  setActiveClassType('XII');
                  const existing = user?.education?.[0]?.classXII?.[0] || {};
                  setClassForm({
                    examinationBoard: existing.examinationBoard || '',
                    mediumOfStudy: existing.mediumOfStudy || '',
                    percentage: existing.percentage || '',
                    passingYear: existing.passingYear || ''
                  });
                  setIsClassModalOpen(true);
                }}
                className="p-1 text-slate-300 hover:text-teal-600 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            {user?.education?.[0]?.classXII?.[0] ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-500">{user.education[0].classXII[0].examinationBoard}, {user.education[0].classXII[0].mediumOfStudy}</p>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Scored {user.education[0].classXII[0].percentage}%, Passed out in {user.education[0].classXII[0].passingYear}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <button 
                  onClick={() => {
                    setActiveClassType('XII');
                    setClassForm({ examinationBoard: '', mediumOfStudy: '', percentage: '', passingYear: '' });
                    setIsClassModalOpen(true);
                  }}
                  className="text-sm font-black text-teal-600 hover:underline"
                >
                  Add Class XII Details
                </button>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Scored Percentage, Passed out in Passing Year</p>
              </div>
            )}
          </div>

          {/* Class X */}
          <div className="pt-6 border-t border-slate-50 space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-slate-900 tracking-tight">Class X</h4>
              <button 
                onClick={() => {
                  setActiveClassType('X');
                  const existing = user?.education?.[0]?.classX?.[0] || {};
                  setClassForm({
                    examinationBoard: existing.examinationBoard || '',
                    mediumOfStudy: existing.mediumOfStudy || '',
                    percentage: existing.percentage || '',
                    passingYear: existing.passingYear || ''
                  });
                  setIsClassModalOpen(true);
                }}
                className="p-1 text-slate-300 hover:text-teal-600 transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>
            {user?.education?.[0]?.classX?.[0] ? (
              <div className="space-y-1">
                <p className="text-sm font-bold text-slate-500">{user.education[0].classX[0].examinationBoard}, {user.education[0].classX[0].mediumOfStudy}</p>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  Scored {user.education[0].classX[0].percentage}%, Passed out in {user.education[0].classX[0].passingYear}
                </p>
              </div>
            ) : (
              <div className="space-y-1">
                <button 
                  onClick={() => {
                    setActiveClassType('X');
                    setClassForm({ examinationBoard: '', mediumOfStudy: '', percentage: '', passingYear: '' });
                    setIsClassModalOpen(true);
                  }}
                  className="text-sm font-black text-teal-600 hover:underline"
                >
                  Add Class X Details
                </button>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Scored Percentage, Passed out in Passing Year</p>
              </div>
            )}
          </div>
        </div>
      </SectionCard>

      {/* Class XII/X Modal */}
      {isClassModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900">Class {activeClassType} Details</h2>
              <button onClick={() => setIsClassModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Examination Board</label>
                <div className="relative group">
                  <select 
                    value={classForm.examinationBoard}
                    onChange={(e) => setClassForm({...classForm, examinationBoard: e.target.value})}
                    className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  >
                    <option value="">Select board</option>
                    {DropdownOptions.educationBoardOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medium of Study</label>
                <div className="relative group">
                  <select 
                    value={classForm.mediumOfStudy}
                    onChange={(e) => setClassForm({...classForm, mediumOfStudy: e.target.value})}
                    className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  >
                    <option value="">Select medium</option>
                    {DropdownOptions.mediumOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Percentage</label>
                  <input
                    type="text"
                    value={classForm.percentage}
                    onChange={(e) => setClassForm({...classForm, percentage: e.target.value})}
                    placeholder="Enter percentage"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Passing Year</label>
                  <div className="relative group">
                    <select 
                      value={classForm.passingYear}
                      onChange={(e) => setClassForm({...classForm, passingYear: e.target.value})}
                      className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                    >
                      <option value="">Year</option>
                      {Array.from({length: 40}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-100 bg-slate-50/30">
              <button onClick={() => setIsClassModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">Cancel</button>
              <button onClick={handleClassSave} className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-black rounded-full shadow-lg shadow-teal-500/20 transition-all active:scale-95">Save</button>
            </div>
          </div>
        </div>
      )}

              {/* Education Modal */}
      {isEducationModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">Education <span className="text-emerald-500 text-sm ml-2 font-bold">Add 10%</span></h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Details like course, university, and more, help recruiters identify your educational background</p>
              </div>
              <button onClick={() => setIsEducationModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-5 custom-scrollbar">
              {/* Qualification */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  Education <span className="text-rose-500 text-xs">*</span>
                </label>
                <div className="relative group">
                  <select 
                    value={eduForm.qualification}
                    onChange={(e) => setEduForm({...eduForm, qualification: e.target.value})}
                    className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  >
                    <option value="">Select education</option>
                    {['Doctorate/PhD', 'Masters/Post-Graduation', 'Graduation/Diploma', '12th', '10th'].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-teal-500 transition-colors" />
                </div>
              </div>

              {/* University */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  University/Institute <span className="text-rose-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  value={eduForm.university}
                  onChange={(e) => setEduForm({...eduForm, university: e.target.value})}
                  placeholder="Select university/institute"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                />
              </div>

              {/* Course */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  Course <span className="text-rose-500 text-xs">*</span>
                </label>
                <div className="relative group">
                  <select 
                    value={eduForm.course}
                    onChange={(e) => setEduForm({...eduForm, course: e.target.value})}
                    className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  >
                    <option value="">Select course</option>
                    {eduForm.qualification === 'Graduation/Diploma' && DropdownOptions.graduationOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    {eduForm.qualification === 'Masters/Post-Graduation' && DropdownOptions.mastersOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    {eduForm.qualification === 'Doctorate/PhD' && DropdownOptions.doctorateOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    {(eduForm.qualification === '12th' || eduForm.qualification === '10th') && <option value={eduForm.qualification}>{eduForm.qualification}</option>}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-teal-500 transition-colors" />
                </div>
              </div>

              {/* Specialization */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  Specialization <span className="text-rose-500 text-xs">*</span>
                </label>
                <div className="relative group">
                  <select 
                    value={eduForm.specialization}
                    onChange={(e) => setEduForm({...eduForm, specialization: e.target.value})}
                    className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  >
                    <option value="">Select specialization</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Business Administration">Business Administration</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-teal-500 transition-colors" />
                </div>
              </div>

              {/* Course Type */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  Course type <span className="text-rose-500 text-xs">*</span>
                </label>
                <div className="flex flex-wrap gap-6">
                  {['Full time', 'Part time', 'Correspondence/Distance learning'].map(type => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input
                          type="radio"
                          name="courseType"
                          value={type}
                          checked={eduForm.courseType === type}
                          onChange={(e) => setEduForm({...eduForm, courseType: e.target.value})}
                          className="peer appearance-none w-5 h-5 rounded-full border-2 border-slate-200 checked:border-teal-500 transition-all"
                        />
                        <div className="absolute w-2.5 h-2.5 rounded-full bg-teal-500 scale-0 peer-checked:scale-100 transition-transform" />
                      </div>
                      <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    Course duration <span className="text-rose-500 text-xs">*</span>
                  </label>
                  <div className="relative group">
                    <select 
                      value={eduForm.startYear}
                      onChange={(e) => setEduForm({...eduForm, startYear: e.target.value})}
                      className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                    >
                      <option value="">Starting year</option>
                      {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-teal-500 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-0">To</label>
                  <div className="relative group">
                    <select 
                      value={eduForm.endYear}
                      onChange={(e) => setEduForm({...eduForm, endYear: e.target.value})}
                      className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                    >
                      <option value="">Ending year</option>
                      {Array.from({length: 35}, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-teal-500 transition-colors" />
                  </div>
                </div>
              </div>

              {/* Grading System & Marks */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grading system</label>
                  <div className="relative group">
                    <select 
                      value={eduForm.gradingSystem}
                      onChange={(e) => setEduForm({...eduForm, gradingSystem: e.target.value})}
                      className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                    >
                      <option value="">Select grading system</option>
                      <option value="Scale 10 Grading System">Scale 10 Grading System</option>
                      <option value="Scale 4 Grading System">Scale 4 Grading System</option>
                      <option value="% Marks of 100 Maximum">% Marks of 100 Maximum</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none group-focus-within:text-teal-500 transition-colors" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Marks</label>
                  <input
                    type="text"
                    value={eduForm.marks}
                    onChange={(e) => setEduForm({...eduForm, marks: e.target.value})}
                    placeholder="Enter marks"
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-100 bg-slate-50/30">
              <button
                onClick={() => setIsEducationModalOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEduSave}
                className="px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-black rounded-full shadow-lg shadow-blue-500/20 transition-all active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Career Profile */}
      <SectionCard title="Career profile" id="career" onEdit={() => {}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {[
            { label: 'Current Industry', value: 'IT & Software' },
            { label: 'Department', value: 'Engineering - Software' },
            { label: 'Desired Job Type', value: 'Full Time' },
            { label: 'Expected Salary', value: '₹12L - ₹18L' },
            { label: 'Preferred Work Location', value: 'Ahmedabad, Bangalore, Remote' },
            { label: 'Preferred Shift', value: 'Day Shift' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
              <p className="text-sm font-bold text-slate-700">{item.value}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Accomplishments */}
      <SectionCard title="Accomplishments" id="accomplishments">
        <div className="space-y-6">
          {/* Online Profile */}
          <div 
            onClick={() => {
              const existing = user?.SocialLinks?.[0] || {};
              setSocialForm({
                github: existing.github || '',
                linkdIn: existing.linkdIn || '',
                portfolio: existing.portfolio || ''
              });
              setIsSocialModalOpen(true);
            }}
            className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group/acc flex items-start gap-4 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover/acc:bg-white group-hover/acc:shadow-sm transition-all">
              <Globe className="w-5 h-5 text-slate-400 group-hover/acc:text-teal-600 transition-colors" />
            </div>
            <div className="flex-1  min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-black text-slate-900 tracking-tight">Online profile</h4>
                <div className="flex items-center gap-2">
                  
                  <Plus className="w-4 h-4 text-teal-600" />
                </div>
              </div>
              <p className="text-[11px] font-medium text-slate-500 leading-tight">
                {user?.SocialLinks?.[0] && (
                    <div className="flex items-center gap-2 mr-2">
                      {user.SocialLinks[0].linkdIn && (
                        <a href={user.SocialLinks[0].linkdIn} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-[#0A66C2] hover:scale-110 transition-transform">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {user.SocialLinks[0].github && (
                        <a href={user.SocialLinks[0].github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-slate-900 hover:scale-110 transition-transform">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {user.SocialLinks[0].portfolio && (
                        <a href={user.SocialLinks[0].portfolio} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-teal-600 hover:scale-110 transition-transform">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  )}
              </p>
            </div>
          </div>

          {/* Work Sample (Projects) */}
          <div 
            className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group/acc flex items-start gap-4"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover/acc:bg-white group-hover/acc:shadow-sm transition-all">
              <Briefcase className="w-5 h-5 text-slate-400 group-hover/acc:text-teal-600 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex  justify-between ">
                <h4 className="text-sm font-black text-slate-900 tracking-tight">Projects </h4>
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    setProjectForm({
                      projectName: '',
                      projectURL: '',
                      projectSkills: [],
                      details: '',
                      startMonth: '',
                      startYear: '',
                      endMonth: '',
                      endYear: '',
                      isWorkingOn: false
                    });
                    setEditingProjectId(null);
                    setProjectSkillSearch('');
                    setIsProjectModalOpen(true);
                  }}
                  className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-all cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                </div>
              </div>
              {user?.projects && user.projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                  {user.projects.map((proj, i) => (
                    <div key={i} className="group/proj space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-slate-900 truncate">{proj.projectName}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingProjectId(proj.projectId || proj._id);
                            const [sM, sY] = proj.startDate?.split(' ') || ['', ''];
                            const [eM, eY] = proj.endDate === 'Present' ? ['', ''] : proj.endDate?.split(' ') || ['', ''];
                            setProjectForm({
                              projectName: proj.projectName || '',
                              projectURL: proj.projectURL || '',
                              projectSkills: proj.projectSkills ? (Array.isArray(proj.projectSkills) ? proj.projectSkills : proj.projectSkills.split(',').map(s => s.trim())) : [],
                              details: proj.details || '',
                              startMonth: sM,
                              startYear: sY,
                              endMonth: eM,
                              endYear: eY,
                              isWorkingOn: proj.endDate === 'Present'
                            });
                            setProjectSkillSearch('');
                            setIsProjectModalOpen(true);
                          }}
                          className="p-1 border-1.5 border-slate-900 rounded-lg text-teal-600 hover:bg-slate-50 transition-all flex items-center justify-center shrink-0"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] font-medium text-slate-400">
                        {proj.startDate} to {proj.endDate}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] font-medium text-slate-500 leading-tight">Live Projects, Case Studies</p>
              )}
            </div>
          </div>

          {/* Certification */}
          <div className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group/acc flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover/acc:bg-white group-hover/acc:shadow-sm transition-all">
              <Award className="w-5 h-5 text-slate-400 group-hover/acc:text-teal-600 transition-colors" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-black text-slate-900 tracking-tight">Certification</h4>
                <div 
                  onClick={() => {
                    setCertForm({ certificationName: '', certificationCompletionID: '', certificationURL: '' });
                    setEditingCertId(null);
                    setIsCertModalOpen(true);
                  }}
                  className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </div>
              </div>
              {user?.certifications && user.certifications.length > 0 ? (
                <div className="space-y-3 mt-2">
                  {user.certifications.map((cert, i) => (
                    <div key={i} className="flex items-center justify-between group/cert">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-bold text-slate-700 truncate">{cert.certificationName}</p>
                          <button 
                            onClick={() => {
                              setEditingCertId(cert.certificationId || cert._id);
                              setCertForm({
                                certificationName: cert.certificationName || '',
                                certificationCompletionID: cert.certificationCompletionID || '',
                                certificationURL: cert.certificationURL || ''
                              });
                              setIsCertModalOpen(true);
                            }}
                            className="p-1 text-slate-300 hover:text-teal-600 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] font-medium text-slate-400">ID: {cert.certificationCompletionID || 'N/A'}</p>
                      </div>
                      {cert.certificationURL && (
                        <a 
                          href={cert.certificationURL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-black text-teal-600 hover:underline uppercase tracking-widest ml-4 shrink-0"
                        >
                          View Certificate
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[11px] font-medium text-slate-500 leading-tight">Add details of your certification. You can add up to 10 in your profile.</p>
              )}
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Certification Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">Certification</h2>
                <p className="text-xs text-slate-500 mt-1">Add details of your certification. You can add up to 10 in your profile.</p>
              </div>
              <button onClick={() => setIsCertModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                  Certification name <span className="text-rose-500 text-xs">*</span>
                </label>
                <input
                  type="text"
                  value={certForm.certificationName}
                  onChange={(e) => setCertForm({...certForm, certificationName: e.target.value})}
                  placeholder="Please enter your certification name"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certification completion ID</label>
                <input
                  type="text"
                  value={certForm.certificationCompletionID}
                  onChange={(e) => setCertForm({...certForm, certificationCompletionID: e.target.value})}
                  placeholder="Please mention your course completion ID"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Certification URL</label>
                <input
                  type="text"
                  value={certForm.certificationURL}
                  onChange={(e) => setCertForm({...certForm, certificationURL: e.target.value})}
                  placeholder="Please mention your completion URL"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-100 bg-slate-50/30">
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCertSave}
                className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-black rounded-full shadow-lg shadow-teal-500/20 transition-all active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Links Modal */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-black text-slate-900">Online Profile</h2>
              <button onClick={() => setIsSocialModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LinkedIn</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={socialForm.linkdIn}
                    onChange={(e) => setSocialForm({...socialForm, linkdIn: e.target.value})}
                    placeholder="LinkedIn profile URL"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GitHub</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Github className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={socialForm.github}
                    onChange={(e) => setSocialForm({...socialForm, github: e.target.value})}
                    placeholder="GitHub profile URL"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Portfolio / Website</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={socialForm.portfolio}
                    onChange={(e) => setSocialForm({...socialForm, portfolio: e.target.value})}
                    placeholder="Portfolio or personal website URL"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-bold text-sm text-slate-700"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-100 bg-slate-50/30">
              <button 
                onClick={() => setIsSocialModalOpen(false)} 
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSocialSave} 
                className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-black rounded-full shadow-lg shadow-teal-500/20 transition-all active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">Projects</h2>
                <p className="text-xs text-slate-500 mt-1 font-medium">Showcase your talent with the best projects you have worked on during college and work</p>
              </div>
              <button onClick={() => setIsProjectModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar">
              {/* Project Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Project name</label>
                <input
                  type="text"
                  value={projectForm.projectName}
                  onChange={(e) => setProjectForm({...projectForm, projectName: e.target.value})}
                  placeholder="Enter the name of the project you worked on"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm"
                />
              </div>

              {/* Project Duration */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Project duration</label>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative group">
                      <select 
                        value={projectForm.startMonth}
                        onChange={(e) => setProjectForm({...projectForm, startMonth: e.target.value})}
                        className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm text-slate-700"
                      >
                        <option value="">Month</option>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                    <div className="relative group">
                      <select 
                        value={projectForm.startYear}
                        onChange={(e) => setProjectForm({...projectForm, startYear: e.target.value})}
                        className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm text-slate-700"
                      >
                        <option value="">Year</option>
                        {Array.from({length: 30}, (_, i) => new Date().getFullYear() - i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-400">to</span>
                    {!projectForm.isWorkingOn && (
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="relative group">
                          <select 
                            value={projectForm.endMonth}
                            onChange={(e) => setProjectForm({...projectForm, endMonth: e.target.value})}
                            className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm text-slate-700"
                          >
                            <option value="">Month</option>
                            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
                              <option key={m} value={m}>{m}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative group">
                          <select 
                            value={projectForm.endYear}
                            onChange={(e) => setProjectForm({...projectForm, endYear: e.target.value})}
                            className="w-full appearance-none bg-white px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm text-slate-700"
                          >
                            <option value="">Year</option>
                            {Array.from({length: 35}, (_, i) => new Date().getFullYear() + 5 - i).map(year => (
                              <option key={year} value={year}>{year}</option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                        </div>
                      </div>
                    )}
                    {projectForm.isWorkingOn && (
                      <span className="text-sm font-bold text-slate-700">Present</span>
                    )}
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={projectForm.isWorkingOn}
                      onChange={(e) => setProjectForm({...projectForm, isWorkingOn: e.target.checked})}
                      className="w-4 h-4 rounded border-slate-200 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="text-sm font-medium text-slate-600">I am currently working on this project</span>
                  </label>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-slate-700">Describe what the project was about</label>
                  <span className="text-[10px] text-slate-400 font-medium">{projectForm.details.length}/1000</span>
                </div>
                <textarea
                  value={projectForm.details}
                  onChange={(e) => setProjectForm({...projectForm, details: e.target.value})}
                  maxLength={1000}
                  placeholder="Enter your learnings throughout the process of making the project and what you liked the most about it"
                  className="w-full h-32 px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm resize-none"
                />
              </div>

              {/* Key Skills */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Key skills used in the project (optional)</label>
                
                {/* Selected Skills Capsules */}
                {projectForm.projectSkills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {projectForm.projectSkills.map(skill => (
                      <div key={skill} className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 border border-teal-100 rounded-full text-teal-700 text-xs font-black">
                        {skill}
                        <button 
                          onClick={() => setProjectForm({
                            ...projectForm, 
                            projectSkills: projectForm.projectSkills.filter(s => s !== skill)
                          })}
                          className="hover:text-teal-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={projectSkillSearch}
                    onChange={(e) => setProjectSkillSearch(e.target.value)}
                    placeholder="Search and select skills"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm"
                  />
                  
                  {/* Suggestions Dropdown */}
                  {projectSkillSearch && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-100 shadow-xl z-50 overflow-hidden max-h-48 overflow-y-auto">
                      {SKILLS_LIST.filter(s => 
                        s.toLowerCase().includes(projectSkillSearch.toLowerCase()) && 
                        !projectForm.projectSkills.includes(s)
                      ).map(skill => (
                        <button
                          key={skill}
                          onClick={() => {
                            setProjectForm({
                              ...projectForm,
                              projectSkills: [...projectForm.projectSkills, skill]
                            });
                            setProjectSkillSearch('');
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-slate-50 text-sm font-bold text-slate-700 transition-colors"
                        >
                          {skill}
                        </button>
                      ))}
                      {SKILLS_LIST.filter(s => s.toLowerCase().includes(projectSkillSearch.toLowerCase())).length === 0 && (
                        <div className="px-4 py-2.5 text-xs text-slate-400 font-medium">No matching skills found</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Project URL */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700">Project URL (optional)</label>
                <input
                  type="text"
                  value={projectForm.projectURL}
                  onChange={(e) => setProjectForm({...projectForm, projectURL: e.target.value})}
                  placeholder="Enter the website link of your project"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-6 border-t border-slate-100 bg-slate-50/30">
              <button 
                onClick={() => setIsProjectModalOpen(false)} 
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleProjectSave} 
                className="px-8 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-black rounded-full shadow-lg shadow-teal-500/20 transition-all active:scale-95"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSections;
