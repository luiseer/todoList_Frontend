<div align="center">
  <br />
  <h1>📋 UpTask</h1>
  <p><strong>Real-time Project & Task Management Application</strong></p>
  <p>Built with React · Vite · TailwindCSS · Socket.IO</p>
  <br />
</div>

## Overview

UpTask is a full-featured project management tool that enables teams to create projects, assign tasks, collaborate in real time, and track progress. Built as a single-page application with a modern React frontend and real-time communication via WebSockets.

### ✨ Features

- **User Authentication** — Register, login, password recovery, and email confirmation
- **Project Management** — Full CRUD operations with client tracking and delivery dates
- **Task Management** — Create, edit, delete, and reorder tasks with priority levels and deadlines
- **Real-Time Collaboration** — Tasks sync instantly across all connected users via Socket.IO
- **Collaborator System** — Invite collaborators by email with role-based access (creator vs. member)
- **Live Search** — Instant project search with Combobox interface
- **Responsive Design** — Mobile-first layout powered by TailwindCSS

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 17 |
| **Bundler** | Vite 2 |
| **Styling** | TailwindCSS 3 + Headless UI |
| **Routing** | React Router v6 |
| **HTTP Client** | Axios |
| **Real-Time** | Socket.IO Client 4 |
| **Font** | Inter (Google Fonts) |
| **Deployment** | Netlify-ready (`_redirects` + `netlify.toml`) |

---

## Project Structure

```
src/
├── config/clienteAxios.jsx    # Axios instance (base URL)
├── context/
│   ├── AuthProvider.jsx        # Auth state & JWT management
│   └── ProjectsProvider.jsx    # Projects, tasks & collaborators state + Socket.IO
├── hooks/
│   ├── useAuth.jsx             # Access auth context
│   ├── useProjects.jsx         # Access projects context
│   └── useAdmin.jsx            # Check if user is project creator
├── helpers/
│   └── formatDate.jsx          # Date formatting utility
├── layouts/
│   ├── AuthLayout.jsx          # Public pages wrapper (login, register, etc.)
│   └── ProtectedRoute.jsx      # Authenticated pages wrapper (header + sidebar)
├── components/
│   ├── Alert.jsx               # Toast notification
│   ├── Header.jsx              # Navigation bar with search & logout
│   ├── Sidebar.jsx             # User info & create project button
│   ├── Search.jsx              # Modal project search (Combobox)
│   ├── ProjectForm.jsx         # Create / edit project form
│   ├── PreviewProject.jsx      # Project card in listing
│   ├── Todo.jsx                # Task item with actions
│   ├── ModalFormTodo.jsx       # Create / edit task modal
│   ├── ModalDeleteTodo.jsx     # Delete task confirmation modal
│   ├── Collaborator.jsx        # Collaborator item with remove action
│   ├── CollaboratorForm.jsx    # Find collaborator by email form
│   └── ModalDeleteCollaborator.jsx  # Remove collaborator confirmation modal
└── pages/
    ├── Login.jsx               # Sign in
    ├── Register.jsx            # Sign up
    ├── ForgotPass.jsx          # Password recovery request
    ├── NewPass.jsx             # Password reset with token
    ├── ConfirmAccount.jsx      # Email confirmation
    ├── Projects.jsx            # Project list
    ├── Project.jsx             # Project detail (tasks + collaborators)
    ├── NewProject.jsx          # Create project
    ├── EditProject.jsx         # Edit / delete project
    └── NewCollaborator.jsx     # Add collaborator to project
```

---

## Routes

### Public Routes (`/`)

| Path | Page | Description |
|------|------|-------------|
| `/` | Login | Sign in with email and password |
| `/register` | Register | Create a new account |
| `/forgot-password` | ForgotPass | Request password reset email |
| `/forgot-password/:token` | NewPass | Reset password with token |
| `/confirm/:id` | ConfirmAccount | Confirm email address |

### Protected Routes (`/projects`)

| Path | Page | Description |
|------|------|-------------|
| `/projects` | Projects | List all user projects |
| `/projects/create-project` | NewProject | Create a new project |
| `/projects/:id` | Project | View project tasks and collaborators |
| `/projects/edit/:id` | EditProject | Edit or delete a project |
| `/projects/new-collaborator/:id` | NewCollaborator | Add collaborator to project |

---

## API Endpoints

The frontend communicates with a REST API at `/api` and uses WebSockets for real-time events.

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/user` | Register a new user |
| `POST` | `/user/login` | Sign in |
| `GET` | `/user/profile` | Get authenticated user profile |
| `GET` | `/user/confirm/:id` | Confirm email |
| `POST` | `/user/forgot-password` | Request password reset |
| `GET` | `/user/forgot-password/:token` | Validate reset token |
| `POST` | `/user/forgot-password/:token` | Set new password |

### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/projects` | List all projects |
| `POST` | `/projects` | Create a project |
| `GET` | `/projects/:id` | Get project details |
| `PUT` | `/projects/:id` | Update project |
| `DELETE` | `/projects/:id` | Delete project |
| `POST` | `/projects/collaborators` | Search collaborator by email |
| `POST` | `/projects/collaborators/:id` | Add collaborator to project |
| `POST` | `/projects/delete-collaborator/:id` | Remove collaborator |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/todos` | Create a task |
| `PUT` | `/todos/:id` | Update a task |
| `DELETE` | `/todos/:id` | Delete a task |
| `POST` | `/todos/state/:id` | Toggle task completion state |

### Socket.IO Events

| Event | Direction | Payload |
|-------|-----------|---------|
| `open-project` | Client → Server | `projectId` |
| `new-todo` | Server → Client | `todo` |
| `edit-todo` | Server → Client | `todo` |
| `delete-todo` | Server → Client | `todo` |
| `complete-todo` | Server → Client | `todo` |

---

## Getting Started

### Prerequisites
- Node.js 14+
- A running backend API (see [UpTask Backend](https://github.com/luiseer/todoList_Backend))

### Installation

```bash
# Clone the repository
git clone https://github.com/luiseer/todoList_Frontend.git
cd todoList_Frontend

# Install dependencies
npm install

# Configure environment
echo "VITE_BACKEND_URL=http://localhost:4000" > .env

# Start development server (default: http://localhost:3000)
npm run dev
```

The Vite dev server proxies `/api` requests to the backend, so no CORS issues during development.

### Build for Production

```bash
npm run build
```

Output is in the `dist/` directory.

---

## Deployment

This project is ready for deployment on **Netlify**:

1. Connect your GitHub repository to Netlify
2. **Branch:** `deploy/netlify`
3. **Build command:** `npm run build`
4. **Publish directory:** `dist`

The `_redirects` file and `netlify.toml` are already configured for SPA routing.

---

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API base URL | `http://localhost:4000` |

When building for production, set this to your deployed backend URL (or leave empty if using a proxy).

---

## License

MIT
