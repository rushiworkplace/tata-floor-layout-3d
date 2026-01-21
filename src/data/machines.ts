import { MachineData } from "../types/MachineData";

export const machines: MachineData[] = [
  {
    id: "machine-1",
    name: "Assembly Robot",
    description:
      "Advanced robotic assembly system for precision manufacturing. Equipped with multi-axis arm and vision system.",
    position: [-8, 0, -10],
    modelPath: "/models/machine1.glb",
  },
  {
    id: "machine-2",
    name: "CNC Lathe",
    description:
      "Computer Numerical Control lathe for precision turning operations. Handles various materials and complex geometries.",
    position: [0, 0, 0],
    modelPath: "/models/machine2.glb",
  },
  {
    id: "machine-3",
    name: "Hydraulic Press",
    description:
      "Heavy-duty hydraulic press system with 500-ton capacity. Used for stamping and forming operations.",
    position: [8, 0, -10],
    modelPath: "/models/machine3.glb",
  },
];
