import * as THREE from "three";

const TILE_WORLD_SIZE = 0.5; // Each tile is 0.5 units
const FLOOR_PADDING = 0.3; // 30% padding around model

export function createDynamicFloor(model: THREE.Object3D): THREE.Mesh {
  // Compute bounding box
  const bbox = new THREE.Box3().setFromObject(model);
  const size = bbox.getSize(new THREE.Vector3());

  // Determine floor dimensions with padding
  const baseFloorSize = Math.max(size.x, size.z);
  const floorSize = baseFloorSize * (1 + FLOOR_PADDING);

  console.log(
    `[FloorUtils] Creating floor: size ${floorSize.toFixed(2)} (model: ${baseFloorSize.toFixed(2)})`,
  );

  // Create floor geometry
  const geometry = new THREE.PlaneGeometry(floorSize, floorSize);

  // Create material (will be textured separately)
  const material = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.6,
    metalness: 0.05,
  });

  const floor = new THREE.Mesh(geometry, material);

  // Position floor below model
  const floorY = bbox.min.y - 0.05;
  floor.position.y = floorY;
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;

  console.log(
    `[FloorUtils] Floor positioned at y: ${floorY.toFixed(2)}, size: ${floorSize.toFixed(2)}x${floorSize.toFixed(2)}`,
  );

  return floor;
}

export function applyTiledTexture(
  floorMesh: THREE.Mesh,
  onTextureLoaded?: (mesh: THREE.Mesh) => void,
): void {
  // Load tile texture from image
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    "/models/tile.png",
    (texture) => {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;

      // Calculate tile repetition based on floor size
      if (floorMesh.geometry instanceof THREE.PlaneGeometry) {
        const geometry = floorMesh.geometry;
        const scale = geometry.parameters.width || 1;

        // Number of tiles that should be visible
        const tilesX = scale / TILE_WORLD_SIZE;
        const tilesZ = scale / TILE_WORLD_SIZE;

        texture.repeat.set(tilesX, tilesZ);

        console.log(
          `[FloorUtils] Applied tiled texture: ${tilesX.toFixed(1)}x${tilesZ.toFixed(1)} tiles`,
        );
      }

      // Apply texture to material
      if (floorMesh.material instanceof THREE.MeshStandardMaterial) {
        floorMesh.material.map = texture;
        floorMesh.material.needsUpdate = true;
      }

      if (onTextureLoaded) {
        onTextureLoaded(floorMesh);
      }
    },
    undefined,
    (error) => {
      console.error("[FloorUtils] Error loading tile texture:", error);
    },
  );
}
