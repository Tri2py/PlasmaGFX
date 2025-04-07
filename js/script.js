// Script initialization

// let Vercel Host website reach
// import { Analytics } from "@vercel/analytics/react"

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Get menu elements
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const popupClose = document.querySelector('.popup-close');

    console.log('Menu elements found:', {
        menuToggle: menuToggle,
        navMenu: navMenu,
        popupClose: popupClose
    });

    // Check if elements exist
    if (!menuToggle) {
        console.error('Menu toggle button not found!');
    }

    if (!navMenu) {
        console.error('Nav menu not found!');
    } else {
        // Ensure the nav menu is properly initialized
        navMenu.classList.remove('active'); // Reset to initial state
        navMenu.style.cssText = ''; // Clear any inline styles
        console.log('Nav menu initialized');
    }

    // Function to close the menu popup
    function closeMenuPopup() {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');

        // Change icon back to bars
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }

    // Function to open the menu popup
    function openMenuPopup() {
        console.log('Opening menu popup');

        // First change the icon immediately
        menuToggle.classList.add('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }

        // Force remove any inline styles that might be interfering
        navMenu.style.cssText = '';

        // Force add the active class immediately
        navMenu.classList.add('active');

        // Debug information
        console.log('Menu active class added immediately:', navMenu.classList.contains('active'));
        console.log('Menu style top:', window.getComputedStyle(navMenu).top);
        console.log('Menu style right:', window.getComputedStyle(navMenu).right);
        console.log('Menu style opacity:', window.getComputedStyle(navMenu).opacity);
        console.log('Menu style transform:', window.getComputedStyle(navMenu).transform);

        // Then force it again after a delay to ensure it takes effect
        setTimeout(() => {
            // Double-check and force if needed
            if (!navMenu.classList.contains('active')) {
                console.log('Active class was lost, re-adding');
                navMenu.classList.add('active');
            }

            // Apply inline styles as a fallback
            navMenu.style.top = '80px';
            navMenu.style.opacity = '1';
            navMenu.style.pointerEvents = 'auto';
            navMenu.style.transform = 'scale(1)';

            // More debug information
            console.log('Menu after timeout:');
            console.log('- active class:', navMenu.classList.contains('active'));
            console.log('- style top:', window.getComputedStyle(navMenu).top);
            console.log('- style opacity:', window.getComputedStyle(navMenu).opacity);
        }, 100);
    }

    // Toggle menu when clicking the menu button
    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent event from bubbling up
        console.log('Menu toggle clicked');

        // Force open regardless of current state for debugging
        openMenuPopup();

        // Uncomment this for normal toggle behavior
        /*
        if (navMenu.classList.contains('active')) {
            closeMenuPopup();
        } else {
            openMenuPopup();
        }
        */
    });

    // Close menu when clicking the close button
    if (popupClose) {
        popupClose.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from bubbling up
            closeMenuPopup();
        });
    }

    // Close menu when clicking outside the popup
    document.addEventListener('click', (event) => {
        if (navMenu.classList.contains('active') &&
            !navMenu.contains(event.target) &&
            !menuToggle.contains(event.target)) {
            closeMenuPopup();
        }
    });

    // Close menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', closeMenuPopup);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect with hide/show on scroll direction
    const header = document.querySelector('header');
    // Initialize header as visible
    header.classList.add('show');

    let lastScrollTop = 0;
    let scrollThreshold = 50; // Minimum scroll amount before hiding/showing
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                // Get current scroll position
                const currentScrollTop = window.scrollY;

                // Add scrolled class for background when not at the top
                if (currentScrollTop > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                    header.classList.remove('hide'); // Always show header at the top
                    header.classList.add('show');
                }

                // Determine scroll direction and toggle header visibility
                // Add a small tolerance (5px) to prevent flickering with small movements
                const scrollDifference = Math.abs(currentScrollTop - lastScrollTop);
                const minScrollDifference = 5;

                // Use a variable to track if we're in hide delay mode
                if (!window.headerHideTimeout && currentScrollTop > lastScrollTop &&
                    currentScrollTop > scrollThreshold && scrollDifference > minScrollDifference) {
                    // Scrolling down & past threshold - hide header after a small delay
                    window.headerHideTimeout = setTimeout(() => {
                        header.classList.remove('show');
                        header.classList.add('hide');
                        window.headerHideTimeout = null;
                    }, 200); // 200ms delay before hiding
                } else if (currentScrollTop < lastScrollTop && scrollDifference > minScrollDifference) {
                    // Scrolling up - show header immediately
                    // Clear any pending hide timeout
                    if (window.headerHideTimeout) {
                        clearTimeout(window.headerHideTimeout);
                        window.headerHideTimeout = null;
                    }
                    header.classList.remove('hide');
                    header.classList.add('show');
                }

                // Update last scroll position
                lastScrollTop = currentScrollTop;
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Form submission
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
            // For now, we'll just log it to the console and show a success message
            console.log('Form submitted:', { name, email, subject, message });

            // In a real implementation, this would send an email to info@plasmagfx.com
            // using a server-side script or email service API

            // Show success message
            alert('Thank you for your message! Your inquiry has been sent to our team and we will get back to you within 24-48 hours.');

            // Reset form
            contactForm.reset();
        });
    }

    // Animation on scroll
    window.addEventListener('scroll', revealElements);

    // Function to reveal elements on scroll
    function revealElements() {
        const elements = document.querySelectorAll('.service-card, .project-card, .about-content, .contact-content');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('revealed');
            }
        });
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.innerHTML = `
        .service-card, .project-card, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Initial check for elements in view
    revealElements();

    // Set active navigation item based on scroll position
    updateActiveNavItem();

    // Function to ensure the language switcher checkbox is in the correct state
    function updateLanguageSwitcherUI(lang) {
        const languageSwitcher = document.getElementById('language-switcher');
        if (languageSwitcher) {
            // Use a more direct approach to set the checkbox state
            const shouldBeChecked = lang === 'ar';

            // First try the normal way
            languageSwitcher.checked = shouldBeChecked;

            // Then force it with a click if needed
            if (languageSwitcher.checked !== shouldBeChecked) {
                console.log('Checkbox state mismatch, forcing with click');
                languageSwitcher.click();
            }

            // Also try setting the property directly
            Object.defineProperty(languageSwitcher, 'checked', {
                value: shouldBeChecked,
                configurable: true,
                writable: true
            });

            // Dispatch a change event to ensure listeners are notified
            const event = new Event('change', { bubbles: true });
            languageSwitcher.dispatchEvent(event);

            console.log('Language switcher UI updated, lang =', lang, 'checked =', languageSwitcher.checked);
        }
    }

    // Initialize language switcher
    setLanguage(currentLanguage);
    // Force update the UI after a short delay to ensure DOM is ready
    setTimeout(() => updateLanguageSwitcherUI(currentLanguage), 200);

    // Add event listener to language switcher checkbox
    const languageSwitcher = document.getElementById('language-switcher');
    if (languageSwitcher) {
        console.log('Initial language:', currentLanguage);

        // Force set initial state based on current language
        setTimeout(() => {
            languageSwitcher.checked = currentLanguage === 'ar';
            console.log('Initial checkbox state set to:', languageSwitcher.checked);
        }, 100);

        languageSwitcher.addEventListener('change', function() {
            const newLang = this.checked ? 'ar' : 'en';
            console.log('Language switcher changed to:', newLang);

            // Update the language
            setLanguage(newLang);

            // Force update the UI again to ensure consistency
            setTimeout(() => updateLanguageSwitcherUI(newLang), 50);

            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                closeMenuPopup();
            }
        });
    }

    // Update active navigation item based on scroll position
    function updateActiveNavItem() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');

        window.addEventListener('scroll', () => {
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

        // Set home as active by default
        if (navLinks.length > 0) {
            navLinks[0].classList.add('active');
        }
    }
});

// Vercel Analytics
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
