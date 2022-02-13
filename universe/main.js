import "./style.css";

// import THREE and the controls for moving in the 3D scene
import * as THREE from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
// import { Raycaster } from "three/src/core/Raycaster.js";
// import {pointers } from ""

let points = 0;

/**
 * SET UP THE SCENE
 */

// Initialize the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.01,
  3000
);

// initialize the renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 0, 0);
camera.lookAt(new THREE.Vector3(0, 0, 0));
renderer.render(scene, camera);

// add a pointlight to the scene and ambieint light
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// initialize controls
const flyControls = new FlyControls(camera, renderer.domElement);
flyControls.movementSpeed = 50;
flyControls.rollSpeed = Math.PI / 12;
flyControls.autoForeward = false;
flyControls.dragToLook = false;

/**
 * FUNCTIONS TO ADD THINGS TO THE SCENE
 */

// add planets

async function addPlanet(meshColor) {
  const planetTexture = new THREE.TextureLoader().load(
    `../meshes/${meshColor}`
  );
  const [a, b, c] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randInt(12, 60));

  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(a, b, c),
    new THREE.MeshStandardMaterial({
      map: planetTexture,
    })
  );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  planet.position.set(x, y, z);
  scene.add(planet);

  return [x, y, z];
}
Array(5)
  .fill()
  .forEach(() => {
    addPlanet("orange.png");
  });

// add stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(2000).fill().forEach(addStar);

// add Torus
let torusCount = 0;
function addTorus() {
  const torus = new THREE.Mesh(
    new THREE.TorusGeometry(5, 3, 8, 50),
    new THREE.MeshStandardMaterial({
      color: 0xf754b0,
    })
  );
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  torus.position.set(x, y, z);
  torus.name = `torus`;
  torusCount++;
  scene.add(torus);
}
Array(25).fill().forEach(addTorus);

/**
 * RAYCASTING TO TRACK THE MOUSE
 */

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

/**
 * HANDLING POINTS
 */

function handlePoints() {
  // document.getElementById(
  //   "generate"
  // ).innerHTML = `<btn id='planetBtn' onClick=${addPlanet}>Generate a Planet</btn>`;
  points = 0;
  const posArr = addPlanet("purple.png");
  camera.lookAt(posArr[0], posArr[1], posArr[2]);
}

/**
 * ACTIVATE ANIMATION LOOP
 */

function animate() {
  const torusTracker = scene.children.filter((obj) => {
    if (obj.name === "torus") {
      return obj;
    }
  });
  // console.log(torusTracker);
  window.addEventListener("pointermove", onPointerMove);
  requestAnimationFrame(animate);
  flyControls.update(0.01);

  // update the picking ray with the camera and pointer position
  raycaster.setFromCamera(pointer, camera);

  // calculate objects intersecting the picking ray
  const intersects = raycaster.intersectObjects(torusTracker);
  // console.log(intersects);
  for (let i = 0; i < intersects.length; i++) {
    const n = intersects[i].object.uuid;
    console.log(n);
    scene.remove(scene.getObjectByProperty("uuid", n));
    points++;
    console.log(points);
  }

  document.getElementById("instructionsBtn").addEventListener("click", () => {
    if (document.getElementById("instructions").innerHTML === "") {
      document.getElementById("instructions").innerHTML =
        "<h2>INSTRUCTIONS:</h2>\
      <p>The Object of the game is to collect as many Pink Donuts as you can.</p>\
      <p>Once you collect 5 Pink Donuts Then a world will appear.</p>\
      <p>See how many worlds you can create.</p> \
      <p>Use the mouse to move your view and the left and right mouse buttons to zoom in and out.</p>\
      <h3>Advanced Uses:</h3> \
      <p>Use the w, a, s, d keys to move around the universe</p>";

      document.getElementById("instructionsBtn").innerHTML = "CLOSE";
    } else {
      document.getElementById("instructions").innerHTML = "";
      document.getElementById("instructionsBtn").innerHTML = "INSTRUCTIONS";
    }
  });

  document.getElementById("points").innerHTML = `points: ${points}`;

  renderer.render(scene, camera);
  if (points >= 5) {
    handlePoints();
  }
}

animate();
console.log(scene);