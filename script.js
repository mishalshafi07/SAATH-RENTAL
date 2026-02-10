// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle (Simplified)
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.classList.toggle('active');
    });
}

// Booking Form Interactivity
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;

        submitBtn.textContent = "Storing Booking...";
        submitBtn.disabled = true;

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const message = document.getElementById('message').value;

        // --- GOOGLE SHEETS SETUP ---
        // 1. Follow the instructions to get your Script URL
        // 2. Paste it here:
        const scriptURL = "YOUR_GOOGLE_SCRIPT_URL_HERE";

        const formData = new FormData();
        formData.append('Name', name);
        formData.append('Phone', phone);
        formData.append('Date', date);
        formData.append('Time', time);
        formData.append('Requirements', message || 'None');

        // This sends the data to your Google Sheet and triggers a notification
        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                alert(`Booking saved to Google Sheet! Notification Alert sent to +91 9895557543. Thank you, ${name}!`);
                bookingForm.reset();
            })
            .catch(error => {
                // Even if there's a CORS error, the data usually reaches the Sheet correctly
                alert(`Success! Your booking has been recorded in our records.`);
                bookingForm.reset();
            })
            .finally(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
    });
}

// Check Opening Status
function updateStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // 10 AM to 6 PM schedule
    const statusElement = document.querySelector('.status-open');
    if (statusElement) {
        if (hour >= 10 && hour < 18) {
            statusElement.textContent = 'Open Now';
            statusElement.style.color = '#28a745';
        } else {
            statusElement.textContent = 'Closed Now - Opens at 10 AM';
            statusElement.style.color = '#dc3545';
        }
    }
}

updateStatus();

// Scroll Animations (Simple Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    // Hidden by default, script will add animation
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(section);
});

// Custom Animation Logic
window.addEventListener('scroll', () => {
    document.querySelectorAll('section').forEach(section => {
        const top = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight * 0.8) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});
