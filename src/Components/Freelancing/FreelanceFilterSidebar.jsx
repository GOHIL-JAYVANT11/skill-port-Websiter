import React, { useState } from 'react';
import { Search, ChevronDown, Clock, IndianRupee, Star, Briefcase } from 'lucide-react';

const FreelanceFilterSidebar = () => {
  const [budget, setBudget] = useState(50000);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          <button className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors">
            Reset All
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8">
          {/* Search Project */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Search Projects</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Project title, skills..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-900">Budget Range</label>
              <span className="text-sm font-bold text-teal-600">₹{budget.toLocaleString()}</span>
            </div>
            <input 
              type="range" 
              min="5000" 
              max="500000" 
              step="5000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400 font-medium">₹5k</span>
              <span className="text-[10px] text-slate-400 font-medium">₹500k</span>
            </div>
          </div>

          {/* Project Type */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Project Type</label>
            <div className="space-y-2">
              {['Fixed Price', 'Hourly'].map((type) => (
                <label key={type} className="flex items-center group cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Experience Level */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Experience Level</label>
            <div className="space-y-2">
              {['Beginner', 'Intermediate', 'Expert'].map((level) => (
                <label key={level} className="flex items-center group cursor-pointer">
                  <input type="radio" name="exp-level" className="w-4 h-4 border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{level}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Duration</label>
            <div className="space-y-2">
              {['< 1 Month', '1–3 Months', '3+ Months'].map((duration) => (
                <label key={duration} className="flex items-center group cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{duration}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Posted Time */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Posted Time</label>
            <div className="space-y-2">
              {['Last 24 Hours', 'Last 7 Days', 'Last 30 Days'].map((time) => (
                <label key={time} className="flex items-center group cursor-pointer">
                  <input type="radio" name="posted-time" className="w-4 h-4 border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{time}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
          <button className="w-full py-3 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FreelanceFilterSidebar;
