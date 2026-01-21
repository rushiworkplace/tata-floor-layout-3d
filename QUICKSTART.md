# Quick Start Guide

## Project Setup

The Tata Communications Floor Layout 3D visualization project is fully configured and ready to run.

### Development

```bash
npm run dev
```

The application will start on `http://localhost:5173/`

### Production Build

```bash
npm run build
npm run preview
```

## File Structure

All files are organized according to the specification:

```
src/
├── core/
│   ├── SceneManager.ts      # Three.js scene management
│   ├── CameraManager.ts     # Camera control & GSAP animations
│   ├── Renderer.ts          # WebGL renderer
│   └── RaycasterManager.ts  # Click detection
├── objects/
│   ├── Floor.ts             # Floor plane
│   ├── Machine.ts           # Machine class
│   └── MachineManager.ts    # Machine collection
├── loaders/
│   └── ModelLoader.ts       # GLB loader
├── ui/
│   └── InfoPanel.tsx        # Info panel component
├── types/
│   └── MachineData.ts       # Type definitions
├── data/
│   └── machines.ts          # Machine data
├── App.tsx                  # Main component
├── main.tsx                 # Entry point
└── styles.css               # Styles
```

## Adding 3D Models

Place your GLB files in `public/models/` and reference them in `src/data/machines.ts`:

```typescript
{
  id: 'machine-x',
  name: 'Your Machine Name',
  description: 'Description here',
  position: [x, y, z],
  modelPath: '/models/your-model.glb'
}
```

If a model fails to load, the app automatically uses a colored box as fallback.

## Features Implemented

✅ Three.js 3D scene with proper lighting
✅ GLB model loader with fallback geometry
✅ Raycasting-based click detection
✅ GSAP camera animation
✅ Machine selection/deselection
✅ Info panel with machine details
✅ "Back to Floor View" button
✅ Responsive design
✅ TypeScript type safety
✅ Clean modular architecture
✅ No TODOs - fully production-ready

## Key Technologies

- **Vite**: Fast build tool
- **React**: UI framework
- **Three.js**: 3D graphics
- **GSAP**: Smooth animations
- **TypeScript**: Type safety

## Interaction

1. Click on any machine to zoom the camera
2. The selected machine is centered and other machines fade out
3. Info panel displays machine details
4. Click "Back to Floor View" to reset

## Notes

- The project builds without errors
- All dependencies are installed
- Development server runs on port 5173
- Production build outputs to `dist/`
- No external state management needed (React hooks only)
