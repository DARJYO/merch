const canvas = document.getElementById("hero-canvas");
const container = canvas.parentElement;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.z = 5;

const brandGroup = new THREE.Group();
scene.add(brandGroup);

// --- SVG LOADER LOGIC ---
const loader = new THREE.SVGLoader();

// Ensure the path to your logo.svg is correct
loader.load('assets/logo.svg', function (data) {
    const paths = data.paths;

    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        
        // Brand Material: Neon Green Wireframe
        const material = new THREE.MeshStandardMaterial({
            color: 0x6cff4d,
            wireframe: true,
            side: THREE.DoubleSide
        });

        const shapes = THREE.SVGLoader.createShapes(path);

        shapes.forEach((shape) => {
            // Extrude creates the 3D depth
            const geometry = new THREE.ExtrudeGeometry(shape, {
                depth: 2,
                bevelEnabled: false
            });
            
            const mesh = new THREE.Mesh(geometry, material);
            brandGroup.add(mesh);
        });
    }

    // SVG coordinates are often huge and upside down. 
    // This centers and scales the logo to fit your hero section.
    brandGroup.scale.set(0.015, -0.015, 0.015); 
    
    // Auto-centering logic
    const box = new THREE.Box3().setFromObject(brandGroup);
    const center = box.getCenter(new THREE.Vector3());
    brandGroup.position.x = -center.x;
    brandGroup.position.y = -center.y;

}, undefined, function (error) {
    console.error('An error happened while loading the SVG:', error);
});

// --- LIGHTING ---
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(5, 5, 5);
scene.add(light);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// --- ANIMATION ---
function animate() {
    requestAnimationFrame(animate);
    
    // Slow, sexy brand rotation
    brandGroup.rotation.y += 0.01;
    
    renderer.render(scene, camera);
}
animate();

// --- RESIZE ---
window.addEventListener("resize", () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
