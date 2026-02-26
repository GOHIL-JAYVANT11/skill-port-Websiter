import React from 'react';
import { Award, Target, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

const CompanyDetailsSidebar = ({ company }) => {
  return (
    <div className="space-y-6 sticky top-24">
      {/* Quick Stats Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-teal-600 fill-teal-600" />
          Quick Insights
        </h3>
        
        <div className="space-y-5">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Highly Rated</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Top 10% in IT Industry</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Actively Hiring</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">{company.openPositions} New roles added</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Fast Growing</p>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">30% Team growth in 1yr</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Skills Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-5 flex items-center gap-2 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          Top Skills Required
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {['React.js', 'Node.js', 'AWS', 'Data Analytics', 'Python', 'UX Design'].map((skill) => (
            <span key={skill} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100 hover:border-teal-300 hover:text-teal-600 transition-all cursor-default">
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-4 text-[10px] text-slate-400 font-medium italic leading-relaxed">
          *Aggregated from recent job requirements at this company.
        </p>
      </div>

      {/* Privacy Notice */}
      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
          </div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Privacy Guaranteed</h3>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed mb-4 font-medium">
          SkillPORT keeps all contact details hidden until the official hiring stage. Connect safely with the recruiter via our secure messaging system.
        </p>
        <button className="text-teal-400 text-[11px] font-bold hover:text-teal-300 transition-colors">
          Security Policy →
        </button>
      </div>
    </div>
  );
};

export default CompanyDetailsSidebar;
