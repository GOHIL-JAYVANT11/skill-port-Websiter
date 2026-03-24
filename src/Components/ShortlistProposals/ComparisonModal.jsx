import React from 'react';
import { X } from 'lucide-react';

const ComparisonModal = ({ candidates, onClose }) => (
  <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl" onClick={onClose} />
    <div className="relative w-full max-w-5xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 max-h-[90vh]">
      <div className="p-8 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">Candidate Comparison</h2>
          <p className="text-slate-500 font-medium text-sm">Side-by-side skill and experience analysis</p>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-all">
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </div>
      
      <div className="flex-1 overflow-x-auto p-8 custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">Criteria</th>
              {candidates.map(c => (
                <th key={c.id} className="p-4 text-center border-b border-slate-100 min-w-[200px]">
                  <img src={c.profilePic || "https://ui-avatars.com/api/?name=" + c.candidateName} className="w-12 h-12 rounded-xl mx-auto mb-2 object-cover" alt="" />
                  <p className="text-sm font-black text-slate-900">{c.candidateName}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-sm">
            {[
              { label: 'Match Score', key: 'matchScore', suffix: '%' },
              { label: 'Experience', key: 'experience' },
              { label: 'Location', key: 'location' },
              { label: 'Skills', key: 'skills', type: 'tags' }
            ].map((row, i) => (
              <tr key={i} className="group">
                <td className="p-6 font-black text-slate-500 bg-slate-50/50 border-b border-slate-100">{row.label}</td>
                {candidates.map(c => (
                  <td key={c.id} className="p-6 text-center border-b border-slate-100 font-bold text-slate-700">
                    {row.type === 'tags' ? (
                      <div className="flex flex-wrap justify-center gap-1">
                        {c[row.key].slice(0, 3).map((s, idx) => (
                          <span key={idx} className="px-2 py-1 bg-teal-50 text-teal-600 rounded-lg text-[10px]">{s}</span>
                        ))}
                      </div>
                    ) : (
                      <span>{c[row.key]}{row.suffix}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-8 bg-slate-50 flex justify-end gap-4">
        <button onClick={onClose} className="px-8 py-4 text-slate-500 font-black text-sm uppercase tracking-widest hover:text-slate-700 transition-all">
          Close Comparison
        </button>
      </div>
    </div>
  </div>
);

export default ComparisonModal;
