// --- Initialization ---
window.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Register GSAP Plugins
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger, TextPlugin);
        
        // Initial Landing Animation
        gsap.to('.hero-content', { 
            opacity: 1, 
            y: -20, 
            duration: 1.5, 
            ease: 'power3.out',
            delay: 0.5 
        });
    }

    initParticles();
    animateParticles();
});

// --- Particle System (Gold Dust with subtle Parallax) ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) / 50;
    mouseY = (e.clientY - window.innerHeight / 2) / 50;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.parallaxFactor = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.speedX + (mouseX * this.parallaxFactor * 0.1);
        this.y += this.speedY + (mouseY * this.parallaxFactor * 0.1);
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 120; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

// --- Heart Explosion Effect ---
function createHeartExplosion() {
    const container = document.getElementById('emoji-container');
    const heartColors = ['#D4AF37', '#FF0000', '#FF69B4', '#Gold'];
    
    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = `${Math.random() * 30 + 10}px`;
        heart.style.zIndex = '1000';
        container.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 400 + 200;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        gsap.to(heart, {
            x: vx,
            y: vy,
            opacity: 0,
            scale: 0.2,
            rotation: Math.random() * 720,
            duration: 2,
            ease: 'power3.out',
            onComplete: () => heart.remove()
        });
    }
}

// --- Browser Tab Title Switcher ---
let originalTitle = document.title;
window.addEventListener('blur', () => {
    document.title = "Come back, I miss you! ❤️";
});
window.addEventListener('focus', () => {
    document.title = originalTitle;
});

// --- Typewriter Effect ---
function initTypewriter() {
    const texts = document.querySelectorAll('.typewriter-text');
    texts.forEach(text => {
        const content = text.innerHTML;
        text.innerHTML = '';
        gsap.to(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 90%',
            },
            text: content,
            duration: 2,
            ease: 'none'
        });
    });
}

// --- Scene Transitions & GSAP ---
const sceneLanding = document.getElementById('scene-landing');
const sceneChallenge = document.getElementById('scene-challenge');
const sceneMessage = document.getElementById('scene-message');

const btnRevealGift = document.getElementById('btn-reveal-gift');
const btnWrong = document.getElementById('btn-wrong');
const btnRight = document.getElementById('btn-right');
const cheesyTooltip = document.getElementById('cheesy-tooltip');

// Transition: Landing -> Challenge
btnRevealGift.addEventListener('click', () => {
    gsap.to('#scene-landing', { 
        opacity: 0, 
        scale: 0.9, 
        duration: 1, 
        onComplete: () => {
            sceneLanding.classList.add('hidden');
            sceneChallenge.classList.remove('hidden');
            gsap.to('#scene-challenge', { opacity: 1, duration: 1 });
        }
    });
});

// --- The "Choice Challenge" Logic ---
let wrongClickCount = 0;
let rightScale = 1;
let wrongScale = 1;
const cheesyMessages = [
    "Wait, really? 🥺",
    "I think you clicked the wrong one, gorgeous!",
    "Keep trying, I'm right here! 👈",
    "My heart is literally the other button...",
    "Is that your final answer? (Please say no)",
    "Okay, now you're just teasing me! 😂",
    "I'll wait forever, but this one is shrinking!",
    "Wrong path! Follow your heart (to the right)!"
];

btnWrong.addEventListener('click', (e) => {
    wrongClickCount++;
    
    // --- Emoji Explosion Effect ---
    const emojiContainer = document.getElementById('emoji-container');
    const emojis = ['❌', '🥺', '😅', '🙄', '💔', '👎', '🤷‍♂️'];
    const rect = btnWrong.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
        const emoji = document.createElement('div');
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = `${rect.left + rect.width / 2}px`;
        emoji.style.top = `${rect.top + rect.height / 2}px`;
        emoji.style.fontSize = `${Math.random() * 20 + 20}px`;
        emoji.style.pointerEvents = 'none';
        emojiContainer.appendChild(emoji);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 200 + 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        gsap.to(emoji, {
            x: vx,
            y: vy - 200, // Gravity effect
            opacity: 0,
            rotation: Math.random() * 360,
            duration: 1.5,
            ease: 'power2.out',
            onComplete: () => emoji.remove()
        });
    }

    // --- Clamped Scaling for Mobile Safety ---
    // Shrink Wrong (min 0.4), Grow Right (max 1.5 on mobile, 2.0 on desktop)
    const isMobile = window.innerWidth < 768;
    const maxRightScale = isMobile ? 1.4 : 1.8;
    const minWrongScale = 0.4;

    wrongScale = Math.max(minWrongScale, wrongScale * 0.85);
    rightScale = Math.min(maxRightScale, rightScale * 1.15);
    
    gsap.to(btnWrong, { 
        scale: wrongScale, 
        duration: 0.4, 
        ease: 'back.out(2)',
        x: (Math.random() - 0.5) * 30 // Reduced jitter for mobile
    });
    gsap.to(btnRight, { scale: rightScale, duration: 0.4, ease: 'back.out(2)' });

    // Show Cheesy Tooltip
    cheesyTooltip.innerText = cheesyMessages[Math.min(wrongClickCount - 1, cheesyMessages.length - 1)];
    gsap.to(cheesyTooltip, { opacity: 1, y: -20, scale: 1.2, duration: 0.3 });
    
    setTimeout(() => {
        gsap.to(cheesyTooltip, { opacity: 0, y: 0, scale: 1, duration: 0.3 });
    }, 2500);
});

// Transition: Challenge -> Message Page
btnRight.addEventListener('click', () => {
    // --- Trigger Heart Explosion ---
    createHeartExplosion();

    // Intense Glow & Zoom Transition
    const tl = gsap.timeline();
    
    tl.to(btnRight, { 
        scale: 50, 
        duration: 1.5, 
        ease: 'power4.in',
        backgroundColor: '#D4AF37',
        color: 'transparent'
    })
    .to('#scene-challenge', { opacity: 0, duration: 0.5 }, "-=0.5")
    .add(() => {
        sceneChallenge.classList.add('hidden');
        sceneMessage.classList.remove('hidden');
        document.body.classList.remove('overflow-hidden'); // Ensure scrolling is enabled
        window.scrollTo(0, 0);
        
        // --- Initialize Typewriter Effect ---
        initTypewriter();

        // --- Improved Audio Trigger ---
        const audio = document.getElementById('bg-audio');
        const audioBtn = document.getElementById('btn-audio-toggle');
        const audioIcon = audioBtn.querySelector('i');

        // Play audio and update UI state
        audio.play().then(() => {
            isPlaying = true;
            audioIcon.setAttribute('data-lucide', 'pause');
            lucide.createIcons();
        }).catch(e => {
            console.log("Autoplay prevented or audio error:", e);
            isPlaying = false;
        });
    })
    .to('#scene-message', { opacity: 1, duration: 1.5 });

    // Reveal elements on scroll
    gsap.utils.toArray('[data-scroll-fade]').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
});

// --- Quote Carousel ---
const quoteSlides = document.querySelectorAll('.quote-slide');
let currentQuote = 0;

function nextQuote() {
    gsap.to(quoteSlides[currentQuote], { opacity: 0, y: -20, duration: 1 });
    currentQuote = (currentQuote + 1) % quoteSlides.length;
    gsap.fromTo(quoteSlides[currentQuote], 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 1 }
    );
}

setInterval(nextQuote, 5000);

// --- Radiance Slideshow ---
const radianceSlides = document.querySelectorAll('.radiance-slide');
let currentRadianceSlide = 0;

function nextRadianceSlide() {
    // Current out
    gsap.to(radianceSlides[currentRadianceSlide], { 
        opacity: 0, 
        scale: 1.1, 
        duration: 1.5,
        ease: 'power2.inOut'
    });
    
    // Increment
    currentRadianceSlide = (currentRadianceSlide + 1) % radianceSlides.length;
    
    // Next in
    gsap.fromTo(radianceSlides[currentRadianceSlide], 
        { opacity: 0, scale: 0.9 }, 
        { 
            opacity: 1, 
            scale: 1, 
            duration: 1.5,
            ease: 'power2.inOut'
        }
    );
}

// Start cycling once the message page is revealed
// (We'll trigger this inside the btnRight listener or just let it run)
setInterval(nextRadianceSlide, 6000);

// --- Audio Player Toggle ---
const btnAudioToggle = document.getElementById('btn-audio-toggle');
const bgAudio = document.getElementById('bg-audio');
const audioIcon = btnAudioToggle.querySelector('i');
let isPlaying = false;

btnAudioToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgAudio.pause();
        audioIcon.setAttribute('data-lucide', 'music');
    } else {
        bgAudio.play();
        audioIcon.setAttribute('data-lucide', 'pause');
    }
    isPlaying = !isPlaying;
    lucide.createIcons();
});

// --- Gallery "Tilt" Effect ---
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        gsap.to(item, {
            rotateX: rotateX,
            rotateY: rotateY,
            scale: 1.05,
            duration: 0.5,
            ease: 'power3.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out'
        });
    });
});
