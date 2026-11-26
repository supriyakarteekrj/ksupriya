const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section[id]");
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

navToggle.addEventListener("click", () => {
  const isExpanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isExpanded));
  navToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
  navLinks.classList.toggle("open", !isExpanded);
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("open");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  });
}, { rootMargin: "-35% 0px -55% 0px" });

sections.forEach((section) => sectionObserver.observe(section));

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";
  formMessage.classList.remove("error");

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const email = contactForm.elements.email;
  if (!email.validity.valid) {
    email.setCustomValidity("Please enter a valid email address.");
    email.reportValidity();
    email.setCustomValidity("");
    return;
  }

  formMessage.textContent = "Your details look good. This demo form isn't connected to a mail service yet—please email me directly.";
});

document.querySelector("#year").textContent = new Date().getFullYear();
