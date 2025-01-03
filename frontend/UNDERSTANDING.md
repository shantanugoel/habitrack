# Project Understanding

## Overview
The Habit Tracker is a full-stack application that helps users track their daily habits throughout the year. Users can create, manage, and track multiple habits, with each habit having a daily log entry for the entire year.

## Core Features
1. User Authentication
   - Register new account
   - Login to existing account
   - Logout functionality

2. Habit Management
   - Create new habits
   - Update existing habits
   - Delete habits
   - View all habits

3. Habit Logging
   - Each habit has 365/366 log entries (one per day)
   - Mark habits as done/undone for each day
   - Add notes to daily logs
   - View habit progress over time

## Backend API Endpoints

### Authentication
- POST /auth/register
  - Register new user
  - Body: { email: string, password: string, name: string }

- POST /auth/login
  - Login user
  - Body: { email: string, password: string }

### Habits
- GET /habits
  - List all habits for authenticated user
  - Returns: Array of Habit objects

- POST /habits
  - Create new habit
  - Body: { name: string, target?: string, notes?: string }
  - Creates 365/366 log entries for the year automatically

- PUT /habits/:id
  - Update habit
  - Body: { name: string, target?: string, notes?: string }

- DELETE /habits/:id
  - Delete habit and all its logs

### Habit Logs
- GET /habits/:id/logs
  - Get all logs for a habit
  - Returns: Array of HabitLog objects

- PUT /habits/:id/logs/:logId
  - Update habit log
  - Body: { date: Date, done: boolean, notes?: string }

## API Documentation

### Authentication Endpoints

All authentication endpoints are prefixed with `/api/auth`

#### Register
- **Endpoint**: `POST /api/auth/register`
- **Request Body**:
  ```typescript
  {
    name: string;
    email: string;
    password: string;
  }
  ```
- **Response**: Empty response with 200 status code
- **Description**: Creates a new user and sends a welcome email with verification link

#### Login
- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```typescript
  {
    email: string;
    password: string;
  }
  ```
- **Response**:
  ```typescript
  {
    token: string;
    pid: string;
    name: string;
    is_verified: boolean;
  }
  ```
- **Description**: Authenticates user and returns JWT token

#### Current User
- **Endpoint**: `GET /api/auth/current`
- **Headers**: 
  - `Authorization: Bearer <token>`
- **Response**:
  ```typescript
  {
    pid: string;
    name: string;
    email: string;
  }
  ```
- **Description**: Returns current authenticated user's information

#### Verify Email
- **Endpoint**: `POST /api/auth/verify`
- **Request Body**:
  ```typescript
  {
    token: string;
  }
  ```
- **Response**: Empty response with 200 status code
- **Description**: Verifies user's email address using token from email

#### Forgot Password
- **Endpoint**: `POST /api/auth/forgot`
- **Request Body**:
  ```typescript
  {
    email: string;
  }
  ```
- **Response**: Empty response with 200 status code
- **Description**: Sends password reset email to user

#### Reset Password
- **Endpoint**: `POST /api/auth/reset`
- **Request Body**:
  ```typescript
  {
    token: string;
    password: string;
  }
  ```
- **Response**: Empty response with 200 status code
- **Description**: Resets user's password using token from email

### Error Responses
All endpoints may return the following error responses:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Invalid or missing authentication
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

## Data Models

### User
```typescript
interface User {
  id: number;
  email: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
```

### Habit
```typescript
interface Habit {
  id: number;
  user_id: number;
  name: string;
  target?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}
```

### HabitLog
```typescript
interface HabitLog {
  id: number;
  habit_id: number;
  date: Date;
  done: boolean;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}
```

## Key Technical Decisions
1. Authentication using JWT tokens
2. Automatic creation of year's logs when creating a habit
3. Cascading deletes for habits and their logs
4. Optimistic UI updates for better UX
5. Client-side caching for performance
6. Responsive design for all screen sizes

## Frontend State Management

### Auth Store
The auth store manages authentication state including:
- User login/registration
- JWT token management
- User session persistence
- Loading and error states

### Protected Routes
Routes requiring authentication:
- `/dashboard`
- `/habits`
- `/profile`

Guest-only routes:
- `/auth/login`
- `/auth/register`
- `/auth/forgot-password`
- `/auth/reset-password`
