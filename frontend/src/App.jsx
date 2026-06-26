import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';

import DeveloperDashboard from './pages/DeveloperDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import EntrepreneurDashboard from './pages/EntrepreneurDashboard';
import PlatformGuide from './pages/PlatformGuide';

function App() {

  // Test backend connection
  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => {
        console.log("Backend Response:", data);
      })
      .catch(err => {
        console.error("API Error:", err);
      });
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col pt-16">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>

            <Route path="/" element={<LandingPage />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/platform" element={<PlatformGuide />} />

            <Route path="/developer" element={<DeveloperDashboard />} />

            <Route path="/entrepreneur" element={<EntrepreneurDashboard />} />

            <Route path="/investor" element={<InvestorDashboard />} />

            <Route path="/admin" element={<AdminDashboard />} />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;