// --- Particle System (Gold Dust) ---
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

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
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {
            this.reset();
        }
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
    for (let i = 0; i < 100; i++) {
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

initParticles();
animateParticles();

// --- Scene Transitions & GSAP ---
const sceneLanding = document.getElementById('scene-landing');
const sceneChallenge = document.getElementById('scene-challenge');
const sceneMessage = document.getElementById('scene-message');

const btnRevealGift = document.getElementById('btn-reveal-gift');
const btnWrong = document.getElementById('btn-wrong');
const btnRight = document.getElementById('btn-right');
const cheesyTooltip = document.getElementById('cheesy-tooltip');

// Initial Landing Animation
window.addEventListener('load', () => {
    gsap.to('.hero-content', { opacity: 1, y: -20, duration: 1.5, ease: 'power3.out' });
});

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

btnWrong.addEventListener('click', () => {
    wrongClickCount++;
    
    // Shrink Wrong, Grow Right
    wrongScale *= 0.85;
    rightScale *= 1.15;
    
    gsap.to(btnWrong, { scale: wrongScale, duration: 0.4, ease: 'back.out(2)' });
    gsap.to(btnRight, { scale: rightScale, duration: 0.4, ease: 'back.out(2)' });

    // Show Cheesy Tooltip
    cheesyTooltip.innerText = cheesyMessages[Math.min(wrongClickCount - 1, cheesyMessages.length - 1)];
    gsap.to(cheesyTooltip, { opacity: 1, y: -10, duration: 0.3 });
    
    setTimeout(() => {
        gsap.to(cheesyTooltip, { opacity: 0, y: 0, duration: 0.3 });
    }, 2000);
});

// Transition: Challenge -> Message Page
btnRight.addEventListener('click', () => {
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
        
        // Start Audio if not playing
        const audio = document.getElementById('bg-audio');
        if (audio.paused) {
            audio.play().catch(e => console.log("Audio play blocked by browser. User interaction needed."));
        }
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
