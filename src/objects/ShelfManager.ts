import * as THREE from "three";
import { Shelf } from "./Shelf";
import { ProductData } from "../types/ProductData";
import { ShelfConfig } from "../types/ShelfConfig";
import { ModelLoader } from "../loaders/ModelLoader";

export class ShelfManager {
  shelves: Map<string, Shelf>;
  selectedProduct: { shelfId: string; meshId: string } | null;
  modelLoader: ModelLoader;
  selectableObjects: Map<THREE.Mesh, { shelfId: string; meshId: string }>;
  private productIndex: Map<string, number>;

  constructor() {
    this.shelves = new Map();
    this.selectedProduct = null;
    this.modelLoader = new ModelLoader();
    this.selectableObjects = new Map();
    this.productIndex = new Map();
  }

  async addShelf(config: ShelfConfig): Promise<Shelf> {
    const shelf = new Shelf(
      config.id,
      config.position,
      config.rotation,
      config.modelPath,
    );

    try {
      console.log(`Loading shelf: ${config.id} from ${config.modelPath}`);
      const model = await this.modelLoader.load(config.modelPath);
      console.log(
        `Loaded model for ${config.id}, model has`,
        model.children.length,
        "children",
      );
      shelf.setModel(model);
      this.traverseAndRegisterProducts(shelf, model);
      console.log(
        `Registered products for ${config.id}:`,
        this.productIndex.get(config.id) || 0,
      );
    } catch (error) {
      console.error(`Failed to load shelf model: ${config.modelPath}`, error);
    }

    this.shelves.set(shelf.id, shelf);
    return shelf;
  }

  private traverseAndRegisterProducts(shelf: Shelf, model: THREE.Group): void {
    const productIndexKey = shelf.id;
    let productCounter = 0;
    let meshCount = 0;
    const meshNames: string[] = [];
    const skippedMeshes: string[] = [];

    const genericKeywords = ["frame", "rack", "support", "shelf"];

    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.geometry) {
        meshCount++;
        const meshNameOrEmpty = child.name || "unnamed";
        meshNames.push(meshNameOrEmpty);

        // Skip completely unnamed meshes
        if (!child.name || child.name.trim().length === 0) {
          skippedMeshes.push(`${meshNameOrEmpty} (no name)`);
          return;
        }

        const meshName = child.name.trim();

        // Skip very short names
        if (meshName.length <= 2) {
          skippedMeshes.push(`${meshName} (too short)`);
          return;
        }

        // Skip generic structural meshes
        const lowerName = meshName.toLowerCase();
        const isGeneric = genericKeywords.some((keyword) =>
          lowerName.includes(keyword),
        );

        if (isGeneric) {
          skippedMeshes.push(`${meshName} (generic)`);
          return;
        }

        // Register ALL valid meshes as products (no height filtering)
        const meshId = `${shelf.id}_product_${productCounter}`;
        const productId = meshName
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^a-z0-9_]/g, "");

        const productData: ProductData = {
          productId: productId,
          productName: meshName,
          description: `${meshName} product`,
          shelfId: shelf.id,
          meshId: meshId,
        };

        child.userData = {
          type: "product",
          productId: productId,
          productName: meshName,
          description: `${meshName} product`,
          shelfId: shelf.id,
        };

        shelf.registerProduct(meshId, productData, child);
        this.selectableObjects.set(child, {
          shelfId: shelf.id,
          meshId: meshId,
        });
        console.log(
          `[ShelfManager] Registered product ${productCounter + 1}: "${meshName}"`,
        );
        productCounter++;
      }
    });

    console.log(
      `[ShelfManager] Shelf ${shelf.id}: found ${meshCount} total meshes`,
    );
    console.log(`[ShelfManager] All meshes: [${meshNames.join(", ")}]`);
    console.log(`[ShelfManager] Skipped meshes: [${skippedMeshes.join(", ")}]`);
    console.log(
      `[ShelfManager] Registered ${productCounter} products as selectable`,
    );
    this.productIndex.set(productIndexKey, productCounter);
  }

  selectProduct(shelfId: string, meshId: string): ProductData | null {
    const shelf = this.shelves.get(shelfId);
    if (!shelf) return null;

    const product = shelf.getProduct(meshId);
    if (!product) return null;

    this.selectedProduct = { shelfId, meshId };

    this.shelves.forEach((s) => {
      if (s.id === shelfId) {
        s.showProduct(meshId);
      } else {
        s.hide();
      }
    });

    return product;
  }

  deselectProduct(): void {
    this.selectedProduct = null;

    this.shelves.forEach((shelf) => {
      shelf.show();
      shelf.showAllProducts();
    });
  }

  getShelf(id: string): Shelf | undefined {
    return this.shelves.get(id);
  }

  getAllShelves(): Shelf[] {
    return Array.from(this.shelves.values());
  }

  getShelfGroups(): THREE.Group[] {
    return Array.from(this.shelves.values()).map((shelf) => shelf.getGroup());
  }

  getSelectableObjects(): THREE.Mesh[] {
    return Array.from(this.selectableObjects.keys());
  }

  getProductByMesh(
    mesh: THREE.Mesh,
  ): { shelfId: string; meshId: string } | undefined {
    // First try direct lookup
    let info = this.selectableObjects.get(mesh);

    if (!info && mesh.userData?.type === "product") {
      // Fallback: reconstruct from userData
      const shelfId = mesh.userData.shelfId;
      const shelf = this.shelves.get(shelfId);

      if (shelf) {
        // Find the actual meshId in the shelf
        const allProducts = shelf.getAllProducts();
        const product = allProducts.find(
          (p) => p.productName === mesh.userData.productName,
        );

        if (product) {
          return {
            shelfId: shelfId,
            meshId: product.meshId,
          };
        }
      }
    }

    return info;
  }

  getProductData(shelfId: string, meshId: string): ProductData | null {
    const shelf = this.shelves.get(shelfId);
    if (!shelf) return null;
    return shelf.getProduct(meshId) || null;
  }

  getAisleBoundingBox(): THREE.Box3 {
    const bbox = new THREE.Box3();
    this.shelves.forEach((shelf) => {
      const group = shelf.getGroup();
      bbox.expandByObject(group);
    });
    return bbox;
  }

  dispose(): void {
    this.shelves.forEach((shelf) => {
      shelf.dispose();
    });
    this.shelves.clear();
    this.selectableObjects.clear();
  }
}
