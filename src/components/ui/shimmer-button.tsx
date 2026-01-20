"use client";

import React, { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface ShimmerButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "#007AFF",
      shimmerSize = "0.1em",
      shimmerDuration = "3s",
      borderRadius = "100px",
      background = "rgba(0, 122, 255, 0.1)",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        style={
          {
            "--spread": "90deg",
            "--shimmer-color": "white",
            "--shimmer-color-dark": shimmerColor,
            "--radius": borderRadius,
            "--speed": shimmerDuration,
            "--cut": shimmerSize,
            "--bg": background,
          } as CSSProperties
        }
        className={cn(
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border-0 dark:border border-[#007AFF]/30 dark:border-[#007AFF]/30 px-8 py-4 text-white bg-[#007AFF] dark:bg-transparent [border-radius:var(--radius)]",
          "dark:[background:var(--bg)]",
          "transform-gpu transition-transform duration-300 ease-in-out active:translate-y-px dark:hover:border-[#007AFF]/50",
          className,
        )}
        ref={ref}
        {...props}
      >
        {/* spark container - only on border */}
        <div
          className={cn(
            "-z-30",
            "absolute inset-0 overflow-visible [border-radius:var(--radius)] [container-type:size]",
          )}
          style={{
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
            padding: "2px",
          }}
        >
          {/* spark */}
          <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0]">
            {/* spark before */}
            <div className="animate-spin-around absolute -inset-full w-auto rotate-0 blur-[1px] [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,white_var(--spread),transparent_var(--spread))] dark:[background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color-dark)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
          </div>
        </div>
        {children}

        {/* Highlight */}
        <div
          className={cn(
            "inset-0 absolute size-full",
            "rounded-2xl px-4 py-1.5 text-sm font-medium shadow-[inset_0_-8px_10px_rgba(0,122,255,0.1)]",
            // transition
            "transform-gpu transition-all duration-300 ease-in-out",
            // on hover
            "group-hover:shadow-[inset_0_-6px_10px_rgba(0,122,255,0.2)]",
            // on click
            "group-active:shadow-[inset_0_-10px_10px_rgba(0,122,255,0.3)]",
          )}
        />

        {/* backdrop */}
        <div
          className={cn(
            "absolute -z-20 [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]",
          )}
        />
      </button>
    );
  },
);

ShimmerButton.displayName = "ShimmerButton";

export { ShimmerButton };
