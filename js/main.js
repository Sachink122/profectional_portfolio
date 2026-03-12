/**
 * Portfolio Website JavaScript
 * Handles interactivity, animations, and dynamic features
 */
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    Loader.init();
    Navigation.init();
    Theme.init();
    HeroStats.init();
    Skills.init();
    ProjectFilter.init();
    Testimonials.init();
    ContactForm.init();
    ScrollAnimations.init();
    BackToTop.init();
    Chatbot.init();
});

/**
 * Loader Module
 */
const Loader = {
    init() {
        const loader = document.getElementById('loader');
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 500);
        });
    }
};

/**
 * Navigation Module
 */
const Navigation = {
    init() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.bindEvents();
        this.setActiveLink();
    },
    
    bindEvents() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => this.toggleMenu());
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container')) {
                this.closeMenu();
            }
        });
        
        // Update active link on scroll
        window.addEventListener('scroll', () => this.setActiveLink());
    },
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
    },
    
    toggleMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    },
    
    closeMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
    },
    
    setActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
};

/**
 * Theme Toggle Module
 */
const Theme = {
    init() {
        this.toggle = document.getElementById('theme-toggle');
        this.icon = this.toggle.querySelector('i');
        
        // Check for saved theme or system preference
        this.loadTheme();
        
        // Toggle theme on click
        this.toggle.addEventListener('click', () => this.toggleTheme());
    },
    
    loadTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            this.setDarkMode();
        }
    },
    
    toggleTheme() {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            this.setLightMode();
        } else {
            this.setDarkMode();
        }
    },
    
    setDarkMode() {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        this.icon.className = 'fas fa-sun';
    },
    
    setLightMode() {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        this.icon.className = 'fas fa-moon';
    }
};

/**
 * Hero Stats Counter Animation
 */
const HeroStats = {
    init() {
        this.stats = document.querySelectorAll('.stat-number');
        this.animated = false;
        
        // Observe when hero section is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateStats();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            observer.observe(heroSection);
        }
    },
    
    animateStats() {
        this.stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCount = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCount);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
    }
};

/**
 * Skills Progress Animation
 */
const Skills = {
    init() {
        this.progressBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgress(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.progressBars.forEach(bar => observer.observe(bar));
    },
    
    animateProgress(bar) {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = `${progress}%`;
    }
};

/**
 * Project Filter Module
 */
const ProjectFilter = {
    init() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => this.filter(btn));
        });
    },
    
    filter(activeBtn) {
        // Update active button
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
        
        const filterValue = activeBtn.getAttribute('data-filter');
        
        this.projects.forEach(project => {
            const category = project.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                project.classList.remove('hidden');
                project.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                project.classList.add('hidden');
            }
        });
    }
};

/**
 * Testimonials Slider Module
 */
const Testimonials = {
    init() {
        this.cards = document.querySelectorAll('.testimonial-card');
        this.dotsContainer = document.querySelector('.testimonials-dots');
        this.prevBtn = document.querySelector('.testimonials-nav .prev');
        this.nextBtn = document.querySelector('.testimonials-nav .next');
        this.currentIndex = 0;
        this.autoplayInterval = null;
        
        if (this.cards.length === 0) return;
        
        this.createDots();
        this.bindEvents();
        this.startAutoplay();
    },
    
    createDots() {
        this.cards.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        
        this.dots = document.querySelectorAll('.testimonials-dots .dot');
    },
    
    bindEvents() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Pause autoplay on hover
        const slider = document.querySelector('.testimonials-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoplay());
        slider.addEventListener('mouseleave', () => this.startAutoplay());
    },
    
    goToSlide(index) {
        this.cards[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');
        
        this.currentIndex = index;
        
        this.cards[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');
    },
    
    nextSlide() {
        const newIndex = (this.currentIndex + 1) % this.cards.length;
        this.goToSlide(newIndex);
    },
    
    prevSlide() {
        const newIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
        this.goToSlide(newIndex);
    },
    
    startAutoplay() {
        this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
    },
    
    stopAutoplay() {
        clearInterval(this.autoplayInterval);
    }
};

/**
 * Contact Form Module
 */
const ContactForm = {
    init() {
        this.form = document.getElementById('contact-form');
        
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    },
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        if (!this.validate(data)) {
            return;
        }
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Actually send the message
        this.sendMessage(data, submitBtn, originalText);
    },
    
    async sendMessage(data, submitBtn, originalText) {
        try {
            // Option 1: Send to Formspree (email service) - ACTIVE
            const response = await fetch('https://formspree.io/f/mgonywjy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    _replyto: data.email
                })
            });
            
            if (response.ok) {
                this.showSuccess('Message sent successfully! I\'ll get back to you soon.');
                // Also save locally for backup
                this.saveMessageLocally(data);
            } else {
                throw new Error('Failed to send message');
            }
            
        } catch (error) {
            console.error('Error sending message:', error);
            this.showError('Failed to send message. Please try again or contact me directly.');
            
            // Save locally as backup even if sending fails
            this.saveMessageLocally(data);
            
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            return;
        }
        
        // Success - reset form
        setTimeout(() => {
            this.form.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
    },
    
    saveMessageLocally(data) {
        const message = {
            ...data,
            timestamp: new Date().toISOString(),
            type: 'contact-form'
        };
        
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push(message);
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        
        console.log('📞 New Contact Message:', message);
        console.log('💡 To view all messages, type: ContactForm.showAdminPanel()');
    },
    
    showSuccess(message) {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #34d399 100%)';
        
        // Show success notification
        const notification = document.createElement('div');
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 9999;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 5000);
    },
    
    validate(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!data.name.trim() || data.name.length < 2) {
            this.showError('Please enter a valid name');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            this.showError('Please enter a valid email address');
            return false;
        }
        
        if (!data.subject.trim()) {
            this.showError('Please enter a subject');
            return false;
        }
        
        if (!data.message.trim() || data.message.length < 10) {
            this.showError('Please enter a message (at least 10 characters)');
            return false;
        }
        
        return true;
    },
    
    showError(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'form-notification error';
        notification.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ef4444;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    },
    
    // Admin panel to view contact form messages
    showAdminPanel() {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        
        const adminPanel = document.createElement('div');
        adminPanel.style.cssText = `
            position: fixed;
            top: 50px;
            left: 50px;
            background: white;
            border: 2px solid #10b981;
            border-radius: 12px;
            padding: 1.5rem;
            max-width: 500px;
            max-height: 400px;
            overflow-y: auto;
            z-index: 99999;
            box-shadow: 0 15px 50px rgba(0,0,0,0.3);
            font-family: Inter, sans-serif;
        `;
        
        adminPanel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="margin: 0; color: #10b981; font-size: 1.25rem;">
                    📞 Contact Messages (${messages.length})
                </h3>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="background: #ef4444; color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; font-size: 16px;">×</button>
            </div>
            <div style="max-height: 250px; overflow-y: auto;">
                ${messages.length === 0 ? 
                    '<p style="text-align: center; color: #6b7280; font-style: italic;">No messages received yet</p>' : 
                    messages.map((msg, index) => `
                        <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 1rem; margin-bottom: 1rem; background: #f9fafb;">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                                <strong style="color: #1f2937; font-size: 1rem;">${msg.name}</strong>
                                <span style="color: #6b7280; font-size: 0.75rem;">#${index + 1}</span>
                            </div>
                            <div style="color: #4b5563; font-size: 0.875rem; margin-bottom: 0.5rem;">
                                📧 ${msg.email}<br>
                                📅 ${new Date(msg.timestamp).toLocaleString()}<br>
                                📝 Subject: <em>${msg.subject}</em>
                            </div>
                            <div style="background: white; padding: 0.75rem; border-radius: 6px; border-left: 3px solid #10b981;">
                                <p style="margin: 0; color: #1f2937; line-height: 1.5;">${msg.message}</p>
                            </div>
                        </div>
                    `).join('')
                }
            </div>
            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
                <button onclick="localStorage.removeItem('contactMessages'); this.parentElement.parentElement.remove(); location.reload();" 
                        style="background: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.875rem;">
                    🗑️ Clear All
                </button>
                <button onclick="console.log(JSON.parse(localStorage.getItem('contactMessages') || '[]'))" 
                        style="background: #6366f1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.875rem;">
                    📊 Log to Console
                </button>
            </div>
        `;
        
        document.body.appendChild(adminPanel);
    }
};

/**
 * Scroll Animations Module
 */
const ScrollAnimations = {
    init() {
        this.animatedElements = document.querySelectorAll(
            '.section-header, .about-card, .skill-item, .project-card, .timeline-item, .contact-item, .about-image, .about-text, .testimonial-card'
        );
        
        // Add animation classes with stagger effect
        this.animatedElements.forEach((el, index) => {
            el.classList.add('fade-in');
            // Add stagger delay based on position within parent
            const staggerIndex = (index % 6) + 1;
            el.style.transitionDelay = `${staggerIndex * 0.1}s`;
        });
        
        // Create observer with enhanced options
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add visible class with slight delay for smooth effect
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 50);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });
        
        this.animatedElements.forEach(el => observer.observe(el));
        
        // Initialize parallax effect for hero section
        this.initParallax();
        
        // Initialize text reveal animation
        this.initTextReveal();
    },
    
    initParallax() {
        const heroShapes = document.querySelectorAll('.hero-shape');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            heroShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.1;
                shape.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
        
        // Mouse parallax for hero image
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            document.addEventListener('mousemove', (e) => {
                const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
                const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
                heroImage.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
            });
        }
    },
    
    initTextReveal() {
        // Add reveal class to section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            title.classList.add('reveal');
        });
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        sectionTitles.forEach(title => revealObserver.observe(title));
    }
};

/**
 * Back to Top Button Module
 */
const BackToTop = {
    init() {
        this.button = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    },
    
    toggleVisibility() {
        if (window.scrollY > 500) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    },
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

/**
 * Smooth Scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offset = 80; // Account for fixed navbar
            const targetPosition = target.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/**
 * Typing Effect for Hero (Optional Enhancement)
 */
const TypingEffect = {
    init(element, texts, speed = 100) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    },
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        let typeSpeed = this.speed;
        
        if (this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
};

// Initialize typing effect for role (uncomment to use)
// document.addEventListener('DOMContentLoaded', () => {
//     const roleElement = document.querySelector('.title-role');
//     if (roleElement) {
//         TypingEffect.init(roleElement, [
//             'Full Stack Developer',
//             'UI/UX Designer',
//             'Problem Solver',
//             'Creative Thinker'
//         ]);
//     }
// });

/**
 * Parallax Effect for Hero Shapes
 */
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.hero-shape');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

/**
 * Form Input Animation Enhancement
 */
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    // Check if input has value on load
    if (input.value) {
        input.classList.add('has-value');
    }
    
    input.addEventListener('blur', function() {
        if (this.value) {
            this.classList.add('has-value');
        } else {
            this.classList.remove('has-value');
        }
    });
});

/**
 * Newsletter Form Handler
 */
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = newsletterForm.querySelector('input');
        const email = input.value;
        
        if (email) {
            // Simulate subscription
            input.value = '';
            input.placeholder = 'Subscribed! Thank you.';
            
            setTimeout(() => {
                input.placeholder = 'Your email address';
            }, 3000);
        }
    });
}

/**
 * Add CSS animation keyframe
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

/**
 * Chatbot Module
 */
const Chatbot = {
    responses: {
        'tell me about yourself': `Hello! 👋 I'm Sachin Kumar, a passionate Full Stack Developer with a strong focus on creating innovative digital solutions. I specialize in building scalable web applications using cutting-edge technologies.\n\n🔧 **My Expertise:**\n• Frontend Development (React, Vue.js, JavaScript ES6+)\n• Backend Development (Node.js, Python, Express)\n• Database Design (MongoDB, MySQL, PostgreSQL)\n• Cloud Technologies (AWS, Azure, Firebase)\n• DevOps & Deployment (Docker, CI/CD)\n\nI believe in writing clean, maintainable code and creating user-centered experiences that make a difference. Let's build something amazing together!`,
        
        'about me': `Hello! 👋 I'm Sachin Kumar, a passionate Full Stack Developer with a strong focus on creating innovative digital solutions. I specialize in building scalable web applications using cutting-edge technologies.\n\n🔧 **My Expertise:**\n• Frontend Development (React, Vue.js, JavaScript ES6+)\n• Backend Development (Node.js, Python, Express)\n• Database Design (MongoDB, MySQL, PostgreSQL)\n• Cloud Technologies (AWS, Azure, Firebase)\n• DevOps & Deployment (Docker, CI/CD)\n\nI believe in writing clean, maintainable code and creating user-centered experiences that make a difference. Let's build something amazing together!`,
        
        'show me your projects': `Absolutely! I've worked on several exciting projects that showcase my technical abilities:\n\n🚀 **Project Highlights:**\n• **E-Commerce Platform** - Full-stack application with payment integration\n• **Portfolio Websites** - Responsive designs with modern UI/UX\n• **Web Applications** - Custom solutions for business needs\n• **API Development** - RESTful services and microservices\n• **Database Solutions** - Optimized data management systems\n\nYou can explore all my work in the Projects section above! Want me to scroll you there?`,
        
        'view projects': `Absolutely! I've worked on several exciting projects that showcase my technical abilities:\n\n🚀 **Project Highlights:**\n• **E-Commerce Platform** - Full-stack application with payment integration\n• **Portfolio Websites** - Responsive designs with modern UI/UX\n• **Web Applications** - Custom solutions for business needs\n• **API Development** - RESTful services and microservices\n• **Database Solutions** - Optimized data management systems\n\nYou can explore all my work in the Projects section above! Want me to scroll you there?`,
        
        'what are your skills': `Great question! Here's my comprehensive technical skillset:\n\n💻 **Frontend Technologies:**\n• HTML5, CSS3, JavaScript (ES6+)\n• React.js, Vue.js, Angular\n• Responsive Design, Bootstrap, Tailwind CSS\n• Progressive Web Apps (PWA)\n\n⚡ **Backend Development:**\n• Node.js, Express.js\n• Python, Django, Flask\n• RESTful APIs, GraphQL\n• Microservices Architecture\n\n🗄️ **Databases & Storage:**\n• MySQL, PostgreSQL (SQL)\n• MongoDB, Firebase (NoSQL)\n• Redis, Elasticsearch\n\n☁️ **DevOps & Tools:**\n• Git, GitHub/GitLab\n• Docker, Kubernetes\n• AWS, Azure, Google Cloud\n• CI/CD Pipelines\n\nVisit the Skills section for more details!`,
        
        'my skills': `Great question! Here's my comprehensive technical skillset:\n\n💻 **Frontend Technologies:**\n• HTML5, CSS3, JavaScript (ES6+)\n• React.js, Vue.js, Angular\n• Responsive Design, Bootstrap, Tailwind CSS\n• Progressive Web Apps (PWA)\n\n⚡ **Backend Development:**\n• Node.js, Express.js\n• Python, Django, Flask\n• RESTful APIs, GraphQL\n• Microservices Architecture\n\n🗄️ **Databases & Storage:**\n• MySQL, PostgreSQL (SQL)\n• MongoDB, Firebase (NoSQL)\n• Redis, Elasticsearch\n\n☁️ **DevOps & Tools:**\n• Git, GitHub/GitLab\n• Docker, Kubernetes\n• AWS, Azure, Google Cloud\n• CI/CD Pipelines\n\nVisit the Skills section for more details!`,
        
        'how can i contact you': `I'd love to hear from you! Here are several ways to connect:\n\n📧 **Direct Contact:**\n• Email: sachinkumar6910@gmail.com\n• Phone: Available upon request\n\n🌐 **Professional Networks:**\n• LinkedIn: linkedin.com/in/sachinkumar\n• GitHub: github.com/sachinkumar6910-cloud\n• Portfolio: Right here!\n\n💬 **Quick Contact:**\nUse the contact form in the Contact section below for instant messaging. I typically respond within 24 hours!\n\nLet's discuss your next project! 🚀`,
        
        'contact info': `I'd love to hear from you! Here are several ways to connect:\n\n📧 **Direct Contact:**\n• Email: sachinkumar6910@gmail.com\n• Phone: Available upon request\n\n🌐 **Professional Networks:**\n• LinkedIn: linkedin.com/in/sachinkumar\n• GitHub: github.com/sachinkumar6910-cloud\n• Portfolio: Right here!\n\n💬 **Quick Contact:**\nUse the contact form in the Contact section below for instant messaging. I typically respond within 24 hours!\n\nLet's discuss your next project! 🚀`,
        
        'hello': `Hello there! 👋 Welcome to my digital portfolio! I'm thrilled you're here.\n\nI'm Sachin Kumar, and I'm passionate about creating amazing web experiences. Whether you're looking to collaborate on a project, have questions about my work, or just want to chat about technology, I'm here to help!\n\nFeel free to explore my projects, skills, and experience. What would you like to know about me or my work?`,
        
        'hi': `Hi there! 👋 Great to have you visiting my portfolio!\n\nI'm excited to share my journey as a Full Stack Developer with you. From innovative web applications to scalable backend solutions, I love bringing ideas to life through code.\n\nWhat can I help you discover about my work or experience today?`,
        
        'hey': `Hey! 👋 Welcome to my corner of the internet!\n\nI'm Sachin Kumar, and I'm passionate about building digital solutions that make a difference. Whether you're a potential client, collaborator, or fellow developer, I'm happy you're here!\n\nHow can I assist you today?`,
        
        'thanks': `You're very welcome! 😊 I'm always happy to help.\n\nIs there anything else you'd like to know about my projects, experience, or how we might work together? I'm here to answer any questions you might have!`,
        
        'thank you': `My pleasure! 🙏 I really appreciate your interest in my work.\n\nDon't hesitate to reach out if you have more questions or if there's a project you'd like to discuss. I'm always excited about new opportunities and collaborations!`,
        
        'bye': `Goodbye! 👋 Thank you so much for taking the time to explore my portfolio.\n\nI hope you found what you were looking for! Feel free to come back anytime, and don't hesitate to reach out if you'd like to connect or discuss potential opportunities.\n\nHave a fantastic day! 😊`,
        
        'hire': `Fantastic! I'm always excited about new opportunities and collaborations! 🚀\n\n**Let's connect:**\n• Use the contact form below for detailed project discussions\n• Email me directly at sachinkumar6910@gmail.com\n• Connect on LinkedIn for professional networking\n\n**What I can offer:**\n• Custom web application development\n• Full-stack solutions from concept to deployment\n• Modern, responsive designs\n• Performance optimization\n• Technical consulting\n\nI'd love to learn about your project and how I can contribute to your success!`,
        
        'experience': `I'm excited to share my professional journey with you! 💼\n\n**My Experience Spans:**\n• **Web Development** - Building responsive, user-friendly applications\n• **Full-Stack Solutions** - From database design to frontend implementation\n• **API Development** - Creating robust backend services\n• **Performance Optimization** - Ensuring fast, scalable applications\n• **Team Collaboration** - Working effectively in agile environments\n• **Client Relations** - Understanding and delivering on business requirements\n\n**Industries I've Worked In:**\n• E-commerce & Retail\n• Education & Training\n• Healthcare & Medical\n• Finance & Fintech\n• Small Business Solutions\n\nCheck out the Experience section above for detailed work history and achievements!`,
        
        'portfolio': `Welcome to my digital showcase! 🎨 This portfolio represents my passion for creating exceptional web experiences.\n\n**What You'll Find Here:**\n• **Projects** - Real-world applications I've built\n• **Skills** - My technical expertise and tools\n• **Experience** - Professional journey and achievements\n• **About Me** - Personal story and approach\n• **Contact** - Ways to connect and collaborate\n\nEvery project represents hours of thoughtful development, problem-solving, and attention to detail. I believe great code should be both functional and beautiful!\n\nFeel free to explore and let me know if you'd like to discuss any specific project!`,
        
        'resume': `Great question! You can access my complete professional resume right here on the portfolio. 📄\n\n**Quick Access:**\n• Look for the "Download Resume" button in the About section\n• Direct PDF download with complete work history\n• Up-to-date with latest projects and skills\n• Professional format ready for HR review\n\n**Resume Highlights:**\n• Detailed work experience\n• Technical skills breakdown\n• Education and certifications\n• Contact information\n• Project achievements\n\nOrganizations love the clean, professional format! Feel free to download and share it.`,
        
        'services': `I offer comprehensive web development services tailored to your needs! 💼\n\n**Development Services:**\n• **Custom Web Applications** - Tailored solutions for your business\n• **E-Commerce Platforms** - Online stores with payment integration\n• **API Development** - Backend services and data management\n• **Website Redesign** - Modernizing existing applications\n• **Performance Optimization** - Speed and efficiency improvements\n• **Database Design** - Scalable data architecture\n\n**Technical Consultation:**\n• Technology stack recommendations\n• Architecture planning\n• Code reviews and optimization\n• Team training and mentoring\n\n**Process:**\n1. Free initial consultation\n2. Project planning and timeline\n3. Development with regular updates\n4. Testing and quality assurance\n5. Deployment and ongoing support\n\nReady to start your next project?`,
        
        'collaboration': `I'd love to collaborate with you! 🤝 I believe the best projects come from great partnerships.\n\n**I'm Open To:**\n• **Client Projects** - Custom development work\n• **Team Collaborations** - Joining development teams\n• **Open Source** - Contributing to community projects\n• **Mentoring** - Helping other developers grow\n• **Technical Partnerships** - Long-term business relationships\n\n**What I Bring:**\n• Reliable communication and project updates\n• Clean, well-documented code\n• Creative problem-solving approach\n• Commitment to deadlines and quality\n• Positive, professional attitude\n\n**My Collaboration Style:**\n• Regular check-ins and progress reports\n• Transparent about challenges and solutions\n• Open to feedback and iteration\n• Focus on understanding your vision\n\nLet's build something amazing together!`,
        
        // Additional keyword variations for better matching
        'who are you': `Hello! 👋 I'm Sachin Kumar, a passionate Full Stack Developer with a strong focus on creating innovative digital solutions. I specialize in building scalable web applications using cutting-edge technologies.\n\n🔧 **My Expertise:**\n• Frontend Development (React, Vue.js, JavaScript ES6+)\n• Backend Development (Node.js, Python, Express)\n• Database Design (MongoDB, MySQL, PostgreSQL)\n• Cloud Technologies (AWS, Azure, Firebase)\n• DevOps & Deployment (Docker, CI/CD)\n\nI believe in writing clean, maintainable code and creating user-centered experiences that make a difference. Let's build something amazing together!`,
        'what do you do': `I'm a Full Stack Developer who creates amazing digital experiences! 🚀\n\nI specialize in building complete web solutions - from beautiful, responsive frontends to powerful, scalable backends. Whether you need a simple website, complex web application, or custom API, I can help bring your ideas to life.\n\nI work with modern technologies like React, Node.js, Python, and cloud platforms to deliver high-quality solutions that perform well and look great!`,
        'technologies': `Great question! Here's my comprehensive technical skillset:\n\n💻 **Frontend Technologies:**\n• HTML5, CSS3, JavaScript (ES6+)\n• React.js, Vue.js, Angular\n• Responsive Design, Bootstrap, Tailwind CSS\n• Progressive Web Apps (PWA)\n\n⚡ **Backend Development:**\n• Node.js, Express.js\n• Python, Django, Flask\n• RESTful APIs, GraphQL\n• Microservices Architecture\n\n🗄️ **Databases & Storage:**\n• MySQL, PostgreSQL (SQL)\n• MongoDB, Firebase (NoSQL)\n• Redis, Elasticsearch\n\n☁️ **DevOps & Tools:**\n• Git, GitHub/GitLab\n• Docker, Kubernetes\n• AWS, Azure, Google Cloud\n• CI/CD Pipelines\n\nVisit the Skills section for more details!`,
        'tools': `Great question! Here's my comprehensive technical skillset:\n\n💻 **Frontend Technologies:**\n• HTML5, CSS3, JavaScript (ES6+)\n• React.js, Vue.js, Angular\n• Responsive Design, Bootstrap, Tailwind CSS\n• Progressive Web Apps (PWA)\n\n⚡ **Backend Development:**\n• Node.js, Express.js\n• Python, Django, Flask\n• RESTful APIs, GraphQL\n• Microservices Architecture\n\n🗄️ **Databases & Storage:**\n• MySQL, PostgreSQL (SQL)\n• MongoDB, Firebase (NoSQL)\n• Redis, Elasticsearch\n\n☁️ **DevOps & Tools:**\n• Git, GitHub/GitLab\n• Docker, Kubernetes\n• AWS, Azure, Google Cloud\n• CI/CD Pipelines\n\nVisit the Skills section for more details!`,
        'work': `I'm excited to share my professional journey with you! 💼\n\n**My Experience Spans:**\n• **Web Development** - Building responsive, user-friendly applications\n• **Full-Stack Solutions** - From database design to frontend implementation\n• **API Development** - Creating robust backend services\n• **Performance Optimization** - Ensuring fast, scalable applications\n• **Team Collaboration** - Working effectively in agile environments\n• **Client Relations** - Understanding and delivering on business requirements\n\n**Industries I've Worked In:**\n• E-commerce & Retail\n• Education & Training\n• Healthcare & Medical\n• Finance & Fintech\n• Small Business Solutions\n\nCheck out the Experience section above for detailed work history and achievements!`,
        'freelance': `Yes, I'm available for freelance work and custom projects! 🚀\n\n**Freelance Services I Offer:**\n• Custom web application development\n• Website redesign and modernization\n• API development and integration\n• Performance optimization\n• Technical consulting\n• Code review and refactoring\n\n**My Process:**\n1. Free consultation to understand your needs\n2. Detailed project proposal with timeline\n3. Regular updates and milestone deliveries\n4. Testing and quality assurance\n5. Deployment and ongoing support\n\n**Why Work With Me:**\n• Transparent communication\n• High-quality, maintainable code\n• On-time delivery\n• Competitive rates\n• Long-term support available\n\nReady to discuss your project? Use the contact form below!`,
        'available': `Yes, I'm currently available for new projects! 🎯\n\n**Current Availability:**\n• Open for freelance projects\n• Available for team collaboration\n• Interested in full-time opportunities\n• Ready for technical consulting\n\n**Response Time:**\n• Initial consultation: Within 24 hours\n• Detailed proposals: 2-3 business days\n• Project kickoff: As soon as next week\n\n**Best Ways to Connect:**\n• Contact form below (fastest response)\n• Email: sachinkumar6910@gmail.com\n• LinkedIn: linkedin.com/in/sachinkumar\n\nLet's discuss how I can help with your next project!`,
        'cost': `I offer fair, competitive pricing for high-quality work! 💰\n\n**Pricing Structure:**\n• **Hourly Rate** - For ongoing work and consulting\n• **Project-Based** - Fixed price for defined scope\n• **Retainer** - Monthly packages for ongoing support\n\n**Factors That Influence Cost:**\n• Project complexity and scope\n• Timeline requirements\n• Technology stack needed\n• Ongoing support requirements\n\n**Free Services:**\n• Initial consultation (30 minutes)\n• Project assessment and proposal\n• Technology recommendations\n\n**Value I Provide:**\n• Professional, clean code\n• Mobile-responsive designs\n• Performance optimization\n• SEO-friendly implementation\n• Ongoing support options\n\nContact me for a custom quote tailored to your specific needs!`,
        'price': `I offer fair, competitive pricing for high-quality work! 💰\n\n**Pricing Structure:**\n• **Hourly Rate** - For ongoing work and consulting\n• **Project-Based** - Fixed price for defined scope\n• **Retainer** - Monthly packages for ongoing support\n\n**Factors That Influence Cost:**\n• Project complexity and scope\n• Timeline requirements\n• Technology stack needed\n• Ongoing support requirements\n\n**Free Services:**\n• Initial consultation (30 minutes)\n• Project assessment and proposal\n• Technology recommendations\n\n**Value I Provide:**\n• Professional, clean code\n• Mobile-responsive designs\n• Performance optimization\n• SEO-friendly implementation\n• Ongoing support options\n\nContact me for a custom quote tailored to your specific needs!`,
        'github': `Great! You can find all my code and projects on GitHub! 💻\n\n**GitHub Profile:**\n🔗 **github.com/sachinkumar6910-cloud**\n\n**What You'll Find:**\n• Complete source code for my projects\n• Open-source contributions\n• Code samples and demos\n• Technical documentation\n• Collaboration history\n\n**Featured Repositories:**\n• Portfolio website (this site!)\n• E-commerce applications\n• Web development templates\n• API projects and microservices\n• Learning projects and experiments\n\n**Why Check My GitHub:**\n• See my coding style and practices\n• Review actual project architecture\n• Understand my development process\n• View commit history and consistency\n\nFeel free to explore, fork, or contribute to any of my public repositories!`,
        'linkedin': `I'd love to connect with you on LinkedIn! 🌐\n\n**LinkedIn Profile:**\n🔗 **linkedin.com/in/sachinkumar**\n\n**What's on My LinkedIn:**\n• Professional experience and achievements\n• Skill endorsements and recommendations\n• Industry insights and posts\n• Professional network and connections\n• Certifications and courses\n\n**Why Connect:**\n• Stay updated on my latest projects\n• Professional networking opportunities\n• Industry discussions and insights\n• Job opportunities and collaborations\n• Skill development and learning\n\n**Active Presence:**\n• Regular posts about web development\n• Sharing industry best practices\n• Engaging with the developer community\n• Updates on new projects and achievements\n\nLet's expand our professional networks together!`,
        'email': `I'd love to hear from you via email! 📧\n\n**Email Address:**\n✉️ **sachinkumar6910@gmail.com**\n\n**Best For:**\n• Detailed project discussions\n• Formal business inquiries\n• File sharing and attachments\n• Contract and proposal reviews\n• Technical consultations\n\n**Response Time:**\n• Business inquiries: Within 4-6 hours\n• Technical questions: Within 24 hours\n• Project proposals: 2-3 business days\n\n**What to Include:**\n• Brief description of your project\n• Timeline expectations\n• Budget considerations\n• Any specific requirements\n• Preferred communication method\n\n**Alternative Contact:**\nFor quick questions, try the contact form below - it's often faster than email!`,
        
        'default': `Thanks for your message! I appreciate you reaching out. 💬\n\nWhile I'm still learning to understand all types of questions, I can definitely help you with:\n\n**About My Work:**\n• My technical skills and expertise\n• Projects I've worked on\n• Professional experience and background\n• Services I offer\n\n**Getting Connected:**\n• Contact information and availability\n• Collaboration opportunities\n• Hiring and project discussions\n\n**Quick Actions:**\nTry using the quick action buttons above, or feel free to rephrase your question! I'm here to help however I can.\n\nWhat would you like to know about my work or experience?`
    },

    init() {
        this.btn = document.getElementById('chatbot-btn');
        this.window = document.getElementById('chatbot-window');
        this.closeBtn = document.getElementById('chatbot-close');
        this.messagesContainer = document.getElementById('chatbot-messages');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send');
        this.chatIcon = document.getElementById('chat-icon');
        this.closeIcon = document.getElementById('close-icon');
        this.quickActions = document.querySelectorAll('.quick-action-btn');
        
        // Initialize conversation tracking
        this.conversationHistory = [];
        this.sessionStartTime = new Date().toISOString();
        this.conversationId = 'chat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

        if (!this.btn) return;

        this.bindEvents();
        
        // Send final summary when user leaves the page (if chat was active)
        window.addEventListener('beforeunload', () => {
            if (this.conversationHistory.length > 1) {
                // Use sendBeacon for reliable sending during page unload
                const finalSummary = {
                    conversationId: this.conversationId,
                    sessionEndTime: new Date().toISOString(),
                    totalExchanges: this.conversationHistory.filter(msg => msg.type === 'user').length,
                    duration: this.getConversationDuration(),
                    type: 'page_unload_summary'
                };
                
                try {
                    navigator.sendBeacon('https://formspree.io/f/mgonywjy', new FormData(Object.assign(document.createElement('form'), {
                        innerHTML: `
                            <input name="subject" value="🚪 Chat Session Ended - User Left Page (${finalSummary.totalExchanges} exchanges)">
                            <input name="message" value="A visitor left your portfolio with an active chat session.\n\n📊 Session Summary:\n• Duration: ${finalSummary.duration}\n• Exchanges: ${finalSummary.totalExchanges}\n• Session ID: ${finalSummary.conversationId}\n• End Time: ${new Date(finalSummary.sessionEndTime).toLocaleString()}\n\n💡 Check previous emails for complete conversation details!">
                            <input name="_replyto" value="portfolio-visitor@sachinkumar.dev">
                        `
                    })));
                } catch (e) {
                    // Fallback - save locally
                    this.saveFinalSummaryLocally(finalSummary);
                }
            }
        });
    },

    bindEvents() {
        // Toggle chat window
        this.btn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());

        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick actions
        this.quickActions.forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.dataset.message;
                this.addUserMessage(message);
                
                // Process message and get response
                const botResponse = this.getResponse(message.toLowerCase());
                
                // Add to conversation history
                this.conversationHistory.push({
                    type: 'user',
                    message: message,
                    timestamp: new Date().toISOString()
                });
                this.conversationHistory.push({
                    type: 'bot',
                    message: botResponse,
                    timestamp: new Date().toISOString()
                });
                
                // Send complete conversation to backend
                this.sendCompleteConversation();
                
                // Display response
                this.processMessage(message);
                btn.style.display = 'none';
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.chatbot-container') && this.window.classList.contains('active')) {
                // Don't close on outside click for better UX
            }
        });
    },

    toggleChat() {
        this.window.classList.toggle('active');
        this.btn.classList.toggle('active');

        if (this.window.classList.contains('active')) {
            this.chatIcon.style.display = 'none';
            this.closeIcon.style.display = 'block';
            this.input.focus();
            
            // Add welcome message to conversation history if this is the first time opening
            if (this.conversationHistory.length === 0) {
                const welcomeMessage = "Hi! Welcome to my portfolio. I'll be assisting you here today.";
                this.conversationHistory.push({
                    type: 'bot',
                    message: welcomeMessage,
                    timestamp: new Date().toISOString()
                });
                
                // Display the welcome message in the chat if not already there
                if (this.messagesContainer.children.length === 0) {
                    this.addBotMessage(welcomeMessage);
                }
            }
        } else {
            this.chatIcon.style.display = 'block';
            this.closeIcon.style.display = 'none';
        }
    },

    closeChat() {
        this.window.classList.remove('active');
        this.btn.classList.remove('active');
        this.chatIcon.style.display = 'block';
        this.closeIcon.style.display = 'none';
        
        // Send final conversation summary when chat is closed (if there was interaction)
        if (this.conversationHistory.length > 1) { // More than just welcome message
            this.sendFinalConversationSummary();
        }
    },

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        this.addUserMessage(message);
        this.input.value = '';
        
        // Process message and get response first
        const botResponse = this.getResponse(message.toLowerCase());
        
        // Add to conversation history
        this.conversationHistory.push({
            type: 'user',
            message: message,
            timestamp: new Date().toISOString()
        });
        this.conversationHistory.push({
            type: 'bot',
            message: botResponse,
            timestamp: new Date().toISOString()
        });
        
        // Send complete conversation to backend/email service
        this.sendCompleteConversation();
        
        // Show typing animation and display response
        this.processMessage(message);
    },

    // NEW: Send complete conversation thread to backend/email service
    async sendCompleteConversation() {
        if (this.conversationHistory.length === 0) return;
        
        const conversationData = {
            conversationId: this.conversationId,
            sessionStartTime: this.sessionStartTime,
            conversationHistory: this.conversationHistory,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            page: window.location.href,
            type: 'complete_chatbot_conversation'
        };
        
        // Format the complete conversation for email
        let conversationText = `🎭 COMPLETE CHATBOT CONVERSATION THREAD\n\n`;
        conversationText += `🆔 Conversation ID: ${this.conversationId}\n`;
        conversationText += `⏰ Session Started: ${new Date(this.sessionStartTime).toLocaleString()}\n`;
        conversationText += `📱 Total Messages: ${this.conversationHistory.length}\n\n`;
        conversationText += `💬 FULL CONVERSATION:\n${'='.repeat(50)}\n\n`;
        
        this.conversationHistory.forEach((msg, index) => {
            const time = new Date(msg.timestamp).toLocaleTimeString();
            if (msg.type === 'user') {
                conversationText += `👤 [${time}] VISITOR: ${msg.message}\n\n`;
            } else {
                conversationText += `🤖 [${time}] CHATBOT: ${msg.message}\n\n`;
                conversationText += `${'-'.repeat(40)}\n\n`;
            }
        });
        
        conversationText += `📊 CONVERSATION SUMMARY:\n`;
        conversationText += `• Duration: ${this.getConversationDuration()}\n`;
        conversationText += `• Messages Exchanged: ${this.conversationHistory.length / 2} exchanges\n`;
        conversationText += `• Page: ${conversationData.page}\n`;
        conversationText += `• Browser: ${conversationData.userAgent.substring(0, 100)}...\n\n`;
        conversationText += `💡 This visitor had a complete conversation with your portfolio chatbot!`;

        try {
            // Send to Formspree (email service) - ACTIVE
            await fetch('https://formspree.io/f/mgonywjy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: `Complete Chatbot Conversation Thread - ${this.conversationHistory.length / 2} exchanges`,
                    message: conversationText,
                    _replyto: 'portfolio-visitor@sachinkumar.dev'
                })
            });

            // Also save locally for backup/analytics
            this.saveCompleteConversationLocally(conversationData);
            console.log('🎭 Complete chatbot conversation thread sent to email!');
            
        } catch (error) {
            console.log('Conversation thread sending failed, saved locally:', error);
            // Still save locally even if sending fails
            this.saveCompleteConversationLocally(conversationData);
        }
    },

    // Send final comprehensive conversation summary when chat session ends
    async sendFinalConversationSummary() {
        if (this.conversationHistory.length <= 1) return;
        
        const finalData = {
            conversationId: this.conversationId,
            sessionStartTime: this.sessionStartTime,
            sessionEndTime: new Date().toISOString(),
            conversationHistory: this.conversationHistory,
            totalExchanges: Math.floor(this.conversationHistory.filter(msg => msg.type === 'user').length),
            duration: this.getConversationDuration(),
            userAgent: navigator.userAgent,
            page: window.location.href,
            type: 'final_conversation_summary'
        };
        
        let summaryText = `🎯 FINAL CONVERSATION SUMMARY\n\n`;
        summaryText += `🆔 Session ID: ${this.conversationId}\n`;
        summaryText += `⏰ Session Duration: ${finalData.duration}\n`;
        summaryText += `💬 Total Exchanges: ${finalData.totalExchanges}\n`;
        summaryText += `📅 Started: ${new Date(this.sessionStartTime).toLocaleString()}\n`;
        summaryText += `🏁 Ended: ${new Date(finalData.sessionEndTime).toLocaleString()}\n\n`;
        
        summaryText += `📝 COMPLETE CONVERSATION THREAD:\n${'='.repeat(60)}\n\n`;
        
        this.conversationHistory.forEach((msg, index) => {
            const time = new Date(msg.timestamp).toLocaleTimeString();
            if (msg.type === 'user') {
                summaryText += `${index + 1}. 👤 [${time}] VISITOR: "${msg.message}"\n\n`;
            } else {
                summaryText += `${index + 1}. 🤖 [${time}] CHATBOT: "${msg.message.substring(0, 200)}${msg.message.length > 200 ? '...' : ''}"\n\n`;
            }
        });
        
        summaryText += `${'='.repeat(60)}\n\n`;
        summaryText += `📊 ENGAGEMENT ANALYSIS:\n`;
        summaryText += `• User Engagement Level: ${finalData.totalExchanges >= 3 ? 'High' : finalData.totalExchanges >= 2 ? 'Medium' : 'Low'}\n`;
        summaryText += `• Conversation Quality: ${this.conversationHistory.length >= 6 ? 'Deep Discussion' : 'Quick Inquiry'}\n`;
        summaryText += `• Visit Page: ${finalData.page}\n`;
        summaryText += `• Browser: ${finalData.userAgent.substring(0, 80)}...\n\n`;
        summaryText += `🚀 This visitor completed a full conversation session on your portfolio!`;

        try {
            await fetch('https://formspree.io/f/mgonywjy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: `🎯 FINAL Conversation Summary - ${finalData.totalExchanges} exchanges (${finalData.duration})`,
                    message: summaryText,
                    _replyto: 'portfolio-visitor@sachinkumar.dev'
                })
            });

            this.saveFinalSummaryLocally(finalData);
            console.log('🎯 Final conversation summary sent to email!');
            
        } catch (error) {
            console.log('Final summary sending failed, saved locally:', error);
            this.saveFinalSummaryLocally(finalData);
        }
    },

    // Save final summary locally
    saveFinalSummaryLocally(finalData) {
        let finalSummaries = JSON.parse(localStorage.getItem('finalConversationSummaries') || '[]');
        finalSummaries.push(finalData);
        localStorage.setItem('finalConversationSummaries', JSON.stringify(finalSummaries));
    },

    // Get conversation duration
    getConversationDuration() {
        if (this.conversationHistory.length === 0) return '0 seconds';
        
        const start = new Date(this.sessionStartTime);
        const end = new Date();
        const seconds = Math.floor((end - start) / 1000);
        
        if (seconds < 60) return `${seconds} seconds`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes`;
        return `${Math.floor(seconds / 3600)} hours ${Math.floor((seconds % 3600) / 60)} minutes`;
    },

    // NEW: Send complete conversation to backend/email service
    async sendToBackend(userMessage, botResponse) {
        const conversationData = {
            userMessage: userMessage,
            botResponse: botResponse,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            page: window.location.href,
            type: 'chatbot'
        };

        try {
            // Option 2: Send to Formspree (email service) - ACTIVE
            await fetch('https://formspree.io/f/mgonywjy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    subject: 'New Chatbot Conversation from Portfolio',
                    message: `🤖 COMPLETE CHATBOT CONVERSATION:

` + 
                            `👤 VISITOR ASKED:
${userMessage}

` +
                            `🤖 CHATBOT REPLIED:
${botResponse}

` +
                            `📊 CONVERSATION DETAILS:
` +
                            `• Time: ${new Date(conversationData.timestamp).toLocaleString()}
` +
                            `• Page: ${conversationData.page}
` +
                            `• Browser: ${conversationData.userAgent.substring(0, 100)}...

` +
                            `💡 This visitor engaged with your portfolio chatbot!`,
                    _replyto: 'portfolio-visitor@sachinkumar.dev'
                })
            });

            // Also save locally for backup/analytics
            this.saveConversationLocally(conversationData);
            console.log('💬 Complete chatbot conversation sent to email!');
            
        } catch (error) {
            console.log('Conversation sending failed, saved locally:', error);
            // Still save locally even if sending fails
            this.saveConversationLocally(conversationData);
        }
    },

    // Save messages locally for development/testing
    saveCompleteConversationLocally(conversationData) {
        let completeConversations = JSON.parse(localStorage.getItem('completeConversations') || '[]');
        completeConversations.push(conversationData);
        localStorage.setItem('completeConversations', JSON.stringify(completeConversations));
        
        // Also keep backward compatibility with old formats
        this.saveConversationLocally({
            userMessage: 'Complete Conversation Thread',
            botResponse: `${conversationData.conversationHistory.length} messages exchanged`,
            timestamp: conversationData.timestamp,
            page: conversationData.page,
            type: 'complete_conversation'
        });
    },

    saveConversationLocally(conversationData) {
        let conversations = JSON.parse(localStorage.getItem('chatConversations') || '[]');
        conversations.push(conversationData);
        localStorage.setItem('chatConversations', JSON.stringify(conversations));
        
        // Also keep the old format for backward compatibility
        let messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.push({
            message: conversationData.userMessage,
            response: conversationData.botResponse,
            timestamp: conversationData.timestamp,
            type: 'conversation'
        });
        localStorage.setItem('chatMessages', JSON.stringify(messages));
    },

    saveMessageLocally(messageData) {
        const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
        messages.push(messageData);
        localStorage.setItem('chatMessages', JSON.stringify(messages));
        console.log('Message saved locally:', messageData);
    },

    addUserMessage(message) {
        const messageHTML = `
            <div class="chat-message user">
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <p>${this.escapeHtml(message)}</p>
                </div>
            </div>
        `;
        this.messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    },

    addBotMessage(message) {
        const messageHTML = `
            <div class="chat-message bot">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
            </div>
        `;
        this.messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        this.scrollToBottom();
    },

    showTyping() {
        const typingHTML = `
            <div class="chat-message bot typing-message">
                <div class="message-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        this.scrollToBottom();
    },

    hideTyping() {
        const typing = this.messagesContainer.querySelector('.typing-message');
        if (typing) typing.remove();
    },

    processMessage(message) {
        this.showTyping();

        setTimeout(() => {
            this.hideTyping();
            const response = this.getResponse(message.toLowerCase());
            this.addBotMessage(response);
        }, 1000 + Math.random() * 500);
    },

    getResponse(message) {
        // Store the original message for context
        const originalMessage = message;
        message = message.toLowerCase().trim();
        
        // Personal name recognition and response
        if (this.detectName(message)) {
            const name = this.extractName(originalMessage);
            return `Nice to meet you${name ? `, ${name}` : ''}! 👋 I'm Sachin Kumar, and I'm excited to connect with you.\n\nSince you're here, I'd love to learn more about what brings you to my portfolio. Are you:\n\n• Looking to collaborate on a project? 🤝\n• Interested in hiring me for development work? 💼\n• Curious about my technical skills and experience? 🔧\n• Wanting to see examples of my work? 🚀\n\nFeel free to tell me what you'd like to know!`;
        }
        
        // Project/App development inquiries
        if (this.matchesPattern(message, ['build', 'develop', 'create', 'make', 'app', 'application', 'website', 'system', 'platform', 'project'])) {
            return `Absolutely! I'd love to help you build your app! 🚀\n\n**I can help you create:**\n• **Web Applications** - Modern, responsive web apps\n• **Mobile-Friendly Apps** - Cross-platform solutions\n• **E-Commerce Platforms** - Online stores with payment integration\n• **Business Applications** - Custom solutions for your needs\n• **API Development** - Backend services and data management\n• **Database Systems** - Scalable data architecture\n\n**My Development Process:**\n1. **Discovery Call** - Understanding your vision and requirements\n2. **Planning & Design** - UI/UX mockups and technical architecture\n3. **Development** - Building with regular progress updates\n4. **Testing & Launch** - Quality assurance and deployment\n5. **Support** - Ongoing maintenance and improvements\n\n**What type of app are you looking to build?** Tell me about your idea, and I'll provide specific guidance and a custom approach!`;
        }
        
        // Pricing and cost inquiries
        if (this.matchesPattern(message, ['cost', 'price', 'budget', 'expensive', 'cheap', 'rate', 'fee', 'charge', 'money'])) {
            return `Great question about pricing! 💰 I believe in transparent, fair pricing for quality work.\n\n**Pricing Structure:**\n• **Simple Websites**: $500 - $2,000\n• **Web Applications**: $2,000 - $8,000+\n• **E-Commerce Sites**: $1,500 - $5,000+\n• **Custom Apps**: $3,000 - $15,000+\n• **Hourly Rate**: $30 - $75/hour\n\n**What Influences Cost:**\n• Complexity and features needed\n• Design requirements (custom vs template)\n• Timeline and urgency\n• Integrations (payments, APIs, etc.)\n• Ongoing support needs\n\n**FREE Services:**\n• Initial consultation (30 minutes)\n• Project assessment and proposal\n• Technology recommendations\n\n**Ready to get a quote?** Tell me about your project requirements, and I'll provide a detailed estimate tailored to your needs!`;
        }
        
        // Timeline and availability
        if (this.matchesPattern(message, ['when', 'timeline', 'how long', 'available', 'start', 'deadline', 'time'])) {
            return `Great question about timing! ⏰ I'm currently available for new projects.\n\n**Current Availability:**\n• **New Projects**: Ready to start within 1-2 weeks\n• **Rush Projects**: Can prioritize for urgent needs\n• **Consultations**: Available this week for project discussions\n\n**Typical Project Timelines:**\n• **Simple Website**: 1-2 weeks\n• **Business Website**: 2-4 weeks\n• **Web Application**: 4-8 weeks\n• **E-Commerce Site**: 3-6 weeks\n• **Custom App**: 6-12 weeks\n\n**My Process:**\n• **Week 1**: Planning, design, and architecture\n• **Development Phase**: Regular updates every 2-3 days\n• **Testing**: Thorough QA before delivery\n• **Launch**: Deployment and go-live support\n\n**Do you have a specific deadline in mind?** Let me know your target launch date, and I'll create a custom timeline for your project!`;
        }
        
        // Technology and technical questions
        if (this.matchesPattern(message, ['technology', 'tech', 'language', 'framework', 'database', 'hosting', 'deployment'])) {
            return this.responses['what are your skills'];
        }
        
        // Portfolio and work examples
        if (this.matchesPattern(message, ['portfolio', 'work', 'examples', 'projects', 'showcase', 'previous', 'experience'])) {
            return this.responses['show me your projects'];
        }
        
        // Contact and communication
        if (this.matchesPattern(message, ['contact', 'reach', 'email', 'phone', 'message', 'talk', 'discuss', 'call'])) {
            return this.responses['how can i contact you'];
        }
        
        // Hiring and collaboration
        if (this.matchesPattern(message, ['hire', 'job', 'work together', 'collaborate', 'team', 'join', 'position'])) {
            return this.responses['hire'];
        }
        
        // About and introduction
        if (this.matchesPattern(message, ['about', 'who are you', 'background', 'story', 'bio', 'introduction'])) {
            return this.responses['tell me about yourself'];
        }
        
        // Gratitude and positive responses
        if (this.matchesPattern(message, ['thanks', 'thank you', 'great', 'awesome', 'perfect', 'excellent', 'good'])) {
            return `Thank you so much! 😊 I really appreciate your kind words.\n\n**I'm here to help with:**\n• Answering questions about my services\n• Discussing your project ideas\n• Providing technical guidance\n• Sharing my experience and expertise\n\n**What would you like to explore next?**\n• See examples of my work? 📂\n• Discuss a specific project? 💡\n• Learn about my development process? ⚙️\n• Get a custom quote for your idea? 💰\n\nJust let me know how I can assist you further!`;
        }
        
        // Questions and inquiries
        if (this.matchesPattern(message, ['how', 'what', 'why', 'can you', 'do you', '?'])) {
            return `That's a great question! 🤔 I want to make sure I give you the most helpful answer.\n\n**I can help you with:**\n• **Technical Questions** - Development, frameworks, best practices\n• **Project Planning** - Timeline, scope, and requirements\n• **Service Information** - What I offer and how I work\n• **Portfolio Questions** - Examples of my work and experience\n• **Business Inquiries** - Pricing, availability, and proposals\n\n**Could you tell me more specifically what you'd like to know?** For example:\n• "How do you handle e-commerce projects?"\n• "What's your experience with React?"\n• "Can you work with my existing team?"\n• "What's included in your web development service?"\n\nThe more details you share, the better I can assist you!`;
        }
        
        // Fallback to keyword matching for existing responses
        for (const [key, value] of Object.entries(this.responses)) {
            if (message.includes(key)) {
                return value;
            }
        }
        
        // Intelligent default response based on message content
        return this.getIntelligentDefault(message);
    },
    
    // Helper function to detect names in messages
    detectName(message) {
        const namePatterns = [
            /my name is (\w+)/i,
            /i'm (\w+)/i, 
            /i am (\w+)/i,
            /call me (\w+)/i,
            /this is (\w+)/i,
            /(\w+) here/i
        ];
        return namePatterns.some(pattern => pattern.test(message));
    },
    
    // Extract name from message
    extractName(message) {
        const namePatterns = [
            /my name is (\w+)/i,
            /i'm (\w+)/i, 
            /i am (\w+)/i,
            /call me (\w+)/i,
            /this is (\w+)/i,
            /(\w+) here/i
        ];
        
        for (let pattern of namePatterns) {
            const match = message.match(pattern);
            if (match && match[1]) {
                // Capitalize first letter
                return match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
            }
        }
        return null;
    },
    
    // Check if message matches any patterns from a keyword list
    matchesPattern(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    },
    
    // Provide more intelligent default responses based on content analysis
    getIntelligentDefault(message) {
        // Analyze message length and complexity for better response
        if (message.length < 10) {
            return `I'd love to help! 😊 Could you tell me a bit more about what you're looking for?\n\n**Try asking me about:**\n• My development services and expertise 💻\n• Specific projects you want to build 🚀\n• Pricing and timelines ⏰\n• Examples of my previous work 📂\n• How we can work together 🤝\n\nWhat interests you most?`;
        } else {
            return `Thanks for your detailed message! 💬 I appreciate you taking the time to reach out.\n\n**I want to make sure I address your specific needs.** Could you help me understand:\n\n• **Are you looking to hire a developer?** 💼\n• **Do you have a specific project in mind?** 🎯\n• **Are you interested in my technical expertise?** 🔧\n• **Would you like to see examples of my work?** 📋\n\n**Feel free to rephrase your question** or use the quick action buttons above for common topics. I'm here to provide the information that's most valuable to you!\n\nWhat would be most helpful for your situation?`;
        }
    },

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    },

    // Add admin panel to view conversations (for development)
    showAdminPanel() {
        const completeConversations = JSON.parse(localStorage.getItem('completeConversations') || '[]');
        
        const adminPanel = document.createElement('div');
        adminPanel.style.cssText = `
            position: fixed;
            top: 10px;
            left: 10px;
            background: white;
            border: 2px solid #6366f1;
            border-radius: 8px;
            padding: 1rem;
            max-width: 600px;
            max-height: 500px;
            overflow-y: auto;
            z-index: 99999;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        `;
        
        adminPanel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 style="margin: 0; color: #6366f1;">🎭 Complete Conversation Threads (${completeConversations.length})</h3>
                <button onclick="this.parentElement.parentElement.remove()" style="background: #ef4444; color: white; border: none; border-radius: 50%; width: 24px; height: 24px; cursor: pointer;">×</button>
            </div>
            <div class="conversations-list">
                ${completeConversations.length === 0 ? '<p>No complete conversations yet</p>' : 
                  completeConversations.map((conv, index) => `
                    <div style="margin-bottom: 20px; padding: 15px; border: 2px solid #e0e0e0; border-radius: 8px; background: #f9f9f9;">
                        <div style="font-weight: bold; color: #333; margin-bottom: 10px;">
                            🎭 Conversation Thread #${index + 1}
                            <span style="font-size: 12px; color: #666;">(ID: ${conv.conversationId})</span>
                        </div>
                        <div style="background: #e8f5e8; padding: 8px; border-radius: 5px; margin-bottom: 8px; font-size: 12px;">
                            📊 <strong>Summary:</strong> ${conv.conversationHistory.length} messages • Started: ${new Date(conv.sessionStartTime).toLocaleString()}
                        </div>
                        <div style="max-height: 200px; overflow-y: auto; border: 1px solid #ddd; padding: 8px; background: white; border-radius: 4px;">
                            ${conv.conversationHistory.map((msg, msgIndex) => `
                                <div style="margin-bottom: 5px; padding: 4px; ${msg.type === 'user' ? 'background: #e3f2fd; border-left: 3px solid #2196f3;' : 'background: #f3e5f5; border-left: 3px solid #9c27b0;'}">
                                    <strong>${msg.type === 'user' ? '👤 Visitor' : '🤖 Chatbot'}:</strong>
                                    <em style="font-size: 11px; color: #666;">[${new Date(msg.timestamp).toLocaleTimeString()}]</em><br>
                                    <span style="font-size: 12px;">${msg.message.substring(0, 100)}${msg.message.length > 100 ? '...' : ''}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                  `).join('')}
            </div>
            <div style="border-top: 1px solid #eee; padding-top: 10px; margin-top: 10px;">
                <button onclick="localStorage.removeItem('completeConversations'); localStorage.removeItem('chatConversations'); localStorage.removeItem('chatMessages'); this.parentElement.remove();" 
                        style="background: #ef4444; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; margin-right: 8px;">
                    Clear All Data
                </button>
                <button onclick="this.parentElement.remove();" 
                        style="background: #6b7280; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">
                    Close
                </button>
            </div>
        `;
        
        document.body.appendChild(adminPanel);
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize Chatbot when DOM is ready
// document.addEventListener('DOMContentLoaded', () => {
//     Chatbot.init();
// });

// Developer Tools: Access message admin panels
// Contact Form Messages: ContactForm.showAdminPanel()
// Chatbot Messages: Chatbot.showAdminPanel()
// Or add ?debug=true to URL for chatbot panel
if (window.location.search.includes('debug=true')) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            Chatbot.showAdminPanel();
            ContactForm.showAdminPanel();
        }, 1000);
    });
}
