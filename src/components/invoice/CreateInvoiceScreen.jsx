import React, { useState } from 'react';
import { Upload, Plus, Trash2, Printer, Download } from 'lucide-react';
import Button from '../common/Button';

export const CreateInvoiceScreen = ({ onInvoiceCreated }) => {
  const [invoiceId, setInvoiceId] = useState('#876364');
  const [date, setDate] = useState('12 Dec, 2020');
  const [clientName, setClientName] = useState('Arrora gaur');
  const [clientEmail, setClientEmail] = useState('arroragaur@gmail.com');
  const [clientAddress, setClientAddress] = useState('2443 Oak Ridge, Omaha, NE');

  const [items, setItems] = useState([
    { id: 1, name: 'SaaS UI/UX Design System', qty: 1, price: 1780 },
    { id: 2, name: 'Frontend React Development', qty: 1, price: 1200 },
    { id: 3, name: 'Cloud Infrastructure Setup', qty: 1, price: 470 },
  ]);

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleAddItem = () => {
    setItems([
      ...items,
      { id: Date.now(), name: 'New Custom Service', qty: 1, price: 250 },
    ]);
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Form: Create New Invoice (matching Figma screen_create_invoice) */}
        <div className="xl:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-100 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h2 className="text-xl font-bold text-[#1B2559]">
              Create New Invoice
            </h2>
            <div className="w-12 h-12 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400 hover:border-[#4880FF] transition-colors cursor-pointer">
              <Upload className="w-5 h-5" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Invoice Id
              </label>
              <input
                type="text"
                value={invoiceId}
                onChange={(e) => setInvoiceId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Client Name
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Client Email
              </label>
              <input
                type="email"
                value={clientEmail}
                onChange={(e) => setClientEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Address
              </label>
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none focus:ring-2 focus:ring-[#4880FF]/20"
              />
            </div>
          </div>

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Invoice Line Items
              </span>
              <button
                type="button"
                onClick={handleAddItem}
                className="text-xs font-bold text-[#4880FF] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-2">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => {
                      const newItems = items.map((i) =>
                        i.id === item.id ? { ...i, name: e.target.value } : i
                      );
                      setItems(newItems);
                    }}
                    className="flex-1 bg-transparent text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none"
                  />
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => {
                      const newItems = items.map((i) =>
                        i.id === item.id ? { ...i, qty: Number(e.target.value) } : i
                      );
                      setItems(newItems);
                    }}
                    className="w-12 px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs text-center"
                  />
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => {
                      const newItems = items.map((i) =>
                        i.id === item.id ? { ...i, price: Number(e.target.value) } : i
                      );
                      setItems(newItems);
                    }}
                    className="w-20 px-2 py-1 bg-white rounded-lg border border-slate-200 text-xs text-right font-bold"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 text-slate-400 hover:text-rose-500"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            className="w-full py-3 rounded-2xl text-sm font-bold shadow-md cursor-pointer"
            onClick={() => {
              alert(`Invoice ${invoiceId} issued successfully to ${clientName}!`);
              onInvoiceCreated?.();
            }}
          >
            Create Invoice
          </Button>
        </div>

        {/* Right Preview Card (matching Figma screen_create_invoice right paper preview) */}
        <div className="xl:col-span-6 bg-white rounded-3xl p-8 shadow-card border border-slate-100 space-y-6">
          <div className="flex items-center justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#4880FF] flex items-center justify-center text-white font-bold">
                B
              </div>
              <div>
                <h3 className="font-extrabold text-xl text-[#1B2559]">Base Inc.</h3>
                <p className="text-xs text-slate-400">Invoice {invoiceId}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Issued Date
              </span>
              <span className="text-sm font-bold text-[#1B2559]">{date}</span>
            </div>
          </div>

          {/* Billed To */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Billed To
            </span>
            <h4 className="text-base font-bold text-[#1B2559]">{clientName}</h4>
            <p className="text-xs text-slate-500 mt-0.5">{clientEmail}</p>
            <p className="text-xs text-slate-400 mt-0.5">{clientAddress}</p>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-slate-100 overflow-hidden text-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs font-bold text-slate-500 border-b border-slate-100">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((i) => (
                  <tr key={i.id}>
                    <td className="p-3 font-semibold text-slate-700">{i.name}</td>
                    <td className="p-3 text-center text-slate-600">{i.qty}</td>
                    <td className="p-3 text-right font-medium text-slate-600">${i.price.toLocaleString()}</td>
                    <td className="p-3 text-right font-bold text-slate-900">${(i.qty * i.price).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="space-y-2 pt-2 border-t border-slate-100 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-700">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Estimated Tax (10%)</span>
              <span className="font-semibold text-slate-700">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-extrabold text-[#1B2559] pt-2 border-t border-slate-100">
              <span>Total Amount</span>
              <span className="text-[#4880FF]">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <Button
              variant="secondary"
              icon={Download}
              className="flex-1"
              onClick={() => alert('Downloading invoice...')}
            >
              Download
            </Button>
            <Button
              variant="primary"
              icon={Printer}
              className="flex-1"
              onClick={() => window.print()}
            >
              Print
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoiceScreen;

