"use client";

import React, { useMemo } from "react";

type Variant = "swirl" | "hue";

export type ElectricButtonProps = {
  /** Visual style: "swirl" = displacement + traveling turbulence; "hue" = animated hue turbulence */
  variant?: Variant;
  /** Accent / border color (any valid CSS color). */
  color?: string;
  /** Button text. */
  children: React.ReactNode;
  /** onClick handler */
  onClick?: () => void;
  /** href for link-style button */
  href?: string;
  /** Extra class names for the outer wrapper (optional). */
  className?: string;
};

/**
 * ElectricButton
 * Animated, dramatic button with SVG filters and layered glow.
 * Perfect for CTAs that need to STAND OUT.
 */
const ElectricButton = ({
  variant = "swirl",
  color = "#007AFF",
  children,
  onClick,
  href,
  className = "",
}: ElectricButtonProps) => {
  // Make unique IDs so multiple components don't clash
  const ids = useMemo(() => {
    const key = Math.random().toString(36).slice(2, 8);
    return {
      swirl: `btn-swirl-${key}`,
      hue: `btn-hue-${key}`,
    };
  }, []);

  // Map variant -> CSS var that points to the proper filter url(#...)
  const filterURL = variant === "hue" ? `url(#${ids.hue})` : `url(#${ids.swirl})`;

  const ButtonElement = href ? "a" : "button";
  const buttonProps = href ? { href } : { onClick };

  return (
    <div className={`eb-wrap ${className}`}>
      {/* Inline SVG defs with animated filters (unique IDs per instance) */}
      <svg className="svg-container" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          {/* SWIRL */}
          <filter id={ids.swirl} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise3" seed="2" />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise4" seed="2" />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="20"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>

          {/* HUE */}
          <filter id={ids.hue} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="7" />
            <feColorMatrix type="hueRotate" result="pt1">
              <animate attributeName="values" values="0;360;" dur=".6s" repeatCount="indefinite" calcMode="paced" />
            </feColorMatrix>
            <feComposite />
            <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="7" seed="5" />
            <feColorMatrix type="hueRotate" result="pt2">
              <animate
                attributeName="values"
                values="0; 333; 199; 286; 64; 168; 256; 157; 360;"
                dur="5s"
                repeatCount="indefinite"
                calcMode="paced"
              />
            </feColorMatrix>
            <feBlend in="pt1" in2="pt2" mode="normal" result="combinedNoise" />
            <feDisplacementMap in="SourceGraphic" scale="20" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>

      <ButtonElement
        className="button-container"
        style={{ ["--electric-border-color" as any]: color, ["--f" as any]: filterURL }}
        {...buttonProps}
      >
        <div className="inner-container">
          <div className="border-outer">
            <div className="main-button" />
          </div>
          <div className="glow-layer-1" />
          <div className="glow-layer-2" />
        </div>

        <div className="overlay-1" />
        <div className="overlay-2" />
        <div className="background-glow" />

        <div className="content-container">
          <span className="button-text">{children}</span>
        </div>
      </ButtonElement>

      <style jsx>{`
        .eb-wrap {
          position: relative;
          display: inline-block;
        }

        .svg-container {
          position: absolute;
          width: 0;
          height: 0;
          overflow: hidden;
        }

        .button-container {
          padding: 2px;
          border-radius: 9999px;
          position: relative;
          cursor: pointer;
          border: none;
          background: none;
          text-decoration: none;
          display: inline-block;
          transition: transform 0.2s ease;

          --electric-light-color: ${color};
          --gradient-color: ${color}66;

          background: linear-gradient(-30deg, var(--gradient-color), transparent, var(--gradient-color)),
            linear-gradient(to bottom, #0a0a0a, #0a0a0a);
        }

        .button-container:hover {
          transform: scale(1.02);
        }

        .button-container:active {
          transform: scale(0.98);
        }

        .inner-container {
          position: relative;
        }

        .border-outer {
          border: 2px solid ${color}80;
          border-radius: 9999px;
          padding-right: 0.15em;
          padding-bottom: 0.15em;
        }

        .main-button {
          min-width: 160px;
          height: 48px;
          border-radius: 9999px;
          border: 2px solid var(--electric-border-color);
          margin-top: -4px;
          margin-left: -4px;
          filter: var(--f);
          background: #0a0a0a;
        }

        /* Glow effects */
        .glow-layer-1,
        .glow-layer-2,
        .overlay-1,
        .overlay-2,
        .background-glow {
          border-radius: 9999px;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
        }

        .glow-layer-1 {
          border: 2px solid ${color}99;
          filter: blur(1px);
        }

        .glow-layer-2 {
          border: 2px solid var(--electric-light-color);
          filter: blur(4px);
        }

        .overlay-1,
        .overlay-2 {
          mix-blend-mode: overlay;
          transform: scale(1.05);
          filter: blur(8px);
          background: linear-gradient(-30deg, white, transparent 30%, transparent 70%, white);
        }

        .overlay-1 {
          opacity: 0.8;
        }
        .overlay-2 {
          opacity: 0.4;
        }

        .background-glow {
          filter: blur(24px);
          transform: scale(1.15);
          opacity: 0.4;
          z-index: -1;
          background: linear-gradient(-30deg, var(--electric-light-color), transparent, var(--electric-border-color));
        }

        .content-container {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .button-text {
          font-family: var(--font-oxygen), sans-serif;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          position: relative;
          z-index: 10;
          text-shadow: 0 0 10px ${color}40;
        }
      `}</style>
    </div>
  );
};

export { ElectricButton };

