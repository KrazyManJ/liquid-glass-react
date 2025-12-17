import { CSSProperties } from "react"
import { ComponentPropsWithoutChildren } from "../types"

interface HoverLayerProps extends ComponentPropsWithoutChildren<"div"> {
  isHovered: boolean,
  isActive: boolean,
  baseStyle: CSSProperties,
  positionStyles: CSSProperties
}

const HoverLayer = ({isHovered, isActive, baseStyle, positionStyles, style, ...props}: HoverLayerProps) => {
  return (
    <>
      <div
        style={{
          ...style,
          ...positionStyles,
          transform: baseStyle.transform,
          pointerEvents: "none",
          transition: "all 0.2s ease-out",
          opacity: isHovered || isActive ? 0.5 : 0,
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 50%)",
          mixBlendMode: "overlay",
        }}
        {...props}
      />
      <div
        style={{
          ...style,
          ...positionStyles,
          transform: baseStyle.transform,
          pointerEvents: "none",
          transition: "all 0.2s ease-out",
          opacity: isActive ? 0.5 : 0,
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 80%)",
          mixBlendMode: "overlay",
        }}
        {...props}
      />
      <div
        style={{
          ...style,
          ...baseStyle,
          position: baseStyle.position,
          top: baseStyle.top,
          left: baseStyle.left,
          pointerEvents: "none",
          transition: "all 0.2s ease-out",
          opacity: isHovered ? 0.4 : isActive ? 0.8 : 0,
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%)",
          mixBlendMode: "overlay",
        }}
        {...props}
      />
    </>
  )
}

export default HoverLayer