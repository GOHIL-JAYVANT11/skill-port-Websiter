import React from 'react';
import { MapPin, Star, Users, Building2, Calendar, Globe, Twitter, Linkedin, Facebook } from 'lucide-react';

const CompanyDetailsHeader = ({ company }) => {
  return (
    <div className="relative">
      {/* Banner with Gradient */}
      <div className="h-48 sm:h-64 bg-gradient-to-r from-teal-600 to-teal-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 rounded-full translate-x-1/4 translate-y-1/4 blur-3xl"></div>
        </div>
      </div>

      {/* Profile Info Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col md:flex-row items-end gap-6 -mt-12 md:-mt-16 pb-8 border-b border-slate-100">
          {/* Logo */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-white shadow-xl border-4 border-white flex items-center justify-center overflow-hidden shrink-0 z-10">
            {company.logo ? (
              <img src={company.logo} alt={company.name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full bg-teal-50 flex items-center justify-center text-teal-600 font-bold text-3xl md:text-4xl uppercase">
                {company.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-6 w-full">
            <div className="space-y-2">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900">{company.name}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-slate-500">
                <span className="text-teal-600 font-bold px-2 py-0.5 bg-teal-50 rounded-md uppercase tracking-wider text-[10px] border border-teal-100">
                  {company.industry}
                </span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  {company.location}
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  Private Ltd
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Founded {company.foundedYear || '2015'}
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-slate-400 pt-1">
                <div className="flex items-center gap-1 text-amber-600">
                  <Star className="w-4 h-4 fill-amber-500" />
                  {company.rating} ({company.reviewsCount} Reviews)
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {company.followersCount || '12.4k'} Followers
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button className="flex-1 md:flex-none px-8 py-2.5 text-sm font-bold text-teal-600 bg-white border-2 border-teal-600 rounded-xl hover:bg-teal-50 transition-all active:scale-95">
                Follow
              </button>
              <button className="flex-1 md:flex-none px-8 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-teal-700 rounded-xl hover:shadow-lg hover:shadow-teal-500/20 transition-all active:scale-95">
                View Open Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetailsHeader;
