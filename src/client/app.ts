import * as THREE from "/build/three.module.js";
import { OrbitControls } from "/jsm/controls/OrbitControls";
import Stats from "/jsm/libs/stats.module";
import { GUI } from "/jsm/libs/dat.gui.module";

export default class Sketch {
  width: number;
  height: number;
  aspect: number;

  canvas: HTMLElement;

  stats!: Stats;
  gui!: GUI;

  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;
  controls: OrbitControls;
  geometry!: any;
  material!: any;
  mesh!: THREE.Mesh;

  constructor() {
    this.scene = new THREE.Scene();

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.aspect = this.width / this.height;

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0xffffff, 1);

    this.canvas = <HTMLElement>document.getElementById("canvas");
    this.canvas.appendChild(this.renderer.domElement);

    //PERSPECTIVE CAMERA
    this.camera = new THREE.PerspectiveCamera(75, this.aspect, 0.1, 1000);

    //ORTHOGRAPHIC CAMERA
    // const fustrumSize = 1;
    // this.camera = new THREE.OrthographicCamera(
    //   fustrumSize / -2,
    //   fustrumSize / 2,
    //   fustrumSize / 2,
    //   fustrumSize / -2,
    //   0.1,
    //   1000
    // );

    this.camera.position.set(0, 0, 2);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    this.settings();
    this.addObjects();
    this.render();

    window.addEventListener("resize", this.resize, false);
  }

  settings = () => {
    this.stats = Stats();
    this.canvas.appendChild(this.stats.dom);

    this.gui = new GUI({ autoPlace: true });
    this.gui.add(this.camera.position, "z", 0, 20, 1);

    this.gui.domElement.id = "gui";
    this.canvas.appendChild(this.gui.domElement);
  };

  render = () => {
    requestAnimationFrame(this.render);

    this.controls.update();
    this.stats.update();

    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.02;

    this.renderer.render(this.scene, this.camera);
  };

  resize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height);
    this.camera.updateProjectionMatrix();

    this.renderer.render(this.scene, this.camera);
  };

  addObjects() {
    this.material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.geometry = new THREE.BoxGeometry();
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  }
}

new Sketch();
