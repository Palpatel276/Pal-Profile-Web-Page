document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Custom Cursor
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .contact-icon, .btn-project');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 50);
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.style.width = '60px';
            follower.style.height = '60px';
            follower.style.borderColor = 'var(--accent-blue)';
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.style.width = '40px';
            follower.style.height = '40px';
            follower.style.borderColor = 'var(--accent-purple)';
        });
    });

    // Scroll Progress
    const scrollProgress = document.querySelector('.scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Magnetic Effect
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = 'translate(0, 0)';
        });
    });

    // Terminal Typing Animation
    const terminalText = document.querySelector('.typing');
    if (terminalText) {
        const text = terminalText.textContent;
        terminalText.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                terminalText.textContent += text.charAt(i);
                i++;
                setTimeout(type, 100);
            }
        }
        
        // Start typing when section is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                type();
                observer.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.terminal-window'));
    }

    // Enhanced Scroll Reveal with Parallax
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach((el, index) => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < windowHeight - elementVisible) {
                // Add a slight delay based on index for a staggered effect
                setTimeout(() => {
                    el.classList.add('active');
                }, index % 3 * 100);
            }
        });
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero avatar
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) / 50;
            const moveY = (e.clientY - window.innerHeight / 2) / 50;
            heroVisual.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Theme Toggle & System Preference
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const setTheme = (isDark) => {
        if (isDark) {
            body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
        }
    };

    // 1. Initial Load: Check localStorage first, then System Preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        setTheme(systemPrefersDark.matches);
    }

    // 2. Toggle button click: Explicitly sets a manual preference
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isCurrentlyLight = body.classList.contains('light-mode');
            setTheme(isCurrentlyLight); // If light, set to dark (isCurrentlyLight=true means setTheme(true) which is dark)
        });
    }

    // 3. Listen for system theme changes: Only auto-updates if no manual preference is stored
    systemPrefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });

    // Parallax Effect for Orbs
    window.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelectorAll('.orb').forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks && mobileMenuBtn && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Threat Feed Simulator
    const threatList = document.getElementById('threat-list');
    const threats = [
        { type: 'SQLi ATTEMPT', ip: '192.168.1.45' },
        { type: 'BRUTE FORCE', ip: '45.12.88.2' },
        { type: 'MALWARE BLOCK', ip: '10.0.0.124' },
        { type: 'XSS DETECTED', ip: '172.16.0.5' },
        { type: 'DDoS FILTER', ip: '104.21.7.12' }
    ];

    if (threatList) {
        function addThreat() {
            const threat = threats[Math.floor(Math.random() * threats.length)];
            const item = document.createElement('div');
            item.className = 'threat-item';
            item.innerHTML = `
                <span class="type">[${threat.type}]</span>
                <span class="ip">${threat.ip}</span>
            `;
            threatList.prepend(item);
            if (threatList.children.length > 5) {
                threatList.removeChild(threatList.lastChild);
            }
        }
        setInterval(addThreat, 3000);
    }

    // OSINT Simulator in Terminal
    const terminalBody = document.querySelector('.terminal-body');
    if (terminalBody) {
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        inputLine.innerHTML = `
            <span class="prompt">></span>
            <input type="text" id="osint-input" placeholder="audit system..." spellcheck="false">
        `;
        terminalBody.appendChild(inputLine);

        const osintInput = document.getElementById('osint-input');
        if (osintInput) {
            osintInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && osintInput.value.trim() !== '') {
                    const target = osintInput.value.trim();
                    osintInput.disabled = true;
                    runAudit(target);
                }
            });
        }
    }

    async function runAudit(target) {
        if (!terminalBody) return;
        const steps = [
            `> INITIALIZING SECURITY AUDIT FOR: ${target}`,
            `> SCANNING NETWORK PORTS...`,
            `> ANALYZING ENCRYPTION PROTOCOLS...`,
            `> CHECKING DATA LEAK DATABASES...`,
            `> RESULTS: SYSTEM IS SECURE. NO VULNERABILITIES FOUND.`,
            `> LOGS SAVED TO /var/log/audit.log`
        ];

        for (const step of steps) {
            const line = document.createElement('p');
            line.className = 'terminal-line';
            line.style.color = '#00d2ff';
            line.textContent = step;
            terminalBody.insertBefore(line, document.querySelector('.terminal-input-line'));
            await new Promise(r => setTimeout(r, 800));
        }
        
        const osintInput = document.getElementById('osint-input');
        if (osintInput) {
            osintInput.value = '';
            osintInput.disabled = false;
            osintInput.focus();
        }
    }
});
