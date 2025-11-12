# Docker Phonebook Application

A full-stack phonebook application with React frontend, Express backend, and MongoDB database, all containerized with Docker.

## Project Structure

```
phonebook-app/
├── phonebook-frontend/       # React + Vite frontend
├── phonebook-backend/        # Express backend
├── docker-compose.dev.yml    # Development environment
├── docker-compose.yml        # Production environment
├── nginx.dev.conf           # Development nginx config
└── nginx.conf               # Production nginx config
```

## Features

- ✅ Add, update, and delete contacts
- ✅ MongoDB persistence
- ✅ Separate development and production environments
- ✅ Hot reload in development
- ✅ Nginx reverse proxy
- ✅ Docker containerization

## Prerequisites

- Docker (20.10+)
- Docker Compose (2.0+)

## Development Environment

### Start Development Environment

```bash
docker-compose -f docker-compose.dev.yml up --build
```

The application will be available at:

- **App**: http://localhost
- **Frontend Dev Server**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **MongoDB**: localhost:27017

### Development Features

- Hot reload for both frontend and backend
- Source code mounted as volumes
- Nodemon for backend auto-restart
- Vite HMR for frontend

### Stop Development Environment

```bash
docker-compose -f docker-compose.dev.yml down
```

### Remove Development Data

```bash
docker-compose -f docker-compose.dev.yml down -v
```

## Production Environment

### Build and Start Production Environment

```bash
docker-compose up --build -d
```

The application will be available at:

- **App**: http://localhost

### Production Features

- Optimized builds
- Multi-stage Docker builds
- Nginx serving static files
- Production-ready configuration

### Stop Production Environment

```bash
docker-compose down
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
```

## Environment Variables

### Backend (phonebook-backend)

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Backend port | `3000` |
| `MONGO_URL` | MongoDB connection string | See docker-compose files |
| `NODE_ENV` | Environment | `development` |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/persons` | Get all persons |
| GET | `/api/persons/:id` | Get single person |
| POST | `/api/persons` | Create new person |
| PUT | `/api/persons/:id` | Update person |
| DELETE | `/api/persons/:id` | Delete person |

## Database

MongoDB is initialized with sample data on first run:

- Person 0 (000-000-0000)
- Person 1 (111-111-1111)
- Person 2 (222-222-2222)

## Troubleshooting

### Port Already in Use

If you get port conflict errors:

```bash
# Check what's using the port
sudo lsof -i :80
sudo lsof -i :3000

# Kill the process or change ports in docker-compose files
```

### MongoDB Connection Issues

```bash
# Check MongoDB logs
docker logs mongo-dev  # or mongo for production

# Restart MongoDB
docker restart mongo-dev
```

### Frontend Not Loading

```bash
# Check frontend logs
docker logs phonebook-frontend-dev

# Rebuild frontend
docker-compose -f docker-compose.dev.yml up --build frontend
```

### Clear Everything and Start Fresh

```bash
# Development
docker-compose -f docker-compose.dev.yml down -v
docker system prune -f
docker-compose -f docker-compose.dev.yml up --build

# Production
docker-compose down -v
docker system prune -f
docker-compose up --build
```

## Development Workflow

1. Make changes to source code
2. Changes auto-reload in browser (frontend) or server restarts (backend)
3. Test functionality
4. Commit changes

## Production Deployment

1. Build production images:

   ```bash
   docker-compose build
   ```

2. Start services:

   ```bash
   docker-compose up -d
   ```

3. Check health:

   ```bash
   docker-compose ps
   ```

## Tech Stack

- **Frontend**: React 19, Vite
- **Backend**: Node.js, Express 5
- **Database**: MongoDB 7
- **Proxy**: Nginx
- **Containerization**: Docker & Docker Compose
