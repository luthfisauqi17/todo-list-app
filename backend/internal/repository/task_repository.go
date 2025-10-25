package repository

import (
	"github.com/luthfisauqi17/todo-list-app/internal/models"
	"gorm.io/gorm"
)

type TaskRepository interface {
	Create(task *models.Task) error
	FindAll(isCompleted bool) ([]models.Task, error)
	FindByID(id uint) (*models.Task, error)
	Update(task *models.Task) error
	Delete(id uint) error
	Complete(id uint) error
}

type taskRepository struct {
	db *gorm.DB
}

func NewTaskRepository(db *gorm.DB) TaskRepository {
	return &taskRepository{db: db}
}

func (r *taskRepository) Create(task *models.Task) error {
	return r.db.Create(task).Error
}

func (r *taskRepository) FindAll(isCompleted bool) ([]models.Task, error) {
	var tasks []models.Task
	err := r.db.
		Preload("SubTasks").
		Where("is_completed = ?", isCompleted).
		Order("created_at DESC").
		Find(&tasks).Error

	return tasks, err
}

func (r *taskRepository) FindByID(id uint) (*models.Task, error) {
	var task models.Task
	err := r.db.
		Preload("SubTasks").
		First(&task, id).Error

	if err != nil {
		return nil, err
	}

	return &task, nil
}

func (r *taskRepository) Update(task *models.Task) error {
	return r.db.Save(task).Error
}

func (r *taskRepository) Delete(id uint) error {
	return r.db.Delete(&models.Task{}, id).Error
}

func (r *taskRepository) Complete(id uint) error {
	return r.db.Model(&models.Task{}).
		Where("id = ?", id).
		Updates(map[string]interface{}{
			"is_completed": true,
			"completed_at": gorm.Expr("NOW()"),
		}).Error
}
