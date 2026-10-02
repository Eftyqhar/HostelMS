import React from 'react';
import { BedDouble, CreditCard, Utensils, MessageSquare, ArrowRight } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentStatCards: React.FC = () => {
  const { currentStudent, complaints, meals, openModal, setActiveSidebarTab } = useHostel();

  const mealsTakenCount = meals.filter(m => m.taken).length;
  const openComplaintsCount = complaints.filter(
    c => c.studentId === currentStudent.id && c.status !== 'Resolved'
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. My Room */}
      <div
        onClick={() => setActiveSidebarTab('My Room')}
        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <BedDouble className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">My Room</p>
            <h3 className="text-xl font-extrabold text-slate-800">{currentStudent.room}</h3>
            <p className="text-[11px] font-medium text-slate-500">
              {currentStudent.block} • 2nd Floor
            </p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* 2. Payment Status */}
      <div
        onClick={() => openModal('makePayment')}
        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Payment Status</p>
            <h3 className="text-xl font-extrabold text-emerald-600">Paid</h3>
            <p className="text-[11px] font-medium text-slate-500">September 2026</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* 3. Today's Meals */}
      <div
        onClick={() => setActiveSidebarTab('Meal Menu')}
        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">Today's Meals</p>
            <h3 className="text-xl font-extrabold text-slate-800">
              {mealsTakenCount} / {meals.length}
            </h3>
            <p className="text-[11px] font-medium text-slate-500">Meals Taken</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-amber-600 group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>

      {/* 4. My Complaints */}
      <div
        onClick={() => openModal('newComplaint')}
        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-400">My Complaints</p>
            <h3 className="text-xl font-extrabold text-slate-800">{openComplaintsCount}</h3>
            <p className="text-[11px] font-medium text-slate-500">Open Complaint</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-purple-600 group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
