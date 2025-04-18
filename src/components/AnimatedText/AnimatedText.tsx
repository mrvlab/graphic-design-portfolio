'use client';

import { useEffect, useRef } from 'react';

const SPEED = 12;
const PARTICLE_SIZE = 20;
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
        this.x = dx > -2 && dx < 2 ? this.targetX : this.x + dx / SPEED;
      }
      if (dy !== 0) {
        this.y = dy > -2 && dy < 2 ? this.targetY : this.y + dy / SPEED;
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillText('X', this.x * PARTICLE_SIZE, this.y * PARTICLE_SIZE);
  }
}

export default function AnimatedText() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create offscreen canvas for text measurement
    const offScreenCanvas = document.createElement('canvas');
    const offScreenCTX = offScreenCanvas.getContext('2d');
    if (!offScreenCTX) return;

    offScreenCTX.font = 'bold 48px serif';
    offScreenCTX.textBaseline = 'top';
    const textMetrics = offScreenCTX.measureText(TEXT);
    const textWidth = Math.ceil(textMetrics.width);
    const textHeight = Math.ceil(
      textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent
    );

    // Set canvas dimensions
    canvas.width = textWidth * PARTICLE_SIZE;
    canvas.height = textHeight * PARTICLE_SIZE;
    offScreenCanvas.width = textWidth;
    offScreenCanvas.height = textHeight;

    // Draw text on offscreen canvas
    offScreenCTX.font = 'bold 48px serif';
    offScreenCTX.fillText(TEXT, 0, textHeight);

    // Get pixel data and create particles
    const imageData = offScreenCTX.getImageData(0, 0, textWidth, textHeight);
    const particles: Particle[] = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
      const x = (i % (textWidth * 4)) / 4;
      const y = Math.floor(i / (textWidth * 4));
      const randX =
        Math.random() > 0.5
          ? -Math.random() * textWidth
          : Math.random() * textWidth;
      const randY =
        Math.random() > 0.5
          ? -Math.random() * textHeight
          : Math.random() * textHeight;
      const alpha = imageData.data[i + 3];
      if (alpha > 64) {
        particles.push(
          new Particle(x, y, randX * PARTICLE_SIZE, randY * PARTICLE_SIZE)
        );
      }
    }
    particlesRef.current = particles;

    // Animation function
    function animate(t: number) {
      if (!ctx || !canvas) return;

      ctx.fillStyle = 'black';
      ctx.font = 'bold 12px serif';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update(t);
        particle.draw(ctx);
      });
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Start animation
    const startTime = performance.now();
    animate(startTime);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className='relative w-full h-full flex items-center justify-center'>
      <canvas
        ref={canvasRef}
        className='block max-w-full max-h-full'
        style={{ background: 'transparent' }}
      />
    </div>
  );
}
