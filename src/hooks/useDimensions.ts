import { RefObject, useEffect, useState } from "react"

export interface Dimensions {
  width: number
  height: number
}

export function useDimensions(ref: RefObject<HTMLElement>) : Dimensions {
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0
  })

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    window.addEventListener("load", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("load", handleResize)
    }
  }, [])

  return dimensions
}