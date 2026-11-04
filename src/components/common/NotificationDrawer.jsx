import React, { useState } from 'react';
import { X, Check, Bell, ShoppingBag, CreditCard, UserPlus, Zap } from 'lucide-react';
import { notificationsList } from '../../data/mockData';
import Button from './Button';

const iconMap = {
  'shopping-bag': ShoppingBag,
  'credit-card': CreditCard,
  'user-plus': UserPlus,
  zap: Zap,
};

export const NotificationDrawer = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(notificationsList);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-left">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#F4F7FE] text-[#4318FF] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[#1B2559]">Notifications</h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List Body */}
          <div className="p-4 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-50">
            {notifications.map((n) => {
              const IconComp = iconMap[n.icon] || Bell;

              return (
                <div
                  key={n.id}
                  className={`p-3.5 rounded-2xl transition-colors flex items-start gap-3.5 ${
                    n.read ? 'bg-white opacity-80' : 'bg-[#F4F7FE]/60 font-semibold'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-bold text-[#1B2559]">{n.title}</h5>
                    <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{n.description}</p>
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">{n.time}</span>
                  </div>
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-[#4318FF] mt-1 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Footer Action */}
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
            <button
              onClick={markAllAsRead}
              className="text-xs font-bold text-[#4318FF] hover:text-[#3311CC] flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
            <Button size="sm" variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDrawer;

