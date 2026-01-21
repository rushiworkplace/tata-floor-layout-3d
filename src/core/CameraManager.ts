import * as THREE from "three";
import gsap from "gsap";
import { frameCameraToBox } from "../utils/frameCameraToBox";

export class CameraManager {
  camera: THREE.PerspectiveCamera;
  targetPosition: THREE.Vector3;
  targetLookAt: THREE.Vector3;
  defaultPosition: THREE.Vector3;
  defaultLookAt: THREE.Vector3;
  orbitControls: any;
  isAnimating: boolean = false;

  constructor(width: number, height: number) {
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

    this.defaultPosition = new THREE.Vector3(0, 0, 0);
    this.defaultLookAt = new THREE.Vector3(0, 0, 0);

    this.targetPosition = this.defaultPosition.clone();
    this.targetLookAt = this.defaultLookAt.clone();

    this.camera.position.copy(this.defaultPosition);
    this.camera.lookAt(this.defaultLookAt);
  }

  animateToProduct(mesh: THREE.Mesh, duration: number = 1.5): Promise<void> {
    return new Promise((resolve) => {
      this.isAnimating = true;

      // Disable controls during animation to prevent conflicts
      if (this.orbitControls) {
        this.orbitControls.enabled = false;
      }

      const bbox = new THREE.Box3().setFromObject(mesh);
      const frameResult = frameCameraToBox(bbox, this.camera, 1.5);

      const startPos = this.camera.position.clone();
      const startTarget = this.orbitControls
        ? this.orbitControls.target.clone()
        : this.targetLookAt.clone();

      const animState = { t: 0 };

      gsap.to(animState, {
        t: 1,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          // Animate camera position
          const newPos = startPos.clone();
          newPos.lerp(frameResult.position, animState.t);
          this.camera.position.copy(newPos);

          // Animate controls target (if using OrbitControls)
          if (this.orbitControls) {
            const newTarget = startTarget.clone();
            newTarget.lerp(frameResult.target, animState.t);
            this.orbitControls.target.copy(newTarget);
            this.orbitControls.update();
          } else {
            // Fallback: manual lookAt if not using controls
            const newTarget = startTarget.clone();
            newTarget.lerp(frameResult.target, animState.t);
            this.camera.lookAt(newTarget);
          }
        },
        onComplete: () => {
          // Set final exact values
          this.camera.position.copy(frameResult.position);
          this.targetPosition = frameResult.position.clone();
          this.targetLookAt = frameResult.target.clone();

          // Finalize controls
          if (this.orbitControls) {
            this.orbitControls.target.copy(frameResult.target);
            this.orbitControls.update();
            this.orbitControls.enabled = true;
          } else {
            this.camera.lookAt(frameResult.target);
          }

          this.isAnimating = false;
          resolve();
        },
      });
    });
  }

  setDefaultAisleView(bbox: THREE.Box3): void {
    const frameResult = frameCameraToBox(bbox, this.camera, 1.3);
    this.defaultPosition = frameResult.position.clone();
    this.defaultLookAt = frameResult.target.clone();

    console.log(
      "[CameraManager] setDefaultAisleView - position:",
      this.defaultPosition,
    );
    console.log(
      "[CameraManager] setDefaultAisleView - lookAt:",
      this.defaultLookAt,
    );

    this.camera.position.copy(this.defaultPosition);
    this.camera.lookAt(this.defaultLookAt);

    if (this.orbitControls) {
      this.orbitControls.target.copy(this.defaultLookAt);
      this.orbitControls.update();
    }
  }

  resetCamera(duration: number = 1.5): Promise<void> {
    return new Promise((resolve) => {
      this.isAnimating = true;

      // Disable controls during animation to prevent conflicts
      if (this.orbitControls) {
        this.orbitControls.enabled = false;
      }

      const startPos = this.camera.position.clone();
      const startTarget = this.orbitControls
        ? this.orbitControls.target.clone()
        : this.targetLookAt.clone();

      const animState = { t: 0 };

      gsap.to(animState, {
        t: 1,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          // Animate camera position
          const newPos = startPos.clone();
          newPos.lerp(this.defaultPosition, animState.t);
          this.camera.position.copy(newPos);

          // Animate controls target (if using OrbitControls)
          if (this.orbitControls) {
            const newTarget = startTarget.clone();
            newTarget.lerp(this.defaultLookAt, animState.t);
            this.orbitControls.target.copy(newTarget);
            this.orbitControls.update();
          } else {
            // Fallback: manual lookAt if not using controls
            const newTarget = startTarget.clone();
            newTarget.lerp(this.defaultLookAt, animState.t);
            this.camera.lookAt(newTarget);
          }
        },
        onComplete: () => {
          // Set final exact values
          this.camera.position.copy(this.defaultPosition);
          this.targetPosition = this.defaultPosition.clone();
          this.targetLookAt = this.defaultLookAt.clone();

          // Finalize controls
          if (this.orbitControls) {
            this.orbitControls.target.copy(this.defaultLookAt);
            this.orbitControls.update();
            this.orbitControls.enabled = true;
          } else {
            this.camera.lookAt(this.defaultLookAt);
          }

          this.isAnimating = false;
          resolve();
        },
      });
    });
  }

  onWindowResize(width: number, height: number): void {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  async initOrbitControls(
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ): Promise<void> {
    // Dynamically import OrbitControls
    const { OrbitControls } =
      await import("three/examples/jsm/controls/OrbitControls.js");

    this.orbitControls = new OrbitControls(camera, renderer.domElement);
    this.orbitControls.target.set(0, 2, 0);
    this.orbitControls.enableDamping = true;
    this.orbitControls.dampingFactor = 0.05;
    this.orbitControls.autoRotate = false;
    this.orbitControls.autoRotateSpeed = 0;
    this.orbitControls.enableZoom = true;
    this.orbitControls.zoomSpeed = 1.2;
    this.orbitControls.enablePan = true;
    this.orbitControls.panSpeed = 0.5;
    this.orbitControls.minDistance = 3;
    this.orbitControls.maxDistance = 50;
    this.orbitControls.update();
  }

  updateOrbitControls(): void {
    if (this.orbitControls && !this.isAnimating) {
      this.orbitControls.update();
    }
  }

  disableOrbitControls(): void {
    if (this.orbitControls) {
      this.orbitControls.enabled = false;
    }
  }

  enableOrbitControls(): void {
    if (this.orbitControls) {
      this.orbitControls.enabled = true;
    }
  }
}
