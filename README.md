# 📚 Book Recommendation System

A simplified book recommendation web application built with **React**, **TypeScript**, **Redux Toolkit**, and **Google Books API**. This application allows users to search, view, rate, and review books in an interactive and user-friendly interface.

---

## 🧾 Project Overview

This project showcases core frontend development skills through a fully functional book review platform. It includes:

- A login system using browser storage for credentials
- Integration with the Google Books API to fetch and display book data
- Users can view detailed book information, rate books from 1–5, and leave text reviews
- Ratings and reviews are tracked using Redux

---

## ⚙️ Setup and Installation

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn package manager

### Installation Steps

If you wish to run this app locally, clone this repo and install the dependencies.

1. **Clone the repository**

   ```bash
   git clone https://github.com/RajKanani1206/book-recommendation
   cd book-recommendation
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

---

## 🚀 Additional Features or Improvements Made

- 🔐 **Login Route Protection**  
  Route protection ensures access only for logged-in users.

- 🔎 **Book Search**  
  Real-time filtering of books by title or author.

- ⭐ **Dynamic Review System**  
  Each new rating updates the average rating and rating count in real time.
