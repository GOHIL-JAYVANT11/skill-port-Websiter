import React from 'react';
import { Edit3, Plus, FileText, Download, Check, Sparkles, ChevronRight, Globe, Github, Linkedin, Award } from 'lucide-react';

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

const ProfileSections = ({ user }) => {
  return (
    <div className="space-y-8 pb-20">
      {/* Resume Section */}
      <SectionCard title="Resume" boost="10%" id="resume">
        <div className="space-y-6">
          <div className="border-2 border-dashed border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-teal-200 transition-all cursor-pointer group/upload">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover/upload:scale-110 transition-transform duration-500">
              <FileText className="w-8 h-8 text-teal-600" />
            </div>
            <p className="text-sm font-bold text-slate-900 mb-1">Already have a resume? <span className="text-teal-600">Upload resume</span></p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Supported Formats: doc, docx, rtf, pdf, upto 2 MB</p>
          </div>

          <div className="bg-gradient-to-br from-teal-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
              <div className="w-32 h-44 bg-white/20 backdrop-blur-md rounded-xl border border-white/30 shrink-0 shadow-2xl rotate-3 flex items-center justify-center">
                <FileText className="w-12 h-12 text-white/50" />
              </div>
              <div className="flex-1 text-center sm:text-left space-y-4">
                <h4 className="text-xl font-black tracking-tight">Create your resume in 3 easy steps ✨</h4>
                <ul className="space-y-2 text-sm font-medium text-teal-50/80">
                  <li className="flex items-center gap-2 justify-center sm:justify-start">
                    <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-[10px] font-black">1</div>
                    Add the missing details in your profile
                  </li>
                  <li className="flex items-center gap-2 justify-center sm:justify-start">
                    <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-[10px] font-black">2</div>
                    Choose a template for your resume
                  </li>
                  <li className="flex items-center gap-2 justify-center sm:justify-start">
                    <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center text-[10px] font-black">3</div>
                    Improve the content with AI
                  </li>
                </ul>
                <button className="px-8 py-3 bg-white text-teal-700 font-black rounded-xl shadow-xl shadow-teal-900/20 hover:scale-105 transition-all active:scale-95 text-xs uppercase tracking-widest">
                  Create resume
                </button>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Key Skills */}
      <SectionCard title="Key skills" boost="8%" id="skills" onEdit={() => {}}>
        <div className="flex flex-wrap gap-2">
          {['React.js', 'Tailwind CSS', 'Node.js', 'TypeScript', 'PostgreSQL', 'Redux', 'AWS'].map((skill) => (
            <div key={skill} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl flex items-center gap-2 hover:border-teal-200 transition-all cursor-default group/skill">
              <span className="text-sm font-bold text-slate-700 group-hover/skill:text-teal-700 transition-colors">{skill}</span>
              <button className="p-0.5 text-slate-300 hover:text-rose-500 transition-colors">
                <Plus className="w-3.5 h-3.5 rotate-45" />
              </button>
            </div>
          ))}
          <button className="px-4 py-2 border border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-400 hover:border-teal-500 hover:text-teal-600 transition-all">
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

      {/* Education */}
      <SectionCard title="Education" boost="10%" id="education" onAdd={() => {}}>
        <div className="space-y-6">
          {[
            { degree: 'B.Tech - Computer Science', college: 'Gujarat Technological University', year: '2024', grade: '8.5 CGPA' },
            { degree: 'Higher Secondary (XII)', college: 'St. Xavier School', year: '2020', grade: '92%' }
          ].map((edu, idx) => (
            <div key={idx} className="flex gap-4 relative group/edu">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 group-hover/edu:bg-teal-50 group-hover/edu:border-teal-100 transition-all">
                <Award className="w-6 h-6 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-black text-slate-900 truncate tracking-tight">{edu.degree}</h4>
                <p className="text-sm font-bold text-slate-500 truncate">{edu.college}</p>
                <div className="flex items-center gap-3 mt-1 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  <span>{edu.year}</span>
                  <span className="w-1 h-1 bg-slate-200 rounded-full" />
                  <span className="text-teal-600">{edu.grade}</span>
                </div>
              </div>
              <button className="opacity-0 group-hover/edu:opacity-100 p-2 text-slate-400 hover:text-teal-600 transition-all">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </SectionCard>

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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Online profile', value: 'LinkedIn, GitHub, Portfolio', icon: Globe },
            { label: 'Work sample', value: 'Live Projects, Case Studies', icon: Sparkles },
            { label: 'Certification', value: 'AWS Certified, Google Cloud', icon: Award },
            // { label: 'Patent', value: 'Add details of patents', icon: FileText }
          ].map((item, idx) => (
            <div key={idx} className="p-5 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group/acc flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 group-hover/acc:bg-white group-hover/acc:shadow-sm transition-all">
                <item.icon className="w-5 h-5 text-slate-400 group-hover/acc:text-teal-600 transition-colors" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-black text-slate-900 tracking-tight">{item.label}</h4>
                  <Plus className="w-4 h-4 text-teal-600" />
                </div>
                <p className="text-[11px] font-medium text-slate-500 leading-tight">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default ProfileSections;
