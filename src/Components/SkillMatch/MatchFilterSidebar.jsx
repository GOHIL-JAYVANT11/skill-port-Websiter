import React, { useState } from 'react';
import { Filter, Search, RotateCcw, MapPin, DollarSign, BrainCircuit, CheckCircle2, SlidersHorizontal } from 'lucide-react';

const MatchFilterSidebar = () => {
  const [minMatch, setMinMatch] = useState(70);
  const [experience, setExperience] = useState([]);
  const [verifiedOnly, setVerifiedVerifiedOnly] = useState(true);

  const toggleExp = (val) => {
    if (experience.includes(val)) {
      setExperience(experience.filter(i => i !== val));
    } else {
      setExperience([...experience, val]);
    }
  };

  return (
    <aside className="bg-white rounded-3xl shadow-sm border border-slate-100 h-fit lg:sticky lg:top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar group">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-teal-600" />
            <h2 className="text-sm font-black text-slate-900 tracking-tight uppercase">Refine Results</h2>
          </div>
          <button 
            onClick={() => { setMinMatch(70); setExperience([]); }}
            className="flex items-center gap-1.5 text-[10px] font-black text-teal-600 hover:text-teal-700 transition-colors uppercase tracking-widest"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-8">
          {/* Match % Slider */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Min. AI Match</label>
              <span className="text-xs font-black text-emerald-600">{minMatch}%</span>
            </div>
            <div className="relative pt-1">
              <input 
                type="range" 
                min="50" 
                max="100" 
                step="5"
                value={minMatch}
                onChange={(e) => setMinMatch(e.target.value)}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between mt-2 px-0.5">
                <span className="text-[8px] font-bold text-slate-300">50%</span>
                <span className="text-[8px] font-bold text-slate-300">100%</span>
              </div>
            </div>
          </div>

          {/* Experience Range */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Experience Level</label>
            <div className="grid grid-cols-2 gap-2">
              {['0-3 Yrs', '3-5 Yrs', '5-8 Yrs', '8+ Yrs'].map((exp) => (
                <button
                  key={exp}
                  onClick={() => toggleExp(exp)}
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

          {/* Location Preference */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Location Fit</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Preferred city..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Availability</label>
            <div className="space-y-2">
              {['Immediate', 'Within 30 Days', 'Open to Offers'].map((type) => (
                <label key={type} className="flex items-center group cursor-pointer">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer w-4 h-4 border-2 border-slate-300 rounded text-teal-600 focus:ring-teal-500 cursor-pointer appearance-none checked:bg-teal-600 checked:border-teal-600 transition-all"
                    />
                    <CheckCircle2 className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-0.5" />
                  </div>
                  <span className="ml-3 text-xs text-slate-600 group-hover:text-slate-900 transition-colors font-medium">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Verified Profiles Only */}
          <div className="pt-4 border-t border-slate-50">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Verified Profiles</span>
              <div className="relative inline-block w-10 h-5 transition duration-200 ease-in">
                <input 
                  type="checkbox" 
                  checked={verifiedOnly}
                  onChange={() => setVerifiedVerifiedOnly(!verifiedOnly)}
                  className="peer absolute block w-5 h-5 rounded-full bg-white border-2 border-slate-300 appearance-none cursor-pointer transition-transform duration-200 translate-x-0 checked:translate-x-5 checked:border-teal-600 z-10" 
                />
                <span className="block overflow-hidden h-5 rounded-full bg-slate-200 peer-checked:bg-teal-500 cursor-pointer transition-colors duration-200" />
              </div>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl">
          <button className="w-full py-4 text-[10px] font-black text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-2xl hover:shadow-xl hover:shadow-teal-500/30 transition-all active:scale-95 uppercase tracking-[0.2em]">
            Apply Criteria
          </button>
        </div>
      </div>
    </aside>
  );
};

export default MatchFilterSidebar;
