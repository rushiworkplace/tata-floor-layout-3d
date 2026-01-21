import * as THREE from "three";

/**
 * Forbidden keywords that indicate non-selectable/non-product meshes
 */
const FORBIDDEN_KEYWORDS = ["material", "mat", "helper", "floor", "collision"];

/**
 * Checks if a mesh is selectable for product focus
 * Filters out materials, helpers, floors, and other non-interactive geometry
 *
 * @param mesh - The mesh to check
 * @returns true if mesh is selectable as a product
 */
export function isSelectable(
  mesh: THREE.Object3D | null | undefined,
): mesh is THREE.Mesh {
  if (!mesh) {
    return false;
  }

  if (!(mesh instanceof THREE.Mesh)) {
    return false;
  }

  // Must be visible
  if (!mesh.visible) {
    return false;
  }

  // Must have a name
  if (!mesh.name || mesh.name.trim() === "") {
    return false;
  }

  // Check for forbidden keywords (case-insensitive)
  const nameLower = mesh.name.toLowerCase();
  for (const keyword of FORBIDDEN_KEYWORDS) {
    if (nameLower.includes(keyword)) {
      console.log(
        `[MeshFilter] Ignoring non-selectable mesh: "${mesh.name}" (contains "${keyword}")`,
      );
      return false;
    }
  }

  return true;
}

/**
 * Validates that a clicked mesh actually represents a product
 * Walks up parent chain and checks selectability
 *
 * @param mesh - The initial clicked mesh
 * @returns The product mesh or null if not selectable
 */
export function findSelectableProductMesh(
  mesh: THREE.Object3D | null | undefined,
): THREE.Mesh | null {
  if (!mesh) return null;

  let current = mesh as THREE.Object3D | null;
  let depth = 0;
  const maxDepth = 10; // Prevent infinite loops

  while (current && depth < maxDepth) {
    if (current instanceof THREE.Mesh && isSelectable(current)) {
      console.log(
        `[MeshFilter] Found selectable product mesh: "${current.name}" at depth ${depth}`,
      );
      return current;
    }

    current = current.parent;
    depth++;
  }

  console.log(
    `[MeshFilter] No selectable product mesh found in parent chain (checked ${depth} levels)`,
  );
  return null;
}
