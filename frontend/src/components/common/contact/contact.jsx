import React from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We're here to help! Reach out to us through the form below.</p>

      <form className="contact-form">
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" placeholder="Enter your name" required />

        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          rows="5"
          placeholder="Type your message..."
          required
        />

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
};

export default Contact;
