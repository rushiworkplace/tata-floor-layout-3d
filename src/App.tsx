import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { SceneManager } from './core/SceneManager'
import { CameraManager } from './core/CameraManager'
import { Renderer } from './core/Renderer'
import { RaycasterManager } from './core/RaycasterManager'
import { Floor } from './objects/Floor'
import { ShelfManager } from './objects/ShelfManager'
import { shelves } from './data/shelves'
import { ProductData } from './types/ProductData'
import { InfoPanel } from './ui/InfoPanel'
import { createDynamicFloor, applyTiledTexture } from './utils/floorUtils'
import { setupSupermarketEnvironment, addAmbientLighting } from './utils/environmentUtils'

export default function App() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null)
    const [isAnimating, setIsAnimating] = useState(false)

    const sceneRef = useRef<SceneManager | null>(null)
    const cameraRef = useRef<CameraManager | null>(null)
    const rendererRef = useRef<Renderer | null>(null)
    const raycasterRef = useRef<RaycasterManager | null>(null)
    const shelfManagerRef = useRef<ShelfManager | null>(null)
    const animationIdRef = useRef<number | null>(null)

    useEffect(() => {
        if (!canvasRef.current) return

        const width = window.innerWidth
        const height = window.innerHeight

        sceneRef.current = new SceneManager()
        cameraRef.current = new CameraManager(width, height)
        rendererRef.current = new Renderer(canvasRef.current)
        raycasterRef.current = new RaycasterManager()
        shelfManagerRef.current = new ShelfManager()

        // Setup supermarket environment
        if (sceneRef.current) {
            setupSupermarketEnvironment(sceneRef.current.scene)
            addAmbientLighting(sceneRef.current.scene)
        }

        // Initialize orbit controls
        if (cameraRef.current && rendererRef.current) {
            cameraRef.current.initOrbitControls(cameraRef.current.camera, rendererRef.current.renderer)
        }

        const floor = new Floor()
        sceneRef.current.addObject(floor.getMesh())

        let setupComplete = false
        let shelvesLoaded = 0

        const setupShelves = async () => {
            if (shelfManagerRef.current) {
                for (const shelfConfig of shelves) {
                    await shelfManagerRef.current.addShelf(shelfConfig)
                    shelvesLoaded++
                }
            }
        }

        setupShelves().then(() => {
            if (shelfManagerRef.current && sceneRef.current && cameraRef.current) {
                const shelvesList = shelfManagerRef.current.getAllShelves()
                console.log("Shelves loaded:", shelvesList.length)

                shelvesList.forEach((shelf) => {
                    const shelfGroup = shelf.getGroup()
                    shelfGroup.visible = true
                    console.log(`Adding shelf group: ${shelf.id}, visible: ${shelfGroup.visible}, children: ${shelfGroup.children.length}`)
                    sceneRef.current!.addObject(shelfGroup)
                })

                // Create dynamic floor based on model bounding box
                const shelvesList_raw = shelfManagerRef.current.getAllShelves()
                if (shelvesList_raw.length > 0) {
                    const firstShelfGroup = shelvesList_raw[0].getGroup()
                    const dynamicFloor = createDynamicFloor(firstShelfGroup)
                    applyTiledTexture(dynamicFloor)
                    sceneRef.current.addObject(dynamicFloor)
                    console.log("Dynamic floor created and added to scene")
                }

                const aisleBbox = shelfManagerRef.current.getAisleBoundingBox()
                const bboxSize = aisleBbox.getSize(new THREE.Vector3())
                const bboxCenter = aisleBbox.getCenter(new THREE.Vector3())
                console.log("Aisle bbox size:", bboxSize)
                console.log("Aisle bbox center:", bboxCenter)
                console.log("Aisle bbox min:", aisleBbox.min)
                console.log("Aisle bbox max:", aisleBbox.max)
                console.log("Camera before framing:", cameraRef.current.camera.position)

                if (bboxSize.length() > 0) {
                    cameraRef.current.setDefaultAisleView(aisleBbox)
                    console.log("Camera after framing:", cameraRef.current.camera.position)
                } else {
                    console.warn("Empty bounding box, using default camera position")
                    cameraRef.current.camera.position.set(0, 5, 15)
                    cameraRef.current.camera.lookAt(0, 0, 0)
                    console.log("Set fallback camera position:", cameraRef.current.camera.position)
                }
            }
            setupComplete = true
        })

        const animate = () => {
            animationIdRef.current = requestAnimationFrame(animate)

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                cameraRef.current.updateOrbitControls()
                rendererRef.current.render(sceneRef.current.scene, cameraRef.current.camera)
            }
        }

        animate()

        const handleCanvasClick = async (event: MouseEvent) => {
            if (
                !setupComplete ||
                !canvasRef.current ||
                !raycasterRef.current ||
                !cameraRef.current ||
                !shelfManagerRef.current ||
                isAnimating
            ) {
                return
            }

            raycasterRef.current.setMousePosition(event, width, height)
            const shelfGroups = shelfManagerRef.current.getShelfGroups()
            const intersects = raycasterRef.current.getIntersects(shelfGroups, cameraRef.current.camera)

            if (intersects.length > 0) {
                let clickedMesh = intersects[0].object as THREE.Mesh
                console.log("[App] Initial hit mesh:", clickedMesh.name, "userData:", clickedMesh.userData)

                // Walk up parent chain to find object with product userData
                let parentChainLog = [clickedMesh.name];
                while (clickedMesh && clickedMesh.userData?.type !== "product") {
                    clickedMesh = clickedMesh.parent as THREE.Mesh
                    if (clickedMesh) {
                        parentChainLog.push(clickedMesh.name);
                    }
                }
                console.log("[App] Parent chain:", parentChainLog.join(" <- "))

                if (!clickedMesh || clickedMesh.userData?.type !== "product") {
                    console.log("[App] ❌ Click did not hit a product mesh after parent chain walk")
                    return
                }

                console.log("[App] ✓ Found product mesh:", clickedMesh.name, "userData:", clickedMesh.userData)

                const productInfo = shelfManagerRef.current.getProductByMesh(clickedMesh)
                console.log("[App] Product info retrieved:", productInfo)

                if (productInfo) {
                    setIsAnimating(true)
                    cameraRef.current.disableOrbitControls()
                    const productData = shelfManagerRef.current.selectProduct(productInfo.shelfId, productInfo.meshId)
                    console.log("[App] Product data from selectProduct:", productData)

                    if (productData) {
                        console.log("[App] Selected product:", productData.productName)
                        setSelectedProduct(productData)
                        await cameraRef.current.animateToProduct(clickedMesh)
                    } else {
                        console.log("[App] selectProduct returned null")
                    }
                    cameraRef.current.enableOrbitControls()
                    setIsAnimating(false)
                } else {
                    console.log("[App] Product info not found for mesh:", clickedMesh.name)
                    console.log("[App] Mesh userData:", clickedMesh.userData)
                    setIsAnimating(false)
                }
            } else {
                console.log("[App] No intersections")
            }
        }

        canvasRef.current.addEventListener('click', handleCanvasClick)

        const handleWindowResize = () => {
            const newWidth = window.innerWidth
            const newHeight = window.innerHeight

            if (cameraRef.current) {
                cameraRef.current.onWindowResize(newWidth, newHeight)
            }
            if (rendererRef.current) {
                rendererRef.current.onWindowResize(newWidth, newHeight)
            }
        }

        window.addEventListener('resize', handleWindowResize)

        return () => {
            if (canvasRef.current) {
                canvasRef.current.removeEventListener('click', handleCanvasClick)
            }
            window.removeEventListener('resize', handleWindowResize)

            if (animationIdRef.current) {
                cancelAnimationFrame(animationIdRef.current)
            }

            if (rendererRef.current) {
                rendererRef.current.dispose()
            }
            if (sceneRef.current) {
                sceneRef.current.dispose()
            }
            if (shelfManagerRef.current) {
                shelfManagerRef.current.dispose()
            }
        }
    }, [])

    const handleBackToFloor = async () => {
        if (!cameraRef.current || !shelfManagerRef.current || isAnimating) return

        setIsAnimating(true)
        cameraRef.current.disableOrbitControls()
        setSelectedProduct(null)
        shelfManagerRef.current.deselectProduct()
        await cameraRef.current.resetCamera()
        cameraRef.current.enableOrbitControls()
        setIsAnimating(false)
    }

    return (
        <div className="app">
            <canvas ref={canvasRef} className="canvas"></canvas>
            <InfoPanel selectedProduct={selectedProduct} onBackClick={handleBackToFloor} />
        </div>
    )
}
