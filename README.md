# 🚀 Task Manager App (MERN Stack)

A full-stack Task Management application built using **MongoDB, Express, React, and Node.js (MERN)**.
This app allows teams to create projects, assign members, manage tasks, and track progress efficiently.

---

## 📌 Features

### 🔐 Authentication & Authorization

* User Signup & Login (JWT-based authentication)
* Role-based access:

  * **Admin**: Can create projects
  * **Member**: Can view and work on assigned projects

### 👥 User Management

* Fetch all users (for assigning project members)

### 📁 Project Management

* Admin can:

  * Create projects
  * Assign multiple members
* Users can:

  * View projects they created or are part of

### ✅ Task Management

* Create tasks inside projects
* Assign tasks to project members
* Update task status:

  * Todo
  * In Progress
  * Done
* View all tasks per project

### 📊 Dashboard

* Total tasks count
* Completed tasks
* Pending tasks

---

## 🛠 Tech Stack

### Backend:

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* bcrypt (password hashing)

### Frontend:

* React (Vite)
* React Router
* Axios
* Tailwind CSS

---

## 📂 Folder Structure

### Server

```
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── server.js
└── .env
```

### Client

```
client/
├── src/
│   ├── api/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── App.jsx
│   └── main.jsx
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```
git clone <your-repo-url>
cd project-folder
```

---

### 2️⃣ Backend Setup

```
cd server
npm install
```

Create `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Run server:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd client
npm install
npm run dev
```

App runs at:

```
http://localhost:5173
```

---

## 🔑 API Endpoints

### Auth

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Users

* `GET /api/users`

### Projects

* `POST /api/projects` (Admin only)
* `GET /api/projects`

### Tasks

* `POST /api/tasks`
* `GET /api/tasks/:projectId`
* `PUT /api/tasks/:id`

---

## 🔒 Security Features

* Password hashing using bcrypt
* JWT token authentication
* Protected routes using middleware
* Role-based authorization (admin/member)
* Project-level access control

---

## 📌 Future Improvements

* Task priority & labels
* File attachments
* Comments on tasks
* Notifications system
* Drag & drop Kanban board
* Dark mode UI

---

## 👨‍💻 Author

Lalit Kumar

---

## 📄 License

This project is licensed under the ISC License.

---

## ⭐ Notes

* Ensure MongoDB connection string is correct
* Admin role is required to create projects
* Only project members can access tasks
* Token is stored in localStorage for session persistence

---

🔥 Happy Coding!
