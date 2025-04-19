import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Menu from "./Components/Menu";
import Cart from "./Components/Cart";
import PrivacyPolicy from './Pages/PrivacyPolicy';
import TermsOfService from "./Pages/TermsOfService";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken && decodedToken.userId) {
          setUserId(decodedToken.userId);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          setIsAuthenticated(false);
          setUserId(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        setUserId(null);
      }
    }
  }, []);

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} userId={userId} />
      <Routes>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu userId={userId} />} />
          <Route path="/cart" element={<Cart userId={userId} />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;