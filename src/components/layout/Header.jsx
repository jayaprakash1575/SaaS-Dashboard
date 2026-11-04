import React, { useState } from 'react';
import {
  Menu,
  ChevronDown,
  Calendar,
  Grid,
  Search,
  Bell,
  Sparkles,
  Check,
  CheckCircle2,
  Clock,
  Layers,
} from 'lucide-react';

export const Header = ({
  title,
  onOpenMobileSidebar,
  currentScreenKey,
  onSelectScreen,
  allScreens,
}) => {
  const [startDate, setStartDate] = useState('10-06-2021');
  const [endDate, setEndDate] = useState('10-10-2021');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showScreenDropdown, setShowScreenDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications = [
    {
      id: 1,
      title: 'New order received (#876364)',
      time: '12m ago',
      type: 'order',
      unread: true,
    },
    {
      id: 2,
      title: 'Invoice #1002 paid by Apple Inc',
      time: '1h ago',
      type: 'invoice',
      unread: true,
    },
    {
      id: 3,
      title: 'New customer registration (Sarah Connor)',
      time: '3h ago',
      type: 'crm',
      unread: false,
    },
  ];

  return (
    <header className="px-4 sm:px-6 lg:px-8 pt-5 pb-4 sticky top-0 z-30 bg-[#F8FAFC]/90 backdrop-blur-md transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 max-w-[1600px] mx-auto w-full">
        {/* Left: Breadcrumbs & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileSidebar}
            className="lg:hidden p-2 rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:text-slate-900 shadow-xs cursor-pointer active:scale-95 transition-transform"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#A3AED0] uppercase tracking-wider">
              <span>Pages</span>
              <span>/</span>
              <span className="text-[#4318FF]">{title}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#1B2559]">
              {title}
            </h1>
          </div>
        </div>

        {/* Right: Search, Date Pickers, Notifications & Figma Screen Catalogue */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Search bar */}
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search anything..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-14 py-2 w-48 lg:w-56 rounded-full bg-white border border-slate-200/80 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 focus:border-[#4318FF] transition-all shadow-2xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">
              ⌘K
            </span>
          </div>

          {/* Quick Figma Screen Showcase Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowScreenDropdown(!showScreenDropdown)}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#F4F7FE] text-[#4318FF] hover:bg-[#E9EDF7] text-xs font-bold transition-all cursor-pointer border border-indigo-100 shadow-2xs active:scale-95"
              title="Jump to any screen from Figma canvas"
            >
              <Grid className="w-3.5 h-3.5 text-[#4318FF]" />
              <span className="hidden sm:inline">Views:</span>
              <span className="max-w-[100px] sm:max-w-[130px] truncate">
                {allScreens?.find((s) => s.id === currentScreenKey)?.label.replace(/^\d+\.\s*/, '') || 'Dashboard'}
              </span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {showScreenDropdown && (
              <div className="absolute right-0 top-11 z-50 bg-white rounded-2xl shadow-popup border border-slate-100 p-2 w-72 max-h-88 overflow-y-auto animate-fade-in">
                <div className="px-2 py-1.5 mb-1 flex items-center justify-between border-b border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    Figma Canvas Screens
                  </span>
                  <span className="text-[10px] font-bold text-[#4318FF] bg-[#F4F7FE] px-2 py-0.5 rounded-full">
                    17 Views
                  </span>
                </div>
                {allScreens?.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onSelectScreen(s.id);
                      setShowScreenDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                      currentScreenKey === s.id
                        ? 'bg-[#4318FF] text-white font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">{s.label}</span>
                    <span
                      className={`text-[10px] shrink-0 font-normal ${
                        currentScreenKey === s.id ? 'text-white/80' : 'text-slate-400'
                      }`}
                    >
                      {s.category}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Two Date Pickers as in Figma preview_2 / preview_3 */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{startDate}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-slate-200/90 text-xs font-bold text-slate-700 shadow-2xs hover:border-slate-300 transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{endDate}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
          </div>

          {/* Notifications Bell Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-full bg-white border border-slate-200/90 text-slate-600 hover:text-slate-900 shadow-2xs cursor-pointer relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#EE5D50] ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-11 z-50 bg-white rounded-2xl shadow-popup border border-slate-100 p-3 w-80 animate-fade-in">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-extrabold text-[#1B2559]">Notifications</span>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    2 New
                  </span>
                </div>
                <div className="space-y-1.5">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-2.5 rounded-xl text-xs transition-colors flex items-start gap-2.5 ${
                        n.unread ? 'bg-[#F4F7FE]' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-[#4318FF] mt-1.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[#1B2559] truncate">{n.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Date preset dropdown */}
      {showDatePicker && (
        <div className="absolute right-6 top-18 z-40 bg-white rounded-2xl shadow-popup border border-slate-100 p-3 w-64 animate-fade-in">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Preset Range
          </p>
          <div className="space-y-1">
            <button
              onClick={() => {
                setStartDate('10-06-2021');
                setEndDate('10-10-2021');
                setShowDatePicker(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              Default: 10-06-2021 to 10-10-2021
            </button>
            <button
              onClick={() => {
                setStartDate('01-11-2026');
                setEndDate('07-11-2026');
                setShowDatePicker(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              This Week
            </button>
            <button
              onClick={() => {
                setStartDate('01-10-2026');
                setEndDate('31-10-2026');
                setShowDatePicker(false);
              }}
              className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl hover:bg-slate-50 text-slate-700 cursor-pointer"
            >
              Last Month
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
