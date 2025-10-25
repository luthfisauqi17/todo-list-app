export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const TASK_STATUS = {
    ONGOING: 'ongoing',
    COMPLETED: 'completed',
};

export const MESSAGES = {
    TASK_CREATED: 'Task created successfully',
    TASK_UPDATED: 'Task updated successfully',
    TASK_DELETED: 'Task deleted successfully',
    TASK_COMPLETED: 'Task marked as completed',
    SUBTASK_CREATED: 'Subtask created successfully',
    SUBTASK_UPDATED: 'Subtask updated successfully',
    SUBTASK_DELETED: 'Subtask deleted successfully',
    ERROR_GENERIC: 'An error occurred. Please try again.',
    CONFIRM_DELETE: 'Are you sure you want to delete this task?',
    CONFIRM_DELETE_SUBTASK: 'Are you sure you want to delete this subtask?',
};

export const COLORS = {
    PRIMARY: '#3B82F6',
    SUCCESS: '#10B981',
    DANGER: '#EF4444',
    WARNING: '#F59E0B',
    SECONDARY: '#6B7280',
};