// 1. Initialize EmailJS
// IMPORTANT: Replace with your actual Public Key from EmailJS Dashboard
(function() {
    // Example: emailjs.init("user_xyz123abc");
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

// 2. Handle Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const btn = document.getElementById('submit-btn');
        const originalText = btn.innerText;

        // UI Feedback: Loading
        btn.innerText = 'Sending...';
        btn.disabled = true;

        // Replace with your Service ID and Template ID
        const serviceID = 'YOUR_SERVICE_ID'; 
        const templateID = 'YOUR_TEMPLATE_ID';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                // UI Feedback: Success
                btn.innerText = 'Message Sent!';
                btn.classList.remove('btn-custom-green');
                btn.classList.add('btn-success');
                
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.classList.remove('btn-success');
                    btn.classList.add('btn-custom-green');
                }, 4000);
            }, (err) => {
                // UI Feedback: Error
                btn.innerText = 'Error. Try Again.';
                btn.disabled = false;
                console.error('EmailJS Error:', err);
                alert('Failed to send message. Please check your internet connection.');
            });
    });
}

// 3. Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 4. Navbar Transparency Toggle
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('shadow-sm');
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.classList.remove('shadow-sm');
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});