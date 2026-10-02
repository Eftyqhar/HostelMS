import React from 'react';
import { Modal } from '../common/Modal';
import { useHostel } from '../../context/HostelContext';
import { Printer, CheckCircle, Building2 } from 'lucide-react';
import type { Payment } from '../../types';

export const InvoiceModal: React.FC = () => {
  const { activeModal, modalData, closeModal, currentStudent } = useHostel();

  const payment: Payment | null = modalData;

  if (activeModal !== 'invoice' || !payment) return null;

  return (
    <Modal
      isOpen={activeModal === 'invoice'}
      onClose={closeModal}
      title="Hostel Fee Receipt / Invoice"
      subtitle={`Invoice #${payment.id}`}
      maxWidth="max-w-md"
    >
      <div className="space-y-5 text-xs">
        {/* Printable receipt card */}
        <div id="printable-receipt" className="p-5 border border-slate-200 rounded-xl bg-slate-50/50 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">HostelMS</h4>
                <p className="text-[10px] text-slate-400">College Hostel Authority</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> PAID
              </span>
              <p className="text-[10px] text-slate-400 mt-1">{payment.paidDate || '30 Sep 2026'}</p>
            </div>
          </div>

          {/* Student Info */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600">
            <div>
              <p className="text-slate-400 font-medium">Student Name:</p>
              <p className="font-bold text-slate-800">{payment.studentName || currentStudent.name}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Student ID:</p>
              <p className="font-bold text-slate-800">{payment.studentId || currentStudent.id}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Allocated Room:</p>
              <p className="font-bold text-slate-800">{payment.room || currentStudent.room}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Billing Period:</p>
              <p className="font-bold text-slate-800">{payment.month}</p>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="border-t border-slate-200 pt-3 space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Room Rent & Utilities</span>
              <span className="font-semibold">৳ 1,500</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Mess & Food Charges</span>
              <span className="font-semibold">৳ 1,000</span>
            </div>
            <div className="flex justify-between text-slate-800 font-bold text-sm border-t border-slate-200 pt-2">
              <span>Total Paid</span>
              <span className="text-blue-600">৳ {payment.amount.toLocaleString()}</span>
            </div>
          </div>

          <div className="text-[10px] text-slate-400 text-center pt-2">
            Payment Method: {payment.paymentMethod || 'bKash'} • TxID: {payment.transactionId || 'TRX98273641'}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 font-bold shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
