import React from 'react';
import { useHostel } from '../../context/HostelContext';
import type { Complaint } from '../../types';

export const ComplaintsTable: React.FC = () => {
  const { complaints, updateComplaintStatus, openModal, searchQuery } = useHostel();

  const filteredComplaints = complaints.filter(
    (c) =>
      c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.includes(searchQuery) ||
      c.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityBadge = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-100/70 text-amber-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Pending Complaints</h3>
        <button
          onClick={() => openModal('newComplaint')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
              <th className="pb-2.5 font-medium">#</th>
              <th className="pb-2.5 font-medium">Student</th>
              <th className="pb-2.5 font-medium">Room</th>
              <th className="pb-2.5 font-medium">Category</th>
              <th className="pb-2.5 font-medium">Priority</th>
              <th className="pb-2.5 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredComplaints.slice(0, 4).map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 font-semibold text-slate-700">{c.id}</td>
                <td className="py-3 font-bold text-slate-800">{c.studentName}</td>
                <td className="py-3 font-semibold text-slate-700">{c.room}</td>
                <td className="py-3 text-slate-600 font-medium">{c.category}</td>
                <td className="py-3">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${getPriorityBadge(
                      c.priority
                    )}`}
                  >
                    {c.priority}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button
                    onClick={() => {
                      const nextStatus =
                        c.status === 'Pending'
                          ? 'In Progress'
                          : c.status === 'In Progress'
                          ? 'Resolved'
                          : 'Pending';
                      updateComplaintStatus(c.id, nextStatus);
                    }}
                    title="Click to advance status"
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer transition-all hover:scale-105 ${getStatusBadge(
                      c.status
                    )}`}
                  >
                    {c.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
