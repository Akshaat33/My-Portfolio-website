# MERN Portfolio Backend — Quick Notes

## Core Flow
**Frontend → Route → Middleware (if needed) → Controller → Model/Database → Response**

## Main Files
- `server.js` — configures Express, mounts routes, connects to MongoDB, starts the server.
- `config/db.js` — connects the backend to MongoDB.
- `models/User.js` — defines user fields and rules (`email`, hashed `password`, `role`).
- `routes/authRoutes.js` — maps `POST /login` to the login controller.
- `controllers/authController.js` — validates login credentials and returns a JWT plus safe user details.
- `middlewares/authMiddleware.js` — verifies JWTs and checks admin permissions.
- `scripts/createAdmin.js` — separate setup script that creates the configured initial admin/user accounts.

## Important Concepts
- **Route:** where a request goes.
- **Controller:** what happens to the request.
- **Model:** how the app works with database documents.
- **Middleware:** a checkpoint before the controller; it can reject a request or call `next()` to continue.
- `req` = incoming request, `res` = response, `next()` = continue to the next handler.
- `req.body` contains submitted data; `req.headers.authorization` reads the authorization header on an incoming request.
- `app.use()` registers middleware or mounts a router; it does not import files by itself.
- A file existing does not mean it is connected or running.

## Login & Security
1. Frontend sends email/password with a **POST** request to `/api/auth/login`.
2. Controller finds the user in MongoDB and checks the password with `bcrypt.compare()`.
3. `jwt.sign()` creates a signed token after successful login; the token includes user ID/role and expires after the configured time.
4. For protected API requests, frontend sends `Authorization: Bearer <token>`.
5. `authenticate` verifies the token and finds the current user.
6. `requireAdmin` checks whether `req.user.role === "admin"`.

- `bcrypt.hash()` stores a password as a hash; `bcrypt.compare()` checks a submitted password against that hash. It does not decrypt the hash.
- `jwt.sign()` creates a token; `jwt.verify()` checks its signature and expiry.
- JWT payloads are signed, not encrypted by default. Never put passwords/secrets inside them.
- Frontend navigation is not security: sensitive backend endpoints must also use middleware.

## Setup Script
Run `createAdmin.js` separately when initial account setup is needed. It is not run every time the server starts. Keep it for a fresh database/environment; the current script uses credentials configured in `.env`.

## Remember
- `401` = authentication missing/invalid.
- `403` = authenticated but not allowed.
- `500` = server/configuration error.
- Keep `.env` private; never commit secrets.
- Middleware only protects a route when that route imports and uses it.
