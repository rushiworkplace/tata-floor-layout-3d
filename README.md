# Tata Communications - Floor Layout 3D Visualization

A production-ready React + Three.js application for visualizing a floor layout with interactive 3D machines.

## Features

- **3D Floor Visualization**: Interactive floor layout with proper lighting and shadows
- **Machine Models**: Support for GLB 3D models with automatic fallback to geometry
- **Click-to-Select**: Raycasting-based selection system for machine interaction
- **Smooth Camera Animation**: GSAP-powered camera animations for seamless transitions
- **Info Panel**: Dynamic UI panel displaying machine information
- **Responsive Design**: Full responsive support for all screen sizes
- **Clean Architecture**: Modular, scalable codebase with separation of concerns

## Tech Stack

- **Vite**: Fast build tool and development server
- **React 18**: UI framework with TypeScript
- **Three.js**: 3D graphics library
- **GSAP**: Animation library for smooth camera movements
- **TypeScript**: Static type checking

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

The application will start at `http://localhost:5173`

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── core/                      # Core Three.js managers
│   ├── SceneManager.ts       # Scene setup and object management
│   ├── CameraManager.ts      # Camera control and animation
│   ├── Renderer.ts           # WebGL renderer setup
│   └── RaycasterManager.ts   # Click detection system
├── objects/                   # 3D object classes
│   ├── Floor.ts              # Floor plane geometry
│   ├── Machine.ts            # Individual machine class
│   └── MachineManager.ts     # Machine collection management
├── loaders/                   # Asset loaders
│   └── ModelLoader.ts        # GLB model loader
├── ui/                        # React components
│   └── InfoPanel.tsx         # Machine information display
├── types/                     # TypeScript interfaces
│   └── MachineData.ts        # Machine data structure
├── data/                      # Application data
│   └── machines.ts           # Machine definitions
├── App.tsx                    # Main React component
├── main.tsx                   # Application entry point
└── styles.css                 # Global styles
```

## Usage

### Adding New Machines

Edit `src/data/machines.ts` and add new machine entries:

```typescript
{
  id: 'machine-4',
  name: 'Your Machine',
  description: 'Machine description',
  position: [x, y, z],
  modelPath: '/models/your-model.glb'
}
```

### Adding 3D Models

Place GLB files in the `public/models/` directory. The application automatically loads models or falls back to procedural geometry if a model is missing.

## Features in Detail

### Scene Management

- Ambient and directional lighting with shadow support
- Neutral background for professional appearance
- Automatic light positioning for optimal visibility

### Machine Interaction

- Raycasting for precise click detection
- Automatic machine selection/deselection
- Smooth camera animation to selected machine
- Other machines fade out when one is selected

### Camera System

- Default bird's-eye view of the entire floor
- Smooth camera animation using GSAP
- Maintains proper look-at angles
- Configurable animation duration

### State Management

- React hooks for UI state only
- Three.js logic isolated from React
- Clean separation of concerns
- No external state management required

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- GPU-accelerated rendering with shadow mapping
- Efficient raycasting with optimized intersection detection
- Automatic window resize handling
- Memory-efficient object disposal

## License

© 2026 Tata Communications
