import React from 'react';

const AIHints = () => {
  const tips = [
    'Candidates with cover letters get 2x more callbacks',
    'Upload your latest resume for better match score',
    'Complete all fields to increase selection chances',
    'Your profile matches 78% of this job ✅',
  ];

  return (
    <aside className="hidden xl:block w-72 shrink-0 sticky top-36">
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-slate-100 shadow-md p-5">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
            <span className="text-teal-700 text-lg">💡</span>
          </div>
          <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">AI Tips</h4>
        </div>
        <ul className="space-y-3">
          {tips.map((t, i) => (
            <li
              key={i}
              className="text-[12px] leading-relaxed text-slate-700 font-medium flex gap-2"
            >
              <span className="mt-1 text-teal-600">•</span>
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AIHints;

