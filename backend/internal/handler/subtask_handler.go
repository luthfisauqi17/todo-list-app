package handler

import (
	"net/http"
	"strconv"

	"github.com/luthfisauqi17/todo-list-app/pkg/utils"

	"github.com/gin-gonic/gin"
	"github.com/luthfisauqi17/todo-list-app/internal/models"
	"github.com/luthfisauqi17/todo-list-app/internal/service"
)

type SubTaskHandler struct {
	subtaskService service.SubTaskService
}

func NewSubTaskHandler(subtaskService service.SubTaskService) *SubTaskHandler {
	return &SubTaskHandler{subtaskService: subtaskService}
}

// Create creates a new subtask
func (h *SubTaskHandler) Create(c *gin.Context) {
	taskID, err := strconv.ParseUint(c.Param("task_id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid task ID", err.Error())
		return
	}

	var req models.CreateSubTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body", err.Error())
		return
	}

	subtask, err := h.subtaskService.CreateSubTask(uint(taskID), &req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to create subtask", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusCreated, "Subtask created successfully", subtask)
}

// Update updates a subtask
func (h *SubTaskHandler) Update(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid subtask ID", err.Error())
		return
	}

	var req models.UpdateSubTaskRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid request body", err.Error())
		return
	}

	subtask, err := h.subtaskService.UpdateSubTask(uint(id), &req)
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to update subtask", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Subtask updated successfully", subtask)
}

// Delete deletes a subtask
func (h *SubTaskHandler) Delete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid subtask ID", err.Error())
		return
	}

	if err := h.subtaskService.DeleteSubTask(uint(id)); err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to delete subtask", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Subtask deleted successfully", nil)
}

// ToggleComplete toggles subtask completion status
func (h *SubTaskHandler) ToggleComplete(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		utils.ErrorResponse(c, http.StatusBadRequest, "Invalid subtask ID", err.Error())
		return
	}

	subtask, err := h.subtaskService.ToggleComplete(uint(id))
	if err != nil {
		utils.ErrorResponse(c, http.StatusInternalServerError, "Failed to toggle subtask", err.Error())
		return
	}

	utils.SuccessResponse(c, http.StatusOK, "Subtask toggled successfully", subtask)
}
