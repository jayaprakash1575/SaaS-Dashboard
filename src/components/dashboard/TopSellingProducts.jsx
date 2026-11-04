import React from 'react';
import { MoreHorizontal, Star, TrendingUp } from 'lucide-react';
import { topSellingProducts } from '../../data/mockData';

export const TopSellingProducts = () => {
  const rankColors = [
    { badge: 'bg-amber-100 text-amber-700 border-amber-200', text: '#1' },
    { badge: 'bg-slate-100 text-slate-700 border-slate-200', text: '#2' },
    { badge: 'bg-orange-100 text-orange-700 border-orange-200', text: '#3' },
  ];

  return (
    <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(67,24,255,0.07)] transition-all duration-300 border border-slate-100/90 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#1B2559]">
              Top Selling Products
            </h2>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
              High Demand
            </span>
          </div>
          <p className="text-xs text-[#A3AED0] font-semibold mt-0.5">
            Ranked by total order volume
          </p>
        </div>
        <button
          className="p-1.5 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-3.5 my-auto">
        {topSellingProducts.map((product, idx) => (
          <div
            key={product.id}
            className="flex items-center gap-3.5 p-2 rounded-2xl hover:bg-[#F8FAFC] transition-all cursor-pointer group border border-transparent hover:border-slate-100"
          >
            {/* Product Image Box with light blue container as in Figma & rank tag */}
            <div className="relative w-18 h-18 sm:w-20 sm:h-18 rounded-2xl bg-[#DCE7F9]/70 shrink-0 flex items-center justify-center p-2 transition-transform group-hover:scale-105 border border-blue-100/60">
              <span
                className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full border text-[10px] font-black flex items-center justify-center shadow-xs ${
                  rankColors[idx]?.badge || 'bg-slate-100 text-slate-600'
                }`}
              >
                {rankColors[idx]?.text || `#${idx + 1}`}
              </span>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#1B2559] truncate group-hover:text-[#4318FF] transition-colors">
                  {product.name}
                </h3>
                <span className="text-xs font-black text-[#1B2559] shrink-0">
                  {product.price}
                </span>
              </div>

              {/* Star ratings */}
              <div className="flex items-center gap-1.5 mt-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 fill-[#FBBF24] text-[#FBBF24]"
                    />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-[#A3AED0]">
                  (4.9)
                </span>
              </div>

              {/* Sales count & Stock status */}
              <div className="flex items-center justify-between mt-1 text-[11px] font-semibold text-[#A3AED0]">
                <span>{product.salesCount}</span>
                <span className="text-emerald-600 font-bold">In Stock</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#A3AED0] font-semibold">
        <span>Updated 12 mins ago</span>
        <button className="text-[#4318FF] hover:underline font-bold cursor-pointer">
          Manage Inventory
        </button>
      </div>
    </div>
  );
};

export default TopSellingProducts;
