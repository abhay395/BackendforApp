# Task Management CLI

A robust Node.js backend application for task management with authentication, notifications, and task statistics features.

## Features

- User Authentication (signup, login, password reset)
- Task Management (CRUD operations)
- Task Statistics
- Real-time Notifications using Firebase
- Email Notifications
- Error Handling and Logging

## Tech Stack

- Node.js
- Express.js
- MongoDB (with Mongoose)
- Firebase Admin
- JWT Authentication
- Nodemailer
- Winston Logger

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Firebase project credentials

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Create a `.env` file in the root directory with the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
4. Set up Firebase credentials in `config/firebase.js`

## Usage

Start the development server:
```bash
npm start
```

## API Endpoints

### Authentication
- POST `/api/auth/signup` - User registration
- POST `/api/auth/login` - User login
- POST `/api/auth/reset-password` - Password reset

### Tasks
- GET `/api/tasks` - Get all tasks
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task

### Task Statistics
- GET `/api/stats` - Get task statistics

### Notifications
- GET `/api/notifications` - Get user notifications

## Project Structure

```
├── config/             # Configuration files
├── controller/         # Route controllers
├── db/                # Database connection
├── middleware/        # Custom middleware
├── model/            # Database models
├── routes/           # API routes
├── services/         # Business logic
└── utils/            # Utility functions
```

## Error Handling

The application uses a custom error handling middleware and Winston logger for error tracking and logging.

## License

ISC
