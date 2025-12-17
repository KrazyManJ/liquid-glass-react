import { ComponentProps, type CSSProperties } from "react";

interface OverlightEffectLayerProps extends ComponentProps<"div"> {
  overLight: boolean
}

const OverlightEffectLayer = ({overLight, style, ...props}: OverlightEffectLayerProps) => {

  const overLightStyles = {
    backgroundColor: "black",
    transitionProperty: "all",
    transitionDuration: "150ms",
    transitionTimingFunction: "ease-in-out",
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
