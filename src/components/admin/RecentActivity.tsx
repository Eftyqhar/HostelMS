import React from 'react';
import {
  UserPlus,
  CreditCard,
  AlertCircle,
  UserMinus,
  Wrench
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { Activity } from '../../types';

export const RecentActivity: React.FC = () => {
  const { activities } = useHostel();

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case 'assignment':
        return <UserPlus className="w-3.5 h-3.5 text-emerald-600" />;
      case 'payment':
        return <CreditCard className="w-3.5 h-3.5 text-emerald-600" />;
      case 'complaint':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-600" />;
      case 'checkout':
        return <UserMinus className="w-3.5 h-3.5 text-blue-600" />;
      case 'maintenance':
        return <Wrench className="w-3.5 h-3.5 text-teal-600" />;
      default:
        return <UserPlus className="w-3.5 h-3.5 text-blue-600" />;
    }
  };

  const getBgColor = (type: Activity['type']) => {
    switch (type) {
      case 'assignment':
      case 'payment':
        return 'bg-emerald-50 border-emerald-100';
      case 'complaint':
        return 'bg-rose-50 border-rose-100';
      case 'checkout':
        return 'bg-blue-50 border-blue-100';
      case 'maintenance':
        return 'bg-teal-50 border-teal-100';
      default:
        return 'bg-slate-50 border-slate-100';
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Recent Activity</h3>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3.5 my-auto">
        {activities.slice(0, 5).map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between gap-3 text-xs hover:bg-slate-50 p-1.5 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border ${getBgColor(
                  activity.type
                )}`}
              >
                {getIcon(activity.type)}
              </div>
              <p className="font-medium text-slate-700 truncate">{activity.title}</p>
            </div>
            <span className="text-[11px] font-medium text-slate-400 shrink-0">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
