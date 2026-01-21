import * as THREE from "three";

export class Floor {
  mesh: THREE.Mesh;

  constructor(width: number = 50, height: number = 50) {
    const geometry = new THREE.PlaneGeometry(width, height);

    // Create a canvas texture for the floor with grid pattern
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;

    // Light gray background
    ctx.fillStyle = "#e8e8e8";
    ctx.fillRect(0, 0, 256, 256);

    // Grid lines
    ctx.strokeStyle = "#b0b0b0";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 256; i += 32) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(256, i);
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.repeat.set(width / 10, height / 10);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    const material = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.5,
      metalness: 0.0,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.mesh.position.y = 0;
  }

  getMesh(): THREE.Mesh {
    return this.mesh;
  }
}
