import React from 'react';
import { Plus } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentVisitors: React.FC = () => {
  const { visitors, currentStudent, openModal } = useHostel();

  const myVisitorRequests = visitors.filter((v) => v.studentId === currentStudent.id);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Visitor Requests</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => openModal('visitorRequest')}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Request</span>
          </button>
          <button
            onClick={() => openModal('visitorRequest')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
              <th className="pb-2.5 font-medium">Visitor Name</th>
              <th className="pb-2.5 font-medium">Relation</th>
              <th className="pb-2.5 font-medium">Date</th>
              <th className="pb-2.5 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {myVisitorRequests.slice(0, 3).map((v) => (
              <tr key={v.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 font-bold text-slate-800">{v.visitorName}</td>
                <td className="py-2.5 text-slate-600 font-medium">{v.relation}</td>
                <td className="py-2.5 text-slate-500 font-medium">{v.date}</td>
                <td className="py-2.5 text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      v.status === 'Approved' || v.status === 'Inside'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}
                  >
                    {v.status === 'Inside' ? 'Approved' : v.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
