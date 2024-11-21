# Auth1.0-nodejs-mongodb
signin authorization with nodejs and mongodb
Here’s a short and straightforward version of the README for your signup and signin authentication process:

---

# Node.js Authentication System

A simple user authentication system built with Node.js, Express, and MongoDB. This project includes user signup, signin, and JWT-based authentication, using bcrypt for password hashing.

## Features

- **User Signup**: Create a new account with username and password validation.
- **User Signin**: Authenticate existing users and generate a JWT for session management.
- **JWT Authentication**: Protect routes with token-based authentication.
- **Password Hashing**: Secure passwords using bcrypt before saving to the database.

## Routes

1. **Signup** (`POST /signup`):
   - Request Body: `userName`, `password`, `confirmPassword`
   - Middleware: 
     - `validateUsername`: Ensures username is at least 5 characters.
     - `validatePassword`: Validates password and confirmation match.
     - `hashPassword`: Hashes password using bcrypt.
   - Creates a new user and saves it to MongoDB.

2. **Signin** (`POST /signin`):
   - Request Body: `userName`, `password`
   - Middleware: 
     - `validateSignin`: Verifies the user and password.
   - Returns a JWT if successful.

3. **Protected Route** (`GET /`):
   - Requires valid JWT in the `Authorization` header to access.

## Technologies Used

- **Node.js** & **Express**: Backend framework.
- **MongoDB**: NoSQL database for storing user data.
- **bcrypt**: Password hashing.
- **jsonwebtoken**: JWT for authentication.

---

This README gives a brief overview of the system and focuses on the core functionality. Let me know if you’d like any changes!