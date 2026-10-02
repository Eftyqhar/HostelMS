import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Clock,
  FileCheck,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Plane,
  Plus,
  Send,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

interface LeaveApplication {
  id: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  approvedBy: string;
  applyDate: string;
}

export const StudentAttendanceView: React.FC = () => {
  const { currentStudent, attendance, showToast } = useHostel();

  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveType, setLeaveType] = useState('Home Visit');
  const [startDate, setStartDate] = useState('2026-10-05');
  const [endDate, setEndDate] = useState('2026-10-08');
  const [reason, setReason] = useState('');

  // Sample historical leave records for Rahim
  const [leaveHistory, setLeaveHistory] = useState<LeaveApplication[]>([
    {
      id: 'LV-2026-081',
      leaveType: 'Home Visit',
      startDate: '12 Sep 2026',
      endDate: '14 Sep 2026',
      reason: 'Sister marriage ceremony in Chittagong',
      status: 'Approved',
      approvedBy: 'Prof. Dr. M. Rahman (Chief Warden)',
      applyDate: '08 Sep 2026'
    },
    {
      id: 'LV-2026-044',
      leaveType: 'Medical Sick Leave',
      startDate: '22 Aug 2026',
      endDate: '24 Aug 2026',
      reason: 'Fever & viral infection recovery at home',
      status: 'Approved',
      approvedBy: 'Mr. Harun Ur Rashid (Asst. Warden)',
      applyDate: '21 Aug 2026'
    }
  ]);

  // Generate 30 days of calendar data for September
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1;
    let status: 'present' | 'absent' | 'leave' = 'present';
    if (dayNum === 13) status = 'leave';
    if (dayNum === 14) status = 'leave';
    if (dayNum === 21) status = 'absent';
    return {
      day: dayNum,
      weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][(dayNum + 1) % 7],
      status
    };
  });

  const presentCount = daysInMonth.filter((d) => d.status === 'present').length;
  const attendanceRate = ((presentCount / 30) * 100).toFixed(1);

  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Please provide a reason for the leave application');
      return;
    }

    const newLeave: LeaveApplication = {
      id: `LV-2026-0${leaveHistory.length + 85}`,
      leaveType,
      startDate,
      endDate,
      reason,
      status: 'Pending',
      approvedBy: 'Pending Warden Verification',
      applyDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setLeaveHistory([newLeave, ...leaveHistory]);
    setShowLeaveModal(false);
    setReason('');
    showToast('Hostel Gate Pass / Leave application submitted to Warden Office!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Student Attendance Record
            </span>
            <span className="text-xs text-slate-300">• Room {currentStudent.room}</span>
            <span className="text-xs text-slate-300">• Bed {currentStudent.bedNo}</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">My Night Roll-Call & Curfew Attendance</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Track daily 10:00 PM roll-call records, digital gate entries, biometric verifications, and apply for approved hostel leave passes.
          </p>
        </div>

        <button
          onClick={() => setShowLeaveModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Plane className="w-4 h-4" />
          <span>Apply for Hostel Leave</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Monthly Attendance</p>
            <h4 className="text-2xl font-black text-emerald-600">{attendanceRate}%</h4>
            <span className="text-[10px] text-slate-500">{presentCount} of 30 Nights Present</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Tonight's Roll-Call</p>
            <h4 className="text-2xl font-black text-blue-600">Present</h4>
            <span className="text-[10px] text-slate-500">Verified at 09:48 PM</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Approved Leaves</p>
            <h4 className="text-2xl font-black text-indigo-600">2 Days</h4>
            <span className="text-[10px] text-slate-400">Sister marriage leave</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Curfew Disciplinary Status</p>
            <h4 className="text-2xl font-black text-slate-800">Clear</h4>
            <span className="text-[10px] text-emerald-600 font-bold">0 Late Gate Entries</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Monthly Attendance Calendar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Monthly Night Roll-Call Calendar</h4>
            <p className="text-xs text-slate-400">Daily presence status recorded by floor supervisor & biometric turnstile</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-700">
              <button
                onClick={() => setSelectedMonth('August 2026')}
                className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{selectedMonth}</span>
              <button
                onClick={() => setSelectedMonth('October 2026')}
                className="p-0.5 rounded hover:bg-slate-200 text-slate-400 hover:text-slate-700"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 30-Day Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {daysInMonth.map((d) => {
            const isPresent = d.status === 'present';
            const isAbsent = d.status === 'absent';

            return (
              <div
                key={d.day}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isPresent
                    ? 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
                    : isAbsent
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                <span className="text-[10px] font-semibold text-slate-400 uppercase">{d.weekday}</span>
                <span className="text-sm font-black my-0.5">{d.day}</span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                    isPresent
                      ? 'bg-emerald-600 text-white'
                      : isAbsent
                      ? 'bg-rose-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {isPresent ? 'P' : isAbsent ? 'A' : 'L'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
            <span className="text-slate-700 font-medium">Present (Night roll-call verified)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500"></span>
            <span className="text-slate-700 font-medium">Absent (Unexcused missing)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-amber-500"></span>
            <span className="text-slate-700 font-medium">Approved Leave (Authorized gate pass)</span>
          </div>
        </div>
      </div>

      {/* Weekday Summary & Recent Check-in Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly strip tracker */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <h4 className="font-bold text-slate-800 text-sm">Past 7 Days Verification</h4>
          <p className="text-xs text-slate-400">Current week night verification history</p>

          <div className="space-y-3">
            {attendance.map((att) => (
              <div
                key={att.date}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                      att.status === 'present'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {att.dateNum}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">
                      {att.day}, {att.dateNum} Sep 2026
                    </p>
                    <p className="text-[11px] text-slate-400">Time: 09:45 PM • Room B-203</p>
                  </div>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    att.status === 'present'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {att.status === 'present' ? 'Verified' : 'Absent'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Requests & Gate Pass History */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Leave History & Warden Gate Passes</h4>
              <p className="text-xs text-slate-400">Official permissions granted for leaving campus overnight</p>
            </div>
            <button
              onClick={() => setShowLeaveModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs border border-blue-200 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Pass</span>
            </button>
          </div>

          <div className="space-y-3">
            {leaveHistory.map((lv) => (
              <div
                key={lv.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-blue-200 transition-colors space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-800">{lv.id}</span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-700">
                      {lv.leaveType}
                    </span>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      lv.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : lv.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {lv.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span className="font-medium text-slate-400">Leave Duration: </span>
                    <span className="font-semibold text-slate-800">
                      {lv.startDate} to {lv.endDate}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-400">Authorized By: </span>
                    <span className="font-semibold text-slate-800">{lv.approvedBy}</span>
                  </div>
                </div>

                <div className="pt-1.5 border-t border-slate-100 text-slate-500">
                  <span className="font-medium">Reason: </span>
                  <span>{lv.reason}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Hostel Curfew Notice</p>
              <p className="text-blue-800/80 mt-0.5">
                Night gate lock time is strictly 10:00 PM. Any student absent without an approved leave pass is flagged in the warden register and parents will receive an automated SMS notification.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave Application Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Apply for Hostel Leave Pass</h3>
                  <p className="text-[11px] text-slate-400">Warden gate clearance form</p>
                </div>
              </div>
              <button
                onClick={() => setShowLeaveModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitLeave} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Leave Category</label>
                <select
                  value={leaveType}
                  onChange={(e) => setLeaveType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="Home Visit">Home Visit / Weekend</option>
                  <option value="Medical Sick Leave">Medical / Sick Leave</option>
                  <option value="Academic Contest / Field Trip">Academic Contest / Field Trip</option>
                  <option value="Emergency Family Reason">Emergency Family Reason</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Departure Date</label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Expected Return Date</label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason & Destination Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State the destination address, contact number while outside, and purpose of leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Guardian phone ({currentStudent.guardianPhone || '01811-987654'}) will be notified upon Warden approval.</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
