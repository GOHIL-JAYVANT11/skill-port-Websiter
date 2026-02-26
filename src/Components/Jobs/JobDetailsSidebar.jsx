import React from 'react';
import { TrendingUp, Zap, Award, BookOpen, Lock, AlertTriangle, IndianRupee } from 'lucide-react';

const JobDetailsSidebar = ({ job }) => {
  return (
    <div className="space-y-6 sticky top-36">
      {/* Key Highlights Card */}
      <div className="bg-white rounded-xl p-5 mt-10  sm:p-6 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-5 flex items-center gap-2 uppercase tracking-wider">
          <Zap className="w-4 h-4 text-teal-600 fill-teal-600" />
          Job Highlights
        </h3>
        
        <div className="space-y-4">
          {[
            { icon: IndianRupee, title: 'Competitive Salary', desc: 'Industry standards', bg: 'bg-teal-50', color: 'text-teal-600' },
            { icon: TrendingUp, title: 'Career Growth', desc: 'Rapid cycles', bg: 'bg-emerald-50', color: 'text-emerald-600' },
            { icon: BookOpen, title: 'Learning', desc: 'Premium courses', bg: 'bg-blue-50', color: 'text-blue-600' },
            { icon: Lock, title: 'Job Security', desc: 'Long-term benefits', bg: 'bg-purple-50', color: 'text-purple-600' },
            { icon: Award, title: 'Performance', desc: 'Quarterly perks', bg: 'bg-orange-50', color: 'text-orange-600' },
          ].map((item, idx) => (
            <div key={idx} className="flex gap-3">
              <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{item.title}</p>
                <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Salary Insights Card */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-100 shadow-sm">
        <h3 className="text-sm font-bold text-slate-900 mb-5 uppercase tracking-wider">Salary Insights</h3>
        
        <div className="mb-4">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Market Average</p>
          <p className="text-xl font-bold text-slate-900">₹15.5L <span className="text-xs text-slate-400 font-medium">/ yr</span></p>
        </div>

        <div className="space-y-3">
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="w-[30%] h-full bg-slate-200"></div>
            <div className="w-[40%] h-full bg-teal-500"></div>
            <div className="w-[30%] h-full bg-slate-200"></div>
          </div>
          <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            <span>₹8L</span>
            <span className="text-teal-600">Avg</span>
            <span>₹35L+</span>
          </div>
        </div>
      </div>

      {/* Safety Notice Card */}
      {/* <div className="bg-slate-900 rounded-xl p-5 sm:p-6 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider">Safety Notice</h3>
        </div>
        <p className="text-slate-400 text-[11px] leading-relaxed mb-4 font-medium">
          SkillPORT never asks for payment from candidates. Report suspicious activity immediately.
        </p>
        <button className="text-teal-400 text-[11px] font-bold hover:text-teal-300 transition-colors">
          Learn more →
        </button>
      </div> */}
    </div>
  );
};

export default JobDetailsSidebar;
