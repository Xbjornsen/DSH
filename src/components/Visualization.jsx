import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Visualization({ config }) {
  const mountRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    let scene, camera, renderer, controls, structure;

    const init = () => {
      // Check if config has necessary properties
      if (!config || !config.dimensions) {
        setError('Invalid configuration provided');
        return;
      }

      const { length, width, height } = config.dimensions;

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);
      camera = new THREE.PerspectiveCamera(75, mountNode.clientWidth / mountNode.clientHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
      mountNode.appendChild(renderer.domElement);

      controls = new OrbitControls(camera, renderer.domElement);

      // Create materials
      const wallMaterial = new THREE.MeshPhongMaterial({ 
        color: config.material === 'steel' ? 0xB0C4DE : 0xD2B48C,
        side: THREE.DoubleSide
      });
      const roofMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513, side: THREE.DoubleSide });
      const windowMaterial = new THREE.MeshPhongMaterial({ color: 0x87CEEB, transparent: true, opacity: 0.6 });

      // Create demountable structure
      structure = new THREE.Group();

      // Floor
      const floorGeometry = new THREE.PlaneGeometry(length / 1000, width / 1000);
      const floor = new THREE.Mesh(floorGeometry, wallMaterial);
      floor.rotation.x = -Math.PI / 2;
      structure.add(floor);

      // Walls
      const wallHeight = height / 1000;
      const wallLength = length / 1000;
      const wallWidth = width / 1000;

      // ... (rest of the structure creation code)

      scene.add(structure);

      // Lighting
      const ambientLight = new THREE.AmbientLight(0x404040);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      directionalLight.position.set(1, 1, 1);
      scene.add(directionalLight);

      camera.position.set(wallLength, wallHeight, wallWidth);
      controls.update();
    };

    const animate = () => {
      if (scene && camera && renderer) {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
    };

    const handleResize = () => {
      if (!mountNode || !camera || !renderer) return;
      const width = mountNode.clientWidth;
      const height = mountNode.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    try {
      init();
      animate();
      window.addEventListener('resize', handleResize);
    } catch (err) {
      console.error('Error initializing 3D visualization:', err);
      setError('Failed to initialize 3D visualization');
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountNode && renderer?.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      if (renderer) renderer.dispose();
      if (structure) {
        structure.traverse((object) => {
          if (object.geometry) object.geometry.dispose();
          if (object.material) object.material.dispose();
        });
      }
      if (scene) {
        scene.clear();
      }
    };
  }, [config]); // Add config as a dependency

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div ref={mountRef} className="w-full h-full" />;
}

export default Visualization;