# API Specification for Backend Integration

## Overview

This document specifies the exact API endpoints needed to integrate the IdeaZen frontend with a backend service. It includes request and response formats, validation rules, error handling, authentication requirements, database schema, and security considerations.

The frontend is complete and ready for backend integration. All data models are defined and mock data demonstrates expected structures.

---

## Base URL

**Development Environment:** http://localhost:3000/api  
**Production Environment:** https://api.ideazen.com/api

All endpoints are prefixed with /api for clear separation between API and frontend routes.

---

## Authentication Strategy

### Method
JSON Web Tokens (JWT) for stateless authentication.

### Storage Options
httpOnly cookies recommended for security or localStorage for simpler implementation.

### Token Expiration
Seven days for access tokens with refresh tokens for longer sessions.

### Request Headers
Authorization header with Bearer token format and Content-Type as application/json required for all authenticated endpoints.

---

## Core Endpoints

### Generate Project Endpoint

**Purpose:** Generate personalized project idea based on user inputs  
**Method:** POST  
**Path:** /api/generate-project  
**Authentication:** Optional but rate limited more strictly if not authenticated

**Request Body Structure**

The request includes userInputs object with required skillLevel field as beginner, intermediate, or advanced, and optional fields domain, learningGoal, timeAvailability, deployment, technologies array, architecture, scalability, constraints, teamSize, and difficultyStretch.

The mode field specifies normal, increase, simplify, or new generation type.

Optional previousProject object can be included for refinement with title and features fields.

**Response Structure (Success)**

Response includes success boolean true and project object containing optional id for database-saved projects, required title, difficulty matching request level, detailed description, reasoning explaining AI choice, features array with 5-8 items, techStack object with primary and alternative arrays, roadmap array with phase objects containing phase number, title, description, duration, and optional tasks array, skillOutcomes array with 4-6 learning goals, feasibility as High, Medium, or Low, confidence string with percentage and justification, estimatedDuration string, optional difficultyScore from 1 to 10, optional tags array, optional resources array with title, url, and type fields, createdAt timestamp, and optional generationTime in seconds.

**Error Responses**

400 Bad Request returns success false with error object containing code INVALID_INPUT, descriptive message, and optional field that failed validation.

429 Too Many Requests returns success false with error object containing code RATE_LIMIT_EXCEEDED, helpful message, and retryAfter seconds.

500 Internal Server Error returns success false with error object containing code GENERATION_FAILED, user-friendly message, and optional details for debugging.

**Rate Limiting Rules**

Unauthenticated users get 5 generations per hour per IP address.

Authenticated free users get 20 generations per day.

Authenticated premium users get unlimited generations in future implementation.

**AI Prompt Engineering**

The backend should construct detailed prompts positioning the AI as expert coding mentor helping specific skill level developer.

User context includes skill level, domain interest, learning goal, time available, deployment preference, and optional preferred technologies.

Task requires generating detailed actionable project matching skill level, completable in timeframe, teaching relevant skills, with mode-specific adjustments for increase or simplify.

Output format must be strict JSON matching GeneratedProject interface with specific, exciting project name, appropriate difficulty, clear description, explanatory reasoning, 5-8 implementable features, recommended and alternative tech stacks, 4-5 phase roadmap with realistic durations, 4-6 specific skills to learn, feasibility rating, and confidence with justification.

Important considerations include being specific and actionable, providing realistic time estimates, matching tech stack to skill level, and ensuring features are clear and implementable.

---

## User Authentication Endpoints

### Register New User

**Method:** POST  
**Path:** /api/auth/register  
**Authentication:** None

**Request Body**

Requires email, password, and optional name.

**Success Response (201 Created)**

Returns success true, user object with id, email, name, and createdAt, and token string.

**Error Response (400)**

Returns success false with error code EMAIL_EXISTS when email already registered.

### Login Existing User

**Method:** POST  
**Path:** /api/auth/login  
**Authentication:** None

**Request Body**

Requires email and password.

**Success Response (200 OK)**

Returns success true, user object with id, email, and name, and token string.

**Error Response (401)**

Returns success false with error code INVALID_CREDENTIALS for wrong credentials.

### Get Current User

**Method:** GET  
**Path:** /api/auth/me  
**Authentication:** Required with Bearer token

**Success Response (200 OK)**

Returns success true and user object with id, email, name, createdAt, projectCount, generationsToday, and generationsRemaining.

### Logout User

**Method:** POST  
**Path:** /api/auth/logout  
**Authentication:** Required with Bearer token

**Success Response (200 OK)**

Returns success true and confirmation message.

---

## Project Management Endpoints

### Save Project

**Method:** POST  
**Path:** /api/projects  
**Authentication:** Required with Bearer token

**Request Body**

Includes project object with all GeneratedProject fields and userInputs object with original form data.

**Success Response (201 Created)**

Returns success true and project object with database id, userId, all project fields, isFavorite boolean, status as planned, in-progress, or completed, and createdAt timestamp.

### Get User Projects

**Method:** GET  
**Path:** /api/projects  
**Authentication:** Required with Bearer token

**Query Parameters**

Optional status filter, skillLevel filter, page number defaulting to 1, and limit per page defaulting to 10 with max 50.

**Success Response (200 OK)**

Returns success true, projects array with summary objects, and pagination object with page, limit, total, and totalPages.

### Get Single Project

**Method:** GET  
**Path:** /api/projects/:id  
**Authentication:** Required with Bearer token

**Success Response (200 OK)**

Returns success true and complete project object with all fields including status, isFavorite, completedPhases array, notes, createdAt, and updatedAt.

### Update Project

**Method:** PUT  
**Path:** /api/projects/:id  
**Authentication:** Required with Bearer token

**Request Body**

Can update status, isFavorite, completedPhases array, and notes.

**Success Response (200 OK)**

Returns success true and updated project object.

### Delete Project

**Method:** DELETE  
**Path:** /api/projects/:id  
**Authentication:** Required with Bearer token

**Success Response (200 OK)**

Returns success true and confirmation message.

---

## Analytics Endpoints (Optional)

### Track Event

**Method:** POST  
**Path:** /api/analytics/track  
**Authentication:** Optional

**Request Body**

Includes event type like project_generated or difficulty_increased and properties object with relevant data.

**Success Response (200 OK)**

Returns success true.

### Get Popular Projects

**Method:** GET  
**Path:** /api/analytics/popular  
**Authentication:** None

**Success Response (200 OK)**

Returns success true and popular array with project types, counts, average feasibility, and average duration.

---

## Database Schema

### Users Table

Fields include id as UUID primary key, email as unique varchar 255, password_hash as varchar 255, optional name as varchar 255, created_at timestamp, updated_at timestamp, last_login timestamp, is_active boolean default true, role varchar 50 default user, generations_today integer default 0, and last_generation_reset timestamp.

Index on email for fast lookups.

### Projects Table

Fields include id as UUID primary key, user_id as UUID foreign key to users with cascade delete, title as varchar 255, difficulty as varchar 50, description as text, reasoning as text, features as JSONB, tech_stack as JSONB, roadmap as JSONB, skill_outcomes as JSONB, feasibility as varchar 50, confidence as varchar 255, status as varchar 50 default planned, is_favorite boolean default false, completed_phases as JSONB default empty array, notes as text, created_at timestamp, and updated_at timestamp.

Indexes on user_id, status, and created_at descending.

### User Inputs Table

Fields include id as UUID primary key, project_id as UUID foreign key to projects with cascade delete, skill_level as varchar 50, domain as varchar 100, learning_goal as varchar 100, time_availability as varchar 50, deployment as varchar 50, technologies as JSONB, architecture as varchar 100, scalability as varchar 50, constraints as text, team_size as varchar 50, difficulty_stretch as varchar 50, and created_at timestamp.

Index on project_id.

### Analytics Events Table (Optional)

Fields include id as UUID primary key, user_id as UUID foreign key to users with set null on delete, event_type as varchar 100, properties as JSONB, and created_at timestamp.

Indexes on event_type and created_at descending.

---

## Security Requirements

### Input Validation

Sanitize all user inputs. Validate skill level is one of three options. Limit string lengths with description max 5000 characters. Validate email format. Validate password strength with minimum 8 characters mixing letters and numbers.

### Rate Limiting

Implement IP-based rate limiting for unauthenticated requests. Use user-based rate limiting for authenticated requests. Apply exponential backoff for repeated failures. Track daily generation counts per user. Reset counters at midnight.

### Authentication Security

Hash passwords with bcrypt using 10 or more rounds. Use httpOnly cookies for tokens to prevent XSS. Implement CSRF protection for state-changing requests. Set token expiration to 7 days recommended. Implement refresh token rotation for security.

### API Security

Configure CORS to whitelist only frontend origin. Use Helmet.js for security headers. Set request size limits with max 10MB. Prevent SQL injection using ORM or parameterized queries. Prevent XSS by sanitizing outputs.

### AI API Security

Never expose AI API keys to frontend. Implement prompt injection protection to sanitize user inputs. Validate AI responses before sending to frontend. Set timeout limits with 30 seconds max. Implement retry logic with exponential backoff.

---

## Error Codes Reference

INVALID_INPUT with status 400 indicates request validation failed.

EMAIL_EXISTS with status 400 indicates email already registered.

INVALID_CREDENTIALS with status 401 indicates wrong email or password.

UNAUTHORIZED with status 401 indicates no valid token provided.

FORBIDDEN with status 403 indicates access denied to resource.

NOT_FOUND with status 404 indicates resource not found.

RATE_LIMIT_EXCEEDED with status 429 indicates too many requests.

GENERATION_FAILED with status 500 indicates AI generation error.

DATABASE_ERROR with status 500 indicates database operation failed.

INTERNAL_ERROR with status 500 indicates unexpected server error.

---

## Testing Requirements

### Required Test Coverage

Unit tests for all API endpoints. Integration tests for authentication flow. Load testing for generation endpoint handling concurrent requests. Security testing for SQL injection, XSS, CSRF, and other vulnerabilities.

### Test Data

Use the mock projects in App.tsx PROJECT_DATABASE as test fixtures for AI response validation. Ensure generated responses match expected structure. Validate all required fields present. Test edge cases for each skill level.

---

## Implementation Priority

### Phase 1 (Critical)
Generate Project endpoint as primary feature. Rate limiting to prevent abuse. Basic error handling for user experience. AI integration with OpenAI or Claude.

### Phase 2 (Important)
User authentication system. Project saving to database. User profile management. Input validation and sanitization.

### Phase 3 (Enhancement)
Project listing and filtering. Project update and delete. Analytics tracking. Popular projects endpoint.

### Phase 4 (Advanced)
Advanced AI refinement. Real-time generation updates. Collaboration features. Premium tier features.

---

## Performance Targets

API response time should be under 3 seconds for generation endpoint and under 500ms for other endpoints.

Database queries should use proper indexes and be optimized for common access patterns.

AI generation should handle concurrent requests and implement queuing if necessary.

Caching should cache common responses and use Redis for session data.

---

## Related Documentation

See FRONTEND_ARCHITECTURE for frontend technical details and data models.

See PROJECT_OVERVIEW for high-level project overview and user experience.

See guidelines/Guidelines for design system guidelines.

Reference App.tsx for current mock implementation and data structures.

---

**Version:** 1.1.0  
**Status:** Ready for Backend Implementation  
**Last Updated:** January 2025
