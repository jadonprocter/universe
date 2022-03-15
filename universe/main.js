import "./style.css";
import * as THREE from "three";
import { FlyControls } from "three/examples/jsm/controls/FlyControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

let points = 0;

////////////////////////////////////////////////////////////////////////
/**
 * FILE SYSTEM HANDLING
 * https://www.youtube.com/watch?v=8EcBJV0sOSU
 */
let fileHandle;
let name = "";

async function loadName() {
  // open file picker
  try {
    [fileHandle] = await window.showOpenFilePicker();

    let fileData = await fileHandle.getFile();
    let text = await fileData.text();
    console.log(text);
    name = text.toString();

    let stream = await fileHandle.createWritable();
    await stream.write("run");
    await stream.close();
  } catch (e) {
    console.error(e);
  }
}

////////////////////////////////////////////////////////////////////////

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

// set up text loader for 3d words
const addText = async (text, x, y, z) => {
  // get random planet name from microservice
  // const t = await loadName();
  const loader = new FontLoader();
  loader.load(
    "./node_modules/three/examples/fonts/droid/droid_sans_bold.typeface.json",
    function (font) {
      const geometryText = new TextGeometry(text, {
        font: font,
        size: 30,
        height: 5,
        curveSegments: 8,
        bevelEnabled: false,
        // bevelThickness: 10,
        // bevelSize: 8,
        // bevelOffset: 0,
        // bevelSegments: 5,
      });
      const materials = [
        new THREE.MeshPhongMaterial({ color: 0xfff }),
        new THREE.MeshPhongMaterial({ color: 0x3af }),
      ];
      const meshText = new THREE.Mesh(geometryText, materials);
      console.log(meshText);
      meshText.position.x = x + 5;
      meshText.position.y = y;
      meshText.position.z = z;
      scene.add(meshText);
    }
  );
};
addText();

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

async function generatePlanet() {
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  await addText(name, x, y, z);
}

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
  points = 0;

  document.getElementById("genPlanet").innerHTML =
    "<button id='loadPlanetNames'>Generate Text</button>";
}

/**
 * ACTIVATE ANIMATION LOOP
 */
camera.lookAt(0, 0, 0);
function animate() {
  // track the amount of toruses
  const torusTracker = scene.children.filter((obj) => {
    if (obj.name === "torus") {
      return obj;
    }
  });

  // track the mouse position
  window.addEventListener("pointermove", onPointerMove);
  requestAnimationFrame(animate);
  flyControls.update(0.01);

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects(torusTracker);

  // see if mouse hovered on a torus
  for (let i = 0; i < intersects.length; i++) {
    const n = intersects[i].object.uuid;
    scene.remove(scene.getObjectByProperty("uuid", n));
    points++;
  }

  // add instructions for user
  document.getElementById("instructionsBtn").addEventListener("click", () => {
    if (document.getElementById("instructions").innerHTML === "") {
      document.getElementById("instructions").innerHTML =
        "<h2>INSTRUCTIONS:</h2>\
      <p>The Object of the game is to collect as many Pink Donuts as you can.</p>\
      <p>Once you collect 5 Pink Donuts Text will appear.</p>\
      <p>See how many Texts you can create.</p> \
      <p>Use the mouse to move your view and the left and right mouse buttons to zoom in and out.</p>\
      <h3>Advanced Uses:</h3> \
      <p>Use the w, a, s, d keys to move around the universe</p>";

      document.getElementById("instructionsBtn").innerHTML = "CLOSE";
    } else {
      document.getElementById("instructions").innerHTML = "";
      document.getElementById("instructionsBtn").innerHTML = "INSTRUCTIONS";
    }
  });

  // display points
  document.getElementById("points").innerHTML = `points: ${points}`;

  if (document.getElementById("loadPlanetNames")) {
    document.getElementById("genPlanet").addEventListener("click", async () => {
      await loadName();
      await generatePlanet();
    });
    // document.getElementById("loadPlanetNames").innerHTML = "";
  }

  // render
  renderer.render(scene, camera);
  if (points >= 5) {
    handlePoints();
  }
}

animate();
