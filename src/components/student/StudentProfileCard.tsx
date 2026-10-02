import React from 'react';
import { Camera } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentProfileCard: React.FC = () => {
  const { currentStudent } = useHostel();

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-800">My Profile</h3>
        <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          Edit Profile
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Avatar with Camera Overlay */}
        <div className="relative">
          <img
            src={currentStudent.avatar}
            alt={currentStudent.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-slate-100"
          />
          <button
            title="Update photo"
            className="absolute bottom-0 right-0 p-1.5 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="flex-1 space-y-1.5 text-xs text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h4 className="text-base font-bold text-slate-800">{currentStudent.name}</h4>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
              {currentStudent.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 pt-1 text-slate-600">
            <div>
              <span className="text-slate-400 font-medium">Student ID: </span>
              <span className="font-semibold text-slate-700">{currentStudent.id}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Semester: </span>
              <span className="font-semibold text-slate-700">{currentStudent.semester}</span>
            </div>
            <div className="sm:col-span-2 truncate">
              <span className="text-slate-400 font-medium">Department: </span>
              <span className="font-semibold text-slate-700">{currentStudent.department}</span>
            </div>
            <div>
              <span className="text-slate-400 font-medium">Phone: </span>
              <span className="font-semibold text-slate-700">{currentStudent.phone}</span>
            </div>
            <div className="sm:col-span-2 truncate">
              <span className="text-slate-400 font-medium">Email: </span>
              <span className="font-semibold text-slate-700">{currentStudent.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
