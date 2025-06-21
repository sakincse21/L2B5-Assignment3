## 📚 Library Management System Backend

A RESTful API built with **Express**, **TypeScript**, and **Mongoose** to manage books and borrowing in a digital library.

---

## 🚀 Features

- 📖 CRUD operations for books
- 🔒 Field validation with Mongoose
- 📌 Filtering and sorting
- 📥 Borrowing logic with availability control
- 📊 Aggregation pipeline for reports

## 🏗️ Tech Stack

- **Backend:** Express.js, TypeScript
- **Database:** MongoDB + Mongoose
- **Dev Tools:** ESLint, Nodemon, ts-node
- **API Testing:** Postman

---

## 📦 Installation

```bash
git clone https://github.com/sakincse21/L2B5-Assignment3.git
cd L2B5-Assignment3
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root and add:

```env
PORT=5000
MONGODB_URI=your_mongodb_url
```

---

## 🧪 Running the Server

### In Development:

```bash
npm run start:dev
```

### In Production:

```bash
npm run build
npm start
```

---

## 🧩 API Endpoints

### 📘 Books

| Method | Endpoint               | Description                                   |
| ------ | ---------------------- | --------------------------------------------- |
| POST   | `/api/books`         | Create a new book                             |
| GET    | `/api/books`         | Get all books (supports filtering & sorting) |
| GET    | `/api/books/:bookId` | Get single book by ID                         |
| PATCH  | `/api/books/:`bookId | Update book by ID                             |
| DELETE | `/api/books/:`bookId | Delete book by ID                             |

### 📦 Borrow

| Method | Endpoint        | Description                          |
| ------ | --------------- | ------------------------------------ |
| POST   | `/api/borrow` | Borrow books                         |
| GET    | `/api/borrow` | Aggregated summary of borrowed books |

---

## 📽️ Explanation Video

📹 [Watch Video](https://youtu.be/B8krmfGe1QM)
