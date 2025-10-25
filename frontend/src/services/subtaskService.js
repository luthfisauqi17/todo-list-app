import api from './api';

export const subtaskService = {
    // Create new subtask
    createSubTask: async (taskId, subtaskData) => {
        try {
            const response = await api.post(`/tasks/${taskId}/subtasks`, subtaskData);
            return response.data;
        } catch (error) {
            console.error('Error creating subtask:', error);
            throw error;
        }
    },

    // Update subtask
    updateSubTask: async (id, subtaskData) => {
        try {
            const response = await api.put(`/subtasks/${id}`, subtaskData);
            return response.data;
        } catch (error) {
            console.error('Error updating subtask:', error);
            throw error;
        }
    },

    // Delete subtask
    deleteSubTask: async (id) => {
        try {
            await api.delete(`/subtasks/${id}`);
        } catch (error) {
            console.error('Error deleting subtask:', error);
            throw error;
        }
    },

    // Toggle subtask completion
    toggleSubTask: async (id) => {
        try {
            const response = await api.patch(`/subtasks/${id}/complete`);
            return response.data;
        } catch (error) {
            console.error('Error toggling subtask:', error);
            throw error;
        }
    },
};