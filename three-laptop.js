// THREE and THREE.GLTFLoader are now available globally via script tags in index.html

// DOM Elements
const canvasEl = document.getElementById("laptop-canvas");
const projectsSection = document.getElementById("projects");
const htmlOverlay = document.getElementById("laptop-screen");

// Globals
let scene, camera, renderer, cssRenderer;
let darkPlasticMaterial, baseMetalMaterial, logoMaterial, screenMaterial, keyboardMaterial;
let macGroup, lidGroup, bottomGroup, screenMesh, screenLight;
let controls, raycaster, mouse;
let laptopOpen = false;
let isHovering = false;
const screenSize = [29.4, 20];

// Initialize
initScene();
createMaterials();

const modelLoader = new THREE.GLTFLoader();
modelLoader.load(
    MAC_GLB_B64,
    glb => {
        parseModel(glb);
        addScreen();
        addKeyboard();
        
        // Initial positioning
        macGroup.rotation.x = 0.05 * Math.PI; // Tilted slightly down
        macGroup.rotation.y = -0.05 * Math.PI; // Tilted slightly to the left
        macGroup.position.y = 5; // Moved higher up the screen
        
        // Lid starts open
        lidGroup.rotation.x = 0.0; // Open state
        laptopOpen = true;
        
        addScreen();
        // Setup CSS3D HTML folders overlay
        setupCSS3DScreen();
        
        render();
        updateSceneSize();
        window.addEventListener("resize", updateSceneSize);
        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mousedown", onMouseDown);
        window.addEventListener("mouseup", onMouseUp);
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
    
    const container = canvasEl.parentElement;
    
    // WebGL Renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvasEl, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);

    // CSS3D Renderer (For HTML folders overlay)
    cssRenderer = new THREE.CSS3DRenderer();
    cssRenderer.setSize(container.clientWidth, container.clientHeight);
    cssRenderer.domElement.style.position = 'absolute';
    cssRenderer.domElement.style.top = '0px';
    cssRenderer.domElement.style.pointerEvents = 'none'; // Only allow pointer events on the 3D objects
    container.appendChild(cssRenderer.domElement);
    // Camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 5, 55); // Moved back to make the laptop smaller

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0); // Focus on the laptop's actual position
    controls.enableDamping = true;
    controls.dampingFactor = 0.05; // Smooth dragging
    controls.rotateSpeed = 0.4; // Slower rotation
    controls.minDistance = 25; // Don't allow zooming too close
    controls.maxDistance = 80; // Don't allow zooming too far
    
    // Constrain horizontal rotation so you can't see the back of the laptop
    controls.minAzimuthAngle = -Math.PI / 4; // -45 degrees
    controls.maxAzimuthAngle = Math.PI / 4;  // 45 degrees
    
    // Constrain vertical rotation so you can't see completely under or over it
    controls.minPolarAngle = Math.PI / 3; // ~60 degrees
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // slightly past 90 degrees (eye level)
    
    controls.update();
    controls.enablePan = false;
    
    // Raycaster for hover & click
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const lightHolder = new THREE.Group();
    scene.add(lightHolder);
    const light = new THREE.PointLight(0xFFF5E1, 0.8);
    light.position.set(0, 5, 50);
    lightHolder.add(light);
    lightHolder.quaternion.copy(camera.quaternion);

    macGroup = new THREE.Group();
    macGroup.position.set(0, 0, 0); // Center the laptop
    macGroup.rotation.x = 0.1; // Default tilt
    scene.add(macGroup);
    
    camera.lookAt(macGroup.position);
    
    lidGroup = new THREE.Group();
    macGroup.add(lidGroup);
    
    bottomGroup = new THREE.Group();
    macGroup.add(bottomGroup);
}

function updateSceneSize() {
    const container = canvasEl.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    
    renderer.setSize(width, height);
    cssRenderer.setSize(width, height);
}

function createMaterials() {
    const textLoader = new THREE.TextureLoader();
    const screenImageTexture = textLoader.load(SCREEN_TEX_B64, tex => {
        tex.flipY = false;
        tex.wrapS = THREE.RepeatWrapping;
        tex.repeat.y = tex.image.width / tex.image.height / screenSize[0] * screenSize[1];
    });

    screenMaterial = new THREE.MeshBasicMaterial({
        color: 0xf5f5f7, // Light macOS base color
        transparent: true,
        opacity: 1.0, // Fully illuminated since laptop starts open
        side: THREE.BackSide
    });
    
    const keyboardTexture = textLoader.load(KEYBOARD_TEX_B64);
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
                } else if (mesh.name === "logo" || mesh.name === "Logo") {
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
        } else if (child.name === "Logo" || child.name.toLowerCase().includes("logo")) {
            // If logo is a root element
            child.material = logoMaterial;
            lidGroup.add(child);
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

    screenLight = new THREE.RectAreaLight(0xffffff, 5, screenSize[0], screenSize[1]);
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

function setupCSS3DScreen() {
    const screenElement = document.getElementById('laptop-screen');
    const cssObject = new THREE.CSS3DObject(screenElement);
    // Position it slightly in front of the screen mesh (-0.10 is slightly in front of -0.11)
    cssObject.position.set(0, 10.5, -0.10); 
    // Rotate to 0,0,0 so it's right-side up facing the camera (+Z)
    cssObject.rotation.set(0, 0, 0); 
    // Scale down the HTML to fit the 3D dimensions (screenSize is 29.4 x 20)
    cssObject.scale.set(0.04, 0.04, 0.04); 
    
    lidGroup.add(cssObject);
}

function onMouseMove(event) {
    // Update mouse position for raycaster
    const container = canvasEl.parentElement;
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    // Raycast against the entire laptop, safely ignoring CSS3DObject
    const intersects = raycaster.intersectObjects([macGroup], true);
    
    if (intersects.length > 0) {
        if (!isHovering) {
            isHovering = true;
            document.body.style.cursor = 'pointer';
        }
    } else {
        if (isHovering) {
            isHovering = false;
            document.body.style.cursor = 'default';
        }
    }
}

let mouseDownPos = { x: 0, y: 0 };

function onMouseDown(event) {
    mouseDownPos.x = event.clientX;
    mouseDownPos.y = event.clientY;
}

function onMouseUp(event) {
    const dist = Math.hypot(event.clientX - mouseDownPos.x, event.clientY - mouseDownPos.y);
    // If moved less than 5 pixels, treat as click
    if (dist < 5 && isHovering) {
        toggleLaptop();
    }
}

function toggleLaptop() {
    if (laptopOpen) {
        // Close it
        gsap.to(lidGroup.rotation, {
            x: 0.5 * Math.PI,
            ease: "power2.inOut",
            duration: 1.2
        });
        laptopOpen = false;
    } else {
        // Open it
        gsap.to(lidGroup.rotation, {
            x: -0.1 * Math.PI,
            ease: "power2.inOut",
            duration: 1.2
        });
        laptopOpen = true;
    }
}

function render() {
    controls.update();
    
    // We must render BOTH renderers
    renderer.render(scene, camera);
    if(cssRenderer) {
        cssRenderer.render(scene, camera);
    }
    
    requestAnimationFrame(render);
}
