import * as THREE from "three";

export class RaycasterManager {
  raycaster: THREE.Raycaster;
  mouse: THREE.Vector2;

  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
  }

  setMousePosition(event: MouseEvent, width: number, height: number): void {
    this.mouse.x = (event.clientX / width) * 2 - 1;
    this.mouse.y = -(event.clientY / height) * 2 + 1;
  }

  getIntersects(
    objects: THREE.Object3D[],
    camera: THREE.Camera,
  ): THREE.Intersection[] {
    this.raycaster.setFromCamera(this.mouse, camera);

    const intersects = this.raycaster.intersectObjects(objects, true);

    if (intersects.length > 0) {
      const hit = intersects[0].object as THREE.Mesh;
      console.log(
        "[RaycasterManager] Hit mesh:",
        hit.name,
        "| userData type:",
        hit.userData?.type,
        "| parent:",
        hit.parent?.name,
      );
    } else {
      console.log("[RaycasterManager] No intersections");
    }

    return intersects;
  }
}
