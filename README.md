# Task Manager

A full-stack task management application with real-time updates, activity logging, and a dynamic statistics dashboard. Built with the MERN stack (MongoDB, Express, React, Node.js) and enhanced with Socket.io for live synchronization.

## 🚀 Features

- **Real-time Synchronization**: Instant updates across all connected clients using Socket.io.
- **Task Management**: Create, read, update, and delete tasks with status tracking (To Do, In Progress, Done).
- **Activity Feed**: Live feed showing recent actions and system activities.
- **Dynamic Stats**: Quick overview of Pending, Completed, and Total tasks.
- **Tagging System**: Organize tasks with custom tags for better categorization.
- **Responsive UI**: Modern, clean, and responsive design powered by React-Bootstrap.
- **Toast Notifications**: Interactive feedback for user actions.

## 🛠️ Tech Stack

### Frontend
- **React (Vite)**
- **Bootstrap / React-Bootstrap**
- **Axios** (API Requests)
- **Socket.io-client** (Real-time events)
- **React Router** (Navigation)
- **React Toastify** (Notifications)

### Backend
- **Node.js**
- **Express**
- **MongoDB & Mongoose** (Database)
- **Socket.io** (Real-time server)
- **Dotenv** (Environment management)

## 📂 Project Structure

```text
manage-task/
├── server/             # Node.js Express Backend
│   ├── models/         # Mongoose Schemas (Task, Activity)
│   ├── routes/         # API Route Handlers
│   ├── index.js        # Server Entry Point
│   └── .env            # Backend Environment Variables
├── src/                # React Frontend
│   ├── components/     # UI Components (TaskForm, TaskList, etc.)
│   ├── services/       # API and Socket services
│   ├── App.jsx         # Main App Component
│   └── main.jsx        # Frontend Entry Point
└── package.json        # Frontend Dependencies
```

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js installed
- MongoDB (Local or Atlas)

### 2. Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` directory and add your configuration:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Start the server (development mode):
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the application at `http://localhost:5173`.

## 📝 License

This project is open-source. Feel free to use and modify it!
