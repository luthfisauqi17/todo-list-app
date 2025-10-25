import React, { useState } from 'react';
import { Layout } from './components/layout/Layout';
import { TaskForm } from './components/task/TaskForm';
import { TaskList } from './components/task/TaskList';
import { Card } from './components/common/Card';
import { Modal } from './components/common/Modal';
import { Button } from './components/common/Button';
import { Input } from './components/common/Input';
import { TextArea } from './components/common/TextArea';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { MESSAGES } from './constants';
import { formatDateTimeLocal } from './utils/dateHelper';

function App() {
    const {
        tasks,
        completedTasks,
        loading,
        createTask,
        updateTask,
        deleteTask,
        completeTask,
        fetchTasks,
        fetchCompletedTasks,
    } = useTasks();

    const [showCompleted, setShowCompleted] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    const handleCreateTask = async (taskData) => {
        const success = await createTask(taskData);
        if (success) {
            console.log(MESSAGES.TASK_CREATED);
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setEditFormData({
            title: task.title,
            description: task.description || '',
            deadline: task.deadline ? formatDateTimeLocal(task.deadline) : ''
        });
    };

    const handleUpdateTask = async () => {
        if (!editingTask) return;

        const updateData = {
            title: editFormData.title,
            description: editFormData.description,
            deadline: editFormData.deadline ? new Date(editFormData.deadline).toISOString() : null
        };

        const success = await updateTask(editingTask.id, updateData);
        if (success) {
            console.log(MESSAGES.TASK_UPDATED);
            setEditingTask(null);
            setEditFormData({});
        }
    };

    const handleDeleteTask = async (taskId) => {
        if (window.confirm(MESSAGES.CONFIRM_DELETE)) {
            const success = await deleteTask(taskId);
            if (success) {
                console.log(MESSAGES.TASK_DELETED);
            }
        }
    };

    const handleCompleteTask = async (taskId) => {
        const success = await completeTask(taskId);
        if (success) {
            console.log(MESSAGES.TASK_COMPLETED);
        }
    };

    const handleSubTaskUpdate = () => {
        fetchTasks();
        fetchCompletedTasks();
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Add Task Section */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Add New Task</h2>
                    <TaskForm onSubmit={handleCreateTask} loading={loading} />
                </Card>

                {/* Ongoing Tasks Section */}
                <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Ongoing Tasks
                            <span className="ml-2 text-lg text-gray-500">({tasks.length})</span>
                        </h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500">Loading tasks...</p>
                        </div>
                    ) : (
                        <TaskList
                            tasks={tasks}
                            onComplete={handleCompleteTask}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            onSubTaskUpdate={handleSubTaskUpdate}
                            emptyMessage="No ongoing tasks. Add one above!"
                        />
                    )}
                </Card>

                {/* Completed Tasks Section */}
                <Card className="p-6">
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        className="w-full flex items-center justify-between text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                        <span>
                            Completed Tasks
                            <span className="ml-2 text-lg text-gray-500">({completedTasks.length})</span>
                        </span>
                        {showCompleted ? <ChevronDown size={24} /> : <ChevronRight size={24} />}
                    </button>

                    {showCompleted && (
                        <div className="mt-4">
                            {completedTasks.length === 0 ? (
                                <p className="text-center text-gray-500 py-8">No completed tasks yet.</p>
                            ) : (
                                <div className="space-y-3">
                                    {completedTasks.map((task) => (
                                        <div
                                            key={task.id}
                                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-5 h-5 rounded bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                                                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-gray-700 line-through">
                                                        {task.title}
                                                    </h3>
                                                    {task.description && (
                                                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                                                    )}
                                                    {task.completed_at && (
                                                        <p className="text-xs text-gray-400 mt-2">
                                                            Completed: {new Date(task.completed_at).toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteTask(task.id)}
                                                    className="text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </Card>
            </div>

            {/* Edit Task Modal */}
            <Modal
                isOpen={!!editingTask}
                onClose={() => setEditingTask(null)}
                title="Edit Task"
            >
                <div className="space-y-4">
                    <Input
                        label="Task Title"
                        value={editFormData.title || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                        placeholder="Enter task title..."
                        required
                    />

                    <TextArea
                        label="Description"
                        value={editFormData.description || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                        placeholder="Add description..."
                        rows={3}
                    />

                    <Input
                        label="Deadline"
                        type="datetime-local"
                        value={editFormData.deadline || ''}
                        onChange={(e) => setEditFormData({ ...editFormData, deadline: e.target.value })}
                    />

                    <div className="flex gap-3 justify-end">
                        <Button variant="secondary" onClick={() => setEditingTask(null)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleUpdateTask}>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </Modal>
        </Layout>
    );
}

export default App;