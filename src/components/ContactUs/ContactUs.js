import React from 'react';
import Header from '../Header/Header';
import './ContactUs.css';

function ContactUs() {
  return (
    <div className="contact-us-page">
  
      <div className="contact-us-container">
        <h1>Contact Us</h1>
        <div className="contact-us-content">
          <p>
            We'd love to hear from you! Whether you have questions, suggestions, or want to collaborate,
            feel free to reach out to us.
          </p>
          <p>
            Email: contact@scorecraft.com<br />
            Phone: (123) 456-7890
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
