import React from 'react';
import Link from 'next/link';
import '../styles/pages/PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <h1 className="privacy-title">Privacy Policy</h1>
        <p className="privacy-subtitle">
          At TelcoChurn Insights, we take your privacy seriously. This policy outlines how we collect, use, and protect your personal information.
        </p>
      </div>

      <div className="privacy-content">
        <div className="privacy-section">
          <h2 className="privacy-section-title">Introduction</h2>
          <p className="privacy-text">
            This Privacy Policy explains how TelcoChurn Insights ("we", "us", or "our") collects, uses, shares, and protects your personal information when you use our services, website, or mobile applications. We are committed to ensuring the privacy and security of your personal information.
          </p>
          <p className="privacy-text">
            By using our services, you agree to the collection and use of information in accordance with this policy. We will not use or share your information with anyone except as described in this Privacy Policy.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">Information We Collect</h2>
          <p className="privacy-text">
            We collect several different types of information for various purposes to provide and improve our services to you:
          </p>
          <ul className="privacy-list">
            <li>
              <strong>Personal Information:</strong> When you register for our services, we may ask for your name, email address, phone number, company name, and other contact details.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information on how you access and use our services, including your IP address, browser type, pages visited, time spent on pages, and other diagnostic data.
            </li>
            <li>
              <strong>Customer Data:</strong> Information about your customers that you upload or input into our system for analysis purposes.
            </li>
            <li>
              <strong>Cookies and Tracking Data:</strong> We use cookies and similar tracking technologies to track activity on our services and hold certain information.
            </li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">How We Use Your Information</h2>
          <p className="privacy-text">
            We use the collected information for various purposes, including:
          </p>
          <ul className="privacy-list">
            <li>To provide and maintain our services</li>
            <li>To notify you about changes to our services</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our services</li>
            <li>To monitor the usage of our services</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To fulfill any other purpose for which you provide it</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">Data Security</h2>
          <p className="privacy-text">
            The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
          </p>
          <p className="privacy-text">
            We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information, including:
          </p>
          <ul className="privacy-list">
            <li>All sensitive information is encrypted using secure socket layer technology (SSL)</li>
            <li>Regular malware scanning</li>
            <li>Secure networks protected by industry-standard firewalls</li>
            <li>Regular security assessments and penetration testing</li>
          </ul>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">Data Retention</h2>
          <p className="privacy-text">
            We will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">Your Rights</h2>
          <p className="privacy-text">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="privacy-list">
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p className="privacy-text">
            To exercise any of these rights, please contact us using the information provided in the "Contact Us" section below.
          </p>
        </div>

        <div className="privacy-section">
          <h2 className="privacy-section-title">Changes to This Privacy Policy</h2>
          <p className="privacy-text">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the bottom of this page.
          </p>
          <p className="privacy-text">
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
          </p>
        </div>

        <div className="privacy-contact">
          <h3 className="privacy-contact-title">Contact Us</h3>
          <p className="privacy-contact-text">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <p className="privacy-contact-text">
            By email: <a href="mailto:privacy@telcochurn.com" className="privacy-contact-link">privacy@telcochurn.com</a>
          </p>
          <p className="privacy-contact-text">
            By visiting our <Link href="/contact" className="privacy-contact-link">Contact Us</Link> page
          </p>
        </div>

        <p className="privacy-updated">Last Updated: July 26, 2025</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;