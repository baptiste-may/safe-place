const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 2, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = Math.PI/2;

const materials = {
    white: new THREE.MeshPhongMaterial({color: 0xaaaaaaa})
}

scene.background = new THREE.Color(0x777777);

const loader = new THREE.GLTFLoader();

// =========================================================================

// ROOM

const room = {
    x: 10,
    y: 3,
    z: 6
}

const floor = new THREE.Mesh(new THREE.BoxGeometry(room.x, 0, room.z), materials.white);
floor.geometry.computeVertexNormals();
scene.add(floor);

const ceiling = new THREE.Mesh(new THREE.BoxGeometry(room.x, 0, room.z), materials.white);
ceiling.position.set(0, room.y, 0);
ceiling.geometry.computeVertexNormals();
scene.add(ceiling);

const wallRight = new THREE.Mesh(new THREE.BoxGeometry(0, room.y, room.z), materials.white);
wallRight.position.set(room.x/2, room.y/2, 0);
wallRight.geometry.computeVertexNormals();
scene.add(wallRight);

const wallLeft = new THREE.Mesh(new THREE.BoxGeometry(0, room.y, room.z), materials.white);
wallLeft.position.set(-room.x/2, room.y/2, 0);
wallLeft.geometry.computeVertexNormals();
scene.add(wallLeft);

const wallFront = new THREE.Mesh(new THREE.BoxGeometry(room.x, room.y, 0), materials.white);
wallFront.position.set(0, room.y/2, room.z/2);
wallFront.geometry.computeVertexNormals();
scene.add(wallFront);

const wallBack = new THREE.Mesh(new THREE.BoxGeometry(room.x, room.y, 0), materials.white);
wallBack.position.set(0, room.y/2, -room.z/2);
wallBack.geometry.computeVertexNormals();
scene.add(wallBack);

// OFFICE

const officeTop = new THREE.Mesh(new THREE.BoxGeometry(2, 0.025, 0.75), materials.white);
officeTop.position.set(0, 0.75, -0.15);
officeTop.geometry.computeVertexNormals();
scene.add(officeTop);

const officeRight = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.75, 0.7), materials.white);
officeRight.position.set(0.9, 0.37, -0.15);
officeRight.geometry.computeVertexNormals();
scene.add(officeRight);

const officeLeft = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.75, 0.7), materials.white);
officeLeft.position.set(-0.9, 0.37, -0.15);
officeLeft.geometry.computeVertexNormals();
scene.add(officeLeft);

let screen = undefined;
loader.load("models/screen/scene.gltf", (gltf) => {
    screen = gltf.scene;
    screen.position.set(0, 1.02, -0.59);
    screen.scale.set(0.001, 0.001, 0.001);
    scene.add(screen);
});

let keyboard = undefined;
loader.load("models/keyboard/scene.gltf", (gltf) => {
    keyboard = gltf.scene;
    keyboard.position.set(-0.075, 0.775, 0.05);
    keyboard.scale.set(0.025, 0.025, 0.025);
    scene.add(keyboard);
});

// LIGHTS

const ambienceLight = new THREE.AmbientLight(0xffffff, 0.25, 0);
scene.add(ambienceLight);

const light = new THREE.PointLight(0xffffff, 0.75, 0);
light.position.set(0, 2.9, 0);
scene.add(light);

// =========================================================================

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
});

function updateElements() {
    ceiling.visible = true ? camera.position.y < room.y : false;
    wallRight.visible = true ? camera.position.x < room.x/2 : false;
    wallLeft.visible = true ? -camera.position.x < room.x/2 : false;
    wallFront.visible = true ? camera.position.z < room.z/2 : false;
    wallBack.visible = true ? -camera.position.z < room.z/2 : false;
}

function animate() {
	requestAnimationFrame(animate);
    controls.target.set(0, 1, 0);
    controls.update();

    updateElements();

	renderer.render( scene, camera );
}
animate();