// Lenis Smooth Scroll Initialization
let lenis;

function initLenis() {
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Lenis events
    lenis.on('scroll', (e) => {
        console.log(e);
    });
}

// Initialize Lenis when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    initLenis();
    initScrollAnimations();
    initCookieBanner();
    initMobileMenu();
    initParallaxEffects();
    initBrandTitle();
    initModals();
    initCart();
    initWishlist();
    initMobileNavigation();
    
    // Test modal functionality
    setTimeout(() => {
        console.log('Testing modal elements...');
        const loginBtn = document.getElementById('loginBtn');
        const cartBtn = document.getElementById('cartBtn');
        const loginModal = document.getElementById('loginModal');
        const cartModal = document.getElementById('cartModal');
        
        console.log('Elements found:', {
            loginBtn: !!loginBtn,
            cartBtn: !!cartBtn,
            loginModal: !!loginModal,
            cartModal: !!cartModal
        });
        
        // Add simple click handlers as backup
        if (loginBtn && loginModal) {
            loginBtn.onclick = function() {
                console.log('Backup login handler triggered');
                showModal(loginModal);
            };
        }
        
        if (cartBtn && cartModal) {
            cartBtn.onclick = function() {
                console.log('Backup cart handler triggered');
                showModal(cartModal);
            };
        }
    }, 500);
    
    console.log('All initialization completed');
});

// Scroll Animations
function initScrollAnimations() {
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

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.product-item, .product-card, .coupon-section, .shipping-section');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Cookie Banner
function initCookieBanner() {
    const cookieBanner = document.getElementById('cookieBanner');
    
    // Show cookie banner after 2 seconds
    setTimeout(() => {
        cookieBanner.classList.add('show');
    }, 2000);
}

function acceptCookies() {
    const cookieBanner = document.getElementById('cookieBanner');
    cookieBanner.classList.remove('show');
    
    // Store cookie acceptance
    localStorage.setItem('cookiesAccepted', 'true');
}

// Check if cookies were already accepted
if (localStorage.getItem('cookiesAccepted') === 'true') {
    document.getElementById('cookieBanner').style.display = 'none';
}

// Mobile Menu Toggle
function initMobileMenu() {
    // Avoid duplicate button creation
    if (document.querySelector('.mobile-menu-btn')) {
        return;
    }

    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.display = 'none';
    mobileMenuBtn.setAttribute('aria-label', 'Menü öffnen');

    // Prefer right action area, then top row, then header container
    const headerActionsRight = document.querySelector('.header-actions-right');
    const headerTopRow = document.querySelector('.header-top-row');
    const headerContainer = headerActionsRight || headerTopRow || document.querySelector('header .container');

    if (!headerContainer) {
        console.error('Header container for mobile menu not found');
        return;
    }

    headerContainer.appendChild(mobileMenuBtn);
    
    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', () => {
        const nav = document.querySelector('.main-nav');
        const isOpen = nav.classList.contains('mobile-open');
        
        nav.classList.toggle('mobile-open');
        mobileMenuBtn.classList.toggle('active');
        
        // Update aria-label
        mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Menü öffnen' : 'Menü schließen');
        
        // Update icon
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = isOpen ? 'fas fa-bars' : 'fas fa-times';
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const nav = document.querySelector('.main-nav');
        const btn = document.querySelector('.mobile-menu-btn');
        if (!nav || !btn) return;
        if (!nav.contains(e.target) && !btn.contains(e.target)) {
            nav.classList.remove('mobile-open');
            btn.classList.remove('active');
            btn.setAttribute('aria-label', 'Menü öffnen');
            const icon = btn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    });
    
    // Show/hide mobile menu button based on screen size
    function checkMobileMenu() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
        } else {
            mobileMenuBtn.style.display = 'none';
            const nav = document.querySelector('.main-nav');
            if (nav) nav.classList.remove('mobile-open');
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-label', 'Menü öffnen');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        }
    }
    
    window.addEventListener('resize', checkMobileMenu);
    checkMobileMenu();
}

// Parallax Effects - Chrome optimized
function initParallaxEffects() {
    // Detect Chrome for optimized handling
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            if (isChrome) {
                // Chrome-optimized: Transform the ::before pseudo-element via CSS custom properties
                const speed = 0.3;
                const yPos = scrolled * speed;
                heroSection.style.setProperty('--parallax-y', `${yPos}px`);
            } else {
                // Other browsers: Use background-position (works well in Edge/Firefox)
                const speed = 0.5;
                const yPos = scrolled * speed;
                heroSection.style.backgroundPosition = `center ${yPos}px`;
            }
        }
        
        // Parallax for other sections (all browsers)
        const parallaxSections = document.querySelectorAll('.products-section, .coupon-section');
        parallaxSections.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Mobile Navigation
function initMobileNavigation() {
    console.log('Starting mobile navigation initialization...');
    
    // Wait a bit to ensure DOM is fully loaded
    setTimeout(() => {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileNavOverlay = document.getElementById('mobileNavOverlay');
        const closeMobileNav = document.getElementById('closeMobileNav');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        console.log('Mobile navigation elements:', {
            mobileMenuBtn: mobileMenuBtn,
            mobileNavOverlay: mobileNavOverlay,
            closeMobileNav: closeMobileNav,
            mobileNavLinksCount: mobileNavLinks.length,
            buttonPosition: mobileMenuBtn ? mobileMenuBtn.parentElement.className : 'not found'
        });
        
        // Ensure button is properly initialized
        if (mobileMenuBtn) {
            console.log('Mobile menu button found and initialized');
        }
    
    if (!mobileMenuBtn || !mobileNavOverlay || !closeMobileNav) {
        console.error('Mobile navigation elements not found');
        return;
    }
    
    // Open mobile menu
    function openMobileMenu() {
        console.log('Opening mobile menu');
        mobileNavOverlay.classList.add('show');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scroll
        
        // Animate menu items
        mobileNavLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-30px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100 + 200);
        });
    }
    
    // Close mobile menu
    function closeMobileMenu() {
        console.log('Closing mobile menu');
        mobileNavOverlay.classList.remove('show');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
        
        // Reset menu items
        mobileNavLinks.forEach(link => {
            link.style.opacity = '';
            link.style.transform = '';
            link.style.transition = '';
        });
        
        // Close all mobile dropdowns
        document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
    
    // Event listeners
    mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('Mobile menu button clicked');
        
        if (mobileNavOverlay.classList.contains('show')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });
    
    closeMobileNav.addEventListener('click', (e) => {
        e.stopPropagation();
        closeMobileMenu();
    });
    
    // Close on overlay click
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            closeMobileMenu();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavOverlay.classList.contains('show')) {
            closeMobileMenu();
        }
    });
    
    // Close menu when clicking on navigation links (but not dropdown toggles)
    mobileNavLinks.forEach(link => {
        if (!link.classList.contains('mobile-dropdown-toggle')) {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        }
    });
    
    // Initialize mobile dropdown functionality
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    console.log('Found mobile dropdown toggles:', mobileDropdownToggles.length);
    
    mobileDropdownToggles.forEach((toggle, index) => {
        const dropdown = toggle.parentElement;
        const dropdownMenu = dropdown.querySelector('.mobile-dropdown-menu');
        const dropdownItems = dropdownMenu ? dropdownMenu.querySelectorAll('li') : [];
        
        console.log(`Dropdown ${index + 1} (${toggle.textContent.trim()}):`, dropdownItems.length, 'items');
        
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isOpen = dropdown.classList.contains('open');
            
            // Close all other dropdowns
            mobileDropdownToggles.forEach(otherToggle => {
                otherToggle.parentElement.classList.remove('open');
            });
            
            // Toggle current dropdown
            if (!isOpen) {
                dropdown.classList.add('open');
                console.log('Opened dropdown:', toggle.textContent.trim(), 'with', dropdownItems.length, 'items');
            }
        });
    });
    
    // Close dropdown when clicking on dropdown links
    const mobileDropdownLinks = document.querySelectorAll('.mobile-dropdown-link');
    mobileDropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    // Update cart count in mobile menu
    function updateMobileCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const mobileCartCount = document.querySelector('.mobile-cart-count');
        
        if (cartCount && mobileCartCount) {
            mobileCartCount.textContent = cartCount.textContent;
        }
    }
    
    // Watch for cart count changes
    const cartCountObserver = new MutationObserver(updateMobileCartCount);
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCountObserver.observe(cartCount, { childList: true, characterData: true, subtree: true });
    }
    
    // Initial cart count sync
    updateMobileCartCount();
    }, 100); // Close setTimeout
}

// Wishlist Management
function initWishlist() {
    let wishlistItems = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Initialize cart modal tabs
    const cartTab = document.getElementById('cartTab');
    const wishlistTab = document.getElementById('wishlistTab');
    const cartTabContent = document.getElementById('cartTabContent');
    const wishlistTabContent = document.getElementById('wishlistTabContent');
    
    // Tab switching functionality
    function switchTab(tabName) {
        // Remove active class from all tabs and content
        document.querySelectorAll('.cart-tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        if (tabName === 'cart') {
            cartTab.classList.add('active');
            cartTabContent.classList.add('active');
        } else if (tabName === 'wishlist') {
            wishlistTab.classList.add('active');
            wishlistTabContent.classList.add('active');
            updateWishlistDisplay();
        }
    }
    
    // Tab event listeners
    cartTab.addEventListener('click', () => switchTab('cart'));
    wishlistTab.addEventListener('click', () => switchTab('wishlist'));
    
    // Add to wishlist function
    window.addToWishlist = function(productId, productName, productPrice, productImage) {
        const existingItem = wishlistItems.find(item => item.id === productId);
        
        if (!existingItem) {
            wishlistItems.push({
                id: productId,
                name: productName,
                price: productPrice,
                image: productImage || 'https://via.placeholder.com/60'
            });
            
            localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
            showNotification('Artikel zur Wishlist hinzugefügt!', 'success');
            updateWishlistDisplay();
        } else {
            showNotification('Artikel ist bereits in der Wishlist!', 'info');
        }
    };
    
    // Remove from wishlist function
    window.removeFromWishlist = function(productId) {
        wishlistItems = wishlistItems.filter(item => item.id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
        showNotification('Artikel aus Wishlist entfernt!', 'success');
        updateWishlistDisplay();
    };
    
    // Add wishlist item to cart
    window.addWishlistToCart = function(productId) {
        const wishlistItem = wishlistItems.find(item => item.id === productId);
        if (wishlistItem) {
            // Use existing addToCart function
            addToCart(wishlistItem.id, wishlistItem.name, wishlistItem.price, wishlistItem.image);
            // Optionally remove from wishlist
            removeFromWishlist(productId);
            // Switch to cart tab
            switchTab('cart');
        }
    };
    
    // Update wishlist display
    function updateWishlistDisplay() {
        const wishlistEmpty = document.getElementById('wishlistEmpty');
        const wishlistItemsContainer = document.getElementById('wishlistItems');
        
        if (wishlistItems.length === 0) {
            wishlistEmpty.style.display = 'block';
            wishlistItemsContainer.style.display = 'none';
        } else {
            wishlistEmpty.style.display = 'none';
            wishlistItemsContainer.style.display = 'block';
            
            wishlistItemsContainer.innerHTML = wishlistItems.map(item => `
                <div class="wishlist-item">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <div class="item-details">
                        <h4>${item.name}</h4>
                        <p class="item-price">${item.price}</p>
                    </div>
                    <div class="wishlist-actions">
                        <button class="add-to-cart-btn" onclick="addWishlistToCart('${item.id}')">
                            In Warenkorb
                        </button>
                        <button class="remove-from-wishlist" onclick="removeFromWishlist('${item.id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Continue shopping from wishlist
    document.getElementById('continueShoppingWishlist')?.addEventListener('click', () => {
        hideModal(document.getElementById('cartModal'));
    });
    
    // Initial display update
    updateWishlistDisplay();
    
    // Make wishlist items accessible globally for product cards
    window.wishlistItems = wishlistItems;
}

// Removed responsive announcement text function - using CSS-only solution now

// Brand Title Functionality
function initBrandTitle() {
    const brandTitle = document.querySelector('.brand-title');
    
    if (brandTitle) {
        // Make title clickable to scroll to top
        brandTitle.addEventListener('click', () => {
            if (lenis) {
                lenis.scrollTo(0, {
                    duration: 1.5,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            } else {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
        
        // Add special hover effect
        brandTitle.addEventListener('mouseenter', () => {
            brandTitle.style.animationPlayState = 'paused';
        });
        
        brandTitle.addEventListener('mouseleave', () => {
            brandTitle.style.animationPlayState = 'running';
        });
    }
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Product Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card, .product-item');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target && lenis) {
            lenis.scrollTo(target, {
                offset: -80,
                duration: 1.5
            });
        }
    });
});

// CTA Button Animation
document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .header.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
    }
    
    .mobile-menu-btn {
        background: none;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 10px;
        color: #333;
        transition: color 0.3s ease;
    }
    
    .mobile-menu-btn:hover {
        color: #000;
    }
    
    .mobile-menu-btn.active {
        color: #000;
    }
    
    @media (max-width: 768px) {
        .main-nav {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: #fff;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .main-nav.mobile-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
        }
        
        .nav-list {
            flex-direction: column;
            padding: 20px;
            gap: 15px;
        }
        
        .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            background: #f8f9fa;
            margin-top: 10px;
            border-radius: 6px;
        }
    }
`;
document.head.appendChild(style);

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements on load
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .cta-button');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add loading styles
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body:not(.loaded) .hero-title,
    body:not(.loaded) .hero-subtitle,
    body:not(.loaded) .cta-button {
        opacity: 0;
        transform: translateY(30px);
    }
    
    .loaded .hero-title,
    .loaded .hero-subtitle,
    .loaded .cta-button {
        transition: all 0.8s ease;
    }
`;
document.head.appendChild(loadingStyle);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (scrolled > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Add smooth reveal animation for sections
const revealElements = document.querySelectorAll('.coupon-section, .products-section, .shipping-section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    revealObserver.observe(el);
});

// Modal Functionality
function initModals() {
    console.log('Initializing modals...');
    
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
        // Login Modal
        const loginBtn = document.getElementById('loginBtn');
        const loginModal = document.getElementById('loginModal');
        const closeLoginModal = document.getElementById('closeLoginModal');
        
        console.log('Login elements:', { loginBtn, loginModal, closeLoginModal });
        
        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Login button clicked');
                showModal(loginModal);
            });
            
            if (closeLoginModal) {
                closeLoginModal.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close login modal clicked');
                    hideModal(loginModal);
                });
            }
            
            // Close modal when clicking outside
            loginModal.addEventListener('click', (e) => {
                if (e.target === loginModal) {
                    console.log('Login modal background clicked');
                    hideModal(loginModal);
                }
            });
        } else {
            console.error('Login modal elements not found');
        }
        
        // Cart Modal
        const cartBtn = document.getElementById('cartBtn');
        const cartModal = document.getElementById('cartModal');
        const closeCartModal = document.getElementById('closeCartModal');
        
        console.log('Cart elements:', { cartBtn, cartModal, closeCartModal });
        
        if (cartBtn && cartModal) {
            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Cart button clicked');
                showModal(cartModal);
            });
            
            if (closeCartModal) {
                closeCartModal.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close cart modal clicked');
                    hideModal(cartModal);
                });
            }
            
            // Close modal when clicking outside
            cartModal.addEventListener('click', (e) => {
                if (e.target === cartModal) {
                    console.log('Cart modal background clicked');
                    hideModal(cartModal);
                }
            });
        } else {
            console.error('Cart modal elements not found');
        }
        
        // Continue shopping button
        const continueShoppingBtn = document.getElementById('continueShopping');
        if (continueShoppingBtn && cartModal) {
            continueShoppingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Continue shopping clicked');
                hideModal(cartModal);
            });
        }
    }, 100);
    
    // Login form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate login process
            const submitBtn = loginForm.querySelector('.login-submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Wird angemeldet...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Erfolgreich angemeldet!';
                setTimeout(() => {
                    const loginModalEl = document.getElementById('loginModal');
                    hideModal(loginModalEl);
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    loginForm.reset();
                }, 1000);
            }, 2000);
        });
    }
    
    // Social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const btnText = btn.textContent.trim();
            alert(`${btnText} - Diese Funktion würde normalerweise zur entsprechenden Anmeldung weiterleiten.`);
        });
    });
    
    // ESC key to close modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal-overlay.show');
            if (openModal) {
                hideModal(openModal);
            }
        }
    });
    
    console.log('Modal initialization completed');
}

// Modal helper functions
function showModal(modal) {
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    console.log('Showing modal:', modal.id);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    // Show modal immediately
    modal.style.display = 'flex';
    
    // Force reflow to ensure display change is processed
    modal.offsetHeight;
    
    // Add show class for smooth animation
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
}

function hideModal(modal) {
    if (!modal) {
        console.error('Modal element not found');
        return;
    }
    
    console.log('Hiding modal:', modal.id);
    
    // Remove show class for exit animation
    modal.classList.remove('show');
    
    // Wait for animation to complete before hiding
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 400); // Match CSS transition duration
}

// Cart Functionality
let cartItems = [];
let cartCount = 0;

function initCart() {
    updateCartDisplay();
    
    // Add to cart functionality (example)
    const addToCartBtns = document.querySelectorAll('.product-item');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            addToCart('Beispiel Artikel', 29.99);
        });
    });
    
    // Cart quantity controls
    const qtyBtns = document.querySelectorAll('.qty-btn');
    qtyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const isPlus = btn.classList.contains('plus');
            const quantitySpan = btn.parentElement.querySelector('.quantity');
            let quantity = parseInt(quantitySpan.textContent);
            
            if (isPlus) {
                quantity++;
            } else if (quantity > 1) {
                quantity--;
            }
            
            quantitySpan.textContent = quantity;
            updateCartTotal();
        });
    });
    
    // Remove item functionality
    const removeBtns = document.querySelectorAll('.remove-item');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const cartItem = btn.closest('.cart-item');
            cartItem.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => {
                cartItem.remove();
                updateCartDisplay();
            }, 300);
        });
    });
}

function addToCart(name, price) {
    cartItems.push({ name, price, quantity: 1 });
    cartCount++;
    updateCartDisplay();
    
    // Show success message
    showNotification('Artikel zum Warenkorb hinzugefügt!');
}

function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-count');
    const cartEmpty = document.getElementById('cartEmpty');
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'flex' : 'none';
    }
    
    if (cartCount > 0) {
        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        cartSummary.style.display = 'block';
    } else {
        cartEmpty.style.display = 'block';
        cartItems.style.display = 'none';
        cartSummary.style.display = 'none';
    }
    
    updateCartTotal();
}

function updateCartTotal() {
    const totalElement = document.querySelector('.summary-row.total span:last-child');
    if (totalElement) {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalElement.textContent = `${total.toFixed(2)} €`;
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #000;
        color: #fff;
        padding: 15px 20px;
        border-radius: 8px;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for cart animations
const cartAnimationStyle = document.createElement('style');
cartAnimationStyle.textContent = `
    @keyframes slideOut {
        to {
            transform: translateX(-100%);
            opacity: 0;
        }
    }
    
    .cart-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(cartAnimationStyle);
