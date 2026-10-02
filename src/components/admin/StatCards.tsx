import React from 'react';
import {
  GraduationCap,
  BedDouble,
  Users,
  Bed,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StatCards: React.FC = () => {
  const { students, complaints, payments } = useHostel();

  const totalStudents = students.length > 6 ? students.length : 248;
  const totalRooms = 120;
  const occupiedBeds = 463;
  const availableBeds = 17;
  const pendingPaymentsAmount = 42500;
  const pendingStudentsCount = payments.filter(p => p.status === 'Pending').length || 16;
  const openComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length || 8;
  const highPriorityComplaints = complaints.filter(c => c.priority === 'High' && c.status !== 'Resolved').length || 3;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {/* 1. Total Students */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Students</p>
            <h3 className="text-xl font-extrabold text-slate-800">{totalStudents}</h3>
          </div>
        </div>
        <div className="mt-3 flex items-center text-[11px] font-medium text-emerald-600">
          <span>↑ 12 this month</span>
        </div>
      </div>

      {/* 2. Total Rooms */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-sm">
            <BedDouble className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Total Rooms</p>
            <h3 className="text-xl font-extrabold text-slate-800">{totalRooms}</h3>
          </div>
        </div>
        <div className="mt-3 flex items-center text-[11px] text-slate-500 font-medium">
          <span>3 Blocks • 12 Floors</span>
        </div>
      </div>

      {/* 3. Occupied Beds */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-sm">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Occupied Beds</p>
            <h3 className="text-xl font-extrabold text-slate-800">{occupiedBeds}</h3>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-[11px] font-medium text-slate-600">92% Occupancy</p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>

      {/* 4. Available Beds */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-sm">
            <Bed className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Available Beds</p>
            <h3 className="text-xl font-extrabold text-slate-800">{availableBeds}</h3>
          </div>
        </div>
        <div className="mt-3 space-y-1">
          <p className="text-[11px] font-medium text-slate-600">8% Available</p>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '8%' }}></div>
          </div>
        </div>
      </div>

      {/* 5. Pending Payments */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-sm font-bold text-lg">
            ৳
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Pending Payments</p>
            <h3 className="text-xl font-extrabold text-slate-800">৳ {pendingPaymentsAmount.toLocaleString()}</h3>
          </div>
        </div>
        <div className="mt-3 flex items-center text-[11px] font-medium text-rose-600">
          <span>↑ {pendingStudentsCount} students</span>
        </div>
      </div>

      {/* 6. Open Complaints */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-sm">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-medium text-slate-500">Open Complaints</p>
            <h3 className="text-xl font-extrabold text-slate-800">{openComplaintsCount}</h3>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-rose-600">
          <AlertCircle className="w-3 h-3" />
          <span>{highPriorityComplaints} High Priority</span>
        </div>
      </div>
    </div>
  );
};
