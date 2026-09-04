# 🚘 DriveFleet — Car Rental Platform

A modern, full-stack car rental platform where users can explore vehicles, make bookings, list their own cars, and manage reservations — all in a clean, responsive interface.

🌐 **Live Site:** [https://drivefleet-client-delta.vercel.app](https://drivefleet-client-delta.vercel.app)

---

## ✨ Features

- 🔐 **Secure Authentication** — Email/password login & registration with JWT-protected private routes; users stay logged in on page reload
- 🔍 **Browse & Filter Cars** — Search by car name, filter by type & availability, sort by price or popularity with live results
- 📅 **Smart Booking System** — Book any car with rental duration, optional chauffeur service, and an instant price breakdown summary
- 🚙 **Host Dashboard** — Car owners can add, edit, and delete their own listings with image preview and availability management
- 🌓 **Dark Mode & Responsive Design** — Fully responsive across mobile, tablet, and desktop with a polished dark/light theme toggle

---

## 🛠️ Tech Stack

| Component         | Technology                           |
| :---------------- | :----------------------------------- |
| **Framework**     | Next.js 16 (App Router)              |
| **Language**      | React 19 + JavaScript                |
| **Styling**       | Tailwind CSS v4, HeroUI              |
| **Auth**          | Better Auth (JWT + MongoDB sessions) |
| **Animations**    | Framer Motion                        |
| **HTTP Client**   | Axios                                |
| **Notifications** | React Hot Toast, SweetAlert2         |
| **Icons**         | Lucide React                         |

---

## 📄 Pages

| Route          | Description                              | Auth Required |
| :------------- | :--------------------------------------- | :------------ |
| `/`            | Home — Hero, featured cars, how-it-works | 🔓 Public     |
| `/cars`        | Browse all cars with search & filter     | 🔓 Public     |
| `/cars/[id]`   | Car detail page with Book Now            | 🔓 Public     |
| `/add-car`     | Add a new car listing                    | 🔒 Private    |
| `/my-cars`     | Manage your listed vehicles              | 🔒 Private    |
| `/my-bookings` | View & cancel reservations               | 🔒 Private    |
| `/login`       | Login page                               | 🔓 Public     |
| `/register`    | Registration page                        | 🔓 Public     |

---

## 💻 Run Locally

```bash
git clone [https://github.com/Redwanhossain200/drivefleet-client.git](https://github.com/Redwanhossain200/drivefleet-client.git)
cd drivefleet-client
npm install
```

Create a `.env` file:

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=your_mongodb_connection_string
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
