import React from 'react';
import {
  LayoutDashboard,
  Users,
  BedDouble,
  Building2,
  CreditCard,
  UtensilsCrossed,
  AlertTriangle,
  Wrench,
  UserCheck,
  CalendarCheck,
  Package,
  BarChart3,
  UserCog,
  Settings,
  User,
  BellRing,
  FileText,
  BookOpen,
  PhoneCall,
  Headphones,
  ChevronDown,
  X
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { role, activeSidebarTab, setActiveSidebarTab, openModal } = useHostel();

  const adminNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Students', icon: Users },
    { name: 'Rooms', icon: BedDouble },
    { name: 'Blocks', icon: Building2 },
    { name: 'Payments', icon: CreditCard },
    { name: 'Meals', icon: UtensilsCrossed },
    { name: 'Complaints', icon: AlertTriangle },
    { name: 'Maintenance', icon: Wrench },
    { name: 'Visitors', icon: UserCheck },
    { name: 'Attendance', icon: CalendarCheck },
    { name: 'Inventory', icon: Package },
    { name: 'Reports', icon: BarChart3 },
    { name: 'Users & Roles', icon: UserCog },
    { name: 'Settings', icon: Settings },
  ];

  const studentNavItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'My Profile', icon: User },
    { name: 'My Room', icon: BedDouble },
    { name: 'Payments', icon: CreditCard },
    { name: 'Meal Menu', icon: UtensilsCrossed },
    { name: 'Complaints', icon: AlertTriangle },
    { name: 'Visitor Request', icon: UserCheck },
    { name: 'Attendance', icon: CalendarCheck },
    { name: 'Notices', icon: BellRing },
    { name: 'Leave Request', icon: FileText },
    { name: 'Hostel Rules', icon: BookOpen },
    { name: 'Contact', icon: PhoneCall },
    { name: 'Settings', icon: Settings },
  ];

  const currentNavItems = role === 'admin' ? adminNavItems : studentNavItems;

  const handleTabClick = (tabName: string) => {
    setActiveSidebarTab(tabName);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0f172a] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight leading-none">
                HostelMS
              </h1>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">
                {role === 'admin' ? 'College Hostel Management' : 'Student Portal'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSidebarTab === item.name;

            return (
              <button
                key={item.name}
                onClick={() => handleTabClick(item.name)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-slate-800/80">
          {role === 'admin' ? (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-750 hover:bg-slate-800 cursor-pointer transition-colors">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-medium">Hostel Complex</p>
                  <p className="text-xs font-bold text-white">Main Hostel</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 space-y-2.5 text-center">
              <div className="flex items-center justify-center gap-2 text-slate-300">
                <Headphones className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold text-white">Need Help?</span>
              </div>
              <p className="text-[11px] text-slate-400">Contact Hostel Office</p>
              <button
                onClick={() => openModal('sendMessage')}
                className="w-full py-2 px-3 text-xs font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-500 shadow-sm transition-colors cursor-pointer"
              >
                Send Message
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
