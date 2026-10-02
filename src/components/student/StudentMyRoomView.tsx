import React, { useState } from 'react';
import {
  Users,
  Wifi,
  Zap,
  CheckCircle2,
  Wrench,
  ArrowRightLeft,
  Shield,
  Phone,
  Mail,
  Home,
  Check,
  AlertCircle
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentMyRoomView: React.FC = () => {
  const { currentStudent, rooms, students, openModal, showToast } = useHostel();

  const [showSwapModal, setShowSwapModal] = useState(false);
  const [targetBlock, setTargetBlock] = useState('Block B');
  const [preferredFloor, setPreferredFloor] = useState('2nd Floor');
  const [swapReason, setSwapReason] = useState('');

  // Find student's actual room
  const myRoom = rooms.find((r) => r.roomNumber === currentStudent.room) || rooms[0];

  // Find roommates in the same room
  const roommates = students.filter(
    (s) => s.room === currentStudent.room && s.id !== currentStudent.id
  );

  const handleSwapSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!swapReason.trim()) {
      alert('Please state a valid reason for room change');
      return;
    }
    setShowSwapModal(false);
    setSwapReason('');
    showToast('Room change application submitted to the Warden Office for review!');
  };

  const amenities = [
    { name: 'High-speed Wi-Fi', desc: 'SSID: Hostel-B-5G (45 Mbps)', icon: Wifi },
    { name: '24/7 Power Backup', desc: 'IPS & Generator supported', icon: Zap },
    { name: 'Attached Washroom', desc: 'Hot water geyser enabled', icon: Home },
    { name: 'Security & CCTV', desc: 'Corridor surveillance active', icon: Shield },
  ];

  const inventoryItems = [
    { item: 'Steel Bunk Frame & Board', qty: '1 Unit', status: 'Good Condition' },
    { item: 'High-Density Foam Mattress', qty: '1 Unit', status: 'Clean / Handed Over' },
    { item: 'Study Desk & Ergonomic Chair', qty: '1 Set', status: 'Inspected' },
    { item: 'Steel Wardrobe with Key Lock', qty: '1 Unit', status: 'Key ID: W-203-B' },
    { item: 'Ceiling Fan & LED Tube Lights', qty: '2 Fans, 4 LEDs', status: 'Working' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Personal Accommodation
            </span>
            <span className="text-xs text-slate-300">• {currentStudent.block}</span>
            <span className="text-xs text-slate-300">• 2nd Floor</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Room {currentStudent.room} Details & Roommates</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            View your allocated bed space, roommate contact directory, in-room amenities, and request maintenance or room transfers.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => openModal('newComplaint')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-600 font-bold text-xs text-white shadow-xs transition-colors cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Room Maintenance</span>
          </button>
          <button
            onClick={() => setShowSwapModal(true)}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition-colors cursor-pointer"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Request Room Change</span>
          </button>
        </div>
      </div>

      {/* Main Room Card & Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Room Visual, Key Specs & Amenities */}
        <div className="lg:col-span-2 space-y-6">
          {/* Room Visual & Primary Stats */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-100">
              <img
                src={
                  myRoom.imageUrl ||
                  'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=1000&auto=format&fit=crop&q=80'
                }
                alt="Room view"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-500 text-white">
                      Active Resident
                    </span>
                    <span className="text-xs text-slate-200">Allocated since {currentStudent.checkInDate}</span>
                  </div>
                  <h2 className="text-2xl font-black mt-1">Room {currentStudent.room}</h2>
                  <p className="text-xs text-slate-300">
                    {currentStudent.block} • 2nd Floor, South Corridor • {myRoom.type || '3 Seater'}
                  </p>
                </div>
              </div>
            </div>

            {/* Room Attribute Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 border-b border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 font-medium block">Allocated Bed</span>
                <span className="font-extrabold text-blue-600 text-sm">{currentStudent.bedNo}</span>
                <span className="text-[10px] text-slate-500 block">Window Side</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Room Type</span>
                <span className="font-extrabold text-slate-800 text-sm">{myRoom.type || '3 Seater'}</span>
                <span className="text-[10px] text-slate-500 block">Shared occupancy</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Monthly Rent</span>
                <span className="font-extrabold text-slate-800 text-sm">৳ 2,500</span>
                <span className="text-[10px] text-slate-500 block">Includes utilities</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium block">Cleaning Day</span>
                <span className="font-extrabold text-emerald-600 text-sm">Every Tuesday</span>
                <span className="text-[10px] text-slate-500 block">Hostel staff service</span>
              </div>
            </div>

            {/* Room Amenities Grid */}
            <div className="p-5 space-y-3">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Included Room Facilities
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {amenities.map((amenity, idx) => {
                  const Icon = amenity.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-800">{amenity.name}</p>
                        <p className="text-[11px] text-slate-500">{amenity.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Room Inventory & Furniture Condition */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="font-bold text-slate-800 text-sm">In-Room Inventory & Furniture Handover</h4>
                <p className="text-xs text-slate-400">Hostel assets assigned to Room {currentStudent.room}</p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Check className="w-3 h-3" /> All Verified
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {inventoryItems.map((inv, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <p className="font-bold text-slate-800">{inv.item}</p>
                      <p className="text-[10px] text-slate-400">Allocated Quantity: {inv.qty}</p>
                    </div>
                  </div>
                  <span className="font-medium text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-md text-[11px]">
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Roommates Directory & Key Rules */}
        <div className="space-y-6">
          {/* Roommates Directory */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-blue-600" />
                <h4 className="font-bold text-slate-800 text-sm">Roommates ({roommates.length + 1}/3)</h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400">Room {currentStudent.room}</span>
            </div>

            {/* Current Student (You) */}
            <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50 space-y-2">
              <div className="flex items-center gap-3">
                <img
                  src={currentStudent.avatar}
                  alt={currentStudent.name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-500"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-bold text-xs text-slate-900 truncate">{currentStudent.name}</p>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-black bg-blue-600 text-white">
                      YOU
                    </span>
                  </div>
                  <p className="text-[11px] text-blue-700 font-medium">Bed: {currentStudent.bedNo}</p>
                </div>
              </div>
              <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-blue-100">
                <p>Dept: {currentStudent.department} ({currentStudent.semester})</p>
                <p className="flex items-center gap-1 text-slate-500">
                  <Phone className="w-3 h-3 text-slate-400" /> {currentStudent.phone}
                </p>
              </div>
            </div>

            {/* Roommate 1: Tanvir Hasan (Or actual roommates if present) */}
            {roommates.length > 0 ? (
              roommates.map((rm) => (
                <div key={rm.id} className="p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={rm.avatar}
                      alt={rm.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-slate-900 truncate">{rm.name}</p>
                      <p className="text-[11px] text-slate-500">Bed: {rm.bedNo}</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
                    <p>Dept: {rm.department} ({rm.semester})</p>
                    <p className="flex items-center gap-1 text-slate-500">
                      <Phone className="w-3 h-3 text-slate-400" /> {rm.phone}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <>
                {/* Seeded realistic roommates if not separately in array */}
                <div className="p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
                      alt="Tanvir Hasan"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Tanvir Hasan</p>
                      <p className="text-[11px] text-slate-500">Bed: B-203-01</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
                    <p>Dept: Electrical Engineering (5th Sem)</p>
                    <p className="flex items-center gap-1 text-slate-500">
                      <Phone className="w-3 h-3 text-slate-400" /> +880 1712-349811
                    </p>
                    <p className="flex items-center gap-1 text-slate-500">
                      <Mail className="w-3 h-3 text-slate-400" /> tanvir.h@hostelms.edu
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
                      alt="Sadman Sakib"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-slate-900 truncate">Sadman Sakib</p>
                      <p className="text-[11px] text-slate-500">Bed: B-203-03</p>
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-600 space-y-0.5 pt-1 border-t border-slate-100">
                    <p>Dept: BBA (3rd Sem)</p>
                    <p className="flex items-center gap-1 text-slate-500">
                      <Phone className="w-3 h-3 text-slate-400" /> +880 1823-774410
                    </p>
                    <p className="flex items-center gap-1 text-slate-500">
                      <Mail className="w-3 h-3 text-slate-400" /> sadman.s@hostelms.edu
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Room Guidelines */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 text-xs">
            <h4 className="font-bold text-slate-800 text-sm">Room Guidelines</h4>
            <ul className="space-y-2 text-slate-600 list-disc pl-4 leading-relaxed">
              <li>Turn off lights and fans before leaving the room.</li>
              <li>Maintain quiet hours between 11:00 PM and 6:00 AM.</li>
              <li>Keep personal valuables and laptops locked inside steel lockers.</li>
              <li>Damages to room walls or fixtures are subject to repair deductions.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Room Change Application Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <ArrowRightLeft className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-sm">Apply for Room Reallocation / Change</h3>
                  <p className="text-[11px] text-slate-400">Warden Office accommodation transfer request</p>
                </div>
              </div>
              <button
                onClick={() => setShowSwapModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSwapSubmit} className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <p className="text-slate-500">Currently Assigned:</p>
                <p className="font-bold text-slate-800">
                  {currentStudent.room} ({currentStudent.bedNo}) • {currentStudent.block}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Block</label>
                  <select
                    value={targetBlock}
                    onChange={(e) => setTargetBlock(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="Block A">Block A (North Wing)</option>
                    <option value="Block B">Block B (Boys Central)</option>
                    <option value="Block C">Block C (Quiet Wing)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Floor</label>
                  <select
                    value={preferredFloor}
                    onChange={(e) => setPreferredFloor(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="1st Floor">1st Floor</option>
                    <option value="2nd Floor">2nd Floor</option>
                    <option value="3rd Floor">3rd Floor</option>
                    <option value="4th Floor">4th Floor</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Reason for Transfer Request</label>
                <textarea
                  rows={3}
                  required
                  placeholder="State academic reason, medical condition, study schedule, or mutual roommate agreement..."
                  value={swapReason}
                  onChange={(e) => setSwapReason(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>Room changes are approved at the beginning of each academic semester based on seat vacancies.</span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSwapModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md cursor-pointer"
                >
                  Submit Room Change Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
