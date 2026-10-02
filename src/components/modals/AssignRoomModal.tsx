import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { useHostel } from '../../context/HostelContext';
import { BedDouble, User, CheckCircle2 } from 'lucide-react';

export const AssignRoomModal: React.FC = () => {
  const { activeModal, modalData, closeModal, students, rooms, assignRoom } = useHostel();

  const [studentId, setStudentId] = useState<string>('');
  const [roomNumber, setRoomNumber] = useState<string>('A-206');
  const [bedNumber, setBedNumber] = useState<string>('A-206-01');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync state whenever modal opens or modalData changes
  useEffect(() => {
    if (activeModal === 'assignRoom') {
      // Set student ID
      if (modalData?.id) {
        setStudentId(String(modalData.id));
      } else if (students.length > 0) {
        // default to first active student or 1021 if exists
        const defaultStudent = students.find((s) => s.id === '1021') || students[0];
        setStudentId(String(defaultStudent.id));
      }

      // Set target room
      let initialRoom = 'A-206';
      if (modalData?.room) {
        initialRoom = modalData.room;
      } else if (rooms.length > 0) {
        const available = rooms.find((r) => r.occupiedCount < r.capacity) || rooms[0];
        initialRoom = available.roomNumber;
      }
      setRoomNumber(initialRoom);

      // Auto pick bed
      setBedNumber(`${initialRoom}-01`);
    }
  }, [activeModal, modalData, students, rooms]);

  // When roomNumber changes, update bedNumber to first available bed
  const handleRoomChange = (newRoom: string) => {
    setRoomNumber(newRoom);
    const roomObj = rooms.find((r) => r.roomNumber === newRoom);
    if (roomObj && roomObj.beds && roomObj.beds.length > 0) {
      const vacantBed = roomObj.beds.find((b) => b.status === 'available');
      if (vacantBed) {
        setBedNumber(vacantBed.bedNumber);
        return;
      }
    }
    setBedNumber(`${newRoom}-01`);
  };

  const selectedStudent = students.find((s) => String(s.id) === String(studentId)) || students[0];
  const selectedRoomObj = rooms.find((r) => r.roomNumber === roomNumber);

  // Generate bed options for the room (default 3 beds if empty)
  const capacity = selectedRoomObj?.capacity || 3;
  const bedOptions = Array.from({ length: capacity }).map((_, index) => {
    const formattedIndex = String(index + 1).padStart(2, '0');
    const bedId = `${roomNumber}-${formattedIndex}`;
    const existingBed = selectedRoomObj?.beds?.find((b) => b.bedNumber === bedId);
    return {
      bedId,
      isOccupied: existingBed?.status === 'occupied',
      occupiedBy: existingBed?.studentName
    };
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentId || !roomNumber || !bedNumber) {
      alert('Please select both a student and an allocation bed.');
      return;
    }

    setIsSubmitting(true);
    try {
      await assignRoom(studentId, roomNumber, bedNumber);
    } catch (err) {
      console.error('Room assignment error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={activeModal === 'assignRoom'}
      onClose={closeModal}
      title="Assign Room & Bed Slot"
      subtitle="Allocate student to hostel room with live vacancy verification"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Student Selector */}
        <div>
          <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-600" />
            <span>Select Student *</span>
          </label>
          <select
            required
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 font-semibold bg-white text-slate-800"
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} (ID: {s.id} — Current: {s.room || 'No Room'})
              </option>
            ))}
          </select>
        </div>

        {/* Room & Bed Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <BedDouble className="w-3.5 h-3.5 text-blue-600" />
              <span>Target Room *</span>
            </label>
            <select
              required
              value={roomNumber}
              onChange={(e) => handleRoomChange(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 font-semibold bg-white text-slate-800"
            >
              {rooms.map((r) => {
                const isFull = r.occupiedCount >= r.capacity;
                return (
                  <option key={r.id} value={r.roomNumber}>
                    {r.roomNumber} ({r.block} • {r.occupiedCount}/{r.capacity} Beds {isFull ? '— Full' : '— Available'})
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1.5">Select Bed Slot *</label>
            <select
              required
              value={bedNumber}
              onChange={(e) => setBedNumber(e.target.value)}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-xl focus:outline-hidden focus:border-blue-500 font-semibold bg-white text-slate-800"
            >
              {bedOptions.map((b) => (
                <option key={b.bedId} value={b.bedId}>
                  {b.bedId} {b.isOccupied ? `(Occupied: ${b.occupiedBy})` : '(Available)'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Selected Summary Card */}
        {selectedStudent && (
          <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-8 h-8 rounded-full object-cover border border-blue-200"
                />
                <div>
                  <p className="font-bold text-slate-800">{selectedStudent.name}</p>
                  <p className="text-[11px] text-slate-500">
                    ID: {selectedStudent.id} • {selectedStudent.department}
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {selectedStudent.status}
              </span>
            </div>

            <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between text-[11px] text-slate-600">
              <span>
                New Assignment:{' '}
                <strong className="text-slate-900">
                  {roomNumber} ({bedNumber})
                </strong>
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready to allocate
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
          <button
            type="button"
            onClick={closeModal}
            disabled={isSubmitting}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Assigning...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm Assignment</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
