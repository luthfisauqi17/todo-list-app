import React from 'react';
import { Check, Trash2 } from 'lucide-react';

export const SubTaskItem = ({ subTask, onToggle, onDelete }) => {
    return (
        <div className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded transition-colors">
            <button
                onClick={() => onToggle(subTask.id)}
                className="w-4 h-4 rounded border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors flex-shrink-0"
            >
                {subTask.is_completed && <Check size={12} className="text-blue-600" />}
            </button>

            <span className={`text-sm flex-1 ${subTask.is_completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                {subTask.title}
            </span>

            <button
                onClick={() => onDelete(subTask.id)}
                className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100"
            >
                <Trash2 size={14} />
            </button>
        </div>
    );
};