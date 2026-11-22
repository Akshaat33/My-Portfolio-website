# Personal Portfolio

A full-stack personal portfolio website built to present my profile, skills, projects, and professional journey. The project combines a responsive React frontend with a Node.js and Express backend, using MongoDB to store and manage dynamic website content.

The portfolio also includes an admin panel, allowing the website's content to be managed without manually changing the frontend code.

---

## Overview

This project was developed to create a central place to showcase my work while gaining practical experience in full-stack web development. Instead of keeping all portfolio information hardcoded, the application uses backend APIs and a database to retrieve and update content.

## Features

- **Personal portfolio:** Dedicated sections to introduce myself and present my skills, projects, and professional information.
- **Dynamic content:** Portfolio information is fetched from the backend and displayed on the frontend.
- **Admin panel:** A private management area for updating portfolio content.
- **Contact form:** Visitors can submit their name, email address, and message.
- **Message storage:** Contact form submissions are saved in MongoDB and can be viewed through the admin panel.
- **Resume download:** Visitors can access and download my CV.
- **External links:** Links to my other profiles and platforms are managed as part of the portfolio.
- **Frontend/backend integration:** The React application communicates with the backend through API requests.

## Tech Stack

| Technology | Use |
|---|---|
| React | Frontend user interface |
| JavaScript | Application functionality |
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| Node.js | Backend runtime |
| Express.js | Backend framework and API routes |
| MongoDB | Database |
| Mongoose | MongoDB object modelling |
| Axios | HTTP requests between frontend and backend |

## Application Structure

The application is organised into frontend and backend parts.

```text
Personal-Portfolio/
├── frontend/
│   ├── public/
│   └── src/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── README.md
```

*The tree above shows the overall organisation. Individual filenames and folders may differ in the repository.*

## How It Works

1. The React frontend displays the portfolio pages and forms.
2. Axios sends requests from the frontend to the Express backend.
3. The backend processes requests and interacts with MongoDB through Mongoose.
4. Portfolio data is retrieved from the database and displayed on the website.
5. Contact form submissions are stored in MongoDB.
6. The admin panel provides a private interface for managing content and viewing submitted messages.

## Run Locally

### Prerequisites

Make sure the following are installed:

- Node.js and npm
- MongoDB database (local MongoDB or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

### 2. Install dependencies

Install the frontend and backend dependencies in their respective directories:

```bash
cd frontend
npm install
```

In a separate terminal:

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend directory and add the environment variables required by the server. For example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

If the application uses additional environment variables, configure those as well. Keep real credentials private.

### 4. Start the backend

From the backend directory, run the development script configured in its `package.json`. For example:

```bash
npm run dev
```

### 5. Start the frontend

From the frontend directory, run:

```bash
npm run dev
```

Open the local address shown in the frontend terminal.

> The exact commands and environment variable names depend on the scripts and configuration in the repository's `package.json` files. Check those files if a command differs.

## Security

- Do not commit `.env` files, database connection strings, passwords, tokens, or other secrets.
- Keep private admin functionality protected by the application's authentication and authorization checks.
- Use environment variables for sensitive configuration.

## What I Learned

Developing this project gave me hands-on experience with:

- Building a frontend with React.
- Creating backend APIs with Node.js and Express.
- Connecting a frontend to a backend using Axios.
- Designing and working with MongoDB models using Mongoose.
- Implementing create, read, update, and delete (CRUD) operations.
- Handling and storing form submissions.
- Fetching and updating dynamic content.
- Building an admin interface for content management.
- Configuring and deploying a full-stack application.

## Live Portfolio

**Website:** Add your deployed portfolio URL here.

## Author

**Akki**

---

If you have any feedback or suggestions, feel free to explore the project and get in touch.
