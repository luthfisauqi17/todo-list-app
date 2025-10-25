.PHONY: help run build test clean migrate-up migrate-down

help: ## Show this help message
	@echo 'Usage: make [target]'
	@echo ''
	@echo 'Available targets:'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  %-15s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

run: ## Run the application
	@echo "Starting application..."
	go run cmd/api/main.go

build: ## Build the application
	@echo "Building application..."
	go build -o bin/todo-api cmd/api/main.go

test: ## Run tests
	@echo "Running tests..."
	go test -v ./...

clean: ## Clean build artifacts
	@echo "Cleaning..."
	rm -rf bin/
	go clean

install: ## Install dependencies
	@echo "Installing dependencies..."
	go mod download
	go mod tidy

migrate-up: ## Run database migrations
	@echo "Running migrations..."
	psql -U postgres -d todoapp -f migrations/001_create_tasks_table.sql
	psql -U postgres -d todoapp -f migrations/002_create_subtasks_table.sql

migrate-down: ## Rollback database migrations
	@echo "Rolling back migrations..."
	psql -U postgres -d todoapp -c "DROP TABLE IF EXISTS sub_tasks CASCADE;"
	psql -U postgres -d todoapp -c "DROP TABLE IF EXISTS tasks CASCADE;"

docker-up: ## Start docker containers
	docker-compose up -d

docker-down: ## Stop docker containers
	docker-compose down

docker-logs: ## View docker logs
	docker-compose logs -f

seed: ## Seed database with sample data
	@echo "Seeding database..."
	psql -U postgres -d todoapp -f scripts/seed.sql

.DEFAULT_GOAL := help