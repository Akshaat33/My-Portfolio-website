# Personal Portfolio — Backend Learning Notes

> A beginner-friendly record of the backend concepts explored while building a full-stack MERN personal portfolio.
>
> These notes explain the code and ideas discussed so far. They are a learning reference, not a claim that every backend feature is fully connected or production-ready.

## Table of Contents

1. [Project and Backend Basics](#1-project-and-backend-basics)
2. [NPM Packages](#2-npm-packages)
3. [Backend Folder Structure](#3-backend-folder-structure)
4. [`server.js`, Express, and Middleware Registration](#4-serverjs-express-and-middleware-registration)
5. [Environment Variables and Database Connection](#5-environment-variables-and-database-connection)
6. [Routes, Controllers, and API Endpoints](#6-routes-controllers-and-api-endpoints)
7. [Requests and Responses](#7-requests-and-responses)
8. [User Model and MongoDB](#8-user-model-and-mongodb)
9. [Login Controller](#9-login-controller)
10. [bcrypt: Hashing and Comparing Passwords](#10-bcrypt-hashing-and-comparing-passwords)
11. [JWT: Creating and Verifying Tokens](#11-jwt-creating-and-verifying-tokens)
12. [Authentication Middleware, Line by Line](#12-authentication-middleware-line-by-line)
13. [The `requireAdmin` Middleware](#13-the-requireadmin-middleware)
14. [`createAdmin.js` Setup Script](#14-createadminjs-setup-script)
15. [How Admin Login and Protected Routes Fit Together](#15-how-admin-login-and-protected-routes-fit-together)
16. [Quick Questions and Answers](#16-quick-questions-and-answers)
17. [Important Terms Cheat Sheet](#17-important-terms-cheat-sheet)
18. [What We Have and Have Not Connected Yet](#18-what-we-have-and-have-not-connected-yet)

---

## 1. Project and Backend Basics

This project is a personal portfolio built with the MERN stack:

- **MongoDB** — database
- **Express.js** — backend web framework
- **React** — frontend UI
- **Node.js** — JavaScript runtime for the backend

The frontend and backend have different jobs:

- The **frontend** displays pages and collects user input.
- The **backend** receives API requests, runs application logic, talks to the database, and sends responses.
- The **database** stores persistent data.

A React page does not automatically run backend code just because a URL path exists. The frontend must send an HTTP request to the backend endpoint.

## 2. NPM Packages

Packages discussed in this project:

| Package | What it does |
|---|---|
| `express` | Helps create the backend server, routes, and middleware. |
| `dotenv` | Loads variables from a `.env` file into `process.env`. |
| `cors` | Configures which browser origins are allowed to read cross-origin responses. It is not authentication. |
| `mongoose` | Connects Node.js to MongoDB and provides schemas, models, and database operations. |
| `bcryptjs` | Hashes passwords and compares a submitted password with a stored hash. |
| `jsonwebtoken` | Creates and verifies JSON Web Tokens (JWTs). |
| `axios` | Lets the frontend send HTTP requests to the backend. |
| `nodemon` | Restarts the backend during development when files change. |

You do not need to install every package you hear about. Add a package when your project actually needs it.

## 3. Backend Folder Structure

A typical structure in this project is:

```text
backend/
├── config/
│   └── db.js
├── controllers/
│   └── authController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── User.js
│   └── Project.js
├── routes/
│   └── authRoutes.js
├── scripts/
│   └── createAdmin.js
├── .env
├── .gitignore
└── server.js
```

Folder purposes:

- **`config/`** — configuration such as database connection setup.
- **`controllers/`** — functions that handle requests and contain application logic.
- **`middlewares/`** — functions that inspect or process requests before they reach a controller.
- **`models/`** — schemas and models used to interact with MongoDB.
- **`routes/`** — API paths and the functions/middleware associated with them.
- **`scripts/`** — standalone tasks, such as creating initial accounts.
- **`server.js`** — main backend entry point.

The exact file structure may vary. A file existing in a folder does not mean it is automatically running.

## 4. `server.js`, Express, and Middleware Registration

`server.js` usually sets up the Express app, registers general middleware, mounts routes, connects to the database, and starts listening for requests.

### `app.use()`

`app.use()` registers middleware or mounts a router. It does not automatically import a file. The file must be imported first.

Example:

```js
import authRoutes from './routes/authRoutes.js';

app.use('/api/auth', authRoutes);
```

Here, the router is mounted under `/api/auth`.

### `app.listen()`

`app.listen()` starts the server listening on a port. Starting the server does not by itself prove that every endpoint or database operation works correctly.

### `express.json()`

If a frontend sends JSON in a request body, the server typically needs:

```js
app.use(express.json());
```

This middleware parses JSON request bodies so they can be accessed through `req.body`.

### CORS

Example:

```js
app.use(cors({ origin: process.env.CLIENT_URL }));
```

`CLIENT_URL` might be `http://localhost:5173` if that is where the frontend runs. CORS configures which browser origins are allowed to read responses. It does **not** log users in or protect an API from all unauthorized requests.

### Environment variables

```js
process.env.PORT
process.env.MONGO_URI
process.env.JWT_SECRET
```

These read values from the process environment. `dotenv.config()` (or `import 'dotenv/config'`) loads values from `.env`.

Keep secrets such as database credentials and `JWT_SECRET` private. Do not commit `.env` to a public repository.

## 5. Environment Variables and Database Connection

The database connection file (`config/db.js`) discussed in this project is:

```js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is missing from your .env file.");
    }

    const connection = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully!");
    console.log(`Host: ${connection.connection.host}`);
    console.log(`Database: ${connection.connection.name}`);
    console.log(`Port: ${connection.connection.port}`);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
```

Key ideas:

- `mongoose.connect(mongoURI, ...)` tries to connect to MongoDB.
- `await` waits for the connection promise to settle before moving on.
- `serverSelectionTimeoutMS: 5000` sets the server-selection timeout to 5 seconds.
- `connection` contains connection information.
- `catch` handles errors thrown in the `try` block.
- `process.exit(1)` ends the process with a failure exit code.

The `.env` file needs a valid `MONGO_URI`.

### `async` and `await`

- `async` makes a function return a Promise and allows `await` inside it.
- `await` waits for a Promise to settle before continuing in that async function.
- `.catch()` is a Promise method for handling rejection.

## 6. Routes, Controllers, and API Endpoints

### `authRoutes.js`

The route file discussed:

```js
import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);

export default router;
```

What each part means:

- `express.Router()` creates a router to group related routes.
- `router.post('/login', login)` means that a POST request matching `/login` on this router calls the `login` function.
- `export default router` allows another file to import and mount this router.

If `server.js` contains:

```js
app.use('/api/auth', authRoutes);
```

then the complete endpoint is:

```text
POST /api/auth/login
```

If the backend runs on port `5000`, the full local URL would be:

```text
http://localhost:5000/api/auth/login
```

Use the actual port configured in the project.

### What are routes for?

**Route = where the request goes.**  
**Controller = what happens to the request.**  
**Model = how the application interacts with the database.**

Common HTTP methods:

- `GET` — retrieve data.
- `POST` — submit data or create a resource.
- `PUT` — replace/update a resource.
- `PATCH` — partially update a resource.
- `DELETE` — delete a resource.

The same path can have different behavior depending on the HTTP method. For example, `GET /projects` and `POST /projects` can do different things.

### Does typing `/api/auth/login` in the browser trigger login?

Not with the route shown above. Typing a URL into the browser address bar normally sends a **GET** request, but this route accepts **POST**. The frontend usually sends a POST request when the login form is submitted.

Example frontend request:

```js
axios.post('http://localhost:5000/api/auth/login', {
  email,
  password
});
```

The route then passes the request to the `login` controller.

## 7. Requests and Responses

In Express handler functions:

- `req` is the incoming request.
- `res` is used to send a response.
- `next` passes control to the next middleware or handler.

Examples:

```js
req.body
req.headers
res.status(200).json({ success: true })
next()
```

### `req.body`

Contains data sent in the request body, such as the email and password submitted by a frontend form. JSON body parsing generally requires `app.use(express.json())`.

### `res.status().json()`

```js
return res.status(401).json({
  success: false,
  message: 'Authentication required.'
});
```

- `status(401)` sets the HTTP response status.
- `json(...)` sends a JSON response.
- `return` stops the current function from continuing down that code path.

### `catch (error)`

`catch` is a JavaScript keyword. `error` is just the variable name chosen to hold the caught error. `error.message` is a property that usually describes the error.

## 8. User Model and MongoDB

The `User.js` model discussed:

```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    required: true
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
```

What it does:

- `new mongoose.Schema(...)` defines the expected fields and rules for user documents.
- `required: true` makes a field required by the schema.
- `unique: true` asks MongoDB to enforce uniqueness through an index; the index must exist for duplicate prevention to be guaranteed.
- `lowercase: true` and `trim: true` normalize email values when Mongoose applies these schema setters.
- `enum: ["admin", "user"]` limits role values accepted by Mongoose validation.
- `timestamps: true` automatically adds `createdAt` and `updatedAt`.
- `mongoose.model('User', userSchema)` creates the model used to query and modify user documents.

### `User` vs `user`

- `User` (capital U) is the Mongoose model.
- `user` (lowercase u) is often a variable holding one queried user document.

Example:

```js
const user = await User.findOne({ email });
```

`User.findOne()` searches for one matching document. It returns a document if found, or `null` if no match exists.

## 9. Login Controller

The key login logic discussed:

```js
const { email, password } = req.body;

if (
  typeof email !== "string" ||
  typeof password !== "string" ||
  !email.trim() ||
  !password
) {
  return res.status(400).json({
    success: false,
    message: "Email and password are required."
  });
}

const user = await User.findOne({
  email: email.trim().toLowerCase()
});

if (!user || !(await bcrypt.compare(password, user.password))) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password."
  });
}
```

Key ideas:

- `const { email, password } = req.body` uses destructuring to read these properties from the request body.
- `email.trim().toLowerCase()` removes whitespace at the beginning/end and converts the email to lowercase.
- `User.findOne(...)` searches MongoDB for one matching user.
- If no user is found, `user` is `null`.
- `!user || ...` means either the user does not exist or the password does not match.
- `||` short-circuits: if `!user` is true, the password comparison on the right does not run.
- `bcrypt.compare(password, user.password)` checks the submitted password against the stored hash.

On successful login, the controller signs a JWT and returns the token and safe account details to the frontend. It should not send the password or stored password hash.

### Named exports

```js
export const login = async (req, res) => { ... };
```

This is a named export, imported with braces:

```js
import { login } from '../controllers/authController.js';
```

A default export is imported without braces. A module can have named exports and one default export.

## 10. bcrypt: Hashing and Comparing Passwords

### Hashing

```js
const hashedPassword = await bcrypt.hash(password, 12);
```

This creates a password hash using bcrypt. The number `12` is the cost factor.

The stored hash is not the original password.

### Comparing

```js
const isMatch = await bcrypt.compare(password, user.password);
```

- First argument: the plain password the user just entered.
- Second argument: the stored bcrypt hash from MongoDB.
- Result: `true` if they match, otherwise `false`.

**bcrypt does not decrypt the hash to reveal the original password.** It uses the stored hash's salt and settings to check whether the submitted password matches.

Two users can have the same password and still have different bcrypt hashes because bcrypt uses a random salt.

Remember:

- `bcrypt.hash()` creates a hash.
- `bcrypt.compare()` verifies a submitted password against a stored hash.

## 11. JWT: Creating and Verifying Tokens

The login controller creates a token using:

```js
const token = jwt.sign(
  {
    userId: user._id.toString(),
    role: user.role
  },
  jwtSecret,
  { expiresIn: "2h" }
);
```

### What does `jwt.sign()` do?

`jwt` is imported from `jsonwebtoken`. `jwt.sign()` creates a signed JSON Web Token.

The three arguments are:

1. **Payload:** `{ userId, role }` — information placed inside the token.
2. **Secret:** `jwtSecret` — a private server-side secret used to sign it.
3. **Options:** `{ expiresIn: "2h" }` — makes the token expire after two hours.

The token can be sent to the frontend, which can include it in future requests to protected endpoints.

### Important security note

A JWT is generally **signed, not encrypted**. Its payload can usually be read by anyone who obtains the token, so do not place passwords or secrets in it. Keep `JWT_SECRET` private on the backend.

### `jwt.verify()`

```js
const decoded = jwt.verify(token, jwtSecret);
```

This checks the token's signature and expiry. If valid, it returns the decoded payload. If invalid or expired, it throws an error that can be handled in `catch`.

- `jwt.sign()` creates the signed token.
- `jwt.verify()` validates it later.

Creating a token alone does not protect routes; middleware must verify it when a protected request arrives.

## 12. Authentication Middleware, Line by Line

The middleware file is named `authMiddleware.js`. It exports `authenticate` and `requireAdmin`.

Its imports:

```js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
```

- `jwt` verifies a token.
- `User` lets the middleware look up the user in MongoDB.

### Function declaration

```js
export const authenticate = async (req, res, next) => {
```

- `export` makes the function importable by route files.
- `authenticate` is the function name.
- `async` permits `await`.
- `req` is the incoming request.
- `res` sends a response.
- `next` passes control onward.
- `async` is needed here because the middleware queries MongoDB.

### Read the authorization header

```js
const authHeader = req.headers.authorization;
```

This line does **not** send a request. It reads the `Authorization` header from the incoming request sent by the frontend (or another client).

For example, the frontend might send:

```js
axios.get('http://localhost:5000/api/admin/dashboard', {
  headers: {
    Authorization: `Bearer ${token}`
  }
});
```

The middleware then receives a header like:

```text
Bearer eyJhbGciOiJIUzI1NiIs...
```

The login request itself does not necessarily need this header; it is usually used on subsequent requests to protected endpoints.

### Check for a missing or malformed header

```js
if (!authHeader || !authHeader.startsWith("Bearer ")) {
  return res.status(401).json({
    success: false,
    message: "Authentication required. Please log in."
  });
}
```

- `!authHeader` checks whether the header is missing/falsy.
- `||` means OR.
- `startsWith("Bearer ")` checks for the expected prefix.
- If the header is missing or doesn't start with `Bearer `, the middleware sends a 401 response and stops.

### Extract the token

```js
const token = authHeader.split(" ")[1];
```

If the header is `"Bearer abc123xyz"`, then:

```js
"Bearer abc123xyz".split(" ")
// ["Bearer", "abc123xyz"]
```

Array index `[1]` selects the second item, which is the token.

### Check the extracted token

```js
if (!token) {
  return res.status(401).json({
    success: false,
    message: "Invalid authentication token."
  });
}
```

This rejects an empty or missing token.

### Read the secret

```js
const jwtSecret = process.env.JWT_SECRET;
```

Reads the secret from the backend environment. It should be the same secret used to sign the token, and it must remain private.

### Check configuration

```js
if (!jwtSecret) {
  console.error("JWT_SECRET is missing from .env");
  return res.status(500).json({
    success: false,
    message: "Authentication is not configured correctly."
  });
}
```

If the secret is missing, the server logs a configuration error and sends a 500 response. This is a backend configuration problem, not necessarily a bad user credential.

### Verify the token

```js
const decoded = jwt.verify(token, jwtSecret);
```

Checks the token's signature and expiry. On success, `decoded` contains the token payload, including `userId` and `role` from the token created during login.

If verification fails, an error is thrown and execution moves to the `catch` block.

### Look up the user

```js
const user = await User.findById(decoded.userId)
  .select("_id email role");
```

- Uses the ID from the verified token to find the user in MongoDB.
- `.select("_id email role")` requests only those fields.
- `await` waits for the query to finish.

Why query MongoDB again? The account may have been deleted or its role may have changed since the token was issued.

### Validate the user and current role

```js
if (!user || user.role !== decoded.role) {
  return res.status(401).json({
    success: false,
    message: "Invalid authentication credentials."
  });
}
```

- `!user` means the user was not found.
- `user.role !== decoded.role` means the role in the database differs from the role stored in the token.
- Either condition causes the request to be rejected.

### Attach the user to the request

```js
req.user = {
  id: user._id.toString(),
  email: user.email,
  role: user.role
};
```

The middleware attaches a small, safe set of user details to the request object so later middleware or controllers can use them.

`req.user` is not automatically created by Express; this middleware assigns it.

### Pass control forward

```js
next();
```

If all checks pass, `next()` allows Express to continue to the next middleware or route handler. If an earlier check sends a response and returns, the request does not proceed through that path.

### Handle errors

```js
} catch (error) {
  if (
    error.name === 'JsonWebTokenError' ||
    error.name === 'TokenExpiredError'
  ) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.'
    });
  }

  console.error("Authentication error:", error.message);
  return res.status(500).json({
    success: false,
    message: "Authentication failed due to a server error."
  });
}
```

- Invalid JWTs and expired tokens get a 401 response.
- Unexpected errors are logged and receive a 500 response.
- `error.name` identifies the error type; `error.message` describes it.

**The whole `authenticate` job:** receive token → verify token → find user → compare current role → attach user to `req.user` → call `next()`.

## 13. The `requireAdmin` Middleware

The second function:

```js
export const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin permissions are required.'
    });
  }

  next();
};
```

Its job is different from `authenticate`:

- `authenticate` checks the token and identifies the user.
- `requireAdmin` checks whether the identified user has admin permission.

`req.user?.role` uses optional chaining. If `req.user` is missing, the expression safely evaluates to `undefined` instead of throwing an error.

If the role is not `"admin"`, the middleware returns `403 Forbidden`. If the role is `"admin"`, `next()` passes control to the next handler.

This middleware is designed to run after `authenticate`, because `authenticate` sets `req.user`.

## 14. `createAdmin.js` Setup Script

The `createAdmin.js` file is a **standalone setup script**, not middleware and not a general-purpose backend test.

It includes logic to:

- Load environment variables.
- Connect to MongoDB.
- Check whether an account with the configured email already exists.
- Hash the password using bcrypt.
- Create an account with the configured role.
- Close the database connection.

Important excerpt:

```js
const hashedPassword = await bcrypt.hash(password, 12);

await User.create({
  email: normalizedEmail,
  password: hashedPassword,
  role,
});
```

It reads the initial account details from environment variables such as `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `USER_EMAIL`, and `USER_PASSWORD`.

Run it separately from the backend server, using the actual path to the script. For example, if it lives at `scripts/createAdmin.js` and the terminal is in the backend folder:

```bash
node scripts/createAdmin.js
```

It is not normally imported into `server.js`, because it is intended to run as a separate setup task.

### Is the script needed forever?

- Once the accounts exist, you do not need to run it every time you start the backend.
- Keeping the script is useful for setting up accounts in a fresh database or environment.
- The current script creates only the configured admin and regular user accounts; it is not a general interface for creating arbitrary accounts.
- A registration API or a separately designed admin account-management feature would be a different mechanism for creating additional accounts.
- You could manually insert data in MongoDB Compass, but the password must be stored as a bcrypt hash for this login code to verify it properly.

The script checks whether each configured email already exists before creating it, which helps avoid duplicate account creation through this script.

## 15. How Admin Login and Protected Routes Fit Together

The intended flow is:

```text
User submits email and password in the frontend
                    |
                    v
Frontend sends POST /api/auth/login
                    |
                    v
authRoutes.js matches the POST /login route
                    |
                    v
authController.js checks email and password
                    |
                    v
Successful login: backend signs a JWT
and returns token + safe user details/role
                    |
                    v
Frontend can navigate to the admin page
if the returned role is "admin"
                    |
                    v
For protected API requests, frontend sends
Authorization: Bearer <token>
                    |
                    v
authenticate middleware verifies the token
and identifies the user
                    |
                    v
requireAdmin checks whether the role is admin
                    |
                    v
Protected controller runs if checks pass
```

### Which part does what?

| Component | Responsibility |
|---|---|
| `authController.js` | Checks login credentials and returns a signed token and safe user details. |
| Frontend login logic | Handles the login response and may navigate based on the returned role. |
| React Router / frontend route logic | Controls which page/component is displayed. |
| `authenticate` middleware | Verifies the token and identifies the user for a protected request. |
| `requireAdmin` middleware | Checks admin permissions. |
| Protected controller | Performs the requested protected action. |

**Important:** Frontend navigation is not security by itself. Even if the frontend hides an admin page, backend APIs that perform admin actions must also be protected. The route file must explicitly import and use the middleware for those checks to run.

## 16. Quick Questions and Answers

### Q: Does `User.findOne()` search for the email sent in `req.body`?

**A:** Yes. In the login controller, the email is taken from `req.body`, normalized with `trim()` and `toLowerCase()`, and used to search MongoDB. The result is a user document or `null`.

### Q: Does bcrypt convert a hash back into the original password?

**A:** No. `bcrypt.compare()` verifies whether the submitted password matches the stored hash without decrypting the hash into the original password.

### Q: Does `jwt.sign()` log the user in by itself?

**A:** No. It creates a signed token after the login controller has validated the credentials. The frontend can receive that token, and protected backend endpoints must verify it later.

### Q: Does typing `/api/auth/login` into the browser trigger the login controller?

**A:** Not with the current POST route. Typing a URL normally makes a GET request; the login route expects POST.

### Q: What does `authRoutes.js` do?

**A:** It maps an API path and HTTP method to a controller. For example, `router.post('/login', login)` calls the `login` controller for POST requests to that router path.

### Q: What does `req`, `res`, and `next` mean in middleware?

**A:**
- `req` — incoming request data.
- `res` — send a response.
- `next` — continue to the next middleware/handler.

Express provides these when it runs the middleware.

### Q: Where does `req.headers.authorization` come from?

**A:** It reads the `Authorization` header attached to an incoming request, usually by the frontend when it calls a protected endpoint. The middleware does not make the request itself.

### Q: Why do we have `authenticate` and `requireAdmin` separately?

**A:** Authentication answers “Who is this user, and is their token valid?” Authorization answers “Is this user allowed to perform this admin action?”

### Q: Why isn't `authMiddleware.js` automatically active?

**A:** Creating a middleware file does not activate it. A route file must import it and place it in the route's middleware chain, such as:

```js
router.get('/dashboard', authenticate, requireAdmin, dashboardController);
```

This is an example of how it can be wired; it only works when the names are imported and the route/controller exist.

### Q: Is `createAdmin.js` a test file?

**A:** Its primary purpose is account setup. Running it can also reveal whether its database connection and account-creation steps work, but it is not a general backend test suite.

### Q: Can I create the admin account directly in MongoDB Compass?

**A:** Technically yes, but the password needs to be stored as a bcrypt hash, not plain text. The setup script automates hashing and account creation.

### Q: Do I need to run `createAdmin.js` every time the backend starts?

**A:** No. It is run separately when account setup is needed, not on every server start.

### Q: Does `app.use()` import a route file?

**A:** No. Import the file first, then use `app.use()` to mount the router or register middleware.

### Q: Does CORS protect admin APIs?

**A:** No. CORS controls browser access to cross-origin responses. Authentication and authorization middleware must protect sensitive backend routes.

## 17. Important Terms Cheat Sheet

| Term | Plain-English meaning |
|---|---|
| API endpoint | A path and HTTP method through which a client communicates with the backend. |
| Router | Groups related routes together. |
| Controller | Function that handles a request and decides what response/action to perform. |
| Middleware | Checkpoint function that can inspect a request, send a response, or pass control onward. |
| Model | Mongoose interface for working with a type of MongoDB document. |
| Schema | Rules/structure for documents in a Mongoose model. |
| `req.body` | Data sent in the request body. |
| `req.headers` | Metadata attached to a request, including an optional authorization header. |
| `req.user` | User information attached by our authentication middleware. |
| `next()` | Pass control to the next middleware/handler. |
| Hash | One-way transformed representation used to store a password safely. |
| Salt | Random data bcrypt uses so identical passwords can produce different hashes. |
| JWT | Signed token that can carry claims such as user ID and role. |
| Payload | The data stored inside a JWT. |
| Secret | Private server-side value used to sign/verify the JWT. |
| Authentication | Verifying who the user is. |
| Authorization | Checking what the user is allowed to do. |
| `401 Unauthorized` | Request lacks valid authentication. |
| `403 Forbidden` | Request was understood but access is refused. |
| `500 Internal Server Error` | The server encountered an unexpected problem. |
| Setup script | A separate program run to perform a task such as initializing accounts. |

## 18. What We Have and Have Not Connected Yet

Based on the code discussed so far:

- `authRoutes.js` defines the login route.
- `authController.js` validates login credentials and returns a JWT and safe user details.
- `User.js` defines the user model.
- `db.js` provides the MongoDB connection function.
- `authMiddleware.js` defines token authentication and admin-role checking.
- `createAdmin.js` creates the configured initial admin and user accounts.

However, **a file existing does not mean it is connected or running**. To make the complete admin authorization flow work, confirm that:

1. `authRoutes.js` is imported and mounted in `server.js`.
2. The frontend actually sends the login POST request and handles the response.
3. Protected API route files import and use `authenticate` and, where needed, `requireAdmin`.
4. The frontend sends the JWT with requests to protected endpoints.
5. The required environment variables are set correctly.

The next learning step is to examine how the actual protected route files use `authenticate` and `requireAdmin`, rather than assuming that they are already connected.

---

## Learning Reminder

You do not need to memorize every line at once. Understand the purpose and flow first:

- **Login:** receive credentials → find user → compare password → sign JWT → return token.
- **Authentication middleware:** receive token → verify token → find user → attach user to request → continue.
- **Admin middleware:** check `req.user.role` → allow admins or reject other users.
- **Routes:** connect request paths and HTTP methods to middleware/controllers.
- **Setup script:** create initial accounts when needed.

Build and understand one piece at a time.
