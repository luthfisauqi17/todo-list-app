# To-Do List Application

Aplikasi To-Do List full-stack dengan struktur project yang terorganisir, menggunakan Go (Backend) dan React (Frontend).

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Deployment](#deployment)

## ✨ Features

### Core Features
- ✅ Create, Read, Update, Delete (CRUD) tasks
- ✅ Mark tasks as completed
- ✅ View ongoing and completed tasks separately
- ✅ Task history/completed tasks list

### Additional Features
- 📅 Task deadlines with date and time
- ⚠️ Overdue task indicators
- 📝 Subtasks for each task
- ✏️ Edit and delete subtasks
- ✔️ Toggle subtask completion
- 📊 Progress bar based on subtask completion
- 🎯 Auto-complete main task when all subtasks are done

## 🛠 Tech Stack

**Backend:**
- Go 1.21+
- Gin Web Framework (REST API)
- GORM (ORM)
- PostgreSQL
- Clean Architecture (Repository-Service-Handler pattern)

**Frontend:**
- React 18+
- Vite (Build tool)
- Tailwind CSS (Styling)
- Axios (HTTP client)
- Lucide React (Icons)

**DevOps:**
- Docker & Docker Compose
- PostgreSQL Database
- Makefile for automation

## 📁 Project Structure

```
todo-list-app/
├── backend/
│   ├── cmd/
│   │   └── api/
│   │       └── main.go                 # Entry point
│   ├── internal/
│   │   ├── models/                     # Data models
│   │   ├── repository/                 # Data access layer
│   │   ├── service/                    # Business logic
│   │   ├── handler/                    # HTTP handlers
│   │   ├── middleware/                 # Middlewares
│   │   └── database/                   # DB connection
│   ├── pkg/
│   │   ├── config/                     # Configuration
│   │   └── utils/                      # Utilities
│   ├── migrations/                     # SQL migrations
│   ├── .env.example
│   ├── go.mod
│   ├── Dockerfile
│   └── Makefile
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/                 # Reusable components
│   │   │   ├── task/                   # Task components
│   │   │   ├── subtask/                # Subtask components
│   │   │   └── layout/                 # Layout components
│   │   ├── services/                   # API services
│   │   ├── hooks/                      # Custom hooks
│   │   ├── utils/                      # Helper functions
│   │   ├── constants/                  # Constants
│   │   ├── App.jsx
│   │   └── index.jsx
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── Dockerfile
│
├── docs/                               # Documentation
├── docker-compose.yml
└── README.md
```

## 📋 Prerequisites

- Go 1.21 or higher
- Node.js 18+ and npm/yarn
- PostgreSQL 13+
- Docker & Docker Compose (optional)
- Make (optional, for using Makefile)

## 🚀 Installation

### 1. Clone Repository

```bash
git clone <repository-url>
cd todo-list-app
```

### 2. Setup Backend

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_NAME=todoapp
# SERVER_PORT=8080

# Install dependencies
go mod download

# Run migrations (create database first)
make migrate-up
# or manually:
# createdb todoapp
# psql -U postgres -d todoapp -f migrations/001_create_tasks_table.sql
# psql -U postgres -d todoapp -f migrations/002_create_subtasks_table.sql
```

### 3. Setup Frontend

```bash
cd frontend

# Copy environment file
cp .env.example .env

# Edit .env
# VITE_API_URL=http://localhost:8080

# Install dependencies
npm install
# or
yarn install
```

## 🏃 Running the Application

### Option 1: Docker Compose (Recommended)

```bash
# From root directory
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

Access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- PostgreSQL: localhost:5432

### Option 2: Manual Setup

**Terminal 1 - Backend:**
```bash
cd backend
make run
# or
go run cmd/api/main.go
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# or
yarn dev
```

**Terminal 3 - Database:**
```bash
# Make sure PostgreSQL is running
sudo service postgresql start  # Linux
brew services start postgresql # macOS
```

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Endpoints

#### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create new task |
| GET | `/tasks` | Get all ongoing tasks |
| GET | `/tasks/:id` | Get task by ID |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |
| PATCH | `/tasks/:id/complete` | Mark task as completed |
| GET | `/tasks/completed` | Get completed tasks |

#### SubTasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks/:task_id/subtasks` | Create subtask |
| PUT | `/subtasks/:id` | Update subtask |
| DELETE | `/subtasks/:id` | Delete subtask |
| PATCH | `/subtasks/:id/complete` | Toggle subtask completion |

### Request Examples

**Create Task:**
```json
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive API docs",
  "deadline": "2025-10-30T17:00:00Z"
}
```

**Create SubTask:**
```json
POST /api/tasks/1/subtasks
Content-Type: application/json

{
  "title": "Write API endpoints documentation"
}
```

### Response Format

**Success Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "is_completed": false,
    "deadline": "2025-10-30T17:00:00Z",
    "created_at": "2025-10-25T10:00:00Z",
    "updated_at": "2025-10-25T10:00:00Z",
    "completed_at": null,
    "sub_tasks": [],
    "progress": 0
  }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Failed to create task",
  "error": "title is required"
}
```

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
make test
# or
go test -v ./...

# Test specific package
go test -v ./internal/service

# With coverage
go test -v -cover ./...
```

### API Testing with cURL

```bash
# Create task
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Task","description":"Testing"}'

# Get all tasks
curl http://localhost:8080/api/tasks

# Complete task
curl -X PATCH http://localhost:8080/api/tasks/1/complete

# Delete task
curl -X DELETE http://localhost:8080/api/tasks/1
```

### Seed Sample Data

```bash
cd backend
make seed
# or
psql -U postgres -d todoapp -f scripts/seed.sql
```

## 🏗 Build & Deployment

### Backend

```bash
cd backend

# Build binary
make build
# or
go build -o bin/todo-api cmd/api/main.go

# Run binary
./bin/todo-api
```

### Frontend

```bash
cd frontend

# Build for production
npm run build
# or
yarn build

# Preview production build
npm run preview
```

The build output will be in `frontend/dist/` directory.

### Docker Build

```bash
# Build backend image
docker build -t todo-api ./backend

# Build frontend image
docker build -t todo-frontend ./frontend

# Run with docker-compose
docker-compose up -d
```

## 🔧 Makefile Commands

**Backend:**
```bash
make help          # Show all commands
make run           # Run application
make build         # Build binary
make test          # Run tests
make clean         # Clean build artifacts
make migrate-up    # Run migrations
make migrate-down  # Rollback migrations
make seed          # Seed database
```

## 🌟 Features Demo

1. **Add Task**: Fill the form at the top and click "Add Task"
2. **Edit Task**: Click the pencil icon on any task
3. **Delete Task**: Click the trash icon
4. **Complete Task**: Click the checkbox next to the task
5. **Add SubTask**: Click the arrow to expand task, then add subtask
6. **View Progress**: Progress bar shows completion percentage
7. **Deadline Alerts**: Overdue tasks show red warning
8. **View History**: Click "Completed Tasks" to see completed items

## 🐛 Troubleshooting

**CORS Error:**
```bash
# Make sure backend CORS is configured correctly
# Check internal/middleware/cors.go
```

**Database Connection Error:**
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Check credentials in .env file
# Try connecting manually
psql -U postgres -d todoapp
```

**Port Already in Use:**
```bash
# Find process using the port
lsof -i :8080  # Backend
lsof -i :3000  # Frontend

# Kill the process
kill -9 <PID>
```

**Build Errors:**
```bash
# Backend
cd backend
go mod tidy
go clean -modcache

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```
