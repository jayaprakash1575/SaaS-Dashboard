import React from 'react';
import { Heart, Gamepad2, ShoppingBag, Briefcase, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap = {
  heart: Heart,
  gamepad: Gamepad2,
  'shopping-bag': ShoppingBag,
  briefcase: Briefcase,
};

export const StatCard = ({
  title,
  value,
  change = '+12.4%',
  trend = 'up',
  subtitle = 'vs last month',
  sparkline = [20, 35, 25, 45, 40, 60, 55, 75],
  icon,
  iconBg,
  iconColor,
  glowColor,
  onClick,
}) => {
  const IconComponent = iconMap[icon] || Heart;

  // Generate mini SVG sparkline
  const maxVal = Math.max(...sparkline, 1);
  const minVal = Math.min(...sparkline, 0);
  const range = maxVal - minVal || 1;
  const width = 80;
  const height = 28;
  const points = sparkline
    .map((v, i) => {
      const x = (i / (sparkline.length - 1)) * width;
      const y = height - ((v - minVal) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  const strokeColor = trend === 'up' ? '#01B574' : '#EE5D50';

  return (
    <div
      onClick={onClick}
      className="relative bg-white rounded-[24px] p-5 lg:p-5 xl:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(67,24,255,0.08)] hover:-translate-y-1 transition-all duration-300 border border-slate-100/90 flex flex-col justify-between cursor-pointer group select-none overflow-hidden"
    >
      {/* Background ambient decorative aura on hover */}
      <div
        className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: glowColor || 'rgba(67, 24, 255, 0.08)' }}
      />

      {/* Top row: Icon and Trend Pill */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div
          className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 shadow-xs ${iconBg}`}
        >
          <IconComponent className={`w-6 h-6 sm:w-6.5 sm:h-6.5 ${iconColor}`} />
        </div>

        {/* Trend badge */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold tracking-tight shrink-0 transition-transform group-hover:scale-105 ${
            trend === 'up'
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              : 'bg-rose-50 text-rose-600 border border-rose-100'
          }`}
        >
          {trend === 'up' ? (
            <TrendingUp className="w-3 h-3 stroke-[2.5]" />
          ) : (
            <TrendingDown className="w-3 h-3 stroke-[2.5]" />
          )}
          <span>{change}</span>
        </div>
      </div>

      {/* Bottom row: Value, Title, and Mini Sparkline */}
      <div className="flex items-end justify-between gap-2 mt-auto">
        <div className="min-w-0">
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1B2559] group-hover:text-[#4318FF] transition-colors leading-tight">
            {value}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-[#A3AED0] mt-0.5 truncate">
            {title}
          </p>
        </div>

        {/* Mini Sparkline Chart */}
        <div className="shrink-0 opacity-70 group-hover:opacity-100 transition-opacity pb-1">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
