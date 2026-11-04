import React, { useState } from 'react';
import { ThumbsUp, Sparkles, Mail, Lock, User, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

// Desk worker illustration (matching Figma auth screens right side)
const WorkerIllustration = () => (
  <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-[#F8FAFC]">
    <div className="relative w-full max-w-sm flex flex-col items-center">
      {/* Desk and person vector graphic */}
      <div className="w-64 h-52 relative flex items-center justify-center">
        {/* Wall clock */}
        <div className="absolute top-2 left-6 w-8 h-8 rounded-full border-2 border-slate-300 flex items-center justify-center bg-white">
          <div className="w-2.5 h-2.5 border-l-2 border-b-2 border-slate-600 -mt-0.5 -ml-0.5" />
        </div>

        {/* Desk */}
        <div className="absolute bottom-6 w-60 h-4 bg-indigo-600 rounded-md shadow-md" />
        <div className="absolute bottom-0 left-8 w-2 h-6 bg-indigo-800" />
        <div className="absolute bottom-0 right-8 w-2 h-6 bg-indigo-800" />

        {/* Person */}
        <div className="absolute bottom-10 flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-[#1B2559] border-2 border-white shadow-xs" />
          <div className="w-14 h-16 bg-[#4880FF] rounded-t-2xl mt-1 shadow-sm" />
          <div className="w-16 h-8 bg-[#1B2559] rounded-b-lg" />
        </div>

        {/* Laptop */}
        <div className="absolute bottom-10 right-14 w-12 h-9 bg-purple-500 rounded-t-md border-t-2 border-white flex items-center justify-center text-white text-[8px] font-bold">
          Base
        </div>

        {/* Plant */}
        <div className="absolute bottom-10 right-4 flex flex-col items-center">
          <div className="w-6 h-6 rounded-full bg-emerald-400" />
          <div className="w-5 h-4 bg-amber-700 rounded-b-md" />
        </div>
      </div>
    </div>
  </div>
);

// 1. LOGIN SCREEN
export const LoginScreen = ({ onNavigate, onLoginSuccess }) => {
  const [email, setEmail] = useState('easin.arafat@base.io');
  const [password, setPassword] = useState('••••••••');
  const [remember, setRemember] = useState(true);

  return (
    <div className="min-h-[600px] bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
      <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Base Logo */}
        <div className="w-12 h-12 rounded-full bg-[#4880FF] flex items-center justify-center text-white mb-6 shadow-md shadow-[#4880FF]/25">
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current stroke-[2.5] fill-none">
            <path d="M4 14.5c2.5-3 5-3 7.5 1s5 4 8.5-3" />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
          Sign In
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-1 mb-6">
          Access your SaaS dashboard workspace
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLoginSuccess?.();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <button
                type="button"
                onClick={() => onNavigate?.('recover')}
                className="text-xs font-bold text-[#4880FF] hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 text-[#4880FF] rounded"
            />
            <label htmlFor="remember" className="text-xs font-medium text-slate-600">
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 rounded-2xl text-sm font-bold shadow-md cursor-pointer"
          >
            Sign In
          </Button>

          <p className="text-xs text-center text-slate-400 mt-4">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate?.('signup')}
              className="font-bold text-[#4880FF] hover:underline"
            >
              Sign Up
            </button>
          </p>
        </form>
      </div>

      <WorkerIllustration />
    </div>
  );
};

// 2. SIGN UP SCREEN
export const SignUpScreen = ({ onNavigate, onSignUpSuccess }) => {
  return (
    <div className="min-h-[620px] bg-white rounded-3xl shadow-card border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
      <div className="flex-1 p-8 sm:p-12 flex flex-col justify-center max-w-md mx-auto w-full">
        {/* Base Logo */}
        <div className="w-12 h-12 rounded-full bg-[#4880FF] flex items-center justify-center text-white mb-4 shadow-md shadow-[#4880FF]/25">
          <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current stroke-[2.5] fill-none">
            <path d="M4 14.5c2.5-3 5-3 7.5 1s5 4 8.5-3" />
          </svg>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">
          Sign Up
        </h2>
        <p className="text-xs text-slate-400 font-medium mt-1 mb-5">
          Create your account to start managing
        </p>

        {/* Social Login Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            <span>Google</span>
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">
            <span>Facebook</span>
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignUpSuccess?.();
          }}
          className="space-y-3.5"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Easin Arafat"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Create strong password"
              className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="terms" required className="w-4 h-4 text-[#4880FF] rounded" />
            <label htmlFor="terms" className="text-[11px] font-medium text-slate-500">
              I agree to the Terms of Service & Privacy Policy
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 rounded-2xl text-sm font-bold shadow-md cursor-pointer mt-2"
          >
            Create Account
          </Button>

          <p className="text-xs text-center text-slate-400 mt-3">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => onNavigate?.('login')}
              className="font-bold text-[#4880FF] hover:underline"
            >
              Log In
            </button>
          </p>
        </form>
      </div>

      <WorkerIllustration />
    </div>
  );
};

// 3. RECOVER PASSWORD SCREEN (Row 4, Col 5 in Figma)
export const RecoverScreen = ({ onNavigate }) => {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-[500px] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-slate-100 text-center">
        {/* Base Logo */}
        <div className="w-14 h-14 rounded-full bg-[#4880FF] flex items-center justify-center text-white mx-auto mb-5 shadow-md shadow-[#4880FF]/25">
          <svg viewBox="0 0 24 24" className="w-7 h-7 stroke-current stroke-[2.5] fill-none">
            <path d="M4 14.5c2.5-3 5-3 7.5 1s5 4 8.5-3" />
          </svg>
        </div>

        <h3 className="text-2xl font-extrabold text-[#1B2559]">Recover</h3>
        <p className="text-xs text-slate-400 font-medium mt-1 mb-6">
          Enter your registered email address to receive password instructions
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Recovery instructions sent to ${email}`);
            onNavigate?.('login');
          }}
          className="space-y-4"
        >
          <div className="text-left">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. client@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none"
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 rounded-2xl text-sm font-bold shadow-md cursor-pointer"
          >
            Send New Password
          </Button>

          <button
            type="button"
            onClick={() => onNavigate?.('login')}
            className="text-xs font-bold text-[#4880FF] hover:underline block mx-auto mt-4"
          >
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

// 4. CONFIRM SUCCESS SCREEN (Row 5, Col 1 in Figma: Thumbs up with confetti)
export const ConfirmScreen = ({ onNavigate }) => {
  return (
    <div className="min-h-[500px] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 sm:p-10 shadow-card border border-slate-100 text-center animate-fade-in">
        {/* Thumbs up with confetti animation */}
        <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#E8F4FD] rounded-full animate-pulse" />
          <div className="w-16 h-16 rounded-full bg-[#4880FF] text-white flex items-center justify-center shadow-lg shadow-[#4880FF]/30 relative z-10">
            <ThumbsUp className="w-8 h-8" />
          </div>
          {/* Confetti specks */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-pink-400" />
          <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 rounded-full bg-amber-400" />
          <span className="absolute top-2 -left-2 w-2 h-2 rounded-full bg-emerald-400" />
          <span className="absolute -top-2 left-6 w-2 h-2 rounded-full bg-purple-400" />
        </div>

        <h3 className="text-xl font-extrabold text-[#1B2559]">
          Your account successfully created
        </h3>
        <p className="text-xs text-slate-400 font-medium mt-2 mb-6">
          Welcome to Base! Your SaaS dashboard is ready to use.
        </p>

        <Button
          variant="primary"
          className="w-full py-3 rounded-2xl text-sm font-bold shadow-md cursor-pointer"
          onClick={() => onNavigate?.('dashboard')}
        >
          Done Now
        </Button>
      </div>
    </div>
  );
};

