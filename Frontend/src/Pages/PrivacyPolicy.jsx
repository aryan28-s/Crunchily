import React from 'react';
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="container mt-5 text-white p-20">
      <h1 className="text-center mb-4" style={{fontFamily:'cursive'}}>Privacy Policy</h1>
      <div className="p-4 rounded">
        <h2 style={{fontFamily:'Times New Roman'}}>Saturday 18 April 2025</h2>
        <p>
          Welcome to <strong>Crunchily</strong> ("we," "our," "us"). We are committed to protecting your privacy and ensuring that your personal information is handled in a safe and responsible manner. This Privacy Policy outlines how we collect, use, and protect your information when you visit our website.
        </p>

        <h3>1. Information We Collect</h3>
        <p>
          We may collect the following types of information:
        </p>
        <ul>
          <li>
            <strong>Personal Information:</strong>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Shipping/billing address</li>
              <li>Payment information (With QR for more privacy)</li>
            </ul>
          </li>
          <li>
            <strong>Non-Personal Information:</strong>
            <ul>
              <li>Browser type</li>
              <li>IP address</li>
              <li>Pages visited</li>
              <li>Time and date of visit</li>
              <li>Referring website</li>
            </ul>
          </li>
          <li>
            <strong>Cookies and Tracking Technologies:</strong>
            <ul>
              <li>We use cookies and similar technologies to enhance your experience on our website. Cookies are small files stored on your device that help us analyze web traffic and improve our services.</li>
            </ul>
          </li>
        </ul>

        <h3>2. How We Use Your Information</h3>
        <p>
          We use the information we collect for the following purposes:
        </p>
        <ul>
          <li>
            <strong>To Provide Services:</strong>
            <ul>
              <li>Process orders and payments</li>
              <li>Deliver products and services</li>
              <li>Communicate with you about your account or orders</li>
            </ul>
          </li>
          <li>
            <strong>To Improve Our Website:</strong>
            <ul>
              <li>Analyze website usage and trends</li>
              <li>Enhance user experience</li>
              <li>Develop new features and services</li>
            </ul>
          </li>
          <li>
            <strong>To Communicate with You:</strong>
            <ul>
              <li>Respond to inquiries and provide customer support</li>
              <li>Send promotional emails (to shindearyan263@gmail.com)</li>
              <li>Notify you about updates or changes to our services</li>
            </ul>
          </li>
          <li>
            <strong>To Ensure Security:</strong>
            <ul>
              <li>Protect against fraud and unauthorized access</li>
              <li>Comply with legal obligations</li>
            </ul>
          </li>
        </ul>

        <h3>3. Sharing Your Information</h3>
        <p>
          We do not sell, trade, or rent your personal information to third parties. However, we may share your information in the following circumstances:
        </p>
        <ul>
          <li>
            <strong>Service Providers:</strong>
            <ul>
              <li>We may share your information with trusted third-party service providers who assist us in operating our website, processing payments, or delivering products.</li>
            </ul>
          </li>
          <li>
            <strong>Legal Requirements:</strong>
            <ul>
              <li>We may disclose your information if required by law or to protect our rights, property, or safety.</li>
            </ul>
          </li>
          <li>
            <strong>Business Transfers:</strong>
            <ul>
              <li>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the new owner.</li>
            </ul>
          </li>
        </ul>

        <h3>4. Your Rights</h3>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul>
          <li>
            <strong>Access and Correction:</strong>
            <ul>
              <li>You can request access to your personal information and update or correct it.</li>
            </ul>
          </li>
          <li>
            <strong>Opt-Out:</strong>
            <ul>
              <li>You can opt-out of receiving promotional emails by following the unsubscribe link in the email.</li>
            </ul>
          </li>
          <li>
            <strong>Data Deletion:</strong>
            <ul>
              <li>You can request the deletion of your personal information, subject to legal obligations.</li>
            </ul>
          </li>
          <li>
            <strong>Cookies:</strong>
            <ul>
              <li>You can disable cookies in your browser settings, but this may affect your experience on our website.</li>
            </ul>
          </li>
        </ul>

        <h3>5. Data Security</h3>
        <p>
          We take reasonable measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is 100% secure.
          We also use 10 times encryption for your password with bycriptjs.
        </p>

        <h3>6. Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
        </p>

        <h3>7. Contact Us</h3>
        <p>
          If you have any questions or concerns about this Privacy Policy, please contact us at:
        </p>
        <ul>
          <li>Email: <span style={{color:'green',background:' rgba(255, 255, 255, 0.47)',padding:'5px'}}>[shindearyan263@gmail.com]</span></li>
          <li style={{padding:'10px 0px 10px 0px'}}>Phone: <span style={{color:'green',background:' rgba(255, 255, 255, 0.47)',padding:'5px'}}>[(+91) 8055419702]</span></li>
          <li>Address: <span style={{color:'green',background:' rgba(255, 255, 255, 0.47)',padding:'5px'}}>[Akole, Maharashtra]</span></li>
        </ul>

        <h3>8. Consent</h3>
        <p>
          By using our website, you consent to the terms of this Privacy Policy.
        </p>
        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;