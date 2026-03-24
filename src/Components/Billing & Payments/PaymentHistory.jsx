import React from 'react';
import { Search, Download, ExternalLink } from 'lucide-react';

const PaymentHistory = ({ history }) => {
  return (
    <section className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Payment History</h2>
          <p className="text-slate-500 text-sm font-medium">Track all your past commission settlements</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="pl-10 pr-4 py-2 bg-slate-50 border-transparent rounded-xl text-xs font-bold focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all w-full sm:w-64"
            />
          </div>
          <button className="p-2.5 bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Candidate & Job</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Salary</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission Paid</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
              <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Receipt</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {history.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="p-6">
                  <p className="font-black text-slate-900">{item.candidateName}</p>
                  <p className="text-xs font-bold text-teal-600">{item.jobTitle}</p>
                </td>
                <td className="p-6 font-bold text-slate-600">₹{item.monthlySalary.toLocaleString()}</td>
                <td className="p-6 font-black text-slate-900">₹{item.commissionPaid.toLocaleString()}</td>
                <td className="p-6 text-slate-500 font-medium">{item.date}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-lg border shadow-sm ${
                    item.status === 'PAID' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100 shadow-emerald-100/50' 
                    : 'bg-amber-50 text-amber-600 border-amber-100 shadow-amber-100/50'
                  }`}>
                    {item.status || 'Pending'}
                  </span>
                </td>
                <td className="p-6">
                  <button className="text-slate-400 hover:text-teal-600 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="p-6 bg-slate-50/30 border-t border-slate-50 flex justify-center">
        <button className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] hover:text-slate-600 transition-all">
          Load More Transactions
        </button>
      </div>
    </section>
  );
};

export default PaymentHistory;
