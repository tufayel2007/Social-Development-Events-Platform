# 🌟✨ Social Development Events Platform: "Ekota" (Unity) 🤝

## 🚀 Mission

**"Ekota" is a community-driven platform that bridges users to create, join, and track social development events in their local area. Its primary goal is to unite people and inspire positive societal change.**

> _Example:_ "Road Cleaning in Mirpur 10, Dhaka" • "Tree Plantation - Hossainpur, Kishoreganj"

---

## 🔗 Live Site & Code Source

| Domain                                   | Status             | Link                                                                                               |
| :--------------------------------------- | :----------------- | :------------------------------------------------------------------------------------------------- |
| **Live Website**                         | **✅ Online**      | **(https://sociale-development.vercel.app/)**                                                      |
| **Client Repository (Frontend)**         | **📂 50+ commits** | **[GitHub Frontend](https://github.com/tufayel2007/Social-Development-Events-Platform.git)**       |
| **Server Repository (Backend/Firebase)** | **📁 15+ commits** | **[GitHub Backend](https://github.com/tufayel2007/Social-Development-Events-Platform-Server.git)** |

---

## 💡 Key Features & Uniqueness

| Category               | Feature Details                                                                                                    |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------- |
| **User Experience**    | **🌙 Dark/Light Mode Toggle:** Switch the entire interface theme with a single click.                              |
| **Animation/UX**       | **✨ Framer Motion Animations:** Smooth, eye-catching entry and exit effects for sections and cards.               |
| **Data Handling**      | **🔎 Powerful Backend Filtering:** Filter by event type with **MongoDB/Firebase**, fast search by name.            |
| **Security**           | **🔑 Reload Protection:** Private routes preserve user session even on page reload.                                |
| **Design Consistency** | **📐 Equal Card Heights:** All grid cards maintain the same height for a professional look.                        |
| **Form Validation**    | **📝 Real-Time Validation:** Auth forms check uppercase, lowercase, minimum 6 characters, ensuring accurate input. |
| **Extra Features**     | **🔄 Custom Loader:** Attractive spinner while loading. **🚫 No Lorem Ipsum** and **🆕 New X Logo** used.          |

---

## 🛠️ Tech Stack Behind Ekota

| Layer              | Technology                           | Purpose                                                |
| :----------------- | :----------------------------------- | :----------------------------------------------------- |
| **Frontend**       | `React.js`, `Tailwind CSS`           | Modern component-based architecture and rapid styling. |
| **Animation**      | `Framer Motion`                      | Decorative and interactive animations.                 |
| **Authentication** | `Firebase Auth`                      | Secure login via email/password and Google.            |
| **Database**       | `Firebase Firestore` / `MongoDB`     | Store events, user data, and joined event info.        |
| **Utilities**      | `react-datepicker`, `react-toastify` | Date selection and attractive notifications.           |

---

## 💻 Frontend Conventions

To maintain smooth development and readable code, the following conventions are followed:

### 1. Folder Structure

- **Components:** Reusable UI components like `Navbar`, `Footer`, `EventCard`.
- **Pages:** Route-based components like `Home`, `UpcomingEvents`, `CreateEvent`.
- **Hooks:** Custom logic hooks like `useAuth`, `useDarkMode`.

### 2. Naming Convention

- **Components:** PascalCase (e.g., `JoinedEvents`, `EventCardWithAnimation`).
- **Hooks:** camelCase with `use` prefix (e.g., `useState`, `useCallback`).

### 3. State Management

- **Global State/Fetching:** React Context + `useAuth` hook for managing login sessions.
- **Datepicker Validation:** `minDate={new Date()}` blocks past dates.

---

## 📋 Project Structure Overview

| Page                | Route Type        | Main Functionality                                               |
| :------------------ | :---------------- | :--------------------------------------------------------------- |
| **Home**            | Public            | Banner, feature section, gallery, newsletter.                    |
| **Upcoming Events** | Public            | Grid view of all **future** events (filter and search included). |
| **Event Details**   | Public            | Full event description. **Login required to join.**              |
| **Create Event**    | Private/Protected | Create new events (past dates blocked).                          |
| **Manage Events**   | Private/Protected | Update/delete user-created events.                               |
| **Joined Events**   | Private/Protected | Sorted list of events the user has joined by date.               |

---

## 📝 Terms & Conditions

### 1. Acceptance of Terms

By using this platform, you agree to all terms set by **[SDEP]**. If you disagree, you may not use the service.

### 2. User Responsibility

- Users are solely responsible for any event they create or join.
- The platform must not be used for illegal, harmful, or socially disruptive events.

### 3. Content Rights

Users retain copyright of any uploaded content but grant the platform a license to display, promote, and provide services with it.

---

## 🔒 Privacy Policy

This policy explains how **Social Development Events Platform** collects, uses, and secures user information.

### 1. Information Collected

- **Personal Information (Authentication):** Name, email, profile picture (via Google/Firebase Auth).
- **Event Data (Firestore/MongoDB):** Event title, description, location, creator's email.

### 2. How We Use Information

- **Service Delivery:** Enable event creation, joining, and management.
- **Security:** Verify access control and user-created/managed events.

### 3. Data Security

User data is protected using Firebase Auth and secure database practices. **Passwords are encrypted.**

---

## 🧑‍💻 Developer Information

| Field              | Information                                              |
| :----------------- | :------------------------------------------------------- |
| **Created By**     | **Tufayel Ahmed**                                        |
| **Project Date**   | November 13, 2025                                        |
| **Contact**        | **ta07092007@gmail.com**                                 |
| **Github Profile** | **[GitHub](https://github.com/)**                        |
| **Project Link**   | **[Live Demo](https://sociale-development.vercel.app/)** |
