import React from 'react';

const StepProgress = ({ current }) => {
  const steps = [
    { id: 1, label: 'Basic Info' },
    { id: 2, label: 'Resume & Docs' },
    { id: 3, label: 'Job Questions & Submit' },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-teal-500 to-teal-700 transition-all duration-500"
            style={{ width: `${((current - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        {steps.map((step, idx) => {
          const isCompleted = current > step.id;
          const isActive = current === step.id;
          return (
            <div key={step.id} className="relative z-10 flex-1 flex flex-col items-center">
              <div
                className={[
                  'w-9 h-9 rounded-full flex items-center justify-center shadow-sm border transition-all duration-300',
                  isCompleted
                    ? 'bg-emerald-500 border-emerald-600 text-white'
                    : isActive
                    ? 'bg-teal-600 border-teal-700 text-white'
                    : 'bg-white border-slate-200 text-slate-400',
                ].join(' ')}
              >
                {isCompleted ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <span className="text-[11px] font-bold">{step.id}</span>
                )}
              </div>
              <span
                className={[
                  'mt-2 text-xs font-bold uppercase tracking-wider',
                  isActive ? 'text-teal-700' : 'text-slate-500',
                ].join(' ')}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;

