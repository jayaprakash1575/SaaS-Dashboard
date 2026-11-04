import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Star,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Calendar as CalendarIcon
} from 'lucide-react';
import Button from '../common/Button';
import SearchInput from '../common/SearchInput';
import Badge from '../common/Badge';

export const ScheduleListScreen = () => {
  const [search, setSearch] = useState('');
  const [selectedDay, setSelectedDay] = useState(4);

  const [scheduleItems, setScheduleItems] = useState([
    {
      id: 1,
      title: 'UI/UX Design Concept Review',
      date: '12 Dec, 2020',
      time: '10:00 AM',
      category: 'Design Team',
      status: 'Complete',
      starred: true,
    },
    {
      id: 2,
      title: 'Backend Database Migration Sync',
      date: '10 Dec, 2020',
      time: '02:30 PM',
      category: 'DevOps',
      status: 'Pending',
      starred: true,
    },
    {
      id: 3,
      title: 'Client Demo & Feedback Presentation',
      date: '09 Dec, 2020',
      time: '11:00 AM',
      category: 'Sales',
      status: 'Complete',
      starred: false,
    },
    {
      id: 4,
      title: 'Security Vulnerability Audit',
      date: '09 Dec, 2020',
      time: '04:00 PM',
      category: 'Engineering',
      status: 'Cancel',
      starred: false,
    },
    {
      id: 5,
      title: 'Quarterly Executive Roadmap Planning',
      date: '10 Dec, 2020',
      time: '09:00 AM',
      category: 'Management',
      status: 'Complete',
      starred: true,
    },
    {
      id: 6,
      title: 'Mobile React Native App Testing',
      date: '10 Dec, 2020',
      time: '03:15 PM',
      category: 'QA Team',
      status: 'Pending',
      starred: false,
    },
  ]);

  const toggleStar = (id) => {
    setScheduleItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, starred: !i.starred } : i))
    );
  };

  const deleteItem = (id) => {
    setScheduleItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Mini Calendar + Tasks (matching Figma screen_schedule_list) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Mini Calendar */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-[#1B2559]">November 2026</h3>
              <div className="flex items-center gap-1 text-slate-400">
                <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-slate-600" />
                <ChevronRight className="w-4 h-4 cursor-pointer hover:text-slate-600" />
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-1.5">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {[28, 29, 30].map((d) => (
                <div key={`p-${d}`} className="p-1.5 text-slate-300">{d}</div>
              ))}
              {[...Array(30)].map((_, i) => {
                const day = i + 1;
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`h-7 w-7 rounded-full flex items-center justify-center font-semibold text-xs mx-auto transition-colors cursor-pointer ${
                      selectedDay === day
                        ? 'bg-[#4880FF] text-white font-bold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Tasks List */}
          <div className="bg-white rounded-3xl p-5 shadow-card border border-slate-100">
            <h3 className="text-sm font-bold text-[#1B2559] mb-3">Tasks</h3>
            <div className="space-y-3">
              {scheduleItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-100"
                >
                  <div>
                    <h5 className="text-xs font-bold text-[#1B2559] truncate max-w-[170px]">
                      {item.title}
                    </h5>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                  <Badge variant={item.status} size="sm">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Schedule List Table */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1B2559]">Schedule List</h2>
              <p className="text-xs text-slate-400 font-medium">All upcoming team sprints and scheduled activities</p>
            </div>

            <Button
              variant="brand"
              icon={Plus}
              onClick={() => alert('New Schedule Event Created')}
              className="px-4 py-2 text-xs font-bold"
            >
              + Create Schedule
            </Button>
          </div>

          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-[#A3AED0] uppercase tracking-wider">
                  <th className="pb-3.5 px-3">Title</th>
                  <th className="pb-3.5 px-3">Category</th>
                  <th className="pb-3.5 px-3">Date & Time</th>
                  <th className="pb-3.5 px-3">Status</th>
                  <th className="pb-3.5 pr-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 text-sm">
                {scheduleItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-[#1B2559]">
                      {item.title}
                    </td>
                    <td className="py-3.5 px-3 text-xs font-semibold text-slate-500">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-3 text-xs text-slate-600">
                      <div className="flex items-center gap-1.5 font-medium">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#4880FF]" />
                        <span>{item.date} • {item.time}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <Badge variant={item.status} size="sm">
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 pr-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => toggleStar(item.id)}
                          className="p-1 text-slate-300 hover:text-[#FBBF24]"
                        >
                          <Star
                            className={`w-4 h-4 ${
                              item.starred
                                ? 'fill-[#FBBF24] text-[#FBBF24]'
                                : 'text-slate-300'
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-1 text-slate-300 hover:text-rose-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleListScreen;

