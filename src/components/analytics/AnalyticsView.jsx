import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  DollarSign,
  Users,
  ShoppingCart,
  ArrowUpRight,
  Download,
  Calendar
} from 'lucide-react';
import Button from '../common/Button';

export const AnalyticsView = () => {
  const [metricTab, setMetricTab] = useState('Revenue');

  const channels = [
    { name: 'Organic Search', percentage: 42, visitors: '42,910', color: '#4318FF' },
    { name: 'Direct Traffic', percentage: 28, visitors: '28,150', color: '#00B5FF' },
    { name: 'Referral & Partner', percentage: 18, visitors: '18,400', color: '#22C55E' },
    { name: 'Social Media', percentage: 12, visitors: '12,230', color: '#F59E0B' },
  ];

  const monthlyBars = [
    { month: 'Jan', revenue: 45, profit: 30 },
    { month: 'Feb', revenue: 60, profit: 42 },
    { month: 'Mar', revenue: 75, profit: 55 },
    { month: 'Apr', revenue: 65, profit: 48 },
    { month: 'May', revenue: 90, profit: 70 },
    { month: 'Jun', revenue: 85, profit: 64 },
    { month: 'Jul', revenue: 95, profit: 78 },
    { month: 'Aug', revenue: 80, profit: 60 },
    { month: 'Sep', revenue: 100, profit: 82 },
    { month: 'Oct', revenue: 110, profit: 89 },
    { month: 'Nov', revenue: 125, profit: 98 },
    { month: 'Dec', revenue: 115, profit: 92 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B2559]">
            Analytics & Performance Insights
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Financial revenue velocity, conversion funnels & retention
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            icon={Download}
            onClick={() => alert('Exporting Analytics Report as CSV...')}
            className="text-xs sm:text-sm font-bold"
          >
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
          <div className="flex items-center justify-between text-[#A3AED0] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Gross MRR</span>
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-[#4318FF] flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">$148,920</h3>
            <span className="text-xs font-bold text-emerald-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +24.8%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Compared to last month</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
          <div className="flex items-center justify-between text-[#A3AED0] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Subscribers</span>
            <div className="w-8 h-8 rounded-full bg-sky-50 text-[#00B5FF] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">28,490</h3>
            <span className="text-xs font-bold text-emerald-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +14.2%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Active paying seats</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
          <div className="flex items-center justify-between text-[#A3AED0] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Avg. Order Value</span>
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">$324.50</h3>
            <span className="text-xs font-bold text-emerald-500 flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> +8.1%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Across all store channels</p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
          <div className="flex items-center justify-between text-[#A3AED0] mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Net Churn Rate</span>
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1B2559]">1.18%</h3>
            <span className="text-xs font-bold text-emerald-500 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" /> -0.4%
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">Healthy benchmark &lt; 2.5%</p>
        </div>
      </div>

      {/* Main Bar Chart: Revenue vs Profit */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-xl font-bold text-[#1B2559]">Annual Revenue & Profit Velocity</h3>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Monthly performance overview in 2026</p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-3 h-3 rounded-full bg-[#4318FF]" />
              <span>Revenue ($k)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="w-3 h-3 rounded-full bg-[#00B5FF]" />
              <span>Net Profit ($k)</span>
            </div>
          </div>
        </div>

        {/* Custom Responsive SVG Bar Chart */}
        <div className="h-64 flex items-end justify-between gap-2 pt-6 pb-2 px-2">
          {monthlyBars.map((bar) => (
            <div key={bar.month} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full flex items-end justify-center gap-1 h-48">
                {/* Revenue Bar */}
                <div
                  className="w-1/2 max-w-[18px] bg-[#4318FF] hover:bg-[#3311CC] rounded-t-lg transition-all duration-300 relative group/bar"
                  style={{ height: `${(bar.revenue / 130) * 100}%` }}
                >
                  <span className="opacity-0 group-hover/bar:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded font-bold pointer-events-none transition-opacity whitespace-nowrap">
                    ${bar.revenue}k
                  </span>
                </div>

                {/* Profit Bar */}
                <div
                  className="w-1/2 max-w-[18px] bg-[#00B5FF] hover:bg-sky-500 rounded-t-lg transition-all duration-300 relative group/bar"
                  style={{ height: `${(bar.profit / 130) * 100}%` }}
                >
                  <span className="opacity-0 group-hover/bar:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-0.5 px-1.5 rounded font-bold pointer-events-none transition-opacity whitespace-nowrap">
                    ${bar.profit}k
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-400 group-hover:text-[#1B2559] transition-colors">
                {bar.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Traffic Sources & Conversion Channel Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100">
          <h3 className="text-lg font-bold text-[#1B2559] mb-4">Traffic Channel Share</h3>
          <div className="space-y-4">
            {channels.map((ch) => (
              <div key={ch.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">{ch.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{ch.visitors} visitors</span>
                    <span className="text-[#1B2559] font-extrabold">{ch.percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${ch.percentage}%`,
                      backgroundColor: ch.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[#1B2559] mb-1">Conversion Goals</h3>
            <p className="text-xs text-slate-400 font-medium mb-4">Target threshold benchmarks</p>
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-emerald-900">Checkout Conversion</h5>
                  <p className="text-xs text-emerald-700">7.8% conversion rate (+1.4% vs benchmark)</p>
                </div>
                <span className="text-lg font-extrabold text-emerald-600">102%</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-100 flex items-center justify-between">
                <div>
                  <h5 className="text-sm font-bold text-indigo-900">Trial to Paid Expansion</h5>
                  <p className="text-xs text-indigo-700">18.4% user upgrade rate</p>
                </div>
                <span className="text-lg font-extrabold text-[#4318FF]">94%</span>
              </div>
            </div>
          </div>

          <Button
            variant="soft"
            className="w-full mt-4 text-xs font-bold"
            onClick={() => alert('Navigating to Detailed Conversion Funnel')}
          >
            Explore Full Funnel Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;

