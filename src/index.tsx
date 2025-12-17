import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react"
import GlassContainer from "./GlassContainer"
import { RefractionMode } from "./types"
import { useDimensions } from "./hooks/useDimensions"
import { useMouseTracking } from "./hooks/useMouseTracking"
import * as ElasticityUtils from "./elasticity-utils"
import OverlightEffectLayer from "./layers/OverlightEffectLayer"
import BorderLayer from "./layers/BorderLayer"
import HoverLayer from "./layers/HoverLayer"

interface LiquidGlassProps {
  children: React.ReactNode
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  aberrationIntensity?: number
  elasticity?: number
  cornerRadius?: number
  globalMousePos?: { x: number; y: number }
  mouseOffset?: { x: number; y: number }
  mouseContainer?: React.RefObject<HTMLElement | null> | null
  className?: string
  padding?: string
  style?: React.CSSProperties
  overLight?: boolean
  mode?: RefractionMode
  onClick?: () => void
}


export default function LiquidGlass({
  children,
  displacementScale = 70,
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  elasticity = 0.15,
  cornerRadius = 999,
  globalMousePos: externalGlobalMousePos,
  mouseOffset: externalMouseOffset,
  mouseContainer = null,
  className = "",
  padding = "24px 32px",
  overLight = false,
  style = {},
  mode = "standard",
  onClick,
}: LiquidGlassProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const glassRef = useRef<HTMLDivElement>(null)
  const glassSize = useDimensions(glassRef)

  const { globalMousePos, mouseOffset } = useMouseTracking({
    container: mouseContainer?.current || glassRef.current, 
    externalGlobalMousePos, 
    externalMouseOffset
  })

  const calculateDirectionalScale = useCallback(() => 
    ElasticityUtils.calculateDirectionalScale(elasticity, glassRef, glassSize, globalMousePos)
  , [elasticity, glassRef, glassSize, globalMousePos])


  const calculateElasticTranslation = useCallback(() => 
    ElasticityUtils.calculateElasticTranslation(elasticity, glassRef, glassSize, globalMousePos)
  , [globalMousePos, elasticity])

  const transformStyle = `translate(calc(-50% + ${calculateElasticTranslation().x}px), calc(-50% + ${calculateElasticTranslation().y}px)) ${isActive && Boolean(onClick) ? "scale(0.96)" : calculateDirectionalScale()}`

  const baseStyle = {
    ...style,
    transform: transformStyle,
    transition: "all ease-out 0.2s",
  }

  const positionStyles = {
    position: baseStyle.position || "relative",
    top: baseStyle.top || "50%",
    left: baseStyle.left || "50%",
  }

  const overLightStyles = {
    backgroundColor: "black",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
    pointerEvents: "none"
  } as CSSProperties

  return (
    <>
      <OverlightEffectLayer
        overLight={overLight}
        style={{
          ...positionStyles,
          height: glassSize.height,
          width: glassSize.width,
          borderRadius: `${cornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
        }}
      />

      <GlassContainer
        ref={glassRef}
        className={className}
        style={baseStyle}
        cornerRadius={cornerRadius}
        displacementScale={overLight ? displacementScale * 0.5 : displacementScale}
        blurAmount={blurAmount}
        saturation={saturation}
        aberrationIntensity={aberrationIntensity}
        glassSize={glassSize}
        padding={padding}
        mouseOffset={mouseOffset}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsActive(true)}
        onMouseUp={() => setIsActive(false)}
        active={isActive}
        overLight={overLight}
        onClick={onClick}
        mode={mode}
      >
        {children}
      </GlassContainer>

      <BorderLayer
        mouseOffset={mouseOffset}
        style={{
          ...positionStyles,
          height: glassSize.height,
          width: glassSize.width,
          borderRadius: `${cornerRadius}px`,
          transform: baseStyle.transform,
          transition: baseStyle.transition,
        }}
      />

      {/* Hover effects */}
      {Boolean(onClick) && (
        <HoverLayer
          isHovered={isHovered}
          isActive={isActive}
          baseStyle={baseStyle}
          positionStyles={positionStyles}
          style={{
            height: glassSize.height,
            width: glassSize.width + 1,
            borderRadius: `${cornerRadius}px`,
          }}
        />
      )}
    </>
  )
}
