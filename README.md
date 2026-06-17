# College Assignment Submission Tracker

A modern, clean, and professional dashboard for students to track their college assignment submissions. Built using React, Ant Design, and Node.js.

## Key Features

1. **Dashboard Overview**: Summary cards showing Total, Submitted, Pending, and Late assignment counts. Plus, a table displaying the 5 most recent assignments.
2. **Assignments Directory**: A complete table of all assignments, supporting status tags (Green for Submitted, Orange for Pending, Red for Late), sorting by fields, and actions to Edit or Delete.
3. **Add/Edit Form**: An intuitive modal form with full validation to add new assignments or edit existing ones.
4. **Subject Filter**: A dropdown filter to view assignments of a specific subject.
5. **Local Storage Persistence**: Data is persisted in the browser's Local Storage, meaning your progress is saved across page reloads.

## Tech Stack

- **Frontend**: React (built with Vite), Ant Design (antd) for modern components, and Day.js for date handling.
- **Backend**: Node.js and Express (minimal structure scaffold).

## Folder Structure

```text
college-assignment-tracker/
│
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Shared components (Navbar, Cards, Form, Table, Filter)
│   │   ├── pages/       # Page views (Dashboard, Assignments)
│   │   ├── App.jsx      # Root state, theme config & global modal
│   │   ├── main.jsx     # App entrypoint
│   │   └── styles.css   # Global custom styling
│   └── package.json
│
├── server/              # Express backend
│   ├── server.js        # Minimal server configuration
│   └── package.json
│
└── README.md
```

## Setup and Running

### 1. Run the Frontend (React Client)

Navigate to the `client/` folder, install dependencies, and start the development server:

```bash
cd client
npm install
npm run dev
```

The app will run locally (typically at `http://localhost:5173`).

### 2. Run the Backend (Node.js Express Server)

Navigate to the `server/` folder, install dependencies, and start the backend:

```bash
cd server
npm install
npm run dev
```

The Express server will start on port `5000` (typically accessible at `http://localhost:5000/api/health`).
