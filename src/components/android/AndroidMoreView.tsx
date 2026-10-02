import React from 'react';
import {
  Building2,
  CreditCard,
  CalendarCheck,
  Wrench,
  UserCheck,
  Package,
  BarChart3,
  UserCog,
  Settings,
  User,
  FileText,
  BellRing,
  BookOpen,
  PhoneCall,
  MessageSquare,
  Moon,
  Sun,
  ChevronRight,
  Database
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const AndroidMoreView: React.FC = () => {
  const {
    role,
    setRole,
    currentStudent,
    setActiveSidebarTab,
    darkMode,
    toggleDarkMode,
    backendConnected,
    openModal
  } = useHostel();

  const adminMenuItems = [
    { name: 'Blocks', label: 'Blocks & Wings', icon: Building2, desc: 'Block A, B, C capacities', color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Payments', label: 'Fee Accounts', icon: CreditCard, desc: 'Collection ledger & receipts', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Attendance', label: 'Night Roll-Call', icon: CalendarCheck, desc: 'Muster roll & absentee alerts', color: 'bg-blue-50 text-blue-600' },
    { name: 'Maintenance', label: 'Repairs & Technicians', icon: Wrench, desc: 'Work orders & dispatch', color: 'bg-amber-50 text-amber-600' },
    { name: 'Visitors', label: 'Gate Passes', icon: UserCheck, desc: 'Today visitor records', color: 'bg-teal-50 text-teal-600' },
    { name: 'Inventory', label: 'Asset Inventory', icon: Package, desc: 'Beds, desks & equipment', color: 'bg-purple-50 text-purple-600' },
    { name: 'Reports', label: 'Audit Reports', icon: BarChart3, desc: 'Monthly summary & export', color: 'bg-rose-50 text-rose-600' },
    { name: 'Users & Roles', label: 'Staff Privileges', icon: UserCog, desc: 'Warden & admin roles', color: 'bg-cyan-50 text-cyan-600' },
    { name: 'Settings', label: 'Hostel Settings', icon: Settings, desc: 'Curfew, rent & meal times', color: 'bg-slate-100 text-slate-700' },
  ];

  const studentMenuItems = [
    { name: 'My Profile', label: 'Student Profile', icon: User, desc: `${currentStudent.department} • 5th Sem`, color: 'bg-blue-50 text-blue-600' },
    { name: 'Payments', label: 'Fee Dues & Receipts', icon: CreditCard, desc: 'Monthly invoices & payment', color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Attendance', label: 'Roll-Call & Curfew', icon: CalendarCheck, desc: 'Daily check-in & calendar', color: 'bg-indigo-50 text-indigo-600' },
    { name: 'Leave Request', label: 'Leave / Gate Pass', icon: FileText, desc: 'Overnight pass application', color: 'bg-amber-50 text-amber-600' },
    { name: 'Visitor Request', label: 'Visitor Pass', icon: UserCheck, desc: 'Register visiting guest', color: 'bg-teal-50 text-teal-600' },
    { name: 'Notices', label: 'Official Notices', icon: BellRing, desc: 'Bulletins & deadlines', color: 'bg-purple-50 text-purple-600' },
    { name: 'Hostel Rules', label: 'Code of Conduct', icon: BookOpen, desc: 'Quiet hours & gate rules', color: 'bg-rose-50 text-rose-600' },
    { name: 'Contact', label: 'Office Helpdesk', icon: PhoneCall, desc: 'Warden office numbers', color: 'bg-cyan-50 text-cyan-600' },
    { name: 'Settings', label: 'Profile Settings', icon: Settings, desc: 'Preferences, password, alerts', color: 'bg-slate-100 text-slate-700' },
  ];

  const items = role === 'admin' ? adminMenuItems : studentMenuItems;

  return (
    <div className="space-y-5 pb-6">
      {/* Top Section Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-center font-black text-lg">
            {role === 'admin' ? 'A' : currentStudent.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-black text-sm text-white">
              {role === 'admin' ? 'Chief Warden / Administrator' : currentStudent.name}
            </h3>
            <p className="text-[11px] text-blue-200">
              {role === 'admin' ? 'Full Campus System Authority' : `ID: ${currentStudent.id} • Room ${currentStudent.room}`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setRole(role === 'admin' ? 'student' : 'admin')}
          className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-[11px] border border-white/25 active:scale-95 transition-all cursor-pointer"
        >
          Switch Role
        </button>
      </div>

      {/* Grid of Android Apps / Modules */}
      <div>
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5 px-1">
          {role === 'admin' ? 'Administration Services' : 'Hostel Student Services'}
        </h4>

        <div className="grid grid-cols-2 gap-2.5">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.name}
                onClick={() => setActiveSidebarTab(item.name)}
                className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all text-left flex flex-col justify-between active:scale-95 cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2.5 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                </div>
                <div>
                  <h5 className="font-extrabold text-xs text-slate-800 group-hover:text-blue-600 transition-colors">
                    {item.label}
                  </h5>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">{item.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Office Contact / Send Message (Student only) */}
      {role === 'student' && (
        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600 text-white">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs text-blue-900">Need Help or Inquiring?</p>
              <p className="text-[11px] text-blue-700">Send direct inquiry to Warden Office</p>
            </div>
          </div>
          <button
            onClick={() => openModal('sendMessage')}
            className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs active:scale-95 cursor-pointer shrink-0"
          >
            Message
          </button>
        </div>
      )}

      {/* System Settings & Device Preferences */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2.5">
        <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          System Preferences
        </h4>

        {/* Dark Mode Row */}
        <div className="flex items-center justify-between py-1 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            {darkMode ? <Moon className="w-4 h-4 text-indigo-500" /> : <Sun className="w-4 h-4 text-amber-500" />}
            <span>Dark Theme</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
              darkMode ? 'bg-blue-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
          </button>
        </div>

        {/* Backend Database Link */}
        <div className="flex items-center justify-between py-1 text-xs border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-700 font-semibold">
            <Database className="w-4 h-4 text-emerald-600" />
            <span>FastAPI SQLite Backend</span>
          </div>
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
              backendConnected
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            {backendConnected ? 'Live (:8000)' : 'Active (Local)'}
          </span>
        </div>
      </div>
    </div>
  );
};
