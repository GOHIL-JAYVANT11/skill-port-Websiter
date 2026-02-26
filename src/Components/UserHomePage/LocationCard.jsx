import React from 'react';
import { MapPin, Navigation, Map as MapIcon, ChevronRight } from 'lucide-react';

const LocationCard = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col items-center text-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
        <MapIcon className="w-full h-full scale-150 rotate-12" />
      </div>

      <div className="w-20 h-20 rounded-3xl bg-teal-50 flex items-center justify-center p-5 mb-6 group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-md border border-teal-100">
        <MapPin className="w-full h-full text-teal-600 fill-teal-600/10" />
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">Where are you located in Ahmedabad?</h3>
      <p className="text-sm text-slate-500 font-medium max-w-xs mx-auto mb-6 md:mb-8">
        Add your specific area to see the most relevant jobs near you and reduce commute time.
      </p>

      <div className="w-full max-w-sm flex flex-col sm:flex-row items-center gap-3">
        <button className="w-full sm:flex-1 py-3.5 md:py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-sm font-bold shadow-lg shadow-slate-900/10 hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
          <Navigation className="w-4 h-4" />
          Add Area
        </button>
        <button className="w-full sm:w-auto px-6 py-3.5 md:py-4 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-2xl text-sm font-bold transition-all">
          Not Now
        </button>
      </div>
      
      <div className="mt-6 flex items-center gap-1 text-[10px] font-bold text-teal-600 uppercase tracking-widest">
        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
        Personalizing your experience
      </div>
    </div>
  );
};

export default LocationCard;
