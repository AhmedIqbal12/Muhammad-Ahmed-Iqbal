// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling
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

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(168, 85, 247, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
const animateOnScroll = document.querySelectorAll('.service-card, .project-card, .timeline-item, .stat-item');
animateOnScroll.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Project Carousel Dots
const dots = document.querySelectorAll('.dot');
const projectCards = document.querySelectorAll('.project-card');
let currentSlide = 0;

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        currentSlide = index;
        
        // Optional: Add sliding animation for projects
        // This is a simple example - you can enhance this
        projectCards.forEach((card, cardIndex) => {
            if (Math.floor(cardIndex / 3) === index) {
                card.style.display = 'block';
            }
        });
    });
});

// Form Submission
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

// Add floating animation to hero title
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    let position = 0;
    setInterval(() => {
        position += 0.5;
        heroTitle.style.transform = `translateY(${Math.sin(position) * 5}px)`;
    }, 50);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Typing effect for hero subtitle (optional enhancement)
const subtitle = document.querySelector('.hero-subtitle');
if (subtitle) {
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            subtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };
    
    // Start typing after a short delay
    setTimeout(typeWriter, 1000);
}

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16);
    const isDecimal = target.toString().includes('.');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = isDecimal ? target.toFixed(1) : target + '+';
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current) + '+';
        }
    }, 16);
};

// Trigger counter animation when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const numbers = entry.target.querySelectorAll('.stat-number');
            numbers.forEach(num => {
                const text = num.textContent.replace(/\+/g, '');
                let target;
                
                if (text === 'EXPERT IN') {
                    return; // Skip this one
                } else if (text.includes('.')) {
                    target = parseFloat(text);
                } else {
                    target = parseInt(text);
                }
                
                if (!isNaN(target)) {
                    num.textContent = '0';
                    animateCounter(num, target);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effect to project cards
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// Timeline animation
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    if (item.classList.contains('left')) {
        item.style.transform = 'translateX(-50px)';
    } else {
        item.style.transform = 'translateX(50px)';
    }
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// Add active state to navigation based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// Add particle effect to hero section (optional)
const createParticle = () => {
    const hero = document.querySelector('.hero');
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(168, 85, 247, 0.5);
        border-radius: 50%;
        pointer-events: none;
        animation: float 3s ease-in-out infinite;
    `;
    
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 3 + 's';
    
    hero.appendChild(particle);
    
    setTimeout(() => particle.remove(), 3000);
};

// Create particles periodically
setInterval(createParticle, 300);

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0;
        }
        50% {
            transform: translateY(-20px) scale(1.5);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);