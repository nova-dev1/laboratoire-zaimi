"use client";
import { useEffect, useRef } from "react";

interface Star {
    x: number;
    y: number;
    z: number;
    size: number;
    opacity: number;
    twinkleSpeed: number;
    twinkleOffset: number;
    color: string;
}

export default function StarField() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const colors = [
            "#ffffff",
            "#E8F0FF",
            "#B8A9FF",
            "#6C8EFF",
            "#c8d8ff",
        ];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Create stars
        const stars: Star[] = Array.from({ length: 280 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            z: Math.random() * 3 + 0.5,
            size: Math.random() * 2.5 + 0.3,
            opacity: Math.random() * 0.7 + 0.3,
            twinkleSpeed: Math.random() * 0.02 + 0.005,
            twinkleOffset: Math.random() * Math.PI * 2,
            color: colors[Math.floor(Math.random() * colors.length)],
        }));

        // Mouse parallax
        let mouseX = 0;
        let mouseY = 0;
        const handleMouse = (e: MouseEvent) => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener("mousemove", handleMouse);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 0.016;

            stars.forEach((star) => {
                // Parallax offset based on depth
                const px = star.x + mouseX * star.z * 12;
                const py = star.y + mouseY * star.z * 12;

                // Twinkle
                const twinkle =
                    Math.sin(time * star.twinkleSpeed * 60 + star.twinkleOffset) * 0.4 + 0.6;
                const finalOpacity = star.opacity * twinkle;

                // Glow for bigger stars
                if (star.size > 1.5) {
                    const gradient = ctx.createRadialGradient(px, py, 0, px, py, star.size * 4);
                    gradient.addColorStop(0, star.color.replace(")", `, ${finalOpacity})`).replace("rgb", "rgba").replace("#", "rgba(").replace("rgba(", "rgba(").replace(/rgba\(([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/, (_, r, g, b) => `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(b, 16)}`));
                    gradient.addColorStop(1, "transparent");
                    ctx.beginPath();
                    ctx.arc(px, py, star.size * 4, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }

                // Core star dot
                ctx.beginPath();
                ctx.arc(px, py, star.size, 0, Math.PI * 2);
                ctx.globalAlpha = finalOpacity;
                ctx.fillStyle = star.color;
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}