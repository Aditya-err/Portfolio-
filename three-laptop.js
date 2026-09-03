// THREE and THREE.GLTFLoader are now available globally via script tags in index.html

// DOM Elements
const canvasEl = document.getElementById("laptop-canvas");
const projectsSection = document.getElementById("projects");
const htmlOverlay = document.getElementById("laptop-screen");

// Globals
let scene, camera, renderer;
let darkPlasticMaterial, baseMetalMaterial, logoMaterial, screenMaterial, keyboardMaterial;
let macGroup, lidGroup, bottomGroup, screenMesh, screenLight;
const screenSize = [29.4, 20];
let scrollTl;

// Initialize
initScene();
createMaterials();

const modelLoader = new THREE.GLTFLoader();
modelLoader.load(
    "assets/3d/mac-noUv.glb",
    glb => {
        parseModel(glb);
        addScreen();
        addKeyboard();
        
        // Initial positioning
        macGroup.rotation.x = 0.2 * Math.PI; // Tilted slightly down
        macGroup.rotation.y = -0.15 * Math.PI; // Tilted to the left
        macGroup.position.y = -5; // Lowered slightly
        
        // Lid starts closed
        lidGroup.rotation.x = 0.5 * Math.PI; 

        setupScrollAnimation();
        
        // Start render loop
        render();
        updateSceneSize();
        window.addEventListener("resize", updateSceneSize);
        
        // Refresh ScrollTrigger after loading
        ScrollTrigger.refresh();
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('An error happened', error);
        canvasEl.parentElement.innerHTML = `<div style="color:red; background:black; padding:20px; z-index:9999; position:relative;">Error loading 3D model: ${error.message}. If you are opening this file directly (file:///), 3D models cannot load due to browser CORS policies. Please use a local server like Live Server.</div>`;
    }
);

function initScene() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 10, 1000);
    camera.position.z = 80;

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: canvasEl
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const lightHolder = new THREE.Group();
    scene.add(lightHolder);
    const light = new THREE.PointLight(0xFFF5E1, 0.8);
    light.position.set(0, 5, 50);
    lightHolder.add(light);
    lightHolder.quaternion.copy(camera.quaternion);

    macGroup = new THREE.Group();
    macGroup.position.z = -10;
    scene.add(macGroup);
    
    // Explicitly point camera at the laptop to prevent blank screen
    camera.lookAt(macGroup.position);
    
    lidGroup = new THREE.Group();
    macGroup.add(lidGroup);
    
    bottomGroup = new THREE.Group();
    macGroup.add(bottomGroup);
}

function updateSceneSize() {
    // Keep the canvas exactly matching its container wrap size
    const container = canvasEl.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

function createMaterials() {
    const textLoader = new THREE.TextureLoader();
    const screenImageTexture = textLoader.load("assets/3d/macbook-screen-texture.png", tex => {
        tex.flipY = false;
        tex.wrapS = THREE.RepeatWrapping;
        tex.repeat.y = tex.image.width / tex.image.height / screenSize[0] * screenSize[1];
    });

    screenMaterial = new THREE.MeshBasicMaterial({
        map: screenImageTexture,
        transparent: true,
        opacity: 0.05, // Starts dark
        side: THREE.BackSide
    });
    
    const keyboardTexture = textLoader.load("assets/3d/keyboard-overlay.png");
    keyboardMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        alphaMap: keyboardTexture,
        transparent: true,
    });

    darkPlasticMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.9,
        metalness: 0.9,
    });
    
    baseMetalMaterial = new THREE.MeshStandardMaterial({ color: 0xCECFD3 });
    logoMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
}

function parseModel(glb) {
    [...glb.scene.children].forEach(child => {
        if (child.name === "_top") {
            lidGroup.add(child);
            [...child.children].forEach(mesh => {
                if (mesh.name === "lid") {
                    mesh.material = baseMetalMaterial;
                } else if (mesh.name === "logo") {
                    mesh.material = logoMaterial;
                } else if (mesh.name === "screen-frame") {
                    mesh.material = darkPlasticMaterial;
                } else if (mesh.name === "camera") {
                    mesh.material = new THREE.MeshBasicMaterial({ color: 0x333333 });
                }
            });
        } else if (child.name === "_bottom") {
            bottomGroup.add(child);
            [...child.children].forEach(mesh => {
                if (mesh.name === "base" || mesh.name === "legs") {
                    mesh.material = baseMetalMaterial;
                } else if (mesh.name === "keyboard" || mesh.name === "inner") {
                    mesh.material = darkPlasticMaterial;
                }
            });
        }
    });
}

function addScreen() {
    screenMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(screenSize[0], screenSize[1]),
        screenMaterial
    );
    screenMesh.position.set(0, 10.5, -.11);
    screenMesh.rotation.set(Math.PI, 0, 0);
    lidGroup.add(screenMesh);

    screenLight = new THREE.RectAreaLight(0xffffff, 0, screenSize[0], screenSize[1]);
    screenLight.position.set(0, 10.5, 0);
    screenLight.rotation.set(Math.PI, 0, 0);
    lidGroup.add(screenLight);

    const darkScreen = screenMesh.clone();
    darkScreen.position.set(0, 10.5, -.111);
    darkScreen.rotation.set(Math.PI, Math.PI, 0);
    darkScreen.material = darkPlasticMaterial;
    lidGroup.add(darkScreen);
}

function addKeyboard() {
    const keyboardKeys = new THREE.Mesh(
        new THREE.PlaneGeometry(27.7, 11.6),
        keyboardMaterial
    );
    keyboardKeys.rotation.set(-.5 * Math.PI, 0, 0);
    keyboardKeys.position.set(0, .045, 7.21);
    bottomGroup.add(keyboardKeys);
}

function setupScrollAnimation() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Ensure overlay is hidden initially
    gsap.set(htmlOverlay, { opacity: 0 });

    scrollTl = gsap.timeline({
        scrollTrigger: {
            trigger: projectsSection,
            start: "top top",
            end: "+=250%", // 2.5 screens of scrolling
            scrub: 1, // Smooth scrub
            pin: true,
            pinSpacing: true,
            anticipatePin: 1
        }
    });

    // Phase 1: Open Lid & Turn on Screen
    scrollTl.to(lidGroup.rotation, {
        x: -0.2 * Math.PI, // Opened position
        ease: "power2.inOut",
        duration: 1
    }, 0)
    .to(screenMaterial, {
        opacity: 0.95,
        duration: 0.3
    }, 0.5) // Screen turns on halfway through opening
    .to(screenLight, {
        intensity: 1.5,
        duration: 0.3
    }, 0.5);

    // Phase 2: Rotate laptop to face camera dead-on and zoom in
    scrollTl.to(macGroup.rotation, {
        x: 0.2 * Math.PI, // Cancels out lid rotation so screen is completely flat to camera
        y: 0,
        z: 0,
        ease: "power2.inOut",
        duration: 1.5
    }, 0.8)
    .to(macGroup.position, {
        y: -10, // Adjust centering
        ease: "power2.inOut",
        duration: 1.5
    }, 0.8)
    .to(camera.position, {
        z: 32, // Zoom in extremely close so screen fills viewport
        ease: "power3.inOut",
        duration: 1.5
    }, 0.8);

    // Phase 3: Fade in HTML folders overlay precisely when perfectly zoomed
    scrollTl.to(htmlOverlay, {
        opacity: 1,
        ease: "power1.inOut",
        duration: 0.2
    }, 2.3);
}

function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
