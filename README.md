# Express Server

A basic Express.js server setup with essential middleware and routes.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

The server will start on port 3000 by default.

## Endpoints

- `GET /` - Welcome message with timestamp
- `GET /health` - Health check returning server status and uptime
- All other routes return a 404 error

## Configuration

The server port can be changed by setting the `PORT` environment variable.