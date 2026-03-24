import React from 'react';

const ExternalRedirectModal = ({ open, url, onCancel, onContinue }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60">
      <div className="w-[92%] max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center">
            <span className="text-amber-600 text-xl">⚠️</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">You're leaving SkillPORT</h3>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          This employer uses their own application portal.
          You will be redirected to:
        </p>
        <div className="mt-3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold text-slate-800 truncate">
          {url}
        </div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-3">
          SkillPORT will not track this application automatically.
        </p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-bold text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onContinue}
            className="px-5 py-2 text-sm font-extrabold text-white rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 shadow-sm active:scale-95"
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExternalRedirectModal;

