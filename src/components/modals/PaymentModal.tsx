import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHostel } from '../../context/HostelContext';

export const PaymentModal: React.FC = () => {
  const { activeModal, modalData, closeModal, recordPayment, currentStudent, role, students } = useHostel();

  const isCollecting = activeModal === 'collectPayment';
  const isPaying = activeModal === 'makePayment';

  const [studentId, setStudentId] = useState(
    modalData?.id || (role === 'student' ? currentStudent.id : '1021')
  );
  const [month, setMonth] = useState('October 2026');
  const [amount, setAmount] = useState('2500');
  const [paymentMethod, setPaymentMethod] = useState<'bKash' | 'Nagad' | 'Bank Transfer' | 'Cash' | 'Card'>('bKash');

  React.useEffect(() => {
    if (modalData?.id) {
      setStudentId(modalData.id);
    }
  }, [modalData]);

  const targetStudent = students.find(s => s.id === studentId) || currentStudent;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordPayment({
      studentId: targetStudent.id,
      studentName: targetStudent.name,
      room: targetStudent.room,
      month,
      amount: Number(amount),
      paymentMethod
    });
  };

  return (
    <Modal
      isOpen={isCollecting || isPaying}
      onClose={closeModal}
      title={isCollecting ? 'Collect Hostel Fee' : 'Make Hostel Fee Payment'}
      subtitle={
        isCollecting
          ? 'Record fee collection from student'
          : 'Pay monthly hostel and mess charges securely'
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {role === 'admin' ? (
          <div>
            <label className="block font-bold text-slate-700 mb-1">Student</label>
            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (ID: {s.id} - Room: {s.room})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <p className="font-bold text-slate-800">{targetStudent.name}</p>
            <p className="text-slate-500 text-[11px]">
              ID: {targetStudent.id} | Room: {targetStudent.room} ({targetStudent.block})
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Billing Month</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option>October 2026</option>
              <option>November 2026</option>
              <option>September 2026</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Amount (৳)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1.5">Payment Method</label>
          <div className="grid grid-cols-3 gap-2">
            {(['bKash', 'Nagad', 'Card', 'Bank Transfer', 'Cash'] as const).map((method) => (
              <button
                type="button"
                key={method}
                onClick={() => setPaymentMethod(method as any)}
                className={`py-2 px-2.5 rounded-lg border text-center font-bold text-xs transition-all ${
                  paymentMethod === method
                    ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {method}
              </button>
            ))}
          </div>
        </div>

        <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl text-blue-900 text-[11px]">
          <span className="font-bold">Summary: </span>
          Hostel Seat Rent (৳ 1,500) + Mess Fee (৳ 1,000) = Total ৳ {Number(amount).toLocaleString()}
        </div>

        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-sm"
          >
            {isCollecting ? 'Record Payment' : 'Pay ৳ ' + Number(amount).toLocaleString()}
          </button>
        </div>
      </form>
    </Modal>
  );
};
