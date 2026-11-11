// ===== Theme Toggle =====
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Задержка для каскадного появления
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 50);// ===== Theme Toggle =====
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeIcon.textContent = next === 'dark' ? '☀️' : '🌙';
});

// ===== Mobile Menu =====
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    burger.classList.toggle('active');
});

document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        burger.classList.remove('active');
    });
});

// ===== Scroll Animations (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, i * 80);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ===== Animated Counters =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const duration = 1800;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            
            const update = () => {
                current += increment;
                if (current < target) {
                    el.textContent = Math.ceil(current) + suffix;
                    setTimeout(update, duration / steps);
                } else {
                    el.textContent = target + suffix;
                }
            };
            update();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => counterObserver.observe(el));

// ===== Typewriter Effect =====
const typewriterEl = document.getElementById('typewriter');
const phrases = [
    'Lead Mobile Developer',
    'AI Integration Specialist',
    'LLM & RAG Expert',
    'UI/UX Enthusiast',
    'Building scalable products'
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function type() {
    const current = phrases[phraseIdx];
    
    if (isDeleting) {
        typewriterEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typewriterEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
    }
    
    let delay = isDeleting ? 40 : 80;
    
    if (!isDeleting && charIdx === current.length) {
        delay = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 300;
    }
    
    setTimeout(type, delay);
}

setTimeout(type, 800);

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ===== Nav Scroll Effect & Active Link =====
const nav = document.getElementById('nav');
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    // Nav background
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
    
    // Active link
    let current = '';
    sections.forEach(section => {
        const top = section.offsetTop - 150;
        if (window.pageYOffset >= top) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Skill Card Mouse Glow Effect =====
document.querySelectorAll('.skill-category').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--x', x + '%');
        card.style.setProperty('--y', y + '%');
    });
});

// ===== Parallax on Hero =====
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        const parallax = scrolled * 0.3;
        hero.style.transform = `translateY(${parallax}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.6;
    }
});

// ===== Console Easter Egg =====
console.log('%c 👋 Привет, коллега!', 'font-size: 28px; font-weight: bold; color: #6366f1;');
console.log('%cЕсли ты HR или техлид — давай обсудим сотрудничество!', 'font-size: 14px; color: #a0a0b8;');
console.log('%c 📧 com@example.com  |  📞 +7 (900) 800-70-60', 'font-size: 14px; color: #a855f7; font-weight: 600;');
console.log('%c P.S. Этот сайт написан с любовью к деталям ✨', 'font-size: 12px; color: #6b6b80; font-style: italic;');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ===== Animated Counters =====
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const steps = 60;
            const increment = target / steps;
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, duration / steps);
                } else {
                    counter.textContent = target + '+';
                }
            };
            
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ===== Smooth Scroll for Nav Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Nav Scroll Effect =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = 'var(--shadow-sm)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===== Active Nav Link Highlight =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ===== Parallax Effect for Hero =====
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ===== Console Easter Egg =====
console.log('%c👋 Привет!', 'font-size: 24px; font-weight: bold;');
console.log('%cЕсли вы HR или рекрутер — давайте обсудим сотрудничество!', 'font-size: 14px;');
console.log('%c📧 com@example.com | 📞 +7 (900) 800-70-60', 'font-size: 14px; color: #4f46e5;');