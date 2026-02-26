import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, User, Briefcase, Phone, Mail, Lock, ArrowRight, X, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import logo from '../../assets/Images/SkillPORT_logo.png';
import { EducationDetails } from './EducationDetails';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('seeker'); // 'seeker' or 'recruiter'
  const [agreed, setAgreed] = useState(false);
  const [isFreelancer, setIsFreelancer] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [registrationStep, setRegistrationStep] = useState('form'); // 'form', 'otp', 'education'
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [authDetails, setAuthDetails] = useState({ token: '', userId: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!agreed) {
      alert("Please agree to the Terms of Service");
      return;
    }

    setIsLoading(true);

   let roles = [];

        if (userType === 'seeker') {
          roles.push('Job Seeker');

          if (isFreelancer) {
            roles.push('Freelancer');
          }
        }

    const payload = {
      "Fullname": formData.fullName,
      "number": formData.phone,
      "email": formData.email,
      "password": formData.password,
      "Role": roles
    };

    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setRegistrationStep('otp');
      } else {
        const errorData = await response.json();
        alert('Registration failed: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "") {
      const nextSibling = document.getElementById(`otp-input-${index + 1}`);
      if (nextSibling) {
        nextSibling.focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const prevSibling = document.getElementById(`otp-input-${index - 1}`);
        if (prevSibling) {
          prevSibling.focus();
        }
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text");
    const pasteData = data.split("").filter(char => !isNaN(char)).slice(0, 6);
    
    if (pasteData.length > 0) {
      const newOtp = [...otp];
      pasteData.forEach((val, i) => {
        newOtp[i] = val;
      });
      setOtp(newOtp);
      
      // Focus the last filled input
      const lastIndex = Math.min(pasteData.length - 1, 5);
      setTimeout(() => {
          const inputToFocus = document.getElementById(`otp-input-${lastIndex}`);
          if (inputToFocus) inputToFocus.focus();
      }, 0);
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email
        })
      });

      if (response.ok) {
        toast.success('OTP Resent Successfully', {
          description: 'A new OTP has been sent to your email. Please check your inbox and verify.'
        });
      } else {
        const errorData = await response.json();
        toast.error('Resend Failed', {
          description: errorData.message || 'Failed to resend OTP. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Network Error', {
        description: 'Unable to connect to the server. Please check your connection and try again.'
      });
    }
  };

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) {
      toast.error('Invalid Input', {
        description: 'Please enter a valid 6-digit OTP code.'
      });
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch('http://localhost:4518/gknbvg/SkillPort-user/ertqyuiok/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          otp: otpValue
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming the response contains token and userId
        // If the backend structure is different, this might need adjustment
        const token = data.token; 
        const userId = data.userId || data.user?._id;

        // Save userId in cookies
        if (userId) {
          document.cookie = `userId=${userId}; path=/; max-age=86400`; // Expires in 24 hours
        }

        if (userType === 'seeker') {
             setAuthDetails({ token, userId });
             // Save basic info to cookies temporarily for EducationDetails to use
             const setCookie = (name, value, days = 1) => {
               const expires = new Date(Date.now() + days * 864e5).toUTCString();
               document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
             };
             if (token) setCookie('token', token);
             if (userId) setCookie('userId', userId);
             if (formData.fullName) setCookie('name', formData.fullName);
             if (formData.phone) setCookie('number', formData.phone);
             setCookie('role', 'seeker');

             toast.success('Verified Successfully!', {
                 description: 'Your email has been verified. Please complete your profile.'
             });
             setRegistrationStep('education');
        } else {
             toast.success('Verified Successfully!', {
                 description: 'Your account has been successfully verified and created.'
             });
             navigate('/login');
        }

       
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Invalid OTP';
        
        if (errorMessage.toLowerCase().includes('expired')) {
          toast.error('OTP Expired', {
            description: 'Your OTP verification time has expired. Please request a new code.'
          });
        } else {
          toast.error('Verification Failed', {
            description: errorMessage === 'Invalid OTP' ? 'The OTP you entered is invalid. Please check and try again.' : errorMessage
          });
        }
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Network Error', {
        description: 'Unable to connect to the server. Please check your connection and try again.'
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleEducationComplete = () => {
      toast.success('Profile Completed', {
          description: 'Your education details have been saved successfully.'
      });
      navigate('/login');
  };

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Register Form or OTP */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white py-12">
        {registrationStep === 'education' ? (
             <EducationDetails 
                onComplete={handleEducationComplete} 
                authToken={authDetails.token} 
                userId={authDetails.userId}
             />
        ) : registrationStep === 'otp' ? (
          <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-emerald-600" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify your Email</h2>
              <p className="text-gray-500">
                We've sent a verification code to <span className="font-medium text-gray-900">{formData.email}</span>
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enter OTP Code</label>
                <div className="flex gap-2 justify-between">
                  {otp.map((data, i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      maxLength={1}
                      value={data}
                      onChange={(e) => handleOtpChange(e.target, i)}
                      onKeyDown={(e) => handleOtpKeyDown(e, i)}
                      onPaste={handleOtpPaste}
                      className="w-12 h-12 text-center text-xl font-bold border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                    />
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={isVerifying}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Verify Account <ArrowRight size={18} /></>
                )}
              </button>

              <button
                type="button"
                onClick={() => setRegistrationStep('form')}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Back to Register
              </button>

              <p className="text-center text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button type="button" onClick={handleResendOtp} className="font-medium text-emerald-500 hover:text-emerald-600">
                  Resend
                </button>
              </p>
            </form>
          </div>
        ) : (
          <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="w-[100px] h-[70px] mb-5 ml-36 rounded-xl flex items-center justify-center">
            <img
              src={logo}
              alt="SkillPORT logo"
              className="w-[100px] h-[70px]"
            />
            <span className="text-xl font-bold">
              Skill<span className="text-[#39C5B9]">PORT</span>
            </span>
          </div>

          {/* Header */}
          <div className="mb-8 ml-24">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-500">Join SkillPORT and start your journey</p>
          </div>

          {/* User Type Toggle */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">I want to...</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setUserType('seeker')}
                className={`p-4 border rounded-xl flex flex-col items-start transition-all ${
                  userType === 'seeker'
                    ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                    : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg mb-3 ${userType === 'seeker' ? 'bg-white text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                  <User size={20} />
                </div>
                <div className="text-left">
                  <div className={`font-semibold ${userType === 'seeker' ? 'text-emerald-900' : 'text-gray-900'}`}>Find Jobs</div>
                  <div className="text-xs text-gray-500 mt-0.5">Job Seeker / Freelancer</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setUserType('recruiter')}
                className={`p-4 border rounded-xl flex flex-col items-start transition-all ${
                  userType === 'recruiter'
                    ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500'
                    : 'border-gray-200 hover:border-emerald-200 hover:bg-gray-50'
                }`}
              >
                <div className={`p-2 rounded-lg mb-3 ${userType === 'recruiter' ? 'bg-white text-emerald-600' : 'bg-gray-100 text-gray-500'}`}>
                  <Briefcase size={20} />
                </div>
                <div className="text-left">
                  <div className={`font-semibold ${userType === 'recruiter' ? 'text-emerald-900' : 'text-gray-900'}`}>Hire Talent</div>
                  <div className="text-xs text-gray-500 mt-0.5">Recruiter / Company</div>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleRegister}>
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Phone Number - NEW */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={20} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={20} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={20} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder="Create a password (min. 8 characters)"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Freelancer Option - NEW */}
            {userType === 'seeker' && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Are you also interested in Freelancing?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isFreelancer"
                      checked={isFreelancer === true}
                      onChange={() => setIsFreelancer(true)}
                      className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="isFreelancer"
                      checked={isFreelancer === false}
                      onChange={() => setIsFreelancer(false)}
                      className="w-4 h-4 text-emerald-500 focus:ring-emerald-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            )}

            {/* Terms */}
            <div className="flex items-start">
              <label className="flex items-start cursor-pointer">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={agreed}
                    onChange={() => setAgreed(!agreed)}
                  />
                  <div className={`w-5 h-5 border rounded transition-colors ${agreed ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 bg-white'}`}>
                    {agreed && <Check size={14} className="text-white absolute top-0.5 left-0.5" />}
                  </div>
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-emerald-500 hover:text-emerald-600">Terms of Service</a> and <a href="#" className="text-emerald-500 hover:text-emerald-600">Privacy Policy</a>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-emerald-500 hover:text-emerald-600">
              Sign In
            </Link>
          </p>
        </div>
      )}
      </div>

      {/* Right Side - Info Panel */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 text-white flex-col justify-center px-16 relative overflow-hidden sticky top-0 h-screen">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-4xl font-bold mb-6">Where Skills Meet Opportunities</h2>
          <p className="text-slate-400 text-lg mb-12">
            A smart skill-first hiring platform connecting Job Seekers, Freelancers, Recruiters & Companies with powerful matching and hiring tools.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <div className="text-3xl font-bold text-emerald-400 mb-1">50k+</div>
              <div className="text-sm text-slate-400">Job Seekers</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <div className="text-3xl font-bold text-emerald-400 mb-1">500+</div>
              <div className="text-sm text-slate-400">Companies</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <div className="text-3xl font-bold text-emerald-400 mb-1">1.4k+</div>
              <div className="text-sm text-slate-400">Active Jobs</div>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700/50">
              <div className="text-3xl font-bold text-emerald-400 mb-1">8.5k+</div>
              <div className="text-sm text-slate-400">Successful Hirings</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
