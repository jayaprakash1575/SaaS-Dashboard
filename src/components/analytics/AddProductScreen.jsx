import React, { useState } from 'react';
import { Upload, Plus, TrendingUp, MoreHorizontal, Check, X } from 'lucide-react';
import Button from '../common/Button';
import Badge from '../common/Badge';

export const AddProductScreen = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [name, setName] = useState('');
  const [size, setSize] = useState('Medium');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');

  const [products, setProducts] = useState([
    {
      id: 1,
      rank: 1,
      name: 'Black Watch Pattern',
      category: 'Accessories',
      price: '$120.00',
      totalSales: '$42,500',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      rank: 2,
      name: 'White Sport Sneaker',
      category: 'Footwear',
      price: '$89.00',
      totalSales: '$38,200',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      rank: 3,
      name: 'Leather Minimalist Bag',
      category: 'Bags',
      price: '$145.00',
      totalSales: '$31,800',
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&auto=format&fit=crop&q=80',
    },
    {
      id: 4,
      rank: 4,
      name: 'Air Wireless Headphones',
      category: 'Electronics',
      price: '$199.00',
      totalSales: '$28,400',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&auto=format&fit=crop&q=80',
    },
  ]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!name || !price) return;

    const newP = {
      id: Date.now(),
      rank: products.length + 1,
      name,
      category: size,
      price: `$${price}`,
      totalSales: '$0.00',
      status: 'In Stock',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&auto=format&fit=crop&q=80',
    };

    setProducts([newP, ...products]);
    setName('');
    setPrice('');
    setDesc('');
    alert(`Product ${name} added successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* Left Side: Product Analytics Overview */}
        <div className={`${drawerOpen ? 'xl:col-span-8' : 'xl:col-span-12'} space-y-6 transition-all`}>
          {/* Top 2 Big Cards (Total Sales $1,25,978 & Total Profit $1,14,000 as in Figma) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Sales
                </span>
                <h3 className="text-3xl font-extrabold text-[#1B2559]">
                  $1,25,978
                </h3>
                <span className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> +16.8% from last month
                </span>
              </div>
              {/* Mini wave sparkline */}
              <div className="w-24 h-12">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <path
                    d="M 0 30 Q 25 10, 50 25 T 100 5"
                    fill="none"
                    stroke="#4880FF"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Total Profit
                </span>
                <h3 className="text-3xl font-extrabold text-[#1B2559]">
                  $1,14,000
                </h3>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1 mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> +12.4% net margin
                </span>
              </div>
              <div className="w-24 h-12">
                <svg viewBox="0 0 100 40" className="w-full h-full">
                  <path
                    d="M 0 35 Q 30 15, 60 20 T 100 8"
                    fill="none"
                    stroke="#F9B115"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Top Selling Products Table */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1B2559]">Top Selling Products</h2>
              {!drawerOpen && (
                <Button
                  variant="primary"
                  icon={Plus}
                  size="sm"
                  onClick={() => setDrawerOpen(true)}
                >
                  Add Product
                </Button>
              )}
            </div>

            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-slate-100 text-xs font-bold text-[#A3AED0] uppercase">
                    <th className="pb-3 px-3">#</th>
                    <th className="pb-3 px-3">Product</th>
                    <th className="pb-3 px-3">Price</th>
                    <th className="pb-3 px-3">Total Sales</th>
                    <th className="pb-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 text-sm">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-3 font-bold text-slate-400">
                        #{p.rank}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-9 h-9 rounded-xl object-cover"
                          />
                          <div>
                            <span className="font-bold text-[#1B2559] block">{p.name}</span>
                            <span className="text-[11px] text-slate-400">{p.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-3 font-bold text-[#1B2559]">{p.price}</td>
                      <td className="py-3.5 px-3 font-semibold text-slate-700">{p.totalSales}</td>
                      <td className="py-3.5 px-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#E8F8EE] text-[#22C55E]">
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Add New Product Drawer (matching Figma screen_add_product) */}
        {drawerOpen && (
          <div className="xl:col-span-4 bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-[#1B2559]">Add New Product</h3>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              {/* Product Photo Upload */}
              <div className="flex justify-center py-2">
                <div className="w-20 h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-[#4880FF] hover:text-[#4880FF] transition-colors cursor-pointer">
                  <Upload className="w-5 h-5 mb-1" />
                  <span className="text-[10px] font-bold">Upload</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silk Comfort Jacket"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Size
                  </label>
                  <select
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                  >
                    <option value="Small">Small</option>
                    <option value="Medium">Medium</option>
                    <option value="Large">Large</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="120"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Short description of the item..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4880FF] focus:outline-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3 rounded-2xl text-sm font-bold shadow-md cursor-pointer"
              >
                + Add Product
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProductScreen;

