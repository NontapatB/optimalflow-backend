# 🧠 OptimalFlow Backend Developer Exercise

This is a backend API built with **Node.js (Express)** that simulates a basic user system for testing backend knowledge. Data is stored in a simple file-based JSON format (`users.json`), and JWT is used for authentication.

## 📦 Features

- Register new users with hashed passwords
- Login and receive JWT token
- View all users (without password)
- Transfer balance between users
- Protected endpoints using JWT
- Integration tests using Jest + Supertest
- Docker support

---

## 📁 Project Structure

```
.
├── app.js                   # Main Express app
├── controllers/            # Route handlers (controllers)
├── services/               # Business logic (userService.js)
├── middleware/             # JWT Auth middleware
├── data/users.json         # Data storage file
├── tests/app.test.js       # Integration test
├── Dockerfile              # For containerizing the app
├── docker-compose.yml      # For running with Docker
├── .env                    # Environment variables
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd optimalflow-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create `.env` file
```env
JWT_SECRET=NONTAPAT_SECRET_KEY
JWT_EXPIRES_IN=1h
PORT=3000
```

---

## 🧪 Run Tests

```bash
npm test
```

Test covers full user flow:
- Register
- Login
- Transfer balance (with token)

---

## 🐳 Run with Docker

### 1. Build & Run the container
```bash
docker-compose up --build
```

App will be available at:  
```
http://localhost:3000
```

### 2. Stop Docker
```bash
docker-compose down
```

---

## 📬 API Endpoints

Here 

| Method | Endpoint       | Description                 |
|--------|----------------|-----------------------------|
| POST   | `/users`       | Register new user           |
| POST   | `/login`       | Login and get JWT token     |
| GET    | `/users`       | Get all users               |
| POST   | `/transfer`    | Transfer balance (protected)|

> Protected routes require header:  
> `Authorization: Bearer <token>`

---

## 🧪 API Testing with Postman

You can test the API directly using Postman via this shared workspace:  
👉 [Postman Collection](https://postman.co/workspace/My-Workspace~d0e5e58e-37a7-4314-899d-8a1a7bf0effe/collection/37369421-c752e999-7551-4131-8978-c6ceea96d704?action=share&creator=37369421)
---

## 🙋 About This Project

This is an exercise project created as part of a backend developer application process.  
**File-based storage** was used instead of databases for simplicity and testing focus.

---

## 🧑‍💻 Author

Developed by [Nontapat](https://github.com/NontapatB)
