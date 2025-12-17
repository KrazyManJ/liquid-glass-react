import { ComponentProps, useEffect, useState } from "react"
import { Dimensions } from "./useDimensions"
import { RefractionMode } from "../types"
import { fragmentShaders, ShaderDisplacementGenerator } from "../shader-utils"


// Generate shader-based displacement map using shaderUtils
export const generateShaderDisplacementMap = (width: number, height: number): string => {
  const generator = new ShaderDisplacementGenerator({
    width,
    height,
    fragment: fragmentShaders.liquidGlass,
  })

  const dataUrl = generator.updateShader()
  generator.destroy()

  return dataUrl
}


export default function useShader(
  mode: RefractionMode,
  size: Dimensions
) {
  const [shaderMapUrl, setShaderMapUrl] = useState<string>("")

  useEffect(() => {
    if (mode === "shader") {
      const url = generateShaderDisplacementMap(size.width, size.height)
      setShaderMapUrl(url)
    }
  }, [mode, size.width, size.height])

  return { shaderMapUrl }
}