
        // Get all animatable elements in the About section
        const getAboutElements = () => {
            const aboutSection = document.querySelector('.about-section');
            if (!aboutSection) return [];
            return aboutSection.querySelectorAll('.about-label, .about-image-container, .about-title, .about-description, .about-stats, .about-buttons');
        };

        // Get all animatable elements in the Skills section
        const getSkillsElements = () => {
            const skillsSection = document.querySelector('.skills-section');
            if (!skillsSection) return [];
            const elements = [
                skillsSection.querySelector('.skills-label'),
                skillsSection.querySelector('.skills-title'),
                ...skillsSection.querySelectorAll('.skill-chip') // Get all individual skill chips
            ];
            return elements.filter(el => el != null);
        }

        // Get all animatable elements in the Tabs section
        const getTabElements = () => {
            const tabSection = document.querySelector('.tab-section');
            if (!tabSection) return [];
            const elements = [
                tabSection.querySelector('.tab-label'),
                tabSection.querySelector('.tab-title'),
                tabSection.querySelector('.tab-headers'),
                tabSection.querySelector('.tab-content-area')
            ];
            return elements.filter(el => el != null);
        }

        // Get all animatable elements in the Contact section
        const getContactElements = () => {
            const contactSection = document.querySelector('.contact-section');
            if (!contactSection) return [];
            const elements = [
                contactSection.querySelector('.contact-label'),
                contactSection.querySelector('.contact-title'),
                contactSection.querySelector('.contact-subtitle'),
                contactSection.querySelector('.contact-info'),
                contactSection.querySelector('.contact-form-wrapper')
            ];
            return elements.filter(el => el != null);
        }


        // Function to manually trigger the exit animation (used for nav clicks)
        const triggerExitAnimation = (sectionId) => {
            let elements = [];
            if (sectionId === '#about') {
                elements = getAboutElements();
            } else if (sectionId === '#skills') {
                elements = getSkillsElements();
            } else if (sectionId === '#projects') {
                elements = getTabElements();
            } else if (sectionId === '#contact') {
                elements = getContactElements();
            }

            if (elements.length > 0) {
                elements.forEach(el => {
                    // Apply exiting class only if it's currently visible
                    if (el.classList.contains('visible')) {
                        el.classList.remove('visible');
                        el.classList.add('exiting');
                    }
                });
            }
        };

        // Function to apply a staggered transition delay to skill chips
        const applySkillDelay = () => {
            const skillChips = document.querySelectorAll('.skill-chip');
            skillChips.forEach((el, index) => {
                // Staggered delay for skills: e.g., index * 0.05s, starting after other elements
                el.style.transitionDelay = `${0.3 + index * 0.05}s`;
            });
        };

        // NEW & FIXED: Tab switching logic
        const switchTab = (tabName) => {
            // 1. Remove 'active' from all tab headers and contents
            document.querySelectorAll('.tab-box').forEach(box => box.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => {
                // Initiate exit animation/transition
                content.classList.remove('active');
            });

            // 2. Add 'active' to the clicked header
            const activeHeader = document.querySelector(`.tab-box[data-tab="${tabName}"]`);
            if (activeHeader) {
                activeHeader.classList.add('active');
            }

            // 3. Add 'active' to the corresponding content (Triggers entrance animation)
            const targetContent = document.getElementById(tabName);
            if (targetContent) {
                // A slight delay ensures the CSS transition happens after the other content's transition starts
                setTimeout(() => {
                    targetContent.classList.add('active');
                }, 100);
            }
        }


        document.addEventListener('DOMContentLoaded', function () {
            // Initialize Vanta.js background (Moved inside DOMContentLoaded for better loading)
            VANTA.DOTS({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200,
                scale: 1.00,
                scaleMobile: 1.00,
                showLines: false,
                color: 0x6b6b6b,
                backgroundColor: 0x222222,
                size: 3.5,
                spacing: 30.0
            });

            const splineViewer = document.querySelector('spline-viewer');
            if (splineViewer) {
                // Delay to ensure the Spline component is loaded before trying to access its shadow DOM
                setTimeout(() => {
                    const shadowRoot = splineViewer.shadowRoot;
                    if (shadowRoot) {
                        const logoElements = shadowRoot.querySelectorAll('#logo, [id*="logo"], [id*="Logo"], [class*="logo"], [class*="Logo"], a[href*="spline"]');
                        logoElements.forEach(el => {
                            el.style.display = 'none';
                            el.style.opacity = '0';
                            el.style.visibility = 'hidden';
                            el.style.pointerEvents = 'none';
                        });
                    }
                }, 1000);
            }

            // Typing animation logic
            const phrases = [
                "MERN Stack Developer",
                "Problem Solver",
                "Tech Learner",
                "Full Stack Engineer",
                "React Enthusiast",
                "Code Craftsman",
                "Tech Innovator"
            ];

            const typingElement = document.querySelector('.typing-text');
            let phraseIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            let typingSpeed = 100;

            function type() {
                const currentPhrase = phrases[phraseIndex];

                if (isDeleting) {
                    typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                    charIndex--;
                    typingSpeed = 50;
                } else {
                    typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                    charIndex++;
                    typingSpeed = 100;
                }

                if (!isDeleting && charIndex === currentPhrase.length) {
                    typingSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    typingSpeed = 500;
                }

                setTimeout(type, typingSpeed);
            }

            type();

            // --- Scroll Indicator Visibility Logic ---
            const scrollIndicator = document.querySelector('.scroll-indicator');
            let hasScrolled = false;

            const handleScroll = () => {
                // Check if the user has scrolled down past a small threshold (e.g., 50px)
                if (window.scrollY > 50 && !hasScrolled) {
                    scrollIndicator.classList.add('hidden');
                    hasScrolled = true;
                    // Remove the event listener after the first scroll to optimize performance
                    window.removeEventListener('scroll', handleScroll);
                }
            };

            // Re-check scroll position on load to hide if scrolled and refreshed
            if (window.scrollY > 50) {
                scrollIndicator.classList.add('hidden');
                hasScrolled = true;
            } else {
                window.addEventListener('scroll', handleScroll);
            }
            // --- End Scroll Indicator Visibility Logic ---
            // --- Back to Top Button Logic ---
            const backToTopButton = document.querySelector('.back-to-top');

            const handleBackToTopVisibility = () => {
                if (window.scrollY > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            };

            window.addEventListener('scroll', handleBackToTopVisibility);
            handleBackToTopVisibility(); // Check on load
            // --- End Back to Top Button Logic ---

            // NEW: Attach click listeners for tabs
            document.querySelectorAll('.tab-box').forEach(box => {
                box.addEventListener('click', function () {
                    const tabName = this.getAttribute('data-tab');
                    switchTab(tabName);
                });
            });


            // --- Intersection Observer Logic for Entrance and Exit Animations (Scroll-based) ---

            // Apply delays once when the DOM is ready
            applySkillDelay();

            const observerOptions = {
                // FIX: Use negative rootMargin bottom to trigger 'isIntersecting: false' sooner
                rootMargin: '0px 0px -100px 0px',
                threshold: 0.1,
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const isAbout = entry.target.classList.contains('about-section');
                    const isSkills = entry.target.classList.contains('skills-section');
                    const isTabs = entry.target.classList.contains('tab-section');
                    const isContact = entry.target.classList.contains('contact-section'); // New check

                    if (isAbout || isSkills || isTabs || isContact) {
                        let elements;
                        if (isAbout) elements = getAboutElements();
                        else if (isSkills) elements = getSkillsElements();
                        else if (isTabs) elements = getTabElements();
                        else if (isContact) elements = getContactElements(); // Get contact elements

                        if (entry.isIntersecting) {
                            // ENTRY: Show the elements (fly in)
                            elements.forEach((el, index) => {
                                el.classList.remove('exiting');
                                // The delay for skills is set only once in DOMContentLoaded
                                el.classList.add('visible');
                            });
                        } else {
                            // EXIT (Scroll-Out): Apply the 'exiting' class to trigger the reverse animation (fly out)
                            elements.forEach(el => {
                                el.classList.remove('visible');
                                el.classList.add('exiting');
                            });
                        }
                    }
                });
            }, observerOptions);

            const aboutSection = document.querySelector('.about-section');
            const skillsSection = document.querySelector('.skills-section');
            const tabSection = document.querySelector('.tab-section');
            const contactSection = document.querySelector('.contact-section'); // New selector

            // Initial state setup and observing
            if (aboutSection) {
                getAboutElements().forEach(el => el.classList.remove('visible'));
                observer.observe(aboutSection);
            }
            if (skillsSection) {
                getSkillsElements().forEach(el => el.classList.remove('visible'));
                observer.observe(skillsSection);
            }
            if (tabSection) { // Observe the tabs section
                getTabElements().forEach(el => el.classList.remove('visible'));
                observer.observe(tabSection);
            }
            if (contactSection) { // Observe the new contact section
                getContactElements().forEach(el => el.classList.remove('visible'));
                observer.observe(contactSection);
            }


            // 🔥 NEW JAVASCRIPT LOGIC FOR ACTIVE NAV LINK HIGHLIGHTING 🔥

            const navLinks = document.querySelectorAll('.nav-links a');
            const sections = document.querySelectorAll('section, .container'); // Include .container for the #home section

            // Options for the second observer used specifically for navigation highlighting
            const navObserverOptions = {
                root: null,
                // A threshold near the top of the viewport
                threshold: 0.2, // Trigger when 20% of the section is visible
                // This margin helps define the "active zone" (1px from top, 0px from bottom)
                rootMargin: "-20% 0px -50% 0px", // Try to center the "active zone"
            };

            // The callback for the navigation highlighter
            const navObserverCallback = (entries) => {
                entries.forEach(entry => {
                    const targetId = `#${entry.target.id}`;
                    const targetLink = document.querySelector(`.nav-links a[href="${targetId}"]`);

                    if (entry.isIntersecting) {
                        // 1. Remove active class from all links
                        navLinks.forEach(link => link.classList.remove('active'));

                        // 2. Add active class to the intersecting link
                        if (targetLink) {
                            targetLink.classList.add('active');
                        }
                    }
                });
            };

            const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);

            // Observe each section
            sections.forEach(section => {
                navObserver.observe(section);
            });

            // Edge Case: Home section visibility on load/refresh (IntersectionObserver struggles with top-of-page element)
            // Set 'Home' active initially unless another section is clearly visible
            if (window.scrollY < 50) {
                navLinks.forEach(link => link.classList.remove('active'));
                document.querySelector('.nav-links a[href="#home"]').classList.add('active');
            }


            // --- Navigation Click Handler Fix (Modified for multiple sections) ---
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const href = this.getAttribute('href');
                    const target = document.querySelector(href);

                    if (target) {
                        // Highlight manually before scrolling for instant feedback
                        navLinks.forEach(link => link.classList.remove('active'));
                        this.classList.add('active');

                        // Check if we are already at or very close to the target section
                        const targetRect = target.getBoundingClientRect();
                        const isAlreadyAtTarget = Math.abs(targetRect.top) < 50;

                        // 1. Manually trigger the exit animation for other sections.
                        if (href !== '#about' && !isAlreadyAtTarget) {
                            triggerExitAnimation('#about');
                        }
                        if (href !== '#skills' && !isAlreadyAtTarget) {
                            triggerExitAnimation('#skills');
                        }
                        if (href !== '#projects' && !isAlreadyAtTarget) {
                            triggerExitAnimation('#projects');
                        }
                        if (href !== '#contact' && !isAlreadyAtTarget) { // New exit trigger
                            triggerExitAnimation('#contact');
                        }

                        // 2. Perform the smooth scroll ONLY if we are not already at the target.
                        if (!isAlreadyAtTarget) {
                            target.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start'
                            });
                        }

                        // 3. Clean up the 'exiting' class after the scroll is complete.
                        const cleanupDelay = isAlreadyAtTarget ? 50 : 1500;

                        setTimeout(() => {
                            getAboutElements().forEach(el => el.classList.remove('exiting'));
                            getSkillsElements().forEach(el => el.classList.remove('exiting'));
                            getTabElements().forEach(el => el.classList.remove('exiting'));
                            getContactElements().forEach(el => el.classList.remove('exiting')); // New cleanup
                        }, cleanupDelay);
                    }
                });
            });
            
            // --- End Navigation Click Handler Fix ---
         // --- End Navigation Click Handler Fix ---
// 🔥 SCROLL PASSTHROUGH FIX - Enhanced for Achievements
const tabContentArea = document.querySelector('.tab-content-area');

if (tabContentArea) {
    tabContentArea.addEventListener('wheel', function(e) {
        const scrollTop = this.scrollTop;
        const scrollHeight = this.scrollHeight;
        const clientHeight = this.clientHeight;
        const deltaY = e.deltaY;
        
        // More generous bottom detection (within 5px of bottom)
        const isAtTop = scrollTop <= 2;
        const isAtBottom = (scrollHeight - scrollTop - clientHeight) <= 5;
        
        console.log('Scroll Debug:', {
            scrollTop,
            scrollHeight,
            clientHeight,
            remaining: scrollHeight - scrollTop - clientHeight,
            isAtBottom,
            deltaY
        });
        
        // At bottom, scrolling down - scroll the main page
        if (isAtBottom && deltaY > 0) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollBy({
                top: deltaY * 0.5, // Smoother transition
                behavior: 'auto'
            });
            return;
        }
        
        // At top, scrolling up - scroll the main page
        if (isAtTop && deltaY < 0) {
            e.preventDefault();
            e.stopPropagation();
            window.scrollBy({
                top: deltaY * 0.5,
                behavior: 'auto'
            });
            return;
        }
        
        // Middle of content - stop page scroll
        e.stopPropagation();
    }, { passive: false });
}
    
        });
    