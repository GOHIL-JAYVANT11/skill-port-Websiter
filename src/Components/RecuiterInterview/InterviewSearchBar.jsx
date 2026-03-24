import React from 'react';
import { Search, Briefcase, Video, Calendar, ChevronDown } from 'lucide-react';

const FilterSelect = ({ icon: Icon, label, options, value, onChange }) => (
  <div className="relative group">
    <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md group-hover:border-teal-100 transition-all duration-300">
      <Icon className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-slate-700 cursor-pointer appearance-none pr-8 min-w-[140px]"
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-4 group-hover:text-teal-600 transition-colors pointer-events-none" />
    </div>
  </div>
);

const InterviewSearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  jobFilter, 
  onJobFilterChange,
  modeFilter,
  onModeFilterChange,
  dateFilter,
  onDateFilterChange,
  sortOrder,
  onSortOrderChange,
  jobOptions = []
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 mb-10 w-full animate-in fade-in slide-in-from-top-4 duration-500 delay-200">
      {/* Search Input */}
      <div className="flex-1 w-full group">
        <div className="flex items-center bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm group-focus-within:shadow-xl group-focus-within:border-teal-100 group-hover:shadow-md group-hover:border-teal-100 transition-all duration-300">
          <Search className="w-5 h-5 text-slate-400 group-focus-within:text-teal-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search by candidate name, role, or experience..." 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-transparent border-none outline-none text-sm font-medium w-full ml-4 text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Filters Grid */}
      <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto">
        <FilterSelect 
          icon={Briefcase} 
          label="All Jobs" 
          options={jobOptions}
          value={jobFilter}
          onChange={onJobFilterChange}
        />
        
        <FilterSelect 
          icon={Video} 
          label="Interview Mode" 
          options={[
            { value: 'Online', label: 'Online / Video Call' },
            { value: 'Offline', label: 'Offline / In-Person' },
            { value: 'Phone', label: 'Telephonic' },
          ]}
          value={modeFilter}
          onChange={onModeFilterChange}
        />

        <div className="relative group">
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-100 shadow-sm group-hover:shadow-md group-hover:border-teal-100 transition-all duration-300">
            <Calendar className="w-4 h-4 text-slate-400 group-hover:text-teal-600 transition-colors" />
            <input 
              type="date" 
              value={dateFilter}
              onChange={(e) => onDateFilterChange(e.target.value)}
              className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest text-slate-700 cursor-pointer"
            />
          </div>
        </div>

        <FilterSelect 
          icon={ChevronDown} 
          label="Sort By" 
          options={[
            { value: 'newest', label: 'Newest First' },
            { value: 'oldest', label: 'Oldest First' },
            { value: 'today', label: 'Today First' },
          ]}
          value={sortOrder}
          onChange={onSortOrderChange}
        />
      </div>
    </div>
  );
};

export default InterviewSearchBar;
