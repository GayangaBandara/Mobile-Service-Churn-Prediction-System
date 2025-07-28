"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, Home, Mail } from 'lucide-react';
import '../styles/components/Layout.css';
import '../styles/components/PageTransition.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // Handle page transitions
  useEffect(() => {
    const handleRouteChangeStart = () => {
      setIsPageTransitioning(true);
    };
    
    const handleRouteChangeComplete = () => {
      setIsPageTransitioning(false);
      // Scroll to top on page change
      window.scrollTo(0, 0);
    };
    
    // Add event listeners for route changes
    window.addEventListener('beforeunload', handleRouteChangeStart);
    
    return () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
    };
  }, []);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="layout-header-content">
          <Link href="/" className="layout-logo">
            <Image
              src="/logo.svg"
              alt="TelcoChurn Logo"
              width={32}
              height={32}
              className="layout-logo-image"
            />
            <span>TelcoChurn Insights</span>
          </Link>

          <nav className="layout-nav">
            <Link
              href="/home"
              className={`layout-nav-link smooth-link ${isActive('/home') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/"
              className={`layout-nav-link smooth-link ${isActive('/') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            {/* <Link
              href="/add-customer"
              className={`layout-nav-link smooth-link ${isActive('/add-customer') ? 'active' : ''}`}
            >
              Add Customer
            </Link>
            <Link
              href="/add-location"
              className={`layout-nav-link smooth-link ${isActive('/add-location') ? 'active' : ''}`}
            >
              Add Location
            </Link> */}
            <Link
              href="/contact"
              className={`layout-nav-link smooth-link ${isActive('/contact') ? 'active' : ''}`}
            >
              Contact Us
            </Link>
          </nav>

          <button 
            className="layout-mobile-menu-button" 
            onClick={toggleMobileMenu}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      <div className={`layout-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="layout-mobile-menu-header">
          <Link href="/" className="layout-logo" onClick={closeMobileMenu}>
            <Image
              src="/logo.svg"
              alt="TelcoChurn Logo"
              width={32}
              height={32}
              className="layout-logo-image"
            />
            <span>TelcoChurn Insights</span>
          </Link>
          <button 
            className="layout-mobile-menu-close" 
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="layout-mobile-menu-nav">
          <Link
            href="/home"
            className={`layout-mobile-menu-link ${isActive('/home') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Home size={20} style={{ marginRight: "0.5rem" }} />
            Home
          </Link>
          <Link
            href="/"
            className={`layout-mobile-menu-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Home size={20} style={{ marginRight: "0.5rem" }} />
            Dashboard
          </Link>
          {/* <Link
            href="/add-customer"
            className={`layout-mobile-menu-link ${isActive('/add-customer') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Users size={20} style={{ marginRight: "0.5rem" }} />
            Add Customer
          </Link>
          <Link
            href="/add-location"
            className={`layout-mobile-menu-link ${isActive('/add-location') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <BarChart2 size={20} style={{ marginRight: "0.5rem" }} />
            Add Location
          </Link> */}
          <Link
            href="/contact"
            className={`layout-mobile-menu-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={closeMobileMenu}
          >
            <Mail size={20} style={{ marginRight: "0.5rem" }} />
            Contact Us
          </Link>
        </nav>
      </div>

      <main className="layout-main">
        <div className={`page-transition-container ${isPageTransitioning ? 'page-transition-exit-active' : 'fade-in'}`}>
          {children}
        </div>
      </main>

      <footer className="layout-footer">
        <div className="layout-footer-content">
          <div className="layout-footer-copyright">
            © {new Date().getFullYear()} TelcoChurn Insights. All rights reserved.
          </div>
          <div className="layout-footer-links">
            <Link href="/privacy" className="layout-footer-link smooth-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="layout-footer-link smooth-link">
              Terms of Service
            </Link>
            <Link href="/contact" className="layout-footer-link smooth-link">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;