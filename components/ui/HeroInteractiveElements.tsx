"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function HeroInteractiveElements() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.offsetWidth || 1200;
    let height = container.offsetHeight || 600;

    const dpr = Math.min(typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1, 2);

    // Mouse coordinates with smooth dampening (lerp)
    let targetMouseX = width * 0.5;
    let targetMouseY = height * 0.4;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;
    let mouseInside = false;
    let spotlightOpacity = 0;

    // Dot grid configuration
    const gridSpacing = 32;
    let baseGridCanvas: HTMLCanvasElement | null = null;

    // Pre-render static base dot grid to offscreen canvas
    const renderBaseGrid = (isDark: boolean) => {
      baseGridCanvas = document.createElement("canvas");
      baseGridCanvas.width = Math.floor(width * dpr);
      baseGridCanvas.height = Math.floor(height * dpr);
      const bCtx = baseGridCanvas.getContext("2d");
      if (!bCtx) return;

      bCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bCtx.fillStyle = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.035)";

      for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
        for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
          bCtx.beginPath();
          bCtx.arc(x, y, 0.85, 0, Math.PI * 2);
          bCtx.fill();
        }
      }
    };

    // ── Corner Constellation Nodes ──
    const blNodes: Node[] = []; // Bottom-Left
    const trNodes: Node[] = []; // Top-Right
    const freeNodes: Node[] = []; // Floating interactive nodes

    const initNodes = () => {
      blNodes.length = 0;
      trNodes.length = 0;
      freeNodes.length = 0;

      // Bottom-Left constellation
      const blCount = 12;
      for (let i = 0; i < blCount; i++) {
        blNodes.push({
          x: Math.random() * (width * 0.25),
          y: height * 0.56 + Math.random() * (height * 0.44),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 0.7 + 1.2,
        });
      }

      // Top-Right constellation
      const trCount = 12;
      for (let i = 0; i < trCount; i++) {
        trNodes.push({
          x: width * 0.72 + Math.random() * (width * 0.28),
          y: Math.random() * (height * 0.46),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 0.7 + 1.2,
        });
      }

      // Free floating nodes around center/hero
      const freeCount = 18;
      for (let i = 0; i < freeCount; i++) {
        freeNodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 0.6 + 1.0,
        });
      }
    };

    const updateSize = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      width = w;
      height = h;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isDark = document.documentElement.classList.contains("dark");
      renderBaseGrid(isDark);
      initNodes();
    };

    updateSize(width, height);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
          updateSize(entry.contentRect.width, entry.contentRect.height);
        }
      }
    });
    resizeObserver.observe(container);

    // Mouse listeners
    const parentSection = container.closest("section") || container;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      mouseInside = true;
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
      currentMouseX = targetMouseX;
      currentMouseY = targetMouseY;
      mouseInside = true;
    };

    const handleMouseLeave = () => {
      mouseInside = false;
    };

    parentSection.addEventListener("mousemove", handleMouseMove as EventListener);
    parentSection.addEventListener("mouseenter", handleMouseEnter as EventListener);
    parentSection.addEventListener("mouseleave", handleMouseLeave as EventListener);

    // Dark mode observer
    const themeObserver = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      renderBaseGrid(isDark);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Render loop
    const spotlightRadius = 180;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.documentElement.classList.contains("dark");

      // Smooth mouse follow
      currentMouseX += (targetMouseX - currentMouseX) * 0.12;
      currentMouseY += (targetMouseY - currentMouseY) * 0.12;

      // Smooth spotlight fade
      const targetOpacity = mouseInside ? 1 : 0;
      spotlightOpacity += (targetOpacity - spotlightOpacity) * 0.08;

      // ── 1. Static Base Dot Grid ──
      if (baseGridCanvas) {
        ctx.drawImage(baseGridCanvas, 0, 0, width, height);
      }

      // ── 2. Interactive Radial Spotlight on Dot Grid ──
      if (spotlightOpacity > 0.01) {
        const startX = Math.max(gridSpacing / 2, Math.floor((currentMouseX - spotlightRadius) / gridSpacing) * gridSpacing + gridSpacing / 2);
        const endX = Math.min(width, Math.ceil((currentMouseX + spotlightRadius) / gridSpacing) * gridSpacing);
        const startY = Math.max(gridSpacing / 2, Math.floor((currentMouseY - spotlightRadius) / gridSpacing) * gridSpacing + gridSpacing / 2);
        const endY = Math.min(height, Math.ceil((currentMouseY + spotlightRadius) / gridSpacing) * gridSpacing);

        for (let gx = startX; gx <= endX; gx += gridSpacing) {
          for (let gy = startY; gy <= endY; gy += gridSpacing) {
            const dist = Math.hypot(gx - currentMouseX, gy - currentMouseY);
            if (dist < spotlightRadius) {
              const intensity = (1 - dist / spotlightRadius) * spotlightOpacity;
              const dotAlpha = isDark ? intensity * 0.32 : intensity * 0.22;
              const radius = 0.85 + intensity * 0.9;

              ctx.beginPath();
              ctx.arc(gx, gy, radius, 0, Math.PI * 2);
              ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${dotAlpha})` : `rgba(15, 23, 42, ${dotAlpha})`;
              ctx.fill();
            }
          }
        }
      }

      // Helper to draw a constrained constellation mesh
      const drawCluster = (
        nodes: Node[],
        minX: number,
        maxX: number,
        minY: number,
        maxY: number,
        maxDist: number
      ) => {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          n.x += n.vx;
          n.y += n.vy;

          if (n.x < minX) { n.x = minX; n.vx *= -1; }
          if (n.x > maxX) { n.x = maxX; n.vx *= -1; }
          if (n.y < minY) { n.y = minY; n.vy *= -1; }
          if (n.y > maxY) { n.y = maxY; n.vy *= -1; }

          // Connect within cluster
          for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const d = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (d < maxDist) {
              const alpha = (1 - d / maxDist) * (isDark ? 0.25 : 0.16);
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.lineWidth = 0.8;
              ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(15, 23, 42, ${alpha})`;
              ctx.stroke();
            }
          }

          // Draw node point
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.55)" : "rgba(15, 23, 42, 0.45)";
          ctx.fill();
        }
      };

      // ── 3. Bottom-Left Architectural Constellation ──
      drawCluster(blNodes, 0, width * 0.26, height * 0.54, height, 100);

      // ── 4. Top-Right Architectural Constellation (Framing Avatar) ──
      drawCluster(trNodes, width * 0.70, width, 0, height * 0.48, 105);

      // ── 5. Interactive Center Nodes (Connects When Cursor is Near) ──
      for (let i = 0; i < freeNodes.length; i++) {
        const n = freeNodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > width) { n.x = width; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > height) { n.y = height; n.vy *= -1; }

        const distToMouse = Math.hypot(n.x - currentMouseX, n.y - currentMouseY);

        // Very faint baseline point, lights up near cursor
        let nodeAlpha = isDark ? 0.07 : 0.05;
        if (distToMouse < spotlightRadius && spotlightOpacity > 0.01) {
          nodeAlpha += (1 - distToMouse / spotlightRadius) * spotlightOpacity * (isDark ? 0.35 : 0.25);
        }

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${nodeAlpha})` : `rgba(15, 23, 42, ${nodeAlpha})`;
        ctx.fill();

        // Connect only when inside spotlight
        if (distToMouse < spotlightRadius && spotlightOpacity > 0.01) {
          if (distToMouse < 120) {
            const cursorLineAlpha = (1 - distToMouse / 120) * spotlightOpacity * (isDark ? 0.20 : 0.14);
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(currentMouseX, currentMouseY);
            ctx.lineWidth = 0.75;
            ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${cursorLineAlpha})` : `rgba(15, 23, 42, ${cursorLineAlpha})`;
            ctx.stroke();
          }

          for (let j = i + 1; j < freeNodes.length; j++) {
            const n2 = freeNodes[j];
            const distToMouse2 = Math.hypot(n2.x - currentMouseX, n2.y - currentMouseY);
            if (distToMouse2 < spotlightRadius) {
              const dBetween = Math.hypot(n.x - n2.x, n.y - n2.y);
              if (dBetween < 100) {
                const avgDist = (distToMouse + distToMouse2) / 2;
                const factor = (1 - avgDist / spotlightRadius) * spotlightOpacity;
                const lineAlpha = (1 - dBetween / 100) * factor * (isDark ? 0.20 : 0.14);

                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.lineWidth = 0.75;
                ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${lineAlpha})` : `rgba(15, 23, 42, ${lineAlpha})`;
                ctx.stroke();
              }
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      parentSection.removeEventListener("mousemove", handleMouseMove as EventListener);
      parentSection.removeEventListener("mouseenter", handleMouseEnter as EventListener);
      parentSection.removeEventListener("mouseleave", handleMouseLeave as EventListener);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ── Content-Aligned Top-Left Dot Matrix ── */}
      <div className="relative mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="absolute top-10 -left-1 hidden xl:grid grid-cols-4 gap-2.5 opacity-55 dark:opacity-35 pointer-events-none">
          {[...Array(16)].map((_, idx) => (
            <span key={idx} className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-zinc-600" />
          ))}
        </div>
      </div>

      {/* ── Monochromatic Canvas (Dot Grid, Dual Constellations & Cursor Spotlight) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
    </div>
  );
}
