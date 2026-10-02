import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Search,
  Moon,
  Sun,
  Shield,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const AndroidTopBar: React.FC = () => {
  const {
    role,
    setRole,
    activeSidebarTab,
    setActiveSidebarTab,
    currentStudent,
    searchQuery,
    setSearchQuery,
    darkMode,
    toggleDarkMode,
    complaints
  } = useHostel();

  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const pendingComplaintsCount = complaints.filter((c) => c.status === 'Pending').length;
  const isHome = activeSidebarTab === 'Dashboard';

  return (
    <div className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors shrink-0">
      <div className="max-w-7xl mx-auto w-full">
        {/* Search Input Bar (Expandable) */}
        {showSearch ? (
          <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 animate-in fade-in slide-in-from-top-2 duration-150">
            <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                role === 'admin'
                  ? 'Search students, rooms, bills...'
                  : 'Search menu, notices, rooms...'
              }
              className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden py-1"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchQuery('');
              }}
              className="px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : null}

        {/* Main App Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left: Back Arrow or Brand Title */}
        <div className="flex items-center gap-2">
          {!isHome ? (
            <button
              onClick={() => setActiveSidebarTab('Dashboard')}
              className="p-1.5 -ml-1 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-90"
              title="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                H
              </div>
            </div>
          )}

          <div>
            <h1 className="font-black text-slate-900 dark:text-white text-sm tracking-tight leading-none">
              {!isHome ? activeSidebarTab : 'HostelMS'}
            </h1>
            {isHome && (
              <p className="text-[10px] text-slate-400 dark:text-slate-400 font-semibold leading-none mt-1">
                {role === 'admin' ? 'Warden Portal' : `Room ${currentStudent.room} • ${currentStudent.name}`}
              </p>
            )}
          </div>
        </div>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick Role Toggle Chip */}
          <button
            onClick={() => setRole(role === 'admin' ? 'student' : 'admin')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold transition-all border shadow-2xs active:scale-95 cursor-pointer ${
              role === 'admin'
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
            }`}
            title="Tap to switch between Admin & Student portals"
          >
            {role === 'admin' ? (
              <>
                <Shield className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>Admin</span>
              </>
            ) : (
              <>
                <UserCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Student</span>
              </>
            )}
          </button>

          {/* Search Button */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-90"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-90 relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900"></span>
            </button>

            {/* Notification Drawer Popover */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl bg-white dark:bg-slate-900 p-3.5 shadow-2xl border border-slate-200 dark:border-slate-700 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-extrabold text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wider">
                    {role === 'admin' ? 'Admin Alerts' : 'Notifications'}
                  </span>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-2">
                  {role === 'admin' ? (
                    <>
                      <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-100 dark:border-amber-900/50 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">{pendingComplaintsCount} pending room complaints</p>
                          <p className="text-[10px] text-amber-700 dark:text-amber-400">Needs review by warden</p>
                        </div>
                      </div>
                      <div className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Tonight roll-call muster prepared</p>
                          <p className="text-[10px] text-slate-400">Lock time 10:00 PM</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 border border-blue-100 dark:border-blue-900/50 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">Next fee due: 10 Oct 2026</p>
                          <p className="text-[10px] text-blue-700 dark:text-blue-400">Room B-203 dues: ৳ 2,500</p>
                        </div>
                      </div>
                      <div className="p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Dinner coupon active</p>
                          <p className="text-[10px] text-slate-400">Serving starts at 07:30 PM</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Dark Mode */}
          <button
            onClick={toggleDarkMode}
            className="p-1.5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors active:scale-90"
            title="Toggle theme"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Avatar Profile */}
          <button
            onClick={() => setActiveSidebarTab(role === 'admin' ? 'Users & Roles' : 'My Profile')}
            className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700 ring-2 ring-blue-500/20 shrink-0 active:scale-90 transition-transform cursor-pointer"
            title="View Profile"
          >
            <img
              src={
                role === 'admin'
                  ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
                  : currentStudent.avatar
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};
