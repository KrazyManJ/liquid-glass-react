import { ComponentProps } from "react";
import { Position } from "../types";

interface BorderLayerProps extends ComponentProps<"div"> {
  mouseOffset: Position
}

const BorderLayer = ({mouseOffset, style, ...props}: BorderLayerProps) => {
  return <>
    <div
      style={{
        ...style,
        pointerEvents: "none",
        mixBlendMode: "screen",
        opacity: 0.2,
        padding: "1.5px",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        boxShadow: "0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)",
        background: `linear-gradient(
        ${135 + mouseOffset.x * 1.2}deg,
        rgba(255, 255, 255, 0.0) 0%,
        rgba(255, 255, 255, ${0.12 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
        rgba(255, 255, 255, ${0.4 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
        rgba(255, 255, 255, 0.0) 100%
      )`,
      }}
      {...props}
    />

    <div
      style={{
        ...style,
        pointerEvents: "none",
        mixBlendMode: "overlay",
        padding: "1.5px",
        WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        boxShadow: "0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)",
        background: `linear-gradient(
        ${135 + mouseOffset.x * 1.2}deg,
        rgba(255, 255, 255, 0.0) 0%,
        rgba(255, 255, 255, ${0.32 + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
        rgba(255, 255, 255, ${0.6 + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
        rgba(255, 255, 255, 0.0) 100%
      )`,
      }}
      {...props}
    />
  </>;
};

export default BorderLayer;
