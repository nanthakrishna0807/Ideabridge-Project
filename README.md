# IdeaBridge Platform

IdeaBridge is a comprehensive startup collaboration platform that connects Startup Developers, Emerging Startup Developers, Entrepreneurs, Fund Investors, and Admins.

## Built With
- **Frontend**: React.js, TailwindCSS, Framer Motion, Vite
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), JWT Auth

## Project Structure
- `/frontend`: The React application
- `/backend`: The Express server and MongoDB models

## How to Run Locally

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Ensure MongoDB is running locally on port 27017, or update the `MONGO_URI` in `.env`.
4. Run the seed script to populate sample test data (Admin, Investor, Student roles):
   ```bash
   node seed.js
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```
   *Server will run at `http://localhost:5000`*

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *Website will run at `http://localhost:5173`*

## Sample Test Data (from seed.js)
- **Admin**: `admin@ideabridge.com` / `password123`
- **Student Developer**: `jane@student.com` / `password123`
- **Investor**: `michael@invest.com` / `password123`

## Features Included
- Beautiful Glassmorphism UI
- Framer Motion integrated Landing Page
- Complete Auth Flow
- Role-specific separated Dashboards
- Simulated NDA restriction workflows
