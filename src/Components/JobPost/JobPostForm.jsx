import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Award, 
  Target, 
  GraduationCap, 
  FileText, 
  Gift, 
  Settings, 
  Video, 
  ShieldCheck,
  Zap,
  Plus,
  Trash2,
  Sparkles
} from 'lucide-react';

const AccordionItem = ({ id, title, icon: Icon, isOpen, toggle, children }) => {
  return (
    <div className={`bg-white rounded-2xl border transition-all duration-300 ${isOpen ? 'border-teal-200 shadow-md shadow-teal-500/5 ring-1 ring-teal-500/10' : 'border-slate-100 shadow-sm hover:border-slate-200 hover:shadow-md'}`}>
      <button
        type="button"
        onClick={() => toggle(id)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div className={`p-2.5 rounded-xl transition-colors ${isOpen ? 'bg-teal-600 text-white' : 'bg-slate-50 text-slate-500'}`}>
            <Icon size={20} />
          </div>
          <div>
            <h3 className={`font-bold transition-colors ${isOpen ? 'text-teal-900' : 'text-slate-700'}`}>{title}</h3>
            {id === 'required-skills' && <span className="text-xs text-teal-600 font-medium bg-teal-50 px-2 py-0.5 rounded-full mt-1 inline-block">USP Section</span>}
          </div>
        </div>
        <div className={`p-1.5 rounded-full transition-all duration-300 ${isOpen ? 'bg-teal-50 text-teal-600 rotate-180' : 'bg-slate-50 text-slate-400'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100 pb-6 px-6' : 'max-h-0 opacity-0'}`}>
        <div className="pt-2 border-t border-slate-50">
          {children}
        </div>
      </div>
    </div>
  );
};

const JobPostForm = ({ formData, setFormData, handleInputChange }) => {
  const [openSection, setOpenSection] = useState('basic-info');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const addSkill = (type) => {
    const skillList = type === 'required' ? 'requiredSkills' : 'niceToHaveSkills';
    setFormData(prev => ({
      ...prev,
      [skillList]: [...prev[skillList], { name: '', level: 'Intermediate', weightage: 50, isMandatory: false }]
    }));
  };

  const updateSkill = (type, index, field, value) => {
    const skillList = type === 'required' ? 'requiredSkills' : 'niceToHaveSkills';
    const updatedSkills = [...formData[skillList]];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setFormData(prev => ({ ...prev, [skillList]: updatedSkills }));
  };

  const removeSkill = (type, index) => {
    const skillList = type === 'required' ? 'requiredSkills' : 'niceToHaveSkills';
    const updatedSkills = formData[skillList].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [skillList]: updatedSkills }));
  };

  return (
    <div className="space-y-4">
      {/* SECTION 1 – BASIC JOB INFORMATION */}
      <AccordionItem 
        id="basic-info" 
        title="Basic Job Information" 
        icon={Briefcase} 
        isOpen={openSection === 'basic-info'} 
        toggle={toggleSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Job Title *</label>
            <input 
              type="text" 
              placeholder="e.g. Senior Frontend Developer" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Employment Type *</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all bg-white"
              value={formData.employmentType}
              onChange={(e) => handleInputChange('employmentType', e.target.value)}
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Work Mode *</label>
            <div className="flex flex-wrap gap-2">
              {['On-site', 'Remote', 'Hybrid'].map(mode => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleInputChange('workMode', mode)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.workMode === mode ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Department *</label>
            <input 
              type="text" 
              placeholder="e.g. Engineering" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              value={formData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Industry *</label>
            <input 
              type="text" 
              placeholder="e.g. Fintech" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              value={formData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Openings *</label>
              <input 
                type="number" 
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                value={formData.openings}
                onChange={(e) => handleInputChange('openings', e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Deadline *</label>
              <input 
                type="date" 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* SECTION 2 – LOCATION DETAILS */}
      <AccordionItem 
        id="location" 
        title="Location Details" 
        icon={MapPin} 
        isOpen={openSection === 'location'} 
        toggle={toggleSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Country *</label>
            <input 
              type="text" 
              placeholder="India" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              value={formData.country}
              onChange={(e) => handleInputChange('country', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">State *</label>
            <input 
              type="text" 
              placeholder="Gujarat" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">City *</label>
            <input 
              type="text" 
              placeholder="Ahmedabad" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
            />
          </div>
          {formData.workMode !== 'Remote' && (
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Office Address</label>
              <textarea 
                rows="2"
                placeholder="Full office address..." 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all resize-none"
                value={formData.officeAddress}
                onChange={(e) => handleInputChange('officeAddress', e.target.value)}
              />
            </div>
          )}
        </div>
      </AccordionItem>

      {/* SECTION 3 – SALARY / STIPEND */}
      <AccordionItem 
        id="salary" 
        title={formData.employmentType === 'Internship' ? 'Stipend Details' : 'Salary Details'} 
        icon={DollarSign} 
        isOpen={openSection === 'salary'} 
        toggle={toggleSection}
      >
        {formData.employmentType === 'Internship' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Paid / Unpaid *</label>
              <div className="flex gap-2">
                {['Paid', 'Unpaid'].map(status => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => handleInputChange('isPaid', status)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.isPaid === status ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
            {formData.isPaid === 'Paid' && (
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">Stipend Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                  <input 
                    type="number" 
                    placeholder="e.g. 15000" 
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                    value={formData.stipendAmount}
                    onChange={(e) => handleInputChange('stipendAmount', e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Minimum Salary *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="number" 
                  placeholder="e.g. 5,00,000" 
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                  value={formData.minSalary}
                  onChange={(e) => handleInputChange('minSalary', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Maximum Salary *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="number" 
                  placeholder="e.g. 12,00,000" 
                  className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                  value={formData.maxSalary}
                  onChange={(e) => handleInputChange('maxSalary', e.target.value)}
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Salary Type</label>
              <div className="flex flex-wrap gap-2">
                {['Fixed', 'Negotiable', 'Performance-based'].map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleInputChange('salaryType', type)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${formData.salaryType === type ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </AccordionItem>

      {/* SECTION 4 – EXPERIENCE REQUIREMENTS */}
      <AccordionItem 
        id="experience" 
        title="Experience Requirements" 
        icon={Award} 
        isOpen={openSection === 'experience'} 
        toggle={toggleSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Experience Range (Years)</label>
            <div className="flex items-center gap-3">
              <input 
                type="number" 
                min="0" 
                max="30"
                placeholder="Min"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                value={formData.minExperience}
                onChange={(e) => handleInputChange('minExperience', e.target.value)}
              />
              <span className="text-slate-400">to</span>
              <input 
                type="number" 
                min="0" 
                max="30"
                placeholder="Max"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
                value={formData.maxExperience}
                onChange={(e) => handleInputChange('maxExperience', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Experience Level</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all bg-white"
              value={formData.experienceLevel}
              onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
            >
              <option>Fresher</option>
              <option>Entry Level</option>
              <option>Mid Level</option>
              <option>Senior Level</option>
            </select>
          </div>
        </div>
      </AccordionItem>

      {/* SECTION 5 – REQUIRED SKILLS (USP SECTION) */}
      <AccordionItem 
        id="required-skills" 
        title="Required Skills & AI Matching" 
        icon={Target} 
        isOpen={openSection === 'required-skills'} 
        toggle={toggleSection}
      >
        <div className="space-y-6">
          <div className="bg-teal-50/50 rounded-2xl p-5 border border-teal-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#10B981] rounded-full flex items-center justify-center text-white shadow-lg shadow-[#10B981]/20">
                <Zap size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-teal-900">AI Skill Match Estimation</p>
                <p className="text-xs text-teal-700">Estimated <span className="font-bold">145 candidates</span> match these skills in your area.</p>
              </div>
            </div>
            <button 
              type="button"
              className="px-4 py-2 bg-white text-[#10B981] text-xs font-bold rounded-lg border border-teal-200 hover:bg-teal-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Sparkles size={14} className="text-[#10B981]" />
              AI Suggest Skills
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-700">Mandatory Skills</h4>
              <button 
                type="button" 
                onClick={() => addSkill('required')}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 transition-all"
              >
                <Plus size={14} /> Add Skill
              </button>
            </div>

            {formData.requiredSkills.length === 0 && (
              <div className="text-center py-8 border-2 border-dashed border-slate-100 rounded-2xl">
                <p className="text-sm text-slate-400">No skills added yet. Add skills to enable AI matching.</p>
              </div>
            )}

            <div className="space-y-3">
              {formData.requiredSkills.map((skill, index) => (
                <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-4">
                      <input 
                        type="text" 
                        placeholder="Skill Name (e.g. React.js)" 
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-teal-500 transition-all"
                        value={skill.name}
                        onChange={(e) => updateSkill('required', index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-3">
                      <select 
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-teal-500 transition-all bg-white"
                        value={skill.level}
                        onChange={(e) => updateSkill('required', index, 'level', e.target.value)}
                      >
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Expert</option>
                      </select>
                    </div>
                   
                    
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-bold text-slate-700">Nice-to-have Skills</h4>
                <button 
                  type="button" 
                  onClick={() => addSkill('nice')}
                  className="text-xs font-medium text-slate-500 hover:text-teal-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-all"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.niceToHaveSkills.map((skill, index) => (
                  <div key={index} className="group flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg border border-slate-200 animate-in zoom-in-95 duration-200">
                    <input 
                      type="text" 
                      placeholder="Skill..." 
                      className="bg-transparent border-none outline-none text-xs font-medium w-20 focus:w-32 transition-all"
                      value={skill.name}
                      onChange={(e) => updateSkill('nice', index, 'name', e.target.value)}
                    />
                    <button 
                      type="button"
                      onClick={() => removeSkill('nice', index)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <Plus size={14} className="rotate-45" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* SECTION 6 – EDUCATION (Optional & Light) */}
      <AccordionItem 
        id="education" 
        title="Education Requirements (Optional)" 
        icon={GraduationCap} 
        isOpen={openSection === 'education'} 
        toggle={toggleSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Minimum Qualification</label>
            <input 
              type="text" 
              placeholder="e.g. Bachelor's in Computer Science" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all"
              value={formData.education.qualification}
              onChange={(e) => handleNestedChange('education', 'qualification', e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Degree Required?</label>
            <div className="flex gap-2">
              {['Yes', 'No'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleNestedChange('education', 'degreeRequired', opt)}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.education.degreeRequired === opt ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-1 italic">SkillPORT prioritizes skills over degrees.</p>
          </div>
        </div>
      </AccordionItem>

      {/* SECTION 7 – JOB DESCRIPTION */}
      <AccordionItem 
        id="description" 
        title="Job Description" 
        icon={FileText} 
        isOpen={openSection === 'description'} 
        toggle={toggleSection}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-semibold text-slate-700">Detailed Description</label>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formData.jobDescription.length} / 5000</span>
          </div>
          <div className="border border-slate-200 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-teal-500/10 focus-within:border-teal-500 transition-all">
            <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-3">
              <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors font-bold">B</button>
              <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors italic">I</button>
              <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors underline">U</button>
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button type="button" className="p-1.5 text-slate-600 hover:bg-slate-200 rounded transition-colors">List</button>
            </div>
            <textarea 
              rows="8"
              placeholder="Describe the role, responsibilities, and benefits..." 
              className="w-full px-4 py-4 outline-none resize-none text-slate-700 leading-relaxed"
              value={formData.jobDescription}
              onChange={(e) => handleInputChange('jobDescription', e.target.value)}
            />
          </div>
        </div>
      </AccordionItem>

      {/* SECTION 8 – BENEFITS */}
      <AccordionItem 
        id="benefits" 
        title="Perks & Benefits" 
        icon={Gift} 
        isOpen={openSection === 'benefits'} 
        toggle={toggleSection}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            'Health Insurance', 'Remote Work', 'Flexible Hours', 
            'Paid Leave', 'Learning Budget', 'Performance Bonus',
            'Stock Options', 'Gym Membership', 'Free Snacks'
          ].map(benefit => (
            <label 
              key={benefit}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all ${formData.benefits.includes(benefit) ? 'bg-teal-50 border-teal-200 text-teal-700 shadow-sm' : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 hover:bg-slate-50'}`}
            >
              <input 
                type="checkbox" 
                className="hidden"
                checked={formData.benefits.includes(benefit)}
                onChange={(e) => {
                  const updated = e.target.checked 
                    ? [...formData.benefits, benefit]
                    : formData.benefits.filter(b => b !== benefit);
                  handleInputChange('benefits', updated);
                }}
              />
              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${formData.benefits.includes(benefit) ? 'bg-teal-600 border-teal-600 text-white' : 'bg-white border-slate-300'}`}>
                {formData.benefits.includes(benefit) && <Plus size={12} className="rotate-45" />}
              </div>
              <span className="text-xs font-semibold">{benefit}</span>
            </label>
          ))}
        </div>
      </AccordionItem>

      {/* SECTION 9 – APPLICATION SETTINGS */}
      <AccordionItem 
        id="settings" 
        title="Application Settings" 
        icon={Settings} 
        isOpen={openSection === 'settings'} 
        toggle={toggleSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Auto Shortlist Candidates</p>
                <p className="text-[10px] text-slate-500">Enable AI to automatically shortlist matches.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.settings.autoShortlist === 'Yes'}
                  onChange={(e) => handleNestedChange('settings', 'autoShortlist', e.target.checked ? 'Yes' : 'No')}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
            <div className="space-y-1.5 px-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-700">Minimum Skill Match %</label>
                <span className="text-xs font-bold text-teal-600">{formData.settings.minSkillMatch}%</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="100" 
                className="w-full accent-teal-600"
                value={formData.settings.minSkillMatch}
                onChange={(e) => handleNestedChange('settings', 'minSkillMatch', e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Allow Direct Messages</p>
                <p className="text-[10px] text-slate-500">Candidates can message you about this role.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.settings.allowDM === 'Yes'}
                  onChange={(e) => handleNestedChange('settings', 'allowDM', e.target.checked ? 'Yes' : 'No')}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Auto Close After Deadline</p>
                <p className="text-[10px] text-slate-500">Post will be hidden after the deadline date.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.settings.autoClose === 'Yes'}
                  onChange={(e) => handleNestedChange('settings', 'autoClose', e.target.checked ? 'Yes' : 'No')}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* SECTION 10 – INTERVIEW SETTINGS */}
      <AccordionItem 
        id="interview" 
        title="Interview Settings" 
        icon={Video} 
        isOpen={openSection === 'interview'} 
        toggle={toggleSection}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Interview Mode</label>
              <div className="flex gap-2">
                {['Online', 'Offline'].map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => handleNestedChange('interview', 'mode', mode)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${formData.interview.mode === mode ? 'bg-teal-600 text-white shadow-sm shadow-teal-600/20' : 'bg-slate-50 text-slate-600 border border-slate-200'}`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div>
                <p className="text-sm font-bold text-slate-800">Auto Schedule Interviews</p>
                <p className="text-[10px] text-slate-500">Sync with calendar to auto-book slots.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer"
                  checked={formData.interview.autoSchedule === 'Yes'}
                  onChange={(e) => handleNestedChange('interview', 'autoSchedule', e.target.checked ? 'Yes' : 'No')}
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Preferred Platform</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all bg-white"
                value={formData.interview.platform}
                onChange={(e) => handleNestedChange('interview', 'platform', e.target.value)}
                disabled={formData.interview.mode === 'Offline'}
              >
                <option>Google Meet</option>
                <option>Zoom</option>
                <option>Microsoft Teams</option>
                <option>Custom</option>
              </select>
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* SECTION 11 – COMMISSION AGREEMENT */}
      <AccordionItem 
        id="commission" 
        title="Commission Agreement" 
        icon={ShieldCheck} 
        isOpen={openSection === 'commission'} 
        toggle={toggleSection}
      >
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
          <div className="flex gap-4 items-start">
            <div className={`mt-1 w-6 h-6 rounded-md border flex items-center justify-center shrink-0 transition-colors cursor-pointer ${formData.commissionAgreed ? 'bg-teal-600 border-teal-600 text-white shadow-sm' : 'bg-white border-slate-300'}`} onClick={() => handleInputChange('commissionAgreed', !formData.commissionAgreed)}>
              {formData.commissionAgreed && <Plus size={16} className="rotate-45" />}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-800 cursor-pointer" onClick={() => handleInputChange('commissionAgreed', !formData.commissionAgreed)}>
                I agree to pay 10% commission after confirmed hiring.
              </label>
              <p className="text-xs text-slate-500 leading-relaxed">
                SkillPORT operates on a success-based model. Commission will be charged after successful interview completion or hiring confirmation through our platform. This helps us maintain high-quality talent matching services.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
                <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Secure Payment Processing</span>
              </div>
            </div>
          </div>
        </div>
      </AccordionItem>
    </div>
  );
};

export default JobPostForm;
