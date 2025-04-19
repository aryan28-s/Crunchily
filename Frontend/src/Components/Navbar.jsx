import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserCircle, FaBars } from 'react-icons/fa'; // Import the bars icon

const Navbar = ({ isAuthenticated, setIsAuthenticated, userId }) => {
  console.log("Navbar - Received userId prop:", userId);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const profilePopupRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  console.log("Navbar Render - isAuthenticated:", isAuthenticated, "userId:", userId, "isMobileMenuOpen:", isMobileMenuOpen); // Log on every render

  useEffect(() => {
    const fetchUserProfile = async () => {
      console.log("fetchUserProfile called - isAuthenticated:", isAuthenticated, "userId:", userId);
      if (isAuthenticated && userId) {
        try {
          const response = await axios.get(`http://localhost:3000/user/${userId}`); // Assuming this is your endpoint
          console.log("Full API Response:", response.data);
          if (response.data) {
            setUserInfo(response.data);
            console.log("UserInfo State Updated:", response.data);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setUserInfo(null);
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, userId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profilePopupRef.current && !profilePopupRef.current.contains(event.target)) {
        setShowProfilePopup(false);
      }
    };

    if (showProfilePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfilePopup]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const toggleProfilePopup = () => {
    setShowProfilePopup(!showProfilePopup);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-black text-white">
      <div className="container-md d-flex justify-content-between align-items-center">
        <Link className="navbar-brand text-white custom-logo" to="/" style={{ fontFamily: 'cursive', fontSize: '28px', textDecoration: 'none' }}>
          <img src="logo.png" style={{ width: "50px", height: "45px" }} alt="Logo" />
          <span style={{ position: 'absolute', top: '18px' }}>Crunchily</span>
        </Link>

        {/* Hamburger Menu Button (Initially hidden on desktop) */}
        <button
          className="navbar-toggler mobile-only-button"
          type="button"
          onClick={toggleMobileMenu}
          aria-controls="mobileNavbar"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation"
        >
          <FaBars style={{ color: 'white', fontSize: '1.5em' }} />
        </button>

        {/* Desktop Navigation */}
        <div className="collapse navbar-collapse desktop-only-links">
          <div className="d-flex align-items-right justify-content-end" style={{ position: 'absolute', right: '180px' }}>
            {isAuthenticated ? (
              <>
                <Link
                  to="/menu"
                  className="mymenubtn me-2"
                >
                  <h5 style={{ fontFamily: 'cursive' }}><i>Spice Now </i>🌶</h5>
                </Link>
                <Link to="/cart" className="mycartbtn me-2">
                  Cart 🛒
                </Link>
                <div className="" style={{ position: 'absolute', right: '-140px' }}>
                  <div
                    onClick={toggleProfilePopup}
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      border: '1px solid white',
                      fontSize: '1.5em',
                      fontWeight: 'bold',
                    }}
                  >
                    {userInfo?.fullName ? (
                      userInfo.fullName.charAt(0).toUpperCase()
                    ) : (
                      <FaUserCircle />
                    )}
                  </div>
                  {showProfilePopup && (
                    <div
                      ref={profilePopupRef}
                      style={{
                        position: 'absolute',
                        top: '120%',
                        right: '-180px',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        color: 'white',
                        borderRadius: '8px',
                        padding: '20px',
                        zIndex: 1,
                        marginTop: '10px',
                        width: '300px',
                      }}
                    >
                      {userInfo ? (
                        <>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                          {/* <div
                    onClick={toggleProfilePopup}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      color: 'black',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                      border: '1px solid white',
                      fontSize: '1.5em',
                      fontWeight: 'bold',
                    }}
                  >
                    {userInfo?.fullName ? (
                      userInfo.fullName.charAt(0).toUpperCase()
                    ) : (
                      <FaUserCircle />
                    )}
                  </div>&nbsp;&nbsp; */}
                            <FaUserCircle size={30} className="me-3" style={{ fontFamily: 'cursive' }} /> 
                            <h6 style={{ fontWeight: 'bold', marginBottom: '5px' }}>{userInfo.fullName}</h6>
                          </div>
                          {userInfo.bio && <p style={{ fontSize: '0.9em', color: '#ccc', marginBottom: '10px' }}>{userInfo.bio}</p>}
                          <button
                            className="mylogout"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <button
                          className="mylogout"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="myLogin">
                  Login
                </Link>
                <Link to="/signup" className="mySignUp">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} id="mobileNavbar">
          <ul className="navbar-nav">
            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/menu" className="nav-link" onClick={toggleMobileMenu}>
                    <i>Spice Now </i>🌶
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/cart" className="nav-link" onClick={toggleMobileMenu}>
                    Cart 🛒
                  </Link>
                </li>
                {/* You might want to include a mobile version of the profile info here */}
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link" onClick={toggleMobileMenu}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link" onClick={toggleMobileMenu}>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;