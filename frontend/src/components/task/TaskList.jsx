import React from 'react';
import { TaskItem } from './TaskItem';

export const TaskList = ({
    tasks,
    onComplete,
    onEdit,
    onDelete,
    onSubTaskUpdate,
    emptyMessage = "No tasks found"
}) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={onComplete}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSubTaskUpdate={onSubTaskUpdate}
                />
            ))}
        </div>
    );
};