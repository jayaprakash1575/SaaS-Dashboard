import React from 'react';
import { kpiStats } from '../../data/mockData';
import StatCard from './StatCard';
import ReportsChart from './ReportsChart';
import AnalyticsDonut from './AnalyticsDonut';
import RecentOrdersTable from './RecentOrdersTable';
import TopSellingProducts from './TopSellingProducts';

export const DashboardOverview = ({ onNavigate }) => {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* 4 Stat Cards Grid (matching Figma preview 2 top row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        {kpiStats.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            subtitle={stat.subtitle}
            sparkline={stat.sparkline}
            icon={stat.icon}
            iconBg={stat.iconBg}
            iconColor={stat.iconColor}
            glowColor={stat.glowColor}
            onClick={() => onNavigate?.('analytics')}
          />
        ))}
      </div>

      {/* Middle Section: Reports Chart (8 cols) + Analytics Donut (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <ReportsChart />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <AnalyticsDonut />
        </div>
      </div>

      {/* Bottom Section: Recent Orders (8 cols) + Top Selling Products (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-8 flex flex-col">
          <RecentOrdersTable />
        </div>
        <div className="lg:col-span-4 flex flex-col">
          <TopSellingProducts />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
