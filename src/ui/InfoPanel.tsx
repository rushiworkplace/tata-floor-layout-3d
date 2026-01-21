import React, { useState, useEffect } from 'react'
import { MachineData } from '../types/MachineData'
import { ProductData } from '../types/ProductData'

interface InfoPanelProps {
    selectedMachine?: MachineData | null
    selectedProduct?: ProductData | null
    onBackClick: () => void
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ selectedMachine, selectedProduct, onBackClick }) => {
    const [isVisible, setIsVisible] = useState(false)
    const selected = selectedProduct || selectedMachine

    useEffect(() => {
        setIsVisible(selected !== null && selected !== undefined)
    }, [selected])

    if (!isVisible || !selected) {
        return null
    }

    const getIcon = (id: string): string => {
        if ('productId' in selected) {
            return '📦'
        }
        switch (id) {
            case 'machine-1':
                return '🤖'
            case 'machine-2':
                return '⚙️'
            case 'machine-3':
                return '⚡'
            default:
                return '🏭'
        }
    }

    const isProduct = 'productId' in selected

    return (
        <div className="info-panel">
            <div className="info-panel-content">
                <div className="info-panel-header">
                    <div className="info-panel-icon">{getIcon(isProduct ? selected.productId : selected.id)}</div>
                    <h2>{isProduct ? selected.productName : selected.name}</h2>
                </div>
                <div className="info-panel-description">
                    {isProduct ? (
                        <>
                            <div>
                                <div className="info-panel-label">Product ID</div>
                                <p>{selected.productId}</p>
                            </div>
                            <div>
                                <div className="info-panel-label">Shelf ID</div>
                                <p>{selected.shelfId}</p>
                            </div>
                            <div>
                                <div className="info-panel-label">Description</div>
                                <p>{selected.description}</p>
                            </div>
                        </>
                    ) : (
                        <div>
                            <div className="info-panel-label">Machine Details</div>
                            <p>{selected.description}</p>
                        </div>
                    )}
                </div>
                <button className="back-button" onClick={onBackClick}>
                    ← Back to {isProduct ? 'Aisle View' : 'Floor View'}
                </button>
            </div>
        </div>
    )
}
