import React from 'react';
import { useHostel } from '../../context/HostelContext';
import { ArrowLeft, Plus } from 'lucide-react';
import { StudentsTable } from '../admin/StudentsTable';
import { AdminComplaintsView } from '../admin/AdminComplaintsView';
import { StudentComplaintsView } from '../student/StudentComplaintsView';
import { HostelRoomMap } from '../admin/HostelRoomMap';
import { TodayVisitors } from '../admin/TodayVisitors';
import { StudentNotices } from '../student/StudentNotices';
import { BlocksView } from '../admin/BlocksView';
import { SettingsView } from '../admin/SettingsView';
import { MaintenanceView } from '../admin/MaintenanceView';
import { StudentProfileCard } from '../student/StudentProfileCard';
import { AdminPaymentsView } from '../admin/AdminPaymentsView';
import { StudentPaymentsView } from '../student/StudentPaymentsView';
import { AdminAttendanceView } from '../admin/AdminAttendanceView';
import { StudentAttendanceView } from '../student/StudentAttendanceView';
import { StudentSettingsView } from '../student/StudentSettingsView';
import { StudentMyRoomView } from '../student/StudentMyRoomView';
import { AdminMealsView } from '../admin/AdminMealsView';
import { StudentMealsView } from '../student/StudentMealsView';
import { AndroidMoreView } from '../android/AndroidMoreView';

export const TabContentView: React.FC = () => {
  const { activeSidebarTab, setActiveSidebarTab, role, openModal } = useHostel();

  const renderContent = () => {
    switch (activeSidebarTab) {
      case 'Students':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-slate-500">Manage all registered hostel students and assignments</p>
              <button
                onClick={() => openModal('addStudent')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs"
              >
                <Plus className="w-4 h-4" /> Add Student
              </button>
            </div>
            <StudentsTable />
          </div>
        );

      case 'Rooms':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Room availability, bed mapping, and occupancy status</p>
            <HostelRoomMap />
          </div>
        );

      case 'My Room':
        return <StudentMyRoomView />;

      case 'Payments':
        return role === 'admin' ? <AdminPaymentsView /> : <StudentPaymentsView />;

      case 'Meals':
        return <AdminMealsView />;

      case 'Meal Menu':
        return <StudentMealsView />;

      case 'Complaints':
        return role === 'admin' ? <AdminComplaintsView /> : <StudentComplaintsView />;

      case 'Visitors':
      case 'Visitor Request':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Campus visitor gate passes and check-ins</p>
            <TodayVisitors />
          </div>
        );

      case 'Attendance':
        return role === 'admin' ? <AdminAttendanceView /> : <StudentAttendanceView />;

      case 'Notices':
        return (
          <div className="space-y-4">
            <p className="text-xs text-slate-500">Official hostel announcements and deadlines</p>
            <StudentNotices />
          </div>
        );

      case 'Hostel Rules':
        return (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs text-slate-700">
            <h3 className="text-base font-bold text-slate-800">Hostel Code of Conduct & Rules</h3>
            <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
              <li><strong>Gate Timing:</strong> Main hostel gates close strictly at 10:00 PM. Late entries require prior warden approval.</li>
              <li><strong>Quiet Hours:</strong> Maintain quiet hours from 11:00 PM to 6:00 AM to facilitate study and sleep.</li>
              <li><strong>Visitors:</strong> Guests and family members are permitted only in the ground-floor visitor lounge between 10:00 AM and 8:00 PM.</li>
              <li><strong>Electrical Appliances:</strong> High-voltage heaters, induction cooktops, and electric irons are strictly forbidden in student rooms.</li>
              <li><strong>Cleanliness:</strong> Students are responsible for maintaining cleanliness inside their respective rooms and common washroom corridors.</li>
            </ol>
          </div>
        );

      case 'Contact':
        return (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5 text-xs text-slate-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-800">Hostel Office & Warden Contacts</h3>
                <p className="text-slate-500 mt-0.5">Reach out to administration for inquiries, courier delivery, or emergency support</p>
              </div>
              <button
                onClick={() => openModal('sendMessage')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                Send Direct Message
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-800">Chief Hostel Warden</p>
                <p className="text-slate-500">Prof. Dr. M. Rahman</p>
                <p className="text-blue-600 font-medium">warden@hostelms.edu</p>
                <p className="text-slate-600">Phone: +880 1711-000111</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-800">Hostel Administrative Helpdesk</p>
                <p className="text-slate-500">Mr. Harun Ur Rashid (Supervisor)</p>
                <p className="text-blue-600 font-medium">office@hostelms.edu</p>
                <p className="text-slate-600">Phone: +880 1819-222333</p>
              </div>
            </div>
          </div>
        );

      case 'Blocks':
        return <BlocksView />;

      case 'Settings':
        return role === 'admin' ? <SettingsView /> : <StudentSettingsView />;

      case 'My Profile':
        return (
          <div className="max-w-2xl">
            <StudentProfileCard />
          </div>
        );

      case 'Maintenance':
        return <MaintenanceView />;

      case 'Inventory':
        return (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-800">Hostel Asset & Furniture Inventory</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800">Bunk Beds & Mattresses</span>
                <p className="text-slate-400 mt-1">Total: 480 Units (96% In Use)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800">Study Tables & Chairs</span>
                <p className="text-slate-400 mt-1">Total: 480 Units (Active)</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800">Ceiling Fans & Lights</span>
                <p className="text-slate-400 mt-1">Total: 240 Units (24 in buffer stock)</p>
              </div>
            </div>
          </div>
        );

      case 'Reports':
        return (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-800">Audit & Financial Reports</h3>
            <p className="text-slate-500">Export monthly occupancy, fee revenue, and maintenance logs.</p>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
              >
                Generate Monthly PDF Summary
              </button>
            </div>
          </div>
        );

      case 'Users & Roles':
        return (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs">
            <h3 className="text-base font-bold text-slate-800">Administrative Users & Access Control</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                <div>
                  <p className="font-bold text-slate-800">System Administrator (Super Admin)</p>
                  <p className="text-slate-400">admin@hostelms.edu • Full Campus Privileges</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200">
                <div>
                  <p className="font-bold text-slate-800">Hostel Warden Office</p>
                  <p className="text-slate-400">warden@hostelms.edu • Student & Room Allocations</p>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Active</span>
              </div>
            </div>
          </div>
        );

      case 'Leave Request':
        return (
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4 text-xs max-w-lg">
            <h3 className="text-base font-bold text-slate-800">Hostel Leave / Gate Pass Application</h3>
            <p className="text-slate-500">Apply for vacation, semester break, or emergency night-out leave.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Leave request submitted to Warden Office for verification!');
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason for Leave</label>
                <input required type="text" placeholder="e.g. Family Function / Medical" className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Departure Date</label>
                  <input required type="date" className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Return Date</label>
                  <input required type="date" className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold">
                Submit Leave Application
              </button>
            </form>
          </div>
        );

      case 'More':
        return <AndroidMoreView />;

      default:
        return (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs text-center space-y-2">
            <h3 className="font-bold text-slate-800 text-sm">{activeSidebarTab} View</h3>
            <p className="text-xs text-slate-400">Section details and settings for {activeSidebarTab}.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveSidebarTab('Dashboard')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dashboard</span>
        </button>
        <h2 className="text-xl font-black text-slate-800">{activeSidebarTab}</h2>
      </div>

      {renderContent()}
    </div>
  );
};
