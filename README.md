# 🛒 Grocery API (NestJS)

A simple and modular Grocery API built with NestJS and MongoDB, supporting user authentication and CRUD operations for grocery items.

---

## 📋 Table of Contents

- [Features](https://chatgpt.com/c/6835e053-6c00-8000-b78e-35ae4a96e307#features)

- [Routes](https://chatgpt.com/c/6835e053-6c00-8000-b78e-35ae4a96e307#routes)

- [Installation](https://chatgpt.com/c/6835e053-6c00-8000-b78e-35ae4a96e307#installation)

- [Environment Variables](https://chatgpt.com/c/6835e053-6c00-8000-b78e-35ae4a96e307#environment-variables)

- [Running the Application](https://chatgpt.com/c/6835e053-6c00-8000-b78e-35ae4a96e307#running-the-application)

- [Project Structure](https://chatgpt.com/c/6835e053-6c00-8000-b78e-35ae4a96e307#project-structure)

- [Improvements](https://chatgpt.com/c/6835e053-6c00-8000-b78e-35ae4a96e307#improvements)

- [License](https://chatgpt.com/c/6835e053-6c00-8000-b78e-35ae4a96e307#license)

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
PORT=3000
MONGO_URI=mongodb://localhost:27017/grocery-db
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=3600s

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
├── constants/         # Constants
├── app.module.ts      # Root module
├── main.ts            # Entry point

```

---

## 🚀 Suggested Improvements

To enhance this API further, consider implementing the following:

### 🔒 Security

- Rate limiting with `@nestjs/throttler`

- Password reset flow via email

- Refresh token support

### 📊 Observability

- Enable detailed request logging (already using `morgan`)

- Integrate with services like Sentry or LogRocket
