import React from 'react';
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentAttendance: React.FC = () => {
  const { attendance, setActiveSidebarTab } = useHostel();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-slate-800">Attendance (Night)</h3>
        <button
          onClick={() => setActiveSidebarTab('Attendance')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Month Navigator */}
      <div className="flex items-center justify-center gap-3 py-2 text-xs font-bold text-slate-700">
        <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span>September 2026</span>
        <button className="p-1 rounded-md hover:bg-slate-100 text-slate-400 hover:text-slate-700">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Weekday tracking strip */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2 my-2 text-center">
        {attendance.map((att) => {
          const isPresent = att.status === 'present';
          const isAbsent = att.status === 'absent';

          return (
            <div key={att.date} className="flex flex-col items-center">
              <span className="text-[11px] font-medium text-slate-400 mb-1">{att.day}</span>
              <span className="text-xs font-bold text-slate-800 mb-1.5">{att.dateNum}</span>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shadow-2xs ${
                  isPresent
                    ? 'bg-emerald-500 text-white'
                    : isAbsent
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isPresent ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-5 pt-3 border-t border-slate-100 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600">Present</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-600">Absent</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
          <span className="text-slate-600">Leave</span>
        </div>
      </div>
    </div>
  );
};
