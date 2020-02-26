import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

import * as orbitFactory from 'three-orbit-controls';

const OrbitControls = orbitFactory(THREE);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'isle';

  ngOnInit() {

  }




}


// import Stats from './jsm/libs/stats.module.js';

//import { GUI } from './jsm/libs/dat.gui.module.js';
// import { OrbitControls } from './jsm/controls/OrbitControls.js';
// import { LineMaterial } from './jsm/lines/LineMaterial.js';
// import { Wireframe } from './jsm/lines/Wireframe.js';
// import { WireframeGeometry2 } from './jsm/lines/WireframeGeometry2.js';

var wireframe, renderer, scene, camera, camera2, controls;
var wireframe1;
var matLine, matLineBasic, matLineDashed;
var stats;


// viewport
var insetWidth;
var insetHeight;

init();
animate();



function init() {

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0.0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(- 50, 0, 50);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 10;
  controls.maxDistance = 500;

  window.addEventListener('resize', onWindowResize, false);
  onWindowResize();

  ////

  const material = new THREE.LineBasicMaterial({ color: 0xffffff });
  const points = [];
  points.push(new THREE.Vector3(- 10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  points.push(new THREE.Vector3(- 10, 0, 0));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = new THREE.Line( geometry, material );
  scene.add( line );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
