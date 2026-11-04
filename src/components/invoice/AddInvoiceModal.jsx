import React, { useState } from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';

export const AddInvoiceModal = ({ isOpen, onClose, onAddInvoice }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    status: 'Pending',
    date: '10 Nov, 2026',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newInvoice = {
      id: `inv-${Date.now()}`,
      invoiceId: `#${Math.floor(100000 + Math.random() * 900000)}`,
      name: formData.name,
      email: formData.email,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 50000000)}?w=100&auto=format&fit=crop&q=80`,
      date: formData.date || 'Today',
      status: formData.status,
      starred: false,
      amount: formData.amount ? `$${formData.amount}` : '$1,200.00',
    };

    onAddInvoice(newInvoice);
    onClose();
    setFormData({
      name: '',
      email: '',
      amount: '',
      status: 'Pending',
      date: '10 Nov, 2026',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Invoice"
      subtitle="Issue a new invoice to client or team"
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Client Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Sarah Connor"
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
            placeholder="client@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Amount ($)
            </label>
            <input
              type="number"
              placeholder="1200"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 bg-white"
            >
              <option value="Complete">Complete</option>
              <option value="Pending">Pending</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
            Date
          </label>
          <input
            type="text"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Invoice
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddInvoiceModal;

