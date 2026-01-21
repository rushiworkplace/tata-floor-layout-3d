# Shelf & Product System Documentation

## Overview

The application now features a realistic retail aisle system with two shelves facing each other. Each shelf contains multiple products that are automatically detected from the GLB model structure.

## Architecture

### Core Components

#### 1. Shelf.ts

Represents a single shelf unit with its collection of products.

**Responsibilities:**

- Store shelf position, rotation, and model
- Register products from traversal
- Manage product visibility
- Provide product metadata access

**Key Methods:**

- `setModel(model: THREE.Group)` - Attach loaded GLB model
- `registerProduct(meshId, productData, mesh)` - Register a product
- `showProduct(meshId)` - Show only one product
- `showAllProducts()` - Show all products on shelf
- `hide()` / `show()` - Toggle entire shelf visibility

#### 2. ShelfManager.ts

Manages loading, traversal, and product detection for all shelves.

**Responsibilities:**

- Load GLB models asynchronously
- Traverse scene graph and detect products
- Register products with raycaster system
- Handle selection/deselection logic
- Maintain selectable object map

**Key Methods:**

- `addShelf(config)` - Load and register a shelf
- `traverseAndRegisterProducts(shelf, model)` - Auto-detect products
- `selectProduct(shelfId, meshId)` - Select and highlight product
- `deselectProduct()` - Reset to aisle view
- `getSelectableObjects()` - Return all clickable meshes

### Data Types

#### ProductData

```typescript
interface ProductData {
  productId: string; // Unique product identifier
  productName: string; // Generated name
  description: string; // Auto-generated description
  shelfId: string; // Parent shelf ID
  meshId: string; // Internal mesh identifier
}
```

#### ShelfConfig

```typescript
interface ShelfConfig {
  id: string; // Shelf identifier
  position: [x, y, z]; // 3D position
  rotation: [x, y, z]; // Rotation in radians
  modelPath: string; // Path to GLB file
}
```

## Product Detection Logic

### Traversal Process

1. **Load GLB Model** - Use ModelLoader to load shelf.glb
2. **Scene Graph Traversal** - Recursively walk all nodes
3. **Mesh Detection** - Identify all THREE.Mesh objects with geometry
4. **Height Filtering** - Calculate bounding box height
5. **Classification**:
   - Height > 1.2m → Shelf structure (not selectable)
   - Height ≤ 1.2m → Product (selectable)
6. **Metadata Generation** - Auto-generate product info
7. **Registration** - Register with ShelfManager and raycaster

### Height-Based Filtering

The system uses bounding box height to distinguish between:

**Shelf Structure:**

- Vertical supports
- Shelving frames
- Large structural elements
- Height threshold: > 1.2 meters

**Products:**

- Individual items
- Small packages
- Display units
- Height threshold: ≤ 1.2 meters

## Aisle Configuration

### Shelf Positioning

**Shelf A (Left):**

- Position: (-2, 0, 0)
- Rotation: π/2 radians (90°) around Y-axis
- Faces right toward center

**Shelf B (Right):**

- Position: (+2, 0, 0)
- Rotation: -π/2 radians (-90°) around Y-axis
- Faces left toward center

**Walking Space:**

- Central aisle: 4 meters wide between shelves
- Clear line of sight for products
- Comfortable camera navigation

## Interaction Flow

### 1. Click on Product

```
User clicks → Raycaster detects mesh → ShelfManager identifies product
→ Camera animates to product → Other shelf hides → Other products hide
→ ProductData displayed in UI panel
```

### 2. Camera Animation

Uses GSAP for smooth movement:

- Calculate product bounding box
- Position camera based on mesh size
- Maintain safe viewing distance (1.5x size)
- Orient camera toward product

### 3. Product Selection

```
selectProduct(shelfId, meshId)
├─ Get product data
├─ Hide other shelf
├─ Show only selected product
├─ Store in React state
└─ Update UI panel
```

### 4. Back to Aisle

```
deselectProduct()
├─ Reset camera to default
├─ Show both shelves
├─ Show all products
├─ Clear selection state
└─ Update UI panel
```

## Auto-Generated Metadata

Products are automatically named using index-based logic:

```typescript
{
  productId: 'shelf-a_product_0',
  productName: 'Product 1',
  description: 'Auto-generated product from shelf shelf-a',
  shelfId: 'shelf-a',
  meshId: 'shelf-a_mesh_0'
}
```

Pattern: `shelf-{id}_product_{index}`

## Performance Considerations

### Optimization Techniques

1. **Mesh Reuse:**
   - Shared materials where possible
   - No unnecessary geometry cloning

2. **Frustum Culling:**
   - Hidden shelf culled from rendering
   - Hidden products invisible

3. **Raycaster Efficiency:**
   - Only selectable meshes in raycaster
   - Early exit on intersection

4. **Memory Management:**
   - Proper disposal on unmount
   - Clear references on deselection

### Expected Performance

- **Load Time:** ~2-3 seconds (GLB parsing, traversal)
- **Frame Rate:** 60 FPS (smooth animations)
- **Memory:** ~150-200MB (two shelves + models)
- **Products:** ~40-100 per shelf typical

## Camera Positioning Strategy

### Product View Camera

```typescript
// Calculate camera distance based on product size
const maxDim = max(bbox.width, bbox.height, bbox.depth);
const fov = camera.fov in radians;
const distance = (maxDim / 2 / tan(fov / 2)) * 1.5;

// Position camera in front of product
camera.position = product.position + direction * distance;
camera.position.y += maxDim * 0.3; // Slight elevation
```

### Default Aisle View

```typescript
// Bird's eye view of entire aisle
camera.position = (0, 15, 25);
camera.lookAt = (0, 0, 0);
```

## UI Integration

### InfoPanel Display

**Product View:**

- Product Icon: 📦
- Product Name
- Product ID
- Shelf ID
- Description
- "Back to Aisle View" button

**Aisle View:**

- Empty state (no panel)
- Ready for product selection

## Integration with Existing Code

### Preserved Components

- `SceneManager` - Scene setup unchanged
- `CameraManager` - Extended with `animateToProduct()`
- `Renderer` - No changes
- `RaycasterManager` - No changes
- `Floor` - Renders aisle base

### Modified Components

- `App.tsx` - Switched to ShelfManager
- `InfoPanel.tsx` - Product data support
- `styles.css` - Product-specific styling

### New Components

- `Shelf.ts` - Shelf class
- `ShelfManager.ts` - Shelf manager
- `ProductData.ts` - Type definitions
- `ShelfConfig.ts` - Configuration type
- `shelves.ts` - Aisle configuration

## Data Flow

```
shelves.ts (config)
    ↓
App.tsx (init)
    ↓
ShelfManager.addShelf()
    ↓
ModelLoader.load() → shelf.glb
    ↓
ShelfManager.traverseAndRegisterProducts()
    ↓
Shelf.registerProduct() → ProductData
    ↓
RaycasterManager + UI
```

## Future Enhancements

- [ ] Multiple aisles
- [ ] Stock counts
- [ ] Price information
- [ ] Barcode scanning
- [ ] Shelf analytics
- [ ] Dynamic product updates
- [ ] Custom product icons
- [ ] Accessibility labels
