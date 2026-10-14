import React, { useState } from 'react';
import {
  Building2,
  Shield,
  Users,
  Search,
  ArrowRight,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Wifi,
  Utensils,
  BookOpen,
  HeartPulse,
  Bed,
  Send,
  Moon,
  Sun,
  Menu,
  X,
  Star,
  Activity,
  Coffee,
  Soup
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import { useNavigate } from 'react-router-dom';

/* SVG Vector Illustration for Student Portal (matches reference image in both light and dark mode) */
const StudentIllustration: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 drop-shadow-md"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Soft background glow shadow */}
    <ellipse cx="100" cy="175" rx="55" ry="10" fill={isDark ? '#06281e' : '#cbe4d4'} opacity="0.7" />
    {/* Body / Jacket */}
    <path
      d="M65 180V125C65 105 80 92 100 92C120 92 135 105 135 125V180H65Z"
      fill={isDark ? '#195e47' : '#144634'}
    />
    {/* Collar / Shirt detail */}
    <path d="M92 92L100 110L108 92" stroke={isDark ? '#2ee693' : '#e6f4ea'} strokeWidth="3" strokeLinecap="round" />
    {/* Backpack */}
    <rect x="52" y="105" width="22" height="50" rx="8" fill={isDark ? '#0b1d16' : '#0d281e'} />
    <path d="M74 112C74 112 85 118 85 132" stroke={isDark ? '#071510' : '#081b14'} strokeWidth="4" strokeLinecap="round" />
    {/* Head & Neck */}
    <rect x="94" y="75" width="12" height="20" rx="4" fill="#f7caa0" />
    <circle cx="100" cy="62" r="18" fill="#f7caa0" />
    {/* Hair */}
    <path
      d="M83 60C83 48 91 42 104 42C116 42 119 49 119 55C115 54 110 55 108 58C103 54 94 56 90 62C86 61 84 64 83 66V60Z"
      fill="#1b232a"
    />
    <path d="M102 54C114 55 118 62 119 66C117 64 114 63 111 64" fill="#1b232a" />
  </svg>
);

/* SVG Vector Illustration for Warden / Admin Portal (matches reference image in both light and dark mode) */
const AdminIllustration: React.FC<{ isDark?: boolean }> = ({ isDark = false }) => (
  <svg
    viewBox="0 0 200 200"
    className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 drop-shadow-md"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Shadow ellipse */}
    <ellipse cx="100" cy="180" rx="60" ry="10" fill={isDark ? '#0b1c38' : '#cbdcf8'} opacity="0.7" />
    {/* Office Desk */}
    <rect x="30" y="145" width="140" height="8" rx="3" fill={isDark ? '#1e3860' : '#93b4e6'} />
    <rect x="36" y="153" width="8" height="32" rx="2" fill={isDark ? '#142745' : '#719ad6'} />
    <rect x="156" y="153" width="8" height="32" rx="2" fill={isDark ? '#142745' : '#719ad6'} />
    {/* Desktop Monitor on Stand */}
    <rect x="42" y="98" width="56" height="40" rx="4" fill={isDark ? '#0f172a' : '#1e3a8a'} />
    <rect x="46" y="102" width="48" height="32" rx="2" fill={isDark ? '#38bdf8' : '#60a5fa'} />
    {/* Chart on screen */}
    <path d="M52 124L62 114L70 120L84 108" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    {/* Monitor stand & base */}
    <rect x="67" y="138" width="6" height="7" fill={isDark ? '#0f172a' : '#1e3a8a'} />
    <rect x="60" y="144" width="20" height="3" rx="1.5" fill={isDark ? '#0f172a' : '#1e3a8a'} />
    {/* Keyboard & Mouse */}
    <rect x="52" y="142" width="28" height="4" rx="1" fill={isDark ? '#64748b' : '#cbd5e1'} />
    <ellipse cx="88" cy="144" rx="3" ry="2" fill={isDark ? '#64748b' : '#cbd5e1'} />
    {/* Warden / Admin Person in Blue Shirt */}
    {/* Chair back */}
    <rect x="132" y="108" width="12" height="44" rx="5" fill={isDark ? '#1d4ed8' : '#1d4ed8'} />
    {/* Body */}
    <path
      d="M108 175V132C108 116 122 108 136 108C150 108 158 116 158 132V175H108Z"
      fill={isDark ? '#2563eb' : '#2563eb'}
    />
    {/* Arm typing on keyboard */}
    <path
      d="M120 128L88 142"
      stroke="#2563eb"
      strokeWidth="10"
      strokeLinecap="round"
    />
    <circle cx="86" cy="143" r="4" fill="#f7caa0" />
    {/* Head & Hair */}
    <rect x="131" y="92" width="10" height="16" fill="#f7caa0" />
    <circle cx="136" cy="80" r="15" fill="#f7caa0" />
    <path
      d="M122 78C122 68 128 62 140 62C150 62 153 68 153 74C149 73 145 74 142 77C137 73 130 75 127 80Z"
      fill="#1b232a"
    />
  </svg>
);

/* Washing machine icon for Laundry & Press */
const LaundryIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <circle cx="12" cy="13" r="5" />
    <path d="M12 10a3 3 0 0 1 3 3" />
    <circle cx="7" cy="6" r="1" fill="currentColor" />
  </svg>
);

/* Study Desk SVG icon */
const DeskIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h18" />
    <path d="M5 8v10" />
    <path d="M19 8v10" />
    <path d="M15 8v6h4" />
  </svg>
);

/* Wardrobe SVG icon */
const WardrobeIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M12 2v20" />
    <path d="M9 10v2" />
    <path d="M15 10v2" />
  </svg>
);

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
    subject: '',
    message: ''
  });

  const navigateTo = (portalRole: 'admin' | 'student', tab: string, path: string) => {
    setRole(portalRole);
    setActiveSidebarTab(tab);
    setViewMode('portal');
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAuth = (initialRole: 'student' | 'admin' = 'student') => {
    setRole(initialRole);
    setMobileMenuOpen(false);
    setViewMode('auth');
    navigate('/login');
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
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div
      className={`min-h-screen font-sans transition-colors duration-200 ${
        darkMode ? 'dark bg-[#060b13] text-slate-100' : 'bg-[#ffffff] text-slate-800'
      }`}
    >
      {/* 1. Top Navbar */}
      <header
        className={`sticky top-0 z-50 transition-colors border-b ${
          darkMode
            ? 'bg-[#090e17] border-[#141f30]'
            : 'bg-white border-slate-200/80 shadow-2xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Institute Subtitle */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer shrink-0"
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
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] font-semibold">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`pb-1 cursor-pointer font-bold ${
                darkMode
                  ? 'text-[#2ee693] border-b-2 border-[#2ee693]'
                  : 'text-[#0c4a34] border-b-2 border-[#0c4a34]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('admin', 'Blocks', '/blocks')}
              className="text-slate-600 dark:text-slate-300 hover:text-[#0c4a34] dark:hover:text-[#2ee693] transition-colors cursor-pointer"
            >
              Hostel Blocks
            </button>
            <button
              onClick={() => scrollToSection('facilities')}
              className="text-slate-600 dark:text-slate-300 hover:text-[#0c4a34] dark:hover:text-[#2ee693] transition-colors cursor-pointer"
            >
              Facilities
            </button>
            <button
              onClick={() => scrollToSection('dining')}
              className="text-slate-600 dark:text-slate-300 hover:text-[#0c4a34] dark:hover:text-[#2ee693] transition-colors cursor-pointer"
            >
              Dining
            </button>
            <button
              onClick={() => scrollToSection('notices')}
              className="text-slate-600 dark:text-slate-300 hover:text-[#0c4a34] dark:hover:text-[#2ee693] transition-colors cursor-pointer"
            >
              Notices
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-slate-600 dark:text-slate-300 hover:text-[#0c4a34] dark:hover:text-[#2ee693] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <button
              onClick={() => scrollToSection('rooms')}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white bg-transparent hover:bg-slate-100 dark:bg-[#0c1524] dark:border dark:border-[#162338] transition-colors cursor-pointer"
              title="Search rooms"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-amber-300 hover:bg-slate-100 dark:bg-[#0c1524] dark:border dark:border-[#162338] transition-colors cursor-pointer"
              title={darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            >
              {darkMode ? <Moon className="w-4 h-4 fill-amber-300 text-amber-300" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            {/* Get Started Button (Opens Login / Registration Portal) */}
            <button
              onClick={() => navigateToAuth('student')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-xl text-xs transition-all cursor-pointer shadow-md active:scale-95 ${
                darkMode
                  ? 'bg-[#2ee693] hover:bg-[#28cf84] text-[#032817] font-black'
                  : 'bg-[#0c4a34] hover:bg-[#083525] text-white font-bold'
              }`}
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#0c1524] lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-5 bg-white dark:bg-[#090e17] border-b border-slate-200 dark:border-[#141f30] space-y-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="mb-3">
              <button
                onClick={() => navigateToAuth('student')}
                className={`w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm ${
                  darkMode
                    ? 'bg-[#2ee693] hover:bg-[#28cf84] text-[#032817] font-black'
                    : 'bg-[#0c4a34] hover:bg-[#083525] text-white font-bold'
                }`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#0c1524] text-slate-800 dark:text-slate-200"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('admin', 'Blocks', '/blocks')}
              className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#0c1524] text-slate-800 dark:text-slate-200"
            >
              Hostel Blocks
            </button>
            <button
              onClick={() => scrollToSection('facilities')}
              className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#0c1524] text-slate-800 dark:text-slate-200"
            >
              Facilities
            </button>
            <button
              onClick={() => scrollToSection('dining')}
              className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#0c1524] text-slate-800 dark:text-slate-200"
            >
              Dining
            </button>
            <button
              onClick={() => scrollToSection('notices')}
              className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#0c1524] text-slate-800 dark:text-slate-200"
            >
              Notices
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-[#0c1524] text-slate-800 dark:text-slate-200"
            >
              Contact
            </button>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section className="pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 bg-[#ffffff] dark:bg-[#060b13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              {/* Institution Pill Badge matching Dark Mockup exactly */}
              <div
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold tracking-wider uppercase ${
                  darkMode
                    ? 'bg-[#082219] border border-[#0f4a35] text-[#2ee693]'
                    : 'bg-[#eef7f2] border border-emerald-200/90 text-[#0c4a34]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#2ee693] animate-pulse"></span>
                <span>OFFICIAL HOSTEL MANAGEMENT SYSTEM</span>
              </div>

              {/* Bold 2-tone Headline matching dark reference mockup */}
              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-black tracking-tight leading-[1.12]">
                <span className="text-slate-900 dark:text-white block">
                  Your Campus Hostel,
                </span>
                <span className="text-[#0c4a34] dark:text-[#2ee693] block">
                  A Better Tomorrow
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg leading-relaxed">
                Safe, comfortable and well-managed accommodation for our students. Everything you need — room details, dining information, notices, facilities and more — all in one place.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  onClick={() => navigateToAuth('student')}
                  className={`px-6 py-3 rounded-lg font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm ${
                    darkMode
                      ? 'bg-[#2ee693] hover:bg-[#28cf84] text-[#032817] font-black'
                      : 'bg-[#0c4a34] hover:bg-[#083525] text-white'
                  }`}
                >
                  <span>Enter Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => scrollToSection('rooms')}
                  className="px-6 py-3 rounded-lg font-bold text-xs sm:text-sm text-slate-800 dark:text-white bg-white dark:bg-[#0c1524] border border-slate-300 dark:border-[#1a2b42] hover:bg-slate-50 dark:hover:bg-[#111e33] transition-all cursor-pointer active:scale-95"
                >
                  Explore Hostel
                </button>
              </div>
            </div>

            {/* Right Hero Image (Student Hostel Building at Night in Dark Mode!) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-[#162338] bg-slate-900 group">
                <img
                  src={
                    darkMode
                      ? 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1100&auto=format&fit=crop&q=80'
                      : 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=1000&auto=format&fit=crop&q=80'
                  }
                  alt="Student Hostel Sirajganj Polytechnic Institute"
                  className="w-full h-[360px] sm:h-[440px] object-cover object-center group-hover:scale-[1.01] transition-transform duration-500 brightness-90 dark:brightness-100"
                />

                {/* Night Glow Gradient Overlay for building lights in dark mode */}
                {darkMode && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060b13]/80 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Hand-written script aesthetic quote in top-right corner from mockup */}
                <div className="absolute top-4 right-5 text-right pointer-events-none">
                  <p className="font-serif italic text-xs sm:text-sm text-amber-200/90 dark:text-emerald-200/90 drop-shadow-md">
                    "A Safe Place<br />to Live, Learn<br />and Grow"
                  </p>
                </div>

                {/* Building Signage on Facade */}
                <div className="absolute bottom-5 left-5 bg-white/95 dark:bg-[#09101c]/95 backdrop-blur-md px-5 py-3 rounded-xl border border-slate-200/90 dark:border-[#1b2b42] shadow-lg">
                  <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white tracking-widest uppercase leading-tight font-serif">
                    STUDENT HOSTEL
                  </p>
                  <p className="text-[10px] sm:text-xs font-bold text-[#0c4a34] dark:text-[#2ee693] uppercase tracking-wider mt-0.5">
                    SIRAJGANJ POLYTECHNIC INSTITUTE
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Unified Floating Stats Bar */}
          <div className="mt-8 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-sm grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-100 dark:divide-[#162338] p-2 sm:p-3">
            {/* Stat 1 */}
            <div className="p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#eef7f2] dark:bg-[#08261c] text-[#0c4a34] dark:text-[#2ee693] flex items-center justify-center shrink-0 border dark:border-[#104b37]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">450+</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Residents</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#eef7f2] dark:bg-[#08261c] text-[#0c4a34] dark:text-[#2ee693] flex items-center justify-center shrink-0 border dark:border-[#104b37]">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">3</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Hostel Blocks</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#eef7f2] dark:bg-[#08261c] text-[#0c4a34] dark:text-[#2ee693] flex items-center justify-center shrink-0 border dark:border-[#104b37]">
                <Bed className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">150+</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Total Rooms</p>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="p-4 flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#eef7f2] dark:bg-[#08261c] text-[#0c4a34] dark:text-[#2ee693] flex items-center justify-center shrink-0 border dark:border-[#104b37]">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 dark:text-white leading-none">24/7</p>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Security & Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Two Dedicated Portal Cards */}
      <section className="py-8 bg-white dark:bg-[#060b13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Student Self-Service Portal Card */}
            <div className="rounded-2xl p-6 sm:p-7 bg-[#ebf4ef] dark:bg-[#0a1816] border border-emerald-200/80 dark:border-[#11382d] flex flex-col sm:flex-row items-center gap-6 shadow-xs">
              <StudentIllustration isDark={darkMode} />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#0c4a34] dark:text-[#2ee693]">
                  FOR STUDENTS
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Student Self-Service Portal
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Apply for hostel, check application status, view room details, meal schedule, notices and more.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateToAuth('student')}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                      darkMode
                        ? 'bg-[#2ee693] hover:bg-[#28cf84] text-[#032817] font-black'
                        : 'bg-[#0c4a34] hover:bg-[#083525] text-white'
                    }`}
                  >
                    <span>Go to Student Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Warden Administration Portal Card */}
            <div className="rounded-2xl p-6 sm:p-7 bg-[#edf4fd] dark:bg-[#0a1424] border border-blue-200/80 dark:border-[#162846] flex flex-col sm:flex-row items-center gap-6 shadow-xs">
              <AdminIllustration isDark={darkMode} />
              <div className="space-y-2 text-center sm:text-left flex-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-[#60a5fa]">
                  FOR WARDEN & ADMIN
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Warden Administration Portal
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Manage applications, allocate rooms, manage residents, handle complaints and view reports.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateToAuth('admin')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#2563eb] hover:bg-blue-600 transition-all cursor-pointer shadow-xs active:scale-95"
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
      <section id="rooms" className="py-12 bg-white dark:bg-[#060b13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
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
              className="text-xs font-bold text-blue-600 dark:text-[#60a5fa] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Rooms</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Room Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 1. Single Room */}
            <div className="bg-white dark:bg-[#0c1524] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#162338] shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=700&auto=format&fit=crop&q=80"
                    alt="Single Room"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge: Most Popular */}
                  <div className="absolute top-3 left-3 bg-[#0c4a34] dark:bg-[#0c4a34] text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs border dark:border-emerald-600/30">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Most Popular</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Single Room</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ideal for privacy and focused study.</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-4 pb-4 border-b border-slate-100 dark:border-[#162338]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Bed className="w-3.5 h-3.5 text-slate-400" /> 1 Bed
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <DeskIcon className="text-slate-400" /> Study Desk
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <WardrobeIcon className="text-slate-400" /> Wardrobe
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">৳ 4,500</span>
                      <span className="text-[11px] text-slate-400 font-medium"> /month</span>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 dark:text-[#2ee693] bg-[#eef7f2] dark:bg-[#082b20] border border-emerald-200 dark:border-[#114b38] px-2.5 py-1 rounded-full">
                      12 seats available
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => navigateTo('student', 'My Room', '/rooms')}
                  className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-[#1a2b42] text-xs font-bold text-slate-800 dark:text-white bg-transparent dark:bg-[#0e1929] hover:bg-slate-50 dark:hover:bg-[#122138] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 2. Double Room */}
            <div className="bg-white dark:bg-[#0c1524] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#162338] shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=700&auto=format&fit=crop&q=80"
                    alt="Double Room"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge: Best Value */}
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs border dark:border-blue-400/30">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Best Value</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Double Room</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Comfortable and spacious living.</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-4 pb-4 border-b border-slate-100 dark:border-[#162338]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Bed className="w-3.5 h-3.5 text-slate-400" /> 2 Beds
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <DeskIcon className="text-slate-400" /> Study Desk
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <WardrobeIcon className="text-slate-400" /> Wardrobe
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">৳ 3,200</span>
                      <span className="text-[11px] text-slate-400 font-medium"> /month</span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-700 dark:text-[#60a5fa] bg-blue-50 dark:bg-[#0c2242] border border-blue-200 dark:border-[#163b70] px-2.5 py-1 rounded-full">
                      28 seats available
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => navigateTo('student', 'My Room', '/rooms')}
                  className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-[#1a2b42] text-xs font-bold text-slate-800 dark:text-white bg-transparent dark:bg-[#0e1929] hover:bg-slate-50 dark:hover:bg-[#122138] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* 3. Triple Room */}
            <div className="bg-white dark:bg-[#0c1524] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#162338] shadow-xs flex flex-col justify-between">
              <div>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=700&auto=format&fit=crop&q=80"
                    alt="Triple Room"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Badge: Economy */}
                  <div className="absolute top-3 left-3 bg-[#d97706] text-white text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 shadow-xs border dark:border-amber-400/30">
                    <Star className="w-3 h-3 fill-white" />
                    <span>Economy</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-black text-slate-900 dark:text-white">Triple Room</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Affordable option with essential facilities.</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-4 pb-4 border-b border-slate-100 dark:border-[#162338]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Bed className="w-3.5 h-3.5 text-slate-400" /> 3 Beds
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <DeskIcon className="text-slate-400" /> Study Desk
                    </span>
                    <span className="flex items-center gap-1.5 font-medium">
                      <WardrobeIcon className="text-slate-400" /> Wardrobe
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-slate-900 dark:text-white">৳ 2,200</span>
                      <span className="text-[11px] text-slate-400 font-medium"> /month</span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 dark:text-[#fbbf24] bg-amber-50 dark:bg-[#2d1b06] border border-amber-200 dark:border-[#59360c] px-2.5 py-1 rounded-full">
                      15 seats available
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => navigateTo('student', 'My Room', '/rooms')}
                  className="w-full py-2.5 rounded-lg border border-slate-200 dark:border-[#1a2b42] text-xs font-bold text-slate-800 dark:text-white bg-transparent dark:bg-[#0e1929] hover:bg-slate-50 dark:hover:bg-[#122138] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Hostel Facilities (Exact 8 items with distinct vibrant dark-theme circles) */}
      <section id="facilities" className="py-12 bg-white dark:bg-[#060b13]">
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
              className="text-xs font-bold text-blue-600 dark:text-[#60a5fa] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Facilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {/* 1. High-Speed Wi-Fi (Blue) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-2xs flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-[#142646] text-blue-600 dark:text-[#3b82f6] flex items-center justify-center mb-2.5">
                <Wifi className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                High-Speed<br />Wi-Fi
              </p>
            </div>

            {/* 2. 24/7 Security (Emerald) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-2xs flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-[#092b21] text-emerald-600 dark:text-[#10b981] flex items-center justify-center mb-2.5">
                <Shield className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                24/7<br />Security
              </p>
            </div>

            {/* 3. Dining Hall (Warm Amber/Orange in dark mode mockup) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-2xs flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-[#2f1b0a] text-teal-600 dark:text-[#f59e0b] flex items-center justify-center mb-2.5">
                <Utensils className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                Dining<br />Hall
              </p>
            </div>

            {/* 4. Laundry & Press (Steel Blue) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-2xs flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-[#142646] text-blue-600 dark:text-[#38bdf8] flex items-center justify-center mb-2.5">
                <LaundryIcon className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                Laundry<br />& Press
              </p>
            </div>

            {/* 5. Study Room (Purple/Violet in dark mode mockup) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-2xs flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-[#251642] text-emerald-600 dark:text-[#a855f7] flex items-center justify-center mb-2.5">
                <BookOpen className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                Study<br />Room
              </p>
            </div>

            {/* 6. Sports & Recreation (Crimson/Rose) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-2xs flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-[#331122] text-blue-600 dark:text-[#f43f5e] flex items-center justify-center mb-2.5">
                <Activity className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                Sports<br />& Recreation
              </p>
            </div>

            {/* 7. Medical Support (Red) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-2xs flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-[#381014] text-rose-600 dark:text-[#ef4444] flex items-center justify-center mb-2.5">
                <HeartPulse className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                Medical<br />Support
              </p>
            </div>

            {/* 8. Common Room (Teal) */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] shadow-2xs flex flex-col items-center text-center hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-[#0b2926] text-teal-600 dark:text-[#14b8a6] flex items-center justify-center mb-2.5">
                <Users className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-snug">
                Common<br />Room
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Daily Dining Menu & Latest Notices & Announcements (Split 2-Column Section) */}
      <section id="dining" className="py-12 bg-white dark:bg-[#060b13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Daily Dining Menu */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Daily Dining Menu
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Nutritious and hygienic meals prepared every day.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('student', 'Meal Menu', '/meals')}
                  className="text-xs font-bold text-blue-600 dark:text-[#60a5fa] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Full Menu</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3 Meal Cards with circular dish photos */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {/* 1. Breakfast Card */}
                <div className="bg-white dark:bg-[#0a1c18] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#133d32] shadow-2xs flex flex-col justify-between">
                  <div className="p-4 bg-[#f0fdf4] dark:bg-transparent">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-[#2ee693] mb-1">
                      <Coffee className="w-3.5 h-3.5" />
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Breakfast</h4>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-[#2ee693]/80">7:00 AM - 9:00 AM</p>
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      Bread, Egg, Tea, Banana
                    </p>
                  </div>
                  <div className="p-4 flex items-center justify-center bg-white dark:bg-transparent">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 dark:border-[#133d32] shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1525351484163-7529414344d8?w=300&auto=format&fit=crop&q=80"
                        alt="Breakfast dish"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Lunch Card */}
                <div className="bg-white dark:bg-[#1a160d] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#382b13] shadow-2xs flex flex-col justify-between">
                  <div className="p-4 bg-[#fefce8] dark:bg-transparent">
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-[#fbbf24] mb-1">
                      <Utensils className="w-3.5 h-3.5" />
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Lunch</h4>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-[#fbbf24]/80">12:00 PM - 2:00 PM</p>
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      Rice, Chicken Curry, Vegetables, Lentil
                    </p>
                  </div>
                  <div className="p-4 flex items-center justify-center bg-white dark:bg-transparent">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 dark:border-[#382b13] shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&auto=format&fit=crop&q=80"
                        alt="Lunch thali"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Dinner Card */}
                <div className="bg-white dark:bg-[#0d1729] rounded-2xl overflow-hidden border border-slate-200/90 dark:border-[#1a2c4e] shadow-2xs flex flex-col justify-between">
                  <div className="p-4 bg-[#eff6ff] dark:bg-transparent">
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-[#60a5fa] mb-1">
                      <Soup className="w-3.5 h-3.5" />
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">Dinner</h4>
                    </div>
                    <p className="text-[10px] font-semibold text-slate-500 dark:text-[#60a5fa]/80">7:00 PM - 9:00 PM</p>
                    <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                      Rice, Fish Curry, Salad, Dessert
                    </p>
                  </div>
                  <div className="p-4 flex items-center justify-center bg-white dark:bg-transparent">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100 dark:border-[#1a2c4e] shadow-sm">
                      <img
                        src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&auto=format&fit=crop&q=80"
                        alt="Dinner dish"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Latest Notices & Announcements */}
            <div id="notices" className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                    Latest Notices & Announcements
                  </h3>
                </div>
                <button
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="text-xs font-bold text-blue-600 dark:text-[#60a5fa] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 4 Notices with Solid Pill Badges */}
              <div className="space-y-2.5">
                {/* Notice 1 */}
                <div
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-center w-10 px-1 py-1 rounded-lg bg-slate-100 dark:bg-[#101b2c] shrink-0 border dark:border-[#162438]">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">25</p>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">Oct</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white bg-[#ef4444] px-1.5 py-0.5 rounded-sm">
                          Important
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Fee Payment Deadline</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        Last date for hostel fee payment is 30th October 2024.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* Notice 2 */}
                <div
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-center w-10 px-1 py-1 rounded-lg bg-slate-100 dark:bg-[#101b2c] shrink-0 border dark:border-[#162438]">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">22</p>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">Oct</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white bg-[#3b82f6] px-1.5 py-0.5 rounded-sm">
                          Notice
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Water Supply Interruption</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        Water supply will be interrupted on 24th October...
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* Notice 3 */}
                <div
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-center w-10 px-1 py-1 rounded-lg bg-slate-100 dark:bg-[#101b2c] shrink-0 border dark:border-[#162438]">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">18</p>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">Oct</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white bg-[#10b981] px-1.5 py-0.5 rounded-sm">
                          Event
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Hostel Cleanliness Drive</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                        Join us for a cleaner and healthier hostel environment.
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </div>

                {/* Notice 4 */}
                <div
                  onClick={() => navigateTo('student', 'Notices', '/notices')}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#0c1524] border border-slate-200/90 dark:border-[#162338] flex items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors cursor-pointer shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-center w-10 px-1 py-1 rounded-lg bg-slate-100 dark:bg-[#101b2c] shrink-0 border dark:border-[#162438]">
                      <p className="text-sm font-black text-slate-900 dark:text-white leading-none">15</p>
                      <p className="text-[10px] text-slate-500 uppercase font-semibold">Oct</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white bg-[#2563eb] px-1.5 py-0.5 rounded-sm">
                          General
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">Guest/Visitor Policy Update</h4>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
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

      {/* 7. Need Help? & Send an Inquiry (Composite Unified Card with Dark Mode Styling) */}
      <section id="contact" className="py-12 bg-white dark:bg-[#060b13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-[#162338] shadow-xl">
            {/* Left Box: Need Help? */}
            <div className="lg:col-span-5 p-7 sm:p-9 bg-[#0c4a34] dark:bg-[#08151c] text-white flex flex-col justify-between relative overflow-hidden dark:border-r dark:border-[#162338]">
              <div className="space-y-6 relative z-10">
                <div>
                  <h3 className="text-2xl font-black tracking-tight text-white dark:text-[#2ee693]">Need Help?</h3>
                  <p className="text-xs text-emerald-100/90 dark:text-slate-300 mt-1 leading-relaxed">
                    For any inquiries, complaints or emergencies, contact the hostel office or warden.
                  </p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Phone */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-[#112420] text-emerald-300 dark:text-[#2ee693] flex items-center justify-center shrink-0 border dark:border-[#1a4237]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-200 dark:text-slate-400 font-medium">Hostel Helpline (24/7)</p>
                      <p className="text-sm font-bold text-white mt-0.5">+880 1723-456789</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-[#112420] text-emerald-300 dark:text-[#2ee693] flex items-center justify-center shrink-0 border dark:border-[#1a4237]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-200 dark:text-slate-400 font-medium">Email</p>
                      <p className="text-sm font-bold text-white mt-0.5">hostel@spi.edu.bd</p>
                    </div>
                  </div>

                  {/* Office */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-white/10 dark:bg-[#112420] text-emerald-300 dark:text-[#2ee693] flex items-center justify-center shrink-0 border dark:border-[#1a4237]">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[11px] text-emerald-200 dark:text-slate-400 font-medium">Hostel Office</p>
                      <p className="text-xs font-semibold text-white leading-relaxed mt-0.5">
                        Sirajganj Polytechnic Institute<br />
                        Sirajganj, Bangladesh
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Watermark silhouette */}
              <div className="absolute -bottom-10 -right-10 w-52 h-52 opacity-10 dark:opacity-5 pointer-events-none text-white">
                <Building2 className="w-full h-full" />
              </div>
            </div>

            {/* Right Box: Send an Inquiry */}
            <div className="lg:col-span-7 p-7 sm:p-9 bg-white dark:bg-[#08101c] flex flex-col justify-between relative">
              {/* Architecture outline watermark top right */}
              <div className="absolute top-4 right-4 w-32 h-32 opacity-5 pointer-events-none text-slate-800 dark:text-white">
                <Building2 className="w-full h-full" />
              </div>

              <div className="relative z-10">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Send an Inquiry
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Have a question? Send us a message.
                </p>

                <form onSubmit={handleContactSubmit} className="mt-5 space-y-3.5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
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
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="Enter your email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white"
                    >
                      <option value="">Select a subject</option>
                      <option value="Room Admission & Availability">Room Admission & Availability</option>
                      <option value="Hostel Fee & Payment Inquiry">Hostel Fee & Payment Inquiry</option>
                      <option value="Dining & Mess Facility Question">Dining & Mess Facility Question</option>
                      <option value="Guest / Visitor Permission">Guest / Visitor Permission</option>
                      <option value="General Support / Complaint">General Support / Complaint</option>
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
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#0c1626] border border-slate-200 dark:border-[#1a2b42] focus:outline-hidden focus:border-[#0c4a34] dark:focus:border-[#2ee693] text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-sm ${
                      darkMode
                        ? 'bg-[#2ee693] hover:bg-[#28cf84] text-[#032817] font-black'
                        : 'bg-[#0c4a34] hover:bg-[#083525] text-white font-bold'
                    }`}
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

      {/* 8. Modern Dark Navy Footer */}
      <footer className="bg-[#0b1120] dark:bg-[#060a12] text-slate-400 text-xs py-12 border-t border-slate-800 dark:border-[#121c2c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            {/* Col 1 */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <div className="w-8 h-8 rounded-lg bg-[#0c4a34] flex items-center justify-center text-white shadow-xs border border-emerald-600/30">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-lg font-black tracking-tight">HostelMS</span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">
                Sirajganj Polytechnic Institute
              </p>
              <p className="text-[11px] text-slate-500 leading-relaxed pt-1">
                Official Hostel Management System.<br />
                Better Living, Brighter Future.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Quick Links</h5>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-[#2ee693] font-bold hover:underline cursor-pointer transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('admin', 'Blocks', '/blocks')} className="hover:text-white cursor-pointer transition-colors">
                    Hostel Blocks
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('facilities')} className="hover:text-white cursor-pointer transition-colors">
                    Facilities
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('dining')} className="hover:text-white cursor-pointer transition-colors">
                    Dining
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('notices')} className="hover:text-white cursor-pointer transition-colors">
                    Notices
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-white cursor-pointer transition-colors">
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
                  <button onClick={() => navigateToAuth('student')} className="text-[#0c4a34] dark:text-[#2ee693] font-bold hover:underline cursor-pointer transition-colors">
                    Sign In / Register →
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('student', 'Dashboard', '/student')} className="hover:text-white cursor-pointer transition-colors">
                    Student Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('admin', 'Dashboard', '/admin')} className="hover:text-white cursor-pointer transition-colors">
                    Admin Portal
                  </button>
                </li>
                <li>
                  <a href="https://spi.gov.bd" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                    Institute Website
                  </a>
                </li>
                <li>
                  <button onClick={() => navigateTo('student', 'Payments', '/payments')} className="hover:text-white cursor-pointer transition-colors">
                    Online Payment
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateTo('student', 'Hostel Rules', '/rules')} className="hover:text-white cursor-pointer transition-colors">
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

          <div className="pt-6 border-t border-slate-800/80 dark:border-[#121c2c] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2024 HostelMS. All rights reserved.</p>
            <div className="flex items-center gap-4 text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
              <span>|</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
