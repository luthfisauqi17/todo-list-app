package service

import (
	"errors"
	"time"

	"github.com/luthfisauqi17/todo-list-app/internal/models"
	"github.com/luthfisauqi17/todo-list-app/internal/repository"
)

type TaskService interface {
	CreateTask(req *models.CreateTaskRequest) (*models.Task, error)
	GetAllTasks(isCompleted bool) ([]models.Task, error)
	GetTaskByID(id uint) (*models.Task, error)
	UpdateTask(id uint, req *models.UpdateTaskRequest) (*models.Task, error)
	DeleteTask(id uint) error
	CompleteTask(id uint) (*models.Task, error)
}

type taskService struct {
	taskRepo    repository.TaskRepository
	subtaskRepo repository.SubTaskRepository
}

func NewTaskService(taskRepo repository.TaskRepository, subtaskRepo repository.SubTaskRepository) TaskService {
	return &taskService{
		taskRepo:    taskRepo,
		subtaskRepo: subtaskRepo,
	}
}

func (s *taskService) CreateTask(req *models.CreateTaskRequest) (*models.Task, error) {
	task := &models.Task{
		Title:       req.Title,
		Description: req.Description,
		Deadline:    req.Deadline,
		IsCompleted: false,
	}

	if err := s.taskRepo.Create(task); err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskService) GetAllTasks(isCompleted bool) ([]models.Task, error) {
	tasks, err := s.taskRepo.FindAll(isCompleted)
	if err != nil {
		return nil, err
	}

	for i := range tasks {
		tasks[i].CalculateProgress()
	}

	return tasks, nil
}

func (s *taskService) GetTaskByID(id uint) (*models.Task, error) {
	task, err := s.taskRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("task not found")
	}

	task.CalculateProgress()
	return task, nil
}

func (s *taskService) UpdateTask(id uint, req *models.UpdateTaskRequest) (*models.Task, error) {
	task, err := s.taskRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("task not found")
	}

	if req.Title != "" {
		task.Title = req.Title
	}
	task.Description = req.Description
	task.Deadline = req.Deadline

	if err := s.taskRepo.Update(task); err != nil {
		return nil, err
	}

	return task, nil
}

func (s *taskService) DeleteTask(id uint) error {
	_, err := s.taskRepo.FindByID(id)
	if err != nil {
		return errors.New("task not found")
	}

	return s.taskRepo.Delete(id)
}

func (s *taskService) CompleteTask(id uint) (*models.Task, error) {
	task, err := s.taskRepo.FindByID(id)
	if err != nil {
		return nil, errors.New("task not found")
	}

	now := time.Now()
	task.IsCompleted = true
	task.CompletedAt = &now

	if err := s.taskRepo.Update(task); err != nil {
		return nil, err
	}

	return task, nil
}
