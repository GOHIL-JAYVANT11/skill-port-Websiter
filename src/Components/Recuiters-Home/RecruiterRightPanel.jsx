import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, ChevronRight, Zap, CheckCircle2, MessageSquare, Clock, Flame, Rocket, BarChart2, BookOpen, ExternalLink } from 'lucide-react';

const PanelCard = ({ title, icon: Icon, children, color, bg }) => {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all group overflow-hidden relative`}>
      <div className={`absolute top-0 right-0 w-16 h-16 ${bg} opacity-5 rounded-full -mr-8 -mt-8 group-hover:scale-125 transition-transform duration-500`} />
      
      <div className="flex items-center gap-3 mb-5 relative z-10">
        <div className={`p-2 rounded-xl ${bg} ${color} transition-transform group-hover:scale-110 shadow-sm border border-slate-100`}>
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors leading-tight">{title}</h3>
      </div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

const RecruiterRightPanel = () => {
  const trendingSkills = [
    { name: 'React.js', icon: Flame, color: 'text-orange-500', bg: 'bg-orange-50', level: 'Hot' },
    { name: 'Node.js', icon: Rocket, color: 'text-emerald-500', bg: 'bg-emerald-50', level: 'High' },
    { name: 'UI/UX', icon: BarChart2, color: 'text-blue-500', bg: 'bg-blue-50', level: 'Growing' },
  ];

  return (
    <aside className="w-80 space-y-6 sticky top-24 hidden xl:block z-30">
      {/* Career Tips (Recruiter version: Hiring Tips) */}
      <PanelCard title="Hiring Insights" icon={BookOpen} color="text-teal-600" bg="bg-teal-50">
        <div className="space-y-4">
          <div className="group/item cursor-pointer">
            <h4 className="text-[11px] font-bold text-slate-800 group-hover/item:text-teal-700 transition-colors line-clamp-2 leading-tight mb-1">
              How to write job descriptions that attract top talent?
            </h4>
            <div className="flex items-center gap-3 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              <span>4 min read</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
              <span>Hiring Advice</span>
            </div>
          </div>
          <div className="group/item cursor-pointer">
            <h4 className="text-[11px] font-bold text-slate-800 group-hover/item:text-teal-700 transition-colors line-clamp-2 leading-tight mb-1">
              Top 5 skills to look for in 2026 frontend hires
            </h4>
            <div className="flex items-center gap-3 text-[9px] text-slate-400 font-bold uppercase tracking-widest">
              <span>6 min read</span>
              <span className="w-1 h-1 bg-slate-200 rounded-full" />
              <span>Industry Trends</span>
            </div>
          </div>
        </div>
        <button className="w-full mt-5 py-2 border border-slate-200 text-slate-600 hover:bg-slate-50 text-[10px] font-bold rounded-lg transition-all flex items-center justify-center gap-2">
          View All Articles
          <ExternalLink className="w-3 h-3" />
        </button>
      </PanelCard>

      {/* Trending Skills */}
      <PanelCard title="Trending Skills" icon={TrendingUp} color="text-amber-600" bg="bg-amber-50">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-4">Top Demands in 2026</p>
        <div className="space-y-3">
          {trendingSkills.map((trend, index) => (
            <div key={index} className="flex items-center justify-between group/trend cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 rounded-lg ${trend.bg} ${trend.color} group-hover/trend:scale-110 transition-transform`}>
                  <trend.icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-[11px] font-bold text-slate-800 group-hover/trend:text-teal-700 transition-colors tracking-tight">{trend.name}</span>
              </div>
              <span className={`text-[9px] font-black uppercase tracking-tighter ${trend.color} opacity-70 group-hover/trend:opacity-100`}>
                {trend.level}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-slate-50">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 hover:border-teal-100 transition-all cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">Hiring Tip</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-tight">Focus on <span className="text-teal-600 font-bold">Next.js</span> candidates to fill React roles 20% faster.</p>
          </div>
        </div>
      </PanelCard>
    </aside>
  );
};

export default RecruiterRightPanel;
