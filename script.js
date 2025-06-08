// DOM Elements
const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
const themeToggle = document.querySelector('.theme-toggle');
const moonIcon = themeToggle.querySelector('.fa-moon');
const sunIcon = themeToggle.querySelector('.fa-sun');

// Theme Toggle
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark-theme') {
    document.body.classList.add('dark-theme');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark-theme' : '');
    
    // Toggle icons
    moonIcon.style.display = isDark ? 'none' : 'block';
    sunIcon.style.display = isDark ? 'block' : 'none';
});

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

    // Close mobile menu when clicking on a nav link
document.querySelectorAll('.nav-links a').forEach(item => {
    item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
            } else {
        header.classList.remove('scrolled');
            }
        });

// Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
    button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
        button.classList.add('active');
            
        const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
                } else {
                    card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

// Form submission
const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const percentage = bar.getAttribute('data-level');
        bar.style.width = percentage + '%';
    });
};

// Animate skill bars when they come into view
const skillSection = document.querySelector('.skills');
if (skillSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillSection);
}

// Particle background
const createParticles = () => {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size between 5 and 20 pixels
        const size = Math.random() * 15 + 5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random animation delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
};

// Initialize particles
    createParticles();