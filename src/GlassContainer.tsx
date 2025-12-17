import { useId, ComponentProps, RefObject } from "react"
import { RefractionMode } from "./types"
import GlassFilter from "./GlassFilter"
import useAgent from "./hooks/useAgent"
import useShader from "./hooks/useShader"


interface GlassContainerProps extends ComponentProps<"div"> {
  glassRef: RefObject<HTMLDivElement>
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  aberrationIntensity?: number
  mouseOffset?: { x: number; y: number }
  overLight?: boolean
  cornerRadius?: number
  padding?: string
  glassSize?: { width: number; height: number }
  mode?: RefractionMode
}


const GlassContainer = ({
  glassRef,
  children,
  style,
  displacementScale = 25,
  blurAmount = 12,
  saturation = 180,
  aberrationIntensity = 2,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  onMouseUp,
  overLight = false,
  cornerRadius = 999,
  padding = "24px 32px",
  glassSize = { width: 270, height: 69 },
  onClick,
  mode = "standard",
  ...props
}: GlassContainerProps) => {
  const filterId = useId()

  const { shaderMapUrl } = useShader(mode, glassSize)
  const { isFirefox } = useAgent()

  return (
    <div 
      ref={glassRef}
      style={{...style,
        cursor: Boolean(onClick) ? "pointer" : undefined
      }}
      {...props}
    >
      <GlassFilter 
        mode={mode} 
        id={filterId} 
        displacementScale={displacementScale} 
        aberrationIntensity={aberrationIntensity} 
        width={glassSize.width} 
        height={glassSize.height} 
        shaderMapUrl={shaderMapUrl}
      />

      <div
        style={{
          padding,
          borderRadius: `${cornerRadius}px`,
          position: "relative",
          overflow: "hidden",
          boxShadow: overLight ? "0px 16px 70px rgba(0, 0, 0, 0.75)" : "0px 12px 40px rgba(0, 0, 0, 0.25)",
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div
          style={{
            filter: isFirefox ? undefined : `url(#${filterId})`,
            backdropFilter: `blur(${(overLight ? 12 : 4) + blurAmount * 32}px) saturate(${saturation}%)`,
            position: "absolute",
            inset: "0",
          }}
        />

        <div
          style={{
            position: "relative",
            textShadow: overLight ? "0px 2px 12px rgba(0, 0, 0, 0)" : "0px 2px 12px rgba(0, 0, 0, 0.4)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export default GlassContainer;