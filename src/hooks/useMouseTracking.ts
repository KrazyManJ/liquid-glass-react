import { RefObject, useCallback, useEffect, useState } from "react"
import { Position } from "../types"

interface MouseTrackingProps {
  container: HTMLElement | null,
  externalGlobalMousePos?: Position,
  externalMouseOffset?: Position
}


export function useMouseTracking({
  container,
  externalGlobalMousePos,
  externalMouseOffset
}: MouseTrackingProps) {
  const [globalMousePos, setGlobalMousePos] = useState<Position>({ x: 0, y: 0 })
  const [mouseOffset, setMouseOffset] = useState<Position>({ x: 0, y: 0 })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!container) {
        return
      }

      const rect = container.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      setMouseOffset({
        x: ((e.clientX - centerX) / rect.width) * 100,
        y: ((e.clientY - centerY) / rect.height) * 100,
      })

      setGlobalMousePos({
        x: e.clientX,
        y: e.clientY,
      })
    },
    [container],
  )

  const resetMouseMove = () => {
    setMouseOffset({x: 0, y: 0})
    setGlobalMousePos({x: 0, y: 0})
  }

  useEffect(() => {
    if (externalGlobalMousePos && externalMouseOffset) {
      return
    }

    if (!container) {
      return
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", resetMouseMove)
    
    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", resetMouseMove)
    }
  }, [handleMouseMove, container, externalGlobalMousePos, externalMouseOffset])

  return { globalMousePos, mouseOffset }
}