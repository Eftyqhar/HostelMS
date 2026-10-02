import React from 'react';
import { User, ChevronDown } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { Room } from '../../types';

export const HostelRoomMap: React.FC = () => {
  const {
    rooms,
    selectedBlock,
    setSelectedBlock,
    selectedFloor,
    setSelectedFloor,
    openModal
  } = useHostel();

  // Filter rooms according to selected block and floor
  const filteredRooms = rooms.filter(
    (r) => r.block === selectedBlock && r.floor === selectedFloor
  );

  // If no rooms found for this combination (e.g. Block B or C), display fallback generator
  const displayRooms: Room[] = filteredRooms.length > 0 ? filteredRooms : [
    {
      id: `${selectedBlock.charAt(6)}-201`,
      roomNumber: `${selectedBlock.charAt(6)}-201`,
      block: selectedBlock,
      floor: selectedFloor as any,
      capacity: 3,
      occupiedCount: 3,
      type: '3 Seater',
      status: 'Occupied',
      beds: []
    },
    {
      id: `${selectedBlock.charAt(6)}-202`,
      roomNumber: `${selectedBlock.charAt(6)}-202`,
      block: selectedBlock,
      floor: selectedFloor as any,
      capacity: 3,
      occupiedCount: 2,
      type: '3 Seater',
      status: 'Occupied',
      beds: []
    },
    {
      id: `${selectedBlock.charAt(6)}-203`,
      roomNumber: `${selectedBlock.charAt(6)}-203`,
      block: selectedBlock,
      floor: selectedFloor as any,
      capacity: 3,
      occupiedCount: 1,
      type: '3 Seater',
      status: 'Occupied',
      beds: []
    },
    {
      id: `${selectedBlock.charAt(6)}-204`,
      roomNumber: `${selectedBlock.charAt(6)}-204`,
      block: selectedBlock,
      floor: selectedFloor as any,
      capacity: 3,
      occupiedCount: 0,
      type: '3 Seater',
      status: 'Available',
      beds: []
    }
  ];

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      {/* Header with tabs and floor picker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-sm font-bold text-slate-800">Hostel Map / Room Layout</h3>

        <div className="flex items-center gap-2">
          {/* Block switcher tabs */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/60 text-xs font-semibold">
            {(['Block A', 'Block B', 'Block C'] as const).map((block) => (
              <button
                key={block}
                onClick={() => setSelectedBlock(block)}
                className={`px-3 py-1 rounded-md transition-all ${
                  selectedBlock === block
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {block}
              </button>
            ))}
          </div>

          {/* Floor selector */}
          <div className="relative">
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2.5 py-1.5 pr-6 font-medium appearance-none focus:outline-hidden cursor-pointer"
            >
              <option>1st Floor</option>
              <option>2nd Floor</option>
              <option>3rd Floor</option>
              <option>4th Floor</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-2">
        {displayRooms.map((room) => {
          const isFullyAvailable = room.occupiedCount === 0;
          const isFullyOccupied = room.occupiedCount >= room.capacity;

          return (
            <div
              key={room.id}
              onClick={() => openModal('roomDetail', room)}
              className={`p-3 rounded-xl border text-center cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md ${
                isFullyAvailable
                  ? 'bg-rose-50/70 border-rose-200 hover:bg-rose-50'
                  : 'bg-emerald-50/40 border-emerald-200/80 hover:bg-emerald-50/70'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2 font-bold">
                <span className="text-slate-800">{room.roomNumber}</span>
                <span
                  className={
                    isFullyAvailable
                      ? 'text-rose-600 font-extrabold'
                      : isFullyOccupied
                      ? 'text-emerald-700 font-extrabold'
                      : 'text-emerald-600 font-bold'
                  }
                >
                  {room.occupiedCount}/{room.capacity}
                </span>
              </div>

              {/* Bed user icons */}
              <div className="flex items-center justify-center gap-1.5 py-1">
                {Array.from({ length: room.capacity }).map((_, index) => {
                  const isOccupied = index < room.occupiedCount;
                  return (
                    <div
                      key={index}
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                        isFullyAvailable
                          ? 'bg-rose-100 text-rose-400'
                          : isOccupied
                          ? 'bg-emerald-500 text-white shadow-2xs'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                      title={
                        isOccupied
                          ? `Bed ${index + 1}: Occupied`
                          : isFullyAvailable
                          ? `Bed ${index + 1}: Available`
                          : `Bed ${index + 1}: Vacant`
                      }
                    >
                      <User className="w-3.5 h-3.5" />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-3 border-t border-slate-100 text-xs font-medium">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span className="text-slate-600">Occupied</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span className="text-slate-600">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span className="text-slate-600">Reserved</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
          <span className="text-slate-600">Maintenance</span>
        </div>
      </div>
    </div>
  );
};
