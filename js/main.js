/*
==================================
CALLFORGE AI - PROFESSIONAL JS
==================================
*/

document.addEventListener("DOMContentLoaded", function () {

  /* ==============================
     Smooth Scroll
  ============================== */

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

  /* ==============================
     Navbar Scroll Effect
  ============================== */

  const nav = document.querySelector("nav");

  if (nav) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        nav.style.background = "#020617";
        nav.style.boxShadow = "0 4px 20px rgba(0,0,0,0.5)";
      } else {
        nav.style.background = "rgba(15, 23, 42, 0.95)";
        nav.style.boxShadow = "none";
      }
    });
  }

  /* ==============================
     Button Loading Effect
  ============================== */

  const buttons = document.querySelectorAll("button");

  buttons.forEach(button => {
    button.addEventListener("click", function () {

      if (this.classList.contains("no-loading")) return;

      const originalText = this.innerHTML;
      this.innerHTML = "Processing...";
      this.disabled = true;

      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 1200);
    });
  });

  /* ==============================
     Mobile Menu Toggle
  ============================== */

  const menuToggle = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  function upgradePlan(planeName) {
    localStorage.setItem("selectedPlan", planeName);
    window.location.href = "dashboard.html";
  }

});