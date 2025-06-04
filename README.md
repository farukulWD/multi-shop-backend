# 🛠️ Multi Shop  - Backend (MERN)

A Node.js + Express + MongoDB-based backend that supports multi-shop user authentication and global shop namespace enforcement.

---

## 🚀 Features

- User Sign up with:
  - Username
  - Password (validated)
  - 3+ Unique Shop Names (globally unique across all users)
- Secure Password Hashing (bcrypt)
- User Login with JWT + Session Control
- “Remember Me” Session Expiry (30 minutes or 7 days)
- Profile API (returns shop names and user info)
- Global Shop Namespace (no duplicate shop names allowed)
- Cross-Subdomain Token Support (CORS + Secure Cookies)

---

## 📦 Folder Structure
```
src/
├── app/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ ├── config/
│ ├── errors/
│ └── shared/
├── .env.example
├── app.ts
└── index.ts
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/farukulWD/multi-shop-backend.git
cd multi-shop-backend

2. Install Dependencies

npm install

3. Configure Environment

NODE_ENV = development
PORT=5000
MONGO_URI="your_mongodb_connection_string_here"
# Replace with your actual MongoDB connection string
CLIENT_DOMAIN=http://localhost:5173
JWT_SECRET=your_jwt_secret_here
BCRYPT_SALT_ROUNDS=10
JWT_EXPIRATION=1d



4. Run the Server

npm run dev





✅ Tech Stack
Express.js

MongoDB + Mongoose

JWT + Cookies

Bcrypt

CORS (Cross-Subdomain)

```
----


## 🔐 Authentication Endpoints

### 📌 Sign Up

**Endpoint:**  
`POST /api/v1/user/sign-up`

**URL:**  
https://multi-shop-backend-production-7894.up.railway.app/api/v1/user/sign-up

**Request Body (JSON):**
```json
{
  "username": "john2",
  "password": "12345678",
  "shops": [
    { "name": "shop6" },
    { "name": "shop5" },
    { "name": "shop7" }
  ]
}
```

---

### 🔑 Sign In

**Endpoint:**  
`POST /api/v1/auth/sign-in`

**URL:**  
https://multi-shop-backend-production-7894.up.railway.app/api/v1/auth/sign-in

**Request Body (JSON):**
```json
{
  "username": "userName",
  "password": "12345678",
  "rememberMe": true
}
```

---

### 👤 Get Profile

**Endpoint:**  
`GET /api/v1/auth/profile`

**URL:**  
https://multi-shop-backend-production-7894.up.railway.app/api/v1/auth/profile

> ⚠️ Note: Although it's a GET request, this API currently expects a request body.


```

---

### 🚪 Logout

**Endpoint:**  
`POST /api/v1/auth/logout`

**URL:**  
https://multi-shop-backend-production-7894.up.railway.app/api/v1/auth/logout


```

---

## 🧪 Testing

You can use tools like **Postman**, **Insomnia**, or `curl` to test the API endpoints.

---


