export const PORT = process.env.PORT || 3000;

// Default to a local, unauthenticated MongoDB for convenience when running
// the backend locally (without Docker). When running inside Docker Compose
// the environment variable MONGO_URL set in the compose file will override
// this value and point to the `mongo` service with credentials.
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/the_database';

export const NODE_ENV = process.env.NODE_ENV || 'development';