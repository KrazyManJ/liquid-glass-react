import { type CSSProperties } from "react";
import { ComponentPropsWithoutChildren } from "../types";

interface OverlightEffectLayerProps extends ComponentPropsWithoutChildren<"div"> {
  overLight: boolean
}

const OverlightEffectLayer = ({overLight, style, ...props}: OverlightEffectLayerProps) => {

  const overLightStyles = {
    backgroundColor: "black",
    pointerEvents: "none"
  } as CSSProperties

  return <>
    <div
      style={{
        ...style,
        ...overLightStyles,
        opacity: overLight ? 0.2 : 0,
      }}
      {...props}
      />
    <div
      style={{
        ...style,
        ...overLightStyles,
        mixBlendMode: "overlay",
        opacity: overLight ? 1 : 0,
      }}
      {...props}
    />
  </>;
};

export default OverlightEffectLayer;
