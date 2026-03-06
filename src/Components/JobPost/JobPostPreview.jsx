import React from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Users, 
  Zap,
  Target,
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

const JobPostPreview = ({ formData }) => {
  const { 
    jobTitle, 
    employmentType, 
    workMode, 
    department, 
    industry, 
    city, 
    country, 
    minSalary, 
    maxSalary, 
    salaryType,
    isPaid,
    stipendAmount,
    requiredSkills,
    jobDescription,
    benefits,
    minExperience,
    maxExperience
  } = formData;

  const formattedSalary = employmentType === 'Internship' 
    ? (isPaid === 'Paid' ? `₹${stipendAmount || '0'} / month` : 'Unpaid')
    : (minSalary && maxSalary ? `₹${minSalary} - ₹${maxSalary}` : 'Salary not specified');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden animate-in fade-in slide-in-from-right-4 duration-700">
        {/* Header Gradient */}
        <div className="h-24 bg-gradient-to-br from-[#14B8A6] to-[#0F766E] p-6 flex items-end">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white border border-white/30">
            <Briefcase size={24} />
          </div>
        </div>

        <div className="p-6 -mt-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-50 space-y-4">
            <div>
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-lg uppercase tracking-wider border border-teal-100">
                  {employmentType}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <Clock size={12} /> Live Preview
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {jobTitle || 'Your Job Title Here'}
              </h2>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {department ? `${department} • ` : ''}{industry || 'Industry'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400 border border-slate-100">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
                  <p className="text-xs font-bold text-slate-700">{city ? `${city}, ${country}` : 'Location'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-slate-50 rounded-lg text-slate-400 border border-slate-100">
                  <DollarSign size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{employmentType === 'Internship' ? 'Stipend' : 'Salary'}</p>
                  <p className="text-xs font-bold text-slate-700">{formattedSalary}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Required Skills</p>
                <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full">SkillPORT Matched</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {requiredSkills.length > 0 ? (
                  requiredSkills.map((skill, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 rounded-lg border border-slate-100">
                      <Zap size={10} className="text-teal-500" />
                      <span className="text-[10px] font-bold text-slate-700">{skill.name || 'Skill'}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-[10px] text-slate-400 italic">No skills added yet</p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-50">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Description Preview</p>
              <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                {jobDescription || 'Detailed job description will appear here as you type...'}
              </p>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default JobPostPreview;
