import React from 'react';
import { SubTaskItem } from './SubTaskItem';
import { SubTaskForm } from './SubTaskForm';
import { useSubTasks } from '../../hooks/useSubTasks';
import { MESSAGES } from '../../constants';

export const SubTaskList = ({ taskId, subTasks, onUpdate }) => {
    const { createSubTask, toggleSubTask, deleteSubTask } = useSubTasks(onUpdate);

    const handleCreate = async (subtaskData) => {
        const success = await createSubTask(taskId, subtaskData);
        if (success) {
            console.log(MESSAGES.SUBTASK_CREATED);
        }
    };

    const handleToggle = async (subtaskId) => {
        await toggleSubTask(subtaskId);
    };

    const handleDelete = async (subtaskId) => {
        if (window.confirm(MESSAGES.CONFIRM_DELETE_SUBTASK)) {
            await deleteSubTask(subtaskId);
        }
    };

    return (
        <div className="space-y-3 pl-8 border-l-2 border-gray-200">
            <div className="space-y-1 group">
                {subTasks && subTasks.map((subTask) => (
                    <SubTaskItem
                        key={subTask.id}
                        subTask={subTask}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            <SubTaskForm onSubmit={handleCreate} />
        </div>
    );
};