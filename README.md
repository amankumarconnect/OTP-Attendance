# OTP Attendance System

A MERN stack application designed to streamline the attendance process in educational institutions. This system allows faculty to create classes and take attendance using a secure OTP (One-Time Password) mechanism, while students can easily mark their attendance and view their records.

## Features

### 👨‍🏫 Faculty

- **Create Classes:** Easily create new classes to manage attendance.
- **Take Attendance:** Generate a unique, time-sensitive OTP for students to mark their attendance for a specific session.
- **View Attendance:** Access detailed attendance records for each class, filtered by date.
- **Class Management:** Edit class titles or delete classes as needed.
- **Dashboard:** A centralized view of all created classes.

### 👨‍🎓 Student

- **Mark Attendance:** Enter the OTP provided by the faculty to mark presence for a class.
- **View Attendance:** Check personal attendance history and percentage for enrolled classes.
- **Dashboard:** View all classes the student is enrolled in.

## 🛠️ Tech Stack

### Frontend

- **React:** UI library for building interactive interfaces.
- **Vite:** Fast build tool and development server.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **DaisyUI:** Component library for Tailwind CSS.
- **React Router:** For client-side routing.
- **Google OAuth:** For secure user authentication.

### Backend

- **Node.js & Express.js:** Server-side runtime and framework.
- **MongoDB & Mongoose:** NoSQL database and object modeling.
- **Google Auth Library:** For verifying Google OAuth tokens on the server.
- **CORS:** Middleware to enable Cross-Origin Resource Sharing.

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas URI)
- A Google Cloud Console project with OAuth 2.0 credentials (Client ID).

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd OTP-Attendance
```

### 2. Backend Setup

Navigate to the server directory and install dependencies:

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and add your MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
```

### 3. Frontend Setup

Navigate to the client directory and install dependencies:

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory and add your Google Client ID:

```env
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🏃‍♂️ Running the Application

### Start the Backend Server

In the `server` directory:

```bash
npm run dev
```

The server will start on `http://localhost:3000`.

### Start the Frontend Client

In the `client` directory:

```bash
npm run dev
```

The client will start on `http://localhost:5173` (or the port shown in the terminal).

## 📂 Project Structure

```
OTP-Attendance/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React Context (Auth)
│   │   ├── pages/          # Page components (Login, Home, etc.)
│   │   └── ...
│   └── ...
├── server/                 # Backend Express application
│   ├── config/             # Database configuration
│   ├── controllers/        # Request handlers
│   ├── models/             # Mongoose models (User, Class, Attendance)
│   ├── routes/             # API routes
│   └── ...
└── README.md               # Project documentation
```

## 🗺️ Roadmap

Check out our [TODO.md](TODO.md) to see the planned features, known bugs, and future improvements.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.
