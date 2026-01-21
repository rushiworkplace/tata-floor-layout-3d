import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class ModelLoader {
  loader: GLTFLoader;

  constructor() {
    this.loader = new GLTFLoader();
  }

  load(path: string): Promise<THREE.Group> {
    return new Promise((resolve, reject) => {
      console.log(`[ModelLoader] Loading model from: ${path}`);
      this.loader.load(
        path,
        (gltf) => {
          const model = gltf.scene;
          console.log(
            `[ModelLoader] Model loaded, scene has ${model.children.length} children`,
          );
          console.log(`[ModelLoader] Scene bounds:`, model);

          model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              console.log(
                `[ModelLoader] Found mesh: ${child.name}, visible: ${child.visible}`,
              );
            }
          });
          resolve(model);
        },
        (progress) => {
          console.log(
            `[ModelLoader] Loading ${path}: ${Math.round((progress.loaded / progress.total) * 100)}%`,
          );
        },
        (error) => {
          console.error(`[ModelLoader] Failed to load ${path}:`, error);
          reject(error);
        },
      );
    });
  }
}
