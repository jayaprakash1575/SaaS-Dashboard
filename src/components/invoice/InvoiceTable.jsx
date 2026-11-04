import React, { useState, useMemo } from 'react';
import {
  Search,
  Plus,
  Trash2,
  Star,
  MoreHorizontal,
  Calendar as CalendarIcon,
  CheckCircle2,
  ArrowUpDown,
  Filter,
  CheckSquare,
  Square,
  ChevronDown,
  Download,
  Eye
} from 'lucide-react';
import { initialInvoices } from '../../data/mockData';
import Badge from '../common/Badge';
import Button from '../common/Button';
import SearchInput from '../common/SearchInput';

export const InvoiceTable = ({ onAddNewInvoice, onViewInvoice }) => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set(['inv-3', 'inv-4', 'inv-6', 'inv-10']));
  const [statusFilter, setStatusFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortField, setSortField] = useState('date');
  const [sortAsc, setSortAsc] = useState(false);

  const filteredInvoices = useMemo(() => {
    return invoices
      .filter((inv) => {
        const matchesSearch =
          inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inv.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          inv.invoiceId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === 'All' || inv.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];
        if (sortAsc) return valA > valB ? 1 : -1;
        return valA < valB ? 1 : -1;
      });
  }, [invoices, searchQuery, statusFilter, sortField, sortAsc]);

  const isAllSelected =
    filteredInvoices.length > 0 &&
    filteredInvoices.every((inv) => selectedIds.has(inv.id));

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredInvoices.map((inv) => inv.id)));
    }
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const toggleStar = (id) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, starred: !inv.starred } : inv))
    );
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    if (window.confirm(`Delete ${selectedIds.size} selected invoice(s)?`)) {
      setInvoices((prev) => prev.filter((inv) => !selectedIds.has(inv.id)));
      setSelectedIds(new Set());
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Invoice Metrics Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-[22px] p-4.5 border border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
          <p className="text-xs font-extrabold text-[#A3AED0] uppercase tracking-wider">Total Invoiced</p>
          <h3 className="text-2xl font-black text-[#1B2559] mt-1 tracking-tight">$84,250.00</h3>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 text-[11px] font-semibold text-slate-400">
            <span>12 Documents</span>
            <span className="text-indigo-600 font-bold">All time</span>
          </div>
        </div>
        <div className="bg-white rounded-[22px] p-4.5 border border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
          <p className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">Paid / Settled</p>
          <h3 className="text-2xl font-black text-emerald-600 mt-1 tracking-tight">$59,100.00</h3>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 text-[11px] font-semibold text-emerald-600">
            <span>8 Cleared</span>
            <span className="font-bold">70% Rate</span>
          </div>
        </div>
        <div className="bg-white rounded-[22px] p-4.5 border border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
          <p className="text-xs font-extrabold text-amber-500 uppercase tracking-wider">Pending Action</p>
          <h3 className="text-2xl font-black text-amber-500 mt-1 tracking-tight">$18,750.00</h3>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 text-[11px] font-semibold text-amber-600">
            <span>3 Invoices</span>
            <span className="font-bold">Within 7 days</span>
          </div>
        </div>
        <div className="bg-white rounded-[22px] p-4.5 border border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow">
          <p className="text-xs font-extrabold text-rose-500 uppercase tracking-wider">Cancelled</p>
          <h3 className="text-2xl font-black text-rose-500 mt-1 tracking-tight">$6,400.00</h3>
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-50 text-[11px] font-semibold text-rose-500">
            <span>1 Voided</span>
            <span className="font-bold">Write-off</span>
          </div>
        </div>
      </div>

      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Dropdown Filter (Matching Figma Invoice List-Dropdown) */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 shadow-xs hover:border-slate-300 transition-colors cursor-pointer"
            >
              <span>Status: <strong className="text-[#4318FF]">{statusFilter}</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Figma Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute left-0 top-12 z-30 bg-white rounded-2xl shadow-popup border border-slate-100 p-2 w-48 animate-fade-in">
                {['All', 'Complete', 'Pending', 'Cancel'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setStatusFilter(st);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-bold rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#F4F7FE] text-[#4318FF]'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{st}</span>
                    {st !== 'All' && <Badge variant={st} size="sm">{st}</Badge>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-100 shadow-xs">
            {['All', 'Complete', 'Pending', 'Cancel'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#4318FF] text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Add New */}
        <div className="flex items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search invoice, client..."
            className="w-full sm:w-60"
          />

          <Button
            onClick={onAddNewInvoice}
            variant="primary"
            icon={Plus}
            className="whitespace-nowrap px-4 py-2.5 rounded-2xl shadow-sm text-xs sm:text-sm font-bold cursor-pointer"
          >
            Add New
          </Button>
        </div>
      </div>

      {/* Invoices Table Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-slate-100 overflow-hidden">
        {/* Bulk Action Sub-header */}
        {selectedIds.size > 0 && (
          <div className="flex items-center justify-between bg-[#F4F7FE] px-4 py-2.5 rounded-2xl mb-4 animate-fade-in">
            <span className="text-xs sm:text-sm font-bold text-[#4318FF]">
              {selectedIds.size} invoice(s) selected
            </span>
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Selected</span>
            </button>
          </div>
        )}

        <div className="overflow-x-auto -mx-2 sm:mx-0">
          <table className="w-full text-left border-collapse min-w-[760px]">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-[#A3AED0] uppercase tracking-wider">
                <th className="pb-4 pl-3 pr-2 w-10">
                  <button
                    onClick={toggleSelectAll}
                    className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {isAllSelected ? (
                      <CheckSquare className="w-4 h-4 text-[#4318FF]" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-300" />
                    )}
                  </button>
                </th>

                <th
                  onClick={() => handleSort('invoiceId')}
                  className="pb-4 px-3 cursor-pointer hover:text-slate-700 select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    Invoice Id <ArrowUpDown className="w-3 h-3 text-slate-300" />
                  </span>
                </th>

                <th
                  onClick={() => handleSort('name')}
                  className="pb-4 px-3 cursor-pointer hover:text-slate-700 select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    Name <ArrowUpDown className="w-3 h-3 text-slate-300" />
                  </span>
                </th>

                <th
                  onClick={() => handleSort('email')}
                  className="pb-4 px-3 cursor-pointer hover:text-slate-700 select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    Email <ArrowUpDown className="w-3 h-3 text-slate-300" />
                  </span>
                </th>

                <th
                  onClick={() => handleSort('date')}
                  className="pb-4 px-3 cursor-pointer hover:text-slate-700 select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    Date <ArrowUpDown className="w-3 h-3 text-slate-300" />
                  </span>
                </th>

                <th
                  onClick={() => handleSort('status')}
                  className="pb-4 px-3 cursor-pointer hover:text-slate-700 select-none"
                >
                  <span className="inline-flex items-center gap-1">
                    Status <ArrowUpDown className="w-3 h-3 text-slate-300" />
                  </span>
                </th>

                <th className="pb-4 pr-3 text-right">
                  <Trash2 className="w-4 h-4 text-slate-300 inline" />
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50 text-sm">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    No invoices found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const isSelected = selectedIds.has(inv.id);

                  return (
                    <tr
                      key={inv.id}
                      className={`group transition-all duration-150 ${
                        isSelected ? 'bg-[#F4F7FE]/70' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 pl-3 pr-2">
                        <button
                          onClick={() => toggleSelectRow(inv.id)}
                          className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {isSelected ? (
                            <div className="w-4 h-4 rounded bg-[#4318FF] flex items-center justify-center text-white">
                              <svg
                                viewBox="0 0 24 24"
                                className="w-3 h-3 stroke-current stroke-[3] fill-none"
                              >
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            </div>
                          ) : (
                            <div className="w-4 h-4 rounded border-2 border-slate-300 group-hover:border-slate-400" />
                          )}
                        </button>
                      </td>

                      {/* Invoice ID */}
                      <td
                        onClick={() => onViewInvoice?.(inv)}
                        className="py-3.5 px-3 font-bold text-[#2B3674] cursor-pointer hover:text-[#4318FF]"
                      >
                        {inv.invoiceId}
                      </td>

                      {/* Customer Name & Avatar */}
                      <td
                        onClick={() => onViewInvoice?.(inv)}
                        className="py-3.5 px-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={inv.avatar}
                            alt={inv.name}
                            className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-slate-100"
                          />
                          <span className="font-bold text-[#1B2559]">
                            {inv.name}
                          </span>
                        </div>
                      </td>

                      {/* Email with green check icon */}
                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-[#E8F8EE] flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#22C55E]" />
                          </span>
                          <span className="truncate max-w-[180px] sm:max-w-none">
                            {inv.email}
                          </span>
                        </div>
                      </td>

                      {/* Date with calendar icon */}
                      <td className="py-3.5 px-3 text-slate-600 font-medium">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4 text-[#4880FF] shrink-0" />
                          <span>{inv.date}</span>
                        </div>
                      </td>

                      {/* Status pill badge */}
                      <td className="py-3.5 px-3">
                        <Badge variant={inv.status}>
                          {inv.status}
                        </Badge>
                      </td>

                      {/* Star & Actions Menu */}
                      <td className="py-3.5 pr-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => toggleStar(inv.id)}
                            className="p-1 rounded-lg text-slate-300 hover:text-[#FBBF24] transition-colors cursor-pointer"
                            title={inv.starred ? 'Starred' : 'Star invoice'}
                          >
                            <Star
                              className={`w-4 h-4 ${
                                inv.starred
                                  ? 'fill-[#FBBF24] text-[#FBBF24]'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>

                          <button
                            onClick={() => onViewInvoice?.(inv)}
                            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Actions"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination & Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-100 mt-4 text-xs font-semibold text-slate-400">
          <span>
            Showing 1-{filteredInvoices.length} of {invoices.length} entries
          </span>
          <div className="flex items-center gap-1.5">
            <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer disabled:opacity-50">
              Previous
            </button>
            <button className="px-3 py-1.5 rounded-xl bg-[#4318FF] text-white font-bold">
              1
            </button>
            <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
              2
            </button>
            <button className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceTable;
