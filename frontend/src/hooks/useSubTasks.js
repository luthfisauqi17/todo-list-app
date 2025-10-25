import { useCallback } from 'react';
import { subtaskService } from '../services/subtaskService';

export const useSubTasks = (onSuccess) => {
    // Create subtask
    const createSubTask = useCallback(async (taskId, subtaskData) => {
        try {
            await subtaskService.createSubTask(taskId, subtaskData);
            if (onSuccess) onSuccess();
            return true;
        } catch (err) {
            console.error('Error creating subtask:', err);
            return false;
        }
    }, [onSuccess]);

    // Update subtask
    const updateSubTask = useCallback(async (id, subtaskData) => {
        try {
            await subtaskService.updateSubTask(id, subtaskData);
            if (onSuccess) onSuccess();
            return true;
        } catch (err) {
            console.error('Error updating subtask:', err);
            return false;
        }
    }, [onSuccess]);

    // Delete subtask
    const deleteSubTask = useCallback(async (id) => {
        try {
            await subtaskService.deleteSubTask(id);
            if (onSuccess) onSuccess();
            return true;
        } catch (err) {
            console.error('Error deleting subtask:', err);
            return false;
        }
    }, [onSuccess]);

    // Toggle subtask completion
    const toggleSubTask = useCallback(async (id) => {
        try {
            await subtaskService.toggleSubTask(id);
            if (onSuccess) onSuccess();
            return true;
        } catch (err) {
            console.error('Error toggling subtask:', err);
            return false;
        }
    }, [onSuccess]);

    return {
        createSubTask,
        updateSubTask,
        deleteSubTask,
        toggleSubTask,
    };
};