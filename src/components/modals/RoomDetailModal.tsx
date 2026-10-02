import React from 'react';
import { Modal } from '../common/Modal';
import { useHostel } from '../../context/HostelContext';
import { BedDouble, User, CheckCircle2, AlertCircle } from 'lucide-react';
import type { Room } from '../../types';

export const RoomDetailModal: React.FC = () => {
  const { activeModal, modalData, closeModal, openModal, role } = useHostel();

  const room: Room | null = modalData;

  if (activeModal !== 'roomDetail' || !room) return null;

  return (
    <Modal
      isOpen={activeModal === 'roomDetail'}
      onClose={closeModal}
      title={`Room ${room.roomNumber} Details`}
      subtitle={`${room.block} • ${room.floor} • ${room.type}`}
    >
      <div className="space-y-4 text-xs">
        {/* Status card */}
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <BedDouble className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-slate-800 text-sm">{room.roomNumber}</p>
              <p className="text-slate-500 text-[11px]">
                Capacity: {room.capacity} beds • Occupied: {room.occupiedCount}
              </p>
            </div>
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-bold ${
              room.occupiedCount >= room.capacity
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            {room.occupiedCount >= room.capacity ? 'Fully Occupied' : `${room.capacity - room.occupiedCount} Bed(s) Available`}
          </span>
        </div>

        {/* Beds and Occupants */}
        <div>
          <h4 className="font-bold text-slate-800 mb-2">Beds & Allocations</h4>
          <div className="space-y-2">
            {room.beds && room.beds.length > 0 ? (
              room.beds.map((bed, idx) => (
                <div
                  key={bed.id || idx}
                  className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        bed.status === 'occupied'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800">{bed.bedNumber}</p>
                      <p className="text-[11px] text-slate-500">
                        {bed.studentName ? `Student: ${bed.studentName}` : 'Vacant Bed'}
                      </p>
                    </div>
                  </div>

                  <div>
                    {bed.status === 'occupied' ? (
                      <span className="flex items-center gap-1 font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        Occupied
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full text-[10px]">
                        <AlertCircle className="w-3 h-3" />
                        Available
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-slate-400 bg-slate-50 rounded-xl">
                3 Standard Bed Units (Available for allocation)
              </div>
            )}
          </div>
        </div>

        {/* Quick action for admin */}
        {role === 'admin' && room.occupiedCount < room.capacity && (
          <div className="pt-2">
            <button
              onClick={() => {
                closeModal();
                openModal('assignRoom', { room: room.roomNumber });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold transition-colors"
            >
              Assign Student to {room.roomNumber}
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
