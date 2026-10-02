import React, { useState } from 'react';
import {
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Menu,
  Shield,
  UserCheck,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const {
    role,
    setRole,
    currentStudent,
    searchQuery,
    setSearchQuery,
    darkMode,
    toggleDarkMode,
    complaints,
    backendConnected
  } = useHostel();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const pendingComplaintsCount = complaints.filter(c => c.status === 'Pending').length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 transition-colors duration-200">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu + Search */}
        <div className="flex items-center gap-3 flex-1 max-w-xl">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 lg:hidden focus:outline-hidden"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                role === 'admin'
                  ? 'Search students, rooms, complaints...'
                  : 'Search menu, complaints, announcements...'
              }
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-500 rounded-lg outline-hidden transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Backend Status Indicator */}
          <div
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
              backendConnected
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}
            title="FastAPI + SQLite REST Backend on port 8000"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                backendConnected ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
              }`}
            ></span>
            <span>{backendConnected ? 'FastAPI DB Live' : 'Local Mode'}</span>
          </div>

          {/* Quick Role Switcher Pill */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center border border-slate-200 shadow-2xs">
            <button
              onClick={() => setRole('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                role === 'admin'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
            <button
              onClick={() => setRole('student')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                role === 'student'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                {role === 'admin' ? '7' : '3'}
              </span>
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white p-3 shadow-xl border border-slate-200 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    {role === 'admin' ? 'Admin Alerts' : 'Student Notifications'}
                  </h4>
                  <span className="text-[11px] font-medium text-blue-600 cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  {role === 'admin' ? (
                    <>
                      <div className="flex items-start gap-2.5 p-2 rounded-lg bg-amber-50 text-amber-900 border border-amber-100">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">{pendingComplaintsCount} pending room complaints</p>
                          <span className="text-[10px] text-amber-700">Needs prompt review</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Karim Hasan fee payment verified</p>
                          <span className="text-[10px] text-slate-400">09:15 AM</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start gap-2.5 p-2 rounded-lg bg-blue-50 text-blue-900 border border-blue-100">
                        <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold">Hostel fee due by 10 Oct 2026</p>
                          <span className="text-[10px] text-blue-700">Avoid late penalty fee</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5 p-2 rounded-lg hover:bg-slate-50 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Visitor pass for Abdul Karim approved</p>
                          <span className="text-[10px] text-slate-400">Valid today until 08:00 PM</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 pl-2 pr-1.5 py-1 rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all text-left"
            >
              <img
                src={
                  role === 'admin'
                    ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
                    : currentStudent.avatar
                }
                alt="Avatar"
                className="w-8 h-8 rounded-full object-cover border border-slate-200 ring-2 ring-blue-500/20"
              />
              <div className="hidden md:block text-xs leading-tight">
                <p className="font-bold text-slate-800">
                  {role === 'admin' ? 'Admin' : currentStudent.name}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  {role === 'admin' ? 'System Administrator' : `ID: ${currentStudent.id} | CSE (5th Sem)`}
                </p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-white p-2 shadow-xl border border-slate-200 z-50 text-xs">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="font-semibold text-slate-800">
                    {role === 'admin' ? 'Super Admin' : currentStudent.name}
                  </p>
                  <p className="text-slate-400 text-[11px] truncate">
                    {role === 'admin' ? 'admin@hostelms.edu' : currentStudent.email}
                  </p>
                </div>
                <div className="py-1">
                  <button
                    onClick={() => {
                      setRole(role === 'admin' ? 'student' : 'admin');
                      setShowProfileMenu(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700 flex items-center justify-between font-medium"
                  >
                    <span>Switch to {role === 'admin' ? 'Student View' : 'Admin View'}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-sm">Quick</span>
                  </button>
                  <button
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 text-slate-700"
                  >
                    Account Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
