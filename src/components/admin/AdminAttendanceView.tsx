import React, { useState } from 'react';
import {
  CalendarCheck,
  Check,
  X,
  Plane,
  Users,
  AlertTriangle,
  Send,
  Calendar
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { Student } from '../../types';

interface RollCallStatus {
  [studentId: string]: 'present' | 'absent' | 'leave';
}

export const AdminAttendanceView: React.FC = () => {
  const { students, showToast } = useHostel();

  const [selectedBlock, setSelectedBlock] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-09-30');

  // Initialize attendance state for each student
  const [rollCall, setRollCall] = useState<RollCallStatus>(() => {
    const initial: RollCallStatus = {};
    students.forEach((s, idx) => {
      // Default Rahim (1021) and most students to present, Fahim (1023) to absent
      if (s.id === '1023' || idx === 4) {
        initial[s.id] = 'absent';
      } else if (idx === 2) {
        initial[s.id] = 'leave';
      } else {
        initial[s.id] = 'present';
      }
    });
    return initial;
  });

  const handleMark = (studentId: string, status: 'present' | 'absent' | 'leave') => {
    setRollCall((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleMarkAllPresent = () => {
    const updated: RollCallStatus = {};
    students.forEach((s) => {
      updated[s.id] = 'present';
    });
    setRollCall(updated);
    showToast('All resident students marked Present for tonight roll-call!');
  };

  const handleSendAbsenteeAlerts = () => {
    const absentees = Object.entries(rollCall).filter(([_, status]) => status === 'absent').length;
    showToast(`SMS & WhatsApp alerts sent to parents/guardians of ${absentees} absent students.`);
  };

  const filteredStudents = students.filter((s) => {
    if (selectedBlock === 'All') return true;
    return s.block === selectedBlock || s.room.startsWith(selectedBlock.charAt(6));
  });

  const presentCount = Object.values(rollCall).filter((s) => s === 'present').length;
  const absentCount = Object.values(rollCall).filter((s) => s === 'absent').length;
  const leaveCount = Object.values(rollCall).filter((s) => s === 'leave').length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Hostel Security & Night Roll-Call
            </span>
            <span className="text-xs text-slate-300">• Night Gate Closing: 10:00 PM</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Night Attendance Register & Roll-Call</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Floor-by-floor physical verification of hostel residents. Automatically track unauthorized night absences and dispatch guardian notifications.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleMarkAllPresent}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Mark All Present</span>
          </button>
          <button
            onClick={handleSendAbsenteeAlerts}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Alert Absentees ({absentCount})</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Total Enrolled</p>
            <h4 className="text-2xl font-black text-slate-800">{students.length > 6 ? students.length : 248}</h4>
            <span className="text-[10px] text-slate-500 font-semibold">Active residents</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Present Tonight</p>
            <h4 className="text-2xl font-black text-emerald-600">{presentCount > 0 ? presentCount + 235 : 238}</h4>
            <span className="text-[10px] text-emerald-600 font-semibold">In room verified</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CalendarCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Absent Without Pass</p>
            <h4 className="text-2xl font-black text-rose-600">{absentCount > 0 ? absentCount : 6}</h4>
            <span className="text-[10px] text-rose-500 font-semibold">Needs warden follow-up</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Approved Leave</p>
            <h4 className="text-2xl font-black text-blue-600">{leaveCount > 0 ? leaveCount : 4}</h4>
            <span className="text-[10px] text-blue-500 font-semibold">Verified gate passes</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Plane className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Roll Call Table with Live Toggles */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Resident Roll-Call Sheet</h4>
            <p className="text-xs text-slate-400">Click Present, Absent, or Leave to mark attendance</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-transparent focus:outline-hidden text-xs cursor-pointer"
              />
            </div>

            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
              {(['All', 'Block A', 'Block B', 'Block C'] as const).map((block) => (
                <button
                  key={block}
                  onClick={() => setSelectedBlock(block)}
                  className={`px-3 py-1 rounded-md transition-all ${
                    selectedBlock === block
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {block}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                <th className="pb-2.5">Student ID</th>
                <th className="pb-2.5">Student Name</th>
                <th className="pb-2.5">Room & Bed</th>
                <th className="pb-2.5">Department</th>
                <th className="pb-2.5 text-center">Status Tonight</th>
                <th className="pb-2.5 text-right">Quick Marking</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((student: Student) => {
                const currentStatus = rollCall[student.id] || 'present';

                return (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-bold text-slate-700">{student.id}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={student.avatar}
                          alt={student.name}
                          className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-800">{student.name}</p>
                          <p className="text-[10px] text-slate-400">{student.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="font-bold text-slate-800">{student.room}</span>
                      <span className="text-[10px] text-slate-400 ml-1.5 font-mono">({student.bedNo})</span>
                    </td>
                    <td className="py-3 text-slate-600 font-medium">{student.department}</td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          currentStatus === 'present'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : currentStatus === 'absent'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {currentStatus === 'present'
                          ? '✓ Present'
                          : currentStatus === 'absent'
                          ? '✗ Absent'
                          : '✈ On Leave'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                        <button
                          onClick={() => handleMark(student.id, 'present')}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentStatus === 'present'
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'text-slate-500 hover:text-emerald-700'
                          }`}
                          title="Mark Present"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMark(student.id, 'absent')}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentStatus === 'absent'
                              ? 'bg-rose-600 text-white shadow-2xs'
                              : 'text-slate-500 hover:text-rose-700'
                          }`}
                          title="Mark Absent"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleMark(student.id, 'leave')}
                          className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            currentStatus === 'leave'
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'text-slate-500 hover:text-blue-700'
                          }`}
                          title="Mark On Leave"
                        >
                          <Plane className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
