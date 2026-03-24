import React, { useContext, useMemo } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { JobContext } from '../../Context/JobContext';

const ApplicationsAIInsights = () => {
  const { applications } = useContext(JobContext);

  const insights = useMemo(() => {
    const total = applications?.length || 0;
    const highMatch = applications?.filter(app => app.has_required_skill).length || 0;
    const pending = applications?.filter(app => app.status === 'Applied' || app.status === 'Under Review').length || 0;
    const shortlisted = applications?.filter(app => app.status === 'Shortlisted').length || 0;

    if (total === 0) return "No applications to analyze yet.";

    return `${highMatch} high-match candidates · ${pending} pending review · ${shortlisted} shortlisted profiles ready`;
  }, [applications]);

  return (
    <section className="mb-6">
      <div className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 text-white rounded-3xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-100">
              AI Insights
            </p>
            <h3 className="text-sm sm:text-base font-black tracking-tight">
              {insights}
            </h3>
          </div>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-xs font-black text-teal-700 uppercase tracking-[0.25em] shadow-sm hover:bg-emerald-50 transition-all">
          <Zap className="w-4 h-4 text-amber-500" />
          Prioritize Now
        </button>
      </div>
    </section>
  );
};

export default ApplicationsAIInsights;

