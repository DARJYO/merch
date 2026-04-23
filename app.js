const container = document.getElementById('pano-container');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

// 1. Create the Sphere
const geometry = new THREE.SphereGeometry(500, 60, 40);
// Invert the geometry so the image is on the inside
geometry.scale(-1, 1, 1);

// 2. Load your 360 Image
const loader = new THREE.TextureLoader();
// REPLACE THIS with your actual image path
const texture = loader.load('assets/hero_panorama.jpg'); 
const material = new THREE.MeshBasicMaterial({ map: texture });
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

camera.position.set(0, 0, 0.1);

// 3. Mouse Interaction Logic
let isUserInteracting = false,
    onPointerDownMouseX = 0, onPointerDownMouseY = 0,
    lon = 0, onPointerDownLon = 0,
    lat = 0, onPointerDownLat = 0,
    phi = 0, theta = 0;

container.addEventListener('pointerdown', (event) => {
    isUserInteracting = true;
    onPointerDownMouseX = event.clientX;
    onPointerDownMouseY = event.clientY;
    onPointerDownLon = lon;
    onPointerDownLat = lat;
});

document.addEventListener('pointermove', (event) => {
    if (isUserInteracting) {
        lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
        lat = (event.clientY - onPointerDownMouseY) * 0.1 + onPointerDownLat;
    }
});

document.addEventListener('pointerup', () => {
    isUserInteracting = false;
});

// 4. Animation Loop
function animate() {
    requestAnimationFrame(animate);
    update();
}

function update() {
    // Clamp vertical rotation so you don't flip upside down
    lat = Math.max(-85, Math.min(85, lat));
    
    phi = THREE.MathUtils.degToRad(90 - lat);
    theta = THREE.MathUtils.degToRad(lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);
    renderer.render(scene, camera);
}

animate();

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
