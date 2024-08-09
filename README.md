# Recipe Management Application
# Overview
The Recipe Management Application is a web-based platform that allows users to browse, create, edit, and manage recipes. The application is split into two parts: the frontend (user interface) and the backend (server and database).

# Features
Browse recipes
Create new recipes
Edit existing recipes
Delete recipes
Search for recipes by name or ingredients
User authentication (login, registration)

# Technologies Used
Frontend: React, Redux, HTML, CSS, JavaScript
Backend: Node.js, Express, MongoDB, Mongoose
Authentication: JWT (JSON Web Tokens)
Styling: Tailwind CSS
API Requests: Axios

# Prerequisites
Before running the application, ensure you have the following installed:

Node.js (v14.x or higher)
npm (v6.x or higher) or yarn
MongoDB (local or cloud instance)

# Setup and Installation
# Frontend
# 1. Clone the Repository
git clone https://github.com/Jeevanantham22/recipe-management-app.git
cd recipe-management-frontend

# 2. Setup Environment Variables
Create a .env file in the root of the project directory and add the following:
REACT_APP_GRAPHQL_ENDPOINT='http://localhost:4000/graphql'

# 3. Install Dependencies
npm install

# 4. Running the Application
npm start

# Backend
# 1. Navigate to the backend project
cd recipe-management-backend

# 2. Setup Environment Variables
Create a .env file in the root of the project directory and add the following:
SECRET_KEY='secret'
MONGO_URI='mongodb://localhost:27017/recipe'
BACKEND_PORT=2000
GRAPHQL_PORT=4000

# 3. Install Dependencies
npm install

# 4. Running the Application
npm start


