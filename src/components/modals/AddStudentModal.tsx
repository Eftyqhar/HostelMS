import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHostel } from '../../context/HostelContext';

export const AddStudentModal: React.FC = () => {
  const { activeModal, closeModal, addStudent } = useHostel();

  const [formData, setFormData] = useState({
    name: '',
    department: 'Computer Science & Technology',
    semester: '1st',
    phone: '',
    email: '',
    room: 'A-206',
    block: 'Block A',
    bedNo: 'A-206-01',
    guardianName: '',
    guardianPhone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addStudent({
      ...formData,
      status: 'Active',
      checkInDate: 'Today',
      avatar: `https://images.unsplash.com/photo-${1534528741775 + Math.floor(Math.random() * 1000)}?w=150&auto=format&fit=crop&q=80`
    });
  };

  return (
    <Modal
      isOpen={activeModal === 'addStudent'}
      onClose={closeModal}
      title="Add New Student"
      subtitle="Register a new student admission to the hostel"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
          <input
            required
            type="text"
            placeholder="e.g. Mahfuzur Rahman"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option>Computer Science & Technology</option>
              <option>EEE</option>
              <option>Civil</option>
              <option>Mechanical</option>
              <option>Architecture</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Semester</label>
            <select
              value={formData.semester}
              onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option>1st</option>
              <option>2nd</option>
              <option>3rd</option>
              <option>4th</option>
              <option>5th</option>
              <option>6th</option>
              <option>7th</option>
              <option>8th</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="017XX-XXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="student@univ.edu.bd"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Block</label>
            <select
              value={formData.block}
              onChange={(e) => setFormData({ ...formData, block: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option>Block A</option>
              <option>Block B</option>
              <option>Block C</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Room</label>
            <input
              type="text"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Bed No.</label>
            <input
              type="text"
              value={formData.bedNo}
              onChange={(e) => setFormData({ ...formData, bedNo: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            />
          </div>
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
            Save Student
          </button>
        </div>
      </form>
    </Modal>
  );
};
