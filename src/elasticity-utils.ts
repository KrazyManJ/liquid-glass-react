import { RefObject } from "react"
import { Position } from "./types"
import { Dimensions } from "./hooks/useDimensions"

export function calculateDirectionalScale(
  elasticity: number,
  glassRef: RefObject<HTMLDivElement | null>,
  glassSize: Dimensions,
  globalMousePos: Position
) {
  if (!glassRef.current) {
    return "scale(1)"
  }

  const rect = glassRef.current.getBoundingClientRect()
  const pillCenterX = rect.left + rect.width / 2
  const pillCenterY = rect.top + rect.height / 2
  const pillWidth = glassSize.width
  const pillHeight = glassSize.height

  const deltaX = globalMousePos.x - pillCenterX
  const deltaY = globalMousePos.y - pillCenterY

  // Calculate distance from mouse to pill edges (not center)
  const edgeDistanceX = Math.max(0, Math.abs(deltaX) - pillWidth / 2)
  const edgeDistanceY = Math.max(0, Math.abs(deltaY) - pillHeight / 2)
  const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY)

  // Activation zone: 200px from edges
  const activationZone = 200

  // If outside activation zone, no effect
  if (edgeDistance > activationZone) {
    return "scale(1)"
  }

  // Calculate fade-in factor (1 at edge, 0 at activation zone boundary)
  const fadeInFactor = 1 - edgeDistance / activationZone

  // Normalize the deltas for direction
  const centerDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
  if (centerDistance === 0) {
    return "scale(1)"
  }

  const normalizedX = deltaX / centerDistance
  const normalizedY = deltaY / centerDistance

  // Calculate stretch factors with fade-in
  const stretchIntensity = Math.min(centerDistance / 300, 1) * elasticity * fadeInFactor

  // X-axis scaling: stretch horizontally when moving left/right, compress when moving up/down
  const scaleX = 1 + Math.abs(normalizedX) * stretchIntensity * 0.3 - Math.abs(normalizedY) * stretchIntensity * 0.15

  // Y-axis scaling: stretch vertically when moving up/down, compress when moving left/right
  const scaleY = 1 + Math.abs(normalizedY) * stretchIntensity * 0.3 - Math.abs(normalizedX) * stretchIntensity * 0.15

  return `scaleX(${Math.max(0.8, scaleX)}) scaleY(${Math.max(0.8, scaleY)})`
}

function calculateFadeInFactor(
  glassRef: RefObject<HTMLDivElement | null>,
  glassSize: Dimensions,
  globalMousePos: Position
) {
  if (!glassRef.current) {
    return 0
  }

  const rect = glassRef.current.getBoundingClientRect()
  const pillCenterX = rect.left + rect.width / 2
  const pillCenterY = rect.top + rect.height / 2
  const pillWidth = glassSize.width
  const pillHeight = glassSize.height

  const edgeDistanceX = Math.max(0, Math.abs(globalMousePos.x - pillCenterX) - pillWidth / 2)
  const edgeDistanceY = Math.max(0, Math.abs(globalMousePos.y - pillCenterY) - pillHeight / 2)
  const edgeDistance = Math.sqrt(edgeDistanceX * edgeDistanceX + edgeDistanceY * edgeDistanceY)

  const activationZone = 200
  return edgeDistance > activationZone ? 0 : 1 - edgeDistance / activationZone
}

export function calculateElasticTranslation(
  elasticity: number,
  glassRef: RefObject<HTMLDivElement | null>,
  glassSize: Dimensions,
  globalMousePos: Position
) : Position {
    if (!glassRef.current) {
      return { x: 0, y: 0 }
    }

    const fadeInFactor = calculateFadeInFactor(glassRef, glassSize, globalMousePos)
    const rect = glassRef.current.getBoundingClientRect()
    const pillCenterX = rect.left + rect.width / 2
    const pillCenterY = rect.top + rect.height / 2

    return {
      x: (globalMousePos.x - pillCenterX) * elasticity * 0.1 * fadeInFactor,
      y: (globalMousePos.y - pillCenterY) * elasticity * 0.1 * fadeInFactor,
    }
  }