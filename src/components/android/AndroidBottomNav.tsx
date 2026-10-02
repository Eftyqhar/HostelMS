import React from 'react';
import {
  LayoutDashboard,
  Users,
  BedDouble,
  UtensilsCrossed,
  AlertTriangle,
  Grid
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const AndroidBottomNav: React.FC = () => {
  const { role, activeSidebarTab, setActiveSidebarTab } = useHostel();

  const adminTabs = [
    { name: 'Dashboard', label: 'Home', icon: LayoutDashboard },
    { name: 'Students', label: 'Students', icon: Users },
    { name: 'Rooms', label: 'Rooms', icon: BedDouble },
    { name: 'Meals', label: 'Meals', icon: UtensilsCrossed },
    { name: 'Complaints', label: 'Issues', icon: AlertTriangle },
    { name: 'More', label: 'More', icon: Grid },
  ];

  const studentTabs = [
    { name: 'Dashboard', label: 'Home', icon: LayoutDashboard },
    { name: 'My Room', label: 'My Room', icon: BedDouble },
    { name: 'Meal Menu', label: 'Meals', icon: UtensilsCrossed },
    { name: 'Complaints', label: 'Complaints', icon: AlertTriangle },
    { name: 'More', label: 'More', icon: Grid },
  ];

  const tabs = role === 'admin' ? adminTabs : studentTabs;

  return (
    <div className="sticky bottom-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-lg shrink-0">
      <div className="flex items-center justify-around px-2 pt-2 pb-1 max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSidebarTab === tab.name;

          return (
            <button
              key={tab.name}
              onClick={() => setActiveSidebarTab(tab.name)}
              className="flex flex-col items-center justify-center flex-1 py-1 transition-all active:scale-90 cursor-pointer group"
            >
              {/* Material 3 Pill Indicator */}
              <div
                className={`flex items-center justify-center px-4 py-1 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs scale-105'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Label */}
              <span
                className={`text-[10px] mt-1 tracking-tight transition-colors ${
                  isActive ? 'font-black text-blue-600' : 'font-semibold text-slate-500'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Android Gesture Navigation Indicator Line */}
      <div className="flex justify-center pb-1">
        <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
      </div>
    </div>
  );
};
