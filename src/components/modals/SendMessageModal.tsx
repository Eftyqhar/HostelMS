import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useHostel } from '../../context/HostelContext';
import { Send, PhoneCall, HelpCircle } from 'lucide-react';

export const SendMessageModal: React.FC = () => {
  const { activeModal, closeModal, currentStudent, showToast } = useHostel();

  const [recipient, setRecipient] = useState('Chief Warden Office (Prof. Dr. M. Rahman)');
  const [category, setCategory] = useState('General Inquiry');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [requestCallback, setRequestCallback] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      alert('Please fill out both the subject and message content.');
      return;
    }

    const ticketNumber = `MSG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    showToast(`Message delivered to ${recipient.split('(')[0].trim()}! Ticket reference #${ticketNumber} created.`);

    // Reset form
    setSubject('');
    setMessage('');
    setRequestCallback(false);
    closeModal();
  };

  return (
    <Modal
      isOpen={activeModal === 'sendMessage'}
      onClose={closeModal}
      title="Send Message to Hostel Office"
      subtitle="Direct inquiry or administrative communication with Warden & Helpdesk"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Recipient Department / Office */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Send Message To</label>
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
          >
            <option>Chief Warden Office (Prof. Dr. M. Rahman)</option>
            <option>Administrative Office & Accounts Helpdesk</option>
            <option>Dining & Mess Kitchen Supervisor (Chef M. Karim)</option>
            <option>Hostel Security & Main Gate Control</option>
            <option>Block B Supervisor (Mr. Harun Ur Rashid)</option>
          </select>
        </div>

        {/* Sender details (Readonly) & Category */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Inquiry Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
            >
              <option>General Inquiry</option>
              <option>Fee Payment & Accounts</option>
              <option>Parcel / Courier Collection</option>
              <option>Late Night Gate Permission</option>
              <option>Lost & Found Property</option>
              <option>Roommate / Accommodation Query</option>
              <option>Emergency Assistance</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">From Student</label>
            <input
              disabled
              type="text"
              value={`${currentStudent.name} (Room ${currentStudent.room})`}
              className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-600 rounded-lg font-medium cursor-not-allowed"
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Subject / Topic *</label>
          <input
            required
            type="text"
            placeholder="e.g. Parcel delivery at main reception gate / Fee receipt verification"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        {/* Message body */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">Message Content *</label>
          <textarea
            rows={4}
            required
            placeholder="Write your inquiry or message clearly. Provide any relevant tracking number, date, or contact details..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
          />
        </div>

        {/* Options */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={requestCallback}
              onChange={(e) => setRequestCallback(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
            />
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-blue-600" />
              Request phone call from duty officer ({currentStudent.phone})
            </span>
          </label>
          <span className="text-[10px] text-slate-400 font-medium">Within office hours</span>
        </div>

        {/* Notice */}
        <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-blue-900 text-[11px] flex items-start gap-2">
          <HelpCircle className="w-4 h-4 shrink-0 text-blue-600 mt-0.5" />
          <span>
            For maintenance requests like broken lights or plumbing leaks, please use <strong>"Submit Complaint"</strong> so maintenance technicians can be dispatched.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Message</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
