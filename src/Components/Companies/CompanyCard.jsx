import React from 'react';
import { MapPin, Star, Briefcase, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ({ company }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md border border-transparent hover:border-teal-100 hover:shadow-lg transition-all duration-300 group cursor-pointer relative overflow-hidden">
      {/* Subtle Teal Highlight on Top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 p-2 overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-300">
          {company.logo ? (
            <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-teal-50 flex items-center justify-center text-teal-600 font-bold text-xl uppercase">
              {company.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold border border-amber-100">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
          {company.rating}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors leading-tight mb-1">
          {company.name}
        </h3>
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-slate-500 text-xs font-medium">
          <span className="text-teal-600 font-bold">{company.industry}</span>
          <span className="opacity-30">•</span>
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
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
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{company.reviewsCount} Reviews</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-5">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            // Follow logic
          }}
          className="py-2 text-xs font-bold text-teal-600 bg-white border-2 border-teal-600 rounded-xl hover:bg-teal-50 transition-all active:scale-95"
        >
          Follow
        </button>
        <button 
          onClick={() => navigate(`/companies/${company.id}`)}
          className="py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          View Details
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
