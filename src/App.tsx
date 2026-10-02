import React, { useState } from 'react';
import { HostelProvider, useHostel } from './context/HostelContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { AndroidTopBar } from './components/android/AndroidTopBar';
import { AndroidBottomNav } from './components/android/AndroidBottomNav';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TabContentView } from './components/common/TabContentView';
import { ModalsContainer } from './components/modals/ModalsContainer';
import { Toast } from './components/common/Toast';

const AppLayout: React.FC = () => {
  const { role, activeSidebarTab, darkMode } = useHostel();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className={`min-h-screen w-full transition-colors ${
        darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-800'
      }`}
    >
      {/* Desktop Left Sidebar (visible on desktop lg: screens) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area (offset on desktop by w-64 via lg:pl-64) */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Desktop Header with Search, Role Switcher, Alerts & Profile (Desktop only) */}
        <div className="hidden lg:block">
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        {/* Mobile Top App Bar (Mobile only) */}
        <div className="lg:hidden">
          <AndroidTopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        </div>

        {/* Dynamic Page Content */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-24 lg:pb-8">
          {activeSidebarTab === 'Dashboard' ? (
            role === 'admin' ? (
              <AdminDashboard />
            ) : (
              <StudentDashboard />
            )
          ) : (
            <TabContentView />
          )}
        </main>

        {/* Mobile Material 3 Bottom Navigation Bar (Mobile only) */}
        <div className="lg:hidden">
          <AndroidBottomNav />
        </div>
      </div>

      {/* Global Modals & System Alerts */}
      <ModalsContainer />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <HostelProvider>
      <AppLayout />
    </HostelProvider>
  );
}

export default App;
