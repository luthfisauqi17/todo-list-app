import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch ongoing tasks
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await taskService.getAllTasks();
            setTasks(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch completed tasks
    const fetchCompletedTasks = useCallback(async () => {
        try {
            const data = await taskService.getCompletedTasks();
            setCompletedTasks(data);
        } catch (err) {
            console.error('Error fetching completed tasks:', err);
        }
    }, []);

    // Create task
    const createTask = useCallback(async (taskData) => {
        try {
            await taskService.createTask(taskData);
            await fetchTasks();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, [fetchTasks]);

    // Update task
    const updateTask = useCallback(async (id, taskData) => {
        try {
            await taskService.updateTask(id, taskData);
            await fetchTasks();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, [fetchTasks]);

    // Delete task
    const deleteTask = useCallback(async (id) => {
        try {
            await taskService.deleteTask(id);
            await fetchTasks();
            await fetchCompletedTasks();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, [fetchTasks, fetchCompletedTasks]);

    // Complete task
    const completeTask = useCallback(async (id) => {
        try {
            await taskService.completeTask(id);
            await fetchTasks();
            await fetchCompletedTasks();
            return true;
        } catch (err) {
            setError(err.message);
            return false;
        }
    }, [fetchTasks, fetchCompletedTasks]);

    // Initial fetch
    useEffect(() => {
        fetchTasks();
        fetchCompletedTasks();
    }, [fetchTasks, fetchCompletedTasks]);

    return {
        tasks,
        completedTasks,
        loading,
        error,
        fetchTasks,
        fetchCompletedTasks,
        createTask,
        updateTask,
        deleteTask,
        completeTask,
    };
};