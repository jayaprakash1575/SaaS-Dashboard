import React, { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, Calendar, Sparkles } from 'lucide-react';

const datasetByPeriod = {
  Day: [
    { time: '10am', value: 54, sales: 1420 },
    { time: '11am', value: 32, sales: 1100 },
    { time: '12am', value: 56, sales: 2190, hasDot: true },
    { time: '01am', value: 36, sales: 1740, hasDot: true },
    { time: '02am', value: 24, sales: 1210 },
    { time: '03am', value: 68, sales: 2678, isPeak: true, hasDot: true },
    { time: '04am', value: 14, sales: 840 },
    { time: '05am', value: 34, sales: 1530, hasDot: true },
    { time: '06am', value: 68, sales: 2710, hasDot: true },
    { time: '07am', value: 72, sales: 2890 },
  ],
  Week: [
    { time: 'Mon', value: 45, sales: 12800 },
    { time: 'Tue', value: 58, sales: 15600, hasDot: true },
    { time: 'Wed', value: 38, sales: 11400 },
    { time: 'Thu', value: 72, sales: 19800, hasDot: true },
    { time: 'Fri', value: 85, sales: 24500, isPeak: true, hasDot: true },
    { time: 'Sat', value: 62, sales: 17200, hasDot: true },
    { time: 'Sun', value: 48, sales: 13900 },
  ],
  Month: [
    { time: 'Week 1', value: 42, sales: 48200 },
    { time: 'Week 2', value: 65, sales: 74100, hasDot: true },
    { time: 'Week 3', value: 88, sales: 98600, isPeak: true, hasDot: true },
    { time: 'Week 4', value: 76, sales: 84300, hasDot: true },
  ],
};

export const ReportsChart = () => {
  const [period, setPeriod] = useState('Day');
  const [data, setData] = useState(datasetByPeriod.Day);
  const [hoveredIndex, setHoveredIndex] = useState(5);

  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
    const newData = datasetByPeriod[newPeriod] || datasetByPeriod.Day;
    setData(newData);
    setHoveredIndex(Math.floor(newData.length / 2));
  };

  const width = 640;
  const height = 270;
  const paddingX = 40;
  const paddingY = 35;
  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  const yTicks = [100, 80, 60, 40, 20, 0];

  const points = data.map((d, i) => {
    const x = paddingX + (i / (data.length - 1)) * chartWidth;
    const y = paddingY + chartHeight - (d.value / 100) * chartHeight;
    return { ...d, x, y };
  });

  const generateSmoothPath = (pts) => {
    if (pts.length === 0) return '';
    let path = `M ${pts[0].x} ${pts[0].y}`;

    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const linePath = generateSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  const activePoint = points[hoveredIndex] || points[Math.min(5, points.length - 1)];

  return (
    <div className="bg-white rounded-[24px] p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(67,24,255,0.07)] transition-all duration-300 border border-slate-100/90 flex flex-col justify-between h-full">
      {/* Header with Title, Period Switchers, and Mini Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#1B2559]">
              Reports Overview
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              <ArrowUpRight className="w-3 h-3 stroke-[2.5]" />
              +18.4%
            </span>
          </div>
          <p className="text-xs text-[#A3AED0] font-semibold mt-0.5">
            Real-time analytics and transaction velocity
          </p>
        </div>

        {/* Timeframe switch pills */}
        <div className="flex items-center gap-1 p-1 bg-[#F4F7FE] rounded-xl self-start sm:self-auto">
          {['Day', 'Week', 'Month'].map((p) => (
            <button
              key={p}
              onClick={() => handlePeriodChange(p)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                period === p
                  ? 'bg-white text-[#4318FF] shadow-xs'
                  : 'text-[#A3AED0] hover:text-[#1B2559]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden select-none flex-1 flex items-center pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto max-h-[300px] overflow-visible"
        >
          <defs>
            <linearGradient id="reportsAreaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4318FF" stopOpacity="0.22" />
              <stop offset="60%" stopColor="#818CF8" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#C084FC" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="reportsLineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="35%" stopColor="#4318FF" />
              <stop offset="70%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>

            <filter id="tooltipShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.30" floodColor="#0B1437" />
            </filter>
          </defs>

          {/* Horizontal grid lines & Y labels */}
          {yTicks.map((val) => {
            const y = paddingY + chartHeight - (val / 100) * chartHeight;
            return (
              <g key={val}>
                <text
                  x={paddingX - 14}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#A3AED0] text-[11px] font-semibold"
                >
                  {val}
                </text>
                <line
                  x1={paddingX}
                  y1={y}
                  x2={width - paddingX}
                  y2={y}
                  stroke="#F4F7FE"
                  strokeWidth="1.2"
                />
              </g>
            );
          })}

          {/* Faint Area fill */}
          <path d={areaPath} fill="url(#reportsAreaGradient)" />

          {/* Dotted Guideline for active point */}
          {activePoint && (
            <line
              x1={activePoint.x}
              y1={activePoint.y}
              x2={activePoint.x}
              y2={height - paddingY}
              stroke="#4318FF"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          )}

          {/* Spline Stroke Curve */}
          <path
            d={linePath}
            fill="none"
            stroke="url(#reportsLineGradient)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Node dots */}
          {points.map((pt, i) => {
            const shouldShowDot = pt.hasDot || hoveredIndex === i;
            const isHovered = hoveredIndex === i;

            return (
              <g
                key={pt.time}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(i)}
                onClick={() => setHoveredIndex(i)}
              >
                <circle cx={pt.x} cy={pt.y} r="18" fill="transparent" />

                {shouldShowDot && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isHovered ? 6 : 4.5}
                    fill="#FFFFFF"
                    stroke={isHovered ? '#4318FF' : '#818CF8'}
                    strokeWidth={isHovered ? 3.5 : 2.5}
                    className="transition-all duration-150"
                  />
                )}
              </g>
            );
          })}

          {/* X-axis time labels */}
          {points.map((pt, i) => (
            <text
              key={pt.time}
              x={pt.x}
              y={height - paddingY + 22}
              textAnchor="middle"
              className={`text-[12px] font-semibold cursor-pointer transition-colors ${
                hoveredIndex === i ? 'fill-[#4318FF] font-extrabold' : 'fill-[#A3AED0]'
              }`}
              onMouseEnter={() => setHoveredIndex(i)}
            >
              {pt.time}
            </text>
          ))}

          {/* Tooltip Pill */}
          {activePoint && (
            <g
              transform={`translate(${activePoint.x}, ${activePoint.y - 48})`}
              className="pointer-events-none transition-transform duration-200"
              filter="url(#tooltipShadow)"
            >
              <rect
                x="-40"
                y="-18"
                width="80"
                height="38"
                rx="12"
                fill="#0B1437"
              />
              <path
                d="M -5 20 L 0 25 L 5 20 Z"
                fill="#0B1437"
              />
              <text
                x="0"
                y="-3"
                textAnchor="middle"
                className="fill-slate-300 text-[10px] font-medium"
              >
                {activePoint.time} • Sales
              </text>
              <text
                x="0"
                y="13"
                textAnchor="middle"
                className="fill-white text-[13px] font-bold"
              >
                {activePoint.sales?.toLocaleString()}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Bottom Summary Bar */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-[#A3AED0] font-semibold">
        <span>Peak Sales: <strong className="text-[#1B2559]">2,890 units</strong></span>
        <span>Avg Response: <strong className="text-[#01B574]">98.6%</strong></span>
      </div>
    </div>
  );
};

export default ReportsChart;
