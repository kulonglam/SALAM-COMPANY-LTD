// 1. Initialize EmailJS
// IMPORTANT: Replace with your actual Public Key from EmailJS Dashboard
// SECURITY: Enable "Domain Whitelisting" in EmailJS dashboard to prevent unauthorized use.
(function() {
    // Example: emailjs.init("user_xyz123abc");
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY"); 
    }
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
                // Reset Button & Form
                btn.innerText = originalText;
                btn.disabled = false;
                contactForm.reset();

                // Show Thank You Modal
                const modal = new bootstrap.Modal(document.getElementById('thankYouModal'));
                modal.show();
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
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
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
    if (!nav) return; // Guard clause in case navbar is missing
    if (window.scrollY > 50) {
        nav.classList.add('shadow-sm');
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        nav.classList.remove('shadow-sm');
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// 5. Scroll Spy (Active Link Highlighting)
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    // Guard clause: Only run if sections with IDs exist (prevents errors on other pages)
    if (sections.length === 0) return;

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // 150px offset accounts for the sticky navbar height and provides a smoother transition
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes('#' + current)) {
                link.classList.add('active');
            }
        });
    }
});

// 6. Cookie Consent Logic
document.addEventListener('DOMContentLoaded', function() {
    const cookieBanner = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');

    // Guard clause
    if (!cookieBanner || !acceptBtn) return;

    // Check local storage to see if already accepted
    if (!localStorage.getItem('cookieConsent')) {
        cookieBanner.classList.remove('d-none');
    }

    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'true');
        cookieBanner.classList.add('d-none');
    });
});

// 7. Search Functionality (Highlight & Scroll)
document.querySelectorAll('form[role="search"]').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const query = input.value.trim();
        
        // 1. Clear previous highlights
        document.querySelectorAll('.search-highlight').forEach(span => {
            const parent = span.parentNode;
            parent.replaceChild(document.createTextNode(span.textContent), span);
            parent.normalize(); // Merge adjacent text nodes
        });

        if (!query) return;

        // 2. Find text nodes containing the query
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    // Skip scripts, styles, and form elements
                    if (['SCRIPT', 'STYLE', 'TEXTAREA', 'INPUT'].includes(node.parentNode.tagName)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return node.textContent.toLowerCase().includes(query.toLowerCase()) 
                        ? NodeFilter.FILTER_ACCEPT 
                        : NodeFilter.FILTER_SKIP;
                }
            }
        );

        const matches = [];
        let node;
        while (node = walker.nextNode()) {
            matches.push(node);
        }

        if (matches.length === 0) {
            alert('No matches found on this page.');
            return;
        }

        // 3. Highlight matches
        let firstMatch = null;
        matches.forEach(node => {
            const index = node.textContent.toLowerCase().indexOf(query.toLowerCase());
            if (index >= 0) {
                const matchNode = node.splitText(index); // Split at start of match
                matchNode.splitText(query.length);       // Split at end of match
                
                const span = document.createElement('span');
                span.className = 'search-highlight';
                span.textContent = matchNode.textContent;
                matchNode.parentNode.replaceChild(span, matchNode);
                
                if (!firstMatch) firstMatch = span;
            }
        });

        // 4. Scroll to first match
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// 8. Page Loader
window.addEventListener('load', function() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.classList.add('loader-hidden');
        // Remove from DOM after transition to prevent clicking issues
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// 9. Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}