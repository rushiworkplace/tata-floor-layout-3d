import * as THREE from "three";

export interface CameraFrameResult {
  position: THREE.Vector3;
  target: THREE.Vector3;
}

export function frameCameraToBox(
  bbox: THREE.Box3,
  camera: THREE.PerspectiveCamera,
  paddingMultiplier: number = 1.3,
): CameraFrameResult {
  const center = bbox.getCenter(new THREE.Vector3());
  const size = bbox.getSize(new THREE.Vector3());
  const maxDimension = Math.max(size.x, size.y, size.z);

  if (maxDimension === 0) {
    return {
      position: new THREE.Vector3(0, 5, 10),
      target: new THREE.Vector3(0, 0, 0),
    };
  }

  const fov = THREE.MathUtils.degToRad(camera.fov / 2);
  const distance = (maxDimension / (2 * Math.tan(fov))) * paddingMultiplier;

  const position = center.clone();
  position.y += maxDimension * 0.6;
  position.z += distance;

  return {
    position,
    target: center,
  };
}
