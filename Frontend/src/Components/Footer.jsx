import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-center py-4">
      <div className="container-md">
        <p>Follow us on:</p>
        <div className="social-links">
          <a href="https://www.linkedin.com/in/aryan-shinde-44b9b5276?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " className="me-3 text-decoration-none mylink">Linkedin</a>
          <a href="https://twitter.com/aryan03284?t=ZZSsaiG2HW5Y5viuQ1NKDg&s=08 " className="me-3 text-decoration-none mylink">Twitter</a>
          <a href="https://instagram.com/aryan_328s?igshid=MzRlODBiNWFlZA==" className="me-3 text-decoration-none mylink">Instagram</a>
          <a href="/terms-of-service" className="me-3 text-decoration-none text-secondary myinfolink">Terms of Service</a>
          <Link to="/privacy-policy" className="text-decoration-none text-secondary myinfolink">
            Privacy Policy
          </Link>
        </div>
        <br />
        <p className="mycrunchilyright">
          @ Crunchily 2025 | All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;