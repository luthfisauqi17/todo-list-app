package models

import "time"

type Task struct {
	ID          uint       `json:"id" gorm:"primaryKey"`
	Title       string     `json:"title" gorm:"not null" binding:"required"`
	Description string     `json:"description"`
	IsCompleted bool       `json:"is_completed" gorm:"default:false"`
	Deadline    *time.Time `json:"deadline"`
	CreatedAt   time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	CompletedAt *time.Time `json:"completed_at"`
	SubTasks    []SubTask  `json:"sub_tasks,omitempty" gorm:"foreignKey:TaskID;constraint:OnDelete:CASCADE"`
	Progress    int        `json:"progress" gorm:"-"` // Calculated field, not stored in DB
}

type CreateTaskRequest struct {
	Title       string     `json:"title" binding:"required,min=1,max=255"`
	Description string     `json:"description" binding:"max=1000"`
	Deadline    *time.Time `json:"deadline"`
}

type UpdateTaskRequest struct {
	Title       string     `json:"title" binding:"omitempty,min=1,max=255"`
	Description string     `json:"description" binding:"max=1000"`
	Deadline    *time.Time `json:"deadline"`
}

func (t *Task) CalculateProgress() {
	if len(t.SubTasks) == 0 {
		t.Progress = 0
		return
	}

	completed := 0
	for _, st := range t.SubTasks {
		if st.IsCompleted {
			completed++
		}
	}

	t.Progress = (completed * 100) / len(t.SubTasks)
}

func (t *Task) IsOverdue() bool {
	if t.Deadline == nil || t.IsCompleted {
		return false
	}
	return t.Deadline.Before(time.Now())
}

func (Task) TableName() string {
	return "tasks"
}
