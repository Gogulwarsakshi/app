# Users Dashboard Frontend

A simple frontend dashboard to manage users via the backend API.

## Features

- View all users in a table
- Add new users
- Edit existing users
- Delete users
- Refresh user list

## Setup

1. Make sure the backend server is running on `http://localhost:3000`
2. Open `index.html` in a web browser

## API Integration

The frontend communicates with the backend API at `http://localhost:3000/api/users` using standard HTTP methods:

- GET `/users` - Retrieve all users
- POST `/users` - Create a new user
- PUT `/users/:id` - Update an existing user
- DELETE `/users/:id` - Delete a user

## Components

- `index.html` - Main HTML structure
- `styles.css` - Styling for the dashboard
- `script.js` - JavaScript logic for API interactions