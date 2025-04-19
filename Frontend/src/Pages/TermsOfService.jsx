import React from 'react';
import { Link } from "react-router-dom";

const TermsOfService = () => {
  return (
    <div className="container mt-5 text-white p-20">
      <h1 className="text-center mb-4" style={{fontFamily:'cursive'}}>Terms of Service</h1>
      <div className="p-4 rounded">
        <h2 style={{fontFamily:'Times New Roman'}}>Saturday 18 April 2025</h2>
        <p>
          Welcome to <strong>Crunchily</strong>. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.
        </p>

        <h3>1. Acceptance of Terms</h3>
        <p>
          By using our website, you agree to these Terms of Service and our Privacy Policy. If you do not agree to all of these terms, do not use our website.
        </p>

        <h3>2. Use of Our Website</h3>
        <p>
          You agree to use our website only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the website. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our website.
        </p>
        <ul>
          <li>You must be at least 18 years of age to use certain features of our website, such as making purchases.</li>
          <li>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</li>
          <li>We reserve the right to modify or terminate our services or your access to our website at any time, for any reason, without notice.</li>
        </ul>

        <h3>3. Intellectual Property</h3>
        <p>
          The content, design, graphics, and other materials on our website are protected by copyright and other intellectual property laws. You may not reproduce, modify, distribute, or display our content without our prior written consent.
        </p>

        <h3>4. User Content</h3>
        <p>
          If you submit any content to our website (e.g., reviews, comments), you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media. You represent and warrant that you own or otherwise control all of the rights to the content you submit.
        </p>

        <h3>5. Disclaimer of Warranties</h3>
        <p>
          Our website is provided on an "as is" and "as available" basis without any warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that our website will be uninterrupted or error-free.
        </p>

        <h3>6. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by applicable law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of or inability to use our website. Our total liability to you for all claims arising out of or relating to these Terms or your use of our website will not exceed the amount you paid to us, if any, in the past twelve (12) months.
        </p>

        <h3>7. Indemnification</h3>
        <p>
          You agree to indemnify, defend, and hold harmless YumBite and its affiliates, officers, directors, employees, agents, licensors, and suppliers from and against all claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our website.
        </p>

        <h3>8. Governing Law</h3>
        <p>
          These Terms of Service shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in Pune, Maharashtra, India, to resolve any dispute arising out of or relating to these Terms or your use of our website.
        </p>

        <h3>9. Changes to These Terms</h3>
        <p>
          We may update these Terms of Service from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review these Terms periodically. Your continued use of our website after any changes to these Terms constitutes your acceptance of the new Terms.
        </p>

        <h3>10. Contact Us</h3>
        <p>
          If you have any questions or concerns about these Terms of Service, please contact us at:
        </p>
        <ul>
          <li>Email: <span style={{color:'green',background:' rgba(255, 255, 255, 0.47)',padding:'5px'}}>[shindearyan263@gmail.com]</span></li>
          <li style={{padding:'10px 0px 10px 0px'}}>Phone: <span style={{color:'green',background:' rgba(255, 255, 255, 0.47)',padding:'5px'}}>[(+91) 8055419702]</span></li>
          <li>Address: <span style={{color:'green',background:' rgba(255, 255, 255, 0.47)',padding:'5px'}}>[Akole, Maharashtra]</span></li>
        </ul>

        <div className="text-center mt-4">
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;