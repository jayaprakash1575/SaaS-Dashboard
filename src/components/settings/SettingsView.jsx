import React, { useState } from 'react';
import { User, Bell, Shield, CreditCard, Sparkles, Check, Save } from 'lucide-react';
import Button from '../common/Button';

export const SettingsView = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState('Easin Arafat');
  const [email, setEmail] = useState('easin.arafat@base.io');
  const [role, setRole] = useState('Product Lead & Founder');
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Settings Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#1B2559]">Settings & Preferences</h2>
        <p className="text-xs text-slate-400 font-medium">Manage your personal profile, credentials and notifications</p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto">
        {[
          { id: 'profile', label: 'My Profile', icon: User },
          { id: 'security', label: 'Security & 2FA', icon: Shield },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'billing', label: 'Plan & Billing', icon: CreditCard },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#4318FF] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Profile */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6 max-w-3xl">
          <div className="flex items-center gap-5 pb-6 border-b border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=140&auto=format&fit=crop&q=80"
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-50 shadow-md"
            />
            <div>
              <h4 className="text-base font-bold text-[#1B2559]">{name}</h4>
              <p className="text-xs text-slate-400">{role}</p>
              <button
                type="button"
                className="mt-2 text-xs font-bold text-[#4318FF] hover:underline cursor-pointer"
              >
                Change photo
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Timezone
              </label>
              <select className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white">
                <option>UTC+00:00 (London, Dublin)</option>
                <option>UTC-05:00 (Eastern Time, NY)</option>
                <option>UTC+05:30 (India Standard Time)</option>
                <option>UTC+08:00 (Singapore, Tokyo)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {savedSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <Check className="w-4 h-4" /> Profile updated successfully!
              </span>
            ) : <span />}

            <Button type="submit" variant="primary" icon={Save}>
              Save Changes
            </Button>
          </div>
        </form>
      )}

      {/* Tab 2: Security */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6 max-w-3xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h4 className="text-sm font-bold text-[#1B2559]">Two-Factor Authentication (2FA)</h4>
              <p className="text-xs text-slate-400 mt-0.5">Secure your login with hardware keys or Authenticator app</p>
            </div>
            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                twoFactor ? 'bg-[#4318FF]' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                  twoFactor ? 'right-1' : 'left-1'
                }`}
              />
            </button>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-[#1B2559]">Change Password</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
              <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
            <Button variant="primary" size="sm" onClick={() => alert('Password updated!')}>
              Update Password
            </Button>
          </div>
        </div>
      )}

      {/* Tab 3: Notifications */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-4 max-w-3xl">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <h5 className="text-sm font-bold text-[#1B2559]">Email Order Confirmations</h5>
              <p className="text-xs text-slate-400">Receive instant alerts when a client pays an invoice</p>
            </div>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={(e) => setEmailAlerts(e.target.checked)}
              className="w-4 h-4 text-[#4318FF] rounded"
            />
          </div>

          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div>
              <h5 className="text-sm font-bold text-[#1B2559]">Weekly Growth Digest</h5>
              <p className="text-xs text-slate-400">Receive a weekly summary email with analytics trends</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#4318FF] rounded" />
          </div>

          <div className="flex items-center justify-between py-2">
            <div>
              <h5 className="text-sm font-bold text-[#1B2559]">New Task Assignment Alerts</h5>
              <p className="text-xs text-slate-400">Notify when someone mentions you in a Kanban task card</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-[#4318FF] rounded" />
          </div>
        </div>
      )}

      {/* Tab 4: Billing */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6 max-w-3xl">
          <div className="p-5 rounded-2xl bg-[#F4F7FE] border border-indigo-100 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Current Plan</span>
              <h4 className="text-xl font-extrabold text-[#1B2559] mt-0.5">Free Starter Tier</h4>
              <p className="text-xs text-slate-500 mt-1">Limited to 10 invoices and 3 active team seats</p>
            </div>
            <Button variant="primary">Upgrade to Pro</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsView;

