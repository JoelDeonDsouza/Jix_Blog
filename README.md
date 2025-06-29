# 🚀 Jix Blog

Jix Blog is a simple, modern blog application built with TypeScript, React, and Tailwind CSS for a clean and responsive frontend. It uses a Node.js backend and integrates Clerk for seamless user authentication.

## Tech Stack

**Client:** React, Tailwind CSS, TypeScript, Clerk, Supabase, Inngest, React Query, React Router Dom, React Infinite Scroll Component, React Toastify, Axios, Timeago.js

## Screenshots

![App Screenshot](/public/exOne.png)

![App Screenshot](/public/exTwo.png)

![App Screenshot](/public/exThree.png)

![App Screenshot](/public/exFour.png)

### Features

- **Modern Stack** – Built with React, Tailwind CSS, and TypeScript for scalability, speed, and maintainability
- **Authentication** – Secure user auth and session management via Clerk
- **Database** – MongoDB integration for flexible and scalable data storage
- **Rich Text Editing** – Markdown support using `@uiw/react-md-editor` for blog post creation
- **Image Handling** – Image uploading and optimization with ImageKit React SDK
- **Data Fetching & Caching** – Server state management with React Query
- **Infinite Scrolling** – Smooth infinite scroll support for browsing posts
- **Routing** – Client-side routing via React Router DOM
- **Notifications** – User-friendly notifications powered by React Toastify
- **Time Formatting** – Human-readable timestamps using Timeago.js
- **Comments & Authors** – Full CRUD support for comments and author profiles
- **Featured Posts** – Highlight important or trending posts on the homepage
- **Responsive UI** – Mobile-first, fully responsive design with Tailwind CSS
- **Type-Safe** – Full TypeScript support with IntelliSense and static type checking

---

## Run Locally

Clone the project

```bash
  git clone https://github.com/JoelDeonDsouza/Jix_Blog.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm  start
```

## 📦 Environment Variables (`.env`)

```env

# API

VITE_API_URL=

# Clerk configuration

VITE_CLERK_PUBLISHABLE_KEY=

# ImageKit configuration

VITE_IMAGEKIT_URL_ENDPOINT=

VITE_IMAGEKIT_PUBLIC_KEY=

```
