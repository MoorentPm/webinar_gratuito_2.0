import React, { useRef, useEffect } from 'react';

const WavesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.scrollHeight || window.innerHeight;
    };
    
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if(canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const lineColor = '#d6c4bf';

    class WaveLine {
      y: number;
      amplitude: number;
      wavelength: number;
      frequency: number;
      phase: number;
      lineWidth: number;
      speed: number;
      opacity: number;
      segments: { x: number; y: number }[];
      segmentLength: number;

      constructor(options: Partial<WaveLine>) {
        this.y = options.y || Math.random() * (canvas?.height || window.innerHeight);
        this.amplitude = options.amplitude || (30 + Math.random() * 80);
        this.wavelength = options.wavelength || (100 + Math.random() * 300);
        this.frequency = Math.PI * 2 / this.wavelength;
        this.phase = options.phase || Math.random() * Math.PI * 2;
        this.lineWidth = options.lineWidth || (0.2 + Math.random() * 0.6);
        this.speed = options.speed || (0.002 + Math.random() * 0.008);
        this.opacity = options.opacity || (0.1 + Math.random() * 0.3);
        this.segments = [];
        this.segmentLength = 2;

        for (let x = 0; x < (canvas?.width || window.innerWidth) + this.segmentLength; x += this.segmentLength) {
          this.segments.push({
            x: x,
            y: this.y + Math.sin(this.frequency * x + this.phase) * this.amplitude
          });
        }
      }

      update() {
        this.phase += this.speed;
        for (let i = 0; i < this.segments.length; i++) {
          this.segments[i].y = this.y + Math.sin(this.frequency * this.segments[i].x + this.phase) * this.amplitude;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.globalAlpha = this.opacity;
        ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length; i++) {
          ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        ctx.stroke();
      }
    }

    const waves: WaveLine[] = [];
    const numWaves = 15;

    for (let i = 0; i < numWaves; i++) {
      waves.push(new WaveLine({
        y: Math.random() * canvas.height,
        amplitude: 20 + Math.random() * 60,
        wavelength: 200 + Math.random() * 400,
        speed: 0.001 + Math.random() * 0.005,
        opacity: 0.05 + Math.random() * 0.15,
        lineWidth: 0.5 + Math.random() * 1
      }));
    }

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      waves.forEach(wave => {
        wave.update();
        wave.draw();
      });
      
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default WavesBackground;
