import React from 'react';
import { CreditCard, CheckCircle2, FileText, Plus, ShieldCheck } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { Payment } from '../../types';

export const StudentPaymentsView: React.FC = () => {
  const { currentStudent, payments, openModal } = useHostel();

  const myPayments = payments.filter((p) => p.studentId === currentStudent.id);
  const totalPaid = myPayments.reduce((sum, p) => (p.status === 'Paid' ? sum + p.amount : sum), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Student Fee Account
            </span>
            <span className="text-xs text-slate-300">• Room {currentStudent.room}</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">My Hostel Dues & Payment Invoices</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            View monthly seat rent and dining mess invoices, verify bKash/Nagad digital receipts, and download official payment certificates.
          </p>
        </div>

        <button
          onClick={() => openModal('makePayment')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-white shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Pay Next Month Fee</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Current Status</p>
            <h4 className="text-2xl font-black text-emerald-600">All Cleared</h4>
            <span className="text-[10px] text-slate-500">September 2026 Paid in full</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Total Paid This Session</p>
            <h4 className="text-2xl font-black text-slate-800">৳ {totalPaid.toLocaleString()}</h4>
            <span className="text-[10px] text-slate-400">{myPayments.length} monthly billing receipts</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Next Upcoming Due</p>
            <h4 className="text-2xl font-black text-blue-600">10 Oct 2026</h4>
            <span className="text-[10px] text-slate-400">Estimated ৳ 2,500</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Personal Payment History Table */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Official Invoices & Receipts</h4>
            <p className="text-xs text-slate-400">Download or print digital tax receipts for hostel accommodation</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">Student ID: {currentStudent.id}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                <th className="pb-2.5">Billing Month</th>
                <th className="pb-2.5">Room & Bed</th>
                <th className="pb-2.5">Amount Paid</th>
                <th className="pb-2.5">Payment Method</th>
                <th className="pb-2.5">Transaction ID</th>
                <th className="pb-2.5">Paid Date</th>
                <th className="pb-2.5 text-right">Invoice Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {myPayments.map((pay: Payment) => (
                <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 font-bold text-slate-800">{pay.month}</td>
                  <td className="py-3 font-medium text-slate-600">{currentStudent.room} ({currentStudent.bedNo})</td>
                  <td className="py-3 font-bold text-slate-900">৳ {pay.amount.toLocaleString()}</td>
                  <td className="py-3">
                    <span className="font-semibold text-slate-700">{pay.paymentMethod || 'bKash'}</span>
                  </td>
                  <td className="py-3 font-mono text-[11px] text-slate-500">{pay.transactionId || 'TRX98273641'}</td>
                  <td className="py-3 text-slate-500">{pay.paidDate || '05 Sep 2026'}</td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => openModal('invoice', pay)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px] transition-colors cursor-pointer border border-rose-200"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Print PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
