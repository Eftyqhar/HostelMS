import React, { useState } from 'react';
import {
  Building2,
  Shield,
  User,
  Users,
  Search,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Wifi,
  Utensils,
  Shirt,
  BookOpen,
  Trophy,
  HeartPulse,
  Bed,
  Sparkles,
  Send,
  Moon,
  Sun,
  Menu,
  X,
  Star
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const {
    setRole,
    setViewMode,
    setActiveSidebarTab,
    darkMode,
    toggleDarkMode,
    showToast
  } = useHostel();

  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Room Admission & Availability',
    message: ''
  });

  const navigateTo = (portalRole: 'admin' | 'student', tab: string, path: string) => {
    setRole(portalRole);
    setActiveSidebarTab(tab);
    setViewMode('portal');
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Please fill out your name, email, and message.');
      return;
    }
    showToast(`Thank you ${contactForm.name}! Your inquiry has been sent to the Warden Desk.`);
    setContactForm({ name: '', email: '', subject: 'Room Admission & Availability', message: '' });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors ${
      darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#fafafa] text-slate-800'
    }`}>
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Institute Name */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer shrink-0"
          >
            <div className="w-10 h-10 rounded-xl bg-[#0c4a34] dark:bg-emerald-700 flex items-center justify-center text-white shadow-sm">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  HostelMS
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-none">
                Sirajganj Polytechnic Institute
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold text-slate-600 dark:text-slate-300">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[#0c4a34] dark:text-emerald-400 font-bold border-b-2 border-[#0c4a34] dark:border-emerald-400 pb-1 cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('admin', 'Blocks', '/blocks')}
              className="hover:text-[#0c4a34] dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Hostel Blocks
            </button>
            <button
              onClick={() => scrollToSection('facilities')}
              className="hover:text-[#0c4a34] dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Facilities
            </button>
            <button
              onClick={() => scrollToSection('dining')}
              className="hover:text-[#0c4a34] dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Dining
            </button>
            <button
              onClick={() => scrollToSection('notices')}
              className="hover:text-[#0c4a34] dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Notices
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-[#0c4a34] dark:hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <button
              onClick={() => scrollToSection('rooms')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Search rooms & notices"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Student Login Button */}
            <button
              onClick={() => navigateTo('student', 'Dashboard', '/student')}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer shadow-2xs active:scale-95"
            >
              <User className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <span>Student Login</span>
            </button>

            {/* Admin Login Button */}
            <button
              onClick={() => navigateTo('admin', 'Dashboard', '/admin')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0c4a34] hover:bg-[#093827] dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => navigateTo('student', 'Dashboard', '/student')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-200 dark:border-slate-700"
              >
                <User className="w-4 h-4" />
                Student Login
              </button>
              <button
                onClick={() => navigateTo('admin', 'Dashboard', '/admin')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-lg bg-[#0c4a34] text-white font-bold"
              >
                <Shield className="w-4 h-4" />
                Admin Login
              </button>
            </div>
            <button onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Home
            </button>
            <button onClick={() => navigateTo('admin', 'Blocks', '/blocks')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Hostel Blocks
            </button>
            <button onClick={() => scrollToSection('rooms')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Room Types & Availability
            </button>
            <button onClick={() => scrollToSection('facilities')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Hostel Facilities
            </button>
            <button onClick={() => scrollToSection('dining')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Daily Dining Menu
            </button>
            <button onClick={() => scrollToSection('notices')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Latest Notices
            </button>
            <button onClick={() => scrollToSection('contact')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Contact & Inquiry
            </button>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f4f8f5] via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Institution Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#eef7f2] dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800 text-[#0c4a34] dark:text-emerald-400 text-[11px] font-bold uppercase tracking-wider">
                <Building2 className="w-3.5 h-3.5" />
                <span>SIRAJGANJ POLYTECHNIC INSTITUTE</span>
              </div>

              {/* Bold Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white">
                A Better <br />
                Hostel Experience <br />
                for a Brighter Tomorrow
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Safe, comfortable and well-managed accommodation for our students. Explore hostel facilities, room details, dining information, notices and more — all in one place.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => navigateTo('student', 'Dashboard', '/student')}
                  className="px-6 py-3 rounded-lg font-bold text-xs sm:text-sm text-white bg-[#0c4a34] hover:bg-[#093827] dark:bg-emerald-700 dark:hover:bg-emerald-600 shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <span>Enter Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('rooms')}
                  className="px-6 py-3 rounded-lg font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer active:scale-95"
                >
                  Explore Hostel
                </button>
              </div>

              {/* 4 Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] dark:bg-emerald-950/60 text-[#0c4a34] dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">450+</p>
                    <p className="text-[11px] font-semibold text-slate-500">Residents</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] dark:bg-emerald-950/60 text-[#0c4a34] dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">3</p>
                    <p className="text-[11px] font-semibold text-slate-500">Hostel Blocks</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] dark:bg-emerald-950/60 text-[#0c4a34] dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Bed className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">150+</p>
                    <p className="text-[11px] font-semibold text-slate-500">Total Rooms</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#eef7f2] dark:bg-emerald-950/60 text-[#0c4a34] dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 dark:text-white leading-tight">24/7</p>
                    <p className="text-[11px] font-semibold text-slate-500">Security & Support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Image (Campus Building) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 dark:border-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=900&auto=format&fit=crop&q=80"
                  alt="Student Hostel - Sirajganj Polytechnic Institute"
                  className="w-full h-[380px] sm:h-[420px] object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs">
                  <p className="text-[10px] font-extrabold text-[#0c4a34] dark:text-emerald-400 uppercase tracking-wider">
                    STUDENT HOSTEL
                  </p>
                  <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                    Sirajganj Polytechnic Institute
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Two Dedicated Portal Cards */}
      <section className="py-10 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Self-Service Portal Card */}
            <div className="rounded-2xl p-6 sm:p-7 bg-[#eef7f2] dark:bg-slate-850 border border-emerald-200/70 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center gap-6 shadow-2xs">
              {/* Graphic Illustration */}
              <div className="w-32 h-32 shrink-0 bg-emerald-100/70 dark:bg-emerald-950/60 rounded-2xl flex items-center justify-center p-4">
                <div className="relative flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[#0c4a34] text-white flex items-center justify-center shadow-md">
                    <User className="w-8 h-8" />
                  </div>
                  <div className="w-20 h-10 mt-2 bg-emerald-600/30 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-[#0c4a34] dark:text-emerald-400" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#0c4a34] dark:text-emerald-400">
                  FOR STUDENTS
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Student Self-Service Portal
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Apply for hostel, check application status, view room details, meal schedule, notices and more.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('student', 'Dashboard', '/student')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-[#0c4a34] hover:bg-[#093827] dark:bg-emerald-700 dark:hover:bg-emerald-600 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Go to Student Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Warden Administration Portal Card */}
            <div className="rounded-2xl p-6 sm:p-7 bg-[#eff6ff] dark:bg-slate-850 border border-blue-200/70 dark:border-blue-900/50 flex flex-col sm:flex-row items-center gap-6 shadow-2xs">
              {/* Graphic Illustration */}
              <div className="w-32 h-32 shrink-0 bg-blue-100/70 dark:bg-blue-950/60 rounded-2xl flex items-center justify-center p-4">
                <div className="relative flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                    <Shield className="w-8 h-8" />
                  </div>
                  <div className="w-20 h-10 mt-2 bg-blue-600/30 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-700 dark:text-blue-300" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  FOR WARDEN & ADMIN
                </span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Warden Administration Portal
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Manage applications, allocate rooms, manage residents, handle complaints and view reports.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateTo('admin', 'Dashboard', '/admin')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all cursor-pointer shadow-xs active:scale-95"
                  >
                    <span>Go to Admin Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Room Types & Availability */}
      <section id="rooms" className="py-14 bg-[#fafafa] dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Room Types & Availability
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Explore different room types and find the best option for your stay.
              </p>
            </div>
            <button
              onClick={() => navigateTo('student', 'My Room', '/rooms')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Room Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Single Room */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&auto=format&fit=crop&q=80"
                    alt="Single Room"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-[#0c4a34] text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Most Popular</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Single Room</h3>
                  <p className="text-xs text-slate-500 mt-1">Ideal for privacy and focused study.</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">🛏️ 1 Bed</span>
                    <span className="flex items-center gap-1">🪑 Study Desk</span>
                    <span className="flex items-center gap-1">🚪 Wardrobe</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">৳ 4,500</span>
                      <span className="text-[11px] text-slate-400"> / month</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-full">
                      12 seats available
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => navigateTo('student', 'My Room', '/rooms')}
                  className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Double Room */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=700&auto=format&fit=crop&q=80"
                    alt="Double Room"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Best Value</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Double Room</h3>
                  <p className="text-xs text-slate-500 mt-1">Comfortable and spacious living.</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">🛏️ 2 Beds</span>
                    <span className="flex items-center gap-1">🪑 Study Desk</span>
                    <span className="flex items-center gap-1">🚪 Wardrobe</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">৳ 3,200</span>
                      <span className="text-[11px] text-slate-400"> / month</span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 px-2.5 py-1 rounded-full">
                      28 seats available
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => navigateTo('student', 'My Room', '/rooms')}
                  className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Triple Room */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&auto=format&fit=crop&q=80"
                    alt="Triple Room"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Economy</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Triple Room</h3>
                  <p className="text-xs text-slate-500 mt-1">Affordable option with essential facilities.</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">🛏️ 3 Beds</span>
                    <span className="flex items-center gap-1">🪑 Study Desk</span>
                    <span className="flex items-center gap-1">🚪 Wardrobe</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">৳ 2,200</span>
                      <span className="text-[11px] text-slate-400"> / month</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-800 px-2.5 py-1 rounded-full">
                      15 seats available
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => navigateTo('student', 'My Room', '/rooms')}
                  className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hostel Facilities Section */}
      <section id="facilities" className="py-14 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Hostel Facilities
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Facilities designed to ensure a safe, comfortable and productive student life.
              </p>
            </div>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Facilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-600 flex items-center justify-center mb-2.5">
                <Wifi className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">High-Speed Wi-Fi</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center mb-2.5">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">24/7 Security</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-950/70 text-teal-600 flex items-center justify-center mb-2.5">
                <Utensils className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Dining Hall</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-cyan-100 dark:bg-cyan-950/70 text-cyan-600 flex items-center justify-center mb-2.5">
                <Shirt className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Laundry & Press</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center mb-2.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Study Room</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 flex items-center justify-center mb-2.5">
                <Trophy className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Sports & Recreation</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-600 flex items-center justify-center mb-2.5">
                <HeartPulse className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Medical Support</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-950/70 text-green-700 flex items-center justify-center mb-2.5">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Common Room</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Daily Dining Menu & Latest Notices (2 Columns Side by Side) */}
      <section id="dining" className="py-14 bg-[#fafafa] dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Daily Dining Menu */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Daily Dining Menu
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Nutritious and hygienic meals prepared every day.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('student', 'Meal Menu', '/meals')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3 Meal Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* Breakfast */}
                <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="p-3.5 bg-[#eef7f2] dark:bg-emerald-950/40 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Breakfast</h4>
                    <p className="text-[10px] text-slate-500">7:00 AM - 9:00 AM</p>
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-1">
                      Bread, Egg, Tea, Banana
                    </p>
                  </div>
                  <div className="h-28 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&auto=format&fit=crop&q=80"
                      alt="Breakfast"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Lunch */}
                <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="p-3.5 bg-[#fef9c3]/50 dark:bg-amber-950/40 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Lunch</h4>
                    <p className="text-[10px] text-slate-500">12:00 PM - 2:00 PM</p>
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-1">
                      Rice, Chicken Curry, Vegetables, Lentil
                    </p>
                  </div>
                  <div className="h-28 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&auto=format&fit=crop&q=80"
                      alt="Lunch"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Dinner */}
                <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <div className="p-3.5 bg-[#eff6ff] dark:bg-blue-950/40 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">Dinner</h4>
                    <p className="text-[10px] text-slate-500">7:00 PM - 9:00 PM</p>
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-1">
                      Rice, Fish Curry, Salad, Dessert
                    </p>
                  </div>
                  <div className="h-28 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&auto=format&fit=crop&q=80"
                      alt="Dinner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Latest Notices & Announcements */}
            <div id="notices" className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Latest Notices & Announcements
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Official hostel bulletins and updates.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Notices List */}
              <div className="space-y-2.5">
                {/* Notice 1 */}
                <div
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">25</p>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Sep</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-rose-700 bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded-sm">
                          Important
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Fee Payment Deadline</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        Last date for hostel fee payment is 10th October 2026.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* Notice 2 */}
                <div
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">22</p>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Sep</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded-sm">
                          Notice
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Water Supply Interruption</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        Water supply will be interrupted on 24th September for tank cleaning.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* Notice 3 */}
                <div
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">18</p>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Sep</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded-sm">
                          Event
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Hostel Cleanliness Drive</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        Join us for a cleaner and healthier hostel environment.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* Notice 4 */}
                <div
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-slate-300 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="text-center px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">15</p>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Sep</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-700 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-1.5 py-0.5 rounded-sm">
                          General
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Guest/Visitor Policy Update</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        New guidelines for guest and visitor entry.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Need Help? & Send an Inquiry Section */}
      <section id="contact" className="py-14 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Need Help Card (Dark Green) */}
            <div className="lg:col-span-5 rounded-2xl p-7 sm:p-8 bg-[#0c4a34] text-white flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="space-y-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-white">Need Help?</h3>
                  <p className="text-xs text-emerald-100/90 mt-1 leading-relaxed">
                    For any inquiries, complaints or emergencies, contact the hostel office or warden.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-200">Hostel Helpline (24/7)</p>
                      <p className="text-sm font-bold text-white">+880 1723-456789</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-200">Email</p>
                      <p className="text-sm font-bold text-white">hostel@spi.edu.bd</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-emerald-300" />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-200">Hostel Office</p>
                      <p className="text-xs font-semibold text-white leading-relaxed">
                        Sirajganj Polytechnic Institute<br />
                        Sirajganj, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Subtle Watermark */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 opacity-10 pointer-events-none text-white">
                <Building2 className="w-full h-full" />
              </div>
            </div>

            {/* Right Send an Inquiry Card */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl p-7 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Have a question? Send us a message.
                </p>

                <form onSubmit={handleContactSubmit} className="mt-6 space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Enter your name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-[#0c4a34] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your email address"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-[#0c4a34] text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Subject
                    </label>
                    <select
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-[#0c4a34] text-xs"
                    >
                      <option>Room Admission & Availability</option>
                      <option>Hostel Fee & Payment Inquiry</option>
                      <option>Dining & Mess Facility Question</option>
                      <option>Guest / Visitor Permission</option>
                      <option>General Support / Complaint</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Message
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Type your message here..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-[#0c4a34] text-xs resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-lg text-xs font-bold text-white bg-[#0c4a34] hover:bg-[#093827] dark:bg-emerald-700 dark:hover:bg-emerald-600 shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Modern Dark Footer */}
      <footer className="bg-[#0b1320] text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <div className="w-7 h-7 rounded-lg bg-[#0c4a34] flex items-center justify-center text-white">
                  <Building2 className="w-4 h-4" />
                </div>
                <span>HostelMS</span>
              </div>
              <p className="text-[11px] font-medium text-slate-300">
                Sirajganj Polytechnic Institute
              </p>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Official Hostel Management System.<br />
                Better Living, Brighter Future.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Quick Links</h5>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white cursor-pointer">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('admin', 'Blocks', '/blocks')} className="hover:text-white cursor-pointer">
                    Hostel Blocks
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('facilities')} className="hover:text-white cursor-pointer">
                    Facilities
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('dining')} className="hover:text-white cursor-pointer">
                    Dining
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('notices')} className="hover:text-white cursor-pointer">
                    Notices
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-white cursor-pointer">
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Important Links</h5>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => navigateTo('student', 'Dashboard', '/student')} className="hover:text-white cursor-pointer">
                    Student Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('admin', 'Dashboard', '/admin')} className="hover:text-white cursor-pointer">
                    Admin Portal
                  </button>
                </li>
                <li>
                  <a href="https://spi.gov.bd" target="_blank" rel="noreferrer" className="hover:text-white">
                    Institute Website
                  </a>
                </li>
                <li>
                  <button onClick={() => navigateTo('student', 'Payments', '/payments')} className="hover:text-white cursor-pointer">
                    Online Payment
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('student', 'Hostel Rules', '/rules')} className="hover:text-white cursor-pointer">
                    Rules & Guidelines
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Contact Info</h5>
              <ul className="space-y-2.5 text-[11px] leading-relaxed">
                <li className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                  <span>Sirajganj Polytechnic Institute, Sirajganj, Bangladesh</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>hostel@spi.edu.bd</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>+880 1723-456789</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© 2024 HostelMS. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hover:text-white cursor-pointer">Privacy Policy</span>
              <span>|</span>
              <span className="hover:text-white cursor-pointer">Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
