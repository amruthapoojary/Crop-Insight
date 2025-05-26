import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// User-facing components
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import About from './components/About';
import Footer from './components/Footer';
import Gallery from './components/Gallery';

// Admin dashboard components
import AdminDashboard from './components/AdminDashboard';
import Insert from './components/Insert';
import Update from './components/Update';
import Delete from './components/Delete';
import Select from './components/Select';

// Import UserDashboard, QueryDropDown, and Graph components
import QueryDropDown from './components/QueryDropDown';
import UserDashboard from './components/UserDashboard';
import Graph from './components/Graph';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, role, allowedRoles }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Home Component
const Home = () => (
  <div>
    <Carousel />
    <Footer />
  </div>
);

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [showQueryDropDown, setShowQueryDropDown] = useState(false);

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('isAuthenticated', true);
    localStorage.setItem('userRole', role);
    if (role === 'admin') {
      window.location.href = '/admin';
    } else if (role === 'user') {
      window.location.href = '/user-dashboard';
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const role = localStorage.getItem('userRole');
    if (authStatus && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const handleViewButtonClick = () => {
    setShowQueryDropDown(true);
  };

  const handleCloseDropdown = () => {
    setShowQueryDropDown(false);
  };

  // Function to determine if Navbar should be shown
  const shouldShowNavbar = () => {
    if (!isAuthenticated) {
      // Show navbar on public routes before login
      return true;
    }
    // Hide navbar after login for both user and admin
    return false;
  };

  return (
    <Router>
      <div>
        {/* Render Navbar based on authentication status */}
        {shouldShowNavbar() && <Navbar />}

        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              isAuthenticated
                ? userRole === 'admin'
                  ? <Navigate to="/admin" />
                  : <Navigate to="/user-dashboard" />
                : <Home />
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route
            path="/login"
            element={
              isAuthenticated
                ? userRole === 'admin'
                  ? <Navigate to="/admin" />
                  : <Navigate to="/user-dashboard" />
                : <Login onLoginSuccess={handleLoginSuccess} />
            }
          />
          <Route path="/signup" element={<Signup />} />

          {/* User Dashboard Routes */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['user']}>
                <UserDashboard onLogout={handleLogout} onViewButtonClick={handleViewButtonClick} />
                {showQueryDropDown && <QueryDropDown onClose={handleCloseDropdown} />}
              </ProtectedRoute>
            }
          />

          <Route
            path="/graph"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['user']}>
                <Graph />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['admin']}>
                <AdminDashboard onLogout={handleLogout} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/insert"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['admin']}>
                <Insert />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['admin']}>
                <Update />
              </ProtectedRoute>
            }
          />
          <Route
            path="/delete"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['admin']}>
                <Delete />
              </ProtectedRoute>
            }
          />
          <Route
            path="/select"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} role={userRole} allowedRoles={['admin', 'user']}>
                <Select />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;