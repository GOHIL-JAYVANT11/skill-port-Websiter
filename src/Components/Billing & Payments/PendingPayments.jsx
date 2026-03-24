import React from 'react';
import { Calendar, CreditCard, ArrowRight } from 'lucide-react';

const PendingPaymentCard = ({ payment, onPay, isProcessing }) => {
  const yearlySalary = payment.yearlyTotal || (payment.monthlySalary * 12);
  const commission = payment.commission || (yearlySalary * 0.08);

  return (
    <div className={`bg-white rounded-2xl border border-slate-100 p-6 shadow-md hover:shadow-xl transition-all duration-300 group ${isProcessing ? 'opacity-60 pointer-events-none' : ''}`}>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-lg font-black text-slate-900">{payment.candidateName}</h3>
          <p className="text-teal-600 font-bold text-sm">{payment.jobTitle}</p>
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-black uppercase tracking-widest rounded-lg border border-amber-100">
          Pending
        </span>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Monthly Salary</span>
          <span className="text-slate-900 font-bold">₹{payment.monthlySalary?.toLocaleString() || 0}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-500 font-medium">Yearly Total</span>
          <span className="text-slate-900 font-bold">₹{yearlySalary?.toLocaleString() || 0}</span>
        </div>
        <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
          <div>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block">Commission (8%)</span>
            <span className="text-2xl font-black text-slate-900">₹{commission?.toLocaleString() || 0}</span>
          </div>
          <div className="text-right">
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block">Due Date</span>
            <span className="text-sm font-bold text-slate-600 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> {payment.dueDate}
            </span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onPay(payment)}
        disabled={isProcessing}
        className="w-full py-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:shadow-lg hover:shadow-teal-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:from-slate-400 disabled:to-slate-300"
      >
        {isProcessing ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-4 h-4" /> Pay Now <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
      
      <div className="mt-4 text-center">
        <p className="text-[10px] text-slate-400 font-medium italic">
          ₹{payment.monthlySalary?.toLocaleString() || 0} × 12 × 8% = ₹{commission?.toLocaleString() || 0}
        </p>
      </div>
    </div>
  );
};

const PendingPayments = ({ payments, onPay, processingId }) => {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-8 bg-teal-500 rounded-full" />
        <h2 className="text-xl font-black text-slate-900 tracking-tight">Pending Commissions</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {payments.map(payment => (
          <PendingPaymentCard 
            key={payment.id} 
            payment={payment} 
            onPay={onPay} 
            isProcessing={processingId === payment._id}
          />
        ))}
      </div>
    </section>
  );
};

export default PendingPayments;
