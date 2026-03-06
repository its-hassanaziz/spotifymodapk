/**
 * home-en.js — Consolidated scripts for the English homepage
 * Loaded with defer — DOM is fully parsed when this executes
 * Externalised to satisfy CSP script-src without 'unsafe-inline'
 */

/* === Trusted Types Default Policy === */
(function () {
    if (window.trustedTypes && trustedTypes.createPolicy) {
        trustedTypes.createPolicy('default', {
            createHTML: function (s) { return s; },
            createScriptURL: function (s) { return s; },
            createScript: function (s) { return s; }
        });
    }
})();

/* === Async CSS Activation === */
(function () {
    var el = document.getElementById('mainStylesheet');
    if (el) el.media = 'all';
})();

/* === App Info Date === */
(function () {
    var el = document.getElementById('last-updated-date');
    if (el) {
        var d = new Date();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        el.textContent = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
    }
})();

/* === Share Modal === */
(function () {
    'use strict';

    var shareBtn = document.getElementById('shareBtn');
    var shareModal = document.getElementById('shareModal');

    if (!shareBtn || !shareModal) return;

    var shareOverlay = document.getElementById('shareOverlay');
    var shareClose = document.getElementById('shareModalClose');
    var shareButtons = shareModal.querySelectorAll('.share-modal__btn');
    var copyLinkBtn = document.getElementById('copyLinkBtn');

    var pageUrl = encodeURIComponent(window.location.href);
    var pageTitle = encodeURIComponent(document.title);
    var pageText = encodeURIComponent('Download Spotify Premium Mod APK - Ad-free music, unlimited skips, offline downloads!');

    var shareUrls = {
        whatsapp: 'https://wa.me/?text=' + pageText + '%20' + pageUrl,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl,
        twitter: 'https://twitter.com/intent/tweet?text=' + pageText + '&url=' + pageUrl,
        telegram: 'https://t.me/share/url?url=' + pageUrl + '&text=' + pageText,
        linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl
    };

    var shareData = {
        title: document.title,
        text: 'Download Spotify Premium Mod APK - Ad-free music, unlimited skips, offline downloads!',
        url: window.location.href
    };

    shareBtn.addEventListener('click', function () {
        if (navigator.share && /mobile/i.test(navigator.userAgent)) {
            navigator.share(shareData).catch(function (err) {
                if (err.name !== 'AbortError') openModal();
            });
        } else {
            openModal();
        }
    });

    function openModal() {
        shareModal.classList.add('active');
        shareOverlay.classList.add('active');
        shareModal.setAttribute('aria-hidden', 'false');
        shareOverlay.setAttribute('aria-hidden', 'false');
        shareClose.focus();
    }

    function closeModal() {
        shareModal.classList.remove('active');
        shareOverlay.classList.remove('active');
        shareModal.setAttribute('aria-hidden', 'true');
        shareOverlay.setAttribute('aria-hidden', 'true');
        shareBtn.focus();
    }

    shareClose.addEventListener('click', closeModal);
    shareOverlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && shareModal.classList.contains('active')) {
            closeModal();
        }
    });

    shareButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var platform = this.dataset.share;
            if (platform === 'copy') {
                copyToClipboard();
            } else if (shareUrls[platform]) {
                var w = 600, h = 400;
                var left = (screen.width - w) / 2;
                var top = (screen.height - h) / 2;
                window.open(shareUrls[platform], 'share', 'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top + ',toolbar=no,menubar=no');
                closeModal();
            }
        });
    });

    function copyToClipboard() {
        var textSpan = copyLinkBtn.querySelector('span');
        var originalText = textSpan.textContent;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href).then(function () {
                showCopied(textSpan, originalText);
            }).catch(function () {
                fallbackCopy(textSpan, originalText);
            });
        } else {
            fallbackCopy(textSpan, originalText);
        }
    }

    function fallbackCopy(textSpan, originalText) {
        var ta = document.createElement('textarea');
        ta.value = window.location.href;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showCopied(textSpan, originalText);
        } catch (e) {
            /* copy failed */
        }
        document.body.removeChild(ta);
    }

    function showCopied(textSpan, originalText) {
        copyLinkBtn.classList.add('share-modal__btn--copied');
        textSpan.textContent = 'Copied!';
        setTimeout(function () {
            copyLinkBtn.classList.remove('share-modal__btn--copied');
            textSpan.textContent = originalText;
        }, 2000);
    }
})();

/* === Share Card === */
(function () {
    'use strict';

    var shareCardButtons = document.getElementById('shareCardButtons');
    if (!shareCardButtons) return;

    var pageUrl = encodeURIComponent(window.location.href);
    var pageText = encodeURIComponent('Download Spotify Premium Mod APK - Ad-free music, unlimited skips, offline downloads!');

    var shareUrls = {
        whatsapp: 'https://wa.me/?text=' + pageText + '%20' + pageUrl,
        facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + pageUrl,
        twitter: 'https://twitter.com/intent/tweet?text=' + pageText + '&url=' + pageUrl,
        telegram: 'https://t.me/share/url?url=' + pageUrl + '&text=' + pageText,
        linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + pageUrl
    };

    var buttons = shareCardButtons.querySelectorAll('.share-card__btn');

    buttons.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            var platform = this.dataset.share;
            if (platform === 'copy') {
                copyLink(this);
            } else if (shareUrls[platform]) {
                var w = 600, h = 400;
                var left = (screen.width - w) / 2;
                var top = (screen.height - h) / 2;
                window.open(shareUrls[platform], 'share', 'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top + ',toolbar=no,menubar=no');
            }
        });
    });

    function copyLink(btn) {
        var originalHTML = btn.innerHTML;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(window.location.href).then(function () {
                showCopied(btn, originalHTML);
            }).catch(function () {
                fallbackCopy(btn, originalHTML);
            });
        } else {
            fallbackCopy(btn, originalHTML);
        }
    }

    function fallbackCopy(btn, originalHTML) {
        var ta = document.createElement('textarea');
        ta.value = window.location.href;
        ta.style.cssText = 'position:fixed;opacity:0;';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            showCopied(btn, originalHTML);
        } catch (e) {
            /* copy failed */
        }
        document.body.removeChild(ta);
    }

    function showCopied(btn, originalHTML) {
        btn.innerHTML = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Copied!';
        setTimeout(function () {
            btn.innerHTML = originalHTML;
        }, 2000);
    }
})();

/* === Reviews Auto-Slider === */
(function () {
    'use strict';

    var reviewsGrid = document.querySelector('.reviews-grid');
    var originalCards = document.querySelectorAll('.review-card');
    var sliderDots = document.querySelectorAll('.reviews-slider-dot');
    var currentIndex = 0;
    var autoSlideInterval = null;
    var isMobile = window.matchMedia('(max-width: 768px)');
    var totalOriginalCards = originalCards.length;
    var isTransitioning = false;

    function setupInfiniteLoop() {
        for (var i = totalOriginalCards - 1; i >= 0; i--) {
            var clone = originalCards[i].cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.classList.add('review-card--clone', 'review-card--clone-start');
            reviewsGrid.insertBefore(clone, reviewsGrid.firstChild);
        }
        originalCards.forEach(function (card) {
            var clone = card.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.classList.add('review-card--clone', 'review-card--clone-end');
            reviewsGrid.appendChild(clone);
        });
        currentIndex = totalOriginalCards;
        var cardWidth = getCardWidth();
        reviewsGrid.style.scrollBehavior = 'auto';
        reviewsGrid.scrollLeft = currentIndex * cardWidth;
        reviewsGrid.style.scrollBehavior = 'smooth';
    }

    function getCardWidth() {
        var card = reviewsGrid.querySelector('.review-card');
        var gap = isMobile.matches ? 16 : 24;
        return card.offsetWidth + gap;
    }

    function updateSlider(index, instant) {
        if (!reviewsGrid || totalOriginalCards === 0) return;
        currentIndex = index;
        var cardWidth = getCardWidth();
        var scrollPosition = index * cardWidth;
        if (instant) {
            reviewsGrid.style.scrollBehavior = 'auto';
            reviewsGrid.scrollLeft = scrollPosition;
            reviewsGrid.style.scrollBehavior = 'smooth';
        } else {
            reviewsGrid.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
        var dotIndex = (index - totalOriginalCards + totalOriginalCards * 10) % totalOriginalCards;
        sliderDots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === dotIndex);
        });
    }

    function nextSlide() {
        if (isTransitioning) return;
        var nextIndex = currentIndex + 1;
        if (nextIndex >= totalOriginalCards * 2) {
            isTransitioning = true;
            updateSlider(nextIndex, false);
            setTimeout(function () {
                updateSlider(totalOriginalCards, true);
                isTransitioning = false;
            }, 500);
        } else {
            updateSlider(nextIndex, false);
        }
    }

    function prevSlide() {
        if (isTransitioning) return;
        var prevIndex = currentIndex - 1;
        if (prevIndex < totalOriginalCards) {
            isTransitioning = true;
            updateSlider(prevIndex, false);
            setTimeout(function () {
                updateSlider(totalOriginalCards * 2 - 1, true);
                isTransitioning = false;
            }, 500);
        } else {
            updateSlider(prevIndex, false);
        }
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 2000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    }

    function handleScrollEnd() {
        if (!reviewsGrid || totalOriginalCards === 0 || isTransitioning) return;
        var scrollLeft = reviewsGrid.scrollLeft;
        var cardWidth = getCardWidth();
        var newIndex = Math.round(scrollLeft / cardWidth);

        if (newIndex < totalOriginalCards) {
            updateSlider(totalOriginalCards * 2 - (totalOriginalCards - newIndex), true);
            return;
        }
        if (newIndex >= totalOriginalCards * 2) {
            var offsetFromEnd = newIndex - totalOriginalCards * 2;
            updateSlider(totalOriginalCards + offsetFromEnd, true);
            return;
        }
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            var dotIndex = (currentIndex - totalOriginalCards + totalOriginalCards * 10) % totalOriginalCards;
            sliderDots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === dotIndex);
            });
        }
    }

    function initSlider() {
        setupInfiniteLoop();
        startAutoSlide();

        reviewsGrid.addEventListener('mouseenter', stopAutoSlide);
        reviewsGrid.addEventListener('mouseleave', function () {
            setTimeout(startAutoSlide, 1000);
        });
        reviewsGrid.addEventListener('touchstart', stopAutoSlide);
        reviewsGrid.addEventListener('touchend', function () {
            setTimeout(function () {
                handleScrollEnd();
                setTimeout(startAutoSlide, 2000);
            }, 100);
        });

        var scrollTimeout;
        reviewsGrid.addEventListener('scroll', function () {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(handleScrollEnd, 150);
        });

        sliderDots.forEach(function (dot) {
            dot.addEventListener('click', function () {
                var index = parseInt(this.dataset.index);
                stopAutoSlide();
                updateSlider(totalOriginalCards + index, false);
                setTimeout(startAutoSlide, 3000);
            });
        });
    }

    if (reviewsGrid && totalOriginalCards > 0) {
        initSlider();
    }
})();

/* === Scroll to Top & Sticky Download Bar === */
(function () {
    'use strict';

    var scrollToTopBtn = document.getElementById('scrollToTop');
    var scrollThreshold = 400;

    function toggleScrollButton() {
        if (window.pageYOffset > scrollThreshold) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'auto' });
    }

    window.addEventListener('scroll', toggleScrollButton, { passive: true });
    scrollToTopBtn.addEventListener('click', scrollToTop);
    toggleScrollButton();

    var stickyBar = document.getElementById('stickyDownloadBar');
    var stickyThreshold = 600;

    function toggleStickyBar() {
        if (window.innerWidth <= 768) {
            if (window.pageYOffset > stickyThreshold) {
                stickyBar.classList.add('visible');
            } else {
                stickyBar.classList.remove('visible');
            }
        } else {
            stickyBar.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleStickyBar, { passive: true });
    window.addEventListener('resize', toggleStickyBar, { passive: true });
    toggleStickyBar();
})();

/* === Language Switcher === */
(function () {
    'use strict';
    var switcher = document.getElementById('langSwitcher');
    if (!switcher) return;
    var toggle = switcher.querySelector('.lang-switcher__toggle');

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = switcher.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', isOpen);
    });

    document.addEventListener('click', function (e) {
        if (!switcher.contains(e.target)) {
            switcher.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && switcher.classList.contains('is-open')) {
            switcher.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
        }
    });
})();
