
/*
  ELECTRONOVA 2026 - WEBSITE SETTINGS
*/

// Registration destination links
const REGISTRATION_ROUTES = {
    individual: "https://YOUR-INDIVIDUAL-REGISTRATION-LINK.com",
    team: "https://YOUR-TEAM-REGISTRATION-LINK.com"
};

// Official event contact email
const COLLEGE_EMAIL = "vitronixclub@vitbhopal.ac.in";

// Update footer contact email automatically
const contactEmail = document.getElementById("contactEmail");

if (contactEmail) {
    contactEmail.textContent = COLLEGE_EMAIL;
    contactEmail.href = `mailto:${COLLEGE_EMAIL}`;
}

// Countdown to event
const eventDate = new Date("2026-12-04T09:00:00+05:30").getTime();

function updateCountdown() {
    const now = Date.now();
    const difference = eventDate - now;

    const elements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    if (difference <= 0) {
        Object.values(elements).forEach(element => {
            if (element) element.textContent = "00";
        });
        return;
    }

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference / 3600000) % 24);
    const minutes = Math.floor((difference / 60000) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    if (elements.days) elements.days.textContent = String(days).padStart(2, "0");
    if (elements.hours) elements.hours.textContent = String(hours).padStart(2, "0");
    if (elements.minutes) elements.minutes.textContent = String(minutes).padStart(2, "0");
    if (elements.seconds) elements.seconds.textContent = String(seconds).padStart(2, "0");
}

// Start countdown
updateCountdown();
setInterval(updateCountdown, 1000);

// Registration form and redirect
const registrationForm = document.getElementById("regForm");
const formMessage = document.getElementById("formMessage");

if (registrationForm) {
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!registrationForm.reportValidity()) return;

        const formData = new FormData(registrationForm);
        const registrationType = formData.get("participation");
        const destination = REGISTRATION_ROUTES[registrationType];

        if (!destination || destination.includes("YOUR-")) {
            if (formMessage) {
                formMessage.textContent =
                    "Registration link is not configured yet. Please contact the event team.";
            }
            return;
        }

        const redirectUrl = new URL(destination);

        for (const [key, value] of formData.entries()) {
            redirectUrl.searchParams.set(key, value);
        }

        window.location.href = redirectUrl.toString();
    });
}

// Scroll reveal animation
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                currentObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
} else {
    revealElements.forEach(element => element.classList.add("visible"));
}
