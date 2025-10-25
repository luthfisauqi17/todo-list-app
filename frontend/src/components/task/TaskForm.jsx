import React, { useState } from 'react';
import { Input } from '../common/Input';
import { TextArea } from '../common/TextArea';
import { Button } from '../common/Button';
import { Plus } from 'lucide-react';
import { validateTaskForm } from '../../utils/validation';

export const TaskForm = ({ onSubmit, loading = false }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        deadline: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validation = validateTaskForm(formData);
        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        const submitData = {
            title: formData.title,
            description: formData.description,
            deadline: formData.deadline ? new Date(formData.deadline).toISOString() : null
        };

        onSubmit(submitData);
        setFormData({ title: '', description: '', deadline: '' });
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <Input
                label="Task Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title..."
                required
                error={errors.title}
            />

            <TextArea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Add description (optional)..."
                rows={3}
                error={errors.description}
            />

            <Input
                label="Deadline"
                name="deadline"
                type="datetime-local"
                value={formData.deadline}
                onChange={handleChange}
                error={errors.deadline}
            />

            <Button type="submit" variant="primary" className="w-full" icon={Plus} disabled={loading}>
                {loading ? 'Adding...' : 'Add Task'}
            </Button>
        </form>
    );
};