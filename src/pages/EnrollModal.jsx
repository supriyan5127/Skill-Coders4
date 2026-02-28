import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './EnrollModal.css';

const EnrollModal = ({ course, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: `I'm interested in the ${course?.title} course.`
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        return value.trim() ? '' : 'Name is required';
      case 'email':
        if (!value.trim()) return 'Email is required';
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email)
    };
    setErrors(newErrors);
    setTouched({ fullName: true, email: true });

    if (!newErrors.fullName && !newErrors.email) {
      setErrorMessage('');
      setIsSending(true);

      const templateParams = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || "Not provided",
        message: formData.message,
        title: `Enrollment/Application: ${course?.title}`
      };

      try {
        await addDoc(collection(db, "enrollments"), {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone || "Not provided",
          message: formData.message,
          course: course?.title,
          timestamp: serverTimestamp(),
          status: "new"
        });

        if (process.env.REACT_APP_EMAILJS_SERVICE_ID) {
          try {
            await emailjs.send(
              "service_eayrp6d", // Hardcoded Service ID
              "template_uhpl7k8", // Hardcoded Template ID
              templateParams,
              "1oT6ZpFoqM4--a5vr" // Hardcoded Public Key
            );
          } catch (emailErr) {
            console.error("EmailJS Error:", emailErr);
            setErrorMessage("EmailJS Error: " + (emailErr.text || emailErr.message || JSON.stringify(emailErr)));
            setIsSending(false);
            return;
          }
        }

        console.log('Enrollment submitted:', { ...formData, course: course?.title });

        setIsSending(false);
        setShowSuccess(true);

        setTimeout(() => {
          setShowSuccess(false);
          onClose();
        }, 3000);
      } catch (err) {
        console.error('Failed to save enrollment:', err);
        setIsSending(false);
        setErrorMessage("Failed to send details. Please try again later.");
      }
    }
  };

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
            <button className="success-close-btn" onClick={onClose}>
              CLOSE
            </button>
            <div className="success-glow"></div>
          </div>
        ) : (
          <>
            <h2 className="glitch" data-text="ENROLL NOW">ENROLL NOW</h2>
            <p className="course-info">Course: <strong>{course?.title}</strong></p>

            {errorMessage && (
              <div className="error-alert" style={{ marginBottom: '15px' }}>
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
                  onBlur={handleBlur}
                  className={touched.fullName && errors.fullName ? 'error' : ''}
                />
                {touched.fullName && errors.fullName && (
                  <span className="error-text">{errors.fullName}</span>
                )}
                <span className="input-glow"></span>
              </div>

              <div className="form-group">
                <label>E-MAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.email && errors.email ? 'error' : ''}
                />
                {touched.email && errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
                <span className="input-glow"></span>
              </div>

              <div className="form-group">
                <label>PHONE NUMBER (optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <span className="input-glow"></span>
              </div>

              <div className="form-group">
                <label>MESSAGE (optional)</label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <span className="input-glow"></span>
              </div>

              <button type="submit" className="submit-btn" disabled={isSending}>
                {isSending ? 'SENDING...' : 'SUBMIT'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnrollModal;