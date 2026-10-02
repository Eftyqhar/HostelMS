import React, { useState } from 'react';
import {
  AlertTriangle,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';
import type { Complaint } from '../../types';

export const AdminComplaintsView: React.FC = () => {
  const { complaints, updateComplaintStatus, openModal, showToast } = useHostel();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  // Filter complaints
  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || c.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    const matchesPriority = selectedPriority === 'All' || c.priority === selectedPriority;

    return matchesSearch && matchesCategory && matchesStatus && matchesPriority;
  });

  const pendingCount = complaints.filter((c) => c.status === 'Pending').length;
  const inProgressCount = complaints.filter((c) => c.status === 'In Progress').length;
  const resolvedCount = complaints.filter((c) => c.status === 'Resolved').length;
  const highPriorityCount = complaints.filter((c) => c.priority === 'High' && c.status !== 'Resolved').length;

  const getPriorityBadge = (priority: Complaint['priority']) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: Complaint['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-rose-100 text-rose-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30">
              Institutional Grievance Cell
            </span>
            <span className="text-xs text-slate-300">• All Blocks (A, B, C)</span>
          </div>
          <h3 className="text-xl font-black tracking-tight">Hostel Complaints & Incident Grievance Management</h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Supervise registered resident complaints, prioritize emergency electrical or plumbing repairs, dispatch maintenance staff, and update ticket resolution statuses.
          </p>
        </div>

        <button
          onClick={() => openModal('newComplaint')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white shadow-md transition-all self-start md:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Lodge Admin Complaint</span>
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Open / Pending Tickets</p>
            <h4 className="text-2xl font-black text-rose-600">{pendingCount}</h4>
            <span className="text-[10px] text-slate-500">Requires warden attention</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">In Progress</p>
            <h4 className="text-2xl font-black text-blue-600">{inProgressCount}</h4>
            <span className="text-[10px] text-slate-500">Technicians dispatched</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Resolved Complaints</p>
            <h4 className="text-2xl font-black text-emerald-600">{resolvedCount}</h4>
            <span className="text-[10px] text-emerald-600 font-bold">Successfully fixed</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-medium text-slate-400">Urgent / High Priority</p>
            <h4 className="text-2xl font-black text-amber-600">{highPriorityCount}</h4>
            <span className="text-[10px] text-slate-500">Immediate action needed</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, complaint ID (#1024), room (B-203), or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Filters:</span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50"
          >
            <option value="All">All Categories</option>
            <option value="Electrical">Electrical</option>
            <option value="Water">Water / Plumbing</option>
            <option value="Furniture">Furniture</option>
            <option value="Internet">Internet</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Open / Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-2.5 py-1.5 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Master Complaints Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Registered Hostel Grievances</h4>
            <p className="text-xs text-slate-400">Displaying {filtered.length} complaints matching active criteria</p>
          </div>
          <button
            onClick={() => showToast('Dispatch report exported for Maintenance Supervisor Mr. Rafiq!')}
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Print Work Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 text-slate-500 font-semibold border-b border-slate-100">
                <th className="py-3 px-4 font-bold">Ticket ID</th>
                <th className="py-3 px-4 font-bold">Student</th>
                <th className="py-3 px-4 font-bold">Room</th>
                <th className="py-3 px-4 font-bold">Category</th>
                <th className="py-3 px-4 font-bold">Subject & Details</th>
                <th className="py-3 px-4 font-bold">Priority</th>
                <th className="py-3 px-4 font-bold">Filed Date</th>
                <th className="py-3 px-4 font-bold text-right">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length > 0 ? (
                filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-700">#{c.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                          {c.studentName.charAt(0)}
                        </div>
                        <span className="font-bold text-slate-800">{c.studentName}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{c.room}</td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-slate-100 text-slate-700 border border-slate-200">
                        {c.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="font-bold text-slate-800 truncate">{c.subject}</p>
                      {c.description && (
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{c.description}</p>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getPriorityBadge(
                          c.priority
                        )}`}
                      >
                        {c.priority}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{c.date}</td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          const nextStatus =
                            c.status === 'Pending'
                              ? 'In Progress'
                              : c.status === 'In Progress'
                              ? 'Resolved'
                              : 'Pending';
                          updateComplaintStatus(c.id, nextStatus);
                        }}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-transform hover:scale-105 cursor-pointer shadow-2xs ${getStatusBadge(
                          c.status
                        )}`}
                        title="Click to cycle status (Pending -> In Progress -> Resolved)"
                      >
                        <span>{c.status}</span>
                        <ChevronDown className="w-3 h-3 opacity-60" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No complaints found matching the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
