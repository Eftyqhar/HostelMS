import React from 'react';
import { FileText } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentPayments: React.FC = () => {
  const { payments, currentStudent, openModal } = useHostel();

  const studentPayments = payments.filter((p) => p.studentId === currentStudent.id);

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Payment History</h3>
        <button
          onClick={() => openModal('makePayment')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
              <th className="pb-2.5 font-medium">Month</th>
              <th className="pb-2.5 font-medium">Amount</th>
              <th className="pb-2.5 font-medium">Status</th>
              <th className="pb-2.5 font-medium">Paid Date</th>
              <th className="pb-2.5 font-medium text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {studentPayments.slice(0, 4).map((pay) => (
              <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-2.5 font-bold text-slate-800">{pay.month}</td>
                <td className="py-2.5 font-semibold text-slate-700">৳ {pay.amount.toLocaleString()}</td>
                <td className="py-2.5">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
                    {pay.status}
                  </span>
                </td>
                <td className="py-2.5 text-slate-500 font-medium">{pay.paidDate || '-'}</td>
                <td className="py-2.5 text-right">
                  <button
                    onClick={() => openModal('invoice', pay)}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>[PDF]</span>
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
