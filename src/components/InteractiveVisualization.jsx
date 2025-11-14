import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function InteractiveVisualization({
  demountables = [],
  objects = [],
  onObjectSelect,
  onObjectMove,
  viewMode = 'perspective',
  showGrid = true
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const [selectedObject, setSelectedObject] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragPlaneRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e0e0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      mountNode.clientWidth / mountNode.clientHeight,
      0.1,
      1000
    );

    if (viewMode === 'top-down') {
      camera.position.set(0, 50, 0.1);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(30, 20, 30);
      camera.lookAt(0, 0, 0);
    }
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountNode.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Grid
    if (showGrid) {
      const gridHelper = new THREE.GridHelper(100, 100, 0x888888, 0xcccccc);
      scene.add(gridHelper);
    }

    // Ground plane (for drag detection)
    const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
    const groundMaterial = new THREE.MeshBasicMaterial({
      visible: false
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    dragPlaneRef.current = ground;
    scene.add(ground);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 50, 25);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    scene.add(directionalLight);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Window resize handler
    const handleResize = () => {
      if (!mountNode || !camera || !renderer) return;
      const width = mountNode.clientWidth;
      const height = mountNode.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountNode && renderer.domElement) {
        mountNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [viewMode, showGrid]);

  // Update demountables
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear existing demountables
    scene.children.forEach(child => {
      if (child.userData.type === 'demountable') {
        scene.remove(child);
      }
    });

    // Add new demountables
    demountables.forEach((demountable, index) => {
      const structure = createDemountableStructure(demountable);
      structure.userData = {
        type: 'demountable',
        id: demountable.id || `demountable-${index}`,
        selectable: true
      };
      scene.add(structure);
    });
  }, [demountables]);

  // Update objects
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    // Clear existing objects
    scene.children.forEach(child => {
      if (child.userData.type === 'object') {
        scene.remove(child);
      }
    });

    // Add new objects
    objects.forEach((obj, index) => {
      const mesh = createObjectMesh(obj);
      mesh.userData = {
        type: 'object',
        id: obj.id || `object-${index}`,
        selectable: true,
        data: obj
      };
      scene.add(mesh);
    });
  }, [objects]);

  // Mouse interaction handlers
  const handleMouseDown = (event) => {
    const rect = mountRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(
      sceneRef.current.children.filter(obj => obj.userData.selectable),
      true
    );

    if (intersects.length > 0) {
      let targetObject = intersects[0].object;
      while (targetObject.parent && !targetObject.userData.selectable) {
        targetObject = targetObject.parent;
      }

      setSelectedObject(targetObject);
      setIsDragging(true);
      if (onObjectSelect) {
        onObjectSelect(targetObject.userData);
      }
      controlsRef.current.enabled = false;
    } else {
      setSelectedObject(null);
      if (onObjectSelect) {
        onObjectSelect(null);
      }
    }
  };

  const handleMouseMove = (event) => {
    if (!isDragging || !selectedObject || selectedObject.userData.type !== 'object') return;

    const rect = mountRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObject(dragPlaneRef.current);

    if (intersects.length > 0) {
      const point = intersects[0].point;
      selectedObject.position.x = point.x;
      selectedObject.position.z = point.z;

      if (onObjectMove) {
        onObjectMove(selectedObject.userData.id, {
          x: point.x,
          y: selectedObject.position.y,
          z: point.z
        });
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    controlsRef.current.enabled = true;
  };

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
}

// Helper function to create demountable structure
function createDemountableStructure(config) {
  const group = new THREE.Group();

  if (!config.dimensions) return group;

  const { length, width, height } = config.dimensions;
  const L = length / 1000; // Convert mm to meters
  const W = width / 1000;
  const H = height / 1000;

  // Position offset
  const offsetX = config.position?.x || 0;
  const offsetZ = config.position?.z || 0;
  group.position.set(offsetX, 0, offsetZ);

  // Material colors
  const wallColor = config.material === 'steel' ? 0xB0C4DE : 0xD2B48C;
  const wallMaterial = new THREE.MeshPhongMaterial({
    color: wallColor,
    side: THREE.DoubleSide
  });
  const roofMaterial = new THREE.MeshPhongMaterial({
    color: 0x8B4513
  });
  const windowMaterial = new THREE.MeshPhongMaterial({
    color: 0x87CEEB,
    transparent: true,
    opacity: 0.4
  });

  // Floor
  const floorGeometry = new THREE.BoxGeometry(L, 0.1, W);
  const floor = new THREE.Mesh(floorGeometry, wallMaterial);
  floor.position.y = 0.05;
  floor.receiveShadow = true;
  group.add(floor);

  // Walls
  const wallThickness = 0.1;

  // Front wall
  const frontWallGeometry = new THREE.BoxGeometry(L, H, wallThickness);
  const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
  frontWall.position.set(0, H / 2, W / 2);
  frontWall.castShadow = true;
  group.add(frontWall);

  // Back wall
  const backWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
  backWall.position.set(0, H / 2, -W / 2);
  backWall.castShadow = true;
  group.add(backWall);

  // Left wall
  const sideWallGeometry = new THREE.BoxGeometry(wallThickness, H, W);
  const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
  leftWall.position.set(-L / 2, H / 2, 0);
  leftWall.castShadow = true;
  group.add(leftWall);

  // Right wall
  const rightWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
  rightWall.position.set(L / 2, H / 2, 0);
  rightWall.castShadow = true;
  group.add(rightWall);

  // Windows (on front wall)
  const windowCount = config.features?.windows || 2;
  const windowWidth = 1.2;
  const windowHeight = 1.0;
  const windowSpacing = L / (windowCount + 1);

  for (let i = 0; i < windowCount; i++) {
    const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, 0.05);
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    window.position.set(
      -L / 2 + windowSpacing * (i + 1),
      H / 2,
      W / 2 + 0.06
    );
    group.add(window);
  }

  // Door (on front wall)
  const doorGeometry = new THREE.BoxGeometry(1, 2, 0.05);
  const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
  const door = new THREE.Mesh(doorGeometry, doorMaterial);
  door.position.set(L / 3, 1, W / 2 + 0.06);
  group.add(door);

  // Roof
  if (config.roofStyle === 'flat' || !config.roofStyle) {
    const roofGeometry = new THREE.BoxGeometry(L + 0.2, 0.1, W + 0.2);
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = H + 0.05;
    roof.castShadow = true;
    group.add(roof);
  } else if (config.roofStyle === 'gable') {
    const roofShape = new THREE.Shape();
    roofShape.moveTo(-L / 2 - 0.1, 0);
    roofShape.lineTo(L / 2 + 0.1, 0);
    roofShape.lineTo(0, 1);
    roofShape.lineTo(-L / 2 - 0.1, 0);

    const extrudeSettings = {
      depth: W + 0.2,
      bevelEnabled: false
    };
    const roofGeometry = new THREE.ExtrudeGeometry(roofShape, extrudeSettings);
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(0, H, -W / 2 - 0.1);
    roof.rotation.x = Math.PI / 2;
    roof.castShadow = true;
    group.add(roof);
  }

  return group;
}

// Helper function to create object meshes
function createObjectMesh(obj) {
  const group = new THREE.Group();

  // Parse color - handle both hex strings and numbers
  let color = 0x4CAF50; // Default color
  if (obj.color) {
    if (typeof obj.color === 'string') {
      color = parseInt(obj.color.replace('#', '0x'));
    } else {
      color = obj.color;
    }
  }

  const material = new THREE.MeshPhongMaterial({ color });

  // Use dimensions from object if available, otherwise use defaults
  let width = 1;
  let height = 1;
  let depth = 1;

  if (obj.dimensions) {
    // Convert mm to meters
    width = obj.dimensions.length / 1000;
    depth = obj.dimensions.width / 1000;
    height = obj.dimensions.height / 1000;
  }

  const geometry = new THREE.BoxGeometry(width, height, depth);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);

  // Set position
  if (obj.position) {
    group.position.set(
      obj.position.x || 0,
      obj.position.y !== undefined ? obj.position.y : (height / 2),
      obj.position.z || 0
    );
  } else {
    // Default position with object sitting on ground
    group.position.set(0, height / 2, 0);
  }

  return group;
}

export default InteractiveVisualization;
