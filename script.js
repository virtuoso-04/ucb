// Remove custom smooth scrolling as it's causing issues
// We'll use native smooth scrolling instead (defined in CSS)

// Mobile menu functionality
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Check if the menu button has an icon element
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });
}


// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Prevent re-animation
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.info-section, .waitlist-section, .features-section').forEach(section => {
        observer.observe(section);
    });
});


// Form handling for Netlify
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[name="waitlist"]');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            try {
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;
                
                const formData = new FormData(form);
                await fetch('/', {
                    method: 'POST',
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: new URLSearchParams(formData).toString()
                })
                .then(() => {
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'form-success';
                    successMsg.textContent = 'Thank you for joining our waitlist!';
                    form.appendChild(successMsg);
                    
                    // Clear the form
                    form.reset();
                    
                    // Show success message with animation
                    setTimeout(() => successMsg.classList.add('visible'), 100);
                    
                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.classList.remove('visible');
                        setTimeout(() => successMsg.remove(), 300);
                    }, 5000);
                });
            } catch (error) {
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'form-error';
                errorMsg.textContent = 'Something went wrong. Please try again.';
                form.appendChild(errorMsg);
                
                // Show error message with animation
                setTimeout(() => errorMsg.classList.add('visible'), 100);
                
                // Remove error message after 5 seconds
                setTimeout(() => {
                    errorMsg.classList.remove('visible');
                    setTimeout(() => errorMsg.remove(), 300);
                }, 5000);
                
                console.error('Form submission error:', error);
            } finally {
                // Reset button after 2 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
    }
});