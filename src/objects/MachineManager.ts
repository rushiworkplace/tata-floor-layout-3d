import * as THREE from "three";
import { Machine } from "./Machine";
import { MachineData } from "../types/MachineData";
import { ModelLoader } from "../loaders/ModelLoader";

export class MachineManager {
  machines: Map<string, Machine>;
  selectedMachineId: string | null;
  modelLoader: ModelLoader;

  constructor() {
    this.machines = new Map();
    this.selectedMachineId = null;
    this.modelLoader = new ModelLoader();
  }

  async addMachine(data: MachineData): Promise<Machine> {
    const machine = new Machine(data);

    try {
      const model = await this.modelLoader.load(data.modelPath);
      machine.setModel(model);
    } catch {
      machine.createFallbackModel();
    }

    this.machines.set(machine.id, machine);
    return machine;
  }

  getMachine(id: string): Machine | undefined {
    return this.machines.get(id);
  }

  selectMachine(id: string): void {
    this.selectedMachineId = id;

    this.machines.forEach((machine) => {
      if (machine.id === id) {
        machine.show();
      } else {
        machine.hide();
      }
    });
  }

  deselectMachine(): void {
    this.selectedMachineId = null;

    this.machines.forEach((machine) => {
      machine.show();
    });
  }

  getAllMachines(): Machine[] {
    return Array.from(this.machines.values());
  }

  getSelectableObjects(): THREE.Object3D[] {
    return Array.from(this.machines.values()).map((m) => m.getGroup());
  }

  getMachineByGroup(group: THREE.Group): Machine | undefined {
    for (const machine of this.machines.values()) {
      if (
        machine.getGroup() === group ||
        machine.getGroup().children.includes(group as any)
      ) {
        return machine;
      }
    }
    return undefined;
  }

  dispose(): void {
    this.machines.forEach((machine) => {
      machine.dispose();
    });
    this.machines.clear();
  }
}
