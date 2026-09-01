

// ===================================================================
// 1. HACKER TERMINAL INTRO (FIXED & TIMED)
// ===================================================================
(function initIntro() {
    const intro = document.getElementById('intro-screen');
    const terminal = document.getElementById('terminal-content');
    const mainArea = document.querySelector('.terminal-main');

    if (!intro || !terminal) return;

    // Helper: Manual reveal for hero content
    function revealHero() {
        const content = document.querySelector('.hero-content-reveal');
        const visual = document.querySelector('.hero-visual-centered');
        const backdrop = document.querySelector('.hero-backdrop-text');

        const isMobile = window.matchMedia('(max-width: 768px)').matches;

        // Hide name content completely at start for both mobile and desktop
        if (content) content.style.opacity = '0';
        if (visual) visual.style.opacity = '0';

        if (backdrop) {
            // Start from transparent and slightly smaller
            gsap.set(backdrop, { opacity: 0, scale: 0.9 });

            // Fade in and scale to normal
            gsap.to(backdrop, {
                opacity: 0.6, // 60% opacity
                scale: 1,
                duration: 3,
                delay: 0.8,
                ease: "expo.out"
            });
        }
    }


    if (sessionStorage.getItem('intro_seen')) {
        intro.classList.add('hidden');
        document.body.style.overflow = '';
        const mainContent = document.getElementById('main-site-content');
        if (mainContent) mainContent.classList.add('revealed');
        setTimeout(revealHero, 300);
        setTimeout(() => {
            if (typeof window.launchGreetingCycle === 'function') {
                window.launchGreetingCycle();
            }
        }, 50);
        return;
    }


    document.body.style.overflow = 'hidden';

    const lines = [
        { text: '<span class="t-green">root@aditya-portfolio</span>:<span class="t-blue">~/vision</span>', html: true },
        { text: "" },
        { text: "Starting portfolio engine ..." },
        { text: "Loading intelligent systems ..." },
        { text: "Compiling AI modules ..." },
        { text: "Initializing machine learning pipelines ..." },
        { text: "Connecting data streams ..." },
        { text: '<span class="t-green">System synchronization complete.</span>', html: true, delay: 400 },
        { text: "" },
        { text: "Welcome to the portfolio of", delay: 200 },
        { text: '<span class="t-white" style="font-size: 1.2em; font-weight: bold;">G. Aditya Prasad Achary</span>', html: true, delay: 500 },
        { text: "" },
        { text: '<span class="t-dim">Role:</span> <span class="t-cyan">AI Engineer</span>', html: true },
        { text: '<span class="t-dim">Specialization:</span> <span class="t-cyan">Intelligent Systems & Applied ML</span>', html: true },
        { text: '<span class="t-dim">Status:</span> <span class="t-green">Ready</span>', html: true, delay: 300 },
        { text: "" },
        { text: '<span class="t-dim">Environment: Production</span>', html: true },
        { text: '<span class="t-dim">Build: Optimized</span>', html: true },
        { text: '<span class="t-dim">Performance: Stable</span>', html: true },
        { text: '<span class="t-dim">Inference Engine: Active</span>', html: true },
        { text: "" },
        { text: '<span class="t-green">root@aditya-portfolio</span>:<span class="t-blue">~#</span>', html: true }
    ];

    let currentLine = 0;

    function typeLine() {
        if (currentLine >= lines.length) return;

        const lineData = lines[currentLine];
        const lineElement = document.createElement('div');
        lineElement.className = 'terminal-line';
        // Extreme visibility force
        lineElement.style.cssText = "color: white !important; display: block !important; opacity: 1 !important; visibility: visible !important;";

        terminal.appendChild(lineElement);

        const text = lineData.text;
        const lineDelay = lineData.delay || 30;

        if (lineData.html) {
            lineElement.innerHTML = text;
            currentLine++;
            if (mainArea) mainArea.scrollTop = mainArea.scrollHeight;
            setTimeout(typeLine, lineDelay);
        } else {
            if (text === "") {
                lineElement.innerHTML = "&nbsp;";
                currentLine++;
                setTimeout(typeLine, lineDelay);
                return;
            }
            let charIdx = 0;
            function typeChar() {
                if (charIdx < text.length) {
                    lineElement.textContent += text[charIdx];
                    charIdx++;
                    setTimeout(typeChar, 4);
                } else {
                    currentLine++;
                    if (mainArea) mainArea.scrollTop = mainArea.scrollHeight;
                    setTimeout(typeLine, lineDelay);
                }
            }
            typeChar();
        }
    }

    function finishIntro() {
        const mc = document.getElementById('main-site-content');
        if (mc) mc.classList.add('revealed');
        document.body.style.overflow = '';
        sessionStorage.setItem('intro_seen', '1');

        intro.style.transition = "opacity 0.8s ease-in-out";
        intro.style.opacity = '0';

        revealHero();

        setTimeout(() => {
            intro.classList.add('hidden');
            if (typeof window.launchGreetingCycle === 'function') {
                window.launchGreetingCycle();
            }
        }, 800);
    }

    // Start
    setTimeout(typeLine, 400);
    setTimeout(finishIntro, 5000);
})();


// ===================================================================
// 3. INTERACTIVE MOUSE TRACKING (REFINED)
// ===================================================================
(function initHeroTracking() {
    const hero = document.getElementById('hero');
    const visual = document.querySelector('.hero-visual-centered');

    if (!hero || !visual) return;

    window.addEventListener('mousemove', (e) => {
        const rect = visual.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = (e.clientX - centerX) / (window.innerWidth / 2);
        const mouseY = (e.clientY - centerY) / (window.innerHeight / 2);

        gsap.to(visual, {
            rotationY: mouseX * 8,
            rotationX: -mouseY * 5,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    hero.addEventListener('mouseleave', () => {
        gsap.to(visual, { rotationY: 0, rotationX: 0, duration: 1 });
    });
})();

// ===================================================================
// 4. CONSOLIDATED SCROLL CONTROLLER
// ===================================================================
const scrollState = {
    y: window.scrollY,
    active: false
};

function updateGlobalScrollEffects() {
    const y = window.scrollY;


    // Cine Section Parallax & Entrance
    const cineSection = document.querySelector('.cine-section');
    const radialGlow = document.querySelector('.cine-radial');
    const headingWrap = document.querySelector('.cine-heading-wrap');
    const windowWrap = document.querySelector('.cine-window-outer');

    if (cineSection) {
        const rect = cineSection.getBoundingClientRect();

        // Parallax
        if (radialGlow && rect.bottom > 0 && rect.top < window.innerHeight) {
            const progress = 1 - rect.top / window.innerHeight;
            const shift = (progress - 0.5) * 80;
            radialGlow.style.transform = `translate3d(-50%, calc(-50% + ${shift}px), 0)`;
        }

        // Observer-like entrance triggered by scroll controller for better sync
        if (rect.top < window.innerHeight * 0.85) {
            if (headingWrap) headingWrap.classList.add('cine-visible');
            if (windowWrap) windowWrap.classList.add('cine-visible');
        }
    }
}

window.addEventListener('scroll', () => {
    scrollState.y = window.scrollY;
    updateGlobalScrollEffects();

}, { passive: true });

// ===================================================================
// 19. FLOATING CODE PARTICLES SYSTEM (ENHANCED)
// ===================================================================
(function initCodeParticles() {
    if (window.matchMedia('(max-width: 768px)').matches) return; // skip heavy particles on mobile
    const container = document.getElementById('code-particles');
    if (!container) return;

    const symbols = [
        '{ }', '[ ]', '< >', '/', '01', '=>', ';', '_', 'def', 'var', 'async', 'await',
        '()', ':=', '&&', '||', '!=', '==', '+', '-', '*', '**', '>>', '<<', '^', '%',
        'import', 'from', 'lambda', 'with', 'yield', 'return', 'class', 'self', 'cls',
        'None', 'True', 'False', 'None'
    ];
    const count = 120; // Denser field
    const linesCount = 35; // More structural lines

    // Create Symbols
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        p.className = 'code-particle';
        p.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        // Random Position
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        p.style.left = `${x}%`;
        p.style.top = `${y}%`;

        // Depth simulation
        const depth = Math.random();
        p.style.fontSize = `${10 + depth * 14}px`;
        p.style.filter = `blur(${depth > 0.8 ? 1 : 0}px)`;
        p.style.opacity = 0.05 + depth * 0.25;

        container.appendChild(p);

        // Multi-axis floating animation
        gsap.to(p, {
            x: `random(-150, 150)`,
            y: `random(-150, 150)`,
            rotation: `random(-90, 90)`,
            scale: `random(0.8, 1.4)`,
            duration: `random(15, 40)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Create Structural Lines
    for (let i = 0; i < linesCount; i++) {
        const l = document.createElement('div');
        l.className = 'code-line-particle';
        l.style.width = `${Math.random() * 200 + 100}px`;
        l.style.left = `${Math.random() * 100}%`;
        l.style.top = `${Math.random() * 100}%`;
        l.style.transform = `rotate(${Math.random() * 360}deg)`;

        container.appendChild(l);

        gsap.to(l, {
            opacity: `random(0.02, 0.1)`,
            x: `random(-100, 100)`,
            y: `random(-50, 50)`,
            scaleX: `random(0.5, 1.5)`,
            duration: `random(10, 20)`,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut"
        });
    }
})();

// ===================================================================
// 20. HERO CENTERED REVEAL SYSTEM
// ===================================================================
(function initHeroScrollReveal() {
    const hero = document.getElementById('hero');
    const backdrop = document.querySelector('.hero-backdrop-text');
    const visual = document.querySelector('.hero-visual-centered');
    const content = document.querySelector('.hero-content-reveal');

    if (!hero || !backdrop || !visual || !content) return;

    // Set initial state for pop-up effect (Hidden at start)
    gsap.set([content, visual], { opacity: 0, y: 100 });

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=150%", // Longer scroll for smooth reveal
            scrub: 1,
            pin: true,
            pinSpacing: true
        }
    });

    // 1. Move BACKDROP away as user scrolls
    tl.to(backdrop, {
        y: -150,
        scale: 1.2,
        opacity: 0.02,
        duration: 1,
        ease: "power2.inOut"
    }, 0);

    // 2. Reveal Name & Details (Visual Assembly)
    tl.to(visual, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
    }, 0.2);

    // 3. Content Pop-up reveal with delay
    tl.to(content, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "back.out(1.5)"
    }, 0.3);
})();


// ===================================================================
// 4. SMOOTH SCROLL
// ===================================================================
// 4. ROBUST SMOOTH SCROLL (Delegation for dynamic or late-added items like Dock)
document.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    // Skip if it's just a placeholder or doesn't have a valid target
    if (anchor.getAttribute('href') === "#") return;

    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});


// ===================================================================
// 5. TERMINAL TYPING ANIMATION
// ===================================================================
(function initTerminal() {
    const body = document.getElementById('terminal-body');
    if (!body) return;
    const lines = body.querySelectorAll('.terminal-line');
    let triggered = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !triggered) {
                triggered = true;
                lines.forEach((line, i) => {
                    const delay = parseInt(line.dataset.delay) || i * 1200;
                    setTimeout(() => line.classList.add('visible'), delay);
                });
            }
        });
    }, { threshold: 0.3 });
    observer.observe(body);
})();

// ===================================================================
// 6.5. INTERACTIVE IMAGE SPOTLIGHT REVEAL (INSTANT ZERO-LAG TRACKING)
// ===================================================================
(function initImageSpotlight() {
    const card = document.getElementById('hero-image-card');
    if (!card) return;

    function updateCoords(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x.toFixed(1)}px`);
        card.style.setProperty('--my', `${y.toFixed(1)}px`);
    }

    card.addEventListener('mouseenter', updateCoords);
    card.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => updateCoords(e));
    });
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--mx', `-500px`);
        card.style.setProperty('--my', `-500px`);
    });
})();

// ===================================================================
// 7. ROTATING HEADLINE
// ===================================================================
(function initHeadlineRotation() {
    const wordEl = document.getElementById('headline-word');
    if (!wordEl) return;
    const phrases = ['Neural Pulse', 'Living Logic', 'Ghost Script', 'Silent Compute', 'Latent Thought', 'Evolving Flow', 'Digital Breath'];
    let index = 0;
    setInterval(() => {
        wordEl.classList.add('fade-out');
        setTimeout(() => {
            index = (index + 1) % phrases.length;
            wordEl.textContent = phrases[index];
            wordEl.classList.remove('fade-out');
            wordEl.classList.add('fade-in');
            requestAnimationFrame(() => { requestAnimationFrame(() => { wordEl.classList.remove('fade-in'); }); });
        }, 500);
    }, 2000);
})();


// ===================================================================
// 8. INTERACTIVE CODE PLAYGROUND
// ===================================================================
(function initCodePlayground() {
    const section = document.querySelector('.cine-section');
    const editorEl = document.getElementById('cine-editor');
    const outputEl = document.getElementById('cine-output');
    const panels = document.getElementById('cine-panels');
    const runBtn = document.getElementById('cine-run-btn');
    const clearBtn = document.getElementById('cine-clear-btn');
    const statusTxt = document.getElementById('cine-status-text');
    if (!section || !editorEl) return;

    let editor = null;
    let pyodide = null;
    let pyodideReady = false;
    let pyodideLoading = false;
    let demoActive = true;
    let demoTimeout = null;
    let programmaticEdit = false;

    const DEMO_CODE = [
        'import math',
        '',
        'def predict(data):',
        '    avg = sum(data) / len(data)',
        '    return round(avg * math.pi, 2)',
        '',
        'data = [3, 5, 2]',
        '',
        'result = predict(data)',
        '',
        'print("Input:", data)',
        'print("Prediction:", result)',
        'print("Status: OK")'
    ].join('\n');

    const DATA_VARIANTS = ['[10, 4, 6]', '[1, 8, 3]', '[7, 2, 9]', '[3, 5, 2]'];
    let variantIdx = 0;

    // Transition handled by consolidated scroll controller class toggle

    // Init CodeMirror
    if (typeof CodeMirror !== 'undefined') {
        editor = CodeMirror(editorEl, {
            value: '',
            mode: 'python',
            theme: 'material-darker',
            lineNumbers: true,
            indentUnit: 4,
            tabSize: 4,
            lineWrapping: false,
            styleActiveLine: true,
            viewportMargin: Infinity
        });

        editor.on('change', () => {
            if (!programmaticEdit && demoActive) {
                demoActive = false;
                clearTimeout(demoTimeout);
            }
            if (!programmaticEdit && runBtn) {
                runBtn.innerHTML = 'Run <span class="cine-run-icon">▶</span>';
            }
        });
    }

    async function ensurePyodide() {
        if (pyodideReady) return true;
        if (pyodideLoading) return false;
        pyodideLoading = true;
        if (statusTxt) statusTxt.textContent = 'Loading Python...';
        try {
            if (typeof loadPyodide === 'undefined') {
                const s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
                document.head.appendChild(s);
                await new Promise(r => s.onload = r);
            }
            pyodide = await loadPyodide();
            pyodideReady = true;
            if (statusTxt) statusTxt.textContent = 'Python Ready';
        } catch (e) {
            if (statusTxt) statusTxt.textContent = 'Python Error';
            pyodideLoading = false;
            return false;
        }
        return true;
    }

    async function runCode() {
        if (!editor) return;
        const code = editor.getValue().trim();
        if (!code) return;
        if (runBtn) { runBtn.classList.add('running'); runBtn.textContent = 'Running...'; }
        const ok = await ensurePyodide();
        if (!ok) { if (runBtn) runBtn.classList.remove('running'); return; }

        try {
            pyodide.runPython('import sys, io\nsys.stdout = io.StringIO()');
            await pyodide.runPythonAsync(code);
            const output = pyodide.runPython('sys.stdout.getvalue()');
            if (outputEl) {
                outputEl.innerHTML = `<span class="cine-out-success">${output || '(no output)'}</span>`;
                if (panels) panels.classList.add('has-output');
            }
            if (statusTxt) statusTxt.textContent = 'Executed · Python 3.11';
        } catch (e) {
            if (outputEl) {
                outputEl.innerHTML = `<span class="cine-out-error">${e.message}</span>`;
                if (panels) panels.classList.add('has-output');
            }
            if (statusTxt) statusTxt.textContent = 'Error · Python 3.11';
        } finally {
            if (runBtn) { runBtn.classList.remove('running'); runBtn.innerHTML = 'Executed'; }
        }
    }

    if (runBtn) runBtn.addEventListener('click', runCode);
    if (clearBtn) clearBtn.addEventListener('click', () => {
        if (outputEl) outputEl.textContent = '';
        if (panels) panels.classList.remove('has-output');
    });

    function typeCode(code, cb) {
        if (!demoActive) return;
        let idx = 0;
        function next() {
            if (!demoActive || idx >= code.length) { if (cb) cb(); return; }
            programmaticEdit = true;
            const doc = editor.getDoc();
            doc.replaceRange(code[idx], { line: doc.lastLine(), ch: doc.getLine(doc.lastLine()).length });
            programmaticEdit = false;
            idx++;
            setTimeout(next, code[idx - 1] === '\n' ? 100 : 25 + Math.random() * 20);
        }
        next();
    }

    // Delayed start for demo
    setTimeout(() => {
        if (demoActive) {
            typeCode(DEMO_CODE, () => {
                setTimeout(runCode, 500);
            });
        }
    }, 2000);
})();


// ===================================================================
// 9. TECHNICAL TOOLKIT (SYSTEM MAP)
// ===================================================================
(function initSystemMap() {
    const wrapper = document.querySelector('.systemmap-wrapper');
    const track = document.getElementById('systemmap-track');
    const nodesContainer = document.getElementById('systemmap-nodes');
    const svgEl = document.getElementById('systemmap-svg');
    const viewport = document.getElementById('systemmap-viewport');
    const bgCanvas = document.getElementById('systemmap-canvas-bg');
    const scrollHint = document.getElementById('smap-scroll-hint');
    if (!wrapper || !track || !nodesContainer || !svgEl || !viewport) return;

    const antigravitySvg = `<svg viewBox="0 0 16 15" fill="none" style="width:28px;height:28px;"><mask id="antigravity__mask0_111_52" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="15"><path d="M14.0777 13.984C14.945 14.6345 16.2458 14.2008 15.0533 13.0084C11.476 9.53949 12.2349 0 7.79033 0C3.34579 0 4.10461 9.53949 0.527295 13.0084C-0.773543 14.3092 0.635692 14.6345 1.50293 13.984C4.86344 11.7076 4.64663 7.69664 7.79033 7.69664C10.934 7.69664 10.7172 11.7076 14.0777 13.984Z" fill="black"/></mask><g mask="url(#antigravity__mask0_111_52)"><g filter="url(#antigravity__filter0_f_111_52)"><path d="M-0.658907 -3.2306C-0.922679 -0.906781 1.07986 1.22861 3.81388 1.53894C6.54791 1.84927 8.97811 0.217009 9.24188 -2.10681C9.50565 -4.43063 7.50312 -6.56602 4.76909 -6.87635C2.03506 -7.18667 -0.395135 -5.55442 -0.658907 -3.2306Z" fill="#FFE432"/></g><g filter="url(#antigravity__filter1_f_111_52)"><path d="M9.88233 4.36642C10.5673 7.31568 13.566 9.13902 16.5801 8.43896C19.5942 7.73891 21.4823 4.78056 20.7973 1.83131C20.1123 -1.11795 17.1136 -2.94128 14.0995 -2.24123C11.0854 -1.54118 9.19733 1.41717 9.88233 4.36642Z" fill="#FC413D"/></g><g filter="url(#antigravity__filter2_f_111_52)"><path d="M-8.05291 6.34512C-7.18736 9.38883 -3.28925 10.9473 0.653774 9.82598C4.5968 8.7047 7.09158 5.32829 6.22603 2.28458C5.36048 -0.759142 1.46236 -2.31758 -2.48066 -1.19629C-6.42368 -0.0750048 -8.91846 3.3014 -8.05291 6.34512Z" fill="#00B95C"/></g><g filter="url(#antigravity__filter3_f_111_52)"><path d="M-8.05291 6.34512C-7.18736 9.38883 -3.28925 10.9473 0.653774 9.82598C4.5968 8.7047 7.09158 5.32829 6.22603 2.28458C5.36048 -0.759142 1.46236 -2.31758 -2.48066 -1.19629C-6.42368 -0.0750048 -8.91846 3.3014 -8.05291 6.34512Z" fill="#00B95C"/></g><g filter="url(#antigravity__filter4_f_111_52)"><path d="M-4.92402 8.86746C-2.75421 11.0837 0.982691 10.9438 3.42257 8.55507C5.86246 6.1663 6.08139 2.43321 3.91158 0.216963C1.74177 -1.99928 -1.99513 -1.85942 -4.43501 0.529349C-6.87489 2.91812 -7.09383 6.65122 -4.92402 8.86746Z" fill="#00B95C"/></g><g filter="url(#antigravity__filter5_f_111_52)"><path d="M6.42819 17.2263C7.10197 20.1273 9.91278 21.953 12.7063 21.3042C15.4998 20.6553 17.2182 17.7777 16.5444 14.8767C15.8707 11.9757 13.0599 10.15 10.2663 10.7988C7.47281 11.4477 5.75441 14.3253 6.42819 17.2263Z" fill="#3186FF"/></g><g filter="url(#antigravity__filter6_f_111_52)"><path d="M1.66508 -5.94539C0.254213 -2.80254 1.7978 0.951609 5.11277 2.43973C8.42774 3.92785 12.2588 2.58642 13.6696 -0.556431C15.0805 -3.69928 13.5369 -7.45343 10.222 -8.94155C6.90699 -10.4297 3.07594 -9.08824 1.66508 -5.94539Z" fill="#FBBC04"/></g><g filter="url(#antigravity__filter7_f_111_52)"><path d="M-2.11428 24.3903C-5.52984 23.0496 0.307266 12.0177 1.75874 8.32038C3.21024 4.62304 7.15576 2.71272 10.5713 4.05357C13.9869 5.39442 18.0354 12.7796 16.5838 16.477C15.1323 20.1743 1.30129 25.7311 -2.11428 24.3903Z" fill="#3186FF"/></g><g filter="url(#antigravity__filter8_f_111_52)"><path d="M18.5814 10.6598C17.6669 11.727 15.2806 11.1828 13.2514 9.44417C11.2222 7.70556 10.3185 5.43097 11.2329 4.3637C12.1473 3.29646 14.5336 3.84069 16.5628 5.57928C18.592 7.31789 19.4958 9.59249 18.5814 10.6598Z" fill="#749BFF"/></g><g filter="url(#antigravity__filter9_f_111_52)"><path d="M11.7552 5.22715C15.5162 7.77124 19.8471 7.93838 21.4286 5.60045C23.0101 3.26253 21.2433 -0.695128 17.4823 -3.23922C13.7213 -5.78331 9.39044 -5.95044 7.80896 -3.61252C6.22747 -1.27459 7.99428 2.68306 11.7552 5.22715Z" fill="#FC413D"/></g><g filter="url(#antigravity__filter10_f_111_52)"><path d="M-0.592149 1.08896C-1.5239 3.33663 -1.21959 5.59799 0.0875457 6.13985C1.39468 6.68171 3.20966 5.29888 4.14141 3.05121C5.07316 0.803541 4.76885 -1.45782 3.46171 -1.99968C2.15458 -2.54154 0.339602 -1.15871 -0.592149 1.08896Z" fill="#FFEE48"/></g></g><defs><filter id="antigravity__filter0_f_111_52" x="-2.12817" y="-8.35998" width="12.8393" height="11.383" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="0.722959" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter1_f_111_52" x="2.75168" y="-9.38089" width="25.1763" height="24.96" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="3.49513" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter2_f_111_52" x="-14.1669" y="-7.50196" width="26.5068" height="23.6338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.97119" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter3_f_111_52" x="-14.1669" y="-7.50196" width="26.5068" height="23.6338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.97119" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter4_f_111_52" x="-12.3607" y="-7.29981" width="23.709" height="23.6846" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.97119" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter5_f_111_52" x="0.634962" y="5.02095" width="21.7027" height="22.0616" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.82351" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter6_f_111_52" x="-3.97547" y="-14.6666" width="23.2857" height="22.8313" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.5589" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter7_f_111_52" x="-7.7407" y="-0.945408" width="29.1982" height="30.1105" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.2852" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter8_f_111_52" x="6.78641" y="-0.27231" width="16.2415" height="15.5681" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.04485" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter9_f_111_52" x="3.77526" y="-8.71693" width="21.687" height="19.4212" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1.72712" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter10_f_111_52" x="-5.40727" y="-6.39238" width="14.3639" height="16.9254" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.1376" result="effect1_foregroundBlur_111_52"/></filter></defs></svg>`;
    const colabSvg = `<svg style="width:28px;height:28px;display:block;" viewBox="0 0 24 24"><path fill="#E8710A" d="M4.54 9.46 2.19 7.1a6.93 6.93 0 0 0 0 9.79l2.36-2.36a3.59 3.59 0 0 1-.01-5.07Z"/><path fill="#F9AB00" d="m2.19 7.1 2.35 2.36a3.59 3.59 0 0 1 5.08 0l1.71-2.93-.1-.08a6.93 6.93 0 0 0-9.04.65ZM11.34 17.46l-1.72-2.92a3.59 3.59 0 0 1-5.08 0L2.19 16.9a6.93 6.93 0 0 0 9 .65l.11-.09M12 7.1a6.93 6.93 0 0 0 0 9.79l2.36-2.36a3.59 3.59 0 1 1 5.08-5.08l2.37-2.35a6.93 6.93 0 0 0-9.81 0Z"/><path fill="#E8710A" d="m21.81 7.1-2.35 2.36a3.59 3.59 0 0 1-5.08 5.08L12 16.9a6.93 6.93 0 0 0 9.81-9.8Z"/></svg>`;

    const categories = [
        {
            name: 'Programming', icon: '{}', children: [
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
                { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
                { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
                { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' }
            ]
        },
        {
            name: 'Web & Application Development', icon: '🌐', children: [
                { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
                { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
                { name: 'Streamlit', label: 'ST' }
            ]
        },
        {
            name: 'Ai & ML Libraries', icon: '🧠', children: [
                { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
                { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
                { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
                { name: 'Keras', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg' },
                { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg' },
                { name: 'Scikit-Learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' }
            ]
        },
        {
            name: 'Deployment', icon: '🚀', children: [
                { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-plain.svg' },
                { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original.svg' },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
                { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg' },
                { name: 'GH Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' }
            ]
        },
        {
            name: 'Cloud / DB', icon: '☁️', children: [
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
                { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
                { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
                { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
                { name: 'Cloudflare', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg' }
            ]
        },
        {
            name: 'Development Tools', icon: '🛠', children: [
                { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
                { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
                { name: 'Colab', svg: colabSvg },
                { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original-wordmark.svg' }
            ]
        },
        {
            name: 'AI Agents', icon: '🤖', children: [
                {
                    name: 'Claude',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:28px;height:28px;"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" /></svg>`
                },
                {
                    name: 'LangChain',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:28px;height:28px;"><path d="M8.373 14.502c.013-.06.024-.118.038-.17l.061.145c.115.28.229.557.506.714-.012.254-.334.357-.552.326-.048-.114-.115-.228-.255-.164-.143.056-.3-.01-.266-.185.333-.012.407-.371.468-.666zM18.385 9.245c-.318 0-.616.122-.839.342l-.902.887c-.243.24-.368.572-.343.913l.006.056c.032.262.149.498.337.682.13.128.273.21.447.266a.866.866 0 01-.247.777l-.056.055a2.022 2.022 0 01-1.355-1.555l-.01-.057-.046.037c-.03.024-.06.05-.088.078l-.902.887a1.156 1.156 0 000 1.65c.231.228.535.342.84.342.304 0 .607-.114.838-.341l.902-.888a1.156 1.156 0 00-.436-1.921.953.953 0 01.276-.842 2.062 2.062 0 011.371 1.57l.01.057.047-.037c.03-.024.06-.05.088-.078l.902-.888a1.155 1.155 0 000-1.65 1.188 1.188 0 00-.84-.342z"></path><path d="M17.901 6H6.1C2.736 6 0 8.692 0 12s2.736 6 6.099 6H17.9C21.264 18 24 15.308 24 12s-2.736-6-6.099-6zm-5.821 9.407c-.195.04-.414.047-.562-.106-.045.1-.136.077-.221.056a.797.797 0 00-.061-.014c-.01.025-.017.048-.026.073-.329.021-.575-.309-.732-.558a4.991 4.991 0 00-.473-.21c-.172-.07-.345-.14-.509-.23a2.218 2.218 0 00-.004.173c-.002.244-.004.503-.227.651-.007.295.236.292.476.29.207-.003.41-.005.447.184a.485.485 0 01-.05.003c-.046 0-.092 0-.127.034-.117.111-.242.063-.372.013-.12-.046-.243-.094-.367-.02a2.318 2.318 0 00-.262.154.97.97 0 01-.548.194c-.024-.036-.014-.059.006-.08a.562.562 0 00.043-.056c.019-.028.035-.057.051-.084.054-.095.103-.18.242-.22-.185-.029-.344.055-.5.137l-.004.002a4.21 4.21 0 01-.065.034c-.097.04-.154.009-.212-.023-.082-.045-.168-.092-.376.04-.04-.032-.02-.061.002-.086.091-.109.21-.125.345-.119-.351-.193-.604-.056-.81.055-.182.098-.327.176-.471-.012-.065.017-.102.063-.138.108-.015.02-.03.038-.047.055-.035-.039-.027-.083-.018-.128l.005-.026a.242.242 0 00.003-.03l-.027-.01c-.053-.022-.105-.044-.09-.124-.117-.04-.2.03-.286.094-.054-.041-.01-.095.032-.145a.279.279 0 000-.065c.038-.065.103-.067.166-.069.054-.001.108-.003.145-.042.133-.075.297-.036.462.003.121.028.242.057.354.042.203.025.454-.18.352-.385-.186-.233-.184-.528-.183-.813v-.143c-.016-.108-.172-.233-.328-.358-.12-.095-.24-.191-.298-.28-.16-.177-.285-.382-.409-.585l-.015-.024c-.212-.404-.297-.86-.382-1.315-.103-.546-.205-1.09-.526-1.54-.266.144-.612.075-.841-.118-.12.107-.13.247-.138.396l-.001.014c-.297-.292-.26-.844-.023-1.17.097-.128.213-.233.342-.326.03-.021.04-.042.039-.074.235-1.04 1.836-.839 2.342-.103.167.206.281.442.395.678.137.283.273.566.5.795.22.237.452.463.684.689.359.35.718.699 1.032 1.089.49.587.839 1.276 1.144 1.97.05.092.08.193.11.293.044.15.089.299.2.417.026.035.084.088.149.148.156.143.357.328.289.409.009.019.027.04.05.06.032.028.074.058.116.088.122.087.25.178.16.25zm7.778-3.545l-.902.887c-.24.237-.537.413-.859.51l-.017.005-.006.015A2.021 2.021 0 0117.6 14l-.902.888c-.393.387-.916.6-1.474.6-.557 0-1.08-.213-1.474-.6a2.03 2.03 0 010-2.9l.902-.888c.242-.238.531-.409.859-.508l.016-.004.006-.016c.105-.272.265-.516.475-.724l.902-.887c.393-.387.917-.6 1.474-.6.558 0 1.08.213 1.474.6.394.387.61.902.61 1.45 0 .549-.216 1.064-.61 1.45v.001z"></path></svg>`
                },
                {
                    name: 'Gemini',
                    svg: `<svg viewBox="0 0 24 24" style="width:28px;height:28px;"><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-fill-0)"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-fill-1)"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-fill-2)"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-fill-0" x1="7" x2="11" y1="15.5" y2="12"><stop stop-color="#08B962"></stop><stop offset="1" stop-color="#08B962" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-fill-1" x1="8" x2="11.5" y1="5.5" y2="11"><stop stop-color="#F94543"></stop><stop offset="1" stop-color="#F94543" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-fill-2" x1="3.5" x2="17.5" y1="13.5" y2="12"><stop stop-color="#FABC12"></stop><stop offset=".46" stop-color="#FABC12" stop-opacity="0"></stop></linearGradient></defs></svg>`
                },
                { name: 'Antigravity', svg: antigravitySvg },
                {
                    name: 'OpenAI API',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:28px;height:28px;"><path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"></path></svg>`
                },
                {
                    name: 'Cursor',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:28px;height:28px;"><path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"></path></svg>`
                },
                {
                    name: 'Windsurf',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:28px;height:28px;"><title>Windsurf</title><path d="M23.78 5.004h-.228a2.187 2.187 0 00-2.18 2.196v4.912c0 .98-.804 1.775-1.76 1.775a1.818 1.818 0 01-1.472-.773L13.168 5.95a2.197 2.197 0 00-1.81-.95c-1.134 0-2.154.972-2.154 2.173v4.94c0 .98-.797 1.775-1.76 1.775-.57 0-1.136-.289-1.472-.773L.408 5.098C.282 4.918 0 5.007 0 5.228v4.284c0 .216.066.426.188.604l5.475 7.889c.324.466.8.812 1.351.938 1.377.316 2.645-.754 2.645-2.117V11.89c0-.98.787-1.775 1.76-1.775h.002c.586 0 1.135.288 1.472.773l4.972 7.163a2.15 2.15 0 001.81.95c1.158 0 2.151-.973 2.151-2.173v-4.939c0-.98.787-1.775 1.76-1.775h.194c.122 0 .22-.1.22-.222V5.225a.221.221 0 00-.22-.222z"></path></svg>`
                },
                {
                    name: 'NotebookLM',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:28px;height:28px;"><title>NotebookLM</title><path d="M11.999 3.14C5.372 3.14 0 8.588 0 15.312v5.828h2.212v-.58c0-2.728 2.178-4.938 4.866-4.938 2.688 0 4.866 2.21 4.866 4.937v.581h2.212v-.58c0-3.967-3.17-7.18-7.078-7.18a6.966 6.966 0 00-4.086 1.318C4.2 12.262 6.687 10.59 9.56 10.59c4.057 0 7.347 3.338 7.347 7.453v3.097h2.212v-3.097c0-5.355-4.28-9.698-9.56-9.698a9.438 9.438 0 00-6.217 2.332C4.984 7.528 8.244 5.383 12 5.383c5.406 0 9.788 4.446 9.788 9.93v5.827H24v-5.828C23.999 8.588 18.627 3.14 11.999 3.14z"></path></svg>`
                },
                {
                    name: 'Perplexity',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:28px;height:28px;"><title>Perplexity</title><path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z"></path></svg>`
                }
            ]
        }
    ];

    const N = categories.length;
    const NODE_SPACING = 800;
    const PAD_X = 600;
    const TRACK_W = PAD_X * 2 + (N - 1) * NODE_SPACING;
    const WAVE_AMP = 140;
    const CP_PULL = 0.45;

    track.style.width = TRACK_W + 'px';
    wrapper.style.height = '450vh'; // Back to original scroll height

    const cineSection = document.getElementById('code-snippet');
    const smHeader = document.querySelector('.systemmap-header');


    function drawGrid() {
        if (!bgCanvas) return;
        bgCanvas.width = viewport.offsetWidth;
        bgCanvas.height = viewport.offsetHeight;
        const ctx = bgCanvas.getContext('2d');
        ctx.strokeStyle = 'rgba(255,255,255,0.018)';
        ctx.lineWidth = 1;
        const S = 56;
        for (let x = 0; x < bgCanvas.width; x += S) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, bgCanvas.height); ctx.stroke(); }
        for (let y = 0; y < bgCanvas.height; y += S) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(bgCanvas.width, y); ctx.stroke(); }
    }
    drawGrid();
    window.addEventListener('resize', drawGrid);

    categories.forEach((cat, i) => {
        cat.baseX = PAD_X + i * NODE_SPACING;
        cat.floatPhase = Math.random() * Math.PI * 2;
        cat.floatAmp = 1 + Math.random() * 2; // Significantly reduced for 'center' look
        cat.floatFreq = 0.00030 + Math.random() * 0.00015;
    });

    const nodeEls = [];
    const childRecords = [];
    categories.forEach((cat) => {
        const node = document.createElement('div');
        node.className = 'smap-node';
        // Remove left/top from inline style to avoid double offset with translate3d
        node.style.cssText = `will-change:transform;`;
        node.innerHTML = `<div class="node-circle"><span>${cat.icon}</span></div><span class="node-name">${cat.name}</span>`;
        nodesContainer.appendChild(node);
        nodeEls.push({ el: node, cat });
        node.addEventListener('mousedown', e => startDrag(e, 'root', { el: node, cat }));

        const count = cat.children.length;
        const orbitR = count > 6 ? 155 : 128;
        cat.children.forEach((child, ki) => {
            const childEl = document.createElement('div');
            childEl.className = 'smap-child';
            let inner = '';
            if (child.svg) inner = `<div class="child-circle">${child.svg}</div>`;
            else if (child.icon) inner = `<div class="child-circle"><img class="child-icon" src="${child.icon}" alt="${child.name}" loading="lazy"></div>`;
            else inner = `<div class="child-circle"><span class="child-label">${child.label || child.name[0]}</span></div>`;
            inner += `<span class="child-name">${child.name}</span>`;
            childEl.innerHTML = inner;
            nodesContainer.appendChild(childEl);
            setTimeout(() => childEl.classList.add('visible'), 300 + ki * 40);
            const rec = { el: childEl, cat, angle: (ki / count) * Math.PI * 2, radius: orbitR + (Math.random() * 14 - 7), fp: Math.random() * Math.PI * 2, fa: 1.5 + Math.random() * 1.5, ff: 0.00025 + Math.random() * 0.00015 };
            childRecords.push(rec);
            childEl.addEventListener('mousedown', e => startDrag(e, 'child', rec));
        });
    });

    let currentTx = 0;
    let targetTx = 0;
    let dragState = null;
    function startDrag(e, type, rec) {
        if (e.button !== 0) return;
        e.preventDefault(); e.stopPropagation();
        const vpRect = viewport.getBoundingClientRect();
        const mTX = (e.clientX - vpRect.left) - currentTx;
        const mTY = e.clientY - vpRect.top;
        let nodeX, nodeY;
        if (type === 'root') {
            nodeX = rec.cat.baseX;
            nodeY = rec.cat.currentY != null ? rec.cat.currentY : viewport.offsetHeight * 0.5;
        } else {
            const py = rec.cat.currentY != null ? rec.cat.currentY : viewport.offsetHeight * 0.5;
            nodeX = rec.dragX != null ? rec.dragX : rec.cat.baseX + Math.cos(rec.angle) * rec.radius;
            nodeY = rec.dragY != null ? rec.dragY : py + Math.sin(rec.angle) * rec.radius;
        }
        dragState = { type, rec, offsetX: nodeX - mTX, offsetY: nodeY - mTY };
        if (type === 'root') { rec.cat.isDragging = true; rec.cat.dragY = nodeY; }
        else { rec.isDragging = true; rec.dragX = nodeX; rec.dragY = nodeY; }
        rec.el.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
    }
    function onDragMove(e) {
        if (!dragState) return;
        const vpRect = viewport.getBoundingClientRect();
        const mTX = (e.clientX - vpRect.left) - currentTx;
        const mTY = e.clientY - vpRect.top;
        const nx = mTX + dragState.offsetX;
        const ny = mTY + dragState.offsetY;
        if (dragState.type === 'root') {
            dragState.rec.cat.baseX = nx;
            dragState.rec.cat.dragY = ny;
        } else {
            dragState.rec.dragX = nx;
            dragState.rec.dragY = ny;
        }
    }
    function onDragEnd() {
        if (!dragState) return;
        if (dragState.type === 'root') {
            dragState.rec.cat.isDragging = false;
            dragState.rec.cat.pinnedY = dragState.rec.cat.dragY;
        } else {
            dragState.rec.isDragging = false;
            dragState.rec.pinnedX = dragState.rec.dragX;
            dragState.rec.pinnedY = dragState.rec.dragY;
        }
        dragState.rec.el.style.cursor = 'grab';
        document.body.style.userSelect = '';
        dragState = null;
    }
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);

    const svgNS = 'http://www.w3.org/2000/svg';
    function mkSvgEl(tag, cls) {
        const el = document.createElementNS(svgNS, tag);
        if (cls) el.setAttribute('class', cls);
        svgEl.appendChild(el);
        return el;
    }
    const snakePath = mkSvgEl('path', 'snake-wave');
    const activeGlow = mkSvgEl('path', 'snake-wave snake-active');
    activeGlow.style.opacity = '0';
    childRecords.forEach(c => {
        c.connEl = mkSvgEl('path', 'child-connector');
        c.dotParEl = mkSvgEl('circle', 'child-dot');
        c.dotChdEl = mkSvgEl('circle', 'child-dot');
        c.dotParEl.setAttribute('r', '3');
        c.dotChdEl.setAttribute('r', '3');
    });

    let dashOffset = 0;
    let prevTime = performance.now();
    let hintHidden = false;

    function animateSystemMap() {
        const now = performance.now();
        const dt = Math.min(now - prevTime, 50);
        prevTime = now;
        const vpH = viewport.offsetHeight;
        const centreY = vpH * 0.5;
        const rect = wrapper.getBoundingClientRect();
        const scrollH = wrapper.offsetHeight - window.innerHeight;
        const progress = scrollH > 0 ? Math.max(0, Math.min(1, -rect.top / scrollH)) : 0;

        const maxTx = TRACK_W - viewport.offsetWidth;
        if (!dragState) {
            targetTx = -(progress * maxTx);
            currentTx += (targetTx - currentTx) * 0.08;
        }
        track.style.transform = `translate3d(${currentTx}px, 0, 0)`;

        if (progress > 0.02 && !hintHidden && scrollHint) {
            scrollHint.style.opacity = '0';
            hintHidden = true;
        }

        const centreX = viewport.offsetWidth / 2 - currentTx;
        let activeIdx = -1;
        nodeEls.forEach(({ el, cat }, i) => {
            if (cat.isDragging) { cat.currentY = cat.dragY; }
            else {
                const anchorY = cat.pinnedY != null ? cat.pinnedY : centreY;
                const floatY = Math.sin(now * cat.floatFreq + cat.floatPhase) * cat.floatAmp;
                cat.currentY = anchorY + floatY;
            }
            el.style.transform = `translate3d(${cat.baseX}px, ${cat.currentY}px, 0) translate(-50%, -50%)`;
            const dx = Math.abs(cat.baseX - centreX);
            if (dx < 280) { el.classList.add('active'); activeIdx = i; }
            else { el.classList.remove('active'); }
        });

        svgEl.setAttribute('viewBox', `0 0 ${TRACK_W} ${vpH}`);
        svgEl.setAttribute('width', TRACK_W);
        svgEl.setAttribute('height', vpH);

        let path = `M${categories[0].baseX},${categories[0].currentY}`;
        for (let i = 0; i < N - 1; i++) {
            const a = categories[i], b = categories[i + 1];
            const dx = b.baseX - a.baseX;
            const dir = (i % 2 === 0) ? -1 : 1;
            path += ` C${a.baseX + dx * CP_PULL},${a.currentY + dir * WAVE_AMP} ${b.baseX - dx * CP_PULL},${b.currentY + dir * WAVE_AMP} ${b.baseX},${b.currentY}`;
        }
        dashOffset -= dt * 0.012;
        snakePath.setAttribute('d', path);
        snakePath.setAttribute('style', `stroke-dashoffset:${dashOffset}`);

        if (activeIdx >= 0 && activeIdx < N - 1) {
            const a = categories[activeIdx], b = categories[activeIdx + 1];
            const dx = b.baseX - a.baseX;
            const dir = (activeIdx % 2 === 0) ? -1 : 1;
            const ap = `M${a.baseX},${a.currentY} C${a.baseX + dx * CP_PULL},${a.currentY + dir * WAVE_AMP} ${b.baseX - dx * CP_PULL},${b.currentY + dir * WAVE_AMP} ${b.baseX},${b.currentY}`;
            activeGlow.setAttribute('d', ap);
            activeGlow.setAttribute('style', `stroke-dashoffset:${dashOffset}`);
            activeGlow.style.opacity = '1';
        } else { activeGlow.style.opacity = '0'; }

        childRecords.forEach(c => {
            const parentY = c.cat.currentY;
            let cx, cy;
            if (c.isDragging) { cx = c.dragX; cy = c.dragY; }
            else if (c.pinnedX != null) { cx = c.pinnedX; cy = c.pinnedY + Math.sin(now * c.ff + c.fp) * c.fa; }
            else {
                const childFloat = Math.sin(now * c.ff + c.fp) * c.fa;
                cx = c.cat.baseX + Math.cos(c.angle) * c.radius;
                cy = parentY + Math.sin(c.angle) * c.radius + childFloat;
            }
            c.el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
            const ddx = cx - c.cat.baseX;
            const pull = Math.max(80, Math.abs(ddx) * 0.55);
            const cp1x = c.cat.baseX + (ddx >= 0 ? pull : -pull);
            const cp2x = cx + (ddx >= 0 ? -pull : pull);
            const d = `M${c.cat.baseX},${parentY} C${cp1x},${parentY} ${cp2x},${cy} ${cx},${cy}`;
            c.connEl.setAttribute('d', d);
            c.dotParEl.setAttribute('cx', c.cat.baseX);
            c.dotParEl.setAttribute('cy', parentY);
            c.dotChdEl.setAttribute('cx', cx);
            c.dotChdEl.setAttribute('cy', cy);
        });
        requestAnimationFrame(animateSystemMap);
    }
    animateSystemMap();
})();


// ===================================================================
// 9. FAQ ACCORDION
// ===================================================================
(function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            faqItems.forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
})();

// ===================================================================
// 10. CURSOR GLOW TRAIL
// ===================================================================
(function initCursorGlow() {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    document.body.appendChild(glow);
    let mx = -500, my = -500, cx = -500, cy = -500;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; glow.classList.add('active'); });
    document.addEventListener('mouseleave', () => { glow.classList.remove('active'); });
    function animate() { cx += (mx - cx) * 0.12; cy += (my - cy) * 0.12; glow.style.left = cx + 'px'; glow.style.top = cy + 'px'; requestAnimationFrame(animate); }
    animate();
})();

// ===================================================================
// 11. SCROLL REVEAL OBSERVER
// ===================================================================
(function initScrollReveal() {
    const defaultObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => defaultObserver.observe(el));

    const staggeredObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const boxes = entry.target.querySelectorAll('.project-reveal-box:not(.visible)');
                boxes.forEach((box, i) => {
                    setTimeout(() => {
                        box.classList.add('visible');
                    }, i * 200); // 0.2s stagger
                });
            } else {
                // Reverse: Remove visible class from all boxes when grid leaves viewport
                const boxes = entry.target.querySelectorAll('.project-reveal-box');
                boxes.forEach(box => box.classList.remove('visible'));
            }
        });
    }, { threshold: 0.15 });

    const projectsGrid = document.querySelector('.feature-grid');
    if (projectsGrid) staggeredObserver.observe(projectsGrid);
})();

// ===================================================================
// 12. PROJECT CARD 3D TILT
// ===================================================================
(function initProjectTilt() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();

            const isOn = (
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom
            );

            if (!isOn) return;

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const xc = rect.width / 2;
            const yc = rect.height / 2;

            const dx = x - xc;
            const dy = y - yc;

            // Subtle tilt for a premium feel
            const tiltX = (dy / yc) * -6;
            const tiltY = (dx / xc) * 6;

            card.style.transform = `translateY(-10px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
    });

    // Clean reset on mouse leave
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
        });
    });
})();
// ===================================================================
// 13. INTERNSHIP ROADMAP ENGINE (WORKFLOW STYLE)
// ===================================================================
(function initInternshipRoadmap() {
    const container = document.getElementById('roadmap-container');
    const svgPath = document.getElementById('roadmap-path');
    const nodesData = document.querySelectorAll('#roadmap-nodes-data .node-data');
    const detailPanel = document.getElementById('node-detail-panel');
    const panelSidebar = document.getElementById('panel-sidebar');
    const panelPreview = document.getElementById('panel-preview');
    const panelClose = document.getElementById('panel-close');

    if (!container || !svgPath || nodesData.length === 0) return;

    const nodes = [];
    const containerWidth = 1200;
    const containerHeight = 500; // Expanded for 7 nodes

    nodesData.forEach((data, i) => {
        const node = document.createElement('div');
        node.className = `roadmap-node bento-node-${i}`;

        const role = data.getAttribute('data-role');
        const icon = data.getAttribute('data-icon');
        const org = data.getAttribute('data-org');
        const date = data.getAttribute('data-date');
        const tag = data.getAttribute('data-tag') || 'STEP';
        const summary = data.getAttribute('data-summary');
        const file = data.getAttribute('data-file');
        const content = data.innerHTML;

        node.innerHTML = `
            <div class="node-header">
                <div class="node-header-icon">${icon}</div>
                <h4>${role}</h4>
                <div class="node-tag">${tag}</div>
            </div>
            <div class="node-body">
                <span class="node-org">${org}</span>
                <span class="node-summary">${summary}</span>
            </div>
        `;

        container.appendChild(node);
        nodes.push({ el: node, data: { role, icon, org, date, tag, summary, file, content } });

        node.addEventListener('click', (e) => {
            e.stopPropagation();
            showNodeDetail(nodes[i]);
        });
    });

    // Draw a single smooth Bezier curve connecting all nodes dynamically based on grid position
    function drawConnections() {
        if (nodes.length < 2) return;

        const svg = document.getElementById('roadmap-svg');
        const existingDefs = svg.querySelector('defs');
        if (existingDefs) existingDefs.remove();
        svgPath.removeAttribute('marker-end');

        let d = "";
        const containerRect = container.getBoundingClientRect();
        
        // Update viewBox to match current grid size
        svg.setAttribute('viewBox', `0 0 ${containerRect.width} ${containerRect.height}`);

        for (let i = 0; i < nodes.length - 1; i++) {
            const startNode = nodes[i].el;
            const endNode = nodes[i + 1].el;

            const startRect = startNode.getBoundingClientRect();
            const endRect = endNode.getBoundingClientRect();

            // Determine relative positioning
            const isSameRow = Math.abs(startRect.top - endRect.top) < 50; 
            const isLeftToRight = startRect.left < endRect.left;
            
            let startX, startY, endX, endY;

            if (isSameRow) {
                if (isLeftToRight) {
                    startX = startRect.right - containerRect.left;
                    startY = startRect.top - containerRect.top + startRect.height / 2;
                    endX = endRect.left - containerRect.left;
                    endY = endRect.top - containerRect.top + endRect.height / 2;
                } else {
                    startX = startRect.left - containerRect.left;
                    startY = startRect.top - containerRect.top + startRect.height / 2;
                    endX = endRect.right - containerRect.left;
                    endY = endRect.top - containerRect.top + endRect.height / 2;
                }
            } else {
                // Vertical connection
                startX = startRect.left - containerRect.left + startRect.width / 2;
                startY = startRect.bottom - containerRect.top;
                endX = endRect.left - containerRect.left + endRect.width / 2;
                endY = endRect.top - containerRect.top;
            }

            if (i === 0) d += `M ${startX} ${startY}`;

            if (isSameRow) {
                const offset = Math.max(Math.abs(endX - startX) * 0.4, 20);
                if (isLeftToRight) {
                    d += ` C ${startX + offset} ${startY}, ${endX - offset} ${endY}, ${endX} ${endY}`;
                } else {
                    d += ` C ${startX - offset} ${startY}, ${endX + offset} ${endY}, ${endX} ${endY}`;
                }
            } else {
                const offset = Math.max(Math.abs(endY - startY) * 0.4, 20);
                d += ` C ${startX} ${startY + offset}, ${endX} ${endY - offset}, ${endX} ${endY}`;
            }
        }

        svgPath.setAttribute('d', d);
        svgPath.style.stroke = "rgba(37, 99, 235, 0.5)";
        svgPath.style.strokeWidth = "3px";
        svgPath.style.fill = "none";
    }

    // Delay drawing slightly to let the grid layout compute
    setTimeout(drawConnections, 100);
    window.addEventListener('resize', drawConnections);

    // Interaction Handlers (Full Screen Modal with Preview)
    function showNodeDetail(nodeObj) {
        container.classList.add('node-active');
        nodeObj.el.classList.add('active');

        panelSidebar.innerHTML = `
            <div style="margin-bottom: 32px;">
                <div class="node-header-icon" style="width: 48px; height: 48px; font-size: 24px; margin-bottom: 16px;">${nodeObj.data.icon}</div>
                <div class="node-tag" style="display:inline-block; margin-bottom: 12px;">${nodeObj.data.tag}</div>
                <h3 style="font-size: 24px; color: #fff; line-height: 1.2; margin-bottom: 8px;">${nodeObj.data.role}</h3>
                <p style="color: var(--accent-blue); font-family: 'JetBrains Mono'; font-size: 12px; font-weight: 600;">${nodeObj.data.org}</p>
                <p style="color: rgba(255,255,255,0.4); font-size: 11px; margin-top: 4px;">${nodeObj.data.date}</p>
            </div>
            <div class="panel-content-text">
                ${nodeObj.data.content}
            </div>
        `;

        const file = nodeObj.data.file;
        if (file) {
            const isPdf = file.toLowerCase().endsWith('.pdf');
            if (isPdf) {
                panelPreview.innerHTML = `<iframe src="${file}" type="application/pdf" style="width:100%;height:100%;border:none;"></iframe>`;
            } else {
                panelPreview.innerHTML = `<img src="${file}" alt="Certificate Preview" style="width:100%;height:100%;object-fit:contain;">`;
            }
        } else {
            panelPreview.innerHTML = `<div style="height:100%;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,0.1);font-family:'JetBrains Mono';font-size:12px;">NO PREVIEW AVAILABLE</div>`;
        }

        detailPanel.classList.add('visible');
    }

    function closeDetail() {
        container.classList.remove('node-active');
        document.querySelectorAll('.roadmap-node').forEach(n => n.classList.remove('active'));
        detailPanel.classList.remove('visible');
        setTimeout(() => { panelPreview.innerHTML = ''; }, 400);
    }

    if (panelClose) panelClose.addEventListener('click', closeDetail);
    document.addEventListener('click', (e) => {
        if (detailPanel.classList.contains('visible') && !detailPanel.contains(e.target)) {
            closeDetail();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeDetail();
    });
})();

// ===================================================================
// 14. CONTACT SECTION REACTIVE GLOW
// ===================================================================
// Copy to Clipboard Utility
function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = element.querySelector('.pill-copy-btn');
        btn.classList.add('copied');

        // Reset after 2 seconds
        setTimeout(() => {
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

(function initContactGlow() {
    if (window.matchMedia('(max-width: 768px)').matches) return; // mouse-follow rAF not needed on touch
    const contactSection = document.getElementById('contact');
    const glowAura = document.querySelector('.contact-glow-aura');
    if (!contactSection || !glowAura) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    // Track mouse within the section
    contactSection.addEventListener('mousemove', (e) => {
        const rect = contactSection.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Smooth animation loop
    function animateGlow() {
        // Linear interpolation for smooth lag
        const lerp = 0.1;
        currentX += (mouseX - currentX) * lerp;
        currentY += (mouseY - currentY) * lerp;

        glowAura.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
})();

// ===================================================================
// 15. CUSTOM SECTION CURSOR
// ===================================================================
(function initCustomCursor() {
    const pointer = document.getElementById('custom-pointer');
    const sections = document.querySelectorAll('.faq-section, .contact-section');
    if (!pointer || window.innerWidth <= 768) return;

    let targetX = 0, targetY = 0;
    let actualX = 0, actualY = 0;

    document.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;

        const isInside = Array.from(sections).some(section => {
            const rect = section.getBoundingClientRect();
            return e.clientX >= rect.left && e.clientX <= rect.right &&
                e.clientY >= rect.top && e.clientY <= rect.bottom;
        });

        if (isInside) pointer.classList.add('visible');
        else pointer.classList.remove('visible');
    });

    function updatePointer() {
        // High-frequency lerp for smooth, responsive feel
        const lerp = 0.15;
        actualX += (targetX - actualX) * lerp;
        actualY += (targetY - actualY) * lerp;

        // Using translate3d for GPU acceleration (smoother than top/left)
        // Offset by half size (12px) to center the pointer on the tip
        pointer.style.transform = `translate3d(${actualX}px, ${actualY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(updatePointer);
    }
    updatePointer();
})();
// ===================================================================
// 15. CINEMATIC HERO ENTRANCE
// ===================================================================
(function initHeroEntrance() {
    const heroContent = document.querySelector('.hero-heading-container');
    if (!heroContent) return;

    // Trigger the split animation AFTER the slide-in + some delay
    // Total wait: IntroScreen(3.2s) + EntranceAnim(1.5s) + buffer
    setTimeout(() => {
        heroContent.classList.add('break-lines');
    }, 5200);
})();

// ===================================================================
// 16. HERO MOUSE FOLLOW EFFECT
// ===================================================================
(function initHeroMouseFollow() {
    if (window.matchMedia('(max-width: 768px)').matches) return; // skip on mobile
    const heroWrapper = document.getElementById('hero');
    const glowAura = document.querySelector('.hero-glow-aura');
    if (!heroWrapper || !glowAura) return;

    let targetX = 0, targetY = 0;
    let actualX = 0, actualY = 0;

    heroWrapper.addEventListener('mousemove', (e) => {
        targetX = e.clientX;
        targetY = e.clientY;
    });

    function updateHeroGlow() {
        const lerp = 0.05;
        actualX += (targetX - actualX) * lerp;
        actualY += (targetY - actualY) * lerp;

        glowAura.style.left = `${actualX}px`;
        glowAura.style.top = `${actualY}px`;

        requestAnimationFrame(updateHeroGlow);
    }
    requestAnimationFrame(updateHeroGlow);
})();

// ===================================================================
// 17. SMART DOCK CONTROLLER (SYNCED SCROLL)
// ===================================================================
(function initDock() {
    const dock = document.querySelector('.nav-dock');
    const dockItems = document.querySelectorAll('.dock-item');
    const sections = [
        document.getElementById('about'),
        document.getElementById('skills'),
        document.getElementById('projects'),
        document.getElementById('experience'),
        document.getElementById('education'),
        document.getElementById('contact')
    ];

    if (!dock) return;

    function updateDock() {
        const y = window.scrollY;
        const vh = window.innerHeight;

        // 1. Visibility Toggle
        if (y > vh * 0.3) {
            dock.classList.add('visible');
        } else {
            dock.classList.remove('visible');
        }

        // 2. Active State Strategy
        let currentId = "";
        sections.forEach(sec => {
            if (sec) {
                const rect = sec.getBoundingClientRect();
                // If section top is above middle of screen, it's potentially active
                if (rect.top < vh * 0.5) {
                    currentId = sec.id;
                }
            }
        });

        dockItems.forEach(item => {
            const href = item.getAttribute('href');
            if (href === `#${currentId}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', updateDock, { passive: true });
    updateDock(); // Initial check
})();
// ===================================================================
// 16. JOURNEY SCROLLING TEXT (WAVE FLOW)
// ===================================================================
(function initJourneyScrolling() {
    const scroller = document.getElementById('journey-scroller');
    const header = document.querySelector('.journey-header');
    if (!scroller || !header) return;

    // 1. Split text into spans (if not already split)
    if (!scroller.querySelector('.journey-char')) {
        const text = scroller.textContent.trim();
        scroller.innerHTML = text.split('').map(char => {
            if (char === ' ') return '<span class="journey-char">&nbsp;</span>';
            return `<span class="journey-char">${char}</span>`;
        }).join('');
    }

    const chars = scroller.querySelectorAll('.journey-char');
    const manifesto = header.querySelector('.roadmap-manifesto');
    const revealContainer = header.querySelector('.journey-reveal-container');

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: header,
            start: "top top",
            end: "+=2500", // Adjusted for better UX so it doesn't take forever to appear
            pin: true,
            scrub: 2.2,
            anticipatePin: 1
        }
    });

    // Step 1: Full Horizontal Travel
    tl.to(scroller, {
        x: "-300vw", // Restored full travel as requested
        ease: "none"
    }, 0);

    // Smoothly hide scroller to prioritize box
    tl.to(scroller, {
        opacity: 0,
        duration: 0.5
    }, 0.35);

    tl.to(manifesto, {
        opacity: 1,
        y: 20, // Lowered the box position as requested
        scale: 1,
        ease: "power3.out",
        duration: 0.6,
        onStart: () => {
            if (revealContainer) gsap.set(revealContainer, { pointerEvents: 'auto' });
        },
        onComplete: () => {
            // Apply infinite floating effect after reveal finishes
            gsap.to(manifesto, {
                y: "-=15",
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
    }, 0.3);

    // Removed the black background fade to keep it transparent
    // 3. Smooth "Hump" Snake Wave (Continuous Flow)
    gsap.fromTo(chars,
        { y: 35, opacity: 0.8 },
        {
            y: -35,
            opacity: 1,
            ease: "sine.inOut",
            duration: 1.2,
            stagger: {
                each: 0.08,
                repeat: -1,
                yoyo: true
            }
        }
    );
})();
// ===================================================================
// 17. PROJECT MODAL INTERACTION
// ===================================================================
(function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-project-img');
    const modalTagline = document.getElementById('modal-project-tagline');
    const modalTitle = document.getElementById('modal-project-title');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalTags = document.getElementById('modal-project-tags');
    const modalLink = document.getElementById('modal-project-link');
    const closeBtn = document.getElementById('project-modal-close');
    const backdrop = document.getElementById('project-modal-backdrop');

    if (!modal) return;

    // Selection of all project cards
    const projectCards = document.querySelectorAll('.feature-card.motia-card');

    projectCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            // Prevent link clicks from triggering modal if any
            if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) return;

            const title = card.querySelector('h4').textContent;
            const tagline = card.querySelector('.project-tagline').textContent;
            const desc = card.querySelector('p').textContent;
            const imgSrc = card.querySelector('.project-img-wrap img').src;
            const tagsHTML = card.querySelector('.tag-row').innerHTML;
            const linkHref = card.querySelector('.project-btn').href;

            // Populate Modal
            modalImg.src = imgSrc;
            modalTagline.textContent = tagline;
            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            modalTags.innerHTML = tagsHTML;
            modalLink.href = linkHref;

            // Show Modal
            modal.classList.add('visible');
            document.body.style.overflow = 'hidden'; // Lock scroll
        });
    });

    const closeModal = () => {
        modal.classList.remove('visible');
        document.body.style.overflow = ''; // Unlock scroll
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('visible')) {
            closeModal();
        }
    });
})();
// ===================================================================
// 18. Educational Milestones
// ===================================================================
(function initCurvedEduTitle() {
    const title = document.getElementById('edu-curved-title');
    if (!title) return;

    const text = title.textContent.trim();
    title.innerHTML = ''; // Clear original

    const chars = text.split('');
    const arc = 30; // Subtler arc
    const radius = 400; // Much smaller radius so it stays visible

    chars.forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'curved-char';

        // Calculate angle for each character
        const angle = -arc / 2 + (arc / (chars.length - 1)) * i;

        // Use CSS variables for the transform logic
        span.style.setProperty('--char-angle', `${angle}deg`);
        span.style.setProperty('--char-radius', `${radius}px`);

        title.appendChild(span);
    });
})();
// ===================================================================
// 19. FLOATING EDUCATION SYMBOLS
// ===================================================================
(function initFloatingEducationSymbols() {
    const container = document.getElementById('edu-floating-symbols');
    if (!container) return;

    const symbols = [
        'pdf/college.svg',
        'pdf/education-learning-math-mathematics.svg',
        'pdf/education-internet-school-.svg',
        'pdf/education-files-school.svg',
        'pdf/education-graduation-key.svg',
        'pdf/computer.svg',
        'pdf/notebook.svg'
    ];
    const count = 14; // Increased density
    const itemsData = [];

    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'edu-floating-item';
        
        const img = document.createElement('img');
        img.src = symbols[Math.floor(Math.random() * symbols.length)];
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'contain';
        img.style.opacity = '0.9'; // Increased opacity for better visibility
        item.appendChild(img);

        // Random sizing
        const size = 20 + Math.random() * 40; // 20px to 60px

        item.style.left = '0px';
        item.style.top = '0px';
        item.style.width = `${size}px`;
        item.style.height = `${size}px`;
        
        container.appendChild(item);

        // Physics properties for true continuous floating
        const speed = 0.3 + Math.random() * 0.5;
        const angle = Math.random() * Math.PI * 2;
        
        itemsData.push({
            el: item,
            x: Math.random() * container.offsetWidth,
            y: Math.random() * container.offsetHeight,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rotation: Math.random() * 360,
            vr: (Math.random() - 0.5) * 0.5,
            size: size
        });
    }

    // JS Animation Loop
    function animate() {
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        itemsData.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vr;

            // Bounce off edges smoothly
            if (p.x <= 0 || p.x + p.size >= width) p.vx *= -1;
            if (p.y <= 0 || p.y + p.size >= height) p.vy *= -1;

            p.el.style.transform = `translate(${p.x}px, ${p.y}px) rotate(${p.rotation}deg)`;
        });

        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
})();

// ===================================================================
// 22. BINARY RAIN BACKGROUND (Toolkit Section)
// ===================================================================
(function initBinaryRain() {
    if (window.matchMedia('(max-width: 768px)').matches) return; // too heavy for mobile
    const container = document.getElementById('binary-rain-bg');
    if (!container) return;

    const binaryPatterns = ['0', '1', '01', '10', '11', '00', '101', '010', '110', '001'];
    const count = 50; // Denser rain

    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'binary-item';

        // Random content from patterns
        item.textContent = binaryPatterns[Math.floor(Math.random() * binaryPatterns.length)];

        // Random horizontal position
        item.style.left = `${Math.random() * 100}%`;

        // Randomize size slightly
        const scale = 0.5 + Math.random() * 1.5;
        item.style.fontSize = `${12 * scale}px`;

        // Staggered Animation
        const duration = 15 + Math.random() * 25; // 15-40s
        const delay = Math.random() * -40; // Pre-start some

        item.style.animationDuration = `${duration}s`;
        item.style.animationDelay = `${delay}s`;

        // Varying opacity for depth (Increased for better visibility)
        item.style.opacity = (0.3 + Math.random() * 0.5).toString();

        container.appendChild(item);
    }
})();

// ===================================================================
// 23. PROJECTS FLOATING SYMBOLS (!,?) - VERTICAL LINES
// ===================================================================
(function initProjectsFloatingSymbols() {
    const container = document.getElementById('projects-floating-symbols');
    if (!container) return;

    const symbols = ['!', '?'];
    const count = 60; // Denser rain for smaller symbols

    for (let i = 0; i < count; i++) {
        const item = document.createElement('div');
        item.className = 'project-float-item';

        item.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        // Vertical Lanes: Random horizontal column
        item.style.left = `${Math.random() * 100}%`;

        // Random Small Size
        const size = 10 + Math.random() * 12; // 10px to 22px
        item.style.fontSize = `${size}px`;

        // Distinct rotation while falling
        item.style.setProperty('--dr', `${(Math.random() > 0.5 ? 1 : -1) * (360 + Math.random() * 720)}deg`);

        const duration = 15 + Math.random() * 20;
        const delay = Math.random() * -30;

        item.style.animationDuration = `${duration}s`;
        item.style.animationDelay = `${delay}s`;

        container.appendChild(item);
    }
})();

// ===================================================================
// 24. NEURAL BRAIN ARCHITECTURE (EXPLICIT WHITE BRAIN)
// ===================================================================
(function initNeuralBrain() {
    if (window.matchMedia('(max-width: 768px)').matches) return; // canvas animation too heavy for mobile
    const canvas = document.getElementById('neural-brain-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;

    let nodes = [];
    let animationFrameId;
    const nodeCount = 140;
    const connectionRadius = 180;

    class Node {
        constructor() {
            this.init();
        }

        init() {
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            const lobe = Math.random() > 0.5 ? 1 : -1;
            const angle = (Math.random() * Math.PI) - (Math.PI / 2);
            const dist = 40 + Math.random() * 240;

            this.x = centerX + (lobe * 70) + Math.cos(angle) * dist;
            this.y = centerY + Math.sin(angle) * dist * 0.75;

            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.radius = 3.5 + Math.random() * 2.5;
            this.pulse = Math.random() * Math.PI * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulse += 0.04;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            const glow = 0.5 + Math.sin(this.pulse) * 0.5;
            // High Visibility White Color (80% Opacity as requested)
            const alpha = 0.8;

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;

            ctx.shadowBlur = 15 * glow;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
            ctx.closePath();
            ctx.shadowBlur = 0;
        }
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push(new Node());
        }
    }

    function resize() {
        const w = container.offsetWidth || window.innerWidth;
        const h = container.offsetHeight || 1000;
        canvas.width = w;
        canvas.height = h;
        createNodes();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < nodes.length; i++) {
            const a = nodes[i];
            a.update();
            a.draw();

            for (let j = i + 1; j < nodes.length; j++) {
                const b = nodes[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionRadius) {
                    const opacity = (1 - dist / connectionRadius) * 0.6;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 1.6;
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();

    window.addEventListener('load', resize);
    setTimeout(resize, 600);
})();

// ===================================================================
// 25. PITCH PORTAL FORM HANDLER (CINEMATIC SIMULATION)
// ===================================================================
document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.querySelector('.pitch-terminal');
    if (!terminal) return;

    const btn = terminal.querySelector('.pitch-btn');
    const toast = terminal.querySelector('.pitch-success-toast');
    const textarea = terminal.querySelector('.terminal-textarea');
    const emailInput = terminal.querySelector('.terminal-input-inline');

    if (!btn) return;

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        console.log("Pitch Button Clicked"); // Debug log

        if (this.disabled) return;

        const originalBtnText = this.innerHTML;

        // 1. Loading State
        this.innerHTML = 'TRANSMITTING...';
        this.style.opacity = '0.7';
        this.disabled = true;

        setTimeout(() => {
            // 2. Success State
            console.log("Success State Triggered");
            this.innerHTML = 'SIGNAL SENT ✓';
            this.style.background = '#10b981';
            this.style.color = '#fff';
            this.style.opacity = '1';

            // Show Toast
            if (toast) {
                toast.classList.add('active');
            }

            // Clear inputs
            if (textarea) textarea.value = '';
            if (emailInput) emailInput.value = '';

            // 3. Reset
            setTimeout(() => {
                this.innerHTML = originalBtnText;
                this.style.background = '';
                this.style.color = '';
                this.style.opacity = '1';
                this.disabled = false;
                if (toast) toast.classList.remove('active');
            }, 5000);
        }, 1500);
    });
});

// ===================================================================
// 23. CENTER SCREEN 5-WORD GREETING CYCLE (4 SECONDS TOTAL)
// ===================================================================
let isGreetingRunning = false;
window.launchGreetingCycle = function() {
    if (isGreetingRunning) return;
    isGreetingRunning = true;

    const greetings = [
        { text: "Hello", lang: "en" },
        { text: "नमस्ते", lang: "hi" },
        { text: "こんにちは", lang: "ja" },
        { text: "Bonjour", lang: "fr" },
        { text: "Hola", lang: "es" }
    ];
    const greetingEl = document.getElementById('greeting-word');
    const greetingCenter = document.getElementById('hero-greeting-center');
    const heroMainContainer = document.getElementById('hero-main-container');
    
    if (!greetingEl) return;
    
    // Lock body and hide all rest-of-page content exclusively for 4s
    document.body.classList.add('greeting-active');
    
    let currentIndex = 0;
    greetingEl.textContent = greetings[0].text;
    greetingEl.setAttribute('data-lang', greetings[0].lang);
    greetingEl.classList.remove('word-out');
    greetingEl.classList.add('word-in');

    if (greetingCenter) {
        greetingCenter.style.display = 'flex';
        greetingCenter.classList.remove('fade-out');
    }
    
    // 5 words across 3.0 seconds => 600ms per word cycle
    const intervalId = setInterval(() => {
        // Smoothly fade & blur out current word
        greetingEl.classList.remove('word-in');
        greetingEl.classList.add('word-out');
        
        setTimeout(() => {
            currentIndex++;
            if (currentIndex >= greetings.length) {
                // Stop cycle
                clearInterval(intervalId);
                
                // Soft cinematic fade out of center container
                if (greetingCenter) {
                    greetingCenter.classList.add('fade-out');
                    setTimeout(() => {
                        greetingCenter.style.display = 'none';
                    }, 600);
                }
                
                // Unlock body and reveal all rest-of-page content
                document.body.classList.remove('greeting-active');
                
                // Smoothly reveal hero main screen
                if (heroMainContainer) {
                    heroMainContainer.classList.add('hero-revealed');
                }
                
                // Smoothly reveal skills marquee row
                const marqueeSection = document.querySelector('.skills-marquee-section');
                if (marqueeSection) {
                    marqueeSection.classList.add('marquee-revealed');
                }
                
                // Launch dynamic typewriter animation
                setTimeout(startHeroTypewriter, 350);
                return;
            }
            
            // Set next greeting text and smoothly slide/fade in
            greetingEl.textContent = greetings[currentIndex].text;
            greetingEl.setAttribute('data-lang', greetings[currentIndex].lang);
            
            greetingEl.classList.remove('word-out');
            // Force reflow for smooth animation
            void greetingEl.offsetWidth;
            greetingEl.classList.add('word-in');
        }, 200);
    }, 600);
};

// Dynamic Typewriter Loop for Hero Introduction
function startHeroTypewriter() {
    const textEl = document.getElementById('hero-typewriter-text');
    if (!textEl) return;

    const phrases = [
        "I build intelligent applications and automation systems using Python, AI and modern LLM technologies.",
        "Architecting scalable LLM systems, RAG pipelines, and autonomous AI agents.",
        "Designing end-to-end intelligent systems from data pipelines to real-time inference."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            textEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 16 : 32;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2800; // Pause at end of sentence
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400; // Pause before typing new sentence
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

