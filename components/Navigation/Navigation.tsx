"use client";

import styles from "./Navigation.module.css";
import { NavigationProps } from "./types";
import Link from "next/link";
import { useState, useEffect } from "react";

/* 
This entire component was built with hopes and dreams :)
*/

export function Navigation({ links }: NavigationProps) {
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);

  const toggleBurger = (link = "") => {
    if (burgerOpen) {
      setIsClosing(true);
      setTimeout(() => {
        setIsClosing(false);
        setBurgerOpen(false);
        if (link !== "") {
          setScrollTarget(link); // defer
        }
      }, 300); // match your slide animation duration
    } else {
      setBurgerOpen(true);
    }
  };

  useEffect(() => {
    if (!burgerOpen && scrollTarget) {
      const sectionTarget = document.getElementById(scrollTarget);
      if (sectionTarget) {
        sectionTarget.scrollIntoView({ behavior: "smooth" });
      }
      setScrollTarget(null); // reset
    }
  }, [burgerOpen, scrollTarget]);

  // Disable all types of scrolling behavior when mobile nav is open
  useEffect(() => {
    if (burgerOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
      document.body.style.touchAction = "auto";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, [burgerOpen]);

  const renderHamburgerClosed = () => {
    return (
      <>
        <div className={`${styles.burger1}`}></div>
        <div className={`${styles.burger2}`}></div>
        <div className={`${styles.burger3}`}></div>
      </>
    );
  };

  const renderHamburgerOpen = () => {
    return (
      <>
        <div className={`${styles.burger1} ${styles.burgerTop}`}></div>
        <div className={`${styles.burger2} ${styles.burgerMid}`}></div>
        <div className={`${styles.burger3} ${styles.burgerBottom}`}></div>
      </>
    );
  };

  const renderMobileNav = () => {
    return (
      <div
        id="mobile-navigation"
        className={`${styles.mobileNav} ${
          isClosing ? styles.slideOut : styles.slideIn
        }`}
      >
        <div className={styles.mobileNavLinksContainer}>
          {renderLinks(styles.mobileList, styles.mobileLinks)}
        </div>
      </div>
    );
  };

  const renderLinks = (ulClassName: string, linkClassName: string) => {
    return (
      <ul className={ulClassName}>
        {links.map((link) => (
          <li key={link}>
            <Link
              href={link}
              className={linkClassName}
              // Conditional otherwise desktop nav will act like mobile and break everything
              onClick={(e) => {
                if (burgerOpen) {
                  e.preventDefault();
                  toggleBurger(link);
                }
              }}
            >
              {link.charAt(0).toUpperCase() + link.substring(1)}
              {/* about -> About ... very flexible! */}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className={styles.navContainer} id="hero">
      <div className={styles.linksContainer}>
        {renderLinks(styles.list, styles.linkText)}
      </div>
      <div className={styles.burgerContainer}>
        {/* toggleBurger takes params so wrap in another function so React is happy */}
        <button
          className={styles.hamburger}
          onClick={() => toggleBurger()}
          aria-expanded={burgerOpen}
          aria-controls="mobile-navigation"
          aria-label={burgerOpen ? "Close menu" : "Open menu"}
          type="button"
        >
          {burgerOpen ? renderHamburgerOpen() : renderHamburgerClosed()}
        </button>
      </div>
      {burgerOpen ? renderMobileNav() : <></>}
    </div>
  );
}
