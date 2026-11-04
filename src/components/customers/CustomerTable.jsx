import React, { useState } from 'react';
import {
  Search,
  Plus,
  Mail,
  Phone,
  Building,
  MoreHorizontal,
  ChevronRight,
  UserPlus,
  X,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { customersData } from '../../data/mockData';
import Badge from '../common/Badge';
import Button from '../common/Button';
import SearchInput from '../common/SearchInput';

export const CustomerTable = ({ onOpenAddCustomer }) => {
  const [customers, setCustomers] = useState(customersData);
  const [selectedCustomer, setSelectedCustomer] = useState(customersData[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B2559]">
            Customer Management
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Active verified client accounts and spending metrics
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search customers..."
            className="w-full sm:w-64"
          />
          <Button
            variant="primary"
            icon={UserPlus}
            onClick={onOpenAddCustomer}
            className="whitespace-nowrap px-4 py-2.5 rounded-2xl shadow-sm text-xs sm:text-sm font-bold cursor-pointer"
          >
            Add Customer
          </Button>
        </div>
      </div>

      {/* Grid: Customer Table on Left, Customer Profile Panel on Right (matching Figma crop_customers) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Table Column (7 or 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-3xl p-5 sm:p-7 shadow-card border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-[#A3AED0] uppercase tracking-wider">
                  <th className="pb-4 px-3">Customer</th>
                  <th className="pb-4 px-3">Position</th>
                  <th className="pb-4 px-3">Total Spent</th>
                  <th className="pb-4 px-3">Status</th>
                  <th className="pb-4 pr-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {filteredCustomers.map((cust) => {
                  const isSelected = selectedCustomer?.id === cust.id;

                  return (
                    <tr
                      key={cust.id}
                      onClick={() => setSelectedCustomer(cust)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-[#F4F7FE]' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={cust.avatar}
                            alt={cust.name}
                            className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-100"
                          />
                          <div>
                            <span className="font-bold text-[#1B2559] block">
                              {cust.name}
                            </span>
                            <span className="text-xs text-slate-400">
                              {cust.email}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-3">
                        <span className="font-semibold text-slate-700 block">
                          {cust.position}
                        </span>
                        <span className="text-xs text-slate-400">
                          {cust.company}
                        </span>
                      </td>

                      <td className="py-3.5 px-3 font-bold text-[#1B2559]">
                        {cust.totalSpent}
                      </td>

                      <td className="py-3.5 px-3">
                        <Badge
                          variant={cust.status === 'Active' ? 'Complete' : 'Cancel'}
                          size="sm"
                        >
                          {cust.status}
                        </Badge>
                      </td>

                      <td className="py-3.5 pr-3 text-right">
                        <ChevronRight
                          className={`w-4 h-4 inline transition-transform ${
                            isSelected ? 'text-[#4318FF] translate-x-1' : 'text-slate-300'
                          }`}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Customer Details Card (matching Figma customer detail panel) */}
        {selectedCustomer && (
          <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex flex-col items-center text-center animate-fade-in">
            {/* Avatar & Basic Info */}
            <div className="relative mb-3">
              <img
                src={selectedCustomer.avatar}
                alt={selectedCustomer.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-[#4318FF]/20 shadow-md"
              />
              <span className="absolute bottom-0 right-1 w-5 h-5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            <h3 className="text-lg font-bold text-[#1B2559]">
              {selectedCustomer.name}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              {selectedCustomer.position} • {selectedCustomer.company}
            </p>

            {/* Quick Contact Icons */}
            <div className="flex items-center gap-2 mt-4 w-full">
              <a
                href={`mailto:${selectedCustomer.email}`}
                className="flex-1 py-2 px-3 rounded-xl bg-[#F4F7FE] text-[#4318FF] hover:bg-[#E9EDF7] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
              <a
                href={`tel:${selectedCustomer.phone}`}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>

            {/* Spending & Orders Stat */}
            <div className="w-full grid grid-cols-2 gap-3 my-5 p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-center">
                <span className="text-xs text-slate-400 font-bold block">
                  Total Spent
                </span>
                <span className="text-base font-extrabold text-[#1B2559]">
                  {selectedCustomer.totalSpent}
                </span>
              </div>
              <div className="text-center border-l border-slate-200">
                <span className="text-xs text-slate-400 font-bold block">
                  Total Orders
                </span>
                <span className="text-base font-extrabold text-[#1B2559]">
                  {selectedCustomer.ordersCount}
                </span>
              </div>
            </div>

            {/* Activity Sparkline Bars (as in Figma crop_customers) */}
            <div className="w-full text-left mb-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Activity History
              </span>
              <div className="flex items-end justify-between h-20 gap-2 px-3 pt-2 bg-slate-50 rounded-2xl">
                {selectedCustomer.chartData.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-[#4880FF] hover:bg-[#4318FF] rounded-t-md transition-all duration-300"
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] font-bold text-slate-400">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'][idx]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Mini Circular Gauges (Matching Figma customer profile panel bottom gauges) */}
            <div className="w-full grid grid-cols-2 gap-3 pt-2 border-t border-slate-100 mb-4">
              <div className="flex flex-col items-center p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#FDE68A"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3.5"
                      strokeDasharray="75, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-extrabold text-amber-700">75%</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 mt-1">Goal Metric</span>
              </div>

              <div className="flex flex-col items-center p-2 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#C7D2FE"
                      strokeWidth="3.5"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4318FF"
                      strokeWidth="3.5"
                      strokeDasharray="88, 100"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-extrabold text-indigo-700">88%</span>
                </div>
                <span className="text-[10px] font-bold text-slate-500 mt-1">Retention</span>
              </div>
            </div>

            <Button
              variant="secondary"
              className="w-full text-xs font-bold cursor-pointer"
              onClick={() => alert(`Editing profile for ${selectedCustomer.name}`)}
            >
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerTable;
