import React, { useMemo, useState } from 'react';
import {
  ArrowUpDown,
  Download,
} from 'lucide-react';
import ApplicationCard from './ApplicationCard';

const ApplicationsList = ({ onViewProfile }) => {
  const [sortBy, setSortBy] = useState('Newest Application');

  const applications = useMemo(
    () => [
      {
        id: 'APP-001',
        candidateId: 'C-1001',
        jobId: 'JOB-2026-001',
        candidateName: 'Alex Rivera',
        roleTitle: 'Full Stack Engineer',
        jobTitle: 'Senior React Developer',
        experience: '6 Years',
        matchScore: 96,
        status: 'Under Review',
        appliedDate: '2026-03-01',
        applicationStatus: 'Under Review',
        interviewStatus: 'Screening pending',
        shortlistedBy: 'SkillPORT AI',
        skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        education: 'B.Tech Computer Science · Stanford University',
        certifications: ['AWS Certified Developer', 'React Advanced'],
        experienceTimeline: [
          { title: 'Senior Engineer', company: 'FintechX', duration: '2 yrs' },
          { title: 'Engineer', company: 'CloudHub', duration: '3 yrs' },
        ],
        rating: 5,
      },
      {
        id: 'APP-002',
        candidateId: 'C-1002',
        jobId: 'JOB-2026-002',
        candidateName: 'Sarah Chen',
        roleTitle: 'Product Designer',
        jobTitle: 'Product Designer (UI/UX)',
        experience: '5 Years',
        matchScore: 88,
        status: 'Shortlisted',
        appliedDate: '2026-02-27',
        applicationStatus: 'Shortlisted',
        interviewStatus: 'Portfolio review scheduled',
        shortlistedBy: 'You',
        skills: ['Figma', 'Design Systems', 'Prototyping', 'User Research'],
        education: 'M.Des Interaction Design · NID',
        certifications: ['UX Research Pro', 'Design Systems Mastery'],
        experienceTimeline: [
          { title: 'Product Designer', company: 'ShopWave', duration: '2 yrs' },
          { title: 'UI Designer', company: 'Creative Labs', duration: '3 yrs' },
        ],
        rating: 4,
      },
      {
        id: 'APP-003',
        candidateId: 'C-1003',
        jobId: 'JOB-2026-003',
        candidateName: 'Marcus Johnson',
        roleTitle: 'Backend Developer',
        jobTitle: 'Backend Engineer',
        experience: '4 Years',
        matchScore: 79,
        status: 'Interview Scheduled',
        appliedDate: '2026-02-25',
        applicationStatus: 'Interview Scheduled',
        interviewStatus: 'Tech round · Mar 03',
        shortlistedBy: 'Hiring Manager',
        skills: ['Node.js', 'PostgreSQL', 'Docker', 'Redis'],
        education: 'B.Sc Computer Science · NYU',
        certifications: ['Database Performance Tuning'],
        experienceTimeline: [
          { title: 'Backend Developer', company: 'SaaSly', duration: '2 yrs' },
          { title: 'Software Engineer', company: 'DataCore', duration: '2 yrs' },
        ],
        rating: 4,
      },
      {
        id: 'APP-004',
        candidateId: 'C-1004',
        jobId: 'JOB-2026-001',
        candidateName: 'Elena Rodriguez',
        roleTitle: 'Software Engineer',
        jobTitle: 'Senior React Developer',
        experience: '3 Years',
        matchScore: 68,
        status: 'Rejected',
        appliedDate: '2026-02-20',
        applicationStatus: 'Rejected',
        interviewStatus: null,
        shortlistedBy: null,
        skills: ['JavaScript', 'React', 'HTML', 'CSS'],
        education: 'B.E. Information Technology · MIT',
        certifications: ['Frontend Performance Optimization'],
        experienceTimeline: [
          { title: 'Frontend Engineer', company: 'MediaLoop', duration: '3 yrs' },
        ],
        rating: 3,
      },
    ],
    [],
  );

  const sorted = useMemo(() => {
    const copy = [...applications];
    switch (sortBy) {
      case 'Highest Match %':
        copy.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case 'Experience High to Low':
        copy.sort(
          (a, b) =>
            parseInt(b.experience) - parseInt(a.experience),
        );
        break;
      case 'Recently Active':
      case 'Newest Application':
      default:
        copy.sort(
          (a, b) =>
            new Date(b.appliedDate).getTime() -
            new Date(a.appliedDate).getTime(),
        );
    }
    return copy;
  }, [applications, sortBy]);

  return (
    <section className="bg-transparent">
      {/* Header */}
      <div className="px-1 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div>
          <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Applications
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mt-1">
            Review, shortlist, and move candidates through your hiring pipeline.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] pl-3 pr-7 py-2 rounded-full border border-slate-200 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/60 appearance-none cursor-pointer"
            >
              <option>Newest Application</option>
              <option>Highest Match %</option>
              <option>Experience High to Low</option>
              <option>Recently Active</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-slate-200 bg-white text-[10px] font-black uppercase tracking-[0.25em] text-slate-700 hover:border-teal-500 hover:text-teal-700 transition-all shadow-sm">
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-6">
        {sorted.map((app) => (
          <ApplicationCard 
            key={app.id} 
            application={app} 
            onViewProfile={onViewProfile} 
          />
        ))}
      </div>
    </section>
  );
};

export default ApplicationsList;
