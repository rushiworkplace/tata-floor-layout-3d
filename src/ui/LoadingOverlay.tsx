import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import './LoadingOverlay.css'

interface LoadingOverlayProps {
    isEnvironmentLoaded: boolean
    onUserEnter: () => void
    onRevealComplete: () => void
}

export function LoadingOverlay({
    isEnvironmentLoaded,
    onUserEnter,
    onRevealComplete,
}: LoadingOverlayProps) {
    const [hasUserEntered, setHasUserEntered] = useState(false)
    const [isRevealing, setIsRevealing] = useState(false)
    const [showOverlay, setShowOverlay] = useState(true)
    const overlayRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)

    // Trigger reveal when BOTH conditions are met AND we haven't started yet
    useEffect(() => {
        if (isEnvironmentLoaded && hasUserEntered && !isRevealing && showOverlay) {
            console.log("[LoadingOverlay] Both conditions met - starting reveal animation");
            setIsRevealing(true)
            animateReveal()
        }
    }, [isEnvironmentLoaded, hasUserEntered, isRevealing, showOverlay])

    // Animate progress bar
    useEffect(() => {
        if (hasUserEntered && progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                width: "100%",
                duration: 0.5,
                ease: "power2.out",
            })
        }
    }, [hasUserEntered])

    const handleEnterClick = useCallback(() => {
        console.log("[LoadingOverlay] User clicked Enter");
        setHasUserEntered(true)
        onUserEnter()

        // Fade out content
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
            })
        }
    }, [onUserEnter])

    const animateReveal = useCallback(() => {
        if (!overlayRef.current) return

        console.log("[LoadingOverlay] Starting reveal animation");

        const tl = gsap.timeline({
            onComplete: () => {
                console.log("[LoadingOverlay] Reveal complete - removing overlay");
                setShowOverlay(false)
                onRevealComplete()
            },
        })

        // Blur and scale effect
        tl.to(
            overlayRef.current,
            {
                backdropFilter: "blur(20px)",
                duration: 0.3,
            },
            0
        )

        // Scale and opacity
        tl.to(
            overlayRef.current,
            {
                scale: 1.05,
                opacity: 0,
                duration: 0.6,
                ease: "power2.inOut",
            },
            0.1
        )
    }, [onRevealComplete])

    if (!showOverlay) {
        return null
    }

    return (
        <div ref={overlayRef} className="loading-overlay">
            {!hasUserEntered && (
                <div ref={contentRef} className="loading-content">
                    <div className="loading-header">
                        <h1 className="loading-title">Tata Communications</h1>
                        <p className="loading-subtitle">Supermarket Floor</p>
                    </div>

                    <button className="enter-button" onClick={handleEnterClick}>
                        <span className="button-text">Click to Enter</span>
                        <span className="button-icon">→</span>
                    </button>

                    <p className="loading-hint">Explore our interactive floor layout</p>
                </div>
            )}

            {hasUserEntered && (
                <div className="loading-progress-container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                    <p className="loading-text">Loading Environment</p>
                    <div className="progress-bar-bg">
                        <div ref={progressBarRef} className="progress-bar"></div>
                    </div>
                    <p className="loading-percentage">{isEnvironmentLoaded ? "100" : "Loading"}%</p>                </div>
            )}
        </div>
    )
}