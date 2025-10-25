import api from './api';

export const taskService = {
    // Get all ongoing tasks
    getAllTasks: async () => {
        try {
            const response = await api.get('/tasks');
            return response.data || [];
        } catch (error) {
            console.error('Error fetching tasks:', error);
            return [];
        }
    },

    // Get completed tasks
    getCompletedTasks: async () => {
        try {
            const response = await api.get('/tasks/completed');
            return response.data || [];
        } catch (error) {
            console.error('Error fetching completed tasks:', error);
            return [];
        }
    },

    // Get single task by ID
    getTaskById: async (id) => {
        try {
            const response = await api.get(`/tasks/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching task:', error);
            throw error;
        }
    },

    // Create new task
    createTask: async (taskData) => {
        try {
            const response = await api.post('/tasks', taskData);
            return response.data;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    // Update task
    updateTask: async (id, taskData) => {
        try {
            const response = await api.put(`/tasks/${id}`, taskData);
            return response.data;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    // Delete task
    deleteTask: async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    },

    // Complete task
    completeTask: async (id) => {
        try {
            const response = await api.patch(`/tasks/${id}/complete`);
            return response.data;
        } catch (error) {
            console.error('Error completing task:', error);
            throw error;
        }
    },
};