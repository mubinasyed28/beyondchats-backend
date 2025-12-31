# BeyondChats – Phase 1 (Backend)

## Features
- Scrapes 5 oldest blogs from BeyondChats
- Stores articles in MongoDB
- RESTful CRUD APIs
- Duplicate-safe scraping

## Tech Stack
- Node.js, Express
- MongoDB, Mongoose
- Axios, Cheerio

## Setup
```bash
npm install
npm run dev
```

## Scrape Articles
Visit:
```
http://localhost:5000/scrape
```

## APIs

- GET /api/articles
- POST /api/articles
- PUT /api/articles/:id
- DELETE /api/articles/:id
