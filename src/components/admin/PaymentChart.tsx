import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { MONTHLY_PAYMENTS_2026 } from '../../data/mockData';

export const PaymentChart: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2026');

  // Max scale is 200K
  const maxVal = 200;

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Monthly Payment Collection</h3>
        <div className="relative">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 text-slate-600 rounded-lg px-2.5 py-1 pr-6 font-medium appearance-none focus:outline-hidden cursor-pointer"
          >
            <option>2026</option>
            <option>2025</option>
          </select>
          <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Bar Chart Body */}
      <div className="flex-1 flex flex-col justify-end">
        <div className="relative flex items-end gap-2.5 sm:gap-4 h-44 pt-6 border-b border-slate-100">
          {/* Y-axis background guidelines */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between text-[10px] text-slate-400 pointer-events-none border-b border-slate-100/80 pb-0.5">
            <span>200K</span>
          </div>
          <div className="absolute inset-x-0 top-1/4 flex items-center justify-between text-[10px] text-slate-400 pointer-events-none border-b border-slate-100/80 pb-0.5">
            <span>150K</span>
          </div>
          <div className="absolute inset-x-0 top-2/4 flex items-center justify-between text-[10px] text-slate-400 pointer-events-none border-b border-slate-100/80 pb-0.5">
            <span>100K</span>
          </div>
          <div className="absolute inset-x-0 top-3/4 flex items-center justify-between text-[10px] text-slate-400 pointer-events-none border-b border-slate-100/80 pb-0.5">
            <span>50K</span>
          </div>

          {/* Bars */}
          <div className="w-full flex items-end justify-between gap-1 sm:gap-2 px-1 z-10">
            {MONTHLY_PAYMENTS_2026.map((item) => {
              const heightPercent = Math.min(100, (item.collected / maxVal) * 100);

              return (
                <div key={item.month} className="flex-1 flex flex-col items-center group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] rounded-sm py-0.5 px-1.5 pointer-events-none whitespace-nowrap shadow-md z-20">
                    ৳ {item.collected}k collected
                  </div>

                  {/* Bar */}
                  <div className="w-full max-w-[22px] bg-blue-600 group-hover:bg-blue-700 rounded-t-md transition-all duration-300 shadow-2xs"
                    style={{ height: `${heightPercent}%` }}
                  />

                  {/* Month label */}
                  <span className="text-[10px] font-medium text-slate-500 mt-2">
                    {item.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-blue-600"></span>
            <span className="text-slate-600">Collected</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-xs bg-slate-300"></span>
            <span className="text-slate-600">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};
