import React from 'react';
import { X, Briefcase, GraduationCap, BadgeCheck, Clock, Star } from 'lucide-react';

const ApplicationsProfileDrawer = ({ application, isOpen, onClose }) => {
  if (!isOpen || !application) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <aside className="fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white shadow-2xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.25em]">
              Candidate Profile
            </p>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">
              {application.candidateName}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Summary */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white font-black text-lg shadow-md">
              {application.candidateName
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">
                {application.roleTitle}
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                {application.experience} · Applied for{' '}
                <span className="font-semibold text-slate-700">
                  {application.jobTitle}
                </span>
              </p>
            </div>
          </div>

          {/* Skills */}
          <section>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">
              Key Skills
            </p>
            <div className="flex flex-wrap gap-2">
              {application.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Experience timeline */}
          <section>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-2">
              Experience Timeline
            </p>
            <div className="space-y-3">
              {application.experienceTimeline.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="mt-1">
                    <div className="w-2 h-2 rounded-full bg-teal-500" />
                    {idx !== application.experienceTimeline.length - 1 && (
                      <div className="w-px h-8 bg-slate-200 mx-auto" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {item.company} · {item.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education & Certifications */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-teal-600" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">
                  Education
                </p>
              </div>
              <p className="text-xs font-semibold text-slate-900">
                {application.education}
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em]">
                  Certifications
                </p>
              </div>
              <ul className="space-y-1">
                {application.certifications.map((cert) => (
                  <li key={cert} className="text-[11px] text-slate-700">
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Ratings & history */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-xs">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2">
                Candidate Rating
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= application.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-3 shadow-xs">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.25em] mb-2">
                Application History
              </p>
              <div className="space-y-1.5 text-[11px] text-slate-600">
                <p>
                  <Clock className="w-3 h-3 inline mr-1 text-slate-400" />
                  Applied on {application.appliedDate}
                </p>
                <p>Status: {application.status}</p>
                {application.interviewStatus && (
                  <p>Interview: {application.interviewStatus}</p>
                )}
              </div>
            </div>
          </section>

          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.25em]">
            Contact details are hidden until hiring confirmation.
          </p>
        </div>
      </aside>
    </>
  );
};

export default ApplicationsProfileDrawer;

