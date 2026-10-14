import React, { useState } from 'react';
import {
  Building2,
  Shield,
  UserCheck,
  UtensilsCrossed,
  PhoneCall,
  Wifi,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Mail,
  Moon,
  Sun,
  Menu,
  X,
  Award,
  BookOpen,
  Lock,
  ChevronRight,
  Send
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const HomePage: React.FC = () => {
  const {
    setRole,
    setViewMode,
    setActiveSidebarTab,
    darkMode,
    toggleDarkMode,
    meals,
    notices,
    showToast
  } = useHostel();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState<'all' | 'single' | 'double' | 'triple'>('all');
  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });

  const navigateToPortal = (portalRole: 'admin' | 'student', tab: string = 'Dashboard') => {
    setRole(portalRole);
    setActiveSidebarTab(tab);
    setViewMode('portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      showToast('Please fill in your name, email, and message.');
      return;
    }
    showToast(`Thank you ${contactForm.name}! Your message has been sent to the Warden office.`);
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const roomCategories = [
    {
      id: 'single',
      title: 'Deluxe Single Room',
      subtitle: 'Maximum privacy & focused study',
      price: '৳ 4,500',
      period: 'per month',
      image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&auto=format&fit=crop&q=80',
      tag: 'Most Popular',
      features: [
        'Private Single Bed with Ergonomic Mattress',
        'Dedicated Study Desk & Executive Chair',
        'Personal Wardrobe with Digital Locker',
        'High-Speed Wi-Fi & AC Provision',
        'Attached Private Bathroom'
      ],
      vacantCount: 4
    },
    {
      id: 'double',
      title: 'Executive Double Room',
      subtitle: 'Comfortable twin sharing space',
      price: '৳ 3,200',
      period: 'per month',
      image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&auto=format&fit=crop&q=80',
      tag: 'Best Value',
      features: [
        '2 Separate Beds with Under-bed Storage',
        'Dual Study Desks with Reading Lamps',
        'Independent Full-height Wardrobes',
        'Shared Attached Balcony & Bathroom',
        'High-Speed Mesh Wi-Fi Included'
      ],
      vacantCount: 7
    },
    {
      id: 'triple',
      title: 'Standard Triple Room',
      subtitle: 'Affordable campus living & camaraderie',
      price: '৳ 2,200',
      period: 'per month',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80',
      tag: 'Budget Friendly',
      features: [
        '3 Individual Beds & Personal Closets',
        'Common Study Table & Book Racks',
        'Well-ventilated with Large Windows',
        'Daily Cleaning & Trash Clearance',
        'Complimentary High-speed Wi-Fi'
      ],
      vacantCount: 5
    }
  ];

  const filteredRooms = selectedRoomType === 'all'
    ? roomCategories
    : roomCategories.filter(r => r.id === selectedRoomType);

  const amenities = [
    {
      icon: Wifi,
      title: 'Gigabit Wi-Fi Network',
      desc: 'Seamless ultra-fast internet coverage across all blocks, dorm rooms, and common lounges.'
    },
    {
      icon: Shield,
      title: '24/7 Security & CCTV',
      desc: 'Biometric turnstiles, round-the-clock security personnel, and comprehensive video surveillance.'
    },
    {
      icon: UtensilsCrossed,
      title: 'Hygienic Dining Mess',
      desc: 'Nutritious chef-prepared breakfast, lunch, and dinner with daily digital meal tokens.'
    },
    {
      icon: BookOpen,
      title: 'Quiet Study Halls',
      desc: 'Air-conditioned study spaces and digital reading rooms equipped with power ports.'
    },
    {
      icon: Sparkles,
      title: 'Clean Laundry & Press',
      desc: 'Automated commercial washing facilities and dedicated drying balconies on each floor.'
    },
    {
      icon: Award,
      title: 'Sports & Recreation',
      desc: 'Table tennis, carrom boards, chess tables, and gymnasium for healthy physical recreation.'
    },
    {
      icon: Lock,
      title: '24/7 Power & Water',
      desc: 'Dedicated heavy-duty diesel generators ensure zero electricity or water supply cuts.'
    },
    {
      icon: PhoneCall,
      title: 'Emergency Medical Care',
      desc: 'On-campus first-aid post, emergency medicine cabinet, and on-call university doctor.'
    }
  ];

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors ${
      darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    }`}>
      {/* 1. Public Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & Brand Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  HostelMS
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300">
                  Campus
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Smart Student Living</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <button onClick={() => scrollToSection('overview')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Overview
            </button>
            <button onClick={() => scrollToSection('portals')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Portals
            </button>
            <button onClick={() => scrollToSection('rooms')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Living Spaces
            </button>
            <button onClick={() => scrollToSection('amenities')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Amenities
            </button>
            <button onClick={() => scrollToSection('mess')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Dining Menu
            </button>
            <button onClick={() => scrollToSection('notices')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Notices
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer">
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Student Portal Button */}
            <button
              onClick={() => navigateToPortal('student')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all cursor-pointer shadow-2xs"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Student Portal</span>
            </button>

            {/* Admin Portal Button */}
            <button
              onClick={() => navigateToPortal('admin')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 transition-all cursor-pointer active:scale-95"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 space-y-2 text-xs font-semibold animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => navigateToPortal('student')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-bold"
              >
                <UserCheck className="w-4 h-4" />
                Student Portal
              </button>
              <button
                onClick={() => navigateToPortal('admin')}
                className="flex items-center justify-center gap-1.5 p-2.5 rounded-xl bg-blue-600 text-white font-bold"
              >
                <Shield className="w-4 h-4" />
                Admin Portal
              </button>
            </div>
            <button onClick={() => scrollToSection('overview')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Overview
            </button>
            <button onClick={() => scrollToSection('portals')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Choose Portal
            </button>
            <button onClick={() => scrollToSection('rooms')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Living Spaces & Rates
            </button>
            <button onClick={() => scrollToSection('amenities')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Amenities & Facilities
            </button>
            <button onClick={() => scrollToSection('mess')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Daily Mess Menu
            </button>
            <button onClick={() => scrollToSection('notices')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Notice Board
            </button>
            <button onClick={() => scrollToSection('contact')} className="w-full text-left p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              Emergency & Contact
            </button>
          </div>
        )}
      </header>

      {/* 2. Hero Section */}
      <section id="overview" className="relative overflow-hidden py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950">
        <div className="absolute inset-0 bg-radial-[circle_at_top_right] from-blue-400/10 dark:from-blue-600/10 via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-800/60 text-blue-800 dark:text-blue-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 animate-pulse" />
                <span>Next-Gen Campus Living & Management Platform</span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
                Safe, Smart & Seamless <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
                  Hostel Living Experience
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                HostelMS connects students, wardens, and campus administration through a single intuitive system. Enjoy instant room allocation, digitized dining passes, real-time grievance tracking, and transparent online fee records.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <button
                  onClick={() => navigateToPortal('student')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Enter Student Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateToPortal('admin')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Shield className="w-4 h-4" />
                  <span>Enter Warden / Admin Portal</span>
                </button>

                <button
                  onClick={() => scrollToSection('rooms')}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-bold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 transition-all cursor-pointer"
                >
                  Explore Rooms
                </button>
              </div>

              {/* Trust & Live Metrics Badges */}
              <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <p className="text-2xl font-black text-blue-600 dark:text-blue-400">450+</p>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Resident Students</p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">98%</p>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Occupancy Rate</p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">3 Blocks</p>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Modern Dorm Wings</p>
                </div>
                <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs">
                  <p className="text-2xl font-black text-amber-600 dark:text-amber-400">24/7</p>
                  <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Security & Wi-Fi</p>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=900&auto=format&fit=crop&q=80"
                  alt="Modern Campus Dormitory"
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded-full w-max border border-blue-800/60 mb-2">
                    Hostel Complex
                  </span>
                  <h3 className="text-xl font-bold">Block B • North Campus Wing</h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Equipped with high-speed fiber Wi-Fi, biometric security, and attached balconies.
                  </p>
                </div>
              </div>

              {/* Floating Live Activity Card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
                    <UtensilsCrossed className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">Mess Token System Live</h4>
                    <p className="text-[11px] text-slate-500">Touchless meal distribution active</p>
                  </div>
                </div>
                <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/70 px-2.5 py-1 rounded-full">
                  100% Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Choose Your Portal Gateway */}
      <section id="portals" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Role-Based Access
            </h2>
            <p className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-2">
              Choose Your Dedicated Portal
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Fast, tailored tools designed specifically for students and hostel wardens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Portal Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-emerald-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-600/30 mb-5">
                <UserCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full">
                For Students & Residents
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-3">
                Student Self-Service Portal
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Empowering residents with full self-management of room details, mess schedule, dues, and maintenance tickets right from any device.
              </p>

              <ul className="mt-6 space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>My Room & Roommate information with bed allocations</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Daily Meal Pass with 1-click token claiming</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>4-Step Grievance & Maintenance tracker</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant fee billing, payment receipts & dues ledger</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Leave applications, night-out permits & visitor logs</span>
                </li>
              </ul>

              <button
                onClick={() => navigateToPortal('student')}
                className="mt-8 w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:gap-3"
              >
                <span>Launch Student Portal</span>
                <ChevronRight className="w-4 h-4 transition-transform" />
              </button>
            </div>

            {/* Admin / Warden Portal Card */}
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-blue-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/20 border border-blue-200/80 dark:border-blue-900/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative group">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 mb-5">
                <Shield className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-3 py-1 rounded-full">
                For Wardens & Administrators
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-3">
                Warden Administration Portal
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                Complete control center for managing student records, 3D interactive room beds, daily dining schedules, and institutional fee collection.
              </p>

              <ul className="mt-6 space-y-3 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>3D Interactive Room Map with 1-click bed assignment</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Daily roll-call muster & biometric attendance management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Mess menu full CRUD (Add, Edit, Delete meals & pricing)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Institutional complaints management with technician dispatch</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Fee record reconciliation with FastAPI + SQLite Database</span>
                </li>
              </ul>

              <button
                onClick={() => navigateToPortal('admin')}
                className="mt-8 w-full py-3.5 px-4 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:gap-3"
              >
                <span>Launch Warden Portal</span>
                <ChevronRight className="w-4 h-4 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Living Spaces & Accommodation */}
      <section id="rooms" className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Accommodation
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Room Types & Living Spaces
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Furnished, ventilated, and tailored for comfort and academic productivity.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xs">
              <button
                onClick={() => setSelectedRoomType('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRoomType === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                All Options
              </button>
              <button
                onClick={() => setSelectedRoomType('single')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRoomType === 'single'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Single
              </button>
              <button
                onClick={() => setSelectedRoomType('double')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRoomType === 'double'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Double
              </button>
              <button
                onClick={() => setSelectedRoomType('triple')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedRoomType === 'triple'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Triple
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                    {room.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full border border-slate-700">
                    {room.vacantCount} beds vacant
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{room.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{room.subtitle}</p>

                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{room.price}</span>
                      <span className="text-xs text-slate-400">/{room.period}</span>
                    </div>

                    <ul className="mt-5 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                      {room.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => navigateToPortal('student', 'My Room')}
                    className="mt-6 w-full py-2.5 rounded-xl font-bold text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 transition-colors cursor-pointer"
                  >
                    View Room Map & Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. World-Class Campus Amenities */}
      <section id="amenities" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              Campus Facilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
              Engineered for Student Well-being
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Every amenity is designed to let residents focus on academic success and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {amenities.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 hover:border-blue-500/50 transition-all hover:-translate-y-1 duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Daily Mess & Dining Showcase */}
      <section id="mess" className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Nutritious Campus Meals
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Daily Dining Hall & Mess Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Enjoy 3 fresh, hot, and hygienic meals every single day. Prepared by university culinary staff under strict quality standards.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Fresh & Hygienic Ingredients</h5>
                    <p className="text-[11px] text-slate-500">Market-sourced daily vegetables, eggs, chicken, and dairy.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">Predictable Meal Times</h5>
                    <p className="text-[11px] text-slate-500">Breakfast (7:30–9:30 AM) • Lunch (12:30–2:30 PM) • Dinner (7:30–9:30 PM)</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateToPortal('student', 'Meal Menu')}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm cursor-pointer"
                >
                  View Full Week Menu & Pass
                </button>
              </div>
            </div>

            {/* Right: Live Meals List from Context */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {meals.map((meal) => (
                <div
                  key={meal.type}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded-md">
                        {meal.type}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {meal.time}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 dark:text-white mt-3">
                      {Array.isArray(meal.menu) ? meal.menu.join(', ') : meal.menu}
                    </h4>
                  </div>

                  <div className="mt-6 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      Included in Meal Pass
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">Daily Token Active</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Live Notice Board Feed */}
      <section id="notices" className="py-16 bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                Campus Bulletins
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                Official Notices & Announcements
              </h2>
            </div>
            <button
              onClick={() => navigateToPortal('student', 'Notices')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View all notices in portal</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-750 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                      notice.priority === 'important'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300'
                        : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                    }`}>
                      {notice.priority}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400">{notice.date}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{notice.title}</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 line-clamp-3">
                    {notice.description}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    Hostel Office
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Emergency Contacts & Inquiry Section */}
      <section id="contact" className="py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Contact Info & Emergency */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 uppercase tracking-widest">
                  24/7 Support
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
                  Contact Warden & Emergency Hotlines
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-2">
                  Our supervisory staff and caretakers are stationed on campus around the clock.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 flex items-center justify-center font-bold">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-semibold">Chief Warden Office</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">+880 1712-345678</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 flex items-center justify-center font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-semibold">Campus Gate & Security 24/7</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">+880 1914-789012</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-semibold">Official Email</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">warden@hostelms.edu.bd</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 font-semibold">Campus Location</p>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      Hostel Complex, University Campus Road, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Direct Message Form */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Send an Inquiry to the Warden Desk
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Have a question regarding room admission, hostel guidelines, or guest permissions? Drop us a note.
              </p>

              <form onSubmit={handleContactSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahim Ahmed"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@university.edu"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. 01712-345678"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Your Message / Question
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask about room availability, fees, or visit scheduling..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:border-blue-500 resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Inquiry to Hostel Desk</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Public Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-base">
                <Building2 className="w-5 h-5 text-blue-500" />
                <span>HostelMS Platform</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Comprehensive digital residence and facility management platform built for modern universities and residential student campuses.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Quick Portals</h5>
              <ul className="space-y-2 text-[11px]">
                <li>
                  <button onClick={() => navigateToPortal('student')} className="hover:text-white transition-colors cursor-pointer">
                    Student Login Portal
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPortal('admin')} className="hover:text-white transition-colors cursor-pointer">
                    Admin / Warden Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPortal('student', 'Meal Menu')} className="hover:text-white transition-colors cursor-pointer">
                    Daily Mess & Coupons
                  </button>
                </li>
                <li>
                  <button onClick={() => navigateToPortal('student', 'Complaints')} className="hover:text-white transition-colors cursor-pointer">
                    Maintenance Ticketing
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Hostel Living</h5>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={() => scrollToSection('rooms')} className="hover:text-white cursor-pointer">Single Deluxe Rooms</button></li>
                <li><button onClick={() => scrollToSection('rooms')} className="hover:text-white cursor-pointer">Double Sharing Rooms</button></li>
                <li><button onClick={() => scrollToSection('amenities')} className="hover:text-white cursor-pointer">High-Speed Wi-Fi & CCTV</button></li>
                <li><button onClick={() => scrollToSection('notices')} className="hover:text-white cursor-pointer">Notice Board Bulletins</button></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Hostel Office</h5>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Block B, Ground Floor<br />
                Gate Curfew: 10:00 PM Daily<br />
                Emergency Hotline: +880 1712-345678
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>System Live & Secure</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} HostelMS. All rights reserved. University Residential Campus.</p>
            <div className="flex items-center gap-4">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-white cursor-pointer">
                Back to Top ↑
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
