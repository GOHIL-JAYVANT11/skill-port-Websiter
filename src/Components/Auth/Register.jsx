import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Check, User, Briefcase } from 'lucide-react';
import logo from '../../assets/Images/SkillPORT_logo.png';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState('seeker'); // 'seeker' or 'recruiter'
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="flex min-h-screen w-full">
      {/* Left Side - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-white py-12">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
         <div className="w-[100px] h-[70px]  mb-5 ml-36 rounded-xl  flex items-center justify-center">
                                 <img
                                     src={logo}
                                     alt="SkillPORT logo"
                                     className="w-[100px] h-[70px] "
                                 />
         
                                 <span className="text-xl font-bold">
                                     Skill<span className="text-[#39C5B9]">PORT</span>
                                 </span>
                             </div>

          {/* Header */}
          <div className="mb-8 ml-24  ">
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
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder="Create a password (min. 8 characters)"
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="block w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all bg-gray-50"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

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
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-500/20"
            >
              Create Account
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-emerald-500 hover:text-emerald-600">
              Sign In
            </Link>
          </p>
        </div>
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
