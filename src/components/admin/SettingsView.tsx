import React, { useState } from 'react';
import {
  Save,
  Building,
  CreditCard,
  Clock,
  Bell,
  CheckCircle,
  RefreshCw,
  Sliders
} from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const SettingsView: React.FC = () => {
  const { showToast, backendConnected, refreshBackendData } = useHostel();

  const [activeTab, setActiveTab] = useState<'general' | 'fees' | 'dining' | 'notifications'>('general');

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('hostel_system_settings');
    return saved
      ? JSON.parse(saved)
      : {
          hostelName: 'HostelMS Main Complex',
          institutionName: 'College of Engineering & Technology',
          academicSession: '2026-2027',
          currencySymbol: '৳',
          adminEmail: 'admin@hostelms.edu',
          emergencyPhone: '+880 1819-001122',
          curfewTime: '10:00 PM',
          quietHoursStart: '11:00 PM',
          monthlySeatRent: 1500,
          monthlyMessCharge: 1000,
          dueDayOfMonth: 10,
          lateFinePenalty: 100,
          breakfastTime: '7:00 AM - 9:00 AM',
          lunchTime: '12:00 PM - 2:00 PM',
          dinnerTime: '7:00 PM - 9:00 PM',
          smsOnGateEntry: true,
          attendanceAlertToGuardian: true,
          feeReminderAlert: true,
          autoAssignVacantBed: true
        };
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hostel_system_settings', JSON.stringify(settings));
    showToast('System configuration & settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
              HostelMS Configuration
            </span>
            <span className="text-xs text-slate-400">
              Backend Status: {backendConnected ? '🟢 Live SQLite' : '🟡 Local Storage'}
            </span>
          </div>
          <h3 className="text-xl font-black text-slate-800 tracking-tight">System & Hostel Settings</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure hostel billing policies, dining hours, security curfews, and institutional parameters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              refreshBackendData();
              showToast('Data refreshed from backend!');
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync DB</span>
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('general')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'general'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>General & Curfew</span>
        </button>

        <button
          onClick={() => setActiveTab('fees')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'fees'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Fee & Mess Billing</span>
        </button>

        <button
          onClick={() => setActiveTab('dining')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'dining'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Dining Schedules</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
            activeTab === 'notifications'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Security & Alerts</span>
        </button>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSave} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        {/* Tab 1: General */}
        {activeTab === 'general' && (
          <div className="space-y-5 text-xs">
            <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-600" />
              General Institutional Identity
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hostel Complex Name</label>
                <input
                  type="text"
                  value={settings.hostelName}
                  onChange={(e) => setSettings({ ...settings, hostelName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Affiliated Institution</label>
                <input
                  type="text"
                  value={settings.institutionName}
                  onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Academic Session Year</label>
                <input
                  type="text"
                  value={settings.academicSession}
                  onChange={(e) => setSettings({ ...settings, academicSession: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Currency Symbol</label>
                <input
                  type="text"
                  value={settings.currencySymbol}
                  onChange={(e) => setSettings({ ...settings, currencySymbol: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Administrative Email</label>
                <input
                  type="email"
                  value={settings.adminEmail}
                  onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Emergency Helpdesk Contact</label>
                <input
                  type="text"
                  value={settings.emergencyPhone}
                  onChange={(e) => setSettings({ ...settings, emergencyPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Hostel Night Gate Curfew Time</label>
                <input
                  type="text"
                  value={settings.curfewTime}
                  onChange={(e) => setSettings({ ...settings, curfewTime: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Quiet Hours Start</label>
                <input
                  type="text"
                  value={settings.quietHoursStart}
                  onChange={(e) => setSettings({ ...settings, quietHoursStart: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fees & Billing */}
        {activeTab === 'fees' && (
          <div className="space-y-5 text-xs">
            <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              Fee Structure & Billing Rules
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly Room Seat Rent (৳)</label>
                <input
                  type="number"
                  value={settings.monthlySeatRent}
                  onChange={(e) => setSettings({ ...settings, monthlySeatRent: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly Mess Dining Charge (৳)</label>
                <input
                  type="number"
                  value={settings.monthlyMessCharge}
                  onChange={(e) => setSettings({ ...settings, monthlyMessCharge: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Due Day (Day of Month)</label>
                <input
                  type="number"
                  min="1"
                  max="28"
                  value={settings.dueDayOfMonth}
                  onChange={(e) => setSettings({ ...settings, dueDayOfMonth: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
                <p className="text-[10px] text-slate-400 mt-1">e.g. 10 means 10th of every month</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Late Fine Penalty (৳)</label>
                <input
                  type="number"
                  value={settings.lateFinePenalty}
                  onChange={(e) => setSettings({ ...settings, lateFinePenalty: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg font-medium focus:border-blue-500"
                />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-1">
              <p className="font-bold">Standard Monthly Total per Student:</p>
              <p className="text-sm font-extrabold">
                Seat Rent (৳ {settings.monthlySeatRent}) + Mess (৳ {settings.monthlyMessCharge}) = ৳ {(settings.monthlySeatRent + settings.monthlyMessCharge).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Dining Schedules */}
        {activeTab === 'dining' && (
          <div className="space-y-5 text-xs">
            <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              Dining Hall & Kitchen Hours
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="font-extrabold text-slate-800">Breakfast Window</span>
                <input
                  type="text"
                  value={settings.breakfastTime}
                  onChange={(e) => setSettings({ ...settings, breakfastTime: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 bg-white rounded-lg font-medium"
                />
                <p className="text-[10px] text-slate-400">Bread, Egg, Banana, Tea</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="font-extrabold text-slate-800">Lunch Window</span>
                <input
                  type="text"
                  value={settings.lunchTime}
                  onChange={(e) => setSettings({ ...settings, lunchTime: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 bg-white rounded-lg font-medium"
                />
                <p className="text-[10px] text-slate-400">Rice, Fish/Chicken, Vegetable, Lentil</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
                <span className="font-extrabold text-slate-800">Dinner Window</span>
                <input
                  type="text"
                  value={settings.dinnerTime}
                  onChange={(e) => setSettings({ ...settings, dinnerTime: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 bg-white rounded-lg font-medium"
                />
                <p className="text-[10px] text-slate-400">Rice, Chicken/Egg, Salad, Dessert</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Notifications & Security */}
        {activeTab === 'notifications' && (
          <div className="space-y-4 text-xs">
            <h4 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <Bell className="w-4 h-4 text-purple-600" />
              Automated Alerts & Campus Security Toggles
            </h4>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">SMS Notification on Visitor Gate Entry</p>
                  <p className="text-slate-400 text-[11px]">Send instant text message to resident when guest signs in at main gate</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.smsOnGateEntry}
                  onChange={(e) => setSettings({ ...settings, smsOnGateEntry: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">Night Attendance Status to Chief Warden</p>
                  <p className="text-slate-400 text-[11px]">Compile 10:30 PM roll-call summary and report unauthorized absences</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.attendanceAlertToGuardian}
                  onChange={(e) => setSettings({ ...settings, attendanceAlertToGuardian: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">Automatic Fee Reminder Alerts</p>
                  <p className="text-slate-400 text-[11px]">Notify students 3 days prior to the 10th of every month</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.feeReminderAlert}
                  onChange={(e) => setSettings({ ...settings, feeReminderAlert: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <div>
                  <p className="font-bold text-slate-800">Auto-Suggest Available Bed During Admission</p>
                  <p className="text-slate-400 text-[11px]">Recommend vacant beds automatically based on student department</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.autoAssignVacantBed}
                  onChange={(e) => setSettings({ ...settings, autoAssignVacantBed: e.target.checked })}
                  className="w-4 h-4 accent-blue-600 rounded cursor-pointer"
                />
              </label>
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Settings will be saved to local configuration.</span>
          <button
            type="submit"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            <CheckCircle className="w-4 h-4" />
            <span>Apply Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};
