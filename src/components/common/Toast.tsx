import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useHostel } from '../../context/HostelContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useHostel();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 text-white shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-xs font-semibold">{toastMessage}</span>
    </div>
  );
};
