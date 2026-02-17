document.addEventListener('DOMContentLoaded', () => {
    // --- Loading Spinner --- 
    const loadingSpinner = document.getElementById('loading-spinner');
    if (loadingSpinner) {
        setTimeout(() => {
            loadingSpinner.style.opacity = '0';
            setTimeout(() => loadingSpinner.remove(), 500); // Remove after fade out
        }, 500); // Show for at least 0.5 seconds
    }

    // --- Typing Effect --- 
    const typingTextElement = document.getElementById('typing-text');
    const titles = [
        "Software Developer",
        "Java Developer",
        "Web Developer",
        "Problem Solver"
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100; // milliseconds per character
    const deletingSpeed = 50; // milliseconds per character
    const delayBetweenTitles = 1500; // milliseconds

    function typeEffect() {
        if (!typingTextElement) return; // Ensure element exists

        const currentTitle = titles[titleIndex];
        if (isDeleting) {
            typingTextElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingTextElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            setTimeout(() => isDeleting = true, delayBetweenTitles);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
        }

        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeEffect, speed);
    }

    if (typingTextElement) {
        typeEffect();
    }

    // --- Sticky Navbar --- 
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    const heroHeight = heroSection ? heroSection.offsetHeight : 0;

    function toggleStickyNavbar() {
        if (window.scrollY > heroHeight - 80) { // Adjust 80px for a smoother transition point
            navbar.classList.add('shadow-lg', 'bg-secondary/90');
            navbar.classList.remove('bg-primary/90');
        } else {
            navbar.classList.remove('shadow-lg', 'bg-secondary/90');
            navbar.classList.add('bg-primary/90');
        }
    }

    window.addEventListener('scroll', toggleStickyNavbar);
    toggleStickyNavbar(); // Call on load to set initial state

    // --- Smooth Scrolling Navigation --- 
    document.querySelectorAll('a.nav-link, a.mobile-nav-link, .btn-primary, .btn-secondary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('open')) {
                        mobileMenu.classList.remove('open');
                        document.body.classList.remove('overflow-hidden');
                    }
                }
            }
        });
    });

    // --- Mobile Menu Toggle --- 
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu && closeMobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            document.body.classList.add('overflow-hidden'); // Prevent scrolling body when menu is open
        });

        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            document.body.classList.remove('overflow-hidden');
        });
    }

    // --- Scroll Animations (Intersection Observer) --- 
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in-up-delay');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                if (entry.target.classList.contains('skill-item')) {
                    animateSkillProgress(entry.target);
                }
                // Optionally, unobserve after animation to run only once
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove 'is-visible' when out of view
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    animateOnScrollElements.forEach(el => {
        observer.observe(el);
    });

    // --- Skill Progress Bar Animation --- 
    function animateSkillProgress(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        if (progressBar && !progressBar.classList.contains('animate')) {
            const progress = progressBar.dataset.progress;
            progressBar.style.width = `${progress}%`;
            progressBar.classList.add('animate');
        }
    }

    // --- Contact Form Validation --- 
    const contactForm = document.getElementById('contact-form');
    const formSuccessMessage = document.getElementById('form-success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            let isValid = true;

            // Clear previous errors
            document.querySelectorAll('.text-red-400').forEach(el => el.classList.add('hidden'));

            // Validate Name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                document.getElementById('name-error').classList.remove('hidden');
                isValid = false;
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                document.getElementById('email-error').classList.remove('hidden');
                isValid = false;
            }

            // Validate Subject
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value.trim() === '') {
                document.getElementById('subject-error').classList.remove('hidden');
                isValid = false;
            }

            // Validate Message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                document.getElementById('message-error').classList.remove('hidden');
                isValid = false;
            }

            if (isValid) {
                // In a real application, you would send this data to a server
                console.log('Form Submitted:', {
                    name: nameInput.value,
                    email: emailInput.value,
                    subject: subjectInput.value,
                    message: messageInput.value
                });

                formSuccessMessage.classList.remove('hidden');
                contactForm.reset();
                setTimeout(() => {
                    formSuccessMessage.classList.add('hidden');
                }, 5000);
            }
        });
    }

    // --- Interactive Parallax Background for Hero Section ---
    const heroSectionParallax = document.getElementById('hero');
    const heroBackgroundParallax = document.getElementById('hero-background-parallax');

    if (heroSectionParallax && heroBackgroundParallax) {
        heroSectionParallax.addEventListener('mousemove', (e) => {
            const rect = heroSectionParallax.getBoundingClientRect();
            const x = e.clientX - rect.left; // X position within the element.
            const y = e.clientY - rect.top;  // Y position within the element.

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate movement amount (e.g., -10px to 10px)
            const moveX = (x - centerX) / centerX * 10; // Max 10px movement
            const moveY = (y - centerY) / centerY * 10; // Max 10px movement

            heroBackgroundParallax.style.transform = `translate(${-moveX}px, ${-moveY}px)`;
        });

        // Reset position when mouse leaves
        heroSectionParallax.addEventListener('mouseleave', () => {
            heroBackgroundParallax.style.transform = `translate(0px, 0px)`;
        });
    }

    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});