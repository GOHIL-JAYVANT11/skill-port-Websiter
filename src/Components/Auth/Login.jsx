import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, AlertCircle, CheckCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import logo from '../../assets/Images/SkillPORT_logo.png';
import { useGoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
    const navigate = useNavigate();
    const { login, googleLogin } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            setIsLoading(true);
            try {
                // The tokenResponse.access_token is what we send to the backend
                await googleLogin(tokenResponse.access_token);
                toast.success('Google Login Successful', {
                    description: 'You have logged in successfully.'
                });
                navigate('/userhomepage');
            } catch (error) {
                toast.error('Google Login Failed', {
                    description: error.message || 'Failed to sign in with Google.'
                });
            } finally {
                setIsLoading(false);
            }
        },
        onError: () => {
            toast.error('Google Login Failed', {
                description: 'An error occurred during Google Sign In.'
            });
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;

        setIsLoading(true);
        try {
            await login(email, password);
            toast.success('Login Successful', {
                description: 'You have logged in successfully.'
            });
            navigate('/userhomepage');
        } catch (error) {
            toast.error('Login Failed', {
                description: error.message || 'Login failed. Please check your credentials.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full">
            {/* Left Side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 bg-[#F5F5F5]">
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
                    <div className="mb-8 ml-28">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                        <p className="text-gray-500">Sign in to your SkillPORT account</p>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleSubmit}>
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        <div className="flex items-center justify-between">
                            <label className="flex items-center cursor-pointer">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={rememberMe}
                                        onChange={() => setRememberMe(!rememberMe)}
                                    />
                                    <div className={`w-5 h-5 border rounded transition-colors ${rememberMe ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300 bg-white'}`}>
                                        {rememberMe && <Check size={14} className="text-white absolute top-0.5 left-0.5" />}
                                    </div>
                                </div>
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-emerald-500 hover:text-emerald-600">
                                Forgot Password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button 
                                type="button"
                                onClick={() => handleGoogleLogin()}
                                disabled={isLoading}
                                className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5 w-5 mr-2" alt="Google" />
                                <span className="text-sm font-medium text-gray-700">Google</span>
                            </button>
                            <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <img src="https://www.svgrepo.com/show/448234/linkedin.svg" className="h-5 w-5 mr-2" alt="LinkedIn" />
                                <span className="text-sm font-medium text-gray-700">LinkedIn</span>
                            </button>
                        </div>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-emerald-500 hover:text-emerald-600">
                            Create Account
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

export default Login;
