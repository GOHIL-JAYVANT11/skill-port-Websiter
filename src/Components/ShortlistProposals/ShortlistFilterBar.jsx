import React from 'react';
import { Search, SlidersHorizontal, Layers } from 'lucide-react';

const ShortlistFilterBar = ({ searchQuery, setSearchQuery, selectedCount, onCompare }) => {
  return (
    <div className="bg-white rounded-[32px] border border-slate-100 p-3 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div className="flex items-center gap-4 px-2">
        <div className="relative flex-1 lg:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search top talent..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border-transparent rounded-2xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all"
          />
        </div>
        <button className="p-3.5 rounded-2xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        {selectedCount > 0 && (
          <button 
            onClick={onCompare}
            className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 animate-in fade-in slide-in-from-right-4"
          >
            <Layers className="w-4 h-4" /> Compare ({selectedCount})
          </button>
        )}
      </div>
    </div>
  );
};

export default ShortlistFilterBar;
