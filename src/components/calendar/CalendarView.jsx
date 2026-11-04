import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Calendar as CalendarIcon,
  Check,
  CalendarDays,
  List
} from 'lucide-react';
import { calendarEvents } from '../../data/mockData';
import Button from '../common/Button';
import Modal from '../common/Modal';

export const CalendarView = () => {
  const [events, setEvents] = useState(calendarEvents);
  const [viewMode, setViewMode] = useState('month'); // 'day' | 'month' | 'year'
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 4)); // November 2026
  const [selectedDay, setSelectedDay] = useState(4);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('10:00 AM - 11:30 AM');
  const [newEventCategory, setNewEventCategory] = useState('Work');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsList = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Days in November 2026
  const totalDays = 30;
  const startDayOffset = 3; // Nov 1 is Wednesday

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle) return;

    const colors = [
      { color: 'bg-indigo-500', lightColor: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
      { color: 'bg-sky-500', lightColor: 'bg-sky-50 text-sky-700 border-sky-200' },
      { color: 'bg-amber-500', lightColor: 'bg-amber-50 text-amber-700 border-amber-200' },
      { color: 'bg-emerald-500', lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    ];
    const picked = colors[Math.floor(Math.random() * colors.length)];

    const newEv = {
      id: `ev-${Date.now()}`,
      title: newEventTitle,
      date: `2026-11-${String(selectedDay).padStart(2, '0')}`,
      time: newEventTime,
      category: newEventCategory,
      ...picked,
    };

    setEvents([...events, newEv]);
    setIsCreateModalOpen(false);
    setNewEventTitle('');
  };

  // Hourly slots for Day View (matching Figma Calendar day)
  const dayHours = [
    '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM'
  ];

  const dayScheduleBlocks = [
    { hour: '08:00 AM', title: 'Design Standup', duration: '08:30 - 09:30 AM', color: 'bg-[#FF7A50]', text: 'text-white' },
    { hour: '11:00 AM', title: 'Sprint Review & Sync', duration: '11:00 AM - 12:30 PM', color: 'bg-[#00B5FF]', text: 'text-white' },
    { hour: '01:00 PM', title: 'Client Demo: Acme Corp', duration: '01:00 - 02:00 PM', color: 'bg-[#FF5B5B]', text: 'text-white' },
    { hour: '02:00 PM', title: 'Frontend Architecture Sync', duration: '02:30 - 03:45 PM', color: 'bg-[#22C55E]', text: 'text-white' },
    { hour: '04:00 PM', title: 'Executive Roadmap Sync', duration: '04:30 - 05:30 PM', color: 'bg-[#4880FF]', text: 'text-white' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header with View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#1B2559]">
            Calendar & Schedule
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Manage company deadlines, sprints and product milestones
          </p>
        </div>

        {/* View Switcher Pills: Day, Month, Year */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-100 shadow-xs">
            <button
              onClick={() => setViewMode('day')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'day'
                  ? 'bg-[#4318FF] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'month'
                  ? 'bg-[#4318FF] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setViewMode('year')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                viewMode === 'year'
                  ? 'bg-[#4318FF] text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Year
            </button>
          </div>

          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsCreateModalOpen(true)}
            className="whitespace-nowrap px-4 py-2 rounded-2xl shadow-sm text-xs sm:text-sm font-bold cursor-pointer"
          >
            Create Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Mini Calendar & Upcoming Deadlines */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          {/* Mini Calendar Card */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-[#1B2559]">November 2026</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevMonth}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextMonth}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400 mb-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {[...Array(startDayOffset)].map((_, i) => (
                <div key={`empty-${i}`} className="p-2 text-slate-300">
                  {28 + i}
                </div>
              ))}
              {[...Array(totalDays)].map((_, i) => {
                const day = i + 1;
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center font-semibold transition-all cursor-pointer mx-auto ${
                      isSelected
                        ? 'bg-[#4318FF] text-white shadow-md shadow-[#4318FF]/20 font-bold'
                        : 'text-[#2B3674] hover:bg-slate-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Upcoming Schedule List */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100">
            <h3 className="text-sm font-bold text-[#1B2559] mb-3">
              Upcoming Deadlines
            </h3>
            <div className="space-y-3">
              {events.slice(0, 4).map((ev) => (
                <div
                  key={ev.id}
                  className="p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1B2559]">
                      {ev.title}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#4880FF]" />
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    <span>{ev.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Month, Day or Year View */}
        <div className="lg:col-span-8 xl:col-span-9 bg-white rounded-3xl p-6 shadow-card border border-slate-100">
          {/* VIEW 1: MONTH VIEW */}
          {viewMode === 'month' && (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-[#1B2559]">
                    November 2026
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#F4F7FE] text-[#4318FF] font-bold">
                    {events.length} Events
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-[#A3AED0]">
                {daysOfWeek.map((d) => (
                  <div key={d} className="py-1">
                    {d}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 min-h-[460px]">
                {[...Array(startDayOffset)].map((_, i) => (
                  <div
                    key={`empty-cell-${i}`}
                    className="min-h-[90px] rounded-2xl bg-slate-50/50 p-2 text-xs text-slate-300"
                  >
                    {28 + i}
                  </div>
                ))}

                {[...Array(totalDays)].map((_, i) => {
                  const day = i + 1;
                  const dateStr = `2026-11-${String(day).padStart(2, '0')}`;
                  const dayEvents = events.filter((ev) => ev.date === dateStr);
                  const isToday = day === 4;

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`min-h-[90px] rounded-2xl p-2 border transition-all cursor-pointer flex flex-col justify-between ${
                        selectedDay === day
                          ? 'border-[#4318FF] bg-[#F4F7FE]/40 ring-1 ring-[#4318FF]/20'
                          : 'border-slate-100 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                            isToday
                              ? 'bg-[#4318FF] text-white shadow-xs'
                              : 'text-[#1B2559]'
                          }`}
                        >
                          {day}
                        </span>
                      </div>

                      <div className="space-y-1 mt-1 overflow-hidden">
                        {dayEvents.map((ev) => (
                          <div
                            key={ev.id}
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-lg truncate border ${ev.lightColor}`}
                            title={`${ev.title} (${ev.time})`}
                          >
                            {ev.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 2: DAY VIEW (Matching Figma Calendar day screen) */}
          {viewMode === 'day' && (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1B2559]">
                    November {selectedDay}, 2026
                  </h3>
                  <p className="text-xs text-slate-400">Detailed day timeline and hourly slots</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedDay(Math.min(30, selectedDay + 1))}
                    className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hourly Timeline */}
              <div className="space-y-4">
                {dayHours.map((hour) => {
                  const block = dayScheduleBlocks.find((b) => b.hour === hour);

                  return (
                    <div key={hour} className="flex items-start gap-4 group">
                      <span className="w-20 text-xs font-bold text-slate-400 pt-1 shrink-0">
                        {hour}
                      </span>
                      <div className="flex-1 min-h-[48px] border-t border-slate-100 group-hover:border-slate-200 transition-colors pt-1">
                        {block ? (
                          <div
                            className={`p-3.5 rounded-2xl shadow-xs flex items-center justify-between ${block.color} ${block.text} animate-fade-in`}
                          >
                            <div>
                              <h4 className="text-sm font-bold">{block.title}</h4>
                              <p className="text-xs opacity-90 mt-0.5">{block.duration}</p>
                            </div>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-white/20 font-semibold backdrop-blur-xs">
                              Confirmed
                            </span>
                          </div>
                        ) : (
                          <div className="h-8 rounded-xl border border-dashed border-transparent hover:border-slate-200 hover:bg-slate-50 transition-all flex items-center px-3 text-xs text-slate-300">
                            + Add event at {hour}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 3: YEAR VIEW (Matching Figma Calendar year screen: 12 mini months grid) */}
          {viewMode === 'year' && (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <h3 className="text-xl font-bold text-[#1B2559]">
                    Year 2026 Overview
                  </h3>
                  <p className="text-xs text-slate-400">12-Month Sprints and Milestones</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {monthsList.map((m, mIdx) => (
                  <div
                    key={m}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-xs transition-all bg-white"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold text-[#1B2559] uppercase tracking-wider">{m} 2026</h4>
                      {mIdx === 10 && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E0F2FE] text-[#0284C7]">
                          Current
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 text-center text-[9px] font-bold text-slate-300 mb-1">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                        <div key={i}>{d}</div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-0.5 text-center text-[10px]">
                      {[...Array(mIdx % 5)].map((_, i) => (
                        <div key={`empty-${i}`} className="p-1 text-transparent">-</div>
                      ))}
                      {[...Array(30)].map((_, i) => {
                        const day = i + 1;
                        const isHighlight = mIdx === 10 && (day === 4 || day === 12 || day === 24);

                        return (
                          <div
                            key={day}
                            className={`p-1 rounded-full font-medium ${
                              isHighlight
                                ? 'bg-[#4318FF] text-white font-bold'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {day}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Event Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Schedule Event"
        subtitle="Add a new event or meeting"
      >
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Event Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design Review Meeting"
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Time Interval
              </label>
              <input
                type="text"
                placeholder="10:00 AM - 11:30 AM"
                value={newEventTime}
                onChange={(e) => setNewEventTime(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={newEventCategory}
                onChange={(e) => setNewEventCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
              >
                <option value="Work">Work</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="secondary" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Add Event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CalendarView;
