# ChatApp – Real-Time MERN Chat Application

A secure and scalable real-time chat application built with the **MERN stack**.
Implements **JWT authentication**, **Arcjet rate limiting**, and **Socket.io** for instant messaging, with **Zustand** powering lightweight global state on the frontend.

---

## Live Demo

🔗 https://chatapp-mern-y39o.onrender.com

---

##  Features

* 🔐 JWT-based authentication (Login / Signup)
* ⚡ Real-time messaging with Socket.io
* 🛡️ Arcjet rate limiting & abuse protection
* 🌐 CORS configured for secure cross-origin requests
* 🗄️ MongoDB for users & messages
* ⚛️ Zustand for global state management
* 🎨 Responsive UI built with React + TailwindCSS
* ☁️ Deployed on Render

---

##  Tech Stack

### Frontend

* React
* TailwindCSS
* Zustand
* Axios
* Socket.io-client

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)
* Arcjet (Rate limiting & security)
* Socket.io
* CORS

### Deployment

* Render (Frontend + Backend)

---

##  Authentication Flow

1. User signs up or logs in
2. Server validates credentials
3. JWT token is issued
4. Token stored on client
5. Protected routes require valid JWT

---

## Security

* Arcjet rate limiting to prevent:
  * brute-force attacks
  * API abuse
  * spam requests
* JWT-protected routes
* CORS policy with allowed origins

---

## Real-Time Messaging

* WebSocket connection using Socket.io
* Instant message delivery
* Persistent chat history in MongoDB

---

## Deployment (Render)

* Backend deployed as a **Web Service**
* Frontend deployed as a **Static Site**
* Environment variables configured in Render dashboard
