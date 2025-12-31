# BeyondChats – AI Content Enhancement Pipeline

This repository implements **Phase 1 and Phase 2** of the BeyondChats assignment: a backend system that scrapes blog articles, stores them in MongoDB, and enhances them using AI with external references.

Phase 3 (UI) is implemented separately using **Vercel v0** and is linked below.

---

## 🔹 Phase 1: Article Scraping & Storage

### Overview

Phase 1 focuses on collecting and storing blog articles in a structured and scalable manner.

### Key Features

* Scrapes articles from BeyondChats blog URLs
* Extracts title, content, and source URL
* Stores articles in MongoDB
* Prevents duplicate entries using unique source URLs
* Exposes REST APIs to fetch articles

### Tech Stack

* **Node.js** + **Express.js**
* **MongoDB** with **Mongoose**
* **Cheerio / Axios** for scraping

### Core API

* `GET /api/articles` – Fetch all stored articles
* `GET /api/articles/:id` – Fetch a single article

---

## 🔹 Phase 2: AI-Powered Content Enhancement

### Overview

Phase 2 enhances the stored articles using Large Language Models (LLMs) and external reference content.

### Enhancement Pipeline

1. Fetch original article from MongoDB
2. Perform web search for related reference articles
3. Scrape reference content
4. Rewrite the original article using AI while incorporating insights
5. Store enhanced content and references back in MongoDB

### Key Features

* LLM-based rewriting (LLM-agnostic design)
* Uses external reference articles for grounded responses
* Updates article with:

  * `updatedContent`
  * `references`
  * `isUpdated` flag

### Tech Stack

* **Mistral AI API** (chosen for API stability)
* Modular service-based architecture
* Timeout and error handling for long-running tasks

### Core API

* `POST /api/articles/:id/update` – Triggers AI enhancement pipeline

---

## 🖥️ Phase 3: Frontend Interface (UI)

Phase 3 is a separate frontend project built using **Vercel v0** for rapid UI prototyping.

### UI Highlights

* Clean, modern interface inspired by v0-generated designs
* Displays original and AI-enhanced articles
* Clearly distinguishes AI-enhanced content
* Connected to the Phase 1 & 2 backend APIs

### Phase 3 Repository

🔗 **Frontend Repo:** *https://github.com/mubinasyed28/beyondchats-fullweb?tab=readme-ov-file*

### Live Website

🌐 **Live UI:** *https://v0-improve-ui-psi.vercel.app/*

---

## 🧠 Design Notes

* Backend is fully decoupled from the frontend
* AI pipeline is LLM-agnostic and can be extended easily
* UI was inspired and scaffolded using **Vercel v0**, then connected to live APIs

---

## ✅ Status

* Phase 1: Completed ✅
* Phase 2: Completed ✅
* Phase 3: Completed (separate repo) ✅

---

## 🖼️ Screenshots

### 📊 Database (MongoDB)

<img width="941" height="414" alt="image" src="https://github.com/user-attachments/assets/9a90c6c7-5f7d-48fb-ba6f-734dfef0c32c" />

<img width="818" height="300" alt="image" src="https://github.com/user-attachments/assets/90c8a742-5dac-4022-b81e-e11230979817" />


---

### 🌐 Web Application (Phase 3 UI)

<img width="1353" height="605" alt="image" src="https://github.com/user-attachments/assets/e58ec36c-94d9-4c24-91eb-77e499025901" />


---

### 🏗️ System Architecture Diagram

> *Diagram showing how scraping, AI enhancement, database, backend APIs, and frontend UI are connected.*

<img width="2841" height="1144" alt="image" src="https://github.com/user-attachments/assets/2bf6a46e-023f-48a0-9888-705d5b3a4a57" />

---

## 📌 How to Run Backend Locally

```bash
npm install
npm run dev
```

Ensure MongoDB and environment variables are configured correctly.

---

## 📄 Author

**Mubina Syed**

This project was built as part of the BeyondChats internship assignment.
