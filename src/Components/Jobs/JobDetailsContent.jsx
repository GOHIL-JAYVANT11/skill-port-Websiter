import React from 'react';
import { Star, Globe, Twitter, Linkedin, Facebook, MapPin, Briefcase, IndianRupee, Clock } from 'lucide-react';

const JobDetailsContent = ({ job }) => {
  const skills = Array.isArray(job.skills) ? job.skills : [];
  const benefits = Array.isArray(job.benefits) ? job.benefits : [];
  const metaRows = [
    { label: 'Employment Type', value: job.employmentType },
    { label: 'Work Mode', value: job.workMode },
    { label: 'Department', value: job.department },
    { label: 'Industry', value: job.industry },
    { label: 'Openings', value: job.openings },
    { label: 'Qualification', value: job.qualification },
    { label: 'Degree Required', value: job.degreeRequired },
    { label: 'Interview Mode', value: job.interviewMode },
    { label: 'Deadline', value: job.deadline ? new Date(job.deadline).toLocaleDateString() : '' },
  ].filter(r => r.value !== undefined && r.value !== null && String(r.value).trim() !== '');

  return (
    <div className="space-y-6">
      {/* Job Main Metadata Row */}
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 py-2 text-slate-600 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-semibold">{job.experience}</span>
        </div>
        <div className="flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-semibold">{job.salary}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-semibold">{job.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-semibold">Posted {job.postedTime}</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-bold text-slate-900 mb-3">Job Description</h3>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {job.description}
            </p>
          </section>

          {metaRows.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-slate-900 mb-3">Job Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {metaRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{row.label}</span>
                    <span className="text-sm font-semibold text-slate-800">{row.value}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(job.salaryMin !== null || job.salaryMax !== null || job.salaryType) && (
            <section>
              <h3 className="text-base font-bold text-slate-900 mb-3">Salary</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {job.salaryType && (
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Type</span>
                    <span className="text-sm font-semibold text-slate-800">{job.salaryType}</span>
                  </div>
                )}
                {job.salaryMin !== null && (
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Min</span>
                    <span className="text-sm font-semibold text-slate-800">₹{job.salaryMin}</span>
                  </div>
                )}
                {job.salaryMax !== null && (
                  <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-lg px-4 py-3">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Max</span>
                    <span className="text-sm font-semibold text-slate-800">₹{job.salaryMax}</span>
                  </div>
                )}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-base font-bold text-slate-900 mb-3">Key Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {benefits.length > 0 && (
            <section>
              <h3 className="text-base font-bold text-slate-900 mb-3">Benefits</h3>
              <div className="flex flex-wrap gap-2">
                {benefits.map((b, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg border border-slate-100">
                    {b}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      {/* About Company Card */}
      {job.companyAbout ? (
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 p-1.5">
                <img src={job.companyLogo || 'https://via.placeholder.com/64'} alt={job.companyName} className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-0.5">{job.companyName}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded border border-amber-100">
                    {job.companyRating || '4.8'} <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  </div>
                  <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{job.industry}</span>
                </div>
              </div>
            </div>
            <button className="px-4 py-1.5 border border-teal-600 text-teal-600 text-xs font-bold rounded-lg hover:bg-teal-50 transition-all">
              Follow
            </button>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed mb-6">
            {job.companyAbout}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-50">
            <div className="flex gap-6">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Followers</p>
                <p className="text-xs font-bold text-slate-900">12.4k</p>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">Size</p>
                <p className="text-xs font-bold text-slate-900">200-500</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {[Globe, Linkedin, Twitter, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="p-1.5 text-slate-400 hover:text-teal-600 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default JobDetailsContent;
