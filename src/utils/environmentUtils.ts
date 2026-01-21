import * as THREE from "three";

export function setupSupermarketEnvironment(scene: THREE.Scene): void {
  // Load environment map from image
  const textureLoader = new THREE.TextureLoader();
  textureLoader.load(
    "/models/env.jpg",
    (texture) => {
      // Apply as environment map for realistic lighting
      scene.environment = texture;
      scene.background = texture;

      console.log("[EnvironmentUtils] Environment map applied from env.jpg");
    },
    undefined,
    (error) => {
      console.error("[EnvironmentUtils] Error loading environment map:", error);
      // Fallback to solid color if load fails
      scene.background = new THREE.Color(0xccccdd);
    },
  );
}

export function addAmbientLighting(scene: THREE.Scene): void {
  // Remove any existing ambient lights to avoid stacking
  scene.children = scene.children.filter(
    (child) => !(child instanceof THREE.Light && child.type === "AmbientLight"),
  );

  // Supermarket-style lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  console.log("[EnvironmentUtils] Ambient lighting configured");
}
