import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { ArrowRight, Loader2, Lock, User, Key, Mail, ShieldCheck } from 'lucide-react';

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState('email'); // 'email', 'login', 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. Check Email Logic
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Mock API call
      const res = await fetch('http://localhost:5000/api/auth/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      
      setTimeout(() => {
         if (data.exists) {
            setStep('login'); 
          } else {
            setStep('register');
          }
          setIsLoading(false);
      }, 800);
    } catch (err) {
      setError('Connection failed. Please try again.');
      setIsLoading(false);
    }
  };

  // 2. Login Logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    
    if (data.success) {
        loginUser(data.user, data.token);
        navigate('/'); 
    } else {
        setError(data.message);
        setIsLoading(false);
    }
  };

  // 3. Register Logic
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: 'tempPassword123' }) 
    });
    const data = await res.json();
    if(data.success) {
        loginUser(data.user, data.token);
        navigate('/');
    } else {
        setError(data.message);
        setIsLoading(false);
    }
  };

  return (
    // BACKGROUND: Dark with a subtle top spotlight
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#020617] selection:bg-indigo-500/30">
      
      {/* Background Gradients (The "Spotlight" Effect) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-900/20 to-transparent blur-3xl pointer-events-none"></div>
      
      {/* MAIN CARD */}
      <div className="relative w-full max-w-[440px] bg-white rounded-[2rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] p-8 md:p-12 z-10 transition-all duration-500 hover:shadow-[0_40px_70px_-10px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
        
        {/* Header Section */}
        <div className="text-center mb-10">
            {/* Animated Logo Container */}
            <div className="flex justify-center mb-6 relative">
                <div className="h-16 w-16 bg-[#020617] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl relative z-10 group cursor-pointer">
                    <span className="bg-gradient-to-br from-indigo-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">E</span>
                </div>
                {/* Logo Glow */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-indigo-500 blur-xl opacity-40 animate-pulse"></div>
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                {step === 'email' && 'Get Started'}
                {step === 'login' && 'Welcome Back'}
                {step === 'register' && 'Create Account'}
            </h2>
            <p className="text-slate-500 font-medium text-sm">
               {step === 'email' ? 'Enter your details to proceed' : <span className="px-3 py-1 bg-slate-100 rounded-full text-slate-700">{email}</span>}
            </p>
        </div>

        {/* Error Notification */}
        {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-center gap-3 animate-shake">
                <ShieldCheck size={18} /> {error}
            </div>
        )}

        {/* --- STEP 1: EMAIL --- */}
        {step === 'email' && (
            <form onSubmit={handleCheckEmail} className="flex flex-col gap-6 animate-fadeIn">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors h-5 w-5" />
                        <input
                            type="email"
                            required
                            className="w-full pl-14 pr-5 py-4.5 rounded-2xl bg-[#020617] border-2 border-slate-100 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-inner"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                <button 
                    disabled={isLoading}
                    className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-2 group"
                >
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Continue'}
                    {!isLoading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
                </button>
            </form>
        )}

        {/* --- STEP 2: PASSWORD --- */}
        {step === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col gap-6 animate-fadeIn">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors h-5 w-5" />
                        <input
                            type="password"
                            required
                            className="w-full pl-14 pr-5 py-4.5 rounded-2xl bg-[#020617] border-2 border-slate-100 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-inner"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                <button className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
                </button>
                
                <button type="button" onClick={() => setStep('email')} className="text-slate-400 text-sm font-medium hover:text-indigo-600 transition-colors">
                    Wrong email? Change it.
                </button>
            </form>
        )}

        {/* --- STEP 3: REGISTER --- */}
        {step === 'register' && (
            <form onSubmit={handleRegister} className="flex flex-col gap-5 animate-fadeIn">
                 <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative group">
                        <User className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors h-5 w-5" />
                        <input
                            type="text"
                            required
                            className="w-full pl-14 pr-5 py-4.5 rounded-2xl bg-[#020617] border-2 border-slate-100 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all duration-300 shadow-inner"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoFocus
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">OTP Verification</label>
                    <div className="relative group">
                        <Key className="absolute left-5 top-5 text-slate-500 group-focus-within:text-indigo-500 transition-colors h-5 w-5" />
                        <input
                            type="text"
                            className="w-full pl-14 pr-5 py-4.5 rounded-2xl bg-[#020617] border-2 border-slate-100 text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-all duration-300 tracking-widest font-mono shadow-inner"
                            placeholder="0 0 0 0"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                </div>

                <button className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-300 flex justify-center items-center gap-2 mt-2">
                    {isLoading ? <Loader2 className="animate-spin" /> : 'Create Account'}
                </button>
            </form>
        )}

      </div>
        
      {/* Footer */}
      <div className="absolute bottom-8 text-slate-600 text-xs font-medium tracking-wide flex gap-6">
        <a href="#" className="hover:text-indigo-400 transition-colors">Privacy</a>
        <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
        <a href="#" className="hover:text-indigo-400 transition-colors">Secure Login</a>
      </div>

    </div>
  );
};

export default Login;