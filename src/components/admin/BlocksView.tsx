import React, { useState } from 'react';
import {
  Building2,
  Users,
  BedDouble,
  CheckCircle2,
  Plus,
  Edit2,
  Phone,
  UserCheck,
  Layers,
  Sparkles
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

interface BlockInfo {
  id: string;
  name: string;
  tag: string;
  floors: number;
  totalRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  supervisor: string;
  supervisorPhone: string;
  facilities: string[];
  gender: 'Boys' | 'Girls' | 'Co-ed';
}

const INITIAL_BLOCKS: BlockInfo[] = [
  {
    id: 'block-a',
    name: 'Block A',
    tag: 'Senior Academic Wing',
    floors: 4,
    totalRooms: 40,
    totalBeds: 120,
    occupiedBeds: 112,
    supervisor: 'Md. Tariqul Islam',
    supervisorPhone: '+880 1711-234567',
    facilities: ['High-speed Fiber WiFi', 'RO Water Purifier', 'Study Hall', 'CCTV Security'],
    gender: 'Boys'
  },
  {
    id: 'block-b',
    name: 'Block B',
    tag: 'Junior Resident Wing (Rahim Ahmed\'s Block)',
    floors: 4,
    totalRooms: 40,
    totalBeds: 120,
    occupiedBeds: 115,
    supervisor: 'Engr. Kamal Hossain',
    supervisorPhone: '+880 1819-345678',
    facilities: ['Common Room & TV', 'Solar Water Heater', 'Table Tennis Room', 'Elevator'],
    gender: 'Boys'
  },
  {
    id: 'block-c',
    name: 'Block C',
    tag: 'International & Postgraduate Wing',
    floors: 4,
    totalRooms: 40,
    totalBeds: 120,
    occupiedBeds: 108,
    supervisor: 'Dr. Nasir Uddin',
    supervisorPhone: '+880 1914-456789',
    facilities: ['Air Conditioned Common Hall', 'Gymnasium', 'Backup Generator', 'Attached Balcony'],
    gender: 'Co-ed'
  }
];

export const BlocksView: React.FC = () => {
  const { setSelectedBlock, setActiveSidebarTab, showToast } = useHostel();
  const [blocks, setBlocks] = useState<BlockInfo[]>(() => {
    const saved = localStorage.getItem('hostel_blocks_data');
    return saved ? JSON.parse(saved) : INITIAL_BLOCKS;
  });

  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [editingBlock, setEditingBlock] = useState<BlockInfo | null>(null);

  const [newBlockName, setNewBlockName] = useState('');
  const [newBlockTag, setNewBlockTag] = useState('');
  const [newSupervisor, setNewSupervisor] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newFloors, setNewFloors] = useState(4);
  const [newRooms, setNewRooms] = useState(40);

  const saveBlocksToStorage = (updated: BlockInfo[]) => {
    setBlocks(updated);
    localStorage.setItem('hostel_blocks_data', JSON.stringify(updated));
  };

  const handleCreateBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockName.trim()) return;

    const newBlock: BlockInfo = {
      id: `block-${Date.now()}`,
      name: newBlockName,
      tag: newBlockTag || 'Residential Wing',
      floors: Number(newFloors),
      totalRooms: Number(newRooms),
      totalBeds: Number(newRooms) * 3,
      occupiedBeds: 0,
      supervisor: newSupervisor || 'Hostel Staff',
      supervisorPhone: newPhone || '+880 1700-000000',
      facilities: ['WiFi', 'Water Purifier', 'Security Guard'],
      gender: 'Boys'
    };

    const updated = [...blocks, newBlock];
    saveBlocksToStorage(updated);
    setIsAddingBlock(false);
    setNewBlockName('');
    setNewBlockTag('');
    showToast(`${newBlock.name} created successfully!`);
  };

  const handleUpdateSupervisor = (blockId: string, name: string, phone: string) => {
    const updated = blocks.map(b => (b.id === blockId ? { ...b, supervisor: name, supervisorPhone: phone } : b));
    saveBlocksToStorage(updated);
    setEditingBlock(null);
    showToast('Block supervisor details updated!');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
              Hostel Infrastructure
            </span>
            <span className="text-xs text-slate-300">• 3 Main Complexes Active</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Hostel Blocks & Wings Architecture</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Configure residential block parameters, supervisor assignments, floor allocations, and facility amenities across the campus.
          </p>
        </div>

        <button
          onClick={() => setIsAddingBlock(true)}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Block</span>
        </button>
      </div>

      {/* Add Block Form Drawer / Modal */}
      {isAddingBlock && (
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-lg animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-800">Add New Hostel Residential Block</h4>
            <button
              onClick={() => setIsAddingBlock(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateBlock} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Block Name *</label>
              <input
                required
                type="text"
                placeholder="e.g. Block D"
                value={newBlockName}
                onChange={(e) => setNewBlockName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Description / Tag</label>
              <input
                type="text"
                placeholder="e.g. New Extension Wing"
                value={newBlockTag}
                onChange={(e) => setNewBlockTag(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Caretaker / Supervisor</label>
              <input
                type="text"
                placeholder="e.g. Md. Jahangir Alam"
                value={newSupervisor}
                onChange={(e) => setNewSupervisor(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Supervisor Phone</label>
              <input
                type="text"
                placeholder="+880 17XX-XXXXXX"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Floors</label>
              <input
                type="number"
                min="1"
                max="10"
                value={newFloors}
                onChange={(e) => setNewFloors(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Total Rooms</label>
              <input
                type="number"
                min="5"
                max="100"
                value={newRooms}
                onChange={(e) => setNewRooms(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:border-blue-500 font-medium"
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAddingBlock(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-sm"
              >
                Create Block
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blocks Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {blocks.map((block) => {
          const occupancyPct = Math.round((block.occupiedBeds / block.totalBeds) * 100);
          const isSelected = block.name === 'Block A';

          return (
            <div
              key={block.id}
              className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-500 shadow-md ring-2 ring-blue-500/20'
                  : 'border-slate-200 shadow-xs hover:shadow-md'
              }`}
            >
              {/* Card Header */}
              <div className="p-5 pb-4 border-b border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-800 leading-tight">
                        {block.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-medium">{block.tag}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                    {block.gender}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Occupancy</span>
                    <span className="font-extrabold text-slate-800">
                      {occupancyPct}% ({block.occupiedBeds}/{block.totalBeds} Beds)
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        occupancyPct > 90 ? 'bg-emerald-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${occupancyPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Card Stats Grid */}
              <div className="p-5 py-3.5 bg-slate-50/50 grid grid-cols-3 gap-2 text-center border-b border-slate-100">
                <div className="p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                  <Layers className="w-3.5 h-3.5 text-blue-500 mx-auto mb-1" />
                  <span className="text-sm font-black text-slate-800">{block.floors}</span>
                  <p className="text-[10px] text-slate-400 font-medium">Floors</p>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                  <BedDouble className="w-3.5 h-3.5 text-emerald-500 mx-auto mb-1" />
                  <span className="text-sm font-black text-slate-800">{block.totalRooms}</span>
                  <p className="text-[10px] text-slate-400 font-medium">Rooms</p>
                </div>
                <div className="p-2 bg-white rounded-xl border border-slate-200/60 shadow-2xs">
                  <Users className="w-3.5 h-3.5 text-amber-500 mx-auto mb-1" />
                  <span className="text-sm font-black text-slate-800">
                    {block.totalBeds - block.occupiedBeds}
                  </span>
                  <p className="text-[10px] text-slate-400 font-medium">Vacant</p>
                </div>
              </div>

              {/* Caretaker / Supervisor Info */}
              <div className="p-5 py-3 border-b border-slate-100 text-xs">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 text-slate-500 font-bold text-[11px] uppercase tracking-wider">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Resident Caretaker</span>
                  </div>
                  <button
                    onClick={() => setEditingBlock(block)}
                    className="text-slate-400 hover:text-blue-600 p-1 rounded-md"
                    title="Edit supervisor"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                </div>
                <p className="font-bold text-slate-800">{block.supervisor}</p>
                <p className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{block.supervisorPhone}</span>
                </p>
              </div>

              {/* Amenities / Facilities */}
              <div className="p-5 pt-3 space-y-2">
                <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Key Amenities</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {block.facilities.map((fac, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200/60"
                    >
                      {fac}
                    </span>
                  ))}
                </div>

                {/* Action button */}
                <div className="pt-3">
                  <button
                    onClick={() => {
                      setSelectedBlock(block.name as any);
                      setActiveSidebarTab('Rooms');
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <span>Inspect {block.name} Rooms & Beds</span>
                    <CheckCircle2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Supervisor Modal */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl border border-slate-200 animate-in zoom-in-95">
            <h4 className="font-bold text-slate-800 text-sm">
              Update Caretaker for {editingBlock.name}
            </h4>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Supervisor Name</label>
                <input
                  id="edit-sup-name"
                  type="text"
                  defaultValue={editingBlock.supervisor}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                <input
                  id="edit-sup-phone"
                  type="text"
                  defaultValue={editingBlock.supervisorPhone}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 text-xs">
              <button
                onClick={() => setEditingBlock(null)}
                className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const name = (document.getElementById('edit-sup-name') as HTMLInputElement).value;
                  const phone = (document.getElementById('edit-sup-phone') as HTMLInputElement).value;
                  handleUpdateSupervisor(editingBlock.id, name, phone);
                }}
                className="px-4 py-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 font-bold"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
