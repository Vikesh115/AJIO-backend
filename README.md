# FakeStore API Backend with Node.js & MongoDB

A complete backend implementation of FakeStoreAPI with MongoDB persistence, built with Node.js, Express, and Mongoose.

- https://fakestore-backend-wake.onrender.com/api/products
- https://fakestore-backend-wake.onrender.com/api-docs/

## Features

- **Full CRUD API** matching FakeStoreAPI endpoints
- **MongoDB integration** for data persistence
- **Automated data population** from FakeStoreAPI
- **RESTful endpoints** with proper status codes
- **Ready for production** with best practices

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/products` | GET | Get all products |
| `/api/products/:id` | GET | Get single product |
| `/api/products/categories` | GET | Get all categories |
| `/api/products/category/:category` | GET | Filter by category |

## Prerequisites

- Node.js 16+
- MongoDB 5+
- npm/yarn

## Installation && run project

1. Clone the repository:
 - git clone https://github.com/Vikesh115/fakestore-backend.git
 - cd fakestore-backend

 - npm install (install dependencies)
 - npm run populate (populate database)
 - npm run dev (development mode with hot reload)
 - npm start (production mode)
 - npm test (test mode)

## Project structure

 - ├── models/           # MongoDB models
 - ├── routes/           # API route handlers
 - ├── scripts/          # Database scripts
 - ├── tests/            # Test cases
 - ├── server.js         # Main application entry
 - ├── package.json

## Technologies used

 - Backend: Node.js, Express
 - Database: MongoDB, Mongoose
 - Testing: Jest, Superset
 - Dev Tools: Nodemon

## Author

Vikesh Raut - https://github.com/Vikesh115
