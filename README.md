# TaskMaster - Modern Todo List Application

A beautiful, modern full-stack todo list application built with React, Node.js, Express, and MongoDB.

## ✨ Features

- **🔐 User Authentication**: Secure user registration and login system
- **👤 User Profiles**: Personal accounts with profile management
- **🎯 Personal Tasks**: Each user has their own private task lists
- **Modern UI Design**: Beautiful gradient backgrounds, smooth animations, and responsive design
- **Task Management**: Add, complete, undo, and delete tasks
- **Separated Views**: Active tasks and completed tasks in separate, organized views
- **Real-time Updates**: Instant UI updates when tasks are modified
- **📊 Task Statistics**: Track your productivity with completion rates and task counts
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **🔒 Protected Routes**: Secure access to user-specific content

## 🚀 Technologies Used

### Frontend

- **React 19** with hooks (useState, useEffect)
- **Material-UI** for form components and icons
- **React Router** for navigation
- **Axios** for API calls
- **CSS3** with modern animations and gradients
- **Bootstrap 5** for responsive grid system

### Backend

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **Body-parser** for request parsing

## 📁 Project Structure

```
toDoList/
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Main app component with routing
│   │   ├── ToDoList.jsx           # Active tasks component
│   │   ├── CompletedTasks.jsx     # Completed tasks component
│   │   ├── Navbar.jsx             # Navigation component
│   │   ├── GlobalStyles.css       # Global styling
│   │   ├── ToDoList.css          # Active tasks styling
│   │   └── CompletedTask.css     # Completed tasks styling
│   └── index.html                 # HTML template
└── backend/
    ├── server.js                  # Express server
    ├── model/
    │   └── taskModel.js          # Task model
    └── schemas/
        └── taskSchema.js         # Task schema definition
```

## 🎨 Design Features

- **Gradient Backgrounds**: Beautiful purple-to-blue gradients
- **Card-based Layout**: Clean, modern card designs for better organization
- **Smooth Animations**: Fade-in, slide-in, and hover effects
- **Interactive Elements**: Hover effects on buttons and task items
- **Color-coded Actions**: Different colors for different actions (complete, undo, delete)
- **Empty States**: Helpful messages when no tasks are present
- **Typography**: Clean, readable fonts with proper hierarchy

## 🔧 Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory
2. Install dependencies: `npm install`
3. Create a `.env` file based on `.env.example`:
   ```
   mongo_url=mongodb://localhost:27017/taskmaster
   PORT=3002
   JWT_SECRET=your_super_secure_jwt_secret_key
   ```
4. Start the server: `node server.js`

### Frontend Setup

1. Navigate to the frontend directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## 🌟 Recent Improvements

- **Modern UI Redesign**: Complete visual overhaul with modern design principles
- **Enhanced Navigation**: Active route highlighting and improved navbar
- **Better UX**: Loading states, empty states, and better error handling
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Performance**: Optimized animations and efficient state management
- **Accessibility**: Better color contrast and semantic HTML

## 📱 Screenshots

The application features:

- A beautiful gradient background
- Clean, card-based interface
- Smooth animations and transitions
- Mobile-responsive design
- Intuitive task management

## 🚀 Future Enhancements

- User authentication and personal accounts
- Task categories and tags
- Due dates and reminders
- Dark/light theme toggle
- Drag and drop functionality
- Task search and filtering
- Export/import functionality

---

**Built with ❤️ using modern web technologies**
