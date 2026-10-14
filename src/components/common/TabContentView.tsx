import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import { ArrowLeft, Plus, CheckCircle2, XCircle, Clock, FileText, Mail } from 'lucide-react';
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
  const {
    activeSidebarTab,
    setActiveSidebarTab,
    role,
    openModal,
    currentStudent,
    messages,
    leaveRequests,
    submitLeaveRequest,
    updateLeaveRequestStatus,
    updateMessageStatus
  } = useHostel();

  const [leaveForm, setLeaveForm] = useState({
    reason: '',
    departureDate: '',
    returnDate: ''
  });

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
        return role === 'admin' ? (
          <div className="bg-white dark:bg-[#0c1524] p-6 rounded-2xl border border-slate-200 dark:border-[#162338] shadow-xs space-y-5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Resident Communications & Inquiries</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">All direct messages sent by hostel students to administration</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-bold text-[11px]">
                  {messages.length} Messages Total
                </span>
              </div>
            </div>

            {messages.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <Mail className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">No Messages Received</p>
                <p className="text-xs">When students submit inquiries from the Helpdesk modal, they appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-xl border space-y-2.5 transition-all ${
                      msg.status === 'Unread'
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-xs'
                        : 'bg-white dark:bg-[#0a1220] border-slate-200/80 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {msg.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{msg.studentName}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">ID: {msg.studentId} • Room {msg.room}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        msg.status === 'Unread'
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                          : msg.status === 'Replied'
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}>
                        {msg.status}
                      </span>
                    </div>

                    <div>
                      <span className="inline-block px-1.5 py-0.2 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold mr-1.5">
                        {msg.category}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{msg.subject}</span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 text-xs bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-850">
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {msg.date} at {msg.time}
                      </span>
                      <div className="flex items-center gap-2">
                        {msg.status === 'Unread' ? (
                          <button
                            onClick={() => updateMessageStatus(msg.id, 'Read')}
                            className="px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-2xs"
                          >
                            Mark as Read
                          </button>
                        ) : (
                          <button
                            onClick={() => updateMessageStatus(msg.id, 'Replied')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer transition-colors shadow-2xs"
                          >
                            Mark as Replied
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#0c1524] p-6 rounded-2xl border border-slate-200 dark:border-[#162338] shadow-xs space-y-6 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Hostel Office & Warden Contacts</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">Reach out to administration for inquiries, courier delivery, or emergency support</p>
              </div>
              <button
                onClick={() => openModal('sendMessage')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
              >
                Send Direct Message
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">Chief Hostel Warden</p>
                <p className="text-slate-500 dark:text-slate-400">Prof. Dr. M. Rahman</p>
                <p className="text-blue-600 dark:text-blue-400 font-medium">warden@hostelms.edu</p>
                <p className="text-slate-600 dark:text-slate-400">Phone: +880 1711-000111</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
                <p className="font-bold text-slate-800 dark:text-slate-200">Hostel Administrative Helpdesk</p>
                <p className="text-slate-500 dark:text-slate-400">Mr. Harun Ur Rashid (Supervisor)</p>
                <p className="text-blue-600 dark:text-blue-400 font-medium">office@hostelms.edu</p>
                <p className="text-slate-600 dark:text-slate-400">Phone: +880 1819-222333</p>
              </div>
            </div>

            {/* Student's Sent Messages */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-xs">My Sent Messages & Inquiries</h4>
              {messages.filter(m => m.studentId === currentStudent.id).length === 0 ? (
                <p className="text-slate-400 text-xs italic">You haven't sent any messages yet.</p>
              ) : (
                <div className="space-y-2">
                  {messages.filter(m => m.studentId === currentStudent.id).map(m => (
                    <div key={m.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">{m.subject}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">To: {m.recipient.split('(')[0].trim()} • {m.date}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'Replied'
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                          : m.status === 'Read'
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                          : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
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
        return role === 'admin' ? (
          <div className="bg-white dark:bg-[#0c1524] p-6 rounded-2xl border border-slate-200 dark:border-[#162338] shadow-xs space-y-5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Student Gate Pass & Leave Applications</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">Review, verify, and approve overnight and semester break leaves</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-bold text-[11px] self-start sm:self-auto">
                {leaveRequests.filter(l => l.status === 'Pending').length} Pending Approvals
              </span>
            </div>

            {leaveRequests.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <FileText className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600 mb-2" />
                <p className="font-bold text-slate-700 dark:text-slate-300 text-sm">No Leave Requests</p>
                <p className="text-xs">When students submit leave applications, they will appear here for review.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {leaveRequests.map((leave) => (
                  <div
                    key={leave.id}
                    className={`p-4 rounded-xl border space-y-3 transition-all ${
                      leave.status === 'Pending'
                        ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60 shadow-xs'
                        : leave.status === 'Approved'
                        ? 'bg-white dark:bg-[#0a1220] border-emerald-200/80 dark:border-emerald-950/60'
                        : 'bg-white dark:bg-[#0a1220] border-rose-200/80 dark:border-rose-950/60 opacity-80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-600/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {leave.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white leading-tight">{leave.studentName}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">ID: {leave.studentId} • Room {leave.room}</p>
                        </div>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        leave.status === 'Pending'
                          ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                          : leave.status === 'Approved'
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                      }`}>
                        {leave.status}
                      </span>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-850 space-y-1">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Reason: <span className="font-normal text-slate-600 dark:text-slate-400">{leave.reason}</span>
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                        <span><strong>Departure:</strong> {leave.departureDate}</span>
                        <span>•</span>
                        <span><strong>Return:</strong> {leave.returnDate}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <span className="text-slate-400">Applied on {leave.appliedDate}</span>

                      {leave.status === 'Pending' ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateLeaveRequestStatus(leave.id, 'Approved')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors cursor-pointer shadow-2xs"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve Pass</span>
                          </button>
                          <button
                            onClick={() => updateLeaveRequestStatus(leave.id, 'Rejected')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition-colors cursor-pointer shadow-2xs"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        </div>
                      ) : (
                        <span className="font-semibold text-slate-500 dark:text-slate-400">
                          {leave.status === 'Approved' ? 'Gate Pass Issued' : 'Application Rejected'}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-xs">
            {/* Left Column: Application Form */}
            <div className="lg:col-span-5 bg-white dark:bg-[#0c1524] p-6 rounded-2xl border border-slate-200 dark:border-[#162338] shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Hostel Leave / Gate Pass Application</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">Apply for weekend outing, semester vacation, or medical leave</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!leaveForm.reason.trim() || !leaveForm.departureDate || !leaveForm.returnDate) {
                    alert('Please fill out all fields.');
                    return;
                  }
                  submitLeaveRequest({
                    reason: leaveForm.reason,
                    departureDate: leaveForm.departureDate,
                    returnDate: leaveForm.returnDate,
                    studentId: currentStudent.id,
                    studentName: currentStudent.name,
                    room: currentStudent.room
                  });
                  setLeaveForm({ reason: '', departureDate: '', returnDate: '' });
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Reason for Leave *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Family wedding ceremony in Bogura / Medical checkup"
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({ ...leaveForm, reason: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-900 rounded-lg focus:outline-hidden focus:border-blue-500 text-slate-800 dark:text-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Departure Date *</label>
                    <input
                      required
                      type="date"
                      value={leaveForm.departureDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, departureDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-900 rounded-lg focus:outline-hidden focus:border-blue-500 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Return Date *</label>
                    <input
                      required
                      type="date"
                      value={leaveForm.returnDate}
                      onChange={(e) => setLeaveForm({ ...leaveForm, returnDate: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-700 bg-transparent dark:bg-slate-900 rounded-lg focus:outline-hidden focus:border-blue-500 text-slate-800 dark:text-slate-200"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <p><strong>Applying As:</strong> {currentStudent.name} (ID: {currentStudent.id})</p>
                  <p><strong>Hostel Room:</strong> {currentStudent.room} ({currentStudent.block})</p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-colors cursor-pointer shadow-xs"
                >
                  Submit Leave Application
                </button>
              </form>
            </div>

            {/* Right Column: Student's Past Leave Applications */}
            <div className="lg:col-span-7 bg-white dark:bg-[#0c1524] p-6 rounded-2xl border border-slate-200 dark:border-[#162338] shadow-xs space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">My Gate Pass Applications</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5">Status of your submitted leave and curfew extension passes</p>
              </div>

              {leaveRequests.filter(l => l.studentId === currentStudent.id).length === 0 ? (
                <div className="py-12 text-center text-slate-400">
                  <Clock className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600 mb-1.5" />
                  <p className="font-semibold text-xs text-slate-700 dark:text-slate-300">No Applications Submitted</p>
                  <p className="text-[11px]">Fill out the form on the left to submit a gate pass application.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {leaveRequests.filter(l => l.studentId === currentStudent.id).map(leave => (
                    <div
                      key={leave.id}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <p className="font-bold text-slate-900 dark:text-white">{leave.reason}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          {leave.departureDate} → {leave.returnDate}
                        </p>
                        <span className="text-[10px] text-slate-400">Applied: {leave.appliedDate}</span>
                      </div>

                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                        leave.status === 'Approved'
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                          : leave.status === 'Pending'
                          ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                          : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                      }`}>
                        {leave.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
