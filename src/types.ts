import { ComponentProps } from "react";

export type RefractionMode = "standard" | "polar" | "prominent" | "shader";
export type Position = { x: number; y: number };

export type ComponentPropsWithoutChildren<
  T extends keyof JSX.IntrinsicElements
> = Omit<ComponentProps<T>, "children">;
