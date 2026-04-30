# 🧩 React Kanban Dashboard

An interactive Kanban-style dashboard built with React, featuring dynamic card resizing, responsive grid layout, and smooth UI interactions.

---
## 📸 Screenshots

<img width="1891" height="866" alt="image" src="https://github.com/user-attachments/assets/073cfd30-1284-4290-8932-a0fe78cbf298" />
<img width="558" height="748" alt="image" src="https://github.com/user-attachments/assets/f028ea9b-564a-4809-96de-9685cb5e7093" />



## 🔗 Live Demo
👉 https://dashboard-ui-virid-three.vercel.app/

## 📂 GitHub Repo
👉 https://github.com/akankshapatil2015/dashboard-ui

---

## ✨ Features

- 📊 **Kanban Board Layout**
  - Multiple columns with structured task grouping
  - Clean and modern UI inspired by real productivity tools

- 📦 **Dynamic Card Resizing**
  - Resize cards using ➕ / ➖ controls
  - Min / Max constraints applied
  - Smooth animated transitions

- 📐 **Responsive Grid System**
  - Adapts from 3-column → 2-column → 1-column layout
  - Works seamlessly across desktop, tablet, and mobile

- 🎯 **Interactive UI Elements**
  - Filter, Sort, and View controls (UI level)
  - Avatar groups and status indicators
  - Tabs navigation

- ⚡ **Performance & UX Enhancements**
  - Smooth resize animations
  - Optimized rendering
  - Mobile-friendly interactions (resize disabled on small screens)

---

## 🛠️ Tech Stack

- **React.js**
- **JavaScript (ES6+)**
- **CSS3 (Flexbox + Grid + Media Queries)**
- **React Icons**
- **Vercel (Deployment)**

---

## 🧠 Key Implementation Details

### 🔹 Card Resizing Logic
- Managed using React `useState`
- Controlled width & height with min/max constraints
- Buttons disabled at limits to prevent overflow

### 🔹 Responsive Design
- CSS Grid with adaptive breakpoints
- Mobile-first optimizations
- Sidebar + layout adjustments for smaller screens

### 🔹 Smooth Animations
- CSS transitions with cubic-bezier easing
- Subtle scaling effect during resizing
- Improved perceived performance

---

## 📁 Project Structure
src/
│
├── components/
│ ├── Board/
│ ├── Column/
│ ├── Card/
│ ├── Sidebar/
│ └── Topbar/
│
├── data/
│ ├── columnsData.js
│ └── avatarData.js
│
├── App.jsx
└── main.jsx

---

## 🚧 Future Improvements

- Drag & drop cards (like Trello)
- Persist card size using localStorage
- Real filtering & sorting functionality
- Framer Motion animations
- Backend integration for real data

---

## 💡 What I Learned

- Managing UI state for dynamic layouts
- Building responsive dashboards from scratch
- Improving UX with micro-interactions and animations
- Handling edge cases in resizing logic

---

## 👩‍💻 Author

**Akanksha Patil**  
Frontend Developer  

- Portfolio: https://personal-portfolio-blush-mu.vercel.app/
- LinkedIn: https://www.linkedin.com/in/akankshapatil2015/

---

## ⭐ Feedback

I’d love to hear your feedback!  
Feel free to suggest improvements or enhancements.
