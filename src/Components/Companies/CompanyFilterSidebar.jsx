import React from 'react';
import { Search, MapPin, Building2, Star, Users, Briefcase } from 'lucide-react';

const CompanyFilterSidebar = () => {
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
          {/* Search Company */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Search Company</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Company name, industry..." 
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <select className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-teal-500 focus:bg-white transition-all cursor-pointer">
                <option>All Locations</option>
                <option>Ahmedabad</option>
                <option>Pune</option>
                <option>Delhi</option>
                <option>Remote</option>
              </select>
            </div>
          </div>

          {/* Industry Filter */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Industry</label>
            <div className="space-y-2">
              {['IT & Software', 'Marketing', 'Finance', 'Startup', 'EdTech', 'Healthcare'].map((industry) => (
                <label key={industry} className="flex items-center group cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{industry}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Company Size */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Company Size</label>
            <div className="space-y-2">
              {['1–10', '11–50', '51–200', '200+'].map((size) => (
                <label key={size} className="flex items-center group cursor-pointer">
                  <input type="radio" name="company-size" className="w-4 h-4 border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">Rating</label>
            <div className="space-y-2">
              {['4+ ⭐', '3+ ⭐'].map((rating) => (
                <label key={rating} className="flex items-center group cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer" />
                  <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{rating}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hiring Status */}
          <div>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm font-bold text-slate-900">Actively Hiring</span>
              <div className="relative inline-flex items-center">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
              </div>
            </label>
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

export default CompanyFilterSidebar;
