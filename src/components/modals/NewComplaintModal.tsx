import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHostel } from '../../context/HostelContext';
import type { Complaint } from '../../types';

export const NewComplaintModal: React.FC = () => {
  const { activeModal, modalData, closeModal, addComplaint, currentStudent, role } = useHostel();

  const [category, setCategory] = useState<Complaint['category']>(
    modalData?.category || 'Electrical'
  );
  const [subject, setSubject] = useState(modalData?.subject || '');
  const [priority, setPriority] = useState<Complaint['priority']>('Medium');
  const [room, setRoom] = useState(currentStudent.room);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    addComplaint({
      category,
      subject,
      priority,
      room,
      description
    });
  };

  return (
    <Modal
      isOpen={activeModal === 'newComplaint'}
      onClose={closeModal}
      title="Submit New Complaint"
      subtitle="Report a maintenance or facility issue to hostel administration"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option>Electrical</option>
              <option>Water</option>
              <option>Furniture</option>
              <option>Internet</option>
              <option>Cleaning</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High (Urgent)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Room No.</label>
            <input
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Reported By</label>
            <input
              disabled
              type="text"
              value={role === 'admin' ? 'Admin Portal' : `${currentStudent.name} (${currentStudent.id})`}
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg font-medium cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Subject *</label>
          <input
            required
            type="text"
            placeholder="e.g. Fan not working / Low water pressure"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block font-bold text-slate-700 mb-1">Detailed Description</label>
          <textarea
            rows={3}
            placeholder="Describe the issue in detail so maintenance team can prepare..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
          />
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
            Submit Complaint
          </button>
        </div>
      </form>
    </Modal>
  );
};
