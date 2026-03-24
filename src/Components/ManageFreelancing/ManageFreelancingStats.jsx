import React from 'react';
import { Briefcase, TrendingUp, CheckCircle2, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const ManageFreelancingStats = ({ projects }) => {
  const stats = [
    { 
      label: 'Total Projects', 
      value: projects.length, 
      icon: Briefcase, 
      color: 'text-teal-600', 
      bg: 'bg-teal-50',
      borderColor: 'border-teal-100'
    },
    { 
      label: 'Active Projects', 
      value: projects.filter(p => p.status === 'Open' || p.status === 'Active').length, 
      icon: TrendingUp, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      borderColor: 'border-blue-100'
    },
    { 
      label: 'Completed', 
      value: projects.filter(p => p.status === 'Completed').length, 
      icon: CheckCircle2, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50',
      borderColor: 'border-purple-100'
    },
    { 
      label: 'Pending Proposals', 
      value: projects.reduce((acc, curr) => acc + (curr.proposalsCount || 0), 0), 
      icon: Users, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50',
      borderColor: 'border-amber-100'
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className={`bg-white p-6 rounded-[2rem] border ${stat.borderColor} shadow-sm hover:shadow-md transition-all group`}
        >
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stat.value}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ManageFreelancingStats;
