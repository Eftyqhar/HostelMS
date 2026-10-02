import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHostel } from '../../context/HostelContext';

export const VisitorModal: React.FC = () => {
  const { activeModal, closeModal, addVisitorRequest, currentStudent, role } = useHostel();

  const [visitorName, setVisitorName] = useState('');
  const [relation, setRelation] = useState('Father');
  const [date, setDate] = useState('Today');
  const [timeIn, setTimeIn] = useState('02:30 PM');
  const [contact, setContact] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim()) return;

    addVisitorRequest({
      visitorName,
      relation,
      date,
      timeIn,
      contact
    });
  };

  return (
    <Modal
      isOpen={activeModal === 'visitorRequest'}
      onClose={closeModal}
      title={role === 'admin' ? 'Record Hostel Visitor Entry' : 'Request Guest Visitor Pass'}
      subtitle="Register visitor details for campus gate security pass"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Visitor Full Name *</label>
          <input
            required
            type="text"
            placeholder="e.g. Abdul Karim"
            value={visitorName}
            onChange={(e) => setVisitorName(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Relationship</label>
            <select
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option>Father</option>
              <option>Mother</option>
              <option>Brother</option>
              <option>Sister</option>
              <option>Guardian</option>
              <option>Friend</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
            <input
              type="text"
              placeholder="01XXXXXXXXX"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Visit Date</label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Expected Time</label>
            <input
              type="text"
              value={timeIn}
              onChange={(e) => setTimeIn(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-[11px]">
          Visiting student: <span className="font-bold text-slate-800">{currentStudent.name}</span> (Room: {currentStudent.room})
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
            Issue Gate Pass
          </button>
        </div>
      </form>
    </Modal>
  );
};
