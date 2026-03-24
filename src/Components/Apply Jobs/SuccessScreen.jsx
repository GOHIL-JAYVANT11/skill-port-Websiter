import React from 'react';
import { Link } from 'react-router-dom';

const SuccessScreen = ({ applicationId, jobTitle, companyName, email }) => {
  return (
    <div className="max-w-lg mx-auto text-center py-16">
      <div className="mx-auto w-20 h-20 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center relative">
        <svg className="w-12 h-12 text-emerald-600" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="absolute inset-0 rounded-full animate-ping bg-emerald-400/20" />
      </div>
      <h2 className="mt-6 text-2xl font-extrabold text-slate-900">Application Submitted Successfully! 🎉</h2>
      <p className="mt-2 text-slate-600">
        Application ID: <span className="font-semibold">{applicationId}</span>
      </p>
      <p className="mt-1 text-slate-600">
        {jobTitle} — {companyName}
      </p>
      <p className="mt-4 text-sm text-slate-500">
        Recruiter will review and contact you soon. A confirmation email has been sent to {email || 'your email'}.
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          to="/my-applications"
          className="px-5 py-3 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50"
        >
          View My Applications
        </Link>
        <Link
          to="/jobs"
          className="px-5 py-3 rounded-lg bg-gradient-to-r from-teal-500 to-teal-700 text-white font-extrabold hover:from-teal-600 hover:to-teal-800"
        >
          Browse More Jobs
        </Link>
      </div>
    </div>
  );
};

export default SuccessScreen;

