# 🖥️ Nexon Laptops — E-Commerce Website  
A modern, responsive, bilingual (Arabic & English) e-commerce platform designed for **refurbished & imported laptop sales**.  
The project offers a clean minimal UI, structured UX, full product catalog, product details, a floating AI chatbot assistant, and smart AR/EN language switching — all powered by React + Vite + TailwindCSS.

---

## 🚀 Features

### 🛒 E-Commerce Core
- Product catalog showing all laptops with price + specs.
- Individual product details pages with full specifications.
- Add-to-cart system (React Context API).
- Cart item counter synced with header.
- Smooth "scroll-to-section" navigation within the homepage.

### 🌐 Bilingual Support (Arabic / English)
- Full Arabic RTL layout.
- One-click language toggle (En ⇆ ع).
- Text, labels, navigation & placeholders swap dynamically.
- Custom translation dictionaries using `LangContext`.

### 🤖 AI Chatbot Assistant (Nexon Assistant)
- Always-available floating chatbot at bottom-right.
- Knowledge base stored in JSON (easy to edit).
- Trained on:
  - All laptop models.
  - All specifications from `laptops.json`.
  - Most common sales/support questions.
- Can:
  - Recommend laptops based on usage.
  - Respond to generic questions.
  - Retrieve laptop info instantly.
  - Show laptop image + price + specs.
  - Answer availability & warranty questions.

### 🎨 Modern UI/UX
- Minimal white UI + deep navy text color (#1a1f36).
- Glass-effect sticky header.
- Subtle shadows, hover animations & smooth transitions.
- Fully responsive grid (mobile → tablet → desktop).
- Large Arabic headlines using Montaser + English rounded sans.
- Clean product cards & elegant layouts.

### 📩 Contact Form
- Simple contact form with Name, Email & Message.
- Works via `mailto:` (or can be wired to backend/EmailJS).
- RTL friendly form input & placeholder alignment.

---

## 🗂️ Tech Stack

| Layer | Technology |
|------|------------|
| Frontend | **React.js + Vite** |
| Styling | **TailwindCSS** |
| State Management | **React Context API** |
| Multi-Language | **LangContext** |
| AI Chatbot | **Local JSON Knowledge Base** |
| Routing | **React Router DOM** |
| Fonts | **Montaser Arabic + Rounded Modern Sans** |
| Assets | **Local images under /assets/images/** |

---

## 📁 Project Structure

```bash
frontend/
│── public/
│── src/
│   ├── assets/
│   │   ├── images/
│   │   └── fonts/
│   ├── components/
│   │   ├── layout/          # Header, Footer, Navbar
│   │   ├── chat/            # Nexon Chatbot
│   │   └── products/        # Product Cards + Product Details UI
│   ├── context/
│   │   ├── LangContext.jsx
│   │   └── CartContext.jsx
│   ├── data/
│   │   ├── laptops.json     # All laptop products
│   │   └── knowledge.json   # Chatbot training data
│   ├── pages/
│   │   ├── Home.jsx
│   │   └── ProductDetails.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.jsx
│   └── main.jsx
│── package.json
│── README.md
````

---

## 📦 Installation & Setup

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start development server

```bash
npm run dev
```

### 3️⃣ Build production version

```bash
npm run build
```

---

## 🗃️ How to Add or Modify Products

All product data lives in:

```
src/data/laptops.json
```

To add a new laptop, just add a new object like:

```json
{
  "id": 8,
  "name": "HP EliteBook 840 G8",
  "price": 18900,
  "image": "/images/8.png",
  "specs": {
    "CPU": "Intel Core i7",
    "RAM": "16GB",
    "Storage": "512GB SSD",
    "GPU": "Intel Iris Xe",
    "Display": "14\" FHD"
  },
  "description": "High-performance business laptop."
}
```

After saving:
✔ يظهر تلقائيًا في الرئيسية
✔ يظهر في قسم المنتجات
✔ يظهر في صفحة التفاصيل
✔ يستطيع الشات بوت يتعرف عليه

**بدون أي تعديل إضافي في الكود.**

---

## 🤖 Chatbot Knowledge Base Editing

Chatbot data stored in:

```
src/data/knowledge.json
```

Here you can edit:

* FAQs
* Support answers
* Product keywords
* Laptop names & categories
* Common troubleshooting questions

Chatbot automatically reloads the new data.

---

## 🔗 Footer Contact Information

* **Facebook:**
  [https://www.facebook.com/profile.php?id=61581818982614](https://www.facebook.com/profile.php?id=61581818982614)

* **WhatsApp:**
  +20 155 634 7892

* **Email:**
  [nexon122333@gmail.com](mailto:nexon122333@gmail.com)

---

## 📜 License

This project is proprietary and owned by:

**© 2025 Nexon Laptops — All Rights Reserved.**

---

## 👤 Developed By

Built with ❤️ using React, Tailwind & Context API
Designed and implemented by **Shahd Alaa**
