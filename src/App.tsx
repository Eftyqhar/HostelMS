import React from 'react';
import { HostelProvider, useHostel } from './context/HostelContext';
import { AndroidTopBar } from './components/android/AndroidTopBar';
import { AndroidBottomNav } from './components/android/AndroidBottomNav';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TabContentView } from './components/common/TabContentView';
import { ModalsContainer } from './components/modals/ModalsContainer';
import { Toast } from './components/common/Toast';

const AppLayout: React.FC = () => {
  const { role, activeSidebarTab, darkMode } = useHostel();

  return (
    <div
      className={`min-h-screen w-full flex flex-col transition-colors ${
        darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-800'
      }`}
    >
      {/* Top App Bar (Native App Style Header) */}
      <AndroidTopBar />

      {/* Main Full-Width Responsive App Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 pb-24">
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

      {/* Bottom Navigation Bar (No Drawer Menu) */}
      <AndroidBottomNav />

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
