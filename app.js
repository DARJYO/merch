const canvas = document.getElementById("hero-canvas");
const container = canvas.parentElement;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

// Define renderer FIRST
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true // Makes the lines look sharp and professional
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio); // Prevents blurriness on high-res screens

camera.position.z = 3;

// Geometry & Material
const geometry = new THREE.TorusKnotGeometry(1, 0.3, 120, 16);
const material = new THREE.MeshStandardMaterial({
    color: 0x6cff4d,
    metalness: 0.7,
    roughness: 0.3,
    wireframe: true
});

const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Softens the shadows
scene.add(ambientLight);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    
    knot.rotation.x += 0.003;
    knot.rotation.y += 0.004;
    
    renderer.render(scene, camera);
}

animate();

// Responsive Resize
window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
