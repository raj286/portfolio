// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create animated background particles
    createParticles();
    
    // Initialize mouse trail effect
    initMouseTrail();
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Theme Toggle (Dark/Light Mode)
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Apply the saved theme or default
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        if (themeToggle) {
            themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
        }
    }
    
    // Toggle theme when clicking the theme button
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            body.classList.toggle('dark-theme');
            
            // Toggle icon
            const icon = themeToggle.querySelector('i');
            if (body.classList.contains('dark-theme')) {
                icon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                icon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For now, we'll just log it to the console
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show a success message (in a real application, you'd do this after successful submission)
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.section-title, .hero-content, .hero-image, .about-content, .skills-content, .project-card, .contact-content');
    
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.8;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Add initial class to enable transitions
    revealElements.forEach(element => {
        element.classList.add('reveal-element');
    });
    
    // Check on initial load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);

    // Add active class to navigation links based on scroll position
    function highlightNavLink() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Initialize highlight on page load
    highlightNavLink();

    // Create floating shapes
    createFloatingShapes();
});

// Function to create animated background particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 40; // Increased number of particles
    
    // Clear any existing particles
    particlesContainer.innerHTML = '';
    
    // Create particles
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random size between 5px and 25px
        const size = Math.random() * 20 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        
        // Random animation delay
        const delay = Math.random() * 15;
        particle.style.animationDelay = `${delay}s`;
        
        // Random animation duration between 15s and 30s
        const duration = Math.random() * 15 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.2;
        particle.style.opacity = opacity;
        
        // Random blur
        const blur = Math.random() * 2;
        particle.style.filter = `blur(${blur}px)`;
        
        // Random background color with primary color variations
        if (Math.random() > 0.7) {
            particle.style.background = 'rgba(251, 37, 118, 0.4)'; // Pink accent
        } else if (Math.random() > 0.4) {
            particle.style.background = 'rgba(51, 47, 208, 0.4)'; // Blue accent
        }
        
        particlesContainer.appendChild(particle);
    }
}

// Function to initialize mouse trail effect
function initMouseTrail() {
    const body = document.querySelector('body');
    
    body.addEventListener('mousemove', function(e) {
        // Create a trail particle
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        trail.style.left = e.pageX + 'px';
        trail.style.top = e.pageY + 'px';
        
        // Random size between 8px and 20px
        const size = Math.floor(Math.random() * 12) + 8;
        trail.style.width = size + 'px';
        trail.style.height = size + 'px';
        
        // Use gradient colors from our theme
        const useAccentColor = Math.random() > 0.5;
        if (useAccentColor) {
            trail.style.background = 'linear-gradient(135deg, #4a6cf7, #fb2576)';
        } else {
            trail.style.background = 'linear-gradient(135deg, #332FD0, #3f0071)';
        }
        
        // Random blur
        const blur = Math.random() * 3 + 1;
        trail.style.filter = `blur(${blur}px)`;
        
        document.body.appendChild(trail);
        
        // Remove the trail after animation completes
        setTimeout(() => {
            trail.remove();
        }, 1500);
    });
}

// Add a function to create floating shapes for additional visual interest
function createFloatingShapes() {
    const shapes = ['circle', 'square', 'triangle'];
    const container = document.createElement('div');
    container.className = 'floating-shapes';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';
    container.style.overflow = 'hidden';
    
    document.body.appendChild(container);
    
    // Create 15 random shapes
    for (let i = 0; i < 15; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Base styling
        shape.style.position = 'absolute';
        shape.style.opacity = '0.1';
        
        // Random size between 30px and 100px
        const size = Math.random() * 70 + 30;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        shape.style.left = `${posX}%`;
        shape.style.top = `${posY}%`;
        
        // Shape-specific styling
        if (shapeType === 'circle') {
            shape.style.borderRadius = '50%';
            shape.style.background = 'var(--primary-color)';
        } else if (shapeType === 'square') {
            shape.style.background = '#fb2576';
            shape.style.transform = `rotate(${Math.random() * 45}deg)`;
        } else if (shapeType === 'triangle') {
            shape.style.width = '0';
            shape.style.height = '0';
            shape.style.borderLeft = `${size/2}px solid transparent`;
            shape.style.borderRight = `${size/2}px solid transparent`;
            shape.style.borderBottom = `${size}px solid rgba(63, 0, 113, 0.5)`;
            shape.style.background = 'transparent';
        }
        
        // Animation
        shape.style.animation = `float ${Math.random() * 10 + 20}s linear infinite`;
        shape.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(shape);
    }
}

// Recreate particles on window resize
window.addEventListener('resize', function() {
    createParticles();
}); 