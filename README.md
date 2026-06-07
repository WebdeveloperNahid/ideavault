# 💡 IdeaVault – Startup Idea Sharing Platform

**Live Site:** = https://ideavault-nine-zeta.vercel.app
---
## About the Project

IdeaVault is a full-stack web platform where users can share innovative startup ideas, explore ideas posted by others, and engage through comments and community discussions.

---

## ✨ Features

- 🔐 **JWT-Based Authentication** — Secure login with Email/Password and Google OAuth. JWT tokens protect all private routes and keep users logged in on page reload.

- 💡 **Submit & Manage Ideas** — Authenticated users can post startup ideas with title, category, description, budget, target audience, problem statement, and proposed solution.

- 🔍 **Search & Filter** — Search ideas by title (case-insensitive) and filter by category to quickly find the most relevant startup concepts.

- 💬 **Comment System** — Users can add, edit, and delete their own comments on any idea. Each comment shows the user's name and timestamp.

- 🌗 **Dark / Light Theme** — Global theme toggle from the navbar for a comfortable experience in any environment.

- 📋 **My Ideas & My Interactions** — Users can manage their submitted ideas (update/delete) and track all ideas they have commented on.

---

## 🛠️ Tech Stack

**Frontend:** React.js, Tailwind CSS, Firebase Auth, Axios, React Router DOM

**Backend:** Node.js, Express.js, MongoDB, JWT

**Hosting:** Netlify (Client) · Vercel/Render (Server) · MongoDB Atlas (Database)

---

## 📦 Run Locally

```bash
# Client
git clone https://github.com/yourusername/ideavault-client.git
cd ideavault-client
npm install
npm run dev

# Server
git clone https://github.com/yourusername/ideavault-server.git
cd ideavault-server
npm install
node index.js
```
