package models

import "time"

type SubTask struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	TaskID      uint      `json:"task_id" gorm:"not null"`
	Title       string    `json:"title" gorm:"not null" binding:"required"`
	IsCompleted bool      `json:"is_completed" gorm:"default:false"`
	CreatedAt   time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time `json:"updated_at" gorm:"autoUpdateTime"`
}

type CreateSubTaskRequest struct {
	Title string `json:"title" binding:"required,min=1,max=255"`
}

type UpdateSubTaskRequest struct {
	Title string `json:"title" binding:"omitempty,min=1,max=255"`
}

func (SubTask) TableName() string {
	return "sub_tasks"
}
