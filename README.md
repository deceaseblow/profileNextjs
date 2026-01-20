![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)

# Personal Content Platform – Next.js & MongoDB

A modern **full-stack personal website & content management platform** built with **Next.js** and **MongoDB**, featuring dynamic public pages and a secure admin panel powered by **JWT authentication**.

This project allows visitors to browse curated content while giving the admin full control over managing blogs and manga entries — securely and efficiently.

---

## Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Pages](#-pages)
- [Admin Panel](#-admin-panel)
- [Installation](#-installation)
- [Environment Setup](#️-environment-setup)
- [Usage](#-usage)
- [Security](#-security)
- [Deployment](#-deployment)

---

## Features

-  Dynamic content from MongoDB  
-  Blog system  
-  Manga collection with metadata  
-  Custom links page  
-  Movies section  
-  Shows section  
-  JWT-protected admin panel  
-  Fast & responsive UI  
-  Mobile-friendly design  

---

##  Tech Stack

Frontend | Next.js, React |
Backend | Next.js API Routes |
Database | MongoDB Atlas |
Authentication | JWT |
Styling | Tailwind CSS |
Deployment | Vercel |

---

##  Pages

Public-facing pages include:

- `/blogs` – Blog posts  
- `/manga` – Manga library  
- `/links` – External resources  
- `/movies` – Movie collection  
- `/shows` – Shows & series  
- `/admin` – Admin dashboard (protected)  

---

## Admin Panel

The admin dashboard allows full CRUD control over content:

### Admin Capabilities

-  Create blogs & mangas  
-  Edit existing entries  
-  Delete content  
-  Protected by password & JWT tokens  
-  Unauthorized users cannot post, edit, or delete  

Only authenticated users can access admin operations.

---

##  Installation

Clone the repository:

```bash
git clone (https://github.com/deceaseblow/profileNextjs)
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Run development server:

```bash
npm run dev
```

Open http://localhost:3000

---

## Environment Setup

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb-url-with-user-pass
ADMIN_PASSWORD=yourSecretPassword
JWT_SECRET=yourVeryLongSecretStringHere
```

### Variable Purpose

MONGODB_URI | MongoDB connection string |
ADMIN_PASSWORD | Admin login password |
JWT_SECRET | JWT signing secret |

**Never commit `.env.local` to GitHub.**

---

## Usage

### As a Visitor
- Browse blogs, manga, movies, shows, and links
- Fully public, read-only access

### As Admin you can
- Visit `/admin`
- Login with admin password
- Manage content securely

---

##  Security

- Password-protected admin access  
- JWT tokens for protected API routes  
- Read-only access for public users  
- No client-side secret exposure  

---

##  Deployment

This project is **Vercel-ready**.

To deploy:
1. Push project to GitHub
2. Import repo into Vercel
3. Add environment variables in Vercel dashboard
4. Deploy 

---

