import React from 'react';
import { Calendar } from 'lucide-react';
import { StatCards } from './StatCards';
import { OccupancyChart } from './OccupancyChart';
import { PaymentChart } from './PaymentChart';
import { RecentActivity } from './RecentActivity';
import { HostelRoomMap } from './HostelRoomMap';
import { MealMenuView } from './MealMenuView';
import { TodayVisitors } from './TodayVisitors';
import { StudentsTable } from './StudentsTable';
import { ComplaintsTable } from './ComplaintsTable';
import { AdminQuickActions } from './AdminQuickActions';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Top Banner / Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dashboard</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Overview of hostel activities and statistics
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs text-xs font-semibold text-slate-700">
          <Calendar className="w-4 h-4 text-slate-500" />
          <span>Tue, 30 Sep 2026</span>
        </div>
      </div>

      {/* Row 1: KPI Stat Cards */}
      <StatCards />

      {/* Row 2: Occupancy Chart, Monthly Payment Collection, Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <OccupancyChart />
        <PaymentChart />
        <RecentActivity />
      </div>

      {/* Row 3: Hostel Map, Today's Meal Menu, Today's Visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <HostelRoomMap />
        <MealMenuView />
        <TodayVisitors />
      </div>

      {/* Row 4: Recent Students, Pending Complaints, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <StudentsTable />
        <ComplaintsTable />
        <AdminQuickActions />
      </div>
    </div>
  );
};
