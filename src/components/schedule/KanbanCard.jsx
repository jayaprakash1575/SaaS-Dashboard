import React from 'react';
import { MoreHorizontal, MessageSquare, Heart, Check, Plus } from 'lucide-react';
import Badge from '../common/Badge';

export const KanbanCard = ({
  task,
  columnId,
  onToggleComplete,
  onMoveColumn,
  onDelete,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-card hover:shadow-soft border border-slate-100 transition-all duration-200 group flex flex-col justify-between">
      <div>
        {/* Top Header: Checkbox & Title & Options */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <button
              onClick={() => onToggleComplete?.(task.id, columnId)}
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors shrink-0 cursor-pointer ${
                task.completed
                  ? 'bg-[#4318FF] text-white'
                  : 'border-2 border-slate-300 hover:border-[#4318FF]'
              }`}
            >
              {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
            </button>
            <h4
              className={`text-sm font-bold truncate transition-colors ${
                task.completed
                  ? 'line-through text-slate-400'
                  : 'text-[#1B2559] group-hover:text-[#4318FF]'
              }`}
            >
              {task.title}
            </h4>
          </div>

          <div className="relative shrink-0">
            <button
              onClick={() => onMoveColumn?.(task.id, columnId)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 cursor-pointer"
              title="Move next column / Options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Badges: Priority & Health Status */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {task.priority && (
            <Badge variant={task.priority} size="sm">
              {task.priority}
            </Badge>
          )}
          {task.status && (
            <Badge variant={task.status} size="sm">
              {task.status}
            </Badge>
          )}
        </div>

        {/* Task Description */}
        <p className="text-xs text-slate-500 font-medium line-clamp-2 mb-3">
          {task.description}
        </p>

        {/* Image Attachment (if available) */}
        {task.attachmentImage && (
          <div className="rounded-2xl overflow-hidden mb-3.5 border border-slate-100 max-h-36 bg-slate-50">
            <img
              src={task.attachmentImage}
              alt="Task Preview"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>
        )}
      </div>

      {/* Footer: Avatar Stack & Counters */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        {/* Avatars */}
        <div className="flex items-center -space-x-2 overflow-hidden">
          {task.members?.map((avatar, idx) => (
            <img
              key={idx}
              src={avatar}
              alt="Member"
              className="inline-block w-6 h-6 rounded-full ring-2 ring-white object-cover"
            />
          ))}
          <button
            className="w-6 h-6 rounded-full bg-[#00B5FF] text-white flex items-center justify-center ring-2 ring-white hover:bg-sky-500 transition-colors cursor-pointer"
            title="Assign member"
          >
            <Plus className="w-3 h-3 stroke-[3]" />
          </button>
        </div>

        {/* Comments & Likes */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{task.comments || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            <span>{task.likes || '0'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanCard;

