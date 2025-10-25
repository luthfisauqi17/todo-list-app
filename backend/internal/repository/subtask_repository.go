package repository

import (
	"github.com/luthfisauqi17/todo-list-app/internal/models"
	"gorm.io/gorm"
)

type SubTaskRepository interface {
	Create(subtask *models.SubTask) error
	FindByID(id uint) (*models.SubTask, error)
	FindByTaskID(taskID uint) ([]models.SubTask, error)
	Update(subtask *models.SubTask) error
	Delete(id uint) error
	ToggleComplete(id uint) error
	CheckAllCompleted(taskID uint) (bool, error)
}

type subTaskRepository struct {
	db *gorm.DB
}

func NewSubTaskRepository(db *gorm.DB) SubTaskRepository {
	return &subTaskRepository{db: db}
}

func (r *subTaskRepository) Create(subtask *models.SubTask) error {
	return r.db.Create(subtask).Error
}

func (r *subTaskRepository) FindByID(id uint) (*models.SubTask, error) {
	var subtask models.SubTask
	err := r.db.First(&subtask, id).Error
	if err != nil {
		return nil, err
	}
	return &subtask, nil
}

func (r *subTaskRepository) FindByTaskID(taskID uint) ([]models.SubTask, error) {
	var subtasks []models.SubTask
	err := r.db.Where("task_id = ?", taskID).Find(&subtasks).Error
	return subtasks, err
}

func (r *subTaskRepository) Update(subtask *models.SubTask) error {
	return r.db.Save(subtask).Error
}

func (r *subTaskRepository) Delete(id uint) error {
	return r.db.Delete(&models.SubTask{}, id).Error
}

func (r *subTaskRepository) ToggleComplete(id uint) error {
	var subtask models.SubTask
	if err := r.db.First(&subtask, id).Error; err != nil {
		return err
	}

	subtask.IsCompleted = !subtask.IsCompleted
	return r.db.Save(&subtask).Error
}

func (r *subTaskRepository) CheckAllCompleted(taskID uint) (bool, error) {
	var count int64
	var completedCount int64

	// Count total subtasks
	if err := r.db.Model(&models.SubTask{}).Where("task_id = ?", taskID).Count(&count).Error; err != nil {
		return false, err
	}

	// Count completed subtasks
	if err := r.db.Model(&models.SubTask{}).Where("task_id = ? AND is_completed = ?", taskID, true).Count(&completedCount).Error; err != nil {
		return false, err
	}

	return count > 0 && count == completedCount, nil
}
