

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

        const antigravitySvg = `<svg viewBox="0 0 16 15" fill="none" style="width:34px;height:34px;"><mask id="antigravity__mask0_111_52" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="15"><path d="M14.0777 13.984C14.945 14.6345 16.2458 14.2008 15.0533 13.0084C11.476 9.53949 12.2349 0 7.79033 0C3.34579 0 4.10461 9.53949 0.527295 13.0084C-0.773543 14.3092 0.635692 14.6345 1.50293 13.984C4.86344 11.7076 4.64663 7.69664 7.79033 7.69664C10.934 7.69664 10.7172 11.7076 14.0777 13.984Z" fill="black"/></mask><g mask="url(#antigravity__mask0_111_52)"><g filter="url(#antigravity__filter0_f_111_52)"><path d="M-0.658907 -3.2306C-0.922679 -0.906781 1.07986 1.22861 3.81388 1.53894C6.54791 1.84927 8.97811 0.217009 9.24188 -2.10681C9.50565 -4.43063 7.50312 -6.56602 4.76909 -6.87635C2.03506 -7.18667 -0.395135 -5.55442 -0.658907 -3.2306Z" fill="#FFE432"/></g><g filter="url(#antigravity__filter1_f_111_52)"><path d="M9.88233 4.36642C10.5673 7.31568 13.566 9.13902 16.5801 8.43896C19.5942 7.73891 21.4823 4.78056 20.7973 1.83131C20.1123 -1.11795 17.1136 -2.94128 14.0995 -2.24123C11.0854 -1.54118 9.19733 1.41717 9.88233 4.36642Z" fill="#FC413D"/></g><g filter="url(#antigravity__filter2_f_111_52)"><path d="M-8.05291 6.34512C-7.18736 9.38883 -3.28925 10.9473 0.653774 9.82598C4.5968 8.7047 7.09158 5.32829 6.22603 2.28458C5.36048 -0.759142 1.46236 -2.31758 -2.48066 -1.19629C-6.42368 -0.0750048 -8.91846 3.3014 -8.05291 6.34512Z" fill="#00B95C"/></g><g filter="url(#antigravity__filter3_f_111_52)"><path d="M-8.05291 6.34512C-7.18736 9.38883 -3.28925 10.9473 0.653774 9.82598C4.5968 8.7047 7.09158 5.32829 6.22603 2.28458C5.36048 -0.759142 1.46236 -2.31758 -2.48066 -1.19629C-6.42368 -0.0750048 -8.91846 3.3014 -8.05291 6.34512Z" fill="#00B95C"/></g><g filter="url(#antigravity__filter4_f_111_52)"><path d="M-4.92402 8.86746C-2.75421 11.0837 0.982691 10.9438 3.42257 8.55507C5.86246 6.1663 6.08139 2.43321 3.91158 0.216963C1.74177 -1.99928 -1.99513 -1.85942 -4.43501 0.529349C-6.87489 2.91812 -7.09383 6.65122 -4.92402 8.86746Z" fill="#00B95C"/></g><g filter="url(#antigravity__filter5_f_111_52)"><path d="M6.42819 17.2263C7.10197 20.1273 9.91278 21.953 12.7063 21.3042C15.4998 20.6553 17.2182 17.7777 16.5444 14.8767C15.8707 11.9757 13.0599 10.15 10.2663 10.7988C7.47281 11.4477 5.75441 14.3253 6.42819 17.2263Z" fill="#3186FF"/></g><g filter="url(#antigravity__filter6_f_111_52)"><path d="M1.66508 -5.94539C0.254213 -2.80254 1.7978 0.951609 5.11277 2.43973C8.42774 3.92785 12.2588 2.58642 13.6696 -0.556431C15.0805 -3.69928 13.5369 -7.45343 10.222 -8.94155C6.90699 -10.4297 3.07594 -9.08824 1.66508 -5.94539Z" fill="#FBBC04"/></g><g filter="url(#antigravity__filter7_f_111_52)"><path d="M-2.11428 24.3903C-5.52984 23.0496 0.307266 12.0177 1.75874 8.32038C3.21024 4.62304 7.15576 2.71272 10.5713 4.05357C13.9869 5.39442 18.0354 12.7796 16.5838 16.477C15.1323 20.1743 1.30129 25.7311 -2.11428 24.3903Z" fill="#3186FF"/></g><g filter="url(#antigravity__filter8_f_111_52)"><path d="M18.5814 10.6598C17.6669 11.727 15.2806 11.1828 13.2514 9.44417C11.2222 7.70556 10.3185 5.43097 11.2329 4.3637C12.1473 3.29646 14.5336 3.84069 16.5628 5.57928C18.592 7.31789 19.4958 9.59249 18.5814 10.6598Z" fill="#749BFF"/></g><g filter="url(#antigravity__filter9_f_111_52)"><path d="M11.7552 5.22715C15.5162 7.77124 19.8471 7.93838 21.4286 5.60045C23.0101 3.26253 21.2433 -0.695128 17.4823 -3.23922C13.7213 -5.78331 9.39044 -5.95044 7.80896 -3.61252C6.22747 -1.27459 7.99428 2.68306 11.7552 5.22715Z" fill="#FC413D"/></g><g filter="url(#antigravity__filter10_f_111_52)"><path d="M-0.592149 1.08896C-1.5239 3.33663 -1.21959 5.59799 0.0875457 6.13985C1.39468 6.68171 3.20966 5.29888 4.14141 3.05121C5.07316 0.803541 4.76885 -1.45782 3.46171 -1.99968C2.15458 -2.54154 0.339602 -1.15871 -0.592149 1.08896Z" fill="#FFEE48"/></g></g><defs><filter id="antigravity__filter0_f_111_52" x="-2.12817" y="-8.35998" width="12.8393" height="11.383" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="0.722959" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter1_f_111_52" x="2.75168" y="-9.38089" width="25.1763" height="24.96" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="3.49513" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter2_f_111_52" x="-14.1669" y="-7.50196" width="26.5068" height="23.6338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.97119" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter3_f_111_52" x="-14.1669" y="-7.50196" width="26.5068" height="23.6338" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.97119" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter4_f_111_52" x="-12.3607" y="-7.29981" width="23.709" height="23.6846" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.97119" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter5_f_111_52" x="0.634962" y="5.02095" width="21.7027" height="22.0616" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.82351" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter6_f_111_52" x="-3.97547" y="-14.6666" width="23.2857" height="22.8313" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.5589" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter7_f_111_52" x="-7.7407" y="-0.945408" width="29.1982" height="30.1105" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.2852" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter8_f_111_52" x="6.78641" y="-0.27231" width="16.2415" height="15.5681" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.04485" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter9_f_111_52" x="3.77526" y="-8.71693" width="21.687" height="19.4212" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="1.72712" result="effect1_foregroundBlur_111_52"/></filter><filter id="antigravity__filter10_f_111_52" x="-5.40727" y="-6.39238" width="14.3639" height="16.9254" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/><feGaussianBlur stdDeviation="2.1376" result="effect1_foregroundBlur_111_52"/></filter></defs></svg>`;
    const colabSvg = `<svg style="width:34px;height:34px;display:block;" viewBox="0 0 24 24"><path fill="#E8710A" d="M4.54 9.46 2.19 7.1a6.93 6.93 0 0 0 0 9.79l2.36-2.36a3.59 3.59 0 0 1-.01-5.07Z"/><path fill="#F9AB00" d="m2.19 7.1 2.35 2.36a3.59 3.59 0 0 1 5.08 0l1.71-2.93-.1-.08a6.93 6.93 0 0 0-9.04.65ZM11.34 17.46l-1.72-2.92a3.59 3.59 0 0 1-5.08 0L2.19 16.9a6.93 6.93 0 0 0 9 .65l.11-.09M12 7.1a6.93 6.93 0 0 0 0 9.79l2.36-2.36a3.59 3.59 0 1 1 5.08-5.08l2.37-2.35a6.93 6.93 0 0 0-9.81 0Z"/><path fill="#E8710A" d="m21.81 7.1-2.35 2.36a3.59 3.59 0 0 1-5.08 5.08L12 16.9a6.93 6.93 0 0 0 9.81-9.8Z"/></svg>`;

    const streamlitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 140" style="width:34px;height:34px;"><path fill="#FF4B4B" d="M123.888 2.182c1.92-2.91 6.258-2.91 8.25 0l40.753 60.75l43.321 64.519a17.903 17.903 0 0 1-1.764 2.581c-.452.539-.88 1.048-1.414 1.571l-.011-.005l.01.005c-.117.112-.23.2-.37.306l-.15.115c-.49.366-.995.712-1.514 1.038c-.42.263-.767.495-1.269.736c-.5.242-1.302.532-1.784.697c-.483.167-.644.223-1 .302c-.178.035-.356.07-.533.092c-.122.021-.242.042-.363.057c-.021.007-.05.007-.07.014l-.542.064c-.568.057-1.159.086-1.763.086a697.794 697.794 0 0 1-151.26 0c-.058 0-.114 0-.172-.008h-.17l-.079-.007h-.077c-.058-.007-.115-.007-.171-.014h-.057c-.079-.007-.15-.007-.227-.014c-.47-.036-1.016-.154-1.408-.241c-.393-.079-.627-.143-.953-.215c-3.87-.917-7.424-3.25-9.053-7.025c-.043-.1-.079-.199-.122-.299l-.006-.021L.225 26.025c-1.067-2.844 1.85-5.69 4.693-4.338c.072 0 .214 0 .286.071l77.902 41.173Zm127.006 19.577c2.852-1.564 5.91 1.137 4.914 4.124v.143l-39.595 101.426l-43.321-64.52l77.931-41.173Z"/><path fill="#7D353B" d="M250.894 21.759h-.07l-77.932 41.173l43.321 64.52l39.595-101.426v-.143c.996-2.987-2.062-5.688-4.914-4.124"/><path fill="#BD4043" d="M132.138 2.182c-1.992-2.91-6.33-2.91-8.25 0l-40.782 60.75l44.878 23.723l85.05 44.948c.534-.523.962-1.032 1.414-1.57a17.903 17.903 0 0 0 1.764-2.582l-43.32-64.519l-40.754-60.75Z"/></svg>`;

    const flaskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" style="width:34px;height:34px;"><g fill="none"><rect width="256" height="256" fill="#F4F2ED" rx="60"/><path fill="#000" d="M89.778 193.926c-7.238-5.693-14.96-11.151-20.235-18.837c-11.102-13.554-19.65-29.247-25.494-45.737c-3.532-10.724-4.741-22.22-9.295-32.53c-4.763-7.487.817-15.671 9.018-18.051c3.651-.701 10.072-4.145 2.322-1.684c-6.948 5.098-7.62-4.627-.496-5.243c4.862-.646 6.652-4.627 4.99-8.21c-5.22-3.404 12.656-7.145 3.662-12.223c-9.37-10.11 13.106-12.055 7.56-.575c-1.327 8.829 15.706-1.618 11.754 8.577c4.017 4.896 15.042 1.114 14.768 7.983c5.852.402 7.86 5.325 13.353 5.703c5.693 2.571 16.013 4.597 17.95 11.012c-5.648 4.472-18.726-9.236-19.355 3.141c1.706 18.285 1.272 37.121 7.962 54.533c3.164 10.543 10.835 18.843 17.762 27.054c6.629 8.042 15.607 13.704 24.758 18.471c8.028 3.786 16.682 6.297 25.431 7.872c3.548-2.714 9.813-12.804 15.349-8.549c.262 4.781-10.987 9.994-.53 9.465c6.141-1.852 10.4 4.75 15.457-1.205c4.659 5.518 19.364-3.526 16.049 7.754c-4.482 2.892-11.02 1.144-15.509 5.122c-7.403-3.697-13.296 3.309-21.491 2.423c-9.101 1.63-18.36 2.288-27.587 2.302c-15.137-1.196-30.595-1.7-44.995-6.97c-8.112-2.357-16.029-6.977-23.158-11.598Zm12.784 5.539c7.921 3.426 15.667 7.036 24.348 8.125c13.773 1.916 27.996 4.862 41.818 2.175c-6.256-2.825-12.723 1.1-18.956-2.02c-7.474 1.608-15.496-.41-23.094-1.404c-8.642-3.849-17.967-6.495-26.059-11.492c-10.112-3.693 5.229 4.737 7.96 5.419c6.321 3.588-6.951-1.839-8.822-3.33c-5.294-2.97-5.969-2.349-.524.667c1.096.641 2.18 1.314 3.329 1.86Zm-15.073-10.652c7.676 2.844-.034-5.397-3.551-4.919c-1.559-2.703-5.954-4.411-2.853-5.864c-5.578 1.937-5.843-7.363-8.465-6.034c-5.9-1.863-2.296-8.464-9.325-12.517c-.642-4.271-6.983-7.975-9.006-14.417c-.893-3.298-7.164-12.77-3.312-3.955c3.28 8.486 9.051 15.753 13.854 23.011c3.73 6.911 8.133 14.134 14.925 18.446c2.29 2.196 4.5 5.561 7.733 6.249Zm-22.113-24.278c.268-1.159 1.404 2.509 0 0Zm31.306 27.687c1.7-.761-2.445-.959 0 0Zm4.167 1.52c-.432-2.099-1.903 1.173 0 0Zm5.215 2.175c2.483-2.364-3.827-1.49 0 0Zm8.94 4.983c1.509-2.231-4.83-.842 0 0Zm-17.166-11.967c3.856-2.495-4.982-.034 0 0Zm3.912 1.951c-.109-1.319-1.394.591 0 0Zm19.556 12.206c3.143 1.984 18.357 4.348 8.831.813c-1.594.336-17.665-4.545-8.831-.813Zm-31.045-24.179c-.306-1.323-4.88-1.46 0 0Zm9.104 5.306c2.369-1.652-4.918-1.275 0 0Zm7.657 4.695c3.4-1.282-5.515-1.288 0 0Zm-20.466-14.035c3.69 2.829 14.877.362 5.65-1.689c-4.2-2.239-13.666-3.771-7.214 1.35l1.564.339Zm25.653 15.656c1.536-2.618-6.444-1.495 0 0Zm-7.795-6.195c9.02 2.552-7.585-5.704-2.226-.939l1.188.538l1.038.401Zm15.628 9.033c8.543.082-7.716-1.178 0 0Zm-36.773-23.437c-.333-1.591-2.108.134 0 0Zm51.223 31.543c.228-2.874-2.787 2.138 0 0Zm-36.644-22.615c-.517-1.513-2.67-.062 0 0Zm-13.768-9.926c4.904-.295-6.715-2.161 0 0Zm-16.31-10.543c-.61-2.351-5.337-4.226 0 0Zm42.818 27.174c-.899-1.025-.423.224 0 0Zm26.651 16.355c-.085-1.566-1.451.592 0 0Zm-29.01-18.791c.48-2.017-4.182-.611 0 0Zm-19.855-12.583c3.649-.391-5.845-2.467 0 0Zm33.586 20.87c5.686-2.253-5.541-1.1 0 0Zm-17.47-11.859c6.553.845-7.797-4.457-1.438-.475l1.438.475Zm22.774 14.003c6.118-3.658 4.101 8.564 10.38 1.032c6.193-4.522-5.349 5.591 2.284.807c5.52-3.692 13.673 1.75 18.824 3.525c3.704-.182 7.304 3.203 11.102 1.144c7.309-1.969-14.294-2.92-8.631-6.413c-6.689 1.946-11.63-2.321-14.921-6.605c-7.503-1.733-16.177-5.568-19.921-12.207c-1.527-2.493 2.205.351-1.318-3.724c-4.521-4.021-6.778-8.585-9.813-13.473c-3.626-1.934-4.048-7.627-4.414-.191c.028-4.693-4.378-7.852-5.453-6.539c-.019-4.519 4.715-2.254 1.401-5.598c-.713-4.684-3.062-9.566-3.768-14.855c-1.097-2.549-.155-8.009-3.744-2.238c-1.308 6.1-.434-7.495 1.599-3.012c2.67-4.575-.958-4.037-1.106-3.402c1.738-3.859 1.1-9.334-.454-7.246c.926-4.091 1.464-15.055-1.387-13.112c1.728-4.278 3.277-19.575-4.224-13.743c-3.04.043-8.303 1.104-10.792 2.341c7.802 4.3-.784 1.553-3.96.87c-.414 3.98-3.56 2.258-7.49 2.297c6.277.777-3.056 6.42-6.657 4.228c-4.677 2.235 4.036 7.814.093 9.539c.485 2.601-7.164-.939-6.563 5.067c-4.54-1.91-.625 7.124 1.646 4.069c7.722 2.09 5.436 6.854 5.633 11.38c-1.259 2.638-6.212-6.199-1.104-5.789c-4.03-6.547-4.458-2.367-7.807.675c-.779.22 8.543 4.327 2.693 6.358c5.146.794 5.293 5.297 6.34 8.147c3.094 3.222 2.46-3.557 6.162.314c-2.342-3.449-12.406-9.719-4.303-7.708c-.043-3.472-1.466-6.271 1.017-6.203c2.458-4.452-2.575 10.977 2.966 5.319c1.534-.67 1.914-4.458 4.672.357c4.004 3.94 1.446 6.795-4.203 3.187c1.01 3.429 7.557 4.654 6.327 10.016c1.304 4.715 3.129 2.979 4.719 2.706c1.248 4.582 1.956 1.213 2.015-.968c5.713 1.223 4.375 4.6 6.162 6.959c3.936 1.777-5.634-12.044 1.124-4.156c7.11 6.42 2.666 9.1-3.714 8.071c4.038-.326 5.34 5.46 10.392 5.257c4.606 2.191 7.725 10.608-.215 7.104c-2.754-2.483-12.5-5.546-4.54-.823c7.352 3.404 13.191 5.441 20.282 9.714c5.074 3.623 7.266 7.772 9.19 8.593c-4.265 2.037-12.853-1.626-6.476-2.749c-3.977-.724-8.451-2.736-4.641 2.22c3.239 2.705 11.477 2.418 12.954 2.724c-1.252 2.759-3.4 2.978.051 3.192c-3.85 2.052 1.234 2.369 1.591 3.542Zm-7.873-22.234c-2.343-2.45-2.948-7.039-.416-3.046c1.298.521 4.16 7.498.416 3.046Zm25.641 16.287c1.461-.095.042 1.11 0 0Zm-29.34-22.294c-.09-3.704.847 2.856 0 0Zm-2.548-3.429c-2.947-5.693 3.714 1.612 0 0Zm-30.883-21.315c1.731-.462.852 2.961 0 0Zm24.579 13.322c1.063-3.992 1.249 3.35 0 0Zm-17.364-12.073c-1.224-2.203 2.56 2.066 0 0Zm14.902 4.777c-2.792-6.255 1.976-3.417.617 1.025l-.617-1.025Zm-25.699-17.139c-1.248-2.051-3.312-8.072-2.648-9.91c.602 2.993 6.366 12.881 2.828 4.096c-3.91-7.364 4.673 2.391 5.556 4.227c.411 1.828-2.412-.499-.5 3.786c-3.488-4.878-2.059 2.694-5.236-2.199Zm-7.942-5.472c.327-4.771 1.818 3.271 0 0Zm3.573 1.229c1.704-3.6 2.89 5.02 0 0Zm-8.594-6.648c-2.957-2.938-5.097-5.646.138-1.823c2.017.079-4.481-6.16.486-1.981c5.223.952 2.58 8.564-.624 3.804Zm4.514-.118c1.717-1.701.912 1.676 0 0Zm2.778.891c-2.604-4.88 3.16 2.046 0 0Zm-5.522-5.277c-8.596-7.65 10.801 4 1.404 1.418l-1.404-1.418Zm24.629 14.31c-3.72-2.23-.986-15.702.282-6.488c3.617-1.17-.2 4.758 2.498 4.703c-.425 3.74-1.632 5.085-2.78 1.785Zm9.109 5.384c.365-4.06.768 2.776 0 0Zm-1.582-1.564c.41-1.734.042 2.043 0 0Zm-30.47-20.644c-5.522-7.619 16.05 7.707 3.537 1.933c-1.307-.342-2.88-.464-3.537-1.933Zm17.542 9.301c-.522-6.415 1.167 1.063 0 0Zm13.319 8.544c1.03-3.655.077 2.417 0 0Zm-30.015-20.753c3.282-.702 13.602 5.765 4.125 1.847c-1.053-1.165-3.298-.636-4.125-1.847Zm28.185 14.048c.35-6.56 1.959-3.919.012.939l-.012-.939Zm-25.742-16.33c1.338-1.962-3.55-8.87.705-2.478c1.838 1.461 5.322 2.447 2.246 3.062c4.838 4.268-1.18 1.156-2.95-.584Zm24.348 14.281c.924-7.473.815 4.378 0 0Zm-27.14-21.183c1.02-.437.539 1.361 0 0Zm6.35 3.78c1.635-3.43 3.015 3.825 0 0Zm17.914 9.965c-.017-1.317.338 1.916 0 0Zm-1.037-2.297c-2.487-6.134 2.313 3.248 0 0Zm-1.527-4.022c-.417-2.535 1.418 3.184 0 0Zm2.485-4.039c-1.707-3.007 2.154-13.25 2.585-6.897c-1.8 4.95-.52 7.719.737 1.08c2.32-5.226-.501 10.311-3.322 5.817Zm2.553-15.234c.744-.913.165 1.1 0 0Zm-4.264 84.022c-1.011-.883.127.562 0 0Zm8.784 4.444c4.886 1.253 4.861-.761.445-1.359c-2.375-2.21-9.87-4.553-3.162-.274c.445 1.125 1.848 1.099 2.717 1.633Zm-17.348-11.523c2.692 2.007 10.14 5.689 3.835.764c2.125-2.47-4.069-3.784-2.014-5.436c-5.227-3.198-4.123-2.914-.462-2.813c-6.28-2.808.907-2.598.569-4.036c-2.422-.479-12.03-4.271-6.378.311c-5.746-2.929-1.37 1.092-3.106.667c-5.875-1.603 5.233 4.474-.933 2.966c3.37 2.671 9.073 6.842 1.425 2.827c-1.008 1.45 5.473 3.649 7.064 4.75Zm9.187 5.278c11.171 3.599-5.477-4.398 0 0Zm47.029 28.49c.144-2.216-1.526 1.891 0 0Zm4.834 2.035c2.577-2.498.105 3.978 4.271-.612c.045-3.285-.129-5.226-4.787-1.235c-1.284.712-1.857 3.74.516 1.847Zm-76.73-48.188c-.792-3.112-5.548-3.096 0 0Zm5.161 3.382c-1.916-3.178-6.839-2.877 0 0Zm29.364 17.709c2.867 2.546 13.168 1.868 3.483.313c-1.435-2.121-9.109-1.61-3.483-.313Zm40.367 24.929c4.412-3.702-4.276 1.652 0 0Zm9.176 6.306c.028-1.188-1.901.521 0 0Zm.015-1.663c4.886-5.177-4.735.306 0 0Zm-96.778-61.292c-4.165-5.942-2.59-8.613-6.605-13.464c-.76-3.71-6.89-12.13-3.17-3.21c3.406 5.216 4.419 13.293 9.775 16.674Zm95.245 59.646c8.989-5.81-3.69-2.531 0 0Zm6.862 2.689c4.502-3.866-2.847-.809 0 0Zm-90.942-58.274c1.288-1.917-3.328-.246 0 0Zm89.509 56.438c4.359-2.81-1.004-2.379-.79.259l.79-.259ZM96.725 164.76c-.15-1.898-2.301.161 0 0Zm3.656 2.103c-1.162-2.349-1.786.369 0 0Zm62.491 37.08c5.584-4.028-3.385-.771-1.172.763l1.172-.763Zm-2.138-1.033c4.549-3.812-4.803 1.689 0 0Zm10.925 7.275c3.054-2.045-3.711-.662 0 0Zm-102.49-65.962c4.095.918 16.361 10.083 9.125.634c-3.707-1.097-1.484-10.157-5.264-8.553c2.537 4.239 2.087 6.043-3.24 3.371c-6.696-3.269-3.763 1.619-2.455 2.967c-1.783.405 2.36 1.547 1.835 1.581Zm-18.651-14.73c.733-3.031-6.749-16.677-3.533-6.837c1.16 2.061 1.043 5.967 3.533 6.837Zm34.234 21.106c-2.108-1.763-.1-.249 0 0Zm5.192 1.209c-.003-3.212-5.739-1.304 0 0Zm44.987 28.36c-.858-2.194-3.392-.051 0 0Zm2.16 1.578c-.319-1.228-1.246.237 0 0Zm17.831 11.231c1.715-1.267-2.14-.161 0 0Zm-95.087-61.105c4.905-1.9-5.256-1.355 0 0Zm71.135 44.816c-.054-3.176-3.127.787 0 0Zm-73.073-49.333c3.15-1.064-2.915-.701 0 0Zm9.145 4.431c-.057-1.044-.967.395 0 0Zm111.551 68.404c4.052-.821 13.285 2.062 14.778-1.074c-4.921-.12-17.024-3.472-17.597.8l1.078.169l1.741.105ZM69.949 132.518c.07-3.218-2.51-.12 0 0Zm-24.046-16.68c-1.093-6.132-4.154-.928 0 0Zm5.734 1.441c.07-1.969-5.249-1.772 0 0Zm3.277 1.609c-.948-.767-.742.97 0 0Zm20.619 13.227c.97-.891-2.299-.66 0 0ZM52.73 115.259c-.554-4.631-6.641-.694 0 0Zm-11.756-7.628c-.167-2.138-1.146.806 0 0Zm1.749-1.321c-.286-2.534-1.502.322 0 0Zm9.662 5.767c4.085-1.605-7.442-3.319-.835-.303l.834.303Zm129.308 79.872c2.615-2.397-3.323-.741 0 0Zm15.622 8.098c1.048-3.1-2.639.408 0 0ZM53.373 107.013c.43-2.998-3.24.595 0 0Zm-13.746-9.21c-.739-4.233-.638-11.664 6.425-9.153c-9.428 1.872 6.526 11.719 4.511 3.945c3.965.194 7.756-2.343 5.675 1.507c7.811-.863 13.227-7.636 20.772-6.687c5.877-.778 12.303-1.368 18.636-3.733c5.207-.376 10.22-5.982 7.366-9.305c-7.101-.6-14.535.288-22.384 1.848c-8.697 1.808-16.597 5.243-25.373 6.718c-8.554 1.149 1.72 3.165-.73 3.615c-4.463 1.548 5.323 2.593-.578 4.225c-3.645-.693-7.439-1.945-5.882-5.786c-8.194 1.063-15.393 4.464-8.92 12.802l.481.004ZM59.37 87.748c1.921-7.078 10.293 5.823 3.15.94c-.854-.639-2.257-1.16-3.15-.94Zm.374-3.432c2.773-2.065 1.474 1.158 0 0Zm3.52.056c.251-3.256 8.06 1.724 1.288 1.173l-1.287-1.173Zm4.817-1.936c1.759-2.055.505 1.828 0 0Zm1.232-.825c2.928-3.519 16.584-2.246 6.589-.343c-2.68-2.017-4.733 1.189-6.59.343Zm17.821-2.747c-.445-9.612 8.854 3.415 0 0Zm5.057-.028c1.849-4.844 7.174-1.944.855-.973c.138.515-.185 2.5-.855.973Zm-40.812 25.691c5.524-3.383-5.864-2.935 0 0Zm4.084 1.134c1.937-2.059-4.208-.835 0 0Zm-12.034-8.54c3.156-2.425-3.735-.922 0 0Zm163.107 102.04c.092-2.813-2.412 1.267 0 0Zm-16.573-11.311c.471-3.238-2.13.283 0 0Zm21.131 12.401c4.413.015 13.371-1.37 3.769-1.366c-1.507.235-8.779.185-3.769 1.366ZM59.056 103.676c3.571-.245 5.588-3.94-.69-3.727c-9.731-1.007 8.584 3.332-1.25 2.091c-1.32.875 1.863 1.878 1.94 1.636Zm3.145 1.592c-.373-2.293-1.104 1.219 0 0Zm3.731-9.949c1.55-1.922-2.144-.514 0 0ZM54.055 75.465c6.374-2.168 15.09-4.605 18.1 1.068c-3.063-3.687-1.236-7.316 1.656-1.926c4.091 5.454 6.139-2.48 3.478-4.31c3.032 3.768 6.48 5.548 2.03.239c4.837-5.818-9.683.761-12.983.695c-1.588.713-16.394 3.776-12.281 4.234Zm3.735-7.154c3.635-2.744 12.573 1.632 6.838-2.727c-.561-.495-12.56 3.305-6.838 2.727Zm13.253.547c4.254.109-1.835-5.715 3.234-3.076c-.832-2.72-5.902-3.23-8.38-4.316c-1.403 2.486 2.853 7.425 5.146 7.392Zm-10.929-12.03c1.472-1.995-2.58 1.011 0 0Zm5.417 1.296c6.856-.909-1.748-2.952-1.382-.073l1.382.073Zm-10.114-7.913c-4.828-6.302 9.078 1.059 4.174-5.54c-4.128-3.286-8.095 3.7-4.174 5.54Zm61.952 33.369c2.214-3.925-9.141-5.29-1.492-1.391c.705.235.545 1.662 1.492 1.39Z"/></g></svg>`;

    const githubSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" style="width:34px;height:34px;"><path fill="#d0cfce" d="M29.044 61.611c0-.927-.035-3.98-.035-7.764c0-2.647.874-4.373 1.863-5.253c-6.227-.721-12.779-3.153-12.779-14.034c0-3.098 1.096-5.632 2.887-7.615c-.286-.72-1.253-3.606.278-7.514c0 0 2.355-.764 7.716 2.908a26.455 26.455 0 0 1 14.054 0c5.357-3.672 7.711-2.908 7.711-2.908c1.532 3.908.57 6.795.278 7.514c1.796 1.983 2.882 4.514 2.882 7.615c0 10.905-6.56 13.307-12.817 14.008c1.013.882 1.909 2.611 1.909 5.263c0 3.792-.035 6.85-.035 7.78c0 .762.505 1.641 1.93 1.369c11.145-3.758 19.177-14.396 19.177-26.932c0-15.678-12.567-28.388-28.067-28.388c-15.494 0-28.06 12.707-28.06 28.388c0 12.541 8.04 23.182 19.202 26.934c1.395.262 1.906-.614 1.906-1.37z"/><g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"><path d="M29.044 61.611c0-.927-.035-3.98-.035-7.764c0-2.647.874-4.373 1.863-5.253c-6.227-.721-12.779-3.153-12.779-14.034c0-3.098 1.096-5.632 2.887-7.615c-.286-.72-1.253-3.606.278-7.514c0 0 2.355-.764 7.716 2.908a26.455 26.455 0 0 1 14.054 0c5.357-3.672 7.711-2.908 7.711-2.908c1.532 3.908.57 6.795.278 7.514c1.796 1.983 2.882 4.514 2.882 7.615c0 10.905-6.56 13.307-12.817 14.008c1.013.882 1.909 2.611 1.909 5.263c0 3.792-.035 6.85-.035 7.78c0 .762.505 1.641 1.93 1.369c11.145-3.758 19.177-14.396 19.177-26.932c0-15.678-12.567-28.388-28.067-28.388c-15.494 0-28.06 12.707-28.06 28.388c0 12.541 8.04 23.182 19.202 26.934c1.395.262 1.906-.614 1.906-1.37z"/><path d="M16.29 48.09c2.568.78 3.58 1.635 4.789 3.661c1.205 2.026 2.62 4.287 7.933 2.999"/></g></svg>`;

    const webDevSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 218" style="width:38px;height:38px;"><path fill="#00C9DB" d="M226.859 160.16h-86.308c-.97 0-2.91 0-3.88.969l-64.973 51.397c-.97.97-.97 1.94 0 2.91c0 .97.97.97 1.94.97h154.19c15.517 0 29.093-13.578 28.124-30.063c-.97-15.516-14.547-26.184-29.093-26.184"/><path fill="#0D55FF" d="M156.445 106.018c-.97-7.758-4.849-15.516-10.667-20.365L45.893 6.133c-12.607-9.698-30.062-7.758-39.76 4.849c-9.698 12.607-7.758 30.062 4.849 39.76l72.731 58.185l-72.731 58.185c-12.607 9.698-14.547 27.154-4.849 39.76c9.698 12.607 27.153 14.547 39.76 4.85l99.885-81.46c6.788-5.819 10.667-13.577 10.667-22.305v-1.94"/><path fill="#7000F2" d="M255.952 188.282c0 15.516-12.607 28.123-28.123 28.123c-15.516 0-28.123-12.607-28.123-28.123c0-15.516 12.607-28.123 28.123-28.123c15.516 0 28.123 12.607 28.123 28.123"/></svg>`;

    const aimlSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" style="width:38px;height:38px;"><g fill="none"><path fill="url(#fluentColorLibrary320)" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h2A2.5 2.5 0 0 1 10 5.5v21A2.5 2.5 0 0 1 7.5 29h-2A2.5 2.5 0 0 1 3 26.5zm9 0A2.5 2.5 0 0 1 14.5 3h2A2.5 2.5 0 0 1 19 5.5v21a2.5 2.5 0 0 1-2.5 2.5h-2a2.5 2.5 0 0 1-2.5-2.5zm9.8 2.105c-1.295.358-2.064 1.733-1.717 3.07l4.27 16.466c.348 1.338 1.678 2.131 2.973 1.773l1.875-.52c1.294-.357 2.063-1.732 1.716-3.07L26.647 8.86c-.348-1.338-1.678-2.131-2.973-1.773z"/><path fill="url(#fluentColorLibrary321)" d="M3 8h7v3H3z"/><path fill="url(#fluentColorLibrary322)" d="M27.296 11.365L20.72 13.13l.753 2.904l6.576-1.764z"/><path fill="url(#fluentColorLibrary323)" d="M19 8h-7v3h7z"/><defs><linearGradient id="fluentColorLibrary320" x1="-18" x2="-16.286" y1="3" y2="38.067" gradientUnits="userSpaceOnUse"><stop stop-color="#43E5CA"/><stop offset="1" stop-color="#2764E7"/></linearGradient><linearGradient id="fluentColorLibrary321" x1="12" x2="20.493" y1="2.267" y2="5.253" gradientUnits="userSpaceOnUse"><stop stop-color="#9FF0F9"/><stop offset="1" stop-color="#6CE0FF"/></linearGradient><linearGradient id="fluentColorLibrary322" x1="12" x2="20.493" y1="2.267" y2="5.253" gradientUnits="userSpaceOnUse"><stop stop-color="#9FF0F9"/><stop offset="1" stop-color="#6CE0FF"/></linearGradient><linearGradient id="fluentColorLibrary323" x1="12" x2="20.493" y1="2.267" y2="5.253" gradientUnits="userSpaceOnUse"><stop stop-color="#9FF0F9"/><stop offset="1" stop-color="#6CE0FF"/></linearGradient></defs></g></svg>`;

    const deploymentSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="width:38px;height:38px;"><path fill="#B0BEC5" d="M37 42H5V32h32c2.8 0 5 2.2 5 5s-2.2 5-5 5z"/><path fill="#37474F" d="M10 34c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1zm9-4c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1zm18-4c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1zm-9-4c-1.7 0-3 1.3-3 3s1.3 3 3 3s3-1.3 3-3s-1.3-3-3-3zm0 4c-.6 0-1-.4-1-1s.4-1 1-1s1 .4 1 1s-.4 1-1 1z"/><path fill="#FF9800" d="M35 31H11c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h24c1.1 0 2 .9 2 2v22c0 1.1-.9 2-2 2z"/><path fill="#8A5100" d="M26.5 13h-7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"/><path fill="#607D8B" d="M37 31H5v2h32c2.2 0 4 1.8 4 4s-1.8 4-4 4H5v2h32c3.3 0 6-2.7 6-6s-2.7-6-6-6z"/></svg>`;

    const programmingSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" style="width:38px;height:38px;"><g fill="none" stroke-width="3"><path fill="#8fbffa" d="M27.069 36.213c.097-1.74 1.34-2.93 3.078-3.05C31.45 33.073 33.33 33 36 33c2.817 0 4.744.081 6.04.178c1.587.118 2.742 1.18 2.861 2.767c.058.772.099 1.77.099 3.055c0 1.284-.04 2.283-.099 3.056c-.12 1.586-1.274 2.648-2.861 2.766c-1.296.097-3.223.178-6.04.178s-4.744-.081-6.04-.178c-1.587-.118-2.742-1.18-2.861-2.767A41 41 0 0 1 27 39c0-1.14.027-2.055.069-2.787"/><path stroke="#2859c5" stroke-linecap="round" stroke-linejoin="round" d="M23.067 15.986c.049 1.6 1.133 2.909 2.731 2.986a25 25 0 0 0 2.404 0c1.598-.077 2.682-1.387 2.731-2.986C30.97 14.779 31 13.133 31 11s-.03-3.779-.067-4.986c-.049-1.6-1.133-2.909-2.731-2.986a25 25 0 0 0-2.404 0c-1.598.077-2.682 1.387-2.731 2.986A166 166 0 0 0 23 11c0 2.133.03 3.779.067 4.986m-10 22c.049 1.6 1.133 2.909 2.731 2.986a25 25 0 0 0 2.404 0c1.598-.077 2.682-1.387 2.731-2.986C20.97 36.779 21 35.133 21 33s-.03-3.779-.067-4.986c-.049-1.6-1.133-2.909-2.731-2.986a25 25 0 0 0-2.404 0c-1.598.077-2.682 1.387-2.731 2.986A166 166 0 0 0 13 33c0 2.133.03 3.779.067 4.986m14.002-1.773c.097-1.74 1.34-2.93 3.078-3.05C31.45 33.073 33.33 33 36 33c2.817 0 4.744.081 6.04.178c1.587.118 2.742 1.18 2.861 2.767c.058.772.099 1.77.099 3.055c0 1.284-.04 2.283-.099 3.056c-.12 1.586-1.274 2.648-2.861 2.766c-1.296.097-3.223.178-6.04.178s-4.744-.081-6.04-.178c-1.587-.118-2.742-1.18-2.861-2.767A41 41 0 0 1 27 39c0-1.14.027-2.055.069-2.787"/><path stroke="#2859c5" stroke-linecap="round" stroke-linejoin="round" d="m40.89 33.106l-.133-3.526a4.76 4.76 0 0 0-9.514 0l-.134 3.526M36 38v2M3 3h3a1 1 0 0 1 1 1v15m6-16h3a1 1 0 0 1 1 1v15M3 25h3a1 1 0 0 1 1 1v15"/></g></svg>`;

    const cloudDbSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" style="width:38px;height:38px;"><g fill="none"><path fill="#d7e0ff" d="M11.223 4.26a.24.24 0 0 1-.167-.188a3.62 3.62 0 0 0-1.037-2.213a3.79 3.79 0 0 0-4.65-.553a3.67 3.67 0 0 0-1.547 1.906a.22.22 0 0 1-.202.12a3.1 3.1 0 0 0-1.159.307a3.1 3.1 0 0 0-.95.718a2.98 2.98 0 0 0-.754 2.186c.055.798.43 1.542 1.045 2.069c2.309 1.979 8.245 2.13 10.576.078a2.54 2.54 0 0 0 .393-3.403a2.63 2.63 0 0 0-1.548-1.026"/><path stroke="#4147d5" stroke-linecap="round" stroke-linejoin="round" d="M1.802 8.612A3 3 0 0 1 .757 6.543a2.98 2.98 0 0 1 .753-2.186a3.1 3.1 0 0 1 .951-.718a3.1 3.1 0 0 1 1.159-.307a.22.22 0 0 0 .202-.12a3.67 3.67 0 0 1 1.546-1.906a3.79 3.79 0 0 1 4.65.553c.594.6.96 1.38 1.038 2.213a.23.23 0 0 0 .167.189c.626.145 1.177.51 1.547 1.026a2.54 2.54 0 0 1-.392 3.403c-.406.357-.92.647-1.506.873"/><path stroke="#4147d5" stroke-linecap="round" stroke-linejoin="round" d="M3.477 3.335c1.189 0 2.252.784 2.588 1.5M5.743 13.2V8.142c0-.232-.16-.321-.346-.184c-.433.317-1.185.948-1.745 1.85m4.074-1.915v5.058c0 .232.159.321.346.184c.432-.317 1.184-.948 1.744-1.85"/></g></svg>`;

    const devToolsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width:38px;height:38px;"><g fill="none" fill-rule="evenodd" clip-rule="evenodd"><path fill="#020202" d="M20.644 12.45c-.27.16-.519.356-.74.579a.3.3 0 0 0-.06.42c.24.32.51-.06 1-.25c.879-.35 2.107.79 2.097 1.319a2.27 2.27 0 0 1-.549 1.548c.08 0-2.058-1.678-2.638-2.228a.34.34 0 0 0-.48 0c-.419.42.34.7 2.508 2.788c-.36.53-.909.999-3.996 4.246a3.8 3.8 0 0 0-2.158-1.998c1.838-2.288 3.177-3.727 3.277-3.877a.3.3 0 0 0-.38-.44c-.09 0-.12.1-.55.55c-2.527 2.608-4.125 4.246-4.185 4.736c-.25 2.178-.4 3.237-.09 3.567c.61.66 3.067-.09 3.587-.41a70 70 0 0 0 6.304-7.183c1.459-2.358-1.329-4.227-2.947-3.368m-3.997 9.56a6.6 6.6 0 0 1-1.998.53a7.5 7.5 0 0 1 .34-2.877c.34-.46-.05-.16 1.488 1.129c.27.23.53.43.76.65c-.35.32-.56.539-.6.539zm-5.185-1.297c-3.327 0-7.564-.19-9.472-.42c-.25 0-.49-.14-.63-.17C.892 17.926 1.22 1.35 1.062 1.19a.31.31 0 0 0-.42 0c-.38.37-1.099 17.294-.23 19.572a.74.74 0 0 0 .54.43c1.479.4 8.992.25 10.51.21a.35.35 0 0 0 0-.69M2.14 1.25c1.09.15 7.593.17 10.4.21c-.219.998-.659 3.376 0 4.156c.38.46 3.328.709 3.917.659a.34.34 0 1 0 0-.68c-3.607-.25-3.067-.799-3.117-1.368c-.09-.916-.12-1.838-.09-2.758c.48 0-.08-.36 3.737 3.088c0 1.228.08 4.336 0 5.904c-.1 3.297-.34 3.637.12 3.667a.29.29 0 0 0 .29-.158a.3.3 0 0 0 .03-.112c.12-1.199.759-6.844.509-8.632c-.22-1.549.71-.38-3.717-4.696c-.23-.26-.859-.2-1.558-.19C9.993.38 3.319.67 2.22.58a.34.34 0 1 0-.08.67"/><path fill="#0c6fff" d="M3.918 7.354a5 5 0 0 1 3.287-.36a.304.304 0 0 0 .26-.55a5.9 5.9 0 0 0-3.936 0a1.9 1.9 0 0 0-.88 2.249c.33.7.92.77 1.61.899c.942.15 1.903.15 2.847 0a3.4 3.4 0 0 0 1.598-.45c1.08-.769.19-2.238-.83-2.238a.34.34 0 0 0 0 .68c.35 0 .74.61.37.83a10.7 10.7 0 0 1-3.756.079c-.68-.13-1-.08-.77-.7c.05-.19.09-.379.2-.439m-.868 8.043c1.358.999 4.205.64 5.574-.11a1.33 1.33 0 0 0 .5-1.699a3.2 3.2 0 0 0-.65-.669c-.34-.3-.799.2-.47.5l.46.54a.51.51 0 0 1-.22.549c-1.318.58-4.995.57-4.665-.49a.93.93 0 0 1 .48-.58a7.3 7.3 0 0 1 2.817-.529a.31.31 0 0 0 .22-.57c-.79-.32-2.608.07-3.317.2a1.649 1.649 0 0 0-.73 2.858m12.399-3.487a.34.34 0 0 0 0-.68c-3.117-.699-2.108 1-2.388-1.288c-.05-.4 0-1.19-.51-1.589a3.5 3.5 0 0 0-2.477-.36a.302.302 0 1 0 .07.6a2.82 2.82 0 0 1 1.848.4c.11.11 0 .779 0 .999q.045 1.43-.09 2.857q.039.755 0 1.509c-.08-.06-1.828.14-1.848.58a.38.38 0 0 0 .31.359a6.7 6.7 0 0 0 1.698 0c1-.24.81-1.459.94-2.258c.06-.33.09-.66.12-1c.771.184 1.58.139 2.327-.129"/></g></svg>`;

    const aiAgentsSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" style="width:38px;height:38px;"><g fill="none" fill-rule="evenodd" clip-rule="evenodd"><path fill="#8fbffa" d="M6.035 2.507c-.653 1.073-.204 2.73 1.344 3c.545.095.978.51 1.096 1.05l.02.092c.454 2.073 3.407 2.086 3.878.017l.025-.108a1 1 0 0 1 .04-.139v5.791c0 .941-.764 1.704-1.705 1.704H1.734A1.704 1.704 0 0 1 .03 12.21V4.211c0-.941.763-1.704 1.704-1.704h4.3Z"/><path fill="#2859c5" d="M3.08 7.797a.625.625 0 1 0-.883.884L3.255 9.74l-1.058 1.058a.625.625 0 0 0 .884.884l1.5-1.5a.625.625 0 0 0 0-.884l-1.5-1.5Zm2.559 2.817a.625.625 0 1 0 0 1.25h1.5a.625.625 0 0 0 0-1.25zm.396-8.107c-.653 1.073-.204 2.73 1.344 3c.318.055.598.22.8.454H.028V4.21c0-.941.764-1.704 1.705-1.704h4.3ZM11.233.721C11.04-.13 9.825-.125 9.638.728l-.007.035l-.015.068A2.53 2.53 0 0 1 7.58 2.772c-.887.154-.887 1.428 0 1.582a2.53 2.53 0 0 1 2.038 1.952l.02.093c.187.852 1.401.858 1.595.007l.025-.108a2.55 2.55 0 0 1 2.046-1.942c.889-.155.889-1.43 0-1.585A2.55 2.55 0 0 1 11.26.844l-.018-.082l-.01-.041Z"/></g></svg>`;

    const categories = [
        {
            name: 'Programming', svg: programmingSvg, children: [
                { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
                { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg' },
                { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
                { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' }
            ]
        },
        {
            name: 'Web & Application Development', svg: webDevSvg, children: [
                { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
                { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
                { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
                { name: 'Streamlit', svg: streamlitSvg }
            ]
        },
        {
            name: 'Ai & ML Libraries', svg: aimlSvg, children: [
                { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/numpy/numpy-original.svg' },
                { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original.svg' },
                { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg' },
                { name: 'Keras', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg' },
                { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg' },
                { name: 'Scikit-Learn', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg' }
            ]
        },
        {
            name: 'Deployment', svg: deploymentSvg, children: [
                { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-plain.svg' },
                { name: 'Flask', svg: flaskSvg },
                { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
                { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/openapi/openapi-original.svg' },
                { name: 'GH Actions', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg' }
            ]
        },
        {
            name: 'Cloud / DB', svg: cloudDbSvg, children: [
                { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
                { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
                { name: 'Supabase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg' },
                { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg' },
                { name: 'Cloudflare', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg' }
            ]
        },
        {
            name: 'Development Tools', svg: devToolsSvg, children: [
                { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
                { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
                { name: 'GitHub', svg: githubSvg },
                { name: 'Colab', svg: colabSvg },
                { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jupyter/jupyter-original-wordmark.svg' }
            ]
        },
        {
            name: 'AI Agents', svg: aiAgentsSvg, children: [
                {
                    name: 'Claude',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:34px;height:34px;"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-2.266-.122-.571-.121L0 11.784l.055-.352.48-.321.686.06 1.52.103 2.278.158 1.652.097 2.449.255h.389l.055-.157-.134-.098-.103-.097-2.358-1.596-2.552-1.688-1.336-.972-.724-.491-.364-.462-.158-1.008.656-.722.881.06.225.061.893.686 1.908 1.476 2.491 1.833.365.304.145-.103.019-.073-.164-.274-1.355-2.446-1.446-2.49-.644-1.032-.17-.619a2.97 2.97 0 01-.104-.729L6.283.134 6.696 0l.996.134.42.364.62 1.414 1.002 2.229 1.555 3.03.456.898.243.832.091.255h.158V9.01l.128-1.706.237-2.095.23-2.695.08-.76.376-.91.747-.492.584.28.48.685-.067.444-.286 1.851-.559 2.903-.364 1.942h.212l.243-.242.985-1.306 1.652-2.064.73-.82.85-.904.547-.431h1.033l.76 1.129-.34 1.166-1.064 1.347-.881 1.142-1.264 1.7-.79 1.36.073.11.188-.02 2.856-.606 1.543-.28 1.841-.315.833.388.091.395-.328.807-1.969.486-2.309.462-3.439.813-.042.03.049.061 1.549.146.662.036h1.622l3.02.225.79.522.474.638-.079.485-1.215.62-1.64-.389-3.829-.91-1.312-.329h-.182v.11l1.093 1.068 2.006 1.81 2.509 2.33.127.578-.322.455-.34-.049-2.205-1.657-.851-.747-1.926-1.62h-.128v.17l.444.649 2.345 3.521.122 1.08-.17.353-.608.213-.668-.122-1.374-1.925-1.415-2.167-1.143-1.943-.14.08-.674 7.254-.316.37-.729.28-.607-.461-.322-.747.322-1.476.389-1.924.315-1.53.286-1.9.17-.632-.012-.042-.14.018-1.434 1.967-2.18 2.945-1.726 1.845-.414.164-.717-.37.067-.662.401-.589 2.388-3.036 1.44-1.882.93-1.086-.006-.158h-.055L4.132 18.56l-1.13.146-.487-.456.061-.746.231-.243 1.908-1.312-.006.006z" /></svg>`
                },
                {
                    name: 'LangChain',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:34px;height:34px;"><path d="M8.373 14.502c.013-.06.024-.118.038-.17l.061.145c.115.28.229.557.506.714-.012.254-.334.357-.552.326-.048-.114-.115-.228-.255-.164-.143.056-.3-.01-.266-.185.333-.012.407-.371.468-.666zM18.385 9.245c-.318 0-.616.122-.839.342l-.902.887c-.243.24-.368.572-.343.913l.006.056c.032.262.149.498.337.682.13.128.273.21.447.266a.866.866 0 01-.247.777l-.056.055a2.022 2.022 0 01-1.355-1.555l-.01-.057-.046.037c-.03.024-.06.05-.088.078l-.902.887a1.156 1.156 0 000 1.65c.231.228.535.342.84.342.304 0 .607-.114.838-.341l.902-.888a1.156 1.156 0 00-.436-1.921.953.953 0 01.276-.842 2.062 2.062 0 011.371 1.57l.01.057.047-.037c.03-.024.06-.05.088-.078l.902-.888a1.155 1.155 0 000-1.65 1.188 1.188 0 00-.84-.342z"></path><path d="M17.901 6H6.1C2.736 6 0 8.692 0 12s2.736 6 6.099 6H17.9C21.264 18 24 15.308 24 12s-2.736-6-6.099-6zm-5.821 9.407c-.195.04-.414.047-.562-.106-.045.1-.136.077-.221.056a.797.797 0 00-.061-.014c-.01.025-.017.048-.026.073-.329.021-.575-.309-.732-.558a4.991 4.991 0 00-.473-.21c-.172-.07-.345-.14-.509-.23a2.218 2.218 0 00-.004.173c-.002.244-.004.503-.227.651-.007.295.236.292.476.29.207-.003.41-.005.447.184a.485.485 0 01-.05.003c-.046 0-.092 0-.127.034-.117.111-.242.063-.372.013-.12-.046-.243-.094-.367-.02a2.318 2.318 0 00-.262.154.97.97 0 01-.548.194c-.024-.036-.014-.059.006-.08a.562.562 0 00.043-.056c.019-.028.035-.057.051-.084.054-.095.103-.18.242-.22-.185-.029-.344.055-.5.137l-.004.002a4.21 4.21 0 01-.065.034c-.097.04-.154.009-.212-.023-.082-.045-.168-.092-.376.04-.04-.032-.02-.061.002-.086.091-.109.21-.125.345-.119-.351-.193-.604-.056-.81.055-.182.098-.327.176-.471-.012-.065.017-.102.063-.138.108-.015.02-.03.038-.047.055-.035-.039-.027-.083-.018-.128l.005-.026a.242.242 0 00.003-.03l-.027-.01c-.053-.022-.105-.044-.09-.124-.117-.04-.2.03-.286.094-.054-.041-.01-.095.032-.145a.279.279 0 000-.065c.038-.065.103-.067.166-.069.054-.001.108-.003.145-.042.133-.075.297-.036.462.003.121.028.242.057.354.042.203.025.454-.18.352-.385-.186-.233-.184-.528-.183-.813v-.143c-.016-.108-.172-.233-.328-.358-.12-.095-.24-.191-.298-.28-.16-.177-.285-.382-.409-.585l-.015-.024c-.212-.404-.297-.86-.382-1.315-.103-.546-.205-1.09-.526-1.54-.266.144-.612.075-.841-.118-.12.107-.13.247-.138.396l-.001.014c-.297-.292-.26-.844-.023-1.17.097-.128.213-.233.342-.326.03-.021.04-.042.039-.074.235-1.04 1.836-.839 2.342-.103.167.206.281.442.395.678.137.283.273.566.5.795.22.237.452.463.684.689.359.35.718.699 1.032 1.089.49.587.839 1.276 1.144 1.97.05.092.08.193.11.293.044.15.089.299.2.417.026.035.084.088.149.148.156.143.357.328.289.409.009.019.027.04.05.06.032.028.074.058.116.088.122.087.25.178.16.25zm7.778-3.545l-.902.887c-.24.237-.537.413-.859.51l-.017.005-.006.015A2.021 2.021 0 0117.6 14l-.902.888c-.393.387-.916.6-1.474.6-.557 0-1.08-.213-1.474-.6a2.03 2.03 0 010-2.9l.902-.888c.242-.238.531-.409.859-.508l.016-.004.006-.016c.105-.272.265-.516.475-.724l.902-.887c.393-.387.917-.6 1.474-.6.558 0 1.08.213 1.474.6.394.387.61.902.61 1.45 0 .549-.216 1.064-.61 1.45v.001z"></path></svg>`
                },
                {
                    name: 'Gemini',
                    svg: `<svg viewBox="0 0 24 24" style="width:34px;height:34px;"><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="#3186FF"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-fill-0)"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-fill-1)"></path><path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z" fill="url(#lobe-icons-gemini-fill-2)"></path><defs><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-fill-0" x1="7" x2="11" y1="15.5" y2="12"><stop stop-color="#08B962"></stop><stop offset="1" stop-color="#08B962" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-fill-1" x1="8" x2="11.5" y1="5.5" y2="11"><stop stop-color="#F94543"></stop><stop offset="1" stop-color="#F94543" stop-opacity="0"></stop></linearGradient><linearGradient gradientUnits="userSpaceOnUse" id="lobe-icons-gemini-fill-2" x1="3.5" x2="17.5" y1="13.5" y2="12"><stop stop-color="#FABC12"></stop><stop offset=".46" stop-color="#FABC12" stop-opacity="0"></stop></linearGradient></defs></svg>`
                },
                { name: 'Antigravity', svg: antigravitySvg },
                {
                    name: 'OpenAI API',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:34px;height:34px;"><path d="M9.205 8.658v-2.26c0-.19.072-.333.238-.428l4.543-2.616c.619-.357 1.356-.523 2.117-.523 2.854 0 4.662 2.212 4.662 4.566 0 .167 0 .357-.024.547l-4.71-2.759a.797.797 0 00-.856 0l-5.97 3.473zm10.609 8.8V12.06c0-.333-.143-.57-.429-.737l-5.97-3.473 1.95-1.118a.433.433 0 01.476 0l4.543 2.617c1.309.76 2.189 2.378 2.189 3.948 0 1.808-1.07 3.473-2.76 4.163zM7.802 12.703l-1.95-1.142c-.167-.095-.239-.238-.239-.428V5.899c0-2.545 1.95-4.472 4.591-4.472 1 0 1.927.333 2.712.928L8.23 5.067c-.285.166-.428.404-.428.737v6.898zM12 15.128l-2.795-1.57v-3.33L12 8.658l2.795 1.57v3.33L12 15.128zm1.796 7.23c-1 0-1.927-.332-2.712-.927l4.686-2.712c.285-.166.428-.404.428-.737v-6.898l1.974 1.142c.167.095.238.238.238.428v5.233c0 2.545-1.974 4.472-4.614 4.472zm-5.637-5.303l-4.544-2.617c-1.308-.761-2.188-2.378-2.188-3.948A4.482 4.482 0 014.21 6.327v5.423c0 .333.143.571.428.738l5.947 3.449-1.95 1.118a.432.432 0 01-.476 0zm-.262 3.9c-2.688 0-4.662-2.021-4.662-4.519 0-.19.024-.38.047-.57l4.686 2.71c.286.167.571.167.856 0l5.97-3.448v2.26c0 .19-.07.333-.237.428l-4.543 2.616c-.619.357-1.356.523-2.117.523zm5.899 2.83a5.947 5.947 0 005.827-4.756C22.287 18.339 24 15.84 24 13.296c0-1.665-.713-3.282-1.998-4.448.119-.5.19-.999.19-1.498 0-3.401-2.759-5.947-5.946-5.947-.642 0-1.26.095-1.88.31A5.962 5.962 0 0010.205 0a5.947 5.947 0 00-5.827 4.757C1.713 5.447 0 7.945 0 10.49c0 1.666.713 3.283 1.998 4.448-.119.5-.19 1-.19 1.499 0 3.401 2.759 5.946 5.946 5.946.642 0 1.26-.095 1.88-.309a5.96 5.96 0 004.162 1.713z"></path></svg>`
                },
                {
                    name: 'Cursor',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:34px;height:34px;"><path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"></path></svg>`
                },
                {
                    name: 'Windsurf',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:34px;height:34px;"><title>Windsurf</title><path d="M23.78 5.004h-.228a2.187 2.187 0 00-2.18 2.196v4.912c0 .98-.804 1.775-1.76 1.775a1.818 1.818 0 01-1.472-.773L13.168 5.95a2.197 2.197 0 00-1.81-.95c-1.134 0-2.154.972-2.154 2.173v4.94c0 .98-.797 1.775-1.76 1.775-.57 0-1.136-.289-1.472-.773L.408 5.098C.282 4.918 0 5.007 0 5.228v4.284c0 .216.066.426.188.604l5.475 7.889c.324.466.8.812 1.351.938 1.377.316 2.645-.754 2.645-2.117V11.89c0-.98.787-1.775 1.76-1.775h.002c.586 0 1.135.288 1.472.773l4.972 7.163a2.15 2.15 0 001.81.95c1.158 0 2.151-.973 2.151-2.173v-4.939c0-.98.787-1.775 1.76-1.775h.194c.122 0 .22-.1.22-.222V5.225a.221.221 0 00-.22-.222z"></path></svg>`
                },
                {
                    name: 'NotebookLM',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:34px;height:34px;"><title>NotebookLM</title><path d="M11.999 3.14C5.372 3.14 0 8.588 0 15.312v5.828h2.212v-.58c0-2.728 2.178-4.938 4.866-4.938 2.688 0 4.866 2.21 4.866 4.937v.581h2.212v-.58c0-3.967-3.17-7.18-7.078-7.18a6.966 6.966 0 00-4.086 1.318C4.2 12.262 6.687 10.59 9.56 10.59c4.057 0 7.347 3.338 7.347 7.453v3.097h2.212v-3.097c0-5.355-4.28-9.698-9.56-9.698a9.438 9.438 0 00-6.217 2.332C4.984 7.528 8.244 5.383 12 5.383c5.406 0 9.788 4.446 9.788 9.93v5.827H24v-5.828C23.999 8.588 18.627 3.14 11.999 3.14z"></path></svg>`
                },
                {
                    name: 'Perplexity',
                    svg: `<svg viewBox="0 0 24 24" fill="currentColor" style="width:34px;height:34px;"><title>Perplexity</title><path d="M19.785 0v7.272H22.5V17.62h-2.935V24l-7.037-6.194v6.145h-1.091v-6.152L4.392 24v-6.465H1.5V7.188h2.884V0l7.053 6.494V.19h1.09v6.49L19.786 0zm-7.257 9.044v7.319l5.946 5.234V14.44l-5.946-5.397zm-1.099-.08l-5.946 5.398v7.235l5.946-5.234V8.965zm8.136 7.58h1.844V8.349H13.46l6.105 5.54v2.655zm-8.982-8.28H2.59v8.195h1.8v-2.576l6.192-5.62zM5.475 2.476v4.71h5.115l-5.115-4.71zm13.219 0l-5.115 4.71h5.115v-4.71z"></path></svg>`
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
        const rootIconHtml = cat.svg ? cat.svg : (cat.icon ? `<span>${cat.icon}</span>` : ""); node.innerHTML = `<div class="node-circle">${rootIconHtml}</div><span class="node-name">${cat.name}</span>`;
        nodesContainer.appendChild(node);
        nodeEls.push({ el: node, cat });
        node.addEventListener('mousedown', e => startDrag(e, 'root', { el: node, cat }));

        const count = cat.children.length;
        const orbitR = count > 6 ? 165 : 138;
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

