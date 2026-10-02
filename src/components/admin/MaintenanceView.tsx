import React, { useState } from 'react';
import {
  Wrench,
  Calendar,
  AlertTriangle,
  Plus,
  User,
  DollarSign,
  Filter,
  Check
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

interface WorkOrder {
  id: string;
  title: string;
  category: 'Electrical' | 'Plumbing' | 'Carpentry' | 'HVAC' | 'Civil' | 'Pest Control';
  location: string; // e.g. "Block A - Room 204" or "Main Water Tank"
  technician: string;
  technicianPhone: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Routine';
  status: 'Scheduled' | 'In Progress' | 'Awaiting Parts' | 'Completed';
  estimatedCost: number;
  partsUsed?: string;
  scheduledDate: string;
  completedDate?: string;
}

interface PreventiveSchedule {
  id: string;
  task: string;
  facility: string;
  frequency: string;
  lastDone: string;
  nextDue: string;
  status: 'Due Soon' | 'On Track' | 'Overdue';
  assignedVendor: string;
}

const INITIAL_WORK_ORDERS: WorkOrder[] = [
  {
    id: 'WO-801',
    title: 'Replace ceiling fan motor capacitor & bearings',
    category: 'Electrical',
    location: 'Block B - Room 203',
    technician: 'Rafiqul Islam (Senior Electrician)',
    technicianPhone: '+880 1711-889900',
    priority: 'High',
    status: 'In Progress',
    estimatedCost: 850,
    partsUsed: '1x 2.5uF Capacitor, 2x Bearing 6202',
    scheduledDate: '30 Sep 2026'
  },
  {
    id: 'WO-802',
    title: 'Repair leaking main drainage pipe in 2nd floor washroom',
    category: 'Plumbing',
    location: 'Block A - 2nd Floor Corridor',
    technician: 'Kabir Hossain (Plumber)',
    technicianPhone: '+880 1819-776655',
    priority: 'Urgent',
    status: 'In Progress',
    estimatedCost: 1400,
    partsUsed: '4-inch PVC elbow, Solvent cement, Teflon tape',
    scheduledDate: '30 Sep 2026'
  },
  {
    id: 'WO-803',
    title: 'Repair wooden study table hinge & drawer lock',
    category: 'Carpentry',
    location: 'Block C - Room 301',
    technician: 'Alam Miah (Carpenter)',
    technicianPhone: '+880 1914-665544',
    priority: 'Medium',
    status: 'Scheduled',
    estimatedCost: 450,
    partsUsed: 'Brass drawer lock set, 3x screws',
    scheduledDate: '01 Oct 2026'
  },
  {
    id: 'WO-804',
    title: 'Monthly diesel generator test run and oil change',
    category: 'Electrical',
    location: 'Power Substation & Generator Room',
    technician: 'PowerTech Engineering Team',
    technicianPhone: '+880 1722-112233',
    priority: 'Routine',
    status: 'Completed',
    estimatedCost: 4200,
    partsUsed: '20L Mobil Delvac Oil, 2x Fuel Filters',
    scheduledDate: '28 Sep 2026',
    completedDate: '28 Sep 2026'
  },
  {
    id: 'WO-805',
    title: 'Replace burnt LED tube lights in dining hall',
    category: 'Electrical',
    location: 'Dining Hall Mess',
    technician: 'Rafiqul Islam (Senior Electrician)',
    technicianPhone: '+880 1711-889900',
    priority: 'Medium',
    status: 'Completed',
    estimatedCost: 1200,
    partsUsed: '4x 20W T8 LED Tubes',
    scheduledDate: '27 Sep 2026',
    completedDate: '27 Sep 2026'
  }
];

const PREVENTIVE_SCHEDULES: PreventiveSchedule[] = [
  {
    id: 'PM-1',
    task: 'Overhead Rooftop Water Tank Disinfection & Cleaning',
    facility: 'All Blocks (A, B, C Tanks)',
    frequency: 'Quarterly',
    lastDone: '05 Jul 2026',
    nextDue: '05 Oct 2026',
    status: 'Due Soon',
    assignedVendor: 'CleanAqua Services Ltd.'
  },
  {
    id: 'PM-2',
    task: 'Fire Extinguisher Pressure Inspection & Certification',
    facility: '48 Extinguishers Across Corridors',
    frequency: 'Monthly',
    lastDone: '02 Sep 2026',
    nextDue: '02 Oct 2026',
    status: 'Due Soon',
    assignedVendor: 'SafetyFirst Fire Engineering'
  },
  {
    id: 'PM-3',
    task: 'Passenger Elevator Monthly Preventative Servicing',
    facility: 'Block B & Block C Lifts',
    frequency: 'Monthly',
    lastDone: '15 Sep 2026',
    nextDue: '15 Oct 2026',
    status: 'On Track',
    assignedVendor: 'Otis / Sigma Technicians'
  },
  {
    id: 'PM-4',
    task: 'Hostel Campus Pest & Insect Fumigation',
    facility: 'Dining Kitchen, Basements & Drains',
    frequency: 'Monthly',
    lastDone: '20 Aug 2026',
    nextDue: '20 Sep 2026',
    status: 'Overdue',
    assignedVendor: 'GreenShield Pest Solutions'
  }
];

export const MaintenanceView: React.FC = () => {
  const { showToast } = useHostel();

  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(() => {
    const saved = localStorage.getItem('hostel_work_orders');
    return saved ? JSON.parse(saved) : INITIAL_WORK_ORDERS;
  });

  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  // New Work Order Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<WorkOrder['category']>('Electrical');
  const [newLocation, setNewLocation] = useState('');
  const [newTechnician, setNewTechnician] = useState('Rafiqul Islam (Electrician)');
  const [newPriority, setNewPriority] = useState<WorkOrder['priority']>('Medium');
  const [newCost, setNewCost] = useState('500');

  const saveWorkOrders = (updated: WorkOrder[]) => {
    setWorkOrders(updated);
    localStorage.setItem('hostel_work_orders', JSON.stringify(updated));
  };

  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newLocation.trim()) return;

    const newOrder: WorkOrder = {
      id: `WO-${Math.floor(800 + workOrders.length + 1)}`,
      title: newTitle,
      category: newCategory,
      location: newLocation,
      technician: newTechnician,
      technicianPhone: '+880 1711-889900',
      priority: newPriority,
      status: 'Scheduled',
      estimatedCost: Number(newCost) || 0,
      scheduledDate: 'Today'
    };

    const updated = [newOrder, ...workOrders];
    saveWorkOrders(updated);
    setIsCreatingOrder(false);
    setNewTitle('');
    setNewLocation('');
    showToast(`Work Order #${newOrder.id} dispatched to ${newTechnician}!`);
  };

  const handleStatusChange = (id: string, newStatus: WorkOrder['status']) => {
    const updated = workOrders.map((wo) =>
      wo.id === id ? { ...wo, status: newStatus, completedDate: newStatus === 'Completed' ? 'Today' : undefined } : wo
    );
    saveWorkOrders(updated);
    showToast(`Work Order #${id} updated to ${newStatus}`);
  };

  const filteredOrders = workOrders.filter((wo) => {
    const matchesCat = filterCategory === 'All' || wo.category === filterCategory;
    const matchesStatus = filterStatus === 'All' || wo.status === filterStatus;
    return matchesCat && matchesStatus;
  });

  const activeOrdersCount = workOrders.filter((w) => w.status !== 'Completed').length;
  const urgentCount = workOrders.filter((w) => w.priority === 'Urgent' && w.status !== 'Completed').length;
  const totalCostEstimate = workOrders.reduce((sum, w) => sum + w.estimatedCost, 0);

  return (
    <div className="space-y-6">
      {/* Top Banner Explaining Distinction */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
              Facility & Asset Operations
            </span>
            <span className="text-xs text-slate-300">• Work Orders & Preventive Maintenance</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Hostel Maintenance & Work Orders</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Dispatch technicians, manage repair work orders, track replacement parts & costs, and maintain facility preventive inspection schedules.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingOrder(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Work Order</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Active Work Orders</p>
            <h4 className="text-2xl font-black text-slate-800">{activeOrdersCount}</h4>
            <span className="text-[10px] text-blue-600 font-semibold">Dispatched to technicians</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
            <Wrench className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Urgent Breakdowns</p>
            <h4 className="text-2xl font-black text-rose-600">{urgentCount}</h4>
            <span className="text-[10px] text-rose-500 font-semibold">Immediate attention needed</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Preventive Tasks</p>
            <h4 className="text-2xl font-black text-slate-800">4</h4>
            <span className="text-[10px] text-amber-600 font-semibold">1 Overdue Inspection</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Total Maintenance Cost</p>
            <h4 className="text-2xl font-black text-slate-800">৳ {totalCostEstimate.toLocaleString()}</h4>
            <span className="text-[10px] text-emerald-600 font-semibold">Parts + Technician charges</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* New Work Order Modal / Form */}
      {isCreatingOrder && (
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-xl animate-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Issue New Maintenance Work Order</h4>
              <p className="text-xs text-slate-400">Assign on-campus technician for repair or installation</p>
            </div>
            <button
              onClick={() => setIsCreatingOrder(false)}
              className="text-xs text-slate-400 hover:text-slate-700"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateWorkOrder} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Work Description / Title *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Replace washroom basin mixer tap"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Asset Location *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Block A - Room 102 or Kitchen"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg font-medium"
                >
                  <option>Electrical</option>
                  <option>Plumbing</option>
                  <option>Carpentry</option>
                  <option>HVAC</option>
                  <option>Civil</option>
                  <option>Pest Control</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assign Technician</label>
                <select
                  value={newTechnician}
                  onChange={(e) => setNewTechnician(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-medium"
                >
                  <option>Rafiqul Islam (Senior Electrician)</option>
                  <option>Kabir Hossain (Plumber)</option>
                  <option>Alam Miah (Carpenter)</option>
                  <option>PowerTech Services (HVAC & Gen)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Priority</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg font-medium"
                >
                  <option value="Urgent">Urgent (Breakdown)</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Routine">Routine</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Est. Cost (৳)</label>
                <input
                  type="number"
                  value={newCost}
                  onChange={(e) => setNewCost(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-medium"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCreatingOrder(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold"
              >
                Dispatch Work Order
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Work Orders List & Controls */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Dispatched Work Orders</h4>
            <p className="text-xs text-slate-400">Real-time status of repairs, replacements, and contractor work</p>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 font-medium"
            >
              <option value="All">All Categories</option>
              <option value="Electrical">Electrical</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Carpentry">Carpentry</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs border border-slate-200 rounded-lg px-2.5 py-1 text-slate-600 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Work Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
                <th className="pb-2.5">Order ID</th>
                <th className="pb-2.5">Task Description</th>
                <th className="pb-2.5">Location</th>
                <th className="pb-2.5">Technician</th>
                <th className="pb-2.5">Priority</th>
                <th className="pb-2.5">Cost</th>
                <th className="pb-2.5 text-right">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((wo) => {
                const isUrgent = wo.priority === 'Urgent';
                const isCompleted = wo.status === 'Completed';

                return (
                  <tr key={wo.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-bold text-slate-700">{wo.id}</td>
                    <td className="py-3 max-w-[240px]">
                      <p className="font-bold text-slate-800 leading-tight">{wo.title}</p>
                      {wo.partsUsed && (
                        <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                          Parts: {wo.partsUsed}
                        </p>
                      )}
                    </td>
                    <td className="py-3 font-medium text-slate-600">{wo.location}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <div>
                          <p className="font-semibold text-slate-800 text-[11px]">{wo.technician}</p>
                          <p className="text-[10px] text-slate-400">{wo.technicianPhone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isUrgent
                            ? 'bg-rose-100 text-rose-700 border border-rose-200'
                            : wo.priority === 'High'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {wo.priority}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-slate-700">৳ {wo.estimatedCost}</td>
                    <td className="py-3 text-right">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                          <Check className="w-3 h-3" /> Completed
                        </span>
                      ) : (
                        <button
                          onClick={() =>
                            handleStatusChange(
                              wo.id,
                              wo.status === 'Scheduled' ? 'In Progress' : 'Completed'
                            )
                          }
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition-colors cursor-pointer border border-blue-200"
                        >
                          Mark {wo.status === 'Scheduled' ? 'In Progress' : 'Done'}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preventive Maintenance Calendar Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Scheduled Preventive Maintenance (PM)</h4>
            <p className="text-xs text-slate-400">Regular facility health audits, safety checks & recurring vendor servicing</p>
          </div>
          <span className="text-xs text-blue-600 font-bold">Standard Operating Protocol</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {PREVENTIVE_SCHEDULES.map((pm) => (
            <div
              key={pm.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5 hover:bg-white hover:shadow-xs transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-800 text-sm">{pm.task}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    pm.status === 'Overdue'
                      ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse'
                      : pm.status === 'Due Soon'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {pm.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-slate-500 text-[11px]">
                <div>
                  <span className="font-medium text-slate-400">Target Facility: </span>
                  <span className="font-bold text-slate-700">{pm.facility}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-400">Frequency: </span>
                  <span className="font-bold text-slate-700">{pm.frequency}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-400">Last Servicing: </span>
                  <span className="font-semibold text-slate-600">{pm.lastDone}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-400">Next Due Date: </span>
                  <span className="font-bold text-slate-800">{pm.nextDue}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Vendor: {pm.assignedVendor}</span>
                <button
                  onClick={() => showToast(`Vendor ${pm.assignedVendor} notified for ${pm.task}`)}
                  className="text-blue-600 hover:text-blue-700 font-bold"
                >
                  Notify Vendor
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
