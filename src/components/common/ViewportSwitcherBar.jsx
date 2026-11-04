import React, { useState } from 'react';
import { Monitor, Tablet, Smartphone, Maximize2, ChevronDown, ChevronUp, Sliders } from 'lucide-react';

export const ViewportSwitcherBar = ({ activeMode, setActiveMode }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const modes = [
    { id: 'fluid', label: 'Responsive', icon: Maximize2, desc: 'Auto-adapts to your browser width' },
    { id: 'desktop', label: 'Desktop', icon: Monitor, desc: '1440 × 900 px view' },
    { id: 'tablet', label: 'Tablet', icon: Tablet, desc: '768 × 1024 px view' },
    { id: 'mobile', label: 'Mobile', icon: Smartphone, desc: '390 × 844 px view' },
  ];

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 backdrop-blur-md text-white rounded-full shadow-2xl border border-slate-700/60 hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer active:scale-95 group"
          title="Open Device Viewport Bar"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Device Viewport:</span>
          <span className="font-mono text-emerald-300 capitalize">{activeMode}</span>
          <ChevronUp className="w-3.5 h-3.5 opacity-60 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all select-none max-w-[95vw]">
      <div className="bg-slate-900/90 backdrop-blur-md border border-slate-700/70 px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-2 text-white">
        <div className="flex items-center gap-2 pl-2 pr-1 hidden sm:flex">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-bold text-slate-300">
            Preview Mode:
          </span>
        </div>

        {/* Device Switcher Pills */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-800/80 rounded-full">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = activeMode === mode.id;

            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                title={mode.desc}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#4318FF] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="hidden xs:inline sm:inline">{mode.label}</span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setIsMinimized(true)}
          className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
          title="Minimize bar"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ViewportSwitcherBar;
