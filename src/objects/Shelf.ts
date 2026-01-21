import * as THREE from "three";
import { ProductData } from "../types/ProductData";

export class Shelf {
  id: string;
  group: THREE.Group;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  modelPath: string;
  model: THREE.Group | null;
  products: Map<string, ProductData>;
  productMeshes: Map<string, THREE.Mesh>;

  constructor(
    id: string,
    position: [number, number, number],
    rotation: [number, number, number],
    modelPath: string,
  ) {
    this.id = id;
    this.position = new THREE.Vector3(...position);
    this.rotation = new THREE.Euler(rotation[0], rotation[1], rotation[2]);
    this.modelPath = modelPath;
    this.group = new THREE.Group();
    this.group.position.copy(this.position);
    this.group.rotation.copy(this.rotation);
    this.model = null;
    this.products = new Map();
    this.productMeshes = new Map();
  }

  setModel(model: THREE.Group): void {
    if (this.model) {
      this.group.remove(this.model);
    }
    this.model = model;
    this.group.add(model);

    // Ensure all meshes in the model are visible by default
    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.visible = true;
      }
    });
  }

  getGroup(): THREE.Group {
    return this.group;
  }

  registerProduct(
    meshId: string,
    productData: ProductData,
    mesh: THREE.Mesh,
  ): void {
    this.products.set(meshId, productData);
    this.productMeshes.set(meshId, mesh);
  }

  getProduct(meshId: string): ProductData | undefined {
    return this.products.get(meshId);
  }

  getProductMesh(meshId: string): THREE.Mesh | undefined {
    return this.productMeshes.get(meshId);
  }

  getAllProducts(): ProductData[] {
    return Array.from(this.products.values());
  }

  getAllProductMeshes(): THREE.Mesh[] {
    return Array.from(this.productMeshes.values());
  }

  show(): void {
    this.group.visible = true;
  }

  hide(): void {
    this.group.visible = false;
  }

  showProduct(meshId: string): void {
    // Hide all products by default
    this.productMeshes.forEach((mesh) => {
      mesh.visible = false;
    });

    // Show only the selected product
    const selectedMesh = this.productMeshes.get(meshId);
    if (selectedMesh) {
      selectedMesh.visible = true;
    }
  }

  showAllProducts(): void {
    this.productMeshes.forEach((mesh) => {
      mesh.visible = true;
    });
  }

  dispose(): void {
    this.group.clear();
    this.model = null;
    this.products.clear();
    this.productMeshes.clear();
  }
}
