// 1. Initialize EmailJS
// Replace "YOUR_PUBLIC_KEY" with the public key from your EmailJS Account Dashboard
// Go to Account -> API Keys
(function() {
    emailjs.init("YOUR_PUBLIC_KEY"); 
})();

// 2. Handle Form Submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Stop page from reloading

    // Get the button to change text while sending
    const btn = document.getElementById('submit-btn');
    const originalText = btn.innerText;
    btn.innerText = 'Sending...';
    btn.disabled = true;

    // These IDs must match your EmailJS Service ID and Template ID
    // 1. Create a Service in EmailJS (e.g., Gmail)
    // 2. Create an Email Template in EmailJS
    const serviceID = 'YOUR_SERVICE_ID'; 
    const templateID = 'YOUR_TEMPLATE_ID';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerText = 'Sent Successfully!';
            btn.classList.remove('btn-custom-orange');
            btn.classList.add('btn-success');
            
            // Reset form
            document.getElementById('contact-form').reset();
            
            // Restore button after 3 seconds
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                btn.classList.remove('btn-success');
                btn.classList.add('btn-custom-orange');
            }, 3000);
        }, (err) => {
            btn.innerText = 'Failed. Try Again.';
            btn.disabled = false;
            alert(JSON.stringify(err));
        });
});

// 3. Smooth Scroll for Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 4. Navbar Shadow on Scroll
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('shadow-sm');
    } else {
        document.querySelector('.navbar').classList.remove('shadow-sm');
    }
});