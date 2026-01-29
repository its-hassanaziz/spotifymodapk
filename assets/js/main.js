/**
 * SPOTIFY MOD APK - Main JavaScript
 * Vanilla JS | Deferred Loading | SEO Optimized
 */

(function() {
    'use strict';

    // ================================================================
    // MOBILE NAVIGATION TOGGLE
    // ================================================================
    const initMobileNav = () => {
        const navToggle = document.querySelector('.nav-toggle');
        const nav = document.querySelector('.nav');
        const navOverlay = document.querySelector('.nav-overlay');
        let scrollPosition = 0;
        
        if (!navToggle || !nav) return;
        
        // Open nav function
        const openNav = () => {
            // Save scroll position before locking
            scrollPosition = window.pageYOffset;
            document.body.style.top = `-${scrollPosition}px`;
            
            navToggle.setAttribute('aria-expanded', 'true');
            nav.classList.add('is-open');
            if (navOverlay) navOverlay.classList.add('is-visible');
            document.body.classList.add('nav-open');
        };
        
        // Close nav function
        const closeNav = () => {
            navToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('is-open');
            if (navOverlay) navOverlay.classList.remove('is-visible');
            document.body.classList.remove('nav-open');
            
            // Restore scroll position after unlocking
            document.body.style.top = '';
            window.scrollTo(0, scrollPosition);
        };
        
        // Toggle button click
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                closeNav();
            } else {
                openNav();
            }
        });
        
        // Close when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', closeNav);
        }
        
        // Close nav when clicking on a link
        nav.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                closeNav();
            });
        });
        
        // Close nav on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) {
                closeNav();
                navToggle.focus();
            }
        });
        
        // Close nav when resizing to desktop
        const mediaQuery = window.matchMedia('(min-width: 1024px)');
        mediaQuery.addEventListener('change', (e) => {
            if (e.matches) {
                closeNav();
            }
        });
    };

    // ================================================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ================================================================
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without triggering scroll
                    history.pushState(null, '', targetId);
                    
                    // Focus the target for accessibility
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus({ preventScroll: true });
                }
            });
        });
    };

    // ================================================================
    // HEADER SCROLL EFFECT
    // ================================================================
    const initHeaderScroll = () => {
        const header = document.querySelector('.header');
        if (!header) return;
        
        let lastScroll = 0;
        let ticking = false;
        
        const updateHeader = () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        };
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }, { passive: true });
    };

    // ================================================================
    // FAQ ACCORDION ACCESSIBILITY
    // ================================================================
    const initFaqAccordion = () => {
        const faqItems = document.querySelectorAll('.faq__item');
        
        faqItems.forEach(item => {
            const summary = item.querySelector('.faq__question');
            
            if (summary) {
                summary.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        item.open = !item.open;
                    }
                });
            }
        });
    };

    // ================================================================
    // LAZY LOAD IMAGES (Native + Fallback)
    // ================================================================
    const initLazyLoad = () => {
        // Check for native lazy loading support
        if ('loading' in HTMLImageElement.prototype) {
            // Native lazy loading is supported
            const images = document.querySelectorAll('img[loading="lazy"]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
            });
        } else {
            // Fallback for older browsers using Intersection Observer
            const lazyImages = document.querySelectorAll('img[loading="lazy"]');
            
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                            }
                            img.removeAttribute('loading');
                            observer.unobserve(img);
                        }
                    });
                }, {
                    rootMargin: '50px 0px',
                    threshold: 0.01
                });
                
                lazyImages.forEach(img => imageObserver.observe(img));
            }
        }
    };

    // ================================================================
    // COPY TO CLIPBOARD (For download links)
    // ================================================================
    const initCopyToClipboard = () => {
        document.querySelectorAll('[data-copy]').forEach(button => {
            button.addEventListener('click', async () => {
                const textToCopy = button.dataset.copy;
                
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    
                    const originalText = button.textContent;
                    button.textContent = 'Copied!';
                    button.classList.add('is-copied');
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.classList.remove('is-copied');
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    };

    // ================================================================
    // DYNAMIC CANONICAL URL
    // ================================================================
    const setCanonicalUrl = () => {
        const canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            // If canonical is a placeholder, set it to current URL
            if (canonical.href.includes('spotifymod.com')) {
                // Keep the predefined canonical
                return;
            }
        }
    };

    // ================================================================
    // PERFORMANCE: DEFER NON-CRITICAL OPERATIONS
    // ================================================================
    const deferNonCritical = (callback) => {
        if ('requestIdleCallback' in window) {
            requestIdleCallback(callback);
        } else {
            setTimeout(callback, 1);
        }
    };

    // ================================================================
    // ANALYTICS PLACEHOLDER (Async third-party)
    // ================================================================
    const initAnalytics = () => {
        // Placeholder for analytics initialization
        // Third-party scripts should be loaded with async attribute
        // Example: Google Analytics, Plausible, etc.
    };

    // ================================================================
    // CURRENT YEAR FOR FOOTER
    // ================================================================
    const updateCopyrightYear = () => {
        const yearElements = document.querySelectorAll('[data-year]');
        const currentYear = new Date().getFullYear();
        
        yearElements.forEach(el => {
            el.textContent = currentYear;
        });
    };

    // ================================================================
    // EXTERNAL LINKS - Add rel attributes for security
    // ================================================================
    const secureExternalLinks = () => {
        document.querySelectorAll('a[href^="http"]').forEach(link => {
            if (!link.href.includes(window.location.hostname)) {
                link.setAttribute('rel', 'noopener noreferrer');
                link.setAttribute('target', '_blank');
            }
        });
    };

    // ================================================================
    // PHONE MOCKUP IMAGE SLIDER
    // ================================================================
    const initPhoneSlider = () => {
        const slider = document.querySelector('.phone-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.phone-slider__slide');
        const dots = slider.querySelectorAll('.phone-slider__dot');
        
        if (slides.length === 0) return;

        let currentSlide = 0;
        let autoPlayInterval;
        const autoPlayDelay = 2000; // 2 seconds between slides

        const goToSlide = (index) => {
            // Remove active class from current slide and dot
            slides[currentSlide].classList.remove('phone-slider__slide--active');
            dots[currentSlide]?.classList.remove('phone-slider__dot--active');
            dots[currentSlide]?.setAttribute('aria-selected', 'false');

            // Update current slide index
            currentSlide = index;

            // Handle wrap around
            if (currentSlide >= slides.length) currentSlide = 0;
            if (currentSlide < 0) currentSlide = slides.length - 1;

            // Add active class to new slide and dot
            slides[currentSlide].classList.add('phone-slider__slide--active');
            dots[currentSlide]?.classList.add('phone-slider__dot--active');
            dots[currentSlide]?.setAttribute('aria-selected', 'true');
        };

        const nextSlide = () => {
            goToSlide(currentSlide + 1);
        };

        const startAutoPlay = () => {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        };

        const stopAutoPlay = () => {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        };

        // Dot navigation click handlers
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
                // Reset autoplay timer on manual navigation
                startAutoPlay();
            });
        });

        // Always keep sliding (Intersection Observer for performance)
        // Start sliding when 5% of phone mockup is visible on mobile
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.05 });

        observer.observe(slider);

        // Keyboard navigation for accessibility
        slider.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                goToSlide(currentSlide - 1);
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                goToSlide(currentSlide + 1);
                startAutoPlay();
            }
        });

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        const minSwipeDistance = 50;

        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const swipeDistance = touchEndX - touchStartX;

            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    // Swiped right - go to previous
                    goToSlide(currentSlide - 1);
                } else {
                    // Swiped left - go to next
                    goToSlide(currentSlide + 1);
                }
            }
            startAutoPlay();
        }, { passive: true });

        // Start autoplay immediately
        startAutoPlay();
    };

    // ================================================================
    // INITIALIZE ALL MODULES
    // ================================================================
    const init = () => {
        // Critical functionality
        initMobileNav();
        initSmoothScroll();
        initHeaderScroll();
        initFaqAccordion();
        initPhoneSlider();
        
        // Deferred functionality
        deferNonCritical(() => {
            initLazyLoad();
            initCopyToClipboard();
            setCanonicalUrl();
            updateCopyrightYear();
            secureExternalLinks();
            initAnalytics();
        });
    };

    // Run initialization when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
