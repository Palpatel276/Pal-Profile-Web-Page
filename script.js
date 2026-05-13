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
    const links = document.querySelectorAll('a, button, .contact-icon, .btn-project, .project-card, .focus-mini-card, .direct-visit');

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
            setTheme(isCurrentlyLight); // If light, set to dark
        });
    }

    // 3. Listen for system theme changes: Only auto-updates if no manual preference is stored
    systemPrefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });

    // 4. Multi-Theme Presets
    const themeDots = document.querySelectorAll('.theme-dot');
    const applyThemePreset = (theme) => {
        // Remove all theme classes
        body.classList.remove('theme-matrix', 'theme-alert', 'theme-nord');
        themeDots.forEach(dot => dot.classList.remove('active'));

        if (theme !== 'default') {
            body.classList.add(`theme-${theme}`);
        }
        
        const activeDot = document.querySelector(`.dot-${theme}`);
        if (activeDot) activeDot.classList.add('active');
        
        localStorage.setItem('theme-preset', theme);
    };

    themeDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const theme = dot.getAttribute('data-theme');
            applyThemePreset(theme);
        });
    });

    // Load saved preset
    const savedPreset = localStorage.getItem('theme-preset');
    if (savedPreset) {
        applyThemePreset(savedPreset);
    }

    // Matrix Rain Effect
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, columns;
        const fontSize = 16;
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$@#%&*';
        let drops = [];

        const initCanvas = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            columns = Math.floor(width / fontSize);
            drops = new Array(columns).fill(1);
        };

        const drawMatrix = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            // Use the current accent color or a theme-specific color
            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent-blue').trim() || '#00d2ff';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        initCanvas();
        window.addEventListener('resize', initCanvas);
        setInterval(drawMatrix, 50);
    }

    // Card Canvas Effect (Binary Drift)
    const cardCanvases = document.querySelectorAll('.card-canvas');
    cardCanvases.forEach(canvas => {
        const ctx = canvas.getContext('2d');
        let width, height;
        const fontSize = 10;
        const characters = '01';
        let drops = [];

        const initCardCanvas = () => {
            width = canvas.offsetWidth;
            height = canvas.offsetHeight;
            canvas.width = width;
            canvas.height = height;
            const columns = Math.floor(width / fontSize);
            drops = new Array(columns).fill(1);
        };

        const drawCardBinary = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--accent-blue').trim() || '#00d2ff';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.985) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        initCardCanvas();
        window.addEventListener('resize', initCardCanvas);
        setInterval(drawCardBinary, 100);
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

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.getElementById('nav-overlay');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
            });
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
            });
        }

        document.addEventListener('click', (e) => {
            if (navLinks && mobileMenuBtn && !navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target) && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
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

    // Project Modal Logic
    const projectData = {
        "TwishhSync": {
            subtitle: "Enterprise Attendance System",
            tech: ["React", "Next.js", "Tailwind CSS", "PostgreSQL", "Prisma"],
            details: [
                "Developed a zero-trust attendance management system with real-time location verification.",
                "Built scalable backend APIs using Next.js Serverless Functions.",
                "Implemented secure authentication and role-based access control.",
                "Optimized database queries with Prisma ORM for high-performance data retrieval."
            ],
            link: "https://attendance-system-gamma-ecru.vercel.app/"
        },
        "D.K. Techno": {
            subtitle: "Industrial Manufacturing Portfolio",
            tech: ["Next.js", "Vite", "Vanilla CSS", "Responsive Design"],
            details: [
                "Designed a high-performance industrial showcase website for precision manufacturing.",
                "Implemented custom CSS animations for industrial-themed UI components.",
                "Integrated contact forms and WhatsApp communication for client leads.",
                "Optimized asset loading for sub-second page performance."
            ],
            link: "https://www.dktechnoindustries.com/"
        },
        "Wazuh SIEM": {
            subtitle: "Security Information & Event Management",
            tech: ["Ubuntu", "Wazuh", "ElasticSearch", "Kibana", "Logstash"],
            details: [
                "Deployed and configured Wazuh SIEM for enterprise-wide security monitoring.",
                "Customized detection rules to identify specific attack patterns like SQLi and Brute Force.",
                "Integrated threat intelligence feeds for proactive threat hunting.",
                "Built automated response playbooks for incident mitigation."
            ],
            link: "#"
        },
        "Driver Assistance": {
            subtitle: "AI Computer Vision System",
            tech: ["Python", "OpenCV", "TensorFlow", "NumPy"],
            details: [
                "Engineered a real-time object detection system for driver safety alerting.",
                "Implemented lane detection and collision warning algorithms.",
                "Optimized model inference for edge device deployment.",
                "Built a desktop interface for live camera stream visualization."
            ],
            link: "#"
        },
        "OSINT": {
            subtitle: "Open Source Intelligence Tooling",
            tech: ["Python", "BeautifulSoup", "API Integration", "Data Analysis"],
            details: [
                "Automated digital footprint gathering from public data sources.",
                "Implemented domain and email correlation for target profiling.",
                "Built a visualization dashboard for mapped attack surfaces.",
                "Integrated automated reporting for security audits."
            ],
            link: "#"
        }
    };

    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalTech = document.getElementById('modal-tech');
    const modalDetails = document.getElementById('modal-details');
    const closeModal = document.getElementById('modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            // Check if the click was on the direct-visit link or its children
            if (e.target.closest('.direct-visit')) return;

            const projectId = card.getAttribute('data-project');
            const data = projectData[projectId];
            
            if (data) {
                modalTitle.textContent = projectId;
                modalSubtitle.textContent = data.subtitle;
                modalTech.innerHTML = data.tech.map(t => `<span>${t}</span>`).join('');
                modalDetails.innerHTML = data.details.map(d => `<li>${d}</li>`).join('');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const closeProjectModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeModal) closeModal.addEventListener('click', closeProjectModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeProjectModal);

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

