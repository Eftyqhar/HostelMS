import React, { useState } from 'react';
import { HostelProvider, useHostel } from './context/HostelContext';
import { Sidebar } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TabContentView } from './components/common/TabContentView';
import { ModalsContainer } from './components/modals/ModalsContainer';
import { Toast } from './components/common/Toast';

const MainLayout: React.FC = () => {
  const { role, activeSidebarTab, darkMode } = useHostel();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`min-h-screen transition-colors ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-[#f8fafc] text-slate-800'}`}>
      {/* Navigation Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto">
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
      </div>

      {/* Global Modals and Notifications */}
      <ModalsContainer />
      <Toast />
    </div>
  );
};

export function App() {
  return (
    <HostelProvider>
      <MainLayout />
    </HostelProvider>
  );
}

export default App;
