package handler

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/luthfisauqi17/todo-list-app/internal/models"
	"github.com/luthfisauqi17/todo-list-app/internal/service"
	"github.com/luthfisauqi17/todo-list-app/pkg/utils"
)

type TaskHandler struct {
	taskService service.TaskService
}

func NewTaskHandler(taskService service.TaskService) *TaskHandler {
	return &TaskHandler{taskService: taskService}
}

func (h *TaskHandler) Create(c *gin.Context) {
	var req models.CreateTaskRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body", err.Error())
		return
	}

	task, err := h.taskService.CreateTask(&req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create task", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Task created successfully", task)
}

func (h *TaskHandler) GetAll(c *gin.Context) {
	tasks, err := h.taskService.GetAllTasks(false)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to get tasks", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Tasks retrieved successfully", tasks)
}

func (h *TaskHandler) GetCompleted(c *gin.Context) {
	tasks, err := h.taskService.GetAllTasks(true)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to get completed tasks", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Completed tasks retrieved successfully", tasks)
}

func (h *TaskHandler) GetByID(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid task ID", err.Error())
		return
	}

	task, err := h.taskService.GetTaskByID(uint(id))
	if err != nil {
		utils.ErrorResponse(c, http.StatusNotFound, "Task not found", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Task retrieved successfully", task)
}

func (h *TaskHandler) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid task ID", err.Error())
		return
	}

	var req models.UpdateTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body", err.Error())
		return
	}

	task, err := h.taskService.UpdateTask(uint(id), &req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update task", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Task updated successfully", task)
}

func (h *TaskHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid task ID", err.Error())
		return
	}

	if err := h.taskService.DeleteTask(uint(id)); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to delete task", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Task deleted successfully", nil)
}

func (h *TaskHandler) Complete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid task ID", err.Error())
		return
	}

	task, err := h.taskService.CompleteTask(uint(id))
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to complete task", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Task completed successfully", task)
}
