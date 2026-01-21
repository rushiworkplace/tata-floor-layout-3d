import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import './LoadingOverlay.css'

interface LoadingOverlayProps {
    isLoading: boolean
    progress: number // 0-100
    onEnter: () => void
    onLoadingComplete: () => void
}

export function LoadingOverlay({
    isLoading,
    progress,
    onEnter,
    onLoadingComplete,
}: LoadingOverlayProps) {
    const [showOverlay, setShowOverlay] = useState(true)
    const [hasClicked, setHasClicked] = useState(false)
    const overlayRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const progressBarRef = useRef<HTMLDivElement>(null)

    // Animate reveal when loading completes
    useEffect(() => {
        if (!isLoading && hasClicked && showOverlay) {
            animateReveal()
        }
    }, [isLoading, hasClicked, showOverlay])

    // Update progress bar
    useEffect(() => {
        if (progressBarRef.current) {
            gsap.to(progressBarRef.current, {
                width: `${progress}%`,
                duration: 0.3,
                ease: 'power2.out',
            })
        }
    }, [progress])

    const handleEnterClick = useCallback(() => {
        setHasClicked(true)
        onEnter()

        // Fade out content and show loading
        if (contentRef.current) {
            gsap.to(contentRef.current, {
                opacity: 0,
                duration: 0.4,
                ease: 'power2.inOut',
            })
        }
    }, [onEnter])

    const animateReveal = useCallback(() => {
        if (!overlayRef.current) return

        // Sequence:
        // 1. Scale up with blur effect
        // 2. Fade out
        // 3. Remove from DOM

        const tl = gsap.timeline({
            onComplete: () => {
                setShowOverlay(false)
                onLoadingComplete()
            },
        })

        // Blur and scale effect
        tl.to(
            overlayRef.current,
            {
                backdropFilter: 'blur(20px)',
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
                ease: 'power2.inOut',
            },
            0.1
        )
    }, [onLoadingComplete])

    if (!showOverlay) {
        return null
    }

    return (
        <div ref={overlayRef} className="loading-overlay">
            {!hasClicked && (
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

            {hasClicked && (
                <div className="loading-progress-container">
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                    <p className="loading-text">Loading Environment</p>
                    <div className="progress-bar-bg">
                        <div ref={progressBarRef} className="progress-bar"></div>
                    </div>
                    <p className="loading-percentage">{Math.round(progress)}%</p>
                </div>
            )}
        </div>
    )
}
