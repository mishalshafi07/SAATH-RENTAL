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

        submitBtn.textContent = "Sending Booking...";
        submitBtn.disabled = true;

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const dateRaw = document.getElementById('date').value; // YYYY-MM-DD
        const timeRaw = document.getElementById('time').value; // HH:MM
        const message = document.getElementById('message').value;

        // Split Date
        const [year, month, day] = dateRaw.split('-');

        // Split Time
        const [hour, minute] = timeRaw.split(':');

        const googleFormURL = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeyww6WEJsbpQ22XlqaKb4WO83h1mcbD4EJ0g2dlIkqctsy8w/formResponse";

        const formData = new URLSearchParams();
        formData.append('entry.240818119', name);
        formData.append('entry.1901000', phone);
        formData.append('entry.1397129258_year', year);
        formData.append('entry.1397129258_month', month);
        formData.append('entry.1397129258_day', day);
        formData.append('entry.79144280_hour', hour);
        formData.append('entry.79144280_minute', minute);
        formData.append('entry.917475730', message || 'None');

        // Submit to Google Form using 'no-cors' mode 
        // Note: fetch will fail to "read" the response but the data will reach Google
        fetch(googleFormURL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData.toString()
        })
            .then(() => {
                alert(`Thank you, ${name}! Your booking request has been sent successfully. We will contact you soon!`);
                bookingForm.reset();
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('Something went wrong. Please try again or contact us via WhatsApp.');
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
