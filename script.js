// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .review-card, .step').forEach(el => {
    observer.observe(el);
});

// Phone mockup interactivity
function initPhoneMockup() {
    const swipeCard = document.querySelector('.swipe-card');
    const photoPreview = document.querySelector('.photo-preview');
    const cleanupCounts = document.querySelectorAll('.cleanup-count');

    if (swipeCard && photoPreview) {
        // Simulate photo changes
        const photoColors = [
            'linear-gradient(45deg, #333, #555, #333)',
            'linear-gradient(45deg, #7209B7, #F72585, #4CC9F0)',
            'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)',
            'linear-gradient(45deg, #96CEB4, #FFEAA7, #DDA0DD)'
        ];

        let currentPhotoIndex = 0;

        setInterval(() => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photoColors.length;
            photoPreview.style.background = photoColors[currentPhotoIndex];
        }, 3000);

        // Animate cleanup counts
        animateCounters();
    }
}

// Animate counter numbers
function animateCounters() {
    const counters = document.querySelectorAll('.cleanup-count');
    const stats = [
        { element: counters[0], target: 127, current: 0 },
        { element: counters[1], target: 89, current: 0 }
    ];

    stats.forEach(stat => {
        const increment = stat.target / 50;
        const timer = setInterval(() => {
            stat.current += increment;
            if (stat.current >= stat.target) {
                stat.current = stat.target;
                clearInterval(timer);
            }
            stat.element.textContent = Math.floor(stat.current);
        }, 100);
    });
}

// Header scroll effect
function initHeaderEffect() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
    });
}

// Parallax effect for hero section
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    const phoneMode = document.querySelector('.phone-mockup');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        if (phoneMode) {
            phoneMode.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Dynamic stats counter in hero section
function initHeroStats() {
    const statValues = document.querySelectorAll('.stat-value');
    let animated = false;

    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                animateHeroStats();
            }
        });
    });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

function animateHeroStats() {
    // Animate rating counter
    const ratingValue = document.querySelector('.stat-value');
    if (ratingValue && ratingValue.textContent.includes('5.0')) {
        let rating = 0;
        const targetRating = 5.0;
        const interval = setInterval(() => {
            rating += 0.1;
            ratingValue.textContent = `⭐ ${rating.toFixed(1)}`;
            if (rating >= targetRating) {
                clearInterval(interval);
                ratingValue.textContent = '⭐ 5.0';
            }
        }, 100);
    }
}

// Add loading animation
function initLoadingAnimation() {
    document.body.classList.add('loading');

    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.classList.remove('loading');
            document.body.classList.add('loaded');
        }, 500);
    });
}

// Feature card hover effects
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');

    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-12px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Simulate app interface interactions
function initAppInterface() {
    const scanStatus = document.querySelector('.scan-status');
    const swipeActions = document.querySelectorAll('.swipe-delete, .swipe-keep');

    // Cycle through different scan statuses
    const statuses = ['Scanning...', 'Analyzing...', 'Processing...', 'Complete!'];
    let statusIndex = 0;

    if (scanStatus) {
        setInterval(() => {
            statusIndex = (statusIndex + 1) % statuses.length;
            scanStatus.textContent = statuses[statusIndex];

            if (statusIndex === statuses.length - 1) {
                scanStatus.style.color = '#4CC9F0';
                setTimeout(() => {
                    scanStatus.style.color = '#F72585';
                    statusIndex = -1; // Reset to start over
                }, 2000);
            }
        }, 2000);
    }

    // Add click interactions to swipe actions
    swipeActions.forEach(action => {
        action.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    initPhoneMockup();
    initHeaderEffect();
    initParallaxEffect();
    initHeroStats();
    initLoadingAnimation();
    initFeatureCards();
    initAppInterface();
});

// Add viewport height fix for mobile
function fixViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', fixViewportHeight);
fixViewportHeight();

// Preload images and optimize performance
function preloadImages() {
    const images = [
        'https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1560297600'
    ];

    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Add click tracking for analytics (placeholder)
function trackClick(elementName) {
    // Placeholder for analytics tracking
    console.log(`Clicked: ${elementName}`);
}

// Add event listeners for tracking
document.querySelectorAll('.app-store-button, .app-store-button-large').forEach(button => {
    button.addEventListener('click', () => trackClick('App Store Button'));
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => trackClick('Navigation Link'));
});

// Performance optimization: Debounce scroll events
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

// Replace scroll event listeners with debounced versions for better performance
const debouncedScrollHandler = debounce(() => {
    // Scroll handling code here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler, { passive: true }); 