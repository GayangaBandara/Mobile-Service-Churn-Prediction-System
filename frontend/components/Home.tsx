"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RocketIcon } from "lucide-react";
import styles from "../styles/components/Home.module.css";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={styles.container}>
      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.card}>
          {/* Logo */}
          <div className={styles.logo}>
            <Image
              src="/logo.svg"
              alt="TelcoChurn Logo"
              width={80}
              height={80}
              priority
            />
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            TelcoChurn Insights
          </h1>

          {/* Subtitle */}
          <p className={styles.subtitle}>
            Predict SIM/Data churn and boost customer retention with AI-driven insights.
          </p>

          {/* Features */}
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📊</div>
              <div className={styles.featureText}>Advanced Analytics</div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔮</div>
              <div className={styles.featureText}>Predictive Models</div>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>📱</div>
              <div className={styles.featureText}>Customer Insights</div>
            </div>
          </div>

          {/* View Dashboard Button */}
          <button
            onClick={() => router.push("/")}
            className={styles.button}
          >
            <RocketIcon size={20} />
            View Dashboard
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} <span className={styles.footerBrand}>TelcoChurn Insights</span>. All rights reserved.
      </footer>
    </div>
  );
}
