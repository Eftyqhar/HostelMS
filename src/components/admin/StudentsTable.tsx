import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentsTable: React.FC = () => {
  const { students, openModal, searchQuery } = useHostel();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.includes(searchQuery) ||
      s.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">Recent Students</h3>
        <button
          onClick={() => openModal('addStudent')}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="text-slate-400 font-semibold border-b border-slate-100 pb-2">
              <th className="pb-2.5 font-medium">ID</th>
              <th className="pb-2.5 font-medium">Name</th>
              <th className="pb-2.5 font-medium">Department</th>
              <th className="pb-2.5 font-medium">Room</th>
              <th className="pb-2.5 font-medium">Status</th>
              <th className="pb-2.5 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.slice(0, 4).map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 font-semibold text-slate-700">{student.id}</td>
                <td className="py-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-200"
                    />
                    <span className="font-bold text-slate-800">{student.name}</span>
                  </div>
                </td>
                <td className="py-3 text-slate-600 font-medium">{student.department}</td>
                <td className="py-3 font-semibold text-slate-700">{student.room}</td>
                <td className="py-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      student.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                        : 'bg-rose-50 text-rose-600 border border-rose-200'
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td className="py-3 text-right relative">
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === student.id ? null : student.id)
                    }
                    className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === student.id && (
                    <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-left">
                      <button
                        onClick={() => {
                          openModal('assignRoom', student);
                          setActiveDropdown(null);
                        }}
                        className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-xs font-medium"
                      >
                        Reassign Room
                      </button>
                      <button
                        onClick={() => {
                          openModal('collectPayment', student);
                          setActiveDropdown(null);
                        }}
                        className="w-full px-3 py-1.5 hover:bg-slate-50 text-slate-700 text-xs font-medium"
                      >
                        Collect Fee
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
