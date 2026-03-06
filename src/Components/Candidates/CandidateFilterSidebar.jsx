import React, { useState } from 'react';
import { Search, ChevronDown, Filter, RotateCcw, MapPin, DollarSign, Zap, Star } from 'lucide-react';

const CandidateFilterSidebar = () => {
  const [experience, setExperience] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [salary, setSalary] = useState(100);
  const [matchPercentage, setMatchPercentage] = useState(70);

  const toggleSelection = (list, setList, value) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const resetFilters = () => {
    setExperience([]);
    setAvailability([]);
    setSalary(100);
    setMatchPercentage(70);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Filters</h2>
          </div>
          <button 
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-[10px] font-black text-teal-600 hover:text-teal-700 transition-colors uppercase tracking-widest"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8">
          {/* Search by Name/Skill */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Search Candidate</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Name, skills, or role..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Experience Range */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Experience</label>
            <div className="grid grid-cols-2 gap-2">
              {['0-1 Yrs', '1-3 Yrs', '3-5 Yrs', '5+ Yrs'].map((exp) => (
                <button
                  key={exp}
                  onClick={() => toggleSelection(experience, setExperience, exp)}
                  className={`px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                    experience.includes(exp) 
                      ? 'bg-teal-600 border-teal-600 text-white shadow-lg shadow-teal-500/20' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-teal-600 hover:bg-teal-50/50'
                  }`}
                >
                  {exp}
                </button>
              ))}
            </div>
          </div>

          {/* Expected Salary Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exp. Salary</label>
              <span className="text-xs font-black text-teal-600">₹{salary}k+</span>
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
          </div>

          {/* Match % Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. AI Match</label>
              <span className="text-xs font-black text-emerald-600">{matchPercentage}%</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="100" 
              step="5"
              value={matchPercentage}
              onChange={(e) => setMatchPercentage(e.target.value)}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          {/* Availability */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Availability</label>
            <div className="space-y-2">
              {['Immediate', '1 Month', 'Actively Looking'].map((type) => (
                <label key={type} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={availability.includes(type)}
                      onChange={() => toggleSelection(availability, setAvailability, type)}
                      className="peer w-4 h-4 border-2 border-slate-300 rounded text-teal-600 focus:ring-teal-500 cursor-pointer appearance-none checked:bg-teal-600 checked:border-teal-600 transition-all"
                    />
                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
          <button className="w-full py-4 text-xs font-black text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 uppercase tracking-widest">
            Search Talent
          </button>
        </div>
      </div>
    </div>
  );
};

export default CandidateFilterSidebar;
