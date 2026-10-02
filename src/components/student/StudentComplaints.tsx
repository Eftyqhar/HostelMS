import React from 'react';
import { Plus } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { Complaint } from '../../types';

export const StudentComplaints: React.FC = () => {
  const { complaints, currentStudent, openModal } = useHostel();

  const myComplaints = complaints.filter((c) => c.studentId === currentStudent.id);

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      case 'In Progress':
        return 'bg-blue-50 text-blue-600 border border-blue-200';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">My Complaints</h3>
        <button
          onClick={() => openModal('newComplaint')}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Complaint</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
              <th className="pb-2.5 font-medium">#</th>
              <th className="pb-2.5 font-medium">Category</th>
              <th className="pb-2.5 font-medium">Subject</th>
              <th className="pb-2.5 font-medium">Status</th>
              <th className="pb-2.5 font-medium text-right">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {myComplaints.slice(0, 3).map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 font-semibold text-slate-700">{c.id}</td>
                <td className="py-2.5 text-slate-600 font-medium">{c.category}</td>
                <td className="py-2.5 font-bold text-slate-800">{c.subject}</td>
                <td className="py-2.5">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(
                      c.status
                    )}`}
                  >
                    {c.status === 'Pending' ? 'Open' : c.status}
                  </span>
                </td>
                <td className="py-2.5 text-right text-slate-400 font-medium">{c.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
