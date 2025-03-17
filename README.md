# Expense Tracker

## Introduction

Expense Tracker is a web-based application designed to help users manage and monitor their personal finances. By providing a platform to record and categorize expenses, it enables users to gain insights into their spending habits and make informed financial decisions. The application offers a user-friendly interface for adding, viewing, and analyzing expenses over time.

## Features

1. **User Authentication (Login & Signup):** Secure user registration and login system to ensure personalized data management.
2. **Expense Management:** Add, edit, and delete expenses with details such as amount, category, date, and description.
3. **Expense Categorization:** Organize expenses into categories for better tracking and analysis.
4. **Expense Overview:** Visual representation of expenses over time to help users understand their spending patterns.
5. **Responsive Design:** Accessible on various devices, including desktops, tablets, and smartphones.

## Built With

- **Frontend:**
  - [React](https://react.dev/) - JavaScript library for building user interfaces.
  - [TypeScript](https://www.typescriptlang.org/) - Superset of JavaScript that adds static typing.
  - [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling.

- **Backend:**
  - [Node.js](https://nodejs.org/) - JavaScript runtime environment.
  - [Express](https://expressjs.com/) - Web application framework for Node.js.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing user data and expenses.

## Deployment

### Prerequisites

- **Frontend:**
  - [Node.js](https://nodejs.org/) - Ensure Node.js is installed to manage dependencies and run the development server.

- **Backend:**
  - [Node.js](https://nodejs.org/) - Required for running the Express server.
  - [MongoDB](https://www.mongodb.com/) - Access to a MongoDB instance, either locally or through a cloud provider like MongoDB Atlas.

### Installation

#### Frontend

1. Navigate to the `frontend` directory:

   ```bash
   cd frontend
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

   The application will be accessible at `http://localhost:3000`.

#### Backend

1. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install the project dependencies:

   ```bash
   npm install
   ```

3. Ensure MongoDB is running and accessible. Update the database connection string in the backend configuration if necessary.

4. Start the Express server:

   ```bash
   npm start
   ```
