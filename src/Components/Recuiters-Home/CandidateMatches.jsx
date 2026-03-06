import React, { useRef, useState, useEffect, useContext } from 'react';
import { ChevronRight, User, Briefcase, Zap, Star, MoreHorizontal, Calendar, CheckSquare, BrainCircuit, MapPin, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

const CandidateCard = ({ candidate }) => {
  return (
    <div className="min-w-[240px] xs:min-w-[260px] max-w-[280px] bg-white rounded-2xl border border-slate-100 p-4 shadow-sm hover:shadow-md hover:border-teal-100 transition-all group shrink-0 relative overflow-hidden">
      {/* AI Match Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 bg-teal-50 text-teal-700 rounded-full border border-teal-100/50">
        <BrainCircuit className="w-3 h-3" />
        <span className="text-[9px] font-black uppercase tracking-wider">{candidate.match}% Match</span>
      </div>

      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white text-sm font-black shadow-lg shadow-teal-500/20 border border-white overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500">
          {candidate.photo ? (
            <img src={candidate.photo} alt={candidate.name} className="w-full h-full object-cover" />
          ) : (
            candidate.name.split(' ').map(n => n[0]).join('')
          )}
        </div>
        <div className="flex-1 pr-12 pt-0.5">
          <h4 className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 text-sm leading-tight">{candidate.name}</h4>
          <p className="text-[11px] text-slate-500 font-bold mt-0.5 uppercase tracking-wider">{candidate.experience} Exp</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-[10px] font-bold truncate">{candidate.location}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
          <DollarSign className="w-3 h-3 text-slate-400 shrink-0" />
          <span className="text-[10px] font-bold truncate">{candidate.expectedSalary}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5 h-[44px] overflow-hidden">
        {candidate.skills.map((skill, index) => (
          <span key={index} className="px-2 py-1 bg-slate-100 text-slate-600 text-[9px] font-black rounded-md uppercase tracking-wider group-hover:bg-teal-50 group-hover:text-teal-700 transition-colors">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        <button className="w-full py-2.5 bg-slate-900 text-white text-[10px] font-black rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1.5 group/btn">
          Schedule Interview
          <Calendar className="w-3.5 h-3.5" />
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="py-2 border border-slate-100 text-slate-600 text-[9px] font-black rounded-xl hover:bg-teal-50 hover:text-teal-700 hover:border-teal-100 transition-all flex items-center justify-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5" />
            Shortlist
          </button>
          <button className="py-2 border border-slate-100 text-slate-600 text-[9px] font-black rounded-xl hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            Profile
          </button>
        </div>
      </div>
      
      {candidate.aiRecommended && (
        <div className="absolute -left-8 top-3.5 -rotate-45 bg-amber-500 text-white text-[7px] font-black px-10 py-1 uppercase tracking-widest shadow-sm">
          AI Reco
        </div>
      )}
    </div>
  );
};

const CandidateMatches = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await fetch('http://localhost:4518/gknbvg/SkillPort-admin/ertqyuiok/get-all-users', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data && data.data.users) {
            // Map API user data to candidate card format
            const mappedCandidates = data.data.users.map(user => ({
              id: user._id,
              name: user.Fullname || 'Unknown',
              experience: 'Fresher', // Fallback
              match: Math.floor(Math.random() * (99 - 70 + 1) + 70), // Mock match
              skills: user.skill && user.skill.length > 0 ? user.skill : ['React', 'Node.js', 'UI/UX'], // Fallback skills
              expectedSalary: 'Negotiable',
              location: user.location || 'Remote',
              aiRecommended: Math.random() > 0.7, // Randomly flag some as AI recommended
              photo: user.profilePic || user.userimage
            }));
            setCandidates(mappedCandidates);
          }
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchCandidates();
    }
  }, [token]);

  if (loading) return <div className="py-10 text-center text-xs text-slate-400">Loading candidates...</div>;
  if (candidates.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-5 px-1">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            Candidates
          </h2>
          <p className="text-[11px] text-slate-500 font-bold mt-0.5">Explore qualified candidates for your roles</p>
        </div>
        <button className="text-[11px] font-black text-teal-600 hover:text-teal-700 flex items-center gap-1 transition-colors bg-teal-50 px-3 py-1.5 rounded-full">
          <Link to="/candidates" className="flex items-center gap-1">
            View All <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar mask-fade-right">
        {candidates.map((candidate) => (
          <CandidateCard key={candidate.id} candidate={candidate} />
        ))}
      </div>
    </section>
  );
};

export default CandidateMatches;
