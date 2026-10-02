import React from 'react';
import { User } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const TodayVisitors: React.FC = () => {
  const { visitors, openModal } = useHostel();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-800">Today's Visitors</h3>
        <button
          onClick={() => openModal('visitorRequest')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Quick Count Stats */}
      <div className="flex items-center justify-around py-2 my-1 border-b border-slate-100 text-center">
        <div>
          <span className="text-xl font-extrabold text-slate-800">23</span>
          <p className="text-[11px] font-medium text-slate-400">Total Visitors</p>
        </div>
        <div className="h-8 w-px bg-slate-200"></div>
        <div>
          <span className="text-xl font-extrabold text-emerald-600">8</span>
          <p className="text-[11px] font-medium text-slate-400">Currently Inside</p>
        </div>
      </div>

      {/* Visitor List */}
      <div className="space-y-3 mt-2">
        {visitors.slice(0, 3).map((v) => (
          <div
            key={v.id}
            className="flex items-center justify-between gap-3 text-xs p-1.5 rounded-xl hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-slate-800 truncate">
                  {v.visitorName}
                </p>
                <p className="text-[11px] text-slate-400 truncate">
                  ({v.relation}) → <span className="text-slate-600 font-medium">{v.studentName}</span>
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-[11px] font-medium text-slate-400">{v.timeIn}</p>
              <span
                className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mt-0.5 ${
                  v.status === 'Inside'
                    ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {v.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
