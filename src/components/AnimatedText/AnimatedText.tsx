'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const SPEED = 4;
const FONT_SIZE = 32;
const PARTICLE_SIZE = FONT_SIZE / 8; // Make particle size proportional to font size
const TEXT = 'Creative services';

class Particle {
  targetX: number;
  targetY: number;
  x: number;
  y: number;
  lastUpdate: number;

  constructor(targetX: number, targetY: number, x: number, y: number) {
    this.targetX = targetX;
    this.targetY = targetY;
    this.x = x;
    this.y = y;
    this.lastUpdate = 0;
  }

  update(time: number) {
    if (this.lastUpdate === 0) {
      this.lastUpdate = time;
    } else {
      const dx = this.targetX - this.x;
      const dy = this.targetY - this.y;
      if (dx !== 0) {
        if (dx > -2 && dx < 2) {
          this.x = this.targetX;
        } else {
          this.x += dx / SPEED;
        }
      }
      if (dy !== 0) {
        if (dy > -2 && dy < 2) {
          this.y = this.targetY;
        } else {
          this.y += dy / SPEED;
        }
      }
    }
  }
}

export default function AnimatedText() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const offscreenCanvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current || !offscreenCanvasRef.current) return;

    const container = containerRef.current;
    const offscreenCanvas = offscreenCanvasRef.current;
    const offscreenCtx = offscreenCanvas.getContext('2d');
    if (!offscreenCtx) return;

    // Calculate container dimensions
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Set up offscreen canvas with larger dimensions to ensure text fits
    offscreenCtx.font = 'bold 32px serif';
    offscreenCtx.textBaseline = 'middle';
    offscreenCtx.textAlign = 'center';

    const textMetrics = offscreenCtx.measureText(TEXT);
    const textWidth = Math.ceil(textMetrics.width);
    const textHeight = Math.ceil(
      textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
    );

    // Make canvas larger than text to ensure proper centering
    offscreenCanvas.width = textWidth * 1.2; // Add 20% padding
    offscreenCanvas.height = textHeight * 1.2;

    // Calculate scale to fit
    const scaleX =
      (containerWidth * 0.8) / (offscreenCanvas.width * PARTICLE_SIZE);
    const scaleY =
      (containerHeight * 0.8) / (offscreenCanvas.height * PARTICLE_SIZE);
    const newScale = Math.min(scaleX, scaleY, 1);
    setScale(newScale);

    // Draw text centered in the canvas
    offscreenCtx.font = 'bold 32px serif';
    offscreenCtx.textBaseline = 'middle';
    offscreenCtx.textAlign = 'center';
    offscreenCtx.fillText(
      TEXT,
      offscreenCanvas.width / 2,
      offscreenCanvas.height / 2
    );

    // Get pixel data
    const imageData = offscreenCtx.getImageData(
      0,
      0,
      offscreenCanvas.width,
      offscreenCanvas.height
    );
    const newParticles: Particle[] = [];

    // Create particles from pixel data
    for (let i = 0; i < imageData.data.length; i += 4) {
      const x = (i % (offscreenCanvas.width * 4)) / 4;
      const y = Math.floor(i / (offscreenCanvas.width * 4));
      const alpha = imageData.data[i + 3];

      if (alpha > 64) {
        const randX =
          Math.random() > 0.5
            ? -Math.random() * offscreenCanvas.width
            : Math.random() * offscreenCanvas.width;
        const randY =
          Math.random() > 0.5
            ? -Math.random() * offscreenCanvas.height
            : Math.random() * offscreenCanvas.height;

        newParticles.push(
          new Particle(x, y, randX * PARTICLE_SIZE, randY * PARTICLE_SIZE)
        );
      }
    }

    setParticles(newParticles);

    // Calculate offset to center the text
    const offsetX =
      (containerWidth - offscreenCanvas.width * PARTICLE_SIZE * newScale) / 2;
    const offsetY =
      (containerHeight - offscreenCanvas.height * PARTICLE_SIZE * newScale) / 2;
    setOffset({ x: offsetX, y: offsetY });

    // Animation function
    function animate(t: number) {
      newParticles.forEach((particle) => {
        particle.update(t);
      });
      setParticles([...newParticles]);
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    animate(performance.now());

    // Handle resize
    const handleResize = () => {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      const scaleX =
        (containerWidth * 0.8) / (offscreenCanvas.width * PARTICLE_SIZE);
      const scaleY =
        (containerHeight * 0.8) / (offscreenCanvas.height * PARTICLE_SIZE);
      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);

      const offsetX =
        (containerWidth - offscreenCanvas.width * PARTICLE_SIZE * newScale) / 2;
      const offsetY =
        (containerHeight - offscreenCanvas.height * PARTICLE_SIZE * newScale) /
        2;
      setOffset({ x: offsetX, y: offsetY });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='relative w-full h-full flex items-center justify-center'
    >
      <canvas ref={offscreenCanvasRef} className='hidden' />
      <div
        className='relative'
        style={{
          width: 'fit-content',
          height: 'fit-content',
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          position: 'absolute',
          left: offset.x,
          top: offset.y,
        }}
      >
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            className='absolute text-black font-bold'
            style={{
              left: particle.x * PARTICLE_SIZE,
              top: particle.y * PARTICLE_SIZE,
              fontSize: `${PARTICLE_SIZE}px`,
              lineHeight: `${PARTICLE_SIZE}px`,
            }}
          >
            X
          </motion.div>
        ))}
      </div>
    </div>
  );
}
