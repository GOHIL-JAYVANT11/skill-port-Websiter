import React from 'react';
import { MapPin, Heart, Star, Building2, Briefcase, ExternalLink } from 'lucide-react';

const SavedCompanyCard = ({ company, onUnsave }) => {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100 p-2.5 overflow-hidden shadow-inner">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
            ) : (
              <Building2 className="w-7 h-7 text-slate-300" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight">
              {company.name}
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-slate-700">{company.rating}</span>
              <span className="text-[10px] text-slate-400 font-medium">(100+ Reviews)</span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => onUnsave(company.id)}
          className="p-2 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all bounce-on-click"
        >
          <Heart className="w-5 h-5 fill-current" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Industry</p>
          <p className="text-sm font-bold text-slate-700 truncate">{company.industry}</p>
        </div>
        <div className="space-y-1 text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Location</p>
          <div className="flex items-center justify-end gap-1 text-sm font-bold text-slate-700">
            <MapPin className="w-3.5 h-3.5 text-teal-500" />
            {company.location}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-teal-50 rounded-lg">
            <Briefcase className="w-4 h-4 text-teal-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">{company.openPositions} Positions</p>
            <p className="text-[10px] text-slate-400 font-medium">Actively Hiring</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-teal-600 transition-all active:scale-95 group/btn">
          View Company
          <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default SavedCompanyCard;
