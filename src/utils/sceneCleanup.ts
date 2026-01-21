import * as THREE from "three";

/**
 * Removes any default/white planes from the scene
 * Used to ensure only the bounding-box-derived floor exists
 */
export function removeDefaultPlanes(scene: THREE.Scene): void {
  const planesToRemove: THREE.Object3D[] = [];

  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.geometry instanceof THREE.PlaneGeometry
    ) {
      // Check if it's a default white plane (not named "dynamic-floor")
      if (child.name !== "dynamic-floor") {
        console.log(
          `[SceneCleanup] Removing default plane: ${child.name || "unnamed"}`,
        );
        planesToRemove.push(child);
      }
    }
  });

  planesToRemove.forEach((plane) => {
    scene.remove(plane);
    if (plane instanceof THREE.Mesh) {
      plane.geometry.dispose();
      if (Array.isArray(plane.material)) {
        plane.material.forEach((m) => m.dispose());
      } else {
        plane.material.dispose();
      }
    }
  });

  console.log(
    `[SceneCleanup] Removed ${planesToRemove.length} default plane(s)`,
  );
}

/**
 * Creates an optimized floor based on model bounding box
 * with proper tile sizing and repetition
 */
export function createBoundingBoxFloor(
  model: THREE.Object3D,
  tileTextureUrl: string = "/models/tile.png",
): THREE.Mesh {
  // Compute bounding box
  const bbox = new THREE.Box3().setFromObject(model);
  const size = bbox.getSize(new THREE.Vector3());

  // Floor size: max width/depth with 30% padding
  const baseFloorSize = Math.max(size.x, size.z);
  const floorSize = baseFloorSize * 1.3;

  console.log(
    `[SceneCleanup] Creating floor: ${floorSize.toFixed(2)}x${floorSize.toFixed(2)}`,
  );

  // Create floor geometry and material
  const geometry = new THREE.PlaneGeometry(floorSize, floorSize);
  const material = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.6,
    metalness: 0.05,
  });

  const floor = new THREE.Mesh(geometry, material);

  // Position at model base
  floor.position.y = bbox.min.y - 0.05;
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.name = "dynamic-floor";

  // Load and apply tile texture
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    tileTextureUrl,
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      // Constants
      const TILE_WORLD_SIZE = 0.5; // World unit size per tile
      const SCALE_FACTOR = 10; // Make tiles 10x larger

      // Calculate tile repetition (tiles will appear ~10x larger)
      const tilesX = floorSize / (TILE_WORLD_SIZE * SCALE_FACTOR);
      const tilesZ = floorSize / (TILE_WORLD_SIZE * SCALE_FACTOR);

      texture.repeat.set(tilesX, tilesZ);

      console.log(
        `[SceneCleanup] Applied tile texture: ${tilesX.toFixed(1)}x${tilesZ.toFixed(1)} repetitions`,
      );

      // Apply texture
      if (floor.material instanceof THREE.MeshStandardMaterial) {
        floor.material.map = texture;
        floor.material.needsUpdate = true;
      }
    },
    undefined,
    (error) => {
      console.error("[SceneCleanup] Error loading tile texture:", error);
    },
  );

  return floor;
}
