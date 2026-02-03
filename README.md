# Express Server with Users API & Dashboard

A full-stack application featuring an Express.js backend with MongoDB integration and a frontend dashboard for user management.

## Backend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will start on port 3000 by default.

## Backend Endpoints

- `GET /` - Welcome message with timestamp
- `GET /health` - Health check returning server status and uptime
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get a specific user
- `PUT /api/users/:id` - Update a specific user
- `DELETE /api/users/:id` - Delete a specific user
- All other routes return a 404 error

## Frontend Dashboard

The frontend dashboard is located in the `frontend/` directory and provides a user interface to manage users:

1. Navigate to the `frontend/` directory
2. Open `index.html` in a web browser
3. The dashboard will connect to the backend API at `http://localhost:3000/api/users`

## Configuration

The server port can be changed by setting the `PORT` environment variable in the `.env` file.