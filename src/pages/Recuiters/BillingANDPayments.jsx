import React, { useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, DollarSign, Wallet, ShieldCheck, CreditCard, CheckCircle, PieChart, BarChart3, Info , Download } from 'lucide-react';
import { AuthContext } from '../../Context/AuthContext';
import RecruiterNavbar from '../../Components/Recuiters-Home/RecruiterNavbar';
import RecruiterSidebar from '../../Components/Recuiters-Home/RecruiterSidebar';
import Footer from '../../Components/Home/Footer';
import BillingSummaryCards from '../../Components/Billing & Payments/BillingSummaryCards';
import PendingPayments from '../../Components/Billing & Payments/PendingPayments';
import PaymentHistory from '../../Components/Billing & Payments/PaymentHistory';
import { apiCall, API_BASE_URL, RECRUITER_API_BASE_URL, PAYMENT_API_BASE_URL } from '../../utils/api';
import { toast } from 'sonner';

const BillingANDPayments = () => {
  const { user, loading, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [processingPaymentId, setProcessingPaymentId] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  // Dynamic state for payments
  const [pendingPayments, setPendingPayments] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);

  // Fetch Data
  const fetchData = useCallback(async () => {
    if (!token) return;
    setIsFetching(true);
    try {
      // 1. Fetch Payment History (all-payments)
      const historyRes = await apiCall(`${PAYMENT_API_BASE_URL}/all-payments`, {
        method: 'GET'
      }, token);

      if (historyRes.success) {
        const formattedHistory = historyRes.data.map(item => ({
          id: item._id,
          _id: item._id,
          candidateName: item.candidateId?.Fullname || item.recruiterId?.Fullname || 'N/A',
          jobTitle: item.jobId?.jobtitle || (item.postType === 'FREELANCE' ? 'Freelance Project' : 'N/A'),
          monthlySalary: item.monthlySalary || item.totalProjectAmount || 0,
          commissionPaid: item.commissionAmount || 0,
          date: item.paidAt ? new Date(item.paidAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 
                new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          paymentId: item.razorpay_payment_id || 'N/A',
          status: item.status,
          postType: item.postType
        }));
        
        // Show ALL payments in history as requested, but keep them filtered for stats if needed
        setPaymentHistory(formattedHistory);
      }

      // 2. Fetch Selected Candidates (Pending Commissions)
      const selectedRes = await apiCall(`${RECRUITER_API_BASE_URL}/selected-candidates`, {
        method: 'GET'
      }, token);

      if (selectedRes.success) {
        const formattedPending = selectedRes.data.map((item, index) => ({
          id: item._id || `pending-${index}`,
          _id: item._id,
          candidateName: item.candidateName || 'Candidate',
          jobTitle: item.jobTitle || 'Job Post',
          monthlySalary: item.monthlySalary || 0,
          yearlyTotal: item.yearlyTotal || 0,
          commission: item.commission || 0,
          dueDate: item.dueDate ? new Date(item.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A',
        }));
        setPendingPayments(formattedPending);
      }

    } catch (error) {
      console.error('Fetch Error:', error);
      toast.error('Failed to load billing data');
    } finally {
      setIsFetching(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Razorpay script is already loaded in index.html

  // Static Data for Dashboard
  const stats = useMemo(() => {
    const paid = paymentHistory.reduce((acc, curr) => acc + curr.commissionPaid, 0);
    const pending = pendingPayments.reduce((acc, curr) => acc + (curr.monthlySalary * 12 * 0.08), 0);
    return {
      totalSpending: paid + pending,
      pendingAmount: pending,
      paidAmount: paid,
      totalHires: paymentHistory.length + pendingPayments.length
    };
  }, [pendingPayments, paymentHistory]);

  // Role protection
  useEffect(() => {
    if (!loading && user) {
      const role = user.role || user.Role || '';
      const roleStr = (Array.isArray(role) ? role[0] : role).toLowerCase();
      if (roleStr !== 'recruiter') navigate('/user-home');
    } else if (!loading && !user) navigate('/login');
  }, [user, loading, navigate]);

  const handlePayNow = async (payment) => {
    console.log('Initiating payment for:', payment);
    try {
      setProcessingPaymentId(payment._id);
      
      // 1. Create Razorpay Order
      const orderResponse = await apiCall(`${PAYMENT_API_BASE_URL}/create-order`, {
        method: 'POST',
        body: JSON.stringify({ 
          paymentId: payment._id 
        })
      }, token);

      console.log('Order Response:', orderResponse);

      // Handle common API patterns: data.order, data.data, or data directly
      const orderData = orderResponse.order || orderResponse.data || orderResponse;
      
      if (!orderData || !orderData.id) {
        console.error('Invalid order data structure. Looked in .order, .data, and root:', orderResponse);
        throw new Error("Backend response missing 'id' for Razorpay order.");
      }

      if (!window.Razorpay) {
        console.error('Razorpay SDK not found on window');
        toast.error("Razorpay SDK failed to load. Please check your internet connection.");
        setProcessingPaymentId(null);
        return;
      }

      // 2. Initialize Razorpay Checkout
      const options = {
        // IMPORTANT: Replace this placeholder with your actual Razorpay Public Key from Dashboard
        // Find it at: Razorpay Dashboard -> Settings -> API Keys
        key: "rzp_test_SUOXQBHdOQMjWB", 
        amount: orderData.amount, // Amount should be in paise from backend (e.g. ₹100 = 10000)
        currency: orderData.currency || "INR",
        name: "SkillPORT",
        description: `Commission for ${payment.candidateName}`,
        order_id: orderData.id,
        handler: async function(response) {
          console.log('Razorpay Success Response:', response);
          try {
            // 3. Verify Payment
            const verifyResponse = await apiCall(`${PAYMENT_API_BASE_URL}/verify-payment`, {
              method: 'POST',
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            }, token);

            console.log('Verification Response:', verifyResponse);

            if (verifyResponse.success) {
              // 4. Update UI
              setShowSuccessModal(true);
              fetchData(); // Refresh all data from server
              toast.success('Payment settled successfully!');
            } else {
              toast.error(verifyResponse.message || 'Payment verification failed.');
            }
          } catch (error) {
            console.error('Verification Error:', error);
            toast.error('Payment verification failed. Please contact support.');
          } finally {
            setProcessingPaymentId(null);
          }
        },
        prefill: {
          name: user.Fullname || "",
          email: user.email || "",
        },
        theme: {
          color: "#14B8A6",
        },
        modal: {
          ondismiss: function() {
            console.log('Razorpay modal dismissed');
            setProcessingPaymentId(null);
          },
          // Added to handle escape key and background click
          escape: true,
          backdropclose: false
        }
      };

      console.log('Opening Razorpay with options:', options);
      try {
        const rzp = new window.Razorpay(options);
        
        rzp.on('payment.failed', function (response){
          console.error('Razorpay Payment Failed:', response.error);
          toast.error(`Payment Failed: ${response.error.description}`);
          setProcessingPaymentId(null);
        });

        rzp.open();
        console.log('rzp.open() called successfully');
      } catch (rzpError) {
        console.error('Error creating or opening Razorpay instance:', rzpError);
        throw new Error("Failed to initialize Razorpay checkout popup.");
      }

    } catch (error) {
      console.error('Payment Initialization Error:', error);
      toast.error(error.message || 'Failed to initialize payment.');
      setProcessingPaymentId(null);
    }
  };

  if (loading || isFetching) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">Loading Financials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-teal-100 selection:text-teal-900 overflow-x-hidden">
      <RecruiterNavbar onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex pt-16 max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="hidden lg:block lg:w-[260px] shrink-0">
          <RecruiterSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        </div>

        <main className="flex-1 min-w-0 p-3 sm:p-4 md:p-6 xl:pr-0">
          <div className="max-w-[1200px] mx-auto space-y-10">
            
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-emerald-50">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em]">Financial Console</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                  Billing & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-400">Payments</span>
                </h1>
                <p className="text-slate-500 text-sm mt-3 font-medium flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" /> 
                  Secure commission settlements for your skill-based hires.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                  <Download className="w-4 h-4" /> Download Report
                </button>
              </div>
            </header>

            {/* Summary */}
            <BillingSummaryCards stats={stats} />

            {/* Commission Logic Banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-[32px] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <PieChart className="w-48 h-48" />
              </div>
              <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <Info className="w-5 h-5 text-teal-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-teal-400">Transparent Pricing</span>
                  </div>
                  <h2 className="text-2xl font-black mb-2">How we calculate commission</h2>
                  <p className="text-slate-400 font-medium">We charge a flat 8% yearly commission on the candidate's monthly salary for every successful hire through SkillPORT.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center gap-8">
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Monthly Salary</p>
                    <p className="text-xl font-black">₹10,000</p>
                  </div>
                  <div className="text-teal-400 font-black">× 12</div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Yearly Salary</p>
                    <p className="text-xl font-black">₹1,20,000</p>
                  </div>
                  <div className="text-teal-400 font-black">× 8%</div>
                  <div className="text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-teal-400 mb-1">Total Fee</p>
                    <p className="text-2xl font-black text-teal-400">₹9,600</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pending Payments */}
            <PendingPayments 
              payments={pendingPayments} 
              onPay={handlePayNow} 
              processingId={processingPaymentId}
            />

            {/* History Table */}
            <PaymentHistory history={paymentHistory} />

            {/* Job-wise Breakdown (Simple) */}
            <section className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-8 bg-blue-500 rounded-full" />
                <h2 className="text-xl font-black text-slate-900 tracking-tight">Post-wise Spending</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { 
                    title: 'Job Postings', 
                    count: paymentHistory.filter(p => p.postType === 'JOB').length, 
                    total: paymentHistory.filter(p => p.postType === 'JOB').reduce((acc, curr) => acc + curr.commissionPaid, 0) 
                  },
                  { 
                    title: 'Freelance Projects', 
                    count: paymentHistory.filter(p => p.postType === 'FREELANCE').length, 
                    total: paymentHistory.filter(p => p.postType === 'FREELANCE').reduce((acc, curr) => acc + curr.commissionPaid, 0) 
                  }
                ].map((post, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <h4 className="font-black text-slate-900 mb-4">{post.title}</h4>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Settled</p>
                        <p className="text-xl font-black text-slate-900">{post.count}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission Paid</p>
                        <p className="text-xl font-black text-teal-600">₹{post.total.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setShowSuccessModal(false)} />
          <div className="relative bg-white rounded-[40px] p-10 text-center shadow-2xl max-w-sm w-full animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Payment Successful</h3>
            <p className="text-slate-500 font-medium mb-8">Your commission payment has been processed securely. Transaction ID: #TXN_987654321</p>
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all"
            >
              Great!
            </button>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
      `}} />
    </div>
  );
};

export default BillingANDPayments;
