import React from 'react';
import { UserPlus, BedDouble, CreditCard, FileText } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const AdminQuickActions: React.FC = () => {
  const { openModal } = useHostel();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3 my-auto">
        {/* 1. Add Student */}
        <button
          onClick={() => openModal('addStudent')}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xs hover:shadow-md cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <UserPlus className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-bold">Add Student</span>
        </button>

        {/* 2. Assign Room */}
        <button
          onClick={() => openModal('assignRoom')}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-emerald-100 text-emerald-900 hover:bg-emerald-200 transition-all shadow-xs hover:shadow-md cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-200/70 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <BedDouble className="w-5 h-5 text-emerald-800" />
          </div>
          <span className="text-xs font-bold">Assign Room</span>
        </button>

        {/* 3. Collect Payment */}
        <button
          onClick={() => openModal('collectPayment')}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-amber-100 text-amber-900 hover:bg-amber-200 transition-all shadow-xs hover:shadow-md cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-200/70 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5 text-amber-800" />
          </div>
          <span className="text-xs font-bold">Collect Payment</span>
        </button>

        {/* 4. New Complaint */}
        <button
          onClick={() => openModal('newComplaint')}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-rose-100 text-rose-900 hover:bg-rose-200 transition-all shadow-xs hover:shadow-md cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-200/70 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-rose-800" />
          </div>
          <span className="text-xs font-bold">New Complaint</span>
        </button>
      </div>
    </div>
  );
};
