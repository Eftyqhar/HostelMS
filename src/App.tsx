import React, { useState } from 'react';
import { HostelProvider, useHostel } from './context/HostelContext';
import { AndroidStatusBar } from './components/android/AndroidStatusBar';
import { AndroidTopBar } from './components/android/AndroidTopBar';
import { AndroidBottomNav } from './components/android/AndroidBottomNav';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { TabContentView } from './components/common/TabContentView';
import { ModalsContainer } from './components/modals/ModalsContainer';
import { Toast } from './components/common/Toast';
import { Smartphone, Maximize2, Minimize2 } from 'lucide-react';

const AndroidAppLayout: React.FC = () => {
  const { role, activeSidebarTab, darkMode } = useHostel();

  // Desktop view toggle: Phone mockup frame vs Edge-to-Edge mobile
  const [deviceFrameMode, setDeviceFrameMode] = useState(true);

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-900 text-slate-800'
      } flex flex-col items-center justify-center p-0 md:p-6 lg:p-8 selection:bg-blue-500 selection:text-white`}
    >
      {/* Desktop Helper Toolbar (Only shown on medium/large screens) */}
      <div className="hidden md:flex items-center justify-between w-full max-w-[480px] mb-3 px-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-blue-400" />
          <span className="font-semibold text-slate-300">HostelMS Android App</span>
        </div>

        <button
          onClick={() => setDeviceFrameMode(!deviceFrameMode)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold transition-all cursor-pointer shadow-xs"
        >
          {deviceFrameMode ? (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Width</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Android Device Outer Wrapper */}
      <div
        className={`w-full transition-all duration-300 relative flex flex-col overflow-hidden ${
          deviceFrameMode
            ? 'max-w-[440px] h-[92vh] max-h-[920px] rounded-none md:rounded-[48px] border-0 md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]'
            : 'max-w-2xl h-screen md:h-[95vh] rounded-none md:rounded-3xl border-0 md:border-2 md:border-slate-800'
        } ${darkMode ? 'bg-slate-900' : 'bg-[#f8fafc]'}`}
      >
        {/* Android Native Status Bar */}
        <AndroidStatusBar />

        {/* Android Material 3 Top App Bar */}
        <AndroidTopBar />

        {/* Android App Scrollable Screen Content */}
        <main className="flex-1 overflow-y-auto overscroll-contain p-3.5 sm:p-4 space-y-4">
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

        {/* Android Bottom Navigation Bar (No Drawer Menu) */}
        <AndroidBottomNav />

        {/* Global Dialogs & Alerts (Rendered within the Android App Viewport) */}
        <ModalsContainer />
        <Toast />
      </div>
    </div>
  );
};

export function App() {
  return (
    <HostelProvider>
      <AndroidAppLayout />
    </HostelProvider>
  );
}

export default App;
