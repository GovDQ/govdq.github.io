class GovDQArchitecture {
    static init() {
        this.injectGlobalUI();
        this.initThemeToggle();
        this.initTextSizeToggle();
        this.initCursorEngine();
    }

    static injectGlobalUI() {
        // 1. Inject Accessibility Controls & Cursor into the body
        const globalUI = `
            <div id="cursor-dot"></div>
            <div class="a11y-controls">
                <button id="themeToggle" aria-label="Toggle Light and Dark Mode">🌙</button>
                <button id="textSizeToggle" aria-label="Toggle Large Text Size">A+</button>
                <button id="cursorToggle" aria-label="Toggle Trailing Cursor">🪄</button>
            </div>
        `;
        document.body.insertAdjacentHTML('afterbegin', globalUI);

        // 2. Inject Footer into the placeholder div
        const footerHTML = `
            <footer>
                <a href="https://github.com/GovDQ" aria-label="GovDQ GitHub Profile">GitHub</a>
                <a href="https://x.com/GovDQ" aria-label="GovDQ Twitter Profile">Twitter</a>
                <a href="https://www.linkedin.com/company/govdq" aria-label="GovDQ LinkedIn Page">LinkedIn</a>
                <p style="margin-top: 2rem;">© 2026 GovDQ. Open Knowledge.</p>
            </footer>
        `;
        const footerContainer = document.getElementById('govdq-footer');
        if (footerContainer) {
            footerContainer.innerHTML = footerHTML;
        }
    }

    static initThemeToggle() {
        const themeBtn = document.getElementById('themeToggle');
        if (!themeBtn) return;
        
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

        themeBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            const newTheme = isLight ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            themeBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    static initTextSizeToggle() {
        const textBtn = document.getElementById('textSizeToggle');
        if (!textBtn) return;

        const savedTextSize = localStorage.getItem('largeText') === 'true';
        if (savedTextSize) document.body.classList.add('large-text');

        textBtn.addEventListener('click', () => {
            document.body.classList.toggle('large-text');
            localStorage.setItem('largeText', document.body.classList.contains('large-text'));
        });
    }

    static initCursorEngine() {
        const cursorBtn = document.getElementById('cursorToggle');
        const cursorDot = document.getElementById('cursor-dot');
        if (!cursorBtn || !cursorDot) return;

        const savedCursor = localStorage.getItem('cursorActive');
        let isCursorActive = savedCursor !== 'false'; 

        if (!isCursorActive) {
            cursorDot.classList.add('cursor-hidden');
            cursorBtn.style.opacity = '0.5';
        }

        cursorBtn.addEventListener('click', () => {
            isCursorActive = !isCursorActive;
            localStorage.setItem('cursorActive', isCursorActive);
            if (isCursorActive) {
                cursorDot.classList.remove('cursor-hidden');
                cursorBtn.style.opacity = '1';
            } else {
                cursorDot.classList.add('cursor-hidden');
                cursorBtn.style.opacity = '0.5';
            }
        });

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let dotX = mouseX;
        let dotY = mouseY;
        let lastSpawnX = dotX;
        let lastSpawnY = dotY;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            dotX += (mouseX - dotX) * 0.15; 
            dotY += (mouseY - dotY) * 0.15;
            
            if (cursorDot) {
                cursorDot.style.left = `${dotX}px`;
                cursorDot.style.top = `${dotY}px`;
            }

            if (isCursorActive) {
                const dist = Math.hypot(dotX - lastSpawnX, dotY - lastSpawnY);
                if (dist > 12) { 
                    const trail = document.createElement('div');
                    trail.className = 'trail-dot';
                    trail.style.left = `${dotX}px`;
                    trail.style.top = `${dotY}px`;
                    document.body.appendChild(trail);
                    lastSpawnX = dotX;
                    lastSpawnY = dotY;
                    setTimeout(() => { trail.remove(); }, 3000);
                }
            }
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }
}

// Initialize the architecture engine when the DOM is ready
document.addEventListener('DOMContentLoaded', () => GovDQArchitecture.init());
