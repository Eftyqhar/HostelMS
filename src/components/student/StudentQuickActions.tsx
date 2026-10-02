import React from 'react';
import { CreditCard, FileText, UserPlus, Utensils } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentQuickActions: React.FC = () => {
  const { openModal, setActiveSidebarTab } = useHostel();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <h3 className="text-sm font-bold text-slate-800 mb-4">Quick Actions</h3>

      <div className="grid grid-cols-2 gap-3 my-auto">
        {/* 1. Make Payment */}
        <button
          onClick={() => openModal('makePayment')}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 transition-all shadow-2xs hover:shadow-sm cursor-pointer group border border-blue-100"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-bold">Make Payment</span>
        </button>

        {/* 2. Submit Complaint */}
        <button
          onClick={() => openModal('newComplaint')}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-rose-50 hover:bg-rose-100/80 text-rose-700 transition-all shadow-2xs hover:shadow-sm cursor-pointer group border border-rose-100"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <FileText className="w-5 h-5 text-rose-600" />
          </div>
          <span className="text-xs font-bold">Submit Complaint</span>
        </button>

        {/* 3. Request Visitor */}
        <button
          onClick={() => openModal('visitorRequest')}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 text-emerald-700 transition-all shadow-2xs hover:shadow-sm cursor-pointer group border border-emerald-100"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <UserPlus className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-xs font-bold">Request Visitor</span>
        </button>

        {/* 4. View Menu */}
        <button
          onClick={() => setActiveSidebarTab('Meal Menu')}
          className="flex flex-col items-center justify-center p-4 rounded-xl bg-amber-50 hover:bg-amber-100/80 text-amber-700 transition-all shadow-2xs hover:shadow-sm cursor-pointer group border border-amber-100"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Utensils className="w-5 h-5 text-amber-600" />
          </div>
          <span className="text-xs font-bold">View Menu</span>
        </button>
      </div>
    </div>
  );
};
