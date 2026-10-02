import React, { useState } from 'react';
import {
  User,
  Bell,
  Lock,
  Heart,
  Save,
  ShieldCheck,
  Moon
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const StudentSettingsView: React.FC = () => {
  const { currentStudent, showToast, darkMode, toggleDarkMode } = useHostel();

  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'preferences' | 'security'>('profile');

  // Student specific form state
  const [phone, setPhone] = useState(currentStudent.phone);
  const [email, setEmail] = useState(currentStudent.email);
  const [guardianName, setGuardianName] = useState(currentStudent.guardianName || 'Abdul Karim');
  const [guardianPhone, setGuardianPhone] = useState(currentStudent.guardianPhone || '01811-987654');
  const [bloodGroup, setBloodGroup] = useState('B+');

  // Preferences
  const [dietary, setDietary] = useState('Halal / Standard');
  const [sleepHabit, setSleepHabit] = useState('Night Owl (Late study)');

  // Notifications
  const [notifyVisitor, setNotifyVisitor] = useState(true);
  const [notifyFee, setNotifyFee] = useState(true);
  const [notifyMenu, setNotifyMenu] = useState(true);

  // Security
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your profile & contact details have been updated!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currPass || !newPass) {
      alert('Please fill in current and new password');
      return;
    }
    if (newPass !== confirmPass) {
      alert('New password and confirmation do not match');
      return;
    }
    setCurrPass('');
    setNewPass('');
    setConfirmPass('');
    showToast('Portal login password updated securely!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentStudent.avatar}
            alt={currentStudent.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-blue-500/20"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                Student Account
              </span>
              <span className="text-xs text-slate-400">ID: {currentStudent.id} • Room {currentStudent.room}</span>
            </div>
            <h3 className="text-lg font-black text-slate-800">{currentStudent.name} Settings</h3>
            <p className="text-xs text-slate-400">Manage your profile, dietary choices, notification alerts & credentials</p>
          </div>
        </div>

        <button
          onClick={() => showToast('Preferences updated!')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'profile' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Contacts</span>
        </button>

        <button
          onClick={() => setActiveTab('preferences')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'preferences' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Living & Dining Preferences</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'notifications' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notification Alerts</span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'security' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Password & Security</span>
        </button>
      </div>

      {/* Form Content */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        {/* Tab 1: Profile & Contacts */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              Personal & Emergency Contacts
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Legal Name</label>
                <input
                  disabled
                  type="text"
                  value={currentStudent.name}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Academic Department</label>
                <input
                  disabled
                  type="text"
                  value={currentStudent.department}
                  className="w-full px-3 py-2 border border-slate-200 bg-slate-50 text-slate-500 rounded-lg cursor-not-allowed font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Personal Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Personal Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Guardian / Father Name</label>
                <input
                  type="text"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Guardian Phone (Emergency Contact)</label>
                <input
                  type="text"
                  value={guardianPhone}
                  onChange={(e) => setGuardianPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium"
                >
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>O+</option>
                  <option>O-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">App Theme</label>
                <button
                  type="button"
                  onClick={toggleDarkMode}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium flex items-center justify-between hover:bg-slate-50"
                >
                  <span>{darkMode ? 'Dark Theme (Active)' : 'Light Theme (Active)'}</span>
                  <Moon className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
              >
                Update Contact Information
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Living & Dining Preferences */}
        {activeTab === 'preferences' && (
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Roommate Matching & Dietary Choices
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="font-bold text-slate-800 block">Mess Dietary Preference</span>
                <select
                  value={dietary}
                  onChange={(e) => setDietary(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white font-medium"
                >
                  <option>Halal / Standard (Chicken, Fish, Veg)</option>
                  <option>Strictly Vegetarian</option>
                  <option>No Seafood / Fish Allergy</option>
                </select>
                <p className="text-[10px] text-slate-400">Notified to the dining kitchen head cook.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="font-bold text-slate-800 block">Study & Sleep Habit</span>
                <select
                  value={sleepHabit}
                  onChange={(e) => setSleepHabit(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white font-medium"
                >
                  <option>Night Owl (Late study after 12 AM)</option>
                  <option>Early Bird (Sleep by 11 PM, early rise)</option>
                  <option>Flexible / Moderate</option>
                </select>
                <p className="text-[10px] text-slate-400">Used by warden for future room reallocation pairing.</p>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl">
              <p className="font-bold">Current Assigned Room: {currentStudent.room} ({currentStudent.bedNo})</p>
              <p className="text-[11px] text-blue-700 mt-0.5">To request room changes, submit a request via the Hostel Office.</p>
            </div>
          </div>
        )}

        {/* Tab 3: Notification Alerts */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-amber-500" />
              Personal Notification Subscriptions
            </h4>

            <div className="space-y-2.5">
              <label className="flex items-center justify-between p-3 rounded-xl border hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">Visitor Gate Arrival Text Alert</p>
                  <p className="text-slate-400 text-[11px]">Receive instant SMS when your invited guest arrives at gate</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyVisitor}
                  onChange={(e) => setNotifyVisitor(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">Monthly Hostel Fee Reminders</p>
                  <p className="text-slate-400 text-[11px]">Send reminder 2 days before 10th of every month</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyFee}
                  onChange={(e) => setNotifyFee(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl border hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">Mess Special Feast & Menu Updates</p>
                  <p className="text-slate-400 text-[11px]">Alert on Friday feast menus or breakfast changes</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifyMenu}
                  onChange={(e) => setNotifyMenu(e.target.checked)}
                  className="w-4 h-4 accent-blue-600 rounded"
                />
              </label>
            </div>
          </div>
        )}

        {/* Tab 4: Password & Security */}
        {activeTab === 'security' && (
          <form onSubmit={handlePasswordChange} className="space-y-4 text-xs max-w-md">
            <h4 className="font-bold text-sm text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Update Student Portal Password
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Current Password</label>
              <input
                required
                type="password"
                placeholder="••••••••"
                value={currPass}
                onChange={(e) => setCurrPass(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">New Password</label>
              <input
                required
                type="password"
                placeholder="Min 6 characters"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg font-medium"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
              <input
                required
                type="password"
                placeholder="Re-enter new password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg font-medium"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
