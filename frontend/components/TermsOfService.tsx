import React from "react";
import Link from "next/link";
import "../styles/pages/TermsOfService.css";

const TermsOfService: React.FC = () => {
  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1 className="terms-title">Terms of Service</h1>
        <p className="terms-subtitle">
          Please read these terms and conditions carefully before using our
          service.
        </p>
      </div>

      <div className="terms-content">
        <div className="terms-section">
          <h2 className="terms-section-title">1. Terms of Service Agreement</h2>
          <p className="terms-text">
            This Terms of Service Agreement ("Agreement") constitutes a legally
            binding contract between TelcoChurn Insights, Inc. ("Company," "we,"
            "us," or "our") and you ("User" or "you") governing your access to
            and use of our proprietary churn prediction platform, including all
            associated websites, applications, data analytics tools, and related
            services (collectively, the "Service").
          </p>

          <p className="terms-text">
            By accessing, registering for, or utilizing the Service in any
            manner, you:
          </p>

          <ul className="terms-list">
            <li>
              Acknowledge that you have read, understood, and agree to be bound
              by all terms and conditions contained herein;
            </li>
            <li>
              Represent that you have the legal authority to enter into this
              Agreement (either on behalf of yourself or your employer); and
            </li>
            <li>
              Consent to our collection, use, and disclosure of information as
              described in our Privacy Policy.
            </li>
          </ul>

          <p className="terms-text">
            <strong>
              IF YOU DO NOT UNCONDITIONALLY ACCEPT THESE TERMS IN THEIR
              ENTIRETY, YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICE AND
              MUST DISCONTINUE ACCESS IMMEDIATELY.
            </strong>
          </p>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">2. Definitions</h2>
          <p className="terms-text">
            For the purposes of these Terms of Service:
          </p>
          <ul className="terms-list">
            <li>
              <strong>Service</strong> refers to the website, applications, and
              services provided by TelcoChurn Insights.
            </li>
            <li>
              <strong>User</strong> refers to the individual accessing or using
              the Service, or the company, or other legal entity on behalf of
              which such individual is accessing or using the Service, as
              applicable.
            </li>
            <li>
              <strong>Account</strong> means a unique account created for you to
              access our Service or parts of our Service.
            </li>
            <li>
              <strong>Content</strong> refers to data, text, information,
              software, graphics, photos, or other materials that may be viewed
              or accessed through the Service.
            </li>
            <li>
              <strong>Customer Data</strong> refers to any data, information, or
              material provided or submitted by you to the Service in the course
              of using the Service.
            </li>
          </ul>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">3. Accounts</h2>
          <p className="terms-text">
            When you create an account with us, you must provide information
            that is accurate, complete, and current at all times. Failure to do
            so constitutes a breach of the Terms, which may result in immediate
            termination of your account on our Service.
          </p>
          <p className="terms-text">
            You are responsible for safeguarding the password that you use to
            access the Service and for any activities or actions under your
            password, whether your password is with our Service or a third-party
            service.
          </p>
          <p className="terms-text">
            You agree not to disclose your password to any third party. You must
            notify us immediately upon becoming aware of any breach of security
            or unauthorized use of your account.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">4. Intellectual Property</h2>
          <p className="terms-text">
            The Service and its original content (excluding Customer Data),
            features, and functionality are and will remain the exclusive
            property of TelcoChurn Insights and its licensors. The Service is
            protected by copyright, trademark, and other laws of both the United
            States and foreign countries. Our trademarks and trade dress may not
            be used in connection with any product or service without the prior
            written consent of TelcoChurn Insights.
          </p>
          <p className="terms-text">
            You retain all your rights to any Customer Data you submit, post, or
            display on or through the Service. By submitting, posting, or
            displaying Customer Data, you grant us a worldwide, non-exclusive,
            royalty-free license to use, process, and analyze the Customer Data
            solely for the purpose of providing the Service to you.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">5. Acceptable Use</h2>
          <p className="terms-text">You agree not to use the Service:</p>
          <ol className="terms-numbered-list">
            <li>
              In any way that violates any applicable national or international
              law or regulation.
            </li>
            <li>
              For the purpose of exploiting, harming, or attempting to exploit
              or harm minors in any way.
            </li>
            <li>
              To transmit, or procure the sending of, any advertising or
              promotional material, including any "junk mail", "chain letter,"
              "spam," or any other similar solicitation.
            </li>
            <li>
              To impersonate or attempt to impersonate the Company, a Company
              employee, another user, or any other person or entity.
            </li>
            <li>
              In any way that infringes upon the rights of others, or in any way
              is illegal, threatening, fraudulent, or harmful, or in connection
              with any unlawful, illegal, fraudulent, or harmful purpose or
              activity.
            </li>
          </ol>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">6. Limitation of Liability</h2>
          <p className="terms-text">
            In no event shall TelcoChurn Insights, nor its directors, employees,
            partners, agents, suppliers, or affiliates, be liable for any
            indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill,
            or other intangible losses, resulting from:
          </p>
          <ol className="terms-alpha-list">
            <li>
              Your access to or use of or inability to access or use the
              Service;
            </li>
            <li>Any conduct or content of any third party on the Service;</li>
            <li>Any content obtained from the Service; and</li>
            <li>
              Unauthorized access, use, or alteration of your transmissions or
              content, whether based on warranty, contract, tort (including
              negligence), or any other legal theory, whether or not we have
              been informed of the possibility of such damage.
            </li>
          </ol>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">7. Disclaimer</h2>
          <p className="terms-text">
            Your use of the Service is at your sole risk. The Service is
            provided on an "AS IS" and "AS AVAILABLE" basis. The Service is
            provided without warranties of any kind, whether express or implied,
            including, but not limited to, implied warranties of
            merchantability, fitness for a particular purpose, non-infringement,
            or course of performance.
          </p>
          <p className="terms-text">
            TelcoChurn Insights, its subsidiaries, affiliates, and its licensors
            do not warrant that:
          </p>
          <ul className="terms-list">
            <li>
              The Service will function uninterrupted, secure, or available at
              any particular time or location;
            </li>
            <li>Any errors or defects will be corrected;</li>
            <li>
              The Service is free of viruses or other harmful components; or
            </li>
            <li>
              The results of using the Service will meet your requirements.
            </li>
          </ul>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">8. Governing Law</h2>
          <p className="terms-text">
            These Terms shall be governed and construed in accordance with the
            laws of the United States, without regard to its conflict of law
            provisions.
          </p>
          <p className="terms-text">
            Our failure to enforce any right or provision of these Terms will
            not be considered a waiver of those rights. If any provision of
            these Terms is held to be invalid or unenforceable by a court, the
            remaining provisions of these Terms will remain in effect.
          </p>
        </div>

        <div className="terms-section">
          <h2 className="terms-section-title">9. Changes to Terms</h2>
          <p className="terms-text">
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least 30 days' notice prior to any new terms taking effect. What
            constitutes a material change will be determined at our sole
            discretion.
          </p>
          <p className="terms-text">
            By continuing to access or use our Service after any revisions
            become effective, you agree to be bound by the revised terms. If you
            do not agree to the new terms, you are no longer authorized to use
            the Service.
          </p>
        </div>

        <div className="terms-contact">
          <h3 className="terms-contact-title">Contact Us</h3>
          <p className="terms-contact-text">
            If you have any questions about these Terms, please contact us:
          </p>
          <p className="terms-contact-text">
            By email:{" "}
            <a
              href="mailto:legal@telcochurn.com"
              className="terms-contact-link"
            >
              legal@telcochurn.com
            </a>
          </p>
          <p className="terms-contact-text">
            By visiting our{" "}
            <Link href="/contact" className="terms-contact-link">
              Contact Us
            </Link>{" "}
            page
          </p>
        </div>

        <p className="terms-updated">Last Updated: July 26, 2025</p>
      </div>
    </div>
  );
};

export default TermsOfService;
