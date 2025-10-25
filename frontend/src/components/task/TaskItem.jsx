import React, { useState } from 'react';
import { Edit2, Trash2, Check, Clock, Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import { SubTaskList } from '../subtask/SubTaskList';
import { ProgressBar } from '../common/ProgressBar';
import { formatDateTime, isOverdue } from '../../utils/dateHelper';

export const TaskItem = ({
    task,
    onComplete,
    onEdit,
    onDelete,
    onSubTaskUpdate
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const overdue = isOverdue(task.deadline);
    const hasSubTasks = task.sub_tasks && task.sub_tasks.length > 0;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
                <button
                    onClick={() => onComplete(task.id)}
                    className="mt-1 w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors flex-shrink-0"
                >
                    {task.is_completed && <Check size={14} className="text-blue-600" />}
                </button>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className={`font-medium text-gray-900 ${task.is_completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                        </h3>

                        <div className="flex items-center gap-2">
                            {hasSubTasks && (
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                </button>
                            )}

                            <button
                                onClick={() => onEdit(task)}
                                className="text-gray-400 hover:text-blue-600 transition-colors"
                            >
                                <Edit2 size={16} />
                            </button>

                            <button
                                onClick={() => onDelete(task.id)}
                                className="text-gray-400 hover:text-red-600 transition-colors"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>

                    {task.description && (
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                    )}

                    <div className="flex items-center gap-4 flex-wrap text-sm">
                        {task.deadline && (
                            <div className={`flex items-center gap-1 ${overdue ? 'text-red-600' : 'text-gray-500'}`}>
                                <Calendar size={14} />
                                <span>{formatDateTime(task.deadline)}</span>
                                {overdue && <Clock size={14} className="ml-1" />}
                            </div>
                        )}

                        {hasSubTasks && (
                            <div className="text-gray-600">
                                {task.progress}% Complete ({task.sub_tasks.filter(st => st.is_completed).length}/{task.sub_tasks.length})
                            </div>
                        )}
                    </div>

                    {hasSubTasks && (
                        <div className="mt-3">
                            <ProgressBar progress={task.progress} />
                        </div>
                    )}

                    {isExpanded && hasSubTasks && (
                        <div className="mt-4">
                            <SubTaskList
                                taskId={task.id}
                                subTasks={task.sub_tasks}
                                onUpdate={onSubTaskUpdate}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};