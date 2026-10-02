import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentRoomCard: React.FC = () => {
  const { currentStudent, rooms, openModal } = useHostel();

  const myRoom = rooms.find(r => r.roomNumber === currentStudent.room) || rooms[0];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-slate-800">Room Details</h3>
        <button
          onClick={() => openModal('roomDetail', myRoom)}
          className="p-1 rounded-md text-slate-400 hover:text-blue-600 transition-colors"
          title="View Room Map & Occupants"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Room Image */}
        <div className="w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
          <img
            src={
              myRoom.imageUrl ||
              'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=500&auto=format&fit=crop&q=80'
            }
            alt="Room view"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Room Attributes */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-xs w-full text-left">
          <div>
            <span className="text-slate-400 font-medium block">Room No.</span>
            <span className="font-bold text-slate-800">{currentStudent.room}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Block</span>
            <span className="font-bold text-slate-800">{currentStudent.block}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Floor</span>
            <span className="font-bold text-slate-800">2nd Floor</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Bed No.</span>
            <span className="font-bold text-slate-800">{currentStudent.bedNo}</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Room Type</span>
            <span className="font-bold text-slate-800">3 Seater</span>
          </div>
          <div>
            <span className="text-slate-400 font-medium block">Check-in Date</span>
            <span className="font-bold text-slate-800">{currentStudent.checkInDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
