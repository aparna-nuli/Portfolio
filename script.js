class PortfolioApp {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupSkillAnimations();
        this.setupIntersectionObserver();
        this.setupResponsive();
        this.preloadContent();
    }

    // Navigation setup
    setupNavigation() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
            this.navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close mobile menu
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
                
                // Smooth scroll to section
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Active link highlighting based on scroll position
        window.addEventListener('scroll', () => {
            this.updateActiveNavLink();
            this.updateNavbarBackground();
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all links
                this.navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    updateNavbarBackground() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    }

    // Scroll effects and animations
    setupScrollEffects() {
        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroVisual = document.querySelector('.hero-visual');
            
            if (heroVisual) {
                const rate = scrolled * -0.3;
                heroVisual.style.transform = `translateY(${rate}px)`;
            }
        });

        // Smooth reveal animations
        this.setupScrollReveal();
    }

    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add fade-in class to elements that should animate
        const animateElements = document.querySelectorAll(`
            .about-content,
            .skill-item,
            .project-card,
            .timeline-item,
            .cert-item,
            .participation-item,
            .contact-method
        `);

        animateElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Skill bar animations
    setupSkillAnimations() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target;
                    const width = progressBar.getAttribute('data-width');
                    
                    // Animate skill bar
                    setTimeout(() => {
                        progressBar.style.width = width + '%';
                    }, 200);
                    
                    skillObserver.unobserve(progressBar);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillObserver.observe(bar);
        });
    }

    // Intersection Observer for various animations
    setupIntersectionObserver() {
        // Orbit animation
        const orbitObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-orbit');
                }
            });
        }, { threshold: 0.3 });

        const techOrbit = document.querySelector('.tech-orbit');
        if (techOrbit) {
            orbitObserver.observe(techOrbit);
        }

        // Counter animations
        this.setupCounterAnimations();
    }

    setupCounterAnimations() {
        const counters = document.querySelectorAll('.stat h3');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.textContent);
                    let current = 0;
                    const increment = target / 30;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = current.toFixed(target % 1 === 0 ? 0 : 2);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toFixed(target % 1 === 0 ? 0 : 2);
                        }
                    };
                    
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // Responsive functionality
    setupResponsive() {
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));

        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!this.navToggle.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            }
        });
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 968) {
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
        }
    }

    // Preload content and setup
    preloadContent() {
        // Add loading animation to page elements
        const loadElements = document.querySelectorAll(`
            .hero-title,
            .hero-subtitle,
            .hero-buttons,
            .code-animation
        `);

        loadElements.forEach((el, index) => {
            el.classList.add('loading');
            el.style.animationDelay = `${index * 0.2}s`;
        });

        // Setup keyboard navigation
        this.setupKeyboardNavigation();
        
        // Setup hover effects
        this.setupHoverEffects();
        
        // Setup contact form if exists
        this.setupContactInteractions();
    }

    // Keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // ESC key closes mobile menu
            if (e.key === 'Escape') {
                this.navMenu.classList.remove('active');
                this.navToggle.classList.remove('active');
            }
            
            // Arrow keys for section navigation
            if (e.key === 'ArrowDown' && e.ctrlKey) {
                e.preventDefault();
                this.navigateToNextSection();
            } else if (e.key === 'ArrowUp' && e.ctrlKey) {
                e.preventDefault();
                this.navigateToPrevSection();
            }
        });
    }

    navigateToNextSection() {
        const sections = Array.from(document.querySelectorAll('section'));
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (currentIndex < sections.length - 1) {
            const nextSection = sections[currentIndex + 1];
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    navigateToPrevSection() {
        const sections = Array.from(document.querySelectorAll('section'));
        const currentSection = this.getCurrentSection();
        const currentIndex = sections.indexOf(currentSection);
        
        if (currentIndex > 0) {
            const prevSection = sections[currentIndex - 1];
            prevSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    getCurrentSection() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        for (let section of sections) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                return section;
            }
        }
        return sections[0];
    }

    // Enhanced hover effects
    setupHoverEffects() {
        // Skill items tilt effect
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });

        // Project card hover effect
        const projectCard = document.querySelector('.project-card');
        if (projectCard) {
            projectCard.addEventListener('mousemove', (e) => {
                const rect = projectCard.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                projectCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });
            
            projectCard.addEventListener('mouseleave', () => {
                projectCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        }
    }

    // Contact interactions
    setupContactInteractions() {
        const contactMethods = document.querySelectorAll('.contact-method');
        
        contactMethods.forEach(method => {
            method.addEventListener('click', (e) => {
                // Add click effect
                method.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    method.style.transform = '';
                }, 150);
            });
        });

        // Resume download tracking
        const resumeButtons = document.querySelectorAll('a[href="resume.pdf"]');
        resumeButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Add analytics or tracking here if needed
                console.log('Resume download initiated');
                
                // Visual feedback
                const originalText = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                button.style.background = 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)';
                
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                }, 2000);
            });
        });
    }

    // Utility functions
    debounce(func, wait) {
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

    // Performance monitoring
    initPerformanceMonitoring() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Page Load Time:', pageLoadTime + 'ms');
        });

        // Monitor scroll performance
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                requestAnimationFrame(() => {
                    // Scroll-based operations here
                    isScrolling = false;
                });
                isScrolling = true;
            }
        });
    }
}

// Theme switching functionality (bonus feature)
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        // Theme toggle could be added in future updates
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
}

// Error handling and fallbacks
class ErrorHandler {
    constructor() {
        this.setupErrorHandling();
    }

    setupErrorHandling() {
        window.addEventListener('error', (e) => {
            console.error('Global error:', e.error);
            this.handleError(e.error);
        });

        window.addEventListener('unhandledrejection', (e) => {
            console.error('Unhandled promise rejection:', e.reason);
            this.handleError(e.reason);
        });
    }

    handleError(error) {
        // Graceful degradation - ensure basic functionality works
        const essentialElements = document.querySelectorAll('.nav-link, .btn');
        essentialElements.forEach(el => {
            if (!el.onclick && el.href) {
                // Ensure basic navigation works even if JS fails
                el.addEventListener('click', (e) => {
                    if (el.href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(el.href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                });
            }
        });
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize main application
        const app = new PortfolioApp();
        
        // Initialize theme manager
        const themeManager = new ThemeManager();
        
        // Initialize error handler
        const errorHandler = new ErrorHandler();
        
        // Setup performance monitoring
        app.initPerformanceMonitoring();
        
        console.log('Portfolio application initialized successfully');
    } catch (error) {
        console.error('Failed to initialize portfolio application:', error);
        
        // Fallback: Ensure basic navigation still works
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                if (link.href.includes('#')) {
                    e.preventDefault();
                    const targetId = link.href.split('#')[1];
                    const target = document.getElementById(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
});

// Service Worker registration for offline functionality (Progressive Web App)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker could be implemented for offline functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}

// Additional utility functions for enhanced interactivity
const PortfolioUtils = {
    // Smooth scroll to element
    scrollToElement(elementId, offset = 70) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    },

    // Copy text to clipboard
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showNotification('Copied to clipboard!');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Copied to clipboard!');
        }
    },

    // Show notification
    showNotification(message, duration = 3000) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--gradient-primary);
            color: white;
            padding: 12px 24px;
            border-radius: 50px;
            z-index: 10000;
            opacity: 0;
            transform: translateY(-20px);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        });
        
        // Remove after duration
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    },

    // Detect device type
    getDeviceType() {
        const width = window.innerWidth;
        if (width <= 480) return 'mobile';
        if (width <= 768) return 'tablet';
        return 'desktop';
    },

    // Preload images
    preloadImages(imageUrls) {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, ThemeManager, ErrorHandler, PortfolioUtils };
}
