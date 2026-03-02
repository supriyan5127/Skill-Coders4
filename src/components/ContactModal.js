import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './ContactModal.css';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.fullName.trim() || !formData.email.trim() || !emailRegex.test(formData.email) || !formData.message.trim()) {
      isValid = false;
    }

    // Optional phone validation (must be 10 digits if provided)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      isValid = false;
    }

    if (!isValid) {
      setErrorMessage("Please enter valid details in all fields.");
      return;
    }

    setErrorMessage('');
    setIsSending(true);

    const templateParams = {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone || "Not provided",
      message: formData.message,
      title: "New Contact Request"
    };

    try {
      await addDoc(collection(db, "contact_messages"), {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || "Not provided",
        message: formData.message,
        timestamp: serverTimestamp(),
        status: "new"
      });

      // Bypass .env check to ensure execution
      try {
        await emailjs.send(
          "service_eayrp6d", // Hardcoded Service ID from .env
          "template_uhpl7k8",// NEW Hardcoded Template ID from screenshot
          templateParams,
          "1oT6ZpFoqM4--a5vr" // Hardcoded Public Key from .env
        );
      } catch (emailErr) {
        console.error("EmailJS Error:", emailErr);
        setErrorMessage("EmailJS Error: " + (emailErr.text || emailErr.message || JSON.stringify(emailErr)));
        setIsSending(false);
        return; // Stop here if email fails
      }

      setIsSending(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ fullName: '', email: '', phone: '', message: '' });
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Failed to save message:', err);
      setIsSending(false);
      setErrorMessage("Failed to send message. Please try again later.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {showSuccess ? (
          <div className="success-message">
            <div className="success-icon">✓</div>
            <p className="success-text">
              Thank you! <span className="glow-text">Admin</span> will contact you soon.
            </p>
            <button className="success-close-btn" onClick={() => {
              setShowSuccess(false);
              setFormData({ fullName: '', email: '', phone: '', message: '' });
              onClose();
            }}>
              CLOSE
            </button>
            <div className="success-glow"></div>
          </div>
        ) : (
          <>
            <h2 className="glitch" data-text="CONTACT US">CONTACT US</h2>
            {errorMessage && (
              <div className="error-alert">
                <p>{errorMessage}</p>
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                <span className="input-glow"></span>
              </div>
              <div className="form-group">
                <label>E-MAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <span className="input-glow"></span>
              </div>
              <div className="form-group">
                <label>PHONE NUMBER</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <span className="input-glow"></span>
              </div>
              <div className="form-group">
                <label>MESSAGE</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
                <span className="input-glow"></span>
              </div>
              <button type="submit" className="submit-btn" disabled={isSending}>
                {isSending ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ContactModal;