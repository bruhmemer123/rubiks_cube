import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
const App = () => {
  const containerRef = useRef(null);
  const cubesRef = useRef([]);
  const colors = {
    right:  new THREE.MeshBasicMaterial({ color: 0xb71212 }), // Red
    left:   new THREE.MeshBasicMaterial({ color: 0xe06600 }), // Orange
    top:    new THREE.MeshBasicMaterial({ color: 0xffd500 }), // Yellow
    bottom: new THREE.MeshBasicMaterial({ color: 0xffffff }), // White
    front:  new THREE.MeshBasicMaterial({ color: 0x009b48 }), // Green
    back:   new THREE.MeshBasicMaterial({ color: 0x0046ad }), // Blue
    inside: new THREE.MeshBasicMaterial({ color: 0x000000 })  // Black for internals
  };
  useEffect(() => {
    if (!containerRef.current) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    cubesRef.current = [];
    const spacing = 1.25;
    for(let i = 0; i < 3; i++) {
      cubesRef.current[i] = [];
      for(let j = 0; j < 3; j++) {
        cubesRef.current[i][j] = [];
        for(let k = 0; k < 3; k++) {
          const matArray = [
            i === 2 ? colors.right  : colors.inside, 
            i === 0 ? colors.left   : colors.inside, 
            j === 2 ? colors.top    : colors.inside, 
            j === 0 ? colors.bottom : colors.inside, 
            k === 2 ? colors.front  : colors.inside, 
            k === 0 ? colors.back   : colors.inside  
          ];
          const geometry = new THREE.BoxGeometry(1,1,1);
          const cube = new THREE.Mesh(geometry, matArray);
          cube.position.set((i - 1)*spacing, (j - 1)*spacing, (k - 1)*spacing);
          scene.add(cube);
          cubesRef.current[i][j][k] = cube;
    }}}
    camera.position.set(3, 3, 5);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    controls.update();
    renderer.render(scene, camera);
    function animate(time) {
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
    return () => {
      renderer.setAnimationLoop(null);
      if(containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={containerRef} style={{ width: '100vw', height: '100vh', position:'absolute', top:'0', left:'0'}} />;
}

export default App