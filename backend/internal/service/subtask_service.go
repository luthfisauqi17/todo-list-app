package service

import (
	"errors"
	"time"

	"github.com/luthfisauqi17/todo-list-app/internal/models"
	"github.com/luthfisauqi17/todo-list-app/internal/repository"
)

type SubTaskService interface {
	CreateSubTask(taskID uint, req *models.CreateSubTaskRequest) (*models.SubTask, error)
	UpdateSubTask(id uint, req *models.UpdateSubTaskRequest) (*models.SubTask, error)
	DeleteSubTask(id uint) error
	ToggleComplete(id uint) (*models.SubTask, error)
}

type subTaskService struct {
	subtaskRepo repository.SubTaskRepository
	taskRepo    repository.TaskRepository
}

func NewSubTaskService(subtaskRepo repository.SubTaskRepository, taskRepo repository.TaskRepository) SubTaskService {
	return &subTaskService{
		subtaskRepo: subtaskRepo,
		taskRepo:    taskRepo,
	}
}

func (s *subTaskService) CreateSubTask(taskID uint, req *models.CreateSubTaskRequest) (*models.SubTask, error) {
	// Check if task exists
	_, err := s.taskRepo.FindByID(taskID)
	if err != nil {
		return nil, errors.New("task not found")
	}

	subtask := &models.SubTask{
		TaskID:      taskID,
		Title:       req.Title,
		IsCompleted: false,
	}

	if err := s.subtaskRepo.Create(subtask); err != nil {
		return nil, err
	}

	return subtask, nil
}

func (s *subTaskService) UpdateSubTask(id uint, req *models.UpdateSubTaskRequest) (*models.SubTask, error) {
	subtask, err := s.subtaskRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("subtask not found")
	}

	if req.Title != "" {
		subtask.Title = req.Title
	}

	if err := s.subtaskRepo.Update(subtask); err != nil {
		return nil, err
	}

	return subtask, nil
}

func (s *subTaskService) DeleteSubTask(id uint) error {
	_, err := s.subtaskRepo.FindByID(id)
	if err != nil {
		return errors.New("subtask not found")
	}

	return s.subtaskRepo.Delete(id)
}

func (s *subTaskService) ToggleComplete(id uint) (*models.SubTask, error) {
	subtask, err := s.subtaskRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("subtask not found")
	}

	if err := s.subtaskRepo.ToggleComplete(id); err != nil {
		return nil, err
	}

	// Check if all subtasks are completed
	allCompleted, err := s.subtaskRepo.CheckAllCompleted(subtask.TaskID)
	if err != nil {
		return nil, err
	}

	// If all subtasks completed, complete the main task
	if allCompleted {
		task, err := s.taskRepo.FindByID(subtask.TaskID)
		if err == nil && !task.IsCompleted {
			now := time.Now()
			task.IsCompleted = true
			task.CompletedAt = &now
			s.taskRepo.Update(task)
		}
	}

	// Fetch updated subtask
	updatedSubTask, _ := s.subtaskRepo.FindByID(id)
	return updatedSubTask, nil
}
