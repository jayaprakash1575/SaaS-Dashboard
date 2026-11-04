import React, { useState } from 'react';
import { X, Upload, User, Mail, Phone, Briefcase, Building } from 'lucide-react';
import Button from '../common/Button';

export const AddCustomerDrawer = ({ isOpen, onClose, onAddCustomer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    company: '',
    gender: 'Female',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newCust = {
      id: `c-${Date.now()}`,
      name: formData.name,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      email: formData.email,
      phone: formData.phone || '+1 555 019 2831',
      position: formData.position || 'Product Manager',
      gender: formData.gender,
      company: formData.company || 'Modern SaaS Inc.',
      totalSpent: '$0.00',
      ordersCount: 0,
      status: 'Active',
      joinDate: 'Just now',
      chartData: [20, 30, 45, 60, 40, 80, 65],
    };

    onAddCustomer?.(newCust);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-slide-left">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1B2559]">Add Customer</h3>
              <p className="text-xs text-slate-400">Register new client account</p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body (matching Figma Add Customer panel) */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
            {/* Avatar Upload circle */}
            <div className="flex flex-col items-center justify-center py-2">
              <div className="w-24 h-24 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-[#4318FF] hover:text-[#4318FF] transition-colors cursor-pointer group">
                <Upload className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-bold">Upload Photo</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Eleanor Pena"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="eleanor.pena@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Position
                </label>
                <input
                  type="text"
                  placeholder="UI Lead"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Company Name
              </label>
              <input
                type="text"
                placeholder="Acme Studio"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
              />
            </div>

            {/* Footer Buttons */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Add Customer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerDrawer;

