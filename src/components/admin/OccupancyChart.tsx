import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const OccupancyChart: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState('All Blocks');

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Room Occupancy Overview</h3>
        <div className="relative">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded-lg px-2.5 py-1 pr-6 font-medium appearance-none focus:outline-hidden cursor-pointer"
          >
            <option>All Blocks</option>
            <option>Block A</option>
            <option>Block B</option>
            <option>Block C</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-auto py-2">
        {/* SVG Donut Chart */}
        <div className="relative flex items-center justify-center">
          <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="38"
              className="text-slate-100"
              strokeWidth="12"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Occupied: 92% (Green) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              className="text-emerald-500"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={2 * Math.PI * 38 * (1 - 0.92)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Available: 8% (Blue) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              className="text-blue-500"
              strokeWidth="12"
              strokeDasharray={2 * Math.PI * 38}
              strokeDashoffset={2 * Math.PI * 38 * (1 - 0.08)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              transform="rotate(331 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-2xl font-black text-slate-800">92%</span>
            <span className="text-[11px] font-medium text-slate-400">Occupied</span>
          </div>
        </div>

        {/* Legend stats */}
        <div className="space-y-3 text-xs w-full sm:w-auto">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-600 font-medium">Occupied Beds</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-800">463</span>{' '}
              <span className="text-slate-400 font-normal">(92%)</span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span className="text-slate-600 font-medium">Available Beds</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-800">17</span>{' '}
              <span className="text-slate-400 font-normal">(8%)</span>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-600 font-medium">Reserved Beds</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-slate-800">5</span>{' '}
              <span className="text-slate-400 font-normal">(1%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
