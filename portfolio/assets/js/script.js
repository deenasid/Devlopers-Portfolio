// Portfolio Website JavaScript
// Author: Alex Developer
// Description: Interactive features, animations, and functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initTypingEffect();
    initScrollAnimations();
    initProjectModals();
    initContactForm();
    initThemeToggle();
    initScrollToTop();
    initSkillBars();
    initMobileMenu();
    initParallaxEffects();
    initParticleBackground();
});

// Navigation functionality
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active section highlighting
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
}

// Typing effect for hero tagline
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const texts = [
        'Building the future with code',
        'Creating amazing digital experiences',
        'Transforming ideas into reality',
        'Innovating with technology'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next text
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    // Start typing effect after a delay
    setTimeout(typeText, 1000);
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Add scroll animation class to elements
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-item, .stat-item, .education-card');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
    
    // Sections are now visible by default, no need for fade-in animation
    // const sections = document.querySelectorAll('section');
    // sections.forEach(section => {
    //     section.classList.add('fade-in');
    //     observer.observe(section);
    // });
}

// Project modal functionality
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    
    const projectData = {
        1: {
            title: 'E-Commerce Platform',
            description: 'A comprehensive full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, payment processing with Stripe, inventory management, order tracking, and an admin dashboard. The application handles high traffic with Redis caching and implements real-time notifications.',
            tech: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Redis', 'Socket.io'],
            links: {
                demo: '#',
                github: '#'
            }
        },
        2: {
            title: 'Task Management App',
            description: 'A collaborative task management application built with Vue.js, Express, and PostgreSQL. Features real-time updates, team collaboration, file sharing, progress tracking, and deadline management. Implements role-based access control and integrates with popular project management tools.',
            tech: ['Vue.js', 'Express', 'PostgreSQL', 'WebSocket', 'AWS S3', 'JWT'],
            links: {
                demo: '#',
                github: '#'
            }
        },
        3: {
            title: 'Social Media Dashboard',
            description: 'A comprehensive social media analytics dashboard built with React, TypeScript, and Firebase. Provides real-time analytics, engagement metrics, content scheduling, and performance insights across multiple social media platforms. Features interactive charts and customizable reports.',
            tech: ['React', 'TypeScript', 'Firebase', 'Chart.js', 'Material-UI', 'REST APIs'],
            links: {
                demo: '#',
                github: '#'
            }
        }
    };
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data) {
                showModal(data);
            }
        });
    });
    
    // Close modal functionality
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function showModal(data) {
        const modalTitle = document.querySelector('.modal-title');
        const modalDescription = document.querySelector('.modal-description');
        const modalTech = document.querySelector('.modal-tech');
        const modalLinks = document.querySelector('.modal-links');
        
        modalTitle.textContent = data.title;
        modalDescription.textContent = data.description;
        
        modalTech.innerHTML = data.tech.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');
        
        modalLinks.innerHTML = `
            <a href="${data.links.demo}" class="btn btn-primary" target="_blank">
                <i class="fas fa-external-link-alt"></i>
                Live Demo
            </a>
            <a href="${data.links.github}" class="btn btn-secondary" target="_blank">
                <i class="fab fa-github"></i>
                GitHub
            </a>
        `;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Contact form functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };
        
        // Validate form
        if (validateForm(data)) {
            // Simulate form submission
            submitForm(data);
        }
    });
    
    function validateForm(data) {
        const errors = [];
        
        if (!data.name.trim()) {
            errors.push('Name is required');
        }
        
        if (!data.email.trim()) {
            errors.push('Email is required');
        } else if (!isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject.trim()) {
            errors.push('Subject is required');
        }
        
        if (!data.message.trim()) {
            errors.push('Message is required');
        }
        
        if (errors.length > 0) {
            showNotification(errors.join(', '), 'error');
            return false;
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function submitForm(data) {
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Message sent successfully!', 'success');
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '1rem 2rem',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: '500',
            zIndex: '3000',
            transform: 'translateX(400px)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#00ff88' : '#ff0066'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggleNav = document.getElementById('themeToggleNav');
    const body = document.body;
    
    // Check for saved theme or default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcons(savedTheme);
    
    // Add event listener to navigation theme toggle button
    if (themeToggleNav) {
        themeToggleNav.addEventListener('click', toggleTheme);
    }
    
    function toggleTheme() {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(newTheme);
        
        // Add transition effect
        body.style.transition = 'background 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            body.style.transition = '';
        }, 300);
    }
    
    function updateThemeIcons(theme) {
        // Update navigation theme toggle icon
        if (themeToggleNav) {
            const navIcon = themeToggleNav.querySelector('i');
            if (navIcon) {
                navIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    }
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Skill bars animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                progressBar.style.width = width;
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = '';
            bars[1].style.opacity = '1';
            bars[2].style.transform = '';
        }
    });
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = '';
            bars[1].style.opacity = '1';
            bars[2].style.transform = '';
        });
    });
}

// Parallax effects
function initParallaxEffects() {
    const heroBackground = document.querySelector('.geometric-pattern');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Particle background effect
function initParticleBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const hero = document.querySelector('.hero');
    
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.3';
    
    hero.appendChild(canvas);
    
    let particles = [];
    const particleCount = 50;
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        };
    }
    
    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(createParticle());
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = '#00d4ff';
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(0, 212, 255, ${1 - distance / 100})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    // Initialize and start animation
    resizeCanvas();
    initParticles();
    animate();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        resizeCanvas();
        initParticles();
    });
}

// Resume download functionality
function initResumeDownload() {
    const resumeBtn = document.getElementById('resumeDownload');
    
    resumeBtn.addEventListener('click', function() {
        // Create a simple resume content (in a real scenario, this would be a PDF file)
        const resumeContent = `
            ALEX DEVELOPER
            Full Stack Developer
            
            CONTACT
            Email: alex.developer@email.com
            Phone: +1 (555) 123-4567
            Location: San Francisco, CA
            
            EXPERIENCE
            Senior Full Stack Developer - TechCorp Solutions (2023-Present)
            • Led development of scalable web applications
            • Mentored junior developers
            • Implemented CI/CD pipelines
            
            Full Stack Developer - Digital Innovations Inc. (2021-2023)
            • Developed client projects
            • Focused on responsive design
            • Performance optimization
            
            SKILLS
            • JavaScript, React, Node.js
            • Python, MongoDB, AWS
            • Git, Docker, CI/CD
        `;
        
        // Create and download file
        const blob = new Blob([resumeContent], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Alex_Developer_Resume.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success notification
        showNotification('Resume downloaded successfully!', 'success');
    });
}

// Initialize resume download
document.addEventListener('DOMContentLoaded', function() {
    initResumeDownload();
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization: Debounce scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add smooth reveal animation for page load
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Start with content visible
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        heroContent.style.transition = 'all 1s ease-out';
    }
});
