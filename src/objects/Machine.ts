import * as THREE from "three";
import { MachineData } from "../types/MachineData";

export class Machine {
  id: string;
  name: string;
  description: string;
  position: THREE.Vector3;
  modelPath: string;
  group: THREE.Group;
  model: THREE.Object3D | null;

  constructor(data: MachineData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.position = new THREE.Vector3(...data.position);
    this.modelPath = data.modelPath;
    this.group = new THREE.Group();
    this.group.position.copy(this.position);
    this.model = null;
  }

  setModel(model: THREE.Object3D): void {
    if (this.model) {
      this.group.remove(this.model);
    }
    this.model = model;
    this.group.add(model);
  }

  createFallbackModel(): void {
    const geometry = new THREE.BoxGeometry(2, 3, 2);
    const material = new THREE.MeshStandardMaterial({
      color: Math.random() * 0xffffff,
      roughness: 0.5,
      metalness: 0.5,
    });
    const box = new THREE.Mesh(geometry, material);
    box.castShadow = true;
    box.receiveShadow = true;
    this.setModel(box);
  }

  getGroup(): THREE.Group {
    return this.group;
  }

  show(): void {
    this.group.visible = true;
  }

  hide(): void {
    this.group.visible = false;
  }

  dispose(): void {
    this.group.clear();
    this.model = null;
  }
}
