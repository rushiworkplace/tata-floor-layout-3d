# Scripts

## Overview

This directory contains utility scripts for the Tata Communications floor layout project.

## Available Scripts

### `generateModels.mjs`

Generates sample 3D models in GLB format for testing and development.

**Usage:**

```bash
node scripts/generateModels.mjs
# or
npm run generate-models
```

**What it does:**

- Creates three sample cube models (machine1.glb, machine2.glb, machine3.glb)
- Each model has a different color for identification (red, green, blue)
- Models are valid GLB files that can be loaded by Three.js
- Files are saved to `public/models/`

**Output:**

```
✓ Created machine1.glb
✓ Created machine2.glb
✓ Created machine3.glb

✓ All sample models created successfully!
```

## Extending Scripts

To add new model generation scripts:

1. Create a new `.mjs` file in this directory
2. Use ES modules syntax (`import`/`export`)
3. Add a corresponding npm script in `package.json`

## Model Generation Details

The `generateModels.mjs` script creates minimal GLB files containing:

- **Geometry:** Simple cube with 8 vertices and 36 indices
- **Materials:** PBR with metallic and roughness properties
- **Normals:** Calculated for proper lighting
- **Format:** Valid GLB 2.0 format compatible with Three.js

The generated models are small (~0.84 KB each) and serve as perfect placeholders for development and testing before integrating actual production models.
