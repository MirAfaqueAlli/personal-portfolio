function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Typing animation for loading screen
function typeText(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = '';
    
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

// Initialize loading screen
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    const titleElement = document.getElementById('loadingTitle');
    const highlightElement = document.getElementById('loadingTitleHighlight');
    
    // Type "Welcome to my" first
    typeText(titleElement, "Welcome to my", 80, () => {
        // Then type "Portfolio"
        setTimeout(() => {
            typeText(highlightElement, "Portfolio", 100);
        }, 200);
    });
});

// Hide loading screen after animations complete
const loadingScreen = document.getElementById('loadingScreen');
const body = document.body;

window.addEventListener('load', () => {
    setTimeout(() => {
        body.classList.remove('loading');
        body.classList.add('loaded');
        loadingScreen.classList.add('hidden');
    }, 3500);
});