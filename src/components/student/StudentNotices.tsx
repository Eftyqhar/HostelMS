import React from 'react';
import { Calendar, Droplets, Sparkles, Clock } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { Notice } from '../../types';

export const StudentNotices: React.FC = () => {
  const { notices, setActiveSidebarTab } = useHostel();

  const getNoticeIcon = (type: Notice['type']) => {
    switch (type) {
      case 'fee':
        return <Calendar className="w-4 h-4 text-blue-600" />;
      case 'water':
        return <Droplets className="w-4 h-4 text-rose-600" />;
      case 'clean':
        return <Sparkles className="w-4 h-4 text-purple-600" />;
      case 'timing':
        return <Clock className="w-4 h-4 text-sky-600" />;
      default:
        return <Calendar className="w-4 h-4 text-slate-600" />;
    }
  };

  const getNoticeBg = (type: Notice['type']) => {
    switch (type) {
      case 'fee':
        return 'bg-blue-100 text-blue-700';
      case 'water':
        return 'bg-rose-100 text-rose-700';
      case 'clean':
        return 'bg-purple-100 text-purple-700';
      case 'timing':
        return 'bg-sky-100 text-sky-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Notices & Announcements</h3>
        <button
          onClick={() => setActiveSidebarTab('Notices')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="space-y-3.5 my-auto">
        {notices.map((n) => (
          <div
            key={n.id}
            className="flex items-start justify-between gap-3 text-xs p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-start gap-3 min-w-0">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${getNoticeBg(
                  n.type
                )}`}
              >
                {getNoticeIcon(n.type)}
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-slate-800 truncate">{n.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-1">{n.description}</p>
              </div>
            </div>

            <span className="text-[11px] font-medium text-slate-400 shrink-0">
              {n.date}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
