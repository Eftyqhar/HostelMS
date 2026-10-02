import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import { StudentStatCards } from './StudentStatCards';
import { StudentProfileCard } from './StudentProfileCard';
import { StudentRoomCard } from './StudentRoomCard';
import { StudentMealCard } from './StudentMealCard';
import { StudentPayments } from './StudentPayments';
import { StudentComplaints } from './StudentComplaints';
import { StudentNotices } from './StudentNotices';
import { StudentAttendance } from './StudentAttendance';
import { StudentVisitors } from './StudentVisitors';
import { StudentQuickActions } from './StudentQuickActions';

export const StudentDashboard: React.FC = () => {
  const { currentStudent } = useHostel();

  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <span>Hello, {currentStudent.name}</span>
            <span className="text-xl animate-bounce">👋</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Welcome to your hostel portal. Here's an overview of your hostel activities.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span>Tue, 30 Sep 2026</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
            <Clock className="w-4 h-4 text-slate-500" />
            <span>02:15 PM</span>
          </div>
        </div>
      </div>

      {/* Row 1: Quick Status Cards */}
      <StudentStatCards />

      {/* Row 2: Profile, Room Details, Meal Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <StudentProfileCard />
        <StudentRoomCard />
        <StudentMealCard />
      </div>

      {/* Row 3: Payment History, Complaints, Notices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <StudentPayments />
        <StudentComplaints />
        <StudentNotices />
      </div>

      {/* Row 4: Attendance, Visitor Requests, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <StudentAttendance />
        <StudentVisitors />
        <StudentQuickActions />
      </div>
    </div>
  );
};
