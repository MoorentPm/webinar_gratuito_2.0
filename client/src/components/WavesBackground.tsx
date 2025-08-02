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
    
    // Aggiungiamo un observer per ridimensionare il canvas se il contenuto della pagina cambia
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if(canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // MODIFICA: Colore delle linee molto più chiaro
    const lineColor = '#E5E7EB'; // Grigio chiaro

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
        this.y = options.y || Math.random() * canvas.height;
        // MODIFICA: Ampiezza ridotta per onde più piatte
        this.amplitude = options.amplitude || (10 + Math.random() * 40);
        this.wavelength = options.wavelength || (200 + Math.random() * 400);
        this.frequency = Math.PI * 2 / this.wavelength;
        this.phase = options.phase || Math.random() * Math.PI * 2;
        // MODIFICA: Linee più sottili
        this.lineWidth = options.lineWidth || (0.2 + Math.random() * 0.3);
        this.speed = options.speed || (0.001 + Math.random() * 0.004);
        // MODIFICA: Opacità più bassa per un effetto più leggero
        this.opacity = options.opacity || (0.4 + Math.random() * 0.5);
        this.segments = [];
        this.segmentLength = 5;

        for (let x = 0; x < canvas.width + this.segmentLength; x += this.segmentLength) {
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
        ctx.globalAlpha = 1;
      }
    }

    // MODIFICA: Meno onde per un effetto più pulito
    const waveGroups: WaveLine[] = [];
    const numWaves = 25; 
    for (let i = 0; i < numWaves; i++) {
        waveGroups.push(new WaveLine({
            y: (canvas.height / numWaves) * i,
        }));
    }

    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waveGroups.forEach(wave => {
        wave.update();
        wave.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="wavesBg" ref={canvasRef} />;
};

export default WavesBackground;
