# 🛒 Grocery API (NestJS)

A simple and modular Grocery API built with NestJS and MongoDB, supporting user authentication and CRUD operations for grocery items.

---

## 📋 Table of Contents

- [Features](#features)

- [Routes](#routes)

- [Installation](#installation)

- [Environment Variables](#environment-variables)

- [Running the Application](#running-the-application)

- [Project Structure](#project-structure)

- [Improvements](#improvements)

- [License](#license)

---

## ✅ Features

- User registration and login with JWT authentication.

- Create, Read, Update, Delete grocery items.

- Filter grocery items by name, price, and quantity.

- Health check route.

- Modular structure using NestJS best practices.

---

## 🔌 Routes

### 🌐 Base URL: `/v1`

| Method | Endpoint             | Description                            |
| ------ | -------------------- | -------------------------------------- |
| GET    | `/v1`                | Welcome message                        |
| GET    | `/v1/health`         | Health check                           |
| POST   | `/v1/auth/signup`    | Register a new user                    |
| POST   | `/v1/auth/login`     | Login and receive a JWT token          |
| POST   | `/v1/grocery`        | Create a new grocery item (auth)       |
| GET    | `/v1/grocery`        | Get all grocery items for user (auth)  |
| GET    | `/v1/grocery/:id`    | Get a single grocery item by ID (auth) |
| GET    | `/v1/grocery/filter` | Filter grocery items (auth)            |
| PATCH  | `/v1/grocery/:id`    | Update a grocery item by ID (auth)     |
| DELETE | `/v1/grocery/:id`    | Delete a grocery item by ID (auth)     |

---

## ⚙️ Installation

1.  **Clone the repo**

    ```
    git clone https://github.com/your-username/grocery-api.git
    cd grocery-api

    ```

2.  **Install dependencies**

    ```
    npm install

    ```

3.  **Set up your MongoDB and environment variables**

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following:

```
SERVER_PORT==3000
MONGO_URI=mongodb://localhost:27017/grocery-db
JWT_SECRET=your_jwt_secret_key



```

---

## ▶️ Running the Application

### Development

```
npm run start:dev

```

### Production

```
npm run build
npm run start:prod

```

---

## 🗂 Project Structure

```
src/
│
├── auth/              # Authentication (signup/login)
├── user/              # User model and logic
├── grocery/           # Grocery CRUD and filter routes
├── config/            # Configurations/env variables
├── utils/             # Global utilities
├── constants/         # Constants
├── app.module.ts      # Root module
├── main.ts            # Entry point

```

---

## 🚀 Improvements

To further enhance this API, I propose the following improvements, categorized by focus area:

### 👤 User Management

- Complete the User Controller by adding user-focused endpoints to enable comprehensive management of user profiles and related operations.
- Implement pagination on applicable endpoints to efficiently handle large datasets and improve response performance.

### 🔒 Security Enhancements

- Implement rate limiting using `@nestjs/throttler` to protect against brute-force attacks and API abuse.
- Develop a secure password reset flow via email, incorporating time-limited and single-use tokens.
- Introduce refresh token support to enable secure, long-lived user sessions with token rotation and revocation mechanisms.

### ✅ Testing and Quality Assurance

- Extend test coverage by including comprehensive unit and integration tests for all services and repositories to ensure robustness and maintainability.

### 📊 Observability and Monitoring

- Enable detailed request logging using `morgan`, with customization to capture relevant request and response metadata while safeguarding sensitive information.
- Integrate error tracking and monitoring tools such as Sentry or LogRocket to gain deeper insights into application performance and user experience issues.

## API Testing with Postman

The project includes a Postman collection for testing all API endpoints. Follow these steps to use it:

1. Install [Postman](https://www.postman.com/downloads/) if you haven't already.

2. Import the Postman collection:

   - Open Postman
   - Click "Import" button
   - Select the `Grocery-API.postman_collection.json` file from the project

3. Set up environment variables:

   - Create a new environment in Postman
   - Add the following variables:
     - `base_url`: `http://localhost:3000` (or your API URL)
     - `access_token`: Leave empty initially

4. Testing workflow:
   a. First, use the "Sign Up" endpoint to create a new user
   b. Then, use the "Login" endpoint to get an access token
   c. Copy the access token from the login response
   d. Update the `access_token` environment variable with the copied token
   e. Now you can use all other endpoints that require authentication

### Available Endpoints

#### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - Login and get access token

#### Grocery Items

- `POST /grocery` - Add a new grocery item
- `GET /grocery` - Get all grocery items for the authenticated user
- `GET /grocery/:id` - Get a specific grocery item
- `GET /grocery/filter` - Filter grocery items
- `PATCH /grocery/:id` - Update a grocery item
- `DELETE /grocery/:id` - Delete a grocery item

### Example Requests

1. Sign Up:

```json
POST {{base_url}}/auth/signup
{
    "email": "test@example.com",
    "first_name": "Test",
    "last_name": "User",
    "password": "TestPass123",
    "phone_number": "1234567890"
}
```

2. Login:

```json
POST {{base_url}}/auth/login
{
    "email": "test@example.com",
    "password": "TestPass123"
}
```

3. Add Grocery Item:

```json
POST {{base_url}}/grocery
{
    "name": "Milk",
    "quantity": 2,
    "price": 3.99
}
```

## Running Tests

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## License

This project is licensed under the MIT License.
