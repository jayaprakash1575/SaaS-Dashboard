import React from 'react';
import {
  LayoutGrid,
  BarChart2,
  FileText,
  Calendar,
  Clock,
  Activity,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Zap,
} from 'lucide-react';

export const Sidebar = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
  onUpgradeClick,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'invoice', label: 'Invoice', icon: FileText },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: Activity, badge: 49 },
    { id: 'notification', label: 'Notification', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 bg-white border-r border-slate-100 z-50 flex flex-col justify-between transition-all duration-300 ease-in-out select-none shadow-xs ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Top brand header */}
        <div>
          <div
            className={`flex items-center justify-between px-6 pt-7 pb-6 ${
              isCollapsed ? 'flex-col gap-4 px-2' : ''
            }`}
          >
            {/* Logo */}
            <div
              onClick={() => handleNavClick('dashboard')}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#4318FF] to-[#868CFF] flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 fill-white/20" />
              </div>
              {!isCollapsed && (
                <div className="flex flex-col">
                  <span className="text-xl font-black tracking-tight text-[#1B2559]">
                    HORIZON
                  </span>
                  <span className="text-[10px] font-bold text-[#A3AED0] tracking-widest uppercase -mt-1">
                    SaaS Studio
                  </span>
                </div>
              )}
            </div>

            {/* Collapse toggle (desktop) */}
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden lg:flex items-center justify-center w-7 h-7 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {isCollapsed && (
              <button
                onClick={() => setIsCollapsed(false)}
                className="hidden lg:flex items-center justify-center w-7 h-7 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer mt-1"
                title="Expand sidebar"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="px-3.5 space-y-1.5 mt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center rounded-2xl text-sm font-semibold transition-all duration-200 relative cursor-pointer group ${
                    isCollapsed
                      ? 'justify-center py-3.5 px-0'
                      : 'gap-3.5 px-4 py-3'
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-[#F4F7FE] to-indigo-50/50 text-[#4318FF] font-bold shadow-xs'
                      : 'text-[#707EAE] hover:text-[#1B2559] hover:bg-slate-50'
                  }`}
                >
                  {/* Active left indicator bar */}
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-[#4318FF] rounded-r-full" />
                  )}

                  <Icon
                    className={`w-5 h-5 shrink-0 transition-colors ${
                      isActive ? 'text-[#4318FF]' : 'text-[#707EAE] group-hover:text-[#1B2559]'
                    }`}
                  />

                  {!isCollapsed && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {/* Red badge for Messages */}
                  {item.badge && !isCollapsed && (
                    <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-[#FFEBEB] text-[#EF4444]">
                      {item.badge}
                    </span>
                  )}

                  {/* Red notification dot in collapsed mode */}
                  {item.badge && isCollapsed && (
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#EF4444] ring-2 ring-white" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3.5 space-y-3">
          {/* Hanging Lamp Upgrade Card */}
          {!isCollapsed && (
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#F5F8FF] via-[#EEF4FE] to-[#E5EDFD] p-4 text-center border border-indigo-100/60 shadow-xs">
              {/* Decorative Hanging Cone Lamp with Warm Glow */}
              <div className="relative w-full flex flex-col items-center mb-3">
                <div className="w-[1.5px] h-6 bg-slate-400" />
                <div className="w-14 h-7 bg-gradient-to-r from-[#4318FF] to-[#60A5FA] rounded-t-full relative flex items-center justify-center shadow-md">
                  <div className="w-16 h-8 bg-blue-400/40 blur-sm absolute -bottom-3 rounded-full" />
                </div>
                {/* Light beam triangle */}
                <div
                  className="w-24 h-10 bg-gradient-to-b from-blue-400/30 via-indigo-200/20 to-transparent blur-xs"
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 100%, 0% 100%)',
                  }}
                />
              </div>

              <div className="mb-3">
                <h4 className="text-xs font-extrabold text-[#1B2559]">
                  Level Up to PRO
                </h4>
                <p className="text-[11px] text-[#A3AED0] font-semibold mt-0.5">
                  Unlock unlimited team workspaces
                </p>
              </div>

              <button
                onClick={onUpgradeClick}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#4318FF] to-[#5833FF] hover:from-[#3713D6] hover:to-[#4318FF] text-white text-xs font-extrabold shadow-md shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-1.5 group"
              >
                <Zap className="w-3.5 h-3.5 fill-white/30 group-hover:scale-110 transition-transform" />
                <span>Upgrade Now</span>
              </button>
            </div>
          )}

          {/* User Profile Card */}
          <div
            className={`flex items-center gap-3 p-2 rounded-2xl bg-slate-50/80 border border-slate-100 ${
              isCollapsed ? 'flex-col items-center gap-2 p-1 bg-transparent border-none' : ''
            }`}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Easin Arafat"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-extrabold text-[#1B2559] truncate">
                  Easin Arafat
                </h4>
                <p className="text-[11px] text-[#A3AED0] font-semibold truncate">
                  Free Account
                </p>
              </div>
            )}

            <button
              onClick={() => alert('Signing out...')}
              className="text-slate-400 hover:text-rose-500 p-1.5 rounded-xl hover:bg-slate-200/50 transition-colors cursor-pointer"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
