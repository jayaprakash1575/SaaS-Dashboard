import React, { useState } from 'react';
import { MoreHorizontal, ChevronDown, Check, Copy, ExternalLink, ArrowUpDown } from 'lucide-react';
import { recentOrders } from '../../data/mockData';

export const RecentOrdersTable = () => {
  const [orders] = useState(recentOrders);
  const [filter, setFilter] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (trackingNo) => {
    navigator.clipboard?.writeText(trackingNo);
    setCopiedId(trackingNo);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderProductThumbnail = (order) => {
    if (order.name === 'Camera Lens') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-[#E6F8FF] border border-cyan-100 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
          <div className="w-6 h-6 rounded-xl bg-[#1B2559] flex items-center justify-center p-1">
            <div className="w-3 h-3 rounded-full border-2 border-pink-400 bg-pink-500 animate-pulse" />
          </div>
        </div>
      );
    }
    if (order.name === 'Black Sleep Dress') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1B2559]">
            <path d="M8 2h8l-2 5 3 13H7l3-13L8 2z" />
          </svg>
        </div>
      );
    }
    if (order.name === 'Argan Oil') {
      return (
        <div className="w-10 h-10 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
          <div className="w-3.5 h-6 bg-amber-600 rounded-sm relative flex flex-col items-center">
            <div className="w-2 h-1.5 bg-slate-800 -mt-1 rounded-xs" />
            <div className="w-1.5 h-2.5 bg-white/70 mt-1.5 rounded-xs" />
          </div>
        </div>
      );
    }
    // EAU DE Parfum
    return (
      <div className="w-10 h-10 rounded-2xl bg-yellow-50 border border-yellow-200/80 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
        <div className="w-4 h-5 bg-amber-400 rounded-md relative flex flex-col items-center shadow-xs">
          <div className="w-2 h-1.5 bg-amber-600 -mt-1 rounded-full" />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(67,24,255,0.07)] transition-all duration-300 border border-slate-100/90 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#1B2559]">
              Recent Orders
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#F4F7FE] text-[#4318FF]">
              {orders.length} New
            </span>
          </div>
          <p className="text-xs text-[#A3AED0] font-semibold mt-0.5">
            Real-time fulfillment and tracking ledger
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#F4F7FE] rounded-xl self-start sm:self-auto text-xs font-bold">
          {['All', 'Delivered', 'Processing'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                filter === f
                  ? 'bg-white text-[#4318FF] shadow-xs'
                  : 'text-[#A3AED0] hover:text-[#1B2559]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto -mx-2 sm:mx-0">
        <table className="w-full text-left border-collapse min-w-[560px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-extrabold text-[#A3AED0] uppercase tracking-wider">
              <th className="pb-3 pr-3 select-none">
                <span className="inline-flex items-center gap-1 hover:text-[#4318FF] cursor-pointer">
                  Tracking no <ArrowUpDown className="w-3 h-3 text-slate-300" />
                </span>
              </th>
              <th className="pb-3 px-3 select-none">
                <span className="inline-flex items-center gap-1 hover:text-[#4318FF] cursor-pointer">
                  Product Name <ChevronDown className="w-3 h-3 text-slate-300" />
                </span>
              </th>
              <th className="pb-3 px-3 select-none">
                <span className="inline-flex items-center gap-1 hover:text-[#4318FF] cursor-pointer">
                  Price <ChevronDown className="w-3 h-3 text-slate-300" />
                </span>
              </th>
              <th className="pb-3 px-3 select-none">
                <span className="inline-flex items-center gap-1 hover:text-[#4318FF] cursor-pointer">
                  Total Order <ChevronDown className="w-3 h-3 text-slate-300" />
                </span>
              </th>
              <th className="pb-3 pl-3 text-right select-none">
                Total Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-xs sm:text-sm">
            {orders
              .filter((o) => filter === 'All' || o.status === filter)
              .map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-[#F8FAFC] transition-colors group"
                >
                  {/* Tracking no with copy */}
                  <td className="py-3.5 pr-3 font-bold text-[#2B3674]">
                    <button
                      onClick={() => handleCopy(order.trackingNo)}
                      title="Click to copy tracking ID"
                      className="inline-flex items-center gap-1.5 font-mono text-xs px-2 py-1 rounded-lg hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer group-hover:text-[#4318FF]"
                    >
                      <span>{order.trackingNo}</span>
                      {copiedId === order.trackingNo ? (
                        <Check className="w-3 h-3 text-emerald-500" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-60 transition-opacity" />
                      )}
                    </button>
                  </td>

                  {/* Product Name & Icon */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      {renderProductThumbnail(order)}
                      <div>
                        <span className="font-extrabold text-[#1B2559] block group-hover:text-[#4318FF] transition-colors">
                          {order.name}
                        </span>
                        <span className="text-[11px] text-[#A3AED0] font-semibold">
                          {order.category || 'Standard Delivery'}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="py-3.5 px-3 font-extrabold text-[#2B3674]">
                    {order.price}
                  </td>

                  {/* Total Order (Cyan pill badge as in Figma) */}
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-extrabold bg-[#E6F8FF] text-[#00A3FF] border border-cyan-100">
                      {order.totalOrder}
                    </span>
                  </td>

                  {/* Total Amount */}
                  <td className="py-3.5 pl-3 font-extrabold text-[#1B2559] text-right">
                    {order.totalAmount}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#A3AED0] font-semibold">
        <span>Showing 4 of 32 transactions</span>
        <button className="text-[#4318FF] hover:underline font-bold inline-flex items-center gap-1 cursor-pointer">
          View full ledger <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default RecentOrdersTable;
