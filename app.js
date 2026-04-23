const canvas = document.getElementById("hero-canvas")

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

const container = canvas.parentElement;
renderer.setSize(container.clientWidth, container.clientHeight);

camera.position.z = 3


const geometry = new THREE.TorusKnotGeometry(1,0.3,120,16)

const material = new THREE.MeshStandardMaterial({

color:0x6cff4d,
metalness:0.7,
roughness:0.3,
wireframe:true

})

const knot = new THREE.Mesh(geometry,material)

scene.add(knot)


const light = new THREE.PointLight(0xffffff,1)

light.position.set(5,5,5)

scene.add(light)


function animate(){

requestAnimationFrame(animate)

knot.rotation.x += 0.003
knot.rotation.y += 0.004

renderer.render(scene,camera)

}

animate()


window.addEventListener("resize", () => {
    renderer.setSize(container.clientWidth, container.clientHeight);
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
})

