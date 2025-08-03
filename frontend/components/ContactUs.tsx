"use client";

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import '../styles/pages/ContactUs.css';

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1 className="contact-title">Contact Us</h1>
        <p className="contact-subtitle">
          Have questions about our services or need support? We're here to help.
          Reach out to us using any of the methods below.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <h2 className="contact-info-title">Get in Touch</h2>
          <ul className="contact-info-list">
            <li className="contact-info-item">
              <Mail className="contact-info-icon" size={24} />
              <div className="contact-info-text">
                <span className="contact-info-label">Email</span>
                support@telcochurn.com
              </div>
            </li>
            <li className="contact-info-item">
              <Phone className="contact-info-icon" size={24} />
              <div className="contact-info-text">
                <span className="contact-info-label">Phone</span>
                +94 752578200
              </div>
            </li>
            <li className="contact-info-item">
              <MapPin className="contact-info-icon" size={24} />
              <div className="contact-info-text">
                <span className="contact-info-label">Address</span>
                SLTC Campus<br /> Trace Expert City, <br /> Colombo 10.
              </div>
            </li>
            <li className="contact-info-item">
              <Clock className="contact-info-icon" size={24} />
              <div className="contact-info-text">
                <span className="contact-info-label">Business Hours</span>
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Saturday: 10:00 AM - 4:00 PM<br />
                Sunday: Closed
              </div>
            </li>
          </ul>
        </div>

        <div className="contact-form">
          <h2 className="contact-form-title">Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject" className="form-label">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="form-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {submitSuccess && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            {submitError && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 rounded">
                {submitError}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;