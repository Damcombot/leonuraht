import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById("canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const light = new THREE.SpotLight("#ffffff", 13, 0, 40);
const renderer = new THREE.WebGLRenderer({ canvas });

// Load the GLTF model
const loader = new GLTFLoader();
loader.load(
  'untitled.glb', 
  (gltf) => {
    const model = gltf.scene;
    model.rotation.y += 45;
  // Optional: Animation or transformation
    model.position.set(0, -0.5, 0);  // Adjust position if necessary
    model.scale.set(1, 1, 1);  // Scale the model if necessary
    scene.add(model);  // Add the model to the scene
  },
  undefined,
  (error) => {
    console.error('An error happened', error);
  }
);

camera.position.z = 4;

scene.background = new THREE.Color("#1b1b1b");
scene.add(light);
light.position.set(0, 3, 0);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enableRotate = true;
controls.enablePan = false;
controls.enableZoom = true;

// Restrict the rotation only around the Y-axis
//controls.minPolarAngle = Math.PI / 2; // Lock the up/down rotation
//controls.maxPolarAngle = Math.PI / 2; // Lock the up/down rotation

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
function adjustModelSize() {
  if (window.innerWidth <= 768) {
    // Mobile screen: Scale down the model
    model.scale.set(0.5, 0.5, 0.5);  // Set the scale smaller for mobile
  } else {
    // Larger screens: Use the default scale
    model.scale.set(1, 1, 1);  // Default scale for desktop
  }
}

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
window.addEventListener('resize', adjustModelSize);
adjustModelSize();
animate();
