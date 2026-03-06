import React from 'react';
import { BarChart3, TrendingUp, Users, Target, Zap, ChevronRight, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const MiniChart = ({ data, color }) => {
  return (
    <div className="flex items-end gap-1 h-12 w-24">
      {data.map((val, i) => (
        <div 
          key={i} 
          className={`w-1.5 rounded-full ${color}`} 
          style={{ height: `${val}%` }} 
          title={`${val}%`}
        />
      ))}
    </div>
  );
};

const AnalyticsCard = ({ title, value, change, changeType, icon: Icon, color, chartData }) => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 group relative flex flex-col h-full overflow-hidden border-b-4 border-b-transparent hover:border-b-blue-500">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12 blur-2xl group-hover:bg-blue-500/10 transition-colors" />

      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className={`p-3 rounded-2xl ${color} bg-opacity-10 shadow-sm group-hover:scale-110 transition-transform`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
          changeType === 'up' ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' : 'text-red-600 bg-red-50 border border-red-100'
        }`}>
          {changeType === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          <span>{change}%</span>
        </div>
      </div>

      <div className="flex-1 mb-4 relative z-10">
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mb-1">{title}</p>
        <p className="text-2xl font-black text-slate-900">{value}</p>
      </div>

      <div className="flex items-center justify-between relative z-10 pt-4 border-t border-slate-50">
        <MiniChart data={chartData} color={color} />
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Last 7 Days</span>
      </div>
    </div>
  );
};

const HiringAnalytics = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Hiring <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Performance</span>
          </h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time analytics for your recruiting efforts</p>
        </div>
        <button className="flex items-center gap-1.5 text-xs font-black text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-widest group/btn">
          <span>Detailed Report</span>
          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnalyticsCard 
          title="Applications Trend" 
          value="1,284" 
          change="12.5" 
          changeType="up" 
          icon={Activity} 
          color="bg-blue-500"
          chartData={[30, 45, 60, 40, 80, 65, 90]}
        />
        <AnalyticsCard 
          title="Hiring Success Rate" 
          value="24.8%" 
          change="2.4" 
          changeType="up" 
          icon={Target} 
          color="bg-emerald-500"
          chartData={[50, 40, 60, 70, 55, 65, 80]}
        />
        <AnalyticsCard 
          title="Most Demanded Skill" 
          value="React.js" 
          change="5.2" 
          changeType="down" 
          icon={Zap} 
          color="bg-amber-500"
          chartData={[80, 70, 90, 85, 75, 60, 50]}
        />
      </div>
    </div>
  );
};

export default HiringAnalytics;
