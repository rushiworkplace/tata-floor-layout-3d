import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createMinimalGLB(filename, color) {
  // Create a minimal GLB file with a simple cube

  // Cube vertices (8 vertices)
  const vertices = new Float32Array([
    -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
    -1, 1, 1,
  ]);

  // Cube indices (36 indices for 12 triangles = 6 faces)
  const indices = new Uint16Array([
    0,
    1,
    2,
    2,
    3,
    0, // back
    4,
    6,
    5,
    4,
    7,
    6, // front
    0,
    3,
    7,
    0,
    7,
    4, // left
    1,
    5,
    6,
    1,
    6,
    2, // right
    3,
    2,
    6,
    3,
    6,
    7, // top
    0,
    4,
    5,
    0,
    5,
    1, // bottom
  ]);

  // Normals (per vertex)
  const normals = new Float32Array([
    -0.577, -0.577, -0.577, 0.577, -0.577, -0.577, 0.577, 0.577, -0.577, -0.577,
    0.577, -0.577, -0.577, -0.577, 0.577, 0.577, -0.577, 0.577, 0.577, 0.577,
    0.577, -0.577, 0.577, 0.577,
  ]);

  // Create binary buffer (vertices + normals + indices)
  const vertexBuffer = Buffer.from(vertices);
  const normalBuffer = Buffer.from(normals);
  const indexBuffer = Buffer.from(indices);

  const binaryData = Buffer.concat([vertexBuffer, normalBuffer, indexBuffer]);

  // Create glTF JSON structure
  const gltf = {
    asset: { version: "2.0", generator: "Tata-Model-Generator" },
    scene: 0,
    scenes: [{ nodes: [0] }],
    nodes: [{ mesh: 0 }],
    meshes: [
      {
        primitives: [
          {
            attributes: { POSITION: 0, NORMAL: 1 },
            indices: 2,
            material: 0,
          },
        ],
      },
    ],
    materials: [
      {
        pbrMetallicRoughness: {
          baseColorFactor: color,
          metallicFactor: 0.5,
          roughnessFactor: 0.5,
        },
      },
    ],
    accessors: [
      {
        bufferView: 0,
        componentType: 5126,
        count: 8,
        type: "VEC3",
        min: [-1, -1, -1],
        max: [1, 1, 1],
      },
      {
        bufferView: 1,
        componentType: 5126,
        count: 8,
        type: "VEC3",
      },
      {
        bufferView: 2,
        componentType: 5125,
        count: 36,
        type: "SCALAR",
      },
    ],
    bufferViews: [
      { buffer: 0, byteOffset: 0, byteLength: vertexBuffer.length },
      {
        buffer: 0,
        byteOffset: vertexBuffer.length,
        byteLength: normalBuffer.length,
      },
      {
        buffer: 0,
        byteOffset: vertexBuffer.length + normalBuffer.length,
        byteLength: indexBuffer.length,
      },
    ],
    buffers: [{ byteLength: binaryData.length }],
  };

  const jsonString = JSON.stringify(gltf);
  const jsonBuffer = Buffer.from(jsonString);

  // Pad JSON to 4-byte boundary
  const jsonPadding = 4 - (jsonBuffer.length % 4);
  const paddedJson = Buffer.alloc(
    jsonBuffer.length + (jsonPadding === 4 ? 0 : jsonPadding),
    jsonBuffer,
  );

  // Create GLB header
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0); // "glTF"
  header.writeUInt32LE(2, 4); // version 2
  const totalSize = 12 + 8 + paddedJson.length + 8 + binaryData.length;
  header.writeUInt32LE(totalSize, 8);

  // Create JSON chunk header
  const jsonChunkHeader = Buffer.alloc(8);
  jsonChunkHeader.writeUInt32LE(paddedJson.length, 0);
  jsonChunkHeader.writeUInt32LE(0x4e4f534a, 4); // "JSON"

  // Create binary chunk header
  const binaryChunkHeader = Buffer.alloc(8);
  binaryChunkHeader.writeUInt32LE(binaryData.length, 0);
  binaryChunkHeader.writeUInt32LE(0x004e4942, 4); // "BIN\0"

  // Combine all parts
  const glb = Buffer.concat([
    header,
    jsonChunkHeader,
    paddedJson,
    binaryChunkHeader,
    binaryData,
  ]);

  // Write to file
  const filepath = path.join(__dirname, "..", "public", "models", filename);
  fs.writeFileSync(filepath, glb);
  console.log(`✓ Created ${filename}`);
}

// Generate three sample models with different colors
createMinimalGLB("machine1.glb", [0.8, 0.2, 0.2, 1.0]); // Red
createMinimalGLB("machine2.glb", [0.2, 0.8, 0.2, 1.0]); // Green
createMinimalGLB("machine3.glb", [0.2, 0.2, 0.8, 1.0]); // Blue

console.log("\n✓ All sample models created successfully!");
