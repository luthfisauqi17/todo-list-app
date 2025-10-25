export const validateTaskForm = (data) => {
    const errors = {};

    if (!data.title || data.title.trim() === '') {
        errors.title = 'Title is required';
    } else if (data.title.length > 255) {
        errors.title = 'Title must be less than 255 characters';
    }

    if (data.description && data.description.length > 1000) {
        errors.description = 'Description must be less than 1000 characters';
    }

    if (data.deadline) {
        const deadline = new Date(data.deadline);
        if (isNaN(deadline.getTime())) {
            errors.deadline = 'Invalid date format';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};

export const validateSubTaskForm = (data) => {
    const errors = {};

    if (!data.title || data.title.trim() === '') {
        errors.title = 'Title is required';
    } else if (data.title.length > 255) {
        errors.title = 'Title must be less than 255 characters';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};