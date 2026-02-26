import React, { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const JobFilterSidebar = () => {
  const [experience, setExperience] = useState([]);
  const [workType, setWorkType] = useState([]);
  const [jobType, setJobType] = useState([]);
  const [salary, setSalary] = useState(50);

  const toggleSelection = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Filters</h2>
          <button 
            onClick={() => {
              setExperience([]);
              setWorkType([]);
              setJobType([]);
              setSalary(50);
            }}
            className="text-xs font-bold text-teal-600 hover:text-teal-700 transition-colors"
          >
            Reset All
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8">
          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Location</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search location..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Experience</label>
            <div className="grid grid-cols-2 gap-2">
              {['0-1 Yrs', '1-3 Yrs', '3-5 Yrs', '5+ Yrs'].map((exp) => (
                <button
                  key={exp}
                  onClick={() => toggleSelection(experience, setExperience, exp)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    experience.includes(exp) 
                      ? 'bg-teal-600 border-teal-600 text-white' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-teal-600'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-sm font-bold text-slate-900">Monthly Salary</label>
              <span className="text-sm font-bold text-teal-600">₹{salary}k+</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="500" 
              step="10"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-slate-400 font-medium">0</span>
              <span className="text-[10px] text-slate-400 font-medium">500k</span>
            </div>
          </div>

          {/* Work Type */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Work Type</label>
            <div className="space-y-2">
              {['Remote', 'Hybrid', 'Onsite'].map((type) => (
                <label key={type} className="flex items-center group cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={workType.includes(type)}
                    onChange={() => toggleSelection(workType, setWorkType, type)}
                    className="w-4 h-4 border-2 border-slate-300 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Job Type</label>
            <div className="space-y-2">
              {['Full-time', 'Internship', 'Contract', 'Freelance'].map((type) => (
                <label key={type} className="flex items-center group cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={jobType.includes(type)}
                    onChange={() => toggleSelection(jobType, setJobType, type)}
                    className="w-4 h-4 border-2 border-slate-300 rounded text-teal-600 focus:ring-teal-500 cursor-pointer"
                  />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Industry</label>
            <div className="relative">
              <select className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 focus:outline-none focus:border-teal-500 focus:bg-white transition-all cursor-pointer">
                <option>All Industries</option>
                <option>Software & IT</option>
                <option>Fintech</option>
                <option>Healthcare</option>
                <option>E-commerce</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
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

export default JobFilterSidebar;
