import React from 'react';
import { X, Download, Printer, CheckCircle2, Building, Calendar, Mail, FileText } from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';

export const InvoiceDetailDrawer = ({ invoice, isOpen, onClose, onUpdateStatus }) => {
  if (!isOpen || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-lg bg-white shadow-2xl flex flex-col justify-between animate-slide-left">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center text-[#4318FF]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1B2559]">
                  Invoice {invoice.invoiceId}
                </h3>
                <p className="text-xs text-slate-400">Issued on {invoice.date}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Status & Amount Hero */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] border border-slate-200/60 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Due
                </span>
                <span className="text-3xl font-extrabold text-[#1B2559]">
                  {invoice.amount || '$3,450.00'}
                </span>
              </div>
              <Badge variant={invoice.status} size="lg">
                {invoice.status}
              </Badge>
            </div>

            {/* Client Info */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Billed To
              </h4>
              <div className="flex items-center gap-3.5 p-4 rounded-2xl border border-slate-100 bg-white shadow-xs">
                <img
                  src={invoice.avatar}
                  alt={invoice.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-50"
                />
                <div>
                  <h5 className="font-bold text-[#1B2559]">{invoice.name}</h5>
                  <p className="text-xs text-slate-500 mt-0.5">{invoice.email}</p>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Order Breakdown
              </h4>
              <div className="rounded-2xl border border-slate-100 divide-y divide-slate-100 overflow-hidden text-sm">
                <div className="p-3.5 flex justify-between bg-slate-50 font-bold text-xs text-slate-500">
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-slate-700">UI/UX SaaS Design System</span>
                  <span className="font-bold text-slate-900">$2,400.00</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-slate-700">Frontend React Implementation</span>
                  <span className="font-bold text-slate-900">$950.00</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-slate-700">Cloud Hosting & Setup</span>
                  <span className="font-bold text-slate-900">$100.00</span>
                </div>
                <div className="p-3.5 flex justify-between bg-slate-50/80 font-bold">
                  <span>Total</span>
                  <span className="text-[#4318FF]">{invoice.amount || '$3,450.00'}</span>
                </div>
              </div>
            </div>

            {/* Quick Status Toggles */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Update Status
              </h4>
              <div className="flex gap-2">
                {['Complete', 'Pending', 'Cancel'].map((st) => (
                  <button
                    key={st}
                    onClick={() => onUpdateStatus?.(invoice.id, st)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      invoice.status === st
                        ? 'border-[#4318FF] bg-[#F4F7FE] text-[#4318FF]'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Mark {st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center gap-3">
            <Button
              variant="secondary"
              icon={Download}
              className="flex-1 text-xs sm:text-sm"
              onClick={() => alert(`Downloading Invoice ${invoice.invoiceId} PDF...`)}
            >
              Download PDF
            </Button>
            <Button
              variant="primary"
              icon={Printer}
              className="flex-1 text-xs sm:text-sm"
              onClick={() => window.print()}
            >
              Print Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailDrawer;

