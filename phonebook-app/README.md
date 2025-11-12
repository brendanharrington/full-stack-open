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

## Running locally (without Docker)

If you prefer to run the frontend and backend directly on your machine (no Docker), the project supports that workflow. The backend requires a running MongoDB instance for persistence. You can either run a local MongoDB (no auth) or start the Docker Mongo service from the provided compose file.

1. Start the backend (in one terminal):

```bash
cd phonebook-backend
# Run the backend; it expects MONGO_URL to point to a running MongoDB.
npm run dev

# To use the authenticated Mongo started by docker-compose (recommended for parity with the dev stack):
# MONGO_URL='mongodb://root:example@localhost:27017/the_database?authSource=admin' npm run dev
```

2. Start the frontend (in another terminal):

```bash
cd phonebook-frontend
# By default the frontend proxies /api to http://localhost:3000
npm run dev

# If your backend runs on a different host/port, set BACKEND_URL:
# BACKEND_URL='http://localhost:3001' npm run dev
```

3. Open the app in your browser at the Vite URL shown (usually http://localhost:5173). API requests to /api are proxied to the backend.

Notes:
- The backend requires MongoDB. If you don't have a local Mongo instance, start the Docker Mongo used by the dev compose file:

```bash
# start only Mongo from the dev compose file
docker compose -f docker-compose.dev.yml up -d mongo
```

This README contains both Docker and local run instructions; choose the flow that fits your development setup.
