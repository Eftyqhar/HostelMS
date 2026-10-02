import React, { useState, useEffect } from 'react';
import { Wifi, Signal, BatteryMedium } from 'lucide-react';

export const AndroidStatusBar: React.FC = () => {
  const [timeStr, setTimeStr] = useState('10:30');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-slate-900 text-white px-5 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold tracking-tight select-none z-50 shrink-0">
      {/* Left: Time & Notification Dot */}
      <div className="flex items-center gap-1.5 pl-1">
        <span>{timeStr}</span>
        <span className="w-1 h-1 rounded-full bg-blue-400"></span>
      </div>

      {/* Center: Punch-hole camera lens mockup */}
      <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-700/60 shadow-inner flex items-center justify-center">
        <div className="w-1 h-1 rounded-full bg-slate-800"></div>
      </div>

      {/* Right: Signal, Wi-Fi, Battery */}
      <div className="flex items-center gap-2 pr-1 text-slate-200">
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-1">
          <span className="text-[10px]">88%</span>
          <BatteryMedium className="w-4 h-4 text-emerald-400" />
        </div>
      </div>
    </div>
  );
};
