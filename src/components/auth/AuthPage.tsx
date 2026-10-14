import React, { useState } from 'react';
import {
  Building2,
  Shield,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowLeft,
  Moon,
  Sun,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import { useNavigate } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const {
    role,
    setRole,
    setViewMode,
    darkMode,
    toggleDarkMode,
    showToast,
    addStudent
  } = useHostel();

  const navigate = useNavigate();

  // Mode: 'signin' | 'register'
  const [authMode, setAuthMode] = useState<'signin' | 'register'>('signin');
  // Selected portal role: 'student' | 'admin'
  const [selectedRole, setSelectedRole] = useState<'student' | 'admin'>(role || 'student');
  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Sign In Form State
  const [loginForm, setLoginForm] = useState({
    identifier: selectedRole === 'admin' ? 'admin@spi.edu.bd' : '1021',
    password: 'password123',
    rememberMe: true
  });

  // Registration Form State
  const [regForm, setRegForm] = useState({
    name: '',
    studentId: '',
    department: 'Computer Technology',
    semester: '4th Semester',
    email: '',
    phone: '',
    roomType: 'Double Room (৳ 3,200/mo)',
    password: '',
    confirmPassword: ''
  });

  const handleRoleChange = (newRole: 'student' | 'admin') => {
    setSelectedRole(newRole);
    setLoginForm((prev) => ({
      ...prev,
      identifier: newRole === 'admin' ? 'admin@spi.edu.bd' : '1021'
    }));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.identifier || !loginForm.password) {
      showToast('Please enter your credentials to log in.');
      return;
    }

    // Set role in context
    setRole(selectedRole);
    setViewMode('portal');

    if (selectedRole === 'admin') {
      showToast('Welcome back, Chief Warden! Logged into Warden Administration Portal.');
      navigate('/admin');
    } else {
      showToast(`Welcome back, Rahim Ahmed! Logged into Student Self-Service Portal.`);
      navigate('/student');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regForm.name || !regForm.studentId || !regForm.email || !regForm.password) {
      showToast('Please fill out all required fields.');
      return;
    }

    if (regForm.password !== regForm.confirmPassword) {
      showToast('Passwords do not match. Please recheck.');
      return;
    }

    // Add to students list
    const roomAssignment = regForm.roomType.includes('Single') ? 'A-101' : regForm.roomType.includes('Double') ? 'B-205' : 'C-302';
    const blockAssignment = regForm.roomType.includes('Single') ? 'Block A' : regForm.roomType.includes('Double') ? 'Block B' : 'Block C';
    addStudent({
      id: regForm.studentId,
      name: regForm.name,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      department: regForm.department,
      semester: regForm.semester,
      phone: regForm.phone || '+880 1700-000000',
      email: regForm.email,
      room: roomAssignment,
      block: blockAssignment,
      bedNo: `${roomAssignment}-01`,
      status: 'Active',
      checkInDate: 'Today'
    });

    setRole('student');
    setViewMode('portal');
    showToast(`Account successfully registered! Welcome to SPI Hostel, ${regForm.name}.`);
    navigate('/student');
  };

  // Quick 1-Click Fast Login Helpers
  const quickLoginAsStudent = () => {
    setRole('student');
    setViewMode('portal');
    showToast('Signed in as Student: Rahim Ahmed (Room B-203)');
    navigate('/student');
  };

  const quickLoginAsAdmin = () => {
    setRole('admin');
    setViewMode('portal');
    showToast('Signed in as Admin: Chief Warden Office');
    navigate('/admin');
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 flex flex-col justify-between ${
        darkMode ? 'dark bg-[#060b13] text-slate-100' : 'bg-[#f8fafc] text-slate-800'
      }`}
    >
      {/* 1. Header with Back Button, Brand & Theme Toggle */}
      <header
        className={`w-full border-b transition-colors ${
          darkMode ? 'bg-[#090e17] border-[#141f30]' : 'bg-white border-slate-200 shadow-2xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo Link to Home */}
          <button
            onClick={() => {
              setViewMode('home');
              navigate('/');
            }}
            className="flex items-center gap-3 cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0c4a34] flex items-center justify-center text-white shadow-sm border border-emerald-600/30">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none block">
                HostelMS
              </span>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-0.5 tracking-tight">
                Sirajganj Polytechnic Institute
              </p>
            </div>
          </button>

          {/* Right Action: Back to Home + Theme Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-amber-300 hover:bg-slate-100 dark:bg-[#0c1524] dark:border dark:border-[#162338] transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {darkMode ? <Moon className="w-4 h-4 fill-amber-300 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            <button
              onClick={() => {
                setViewMode('home');
                navigate('/');
              }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#0c1524] border border-slate-200 dark:border-[#162338] hover:bg-slate-50 dark:hover:bg-[#111e33] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Main Authentication Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl rounded-3xl overflow-hidden border border-slate-200/90 dark:border-[#162338] shadow-2xl bg-white dark:bg-[#09101c] grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Hero / Decorative Banner (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-5 p-8 bg-[#0c4a34] dark:bg-[#08151c] text-white flex-col justify-between relative overflow-hidden dark:border-r dark:border-[#162338]">
            <div className="relative z-10 space-y-6">
              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-[#0d2a20] text-emerald-200 dark:text-[#2ee693] text-[10px] font-extrabold tracking-wider uppercase border border-white/10 dark:border-[#134e3b]">
                <Sparkles className="w-3 h-3" />
                <span>OFFICIAL PORTAL ACCESS</span>
              </div>

              <div>
                <h2 className="text-2xl font-black text-white leading-tight">
                  Sirajganj Polytechnic <br />
                  <span className="text-emerald-300 dark:text-[#2ee693]">Hostel Management</span>
                </h2>
                <p className="text-xs text-emerald-100/90 dark:text-slate-300 mt-2 leading-relaxed">
                  Seamless portal for students and wardens to manage rooms, meal coupons, digital fee payments, and notifications.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-[#112420] flex items-center justify-center text-emerald-300 dark:text-[#2ee693] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-100 dark:text-slate-200">Instant Room & Bed Allocation</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-[#112420] flex items-center justify-center text-emerald-300 dark:text-[#2ee693] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-100 dark:text-slate-200">Daily Dining Meal Coupons</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-[#112420] flex items-center justify-center text-emerald-300 dark:text-[#2ee693] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-100 dark:text-slate-200">Online Fee Payment & Invoices</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/10 dark:bg-[#112420] flex items-center justify-center text-emerald-300 dark:text-[#2ee693] shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-medium text-slate-100 dark:text-slate-200">24/7 Security & Online Complaints</span>
                </div>
              </div>
            </div>

            {/* Quick One-Click Fast Login Pills */}
            <div className="relative z-10 pt-6 border-t border-white/10 dark:border-[#162338] space-y-2">
              <p className="text-[10px] font-bold text-emerald-200 dark:text-slate-400 uppercase tracking-wider">
                ⚡ Quick 1-Click Demo Login:
              </p>
              <div className="space-y-1.5">
                <button
                  type="button"
                  onClick={quickLoginAsStudent}
                  className="w-full text-left px-3 py-2 rounded-lg bg-white/10 dark:bg-[#0c1626] hover:bg-white/20 dark:hover:bg-[#122138] border border-white/10 dark:border-[#1a2b42] text-[11px] font-bold text-white flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-300 dark:text-[#2ee693]" />
                    <span>Student (Rahim Ahmed)</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-emerald-300 dark:text-[#2ee693]" />
                </button>

                <button
                  type="button"
                  onClick={quickLoginAsAdmin}
                  className="w-full text-left px-3 py-2 rounded-lg bg-white/10 dark:bg-[#0c1626] hover:bg-white/20 dark:hover:bg-[#122138] border border-white/10 dark:border-[#1a2b42] text-[11px] font-bold text-white flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-amber-300" />
                    <span>Chief Warden (Admin)</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-amber-300" />
                </button>
              </div>
            </div>

            {/* Subtle background building watermark */}
            <div className="absolute -bottom-10 -right-10 w-60 h-60 opacity-10 pointer-events-none text-white">
              <Building2 className="w-full h-full" />
            </div>
          </div>

          {/* Right Form Container */}
          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              {/* Mode Switcher Tabs: Sign In vs Create Account */}
              <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-[#0c1524] border border-slate-200 dark:border-[#162338] mb-6">
                <button
                  type="button"
                  onClick={() => setAuthMode('signin')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    authMode === 'signin'
                      ? 'bg-white dark:bg-[#15233a] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Sign In (Login)
                </button>

                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    authMode === 'register'
                      ? 'bg-white dark:bg-[#15233a] text-slate-900 dark:text-white shadow-xs'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  Create Account (Register)
                </button>
              </div>

              {/* Role Selection Tabs */}
              <div className="mb-6">
                <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Select Portal Role
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('student')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedRole === 'student'
                        ? 'bg-emerald-50 dark:bg-[#092b21] border-emerald-500 dark:border-[#2ee693] text-[#0c4a34] dark:text-[#2ee693] shadow-xs ring-2 ring-emerald-500/20'
                        : 'bg-white dark:bg-[#0c1524] border-slate-200 dark:border-[#162338] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#101c2e]'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Student Portal</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleChange('admin')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      selectedRole === 'admin'
                        ? 'bg-blue-50 dark:bg-[#0b244d] border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300 shadow-xs ring-2 ring-blue-500/20'
                        : 'bg-white dark:bg-[#0c1524] border-slate-200 dark:border-[#162338] text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-[#101c2e]'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Warden / Admin</span>
                  </button>
                </div>
              </div>

              {/* ============================================================== */}
              {/* SIGN IN FORM */}
              {/* ============================================================== */}
              {authMode === 'signin' && (
                <form onSubmit={handleSignIn} className="space-y-4">
                  {/* Identifier Input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {selectedRole === 'admin' ? 'Warden Email or Username' : 'Student ID or Roll No.'}
                    </label>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        {selectedRole === 'admin' ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <input
                        type="text"
                        required
                        value={loginForm.identifier}
                        onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                        placeholder={selectedRole === 'admin' ? 'admin@spi.edu.bd' : 'e.g. 1021'}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => showToast('Password reset link sent to your registered email or phone.')}
                        className="text-[11px] font-semibold text-blue-600 dark:text-[#2ee693] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={loginForm.rememberMe}
                        onChange={(e) => setLoginForm({ ...loginForm, rememberMe: e.target.checked })}
                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 dark:bg-[#0c1626] dark:border-[#1a2b42]"
                      />
                      <span>Keep me signed in</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-md mt-2 ${
                      darkMode
                        ? 'bg-[#2ee693] hover:bg-[#28cf84] text-[#032817] font-black'
                        : 'bg-[#0c4a34] hover:bg-[#083525] text-white font-bold'
                    }`}
                  >
                    <span>{selectedRole === 'admin' ? 'Sign In as Warden' : 'Sign In as Student'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* ============================================================== */}
              {/* REGISTRATION FORM */}
              {/* ============================================================== */}
              {authMode === 'register' && (
                <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
                  {/* Name & Student ID */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tanvir Hassan"
                        value={regForm.name}
                        onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Student ID / Roll No. *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1025"
                        value={regForm.studentId}
                        onChange={(e) => setRegForm({ ...regForm, studentId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Department & Semester */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Department / Technology
                      </label>
                      <select
                        value={regForm.department}
                        onChange={(e) => setRegForm({ ...regForm, department: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white"
                      >
                        <option>Computer Technology</option>
                        <option>Electrical Technology</option>
                        <option>Civil Technology</option>
                        <option>Mechanical Technology</option>
                        <option>Electronics Technology</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Semester
                      </label>
                      <select
                        value={regForm.semester}
                        onChange={(e) => setRegForm({ ...regForm, semester: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white"
                      >
                        <option>1st Semester</option>
                        <option>2nd Semester</option>
                        <option>3rd Semester</option>
                        <option>4th Semester</option>
                        <option>5th Semester</option>
                        <option>6th Semester</option>
                        <option>7th Semester</option>
                        <option>8th Semester</option>
                      </select>
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="student@spi.edu.bd"
                        value={regForm.email}
                        onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+880 1700-000000"
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400"
                      />
                    </div>
                  </div>

                  {/* Preferred Room Type */}
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Preferred Room Choice
                    </label>
                    <select
                      value={regForm.roomType}
                      onChange={(e) => setRegForm({ ...regForm, roomType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white"
                    >
                      <option>Single Room (৳ 4,500/mo - 1 Bed, Study Desk)</option>
                      <option>Double Room (৳ 3,200/mo - 2 Beds, Study Desk)</option>
                      <option>Triple Room (৳ 2,200/mo - 3 Beds, Study Desk)</option>
                    </select>
                  </div>

                  {/* Password & Confirm Password */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={regForm.password}
                          onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        >
                          {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={regForm.confirmPassword}
                          onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                          className="w-full pl-3.5 pr-9 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        >
                          {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Register Submit Button */}
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-md mt-3 ${
                      darkMode
                        ? 'bg-[#2ee693] hover:bg-[#28cf84] text-[#032817] font-black'
                        : 'bg-[#0c4a34] hover:bg-[#083525] text-white font-bold'
                    }`}
                  >
                    <span>Create Account & Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Bottom Footer Note */}
            <div className="pt-6 border-t border-slate-100 dark:border-[#162338] text-center text-[11px] text-slate-400">
              Need assistance with admission or hostel clearance?{' '}
              <button
                type="button"
                onClick={() => {
                  setViewMode('home');
                  navigate('/');
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 150);
                }}
                className="text-emerald-700 dark:text-[#2ee693] font-bold hover:underline cursor-pointer"
              >
                Contact Warden Desk
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Bottom Minimal Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 dark:text-slate-500">
        © 2024 HostelMS — Sirajganj Polytechnic Institute. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthPage;
