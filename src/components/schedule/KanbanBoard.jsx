import React, { useState } from 'react';
import { Plus, Filter, Search, SlidersHorizontal, CheckSquare, Clock, ArrowRight, Check } from 'lucide-react';
import { initialKanbanColumns } from '../../data/mockData';
import KanbanCard from './KanbanCard';
import Button from '../common/Button';
import SearchInput from '../common/SearchInput';
import Modal from '../common/Modal';

export const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialKanbanColumns);
  const [viewMode, setViewMode] = useState('board');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedColumnForAdd, setSelectedColumnForAdd] = useState('todo');

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Low');
  const [newTaskStatus, setNewTaskStatus] = useState('On Track');
  const [newTaskDesc, setNewTaskDesc] = useState('');

  const handleToggleComplete = (taskId, colId) => {
    setColumns((prev) => {
      const col = prev[colId];
      const updatedTasks = col.tasks.map((t) =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      return { ...prev, [colId]: { ...col, tasks: updatedTasks } };
    });
  };

  const handleMoveColumn = (taskId, colId) => {
    const colOrder = ['todo', 'inProgress', 'inReview', 'done'];
    const currentIndex = colOrder.indexOf(colId);
    const nextIndex = (currentIndex + 1) % colOrder.length;
    const nextColId = colOrder[nextIndex];

    setColumns((prev) => {
      const sourceCol = prev[colId];
      const targetCol = prev[nextColId];
      const taskToMove = sourceCol.tasks.find((t) => t.id === taskId);
      if (!taskToMove) return prev;

      return {
        ...prev,
        [colId]: {
          ...sourceCol,
          tasks: sourceCol.tasks.filter((t) => t.id !== taskId),
        },
        [nextColId]: {
          ...targetCol,
          tasks: [
            ...targetCol.tasks,
            {
              ...taskToMove,
              completed: nextColId === 'done' ? true : taskToMove.completed,
            },
          ],
        },
      };
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;

    const newTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDesc || 'Discussion for management dashboard ui design',
      completed: selectedColumnForAdd === 'done',
      priority: newTaskPriority,
      status: newTaskStatus,
      comments: 0,
      likes: '0',
      members: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80',
      ],
    };

    setColumns((prev) => ({
      ...prev,
      [selectedColumnForAdd]: {
        ...prev[selectedColumnForAdd],
        tasks: [newTask, ...prev[selectedColumnForAdd].tasks],
      },
    }));

    setIsAddModalOpen(false);
    setNewTaskTitle('');
    setNewTaskDesc('');
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* View Mode Pills (matching Figma preview 5) */}
        <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-100 shadow-xs">
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-[#4318FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            List
          </button>
          <button
            onClick={() => setViewMode('board')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'board'
                ? 'bg-[#4318FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Board
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-[#4318FF] text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Timeline
          </button>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search tasks..."
            className="w-full sm:w-56"
          />

          <Button
            variant="brand"
            icon={SlidersHorizontal}
            onClick={() => setIsAddModalOpen(true)}
            className="whitespace-nowrap px-4 py-2.5 rounded-2xl shadow-sm text-xs sm:text-sm font-bold cursor-pointer"
          >
            Filter
          </Button>

          <Button
            variant="primary"
            icon={Plus}
            onClick={() => setIsAddModalOpen(true)}
            className="whitespace-nowrap px-4 py-2.5 rounded-2xl shadow-sm text-xs sm:text-sm font-bold cursor-pointer"
          >
            Add Task
          </Button>
        </div>
      </div>

      {/* VIEW 1: KANBAN BOARD */}
      {viewMode === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start overflow-x-auto pb-4">
          {Object.values(columns).map((column) => {
            const tasksInCol = column.tasks.filter((t) =>
              t.title.toLowerCase().includes(searchQuery.toLowerCase())
            );

            return (
              <div key={column.id} className="flex flex-col gap-4 min-w-[260px]">
                {/* Column Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#1B2559]">
                      {column.title}
                    </h3>
                    <span className="w-5 h-5 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold flex items-center justify-center">
                      {tasksInCol.length}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedColumnForAdd(column.id);
                      setIsAddModalOpen(true);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-white transition-colors cursor-pointer"
                    title={`Add task to ${column.title}`}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Task Cards Column */}
                <div className="space-y-4">
                  {tasksInCol.map((task) => (
                    <KanbanCard
                      key={task.id}
                      task={task}
                      columnId={column.id}
                      onToggleComplete={handleToggleComplete}
                      onMoveColumn={handleMoveColumn}
                    />
                  ))}

                  {tasksInCol.length === 0 && (
                    <div className="rounded-3xl border-2 border-dashed border-slate-200 p-8 text-center text-slate-400 text-xs font-medium">
                      No tasks in this column
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: LIST VIEW (Matching Figma Task view) */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100 divide-y divide-slate-100">
          {Object.entries(columns).map(([colId, col]) => (
            <div key={colId} className="py-4 first:pt-0 last:pb-0">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-extrabold text-[#4318FF] uppercase tracking-wider">
                  {col.title} ({col.tasks.length})
                </h4>
                <button
                  onClick={() => {
                    setSelectedColumnForAdd(colId);
                    setIsAddModalOpen(true);
                  }}
                  className="text-xs font-bold text-slate-400 hover:text-[#4318FF] flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Task</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {col.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-2xl hover:bg-slate-50 border border-slate-100 transition-colors gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <button
                        onClick={() => handleToggleComplete(task.id, colId)}
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                          task.completed
                            ? 'bg-[#4318FF] text-white'
                            : 'border-2 border-slate-300'
                        }`}
                      >
                        {task.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                      <div className="min-w-0">
                        <span
                          className={`text-sm font-bold truncate block ${
                            task.completed ? 'line-through text-slate-400' : 'text-[#1B2559]'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="text-xs text-slate-400 truncate block">
                          {task.description}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {task.priority}
                      </span>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleMoveColumn(task.id, colId)}
                        className="text-xs cursor-pointer"
                      >
                        Advance Column
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 3: TIMELINE VIEW (Matching Figma Task preview timeline) */}
      {viewMode === 'timeline' && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-card border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold text-[#1B2559]">Sprint Timeline Roadmap</h3>
              <p className="text-xs text-slate-400">Gantt milestone tracking for dashboard release</p>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-xl bg-[#E0F2FE] text-[#0284C7] font-bold">
              Q4 Release
            </span>
          </div>

          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-[#4318FF] space-y-8">
              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#4318FF] ring-4 ring-indigo-50" />
                <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 max-w-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-[#1B2559] text-sm">Dashboard Design & UI System</h5>
                    <span className="text-xs font-bold text-[#4318FF]">100% Complete</span>
                  </div>
                  <p className="text-xs text-slate-500">Auto layout Figma architecture, color tokens and component library</p>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-[#00B5FF] ring-4 ring-sky-50" />
                <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 max-w-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-[#1B2559] text-sm">Frontend React Component Architecture</h5>
                    <span className="text-xs font-bold text-[#00B5FF]">In Progress</span>
                  </div>
                  <p className="text-xs text-slate-500">Vite setup, responsive layouts, SVG charts and Kanban drag states</p>
                </div>
              </div>

              <div className="relative">
                <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-300 ring-4 ring-slate-100" />
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-xl">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-bold text-[#1B2559] text-sm">Testing, Cross-Browser Audit & Deployment</h5>
                    <span className="text-xs font-bold text-slate-400">Upcoming</span>
                  </div>
                  <p className="text-xs text-slate-500">End-to-end verification across Chrome, Safari, Firefox and mobile viewports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Task"
        subtitle="Create a new workflow task card"
      >
        <form onSubmit={handleCreateTask} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Task Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Design User Profile UI"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Brief details about the task requirements..."
              value={newTaskDesc}
              onChange={(e) => setNewTaskDesc(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-[#4318FF] focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Column
              </label>
              <select
                value={selectedColumnForAdd}
                onChange={(e) => setSelectedColumnForAdd(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
              >
                <option value="todo">ToDo</option>
                <option value="inProgress">In Progress</option>
                <option value="inReview">In Review</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Priority
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Health
              </label>
              <select
                value={newTaskStatus}
                onChange={(e) => setNewTaskStatus(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white"
              >
                <option value="On Track">On Track</option>
                <option value="At risk">At risk</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Task
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default KanbanBoard;
