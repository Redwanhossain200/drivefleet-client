# ?? DriveFleet � Client

> A modern, full-featured car rental platform frontend built with **Next.js 16**, **React 19**, **Tailwind CSS v4**, and **HeroUI**. Supports user authentication, car browsing with filters, booking management, and host car listing.

---

## ?? Table of Contents

- [?? DriveFleet � Client](#-drivefleet--client)
  - [?? Table of Contents](#-table-of-contents)
  - [? Features](#-features)
  - [?? Tech Stack](#-tech-stack)
  - [?? Project Structure](#-project-structure)
  - [?? Pages \& Routes](#-pages--routes)
  - [?? Key Components](#-key-components)
    - [`CarImage.jsx`](#carimagejsx)
    - [`CarCard.jsx`](#carcardjsx)
    - [`BookingModal.jsx`](#bookingmodaljsx)
    - [`EditCarModal.jsx`](#editcarmodaljsx)
    - [`AuthContext.jsx`](#authcontextjsx)
  - [?? Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [?? Environment Variables](#-environment-variables)
  - [?? Scripts](#-scripts)
  - [?? Authentication](#-authentication)
  - [?? Image Handling](#-image-handling)
  - [?? Deployment](#-deployment)

---

## ? Features

- ?? **Authentication** � Email/password register & login via Better Auth
- ?? **Browse Cars** � Search, filter by type, availability, price sort
- ?? **Car Details** � Full vehicle specs, image, booking button
- ?? **Book a Car** � Select rental days, chauffeur option, price summary
- ?? **My Bookings** � View and cancel personal reservations
- ?? **Host Dashboard (My Cars)** � List, edit, delete your own vehicles
- ? **Add Car** � Submit a new vehicle listing with image URL
- ?? **Dark Mode** � Full dark/light theme toggle via next-themes
- ?? **Fully Responsive** � Mobile-first layout with Tailwind CSS
- ?? **Toast Notifications** � Real-time feedback with react-hot-toast
- ?? **Animations** � Smooth transitions using Framer Motion

---

## ?? Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | ^16.3.4 | React framework (App Router) |
| React | ^19.2.8 | UI library |
| Tailwind CSS | ^4.3.3 | Utility-first styling |
| HeroUI | ^3.2.4 | Component library |
| Better Auth | ^1.7.2 | Authentication |
| Framer Motion | ^13.1.1 | Animations |
| Lucide React | ^1.39.0 | Icon library |
| React Hot Toast | ^2.6.0 | Toast notifications |
| SweetAlert2 | ^11.26.25 | Confirmation dialogs |
| next-themes | ^0.4.6 | Dark mode |
| Axios | � | HTTP client (auth-client wrapper) |

---

## ?? Project Structure

```
client/
+-- src/
�   +-- app/                        # Next.js App Router pages
�   �   +-- page.jsx                # Home page
�   �   +-- layout.jsx              # Root layout (Navbar, Providers)
�   �   +-- loading.jsx             # Global loading UI
�   �   +-- not-found.jsx           # 404 page
�   �   +-- add-car/page.jsx        # Add new car listing
�   �   +-- cars/page.jsx           # Browse all cars
�   �   +-- cars/[id]/page.jsx      # Car detail & booking
�   �   +-- my-bookings/page.jsx    # User booking history
�   �   +-- my-cars/page.jsx        # Host car management
�   �   +-- login/page.jsx          # Login page
�   �   +-- register/page.jsx       # Registration page
�   �   +-- api/auth/[...all]/      # Better Auth API handler
�   �
�   +-- components/
�   �   +-- cars/
�   �   �   +-- CarCard.jsx         # Car listing card
�   �   �   +-- CarImage.jsx        # Resilient image component
�   �   �   +-- BookingModal.jsx    # Booking form modal
�   �   �   +-- EditCarModal.jsx    # Edit car listing modal
�   �   +-- home/
�   �   �   +-- HeroBanner.jsx      # Landing hero section
�   �   �   +-- AvailableCarsSection.jsx  # Featured cars
�   �   �   +-- HowItWorks.jsx      # Steps section
�   �   �   +-- WhyChooseUs.jsx     # Features highlight
�   �   +-- layout/
�   �   �   +-- Navbar.jsx          # Navigation bar
�   �   +-- providers/              # Theme & context providers
�   �   +-- ui/
�   �       +-- LoadingSpinner.jsx  # Loading component
�   �       +-- UserAvatar.jsx      # Avatar with initials fallback
�   �
�   +-- context/
�   �   +-- AuthContext.jsx         # Global auth state context
�   �
�   +-- lib/
�       +-- auth.js                 # Better Auth server config
�       +-- auth-client.js          # Axios instance with auth headers
�       +-- utils.js                # Utility functions
�
+-- next.config.mjs                 # Next.js config
+-- tailwind.config.js              # Tailwind config
+-- eslint.config.mjs               # ESLint config
+-- package.json
```

---

## ?? Pages & Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | Home � Hero, featured cars, how-it-works | No |
| `/cars` | Browse all cars with search & filter | No |
| `/cars/[id]` | Car detail with booking button | No (booking needs auth) |
| `/add-car` | Submit new car listing | ? Yes |
| `/my-cars` | Manage your listed vehicles | ? Yes |
| `/my-bookings` | View & cancel your reservations | ? Yes |
| `/login` | Email/password login | No |
| `/register` | New account registration | No |

---

## ?? Key Components

### `CarImage.jsx`
Resilient image component that:
- Trims whitespace and normalizes protocol-relative or bare URLs
- Uses Next.js `<Image unoptimized>` to bypass image proxy for external URLs
- Falls back to a generic placeholder only when URL is blank or fails to load

### `CarCard.jsx`
Animated card showing car photo, availability badge, booking count, price overlay, and "View Details" link.

### `BookingModal.jsx`
Booking form with rental duration, optional chauffeur (+$25/day), live price breakdown, and SweetAlert2 confirmation.

### `EditCarModal.jsx`
Inline modal to update any field of an existing car listing, including image URL.

### `AuthContext.jsx`
React Context providing `user`, `isAuthenticated`, `loading`, `login()`, `logout()` globally.

---

## ?? Getting Started

### Prerequisites
- Node.js >= 18
- The [DriveFleet Server](#) running locally or deployed

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env
# Edit .env with your values (see below)

# 3. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## ?? Environment Variables

Create a `.env` file in the `client/` root:

```env
# Better Auth secret (any long random string)
BETTER_AUTH_SECRET=your_long_random_secret_here
BETTER_AUTH_URL=http://localhost:3000

# Backend API base URL
NEXT_PUBLIC_API_URL=http://localhost:5000

# MongoDB connection string (for Better Auth session storage)
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/drivefleet
```

---

## ?? Scripts

```bash
npm run dev     # Start dev server on http://localhost:3000
npm run build   # Build for production
npm run start   # Start production server
npm run lint    # Run ESLint (0 errors, 0 warnings)
```

---

## ?? Authentication

DriveFleet uses **Better Auth** for session-based auth:

- Sessions stored in MongoDB (`drivefleet.session` collection)
- JWT tokens issued and verified via `/api/auth/jwks` JWKS endpoint
- `AuthContext` provides global state � `user`, `isAuthenticated`, `login()`, `logout()`
- Protected pages redirect to `/login?redirect=<original-path>`
- API calls attach Bearer tokens via the `auth-client` Axios instance

---

## ?? Image Handling

Car images are stored as **user-provided URLs** (no file upload). The `CarImage` component:
1. Trims whitespace from the URL
2. Normalizes `//example.com/img.jpg` ? `https://example.com/img.jpg`
3. Normalizes bare domains like `example.com/img.jpg` ? `https://example.com/img.jpg`
4. Uses `unoptimized` mode so Next.js does **not** proxy external images
5. Falls back to a placeholder sedan photo only if the URL is blank or errors

---

## ?? Deployment

Deploy the client to **Vercel**:

```bash
vercel deploy
```

Add the environment variables in your Vercel project dashboard. No additional config needed � `next.config.mjs` is already production-ready.
