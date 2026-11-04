import React, { useState } from 'react';
import { MoreHorizontal, PieChart, Sparkles } from 'lucide-react';
import { analyticsData } from '../../data/mockData';

export const AnalyticsDonut = () => {
  const [activeSegment, setActiveSegment] = useState(null);

  const size = 250;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  const displayPercentage = activeSegment ? `${activeSegment.percentage}%` : `${analyticsData.percentage}%`;
  const displayLabel = activeSegment ? activeSegment.name : analyticsData.label;

  const segmentAmounts = {
    Sale: '$64,800',
    Distribute: '$35,100',
    Return: '$35,100',
  };

  return (
    <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(67,24,255,0.07)] transition-all duration-300 border border-slate-100/90 flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg sm:text-xl font-extrabold text-[#1B2559]">
            Transaction Split
          </h2>
          <p className="text-xs text-[#A3AED0] font-semibold mt-0.5">
            Distribution & Fulfillment Breakdown
          </p>
        </div>
        <button
          className="p-1.5 rounded-xl bg-slate-50 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          title="More options"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* SVG Donut Center */}
      <div className="relative flex items-center justify-center my-auto py-3">
        <svg width={size} height={size} className="transform -rotate-90 overflow-visible">
          <defs>
            <filter id="donutGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.15" floodColor="#4318FF" />
            </filter>
          </defs>

          {/* Background circle track */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#F4F7FE"
            strokeWidth={strokeWidth}
          />

          {/* Segments */}
          {analyticsData.segments.map((seg, idx) => {
            const gap = 12;
            const segLength = (seg.percentage / 100) * circumference - gap;
            const strokeDasharray = `${Math.max(segLength, 0)} ${circumference}`;

            const prevTotal = analyticsData.segments
              .slice(0, idx)
              .reduce((acc, curr) => acc + curr.percentage, 0);
            const offset = -((prevTotal / 100) * circumference);

            const isHovered = activeSegment?.name === seg.name;

            return (
              <circle
                key={seg.name}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={offset}
                strokeLinecap="round"
                filter={isHovered ? 'url(#donutGlow)' : undefined}
                className="transition-all duration-300 cursor-pointer"
                onMouseEnter={() => setActiveSegment(seg)}
                onMouseLeave={() => setActiveSegment(null)}
              />
            );
          })}
        </svg>

        {/* Center Animated Readout */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#1B2559] tracking-tight transition-all duration-200">
            {displayPercentage}
          </span>
          <span className="text-xs font-bold text-[#A3AED0] mt-0.5 tracking-wide uppercase transition-all duration-200">
            {displayLabel}
          </span>
          {activeSegment && (
            <span className="text-xs font-bold text-[#4318FF] mt-0.5 animate-fade-in">
              {segmentAmounts[activeSegment.name]}
            </span>
          )}
        </div>
      </div>

      {/* Legend Footer with hover chips */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
        {analyticsData.segments.map((seg) => {
          const isHovered = activeSegment?.name === seg.name;
          return (
            <button
              key={seg.name}
              onMouseEnter={() => setActiveSegment(seg)}
              onMouseLeave={() => setActiveSegment(null)}
              className={`flex flex-col items-center p-2 rounded-xl transition-all cursor-pointer text-center ${
                isHovered ? 'bg-slate-50 ring-1 ring-slate-200 shadow-2xs' : 'hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-xs font-bold text-[#1B2559]">{seg.name}</span>
              </div>
              <span className="text-[11px] font-semibold text-[#A3AED0]">
                {seg.percentage}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AnalyticsDonut;
