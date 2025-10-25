package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/luthfisauqi17/todo-list-app/internal/database"
	"github.com/luthfisauqi17/todo-list-app/internal/handler"
	"github.com/luthfisauqi17/todo-list-app/internal/middleware"
	"github.com/luthfisauqi17/todo-list-app/internal/repository"
	"github.com/luthfisauqi17/todo-list-app/internal/service"
	"github.com/luthfisauqi17/todo-list-app/pkg/config"
)

func main() {
	cfg := config.Load()

	db, err := database.NewPostgresDB(cfg)
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	taskRepo := repository.NewTaskRepository(db)
	subtaskRepo := repository.NewSubTaskRepository(db)

	taskService := service.NewTaskService(taskRepo, subtaskRepo)
	subtaskService := service.NewSubTaskService(subtaskRepo, taskRepo)

	taskHandler := handler.NewTaskHandler(taskService)
	subtaskHandler := handler.NewSubTaskHandler(subtaskService)

	router := gin.Default()

	router.Use(middleware.CORS())
	router.Use(middleware.Logger())

	api := router.Group("/api")
	{
		tasks := api.Group("/tasks")
		{
			tasks.POST("", taskHandler.Create)
			tasks.GET("", taskHandler.GetAll)
			tasks.GET("/:id", taskHandler.GetByID)
			tasks.PUT("/:id", taskHandler.Update)
			tasks.DELETE("/:id", taskHandler.Delete)
			tasks.PATCH("/:id/complete", taskHandler.Complete)
			tasks.GET("/completed", taskHandler.GetCompleted)
		}

		subtasks := api.Group("/tasks/:task_id/subtasks")
		{
			subtasks.POST("", subtaskHandler.Create)
		}

		api.PUT("/subtasks/:id", subtaskHandler.Update)
		api.DELETE("/subtasks/:id", subtaskHandler.Delete)
		api.PATCH("/subtasks/:id/complete", subtaskHandler.ToggleComplete)
	}

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{"status": "ok"})
	})

	log.Printf("Server starting on port %s", cfg.ServerPort)
	if err := router.Run(":" + cfg.ServerPort); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
