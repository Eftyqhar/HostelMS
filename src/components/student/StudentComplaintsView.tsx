import React, { useState } from 'react';
import {
  Plus,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Wrench,
  Phone,
  Send,
  Zap,
  Droplet,
  Wifi
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { Complaint } from '../../types';

export const StudentComplaintsView: React.FC = () => {
  const { complaints, currentStudent, openModal, showToast } = useHostel();

  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'resolved'>('all');

  // Filter complaints for current student (by studentId or room)
  const myComplaints = complaints.filter(
    (c) => c.studentId === currentStudent.id || c.room === currentStudent.room
  );

  const openComplaints = myComplaints.filter((c) => c.status !== 'Resolved');
  const resolvedComplaints = myComplaints.filter((c) => c.status === 'Resolved');

  const displayedComplaints =
    activeTab === 'all'
      ? myComplaints
      : activeTab === 'open'
      ? openComplaints
      : resolvedComplaints;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Electrical':
        return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Water':
        return <Droplet className="w-4 h-4 text-blue-500" />;
      case 'Internet':
        return <Wifi className="w-4 h-4 text-indigo-500" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-500" />;
    }
  };

  const getPriorityBadge = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const handlePingWarden = (id: string, subject: string) => {
    showToast(`Follow-up alert sent to Warden Office for ticket #${id} (${subject})`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30">
              Student Grievance & Maintenance Portal
            </span>
            <span className="text-xs text-slate-300">• Room {currentStudent.room}</span>
            <span className="text-xs text-slate-300">• {currentStudent.block}</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">My Room Complaints & Maintenance Requests</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Lodge maintenance tickets for electrical, plumbing, or furniture issues, monitor repair technician dispatch status, and view past resolutions.
          </p>
        </div>

        <button
          onClick={() => openModal('newComplaint')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Report New Issue</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Active Issues</p>
            <h4 className="text-2xl font-black text-rose-600">{openComplaints.length}</h4>
            <span className="text-[10px] text-slate-500">Under resolution</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Resolved Complaints</p>
            <h4 className="text-2xl font-black text-emerald-600">{resolvedComplaints.length}</h4>
            <span className="text-[10px] text-emerald-600 font-bold">Successfully fixed</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">My Assigned Space</p>
            <h4 className="text-xl font-black text-slate-800">Room {currentStudent.room}</h4>
            <span className="text-[10px] text-slate-400">Bed: {currentStudent.bedNo}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Wrench className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Emergency Repair Line</p>
            <h4 className="text-base font-black text-slate-800">+880 1711-234567</h4>
            <span className="text-[10px] text-slate-400">24/7 Duty Electrician</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Phone className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter Tabs & Ticket List */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Ticket History & Repair Status</h4>
            <p className="text-xs text-slate-400">Track real-time maintenance progress for Room {currentStudent.room}</p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All ({myComplaints.length})
            </button>
            <button
              onClick={() => setActiveTab('open')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'open'
                  ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              In Progress ({openComplaints.length})
            </button>
            <button
              onClick={() => setActiveTab('resolved')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'resolved'
                  ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Resolved ({resolvedComplaints.length})
            </button>
          </div>
        </div>

        {/* Complaints Cards */}
        <div className="space-y-4">
          {displayedComplaints.length > 0 ? (
            displayedComplaints.map((c) => {
              const isResolved = c.status === 'Resolved';
              const isInProgress = c.status === 'In Progress';

              return (
                <div
                  key={c.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-blue-200 transition-all space-y-4 bg-white shadow-2xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-100">{getCategoryIcon(c.category)}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-500">#{c.id}</span>
                          <span className="font-black text-sm text-slate-800">{c.subject}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          Room {c.room} • Category: {c.category} • Filed on {c.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityBadge(c.priority)}`}>
                        {c.priority} Priority
                      </span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isResolved
                            ? 'bg-emerald-100 text-emerald-800'
                            : isInProgress
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                  </div>

                  {c.description && (
                    <p className="text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                      {c.description}
                    </p>
                  )}

                  {/* 4-Step Progress Tracker */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                      {/* Step 1 */}
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-1 shadow-2xs">
                          ✓
                        </div>
                        <span className="font-bold text-slate-700">Logged</span>
                        <span className="text-slate-400">{c.date}</span>
                      </div>

                      {/* Step 2 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 shadow-2xs ${
                            isInProgress || isResolved
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isInProgress || isResolved ? '✓' : '2'}
                        </div>
                        <span className="font-bold text-slate-700">Warden Review</span>
                        <span className="text-slate-400">
                          {isInProgress || isResolved ? 'Approved' : 'Pending'}
                        </span>
                      </div>

                      {/* Step 3 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 shadow-2xs ${
                            isInProgress || isResolved
                              ? 'bg-blue-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isResolved ? '✓' : '3'}
                        </div>
                        <span className="font-bold text-slate-700">Dispatched</span>
                        <span className="text-slate-400">
                          {isInProgress ? 'Staff on site' : isResolved ? 'Complete' : 'Queued'}
                        </span>
                      </div>

                      {/* Step 4 */}
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold mb-1 shadow-2xs ${
                            isResolved
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {isResolved ? '✓' : '4'}
                        </div>
                        <span className="font-bold text-slate-700">Resolved</span>
                        <span className="text-slate-400">
                          {isResolved ? 'Verified' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {!isResolved && (
                    <div className="flex items-center justify-end pt-1">
                      <button
                        onClick={() => handlePingWarden(c.id, c.subject)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                      >
                        <Send className="w-3 h-3 text-blue-600" />
                        <span>Ping Warden for Update</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h5 className="font-bold text-slate-700 text-sm">No Active Complaints in Room {currentStudent.room}</h5>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Everything in your room is in working order! If anything breaks, click below to lodge a repair ticket.
              </p>
              <button
                onClick={() => openModal('newComplaint')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 cursor-pointer shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Report New Issue</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Helpful Guidelines Card */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 flex items-start gap-3">
        <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold">Maintenance Service Guidelines</p>
          <p className="text-blue-800/80 leading-relaxed">
            Routine electrical and plumbing repairs are inspected daily between 10:00 AM and 5:00 PM. Please ensure someone is present in room {currentStudent.room} or permission is granted to duty supervisors. For life-threatening emergencies, call the Hostel Warden office immediately.
          </p>
        </div>
      </div>
    </div>
  );
};
