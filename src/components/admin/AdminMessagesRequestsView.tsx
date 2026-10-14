import React, { useState } from 'react';
import { useHostel } from '../../context/HostelContext';
import {
  MessageSquare,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Calendar
} from 'lucide-react';

export const AdminMessagesRequestsView: React.FC = () => {
  const {
    messages,
    leaveRequests,
    updateMessageStatus,
    updateLeaveRequestStatus
  } = useHostel();

  const [activeTab, setActiveTab] = useState<'messages' | 'leaves'>('messages');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

  const unreadMessagesCount = messages.filter(m => m.status === 'Unread').length;
  const pendingLeavesCount = leaveRequests.filter(l => l.status === 'Pending').length;

  return (
    <div className="bg-white dark:bg-[#0c1524] rounded-2xl border border-slate-200/90 dark:border-[#162338] shadow-xs p-5 space-y-4">
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
            <span>Student Inquiries & Leave Requests</span>
            {(unreadMessagesCount > 0 || pendingLeavesCount > 0) && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white animate-pulse">
                {unreadMessagesCount + pendingLeavesCount} New
              </span>
            )}
          </h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Incoming communication, gate passes, and helpdesk tickets from hostel residents
          </p>
        </div>

        {/* Tab Toggle Pill */}
        <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Messages</span>
            {unreadMessagesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-rose-500 text-white">
                {unreadMessagesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('leaves')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'leaves'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Leave Requests</span>
            {pendingLeavesCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[9px] bg-amber-500 text-white">
                {pendingLeavesCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'messages' ? (
        <div className="space-y-3">
          {messages.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-1">
              <Mail className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-xs font-semibold">No student messages yet</p>
              <p className="text-[11px]">Messages sent from the Contact or Helpdesk modal will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {messages.map((msg) => {
                const isExpanded = selectedMessage === msg.id;
                return (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-xl border transition-all text-xs space-y-2.5 ${
                      msg.status === 'Unread'
                        ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/60 shadow-xs'
                        : 'bg-white dark:bg-[#0a1220] border-slate-200/80 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                          {msg.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white leading-tight">
                            {msg.studentName}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                            ID: {msg.studentId} • Room {msg.room}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            msg.status === 'Unread'
                              ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                              : msg.status === 'Replied'
                              ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="inline-block text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-sm bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 mr-1.5">
                        {msg.category}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {msg.subject}
                      </span>
                    </div>

                    <p className={`text-[11px] text-slate-600 dark:text-slate-300 ${isExpanded ? '' : 'line-clamp-2'}`}>
                      {msg.message}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {msg.date} at {msg.time}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedMessage(isExpanded ? null : msg.id)}
                          className="text-blue-600 dark:text-blue-400 font-bold hover:underline cursor-pointer"
                        >
                          {isExpanded ? 'Collapse' : 'Read Full'}
                        </button>
                        {msg.status === 'Unread' ? (
                          <button
                            onClick={() => updateMessageStatus(msg.id, 'Read')}
                            className="px-2 py-1 rounded-md bg-blue-600 hover:bg-blue-500 text-white font-bold cursor-pointer transition-colors"
                          >
                            Mark Read
                          </button>
                        ) : (
                          <button
                            onClick={() => updateMessageStatus(msg.id, 'Replied')}
                            className="px-2 py-1 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold cursor-pointer transition-colors"
                          >
                            Mark Replied
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {leaveRequests.length === 0 ? (
            <div className="py-8 text-center text-slate-400 space-y-1">
              <Calendar className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-600" />
              <p className="text-xs font-semibold">No leave applications submitted</p>
              <p className="text-[11px]">When students apply for gate pass or vacation, they will show here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {leaveRequests.map((leave) => (
                <div
                  key={leave.id}
                  className={`p-3.5 rounded-xl border transition-all text-xs space-y-2.5 ${
                    leave.status === 'Pending'
                      ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/60 shadow-xs'
                      : leave.status === 'Approved'
                      ? 'bg-white dark:bg-[#0a1220] border-emerald-200/80 dark:border-emerald-950/60'
                      : 'bg-white dark:bg-[#0a1220] border-rose-200/80 dark:border-rose-950/60 opacity-80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-amber-600/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-xs shrink-0">
                        {leave.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white leading-tight">
                          {leave.studentName}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                          ID: {leave.studentId} • Room {leave.room}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        leave.status === 'Pending'
                          ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                          : leave.status === 'Approved'
                          ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300'
                          : 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                      Reason: <span className="font-normal text-slate-600 dark:text-slate-400">{leave.reason}</span>
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400">
                      <span><strong>Out:</strong> {leave.departureDate}</span>
                      <span>•</span>
                      <span><strong>Back:</strong> {leave.returnDate}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px]">
                    <span className="text-slate-400">Applied {leave.appliedDate}</span>

                    {leave.status === 'Pending' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateLeaveRequestStatus(leave.id, 'Approved')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-2xs transition-colors cursor-pointer"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Approve</span>
                        </button>
                        <button
                          onClick={() => updateLeaveRequestStatus(leave.id, 'Rejected')}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold shadow-2xs transition-colors cursor-pointer"
                        >
                          <XCircle className="w-3 h-3" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <span className="font-semibold text-slate-500 dark:text-slate-400">
                        {leave.status === 'Approved' ? 'Gate Pass Issued' : 'Request Rejected'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
