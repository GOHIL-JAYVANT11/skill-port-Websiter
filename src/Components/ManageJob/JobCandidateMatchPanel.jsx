import React from 'react';
import { Briefcase, Sparkles, ArrowUpRight } from 'lucide-react';
import MatchedCandidateCard from '../SkillMatch/MatchedCandidateCard';

const JobCandidateMatchPanel = () => {
  const candidates = [
    {
      id: 1,
      name: 'Alex Rivera',
      role: 'Full Stack Engineer',
      match: 98,
      experience: '6 Years',
      location: 'San Francisco, CA',
      salary: '$140k - $160k',
      shortlisted: true,
      skills: {
        matched: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        missing: ['GraphQL'],
      },
    },
    {
      id: 2,
      name: 'Sarah Chen',
      role: 'Frontend Architect',
      match: 92,
      experience: '8 Years',
      location: 'Austin, TX',
      salary: '$150k - $170k',
      shortlisted: false,
      skills: {
        matched: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'System Design'],
        missing: ['Node.js', 'Express'],
      },
    },
    {
      id: 3,
      name: 'Marcus Johnson',
      role: 'Senior Backend Developer',
      match: 85,
      experience: '5 Years',
      location: 'Remote',
      salary: '$130k - $150k',
      shortlisted: false,
      skills: {
        matched: ['Node.js', 'PostgreSQL', 'Docker', 'Redis'],
        missing: ['React', 'TypeScript'],
      },
    },
  ];

  const jobs = [
    {
      id: 'JOB-2026-001',
      title: 'Senior React Developer',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
    },
    {
      id: 'JOB-2026-002',
      title: 'Product Designer (UI/UX)',
      skills: ['Figma', 'UI Design', 'Prototyping', 'User Research'],
    },
    {
      id: 'JOB-2026-003',
      title: 'Backend Engineer',
      skills: ['Node.js', 'PostgreSQL', 'Docker', 'Redis'],
    },
  ];

  const getJobMatchesForCandidate = (candidate) => {
    const candidateSkills = candidate.skills?.matched || [];

    return jobs
      .map((job) => {
        const overlap = candidateSkills.filter((skill) => job.skills.includes(skill));
        const score =
          job.skills.length === 0 ? 0 : Math.round((overlap.length / job.skills.length) * 100);
        return { ...job, overlap, score };
      })
      .filter((j) => j.score > 0)
      .sort((a, b) => b.score - a.score);
  };

  return (
    <section className="mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em]">
              AI Recommended Candidates
            </p>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
              See which jobs best fit this profile
            </h2>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {candidates.map((candidate) => {
          const bestJobMatches = getJobMatchesForCandidate(candidate);

          return (
            <div
              key={candidate.id}
              className="flex flex-col xl:flex-row gap-6"
            >
              <div className="xl:flex-[7] min-w-0">
                <MatchedCandidateCard candidate={candidate} />
              </div>

              <aside className="xl:flex-[3] w-full xl:w-auto">
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 sticky top-24 space-y-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em]">
                        Matching Job Listings
                      </p>
                      <h3 className="text-sm font-black text-slate-900 tracking-tight mt-1">
                        30% view – how this candidate fits your jobs
                      </h3>
                    </div>
                    <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                      <Briefcase className="w-4 h-4" />
                    </div>
                  </div>

                  {bestJobMatches.length === 0 ? (
                    <p className="text-[11px] text-slate-500">
                      No strong skill overlap found between this candidate and your current job posts.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {bestJobMatches.map((job) => (
                        <div
                          key={job.id}
                          className="p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-teal-100 transition-all group"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                {job.id}
                              </p>
                              <p className="text-xs font-black text-slate-900 leading-snug">
                                {job.title}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                job.score >= 75
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : 'bg-amber-50 text-amber-700 border border-amber-100'
                              }`}
                            >
                              {job.score}% Match
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 mb-1">
                            Overlap on{' '}
                            <span className="font-semibold text-slate-700">
                              {job.overlap.join(', ') || 'no primary skills'}
                            </span>
                          </p>
                          <button className="mt-1 inline-flex items-center gap-1 text-[10px] font-black text-teal-700 uppercase tracking-[0.2em] group-hover:translate-x-0.5 transition-transform">
                            View job details
                            <ArrowUpRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.25em] pt-1 border-t border-dashed border-slate-100 mt-2">
                    70% candidate insights • 30% job match view
                  </p>
                </div>
              </aside>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default JobCandidateMatchPanel;

