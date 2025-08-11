import React, { useRef, useEffect } from 'react';

const WavesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas non trovato');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Context 2D non disponibile');
      return;
    }

    console.log('WavesBackground inizializzato');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('Canvas ridimensionato:', canvas.width, 'x', canvas.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const lineColor = '#ffffff'; // Bianco per visibilità
    const backgroundColor = 'transparent'; // Sfondo trasparente per non coprire la foto hero

    // --- INIZIO CODICE CORRETTO ---
    class WaveLine {
      private canvas: HTMLCanvasElement;
      private ctx: CanvasRenderingContext2D;
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

      constructor(
        canvas: HTMLCanvasElement,
        ctx: CanvasRenderingContext2D,
        options: {
          y?: number;
          amplitude?: number;
          wavelength?: number;
          phase?: number;
          lineWidth?: number;
          speed?: number;
          opacity?: number;
        }
      ) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.y = options.y || Math.random() * this.canvas.height;
        this.amplitude = options.amplitude || 30 + Math.random() * 80;
        this.wavelength = options.wavelength || 100 + Math.random() * 300;
        this.frequency = (Math.PI * 2) / this.wavelength;
        this.phase = options.phase || Math.random() * Math.PI * 2;
        this.lineWidth = options.lineWidth || 0.8 + Math.random() * 0.8; // Spessore leggero
        this.speed = options.speed || 0.002 + Math.random() * 0.008;
        this.opacity = options.opacity || 0.15 + Math.random() * 0.15; // Opacità leggera
        this.segments = [];
        this.segmentLength = 2;

        for (
          let x = 0;
          x < this.canvas.width + this.segmentLength;
          x += this.segmentLength
        ) {
          this.segments.push({
            x: x,
            y:
              this.y +
              Math.sin(this.frequency * x + this.phase) * this.amplitude,
          });
        }
      }

      update() {
        this.phase += this.speed;
        for (let i = 0; i < this.segments.length; i++) {
          this.segments[i].y =
            this.y +
            Math.sin(this.frequency * this.segments[i].x + this.phase) *
              this.amplitude;
        }
      }

      draw() {
        this.ctx.beginPath();
        this.ctx.strokeStyle = lineColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.globalAlpha = this.opacity;
        this.ctx.moveTo(this.segments[0].x, this.segments[0].y);
        for (let i = 1; i < this.segments.length; i++) {
          this.ctx.lineTo(this.segments[i].x, this.segments[i].y);
        }
        this.ctx.stroke();
        this.ctx.globalAlpha = 1;
      }
    }

    const waveGroups: WaveLine[] = [];

    // Calcolo altezza hero (circa 100vh - altezza schermo)
    const heroHeight = window.innerHeight;
    const startY = heroHeight * 0.6; // Le onde iniziano dal 60% dell'altezza hero
    const availableHeight = canvas.height - startY; // Altezza disponibile per le onde

    // Gruppo 1 - onde distribuite uniformemente nella parte superiore
    for (let i = 0; i < 12; i++) {
      waveGroups.push(
        new WaveLine(canvas, ctx, { // Passa canvas e ctx
          y: startY + (availableHeight * 0.1) + (i * availableHeight * 0.05), // Distribuite uniformemente
          amplitude: 15 + i * 1.2, // Ampiezza molto ridotta
          wavelength: 1000 + i * 50,
          phase: i * 0.3,
          lineWidth: 0.4, // Spessore molto sottile
          speed: 0.0015,
          opacity: 0.08, // Opacità molto leggera
        })
      );
    }

    // Gruppo 2 - onde distribuite nella parte centrale
    for (let i = 0; i < 15; i++) {
      waveGroups.push(
        new WaveLine(canvas, ctx, { // Passa canvas e ctx
          y: startY + (availableHeight * 0.4) + (i * availableHeight * 0.03), // Distribuite nella parte centrale
          amplitude: 12 - i * 0.2, // Ampiezza ancora più ridotta
          wavelength: 800 + i * 40,
          phase: i * 0.2 + Math.PI,
          lineWidth: 0.3, // Spessore ultra sottile
          speed: 0.002,
          opacity: 0.06, // Opacità ultra leggera
        })
      );
    }

    // Gruppo 3 - onde distribuite nella parte inferiore
    for (let i = 0; i < 10; i++) {
      waveGroups.push(
        new WaveLine(canvas, ctx, { // Passa canvas e ctx
          y: startY + (availableHeight * 0.7) + (i * availableHeight * 0.04), // Distribuite nella parte inferiore
          amplitude: 10 + i * 0.8, // Ampiezza minima
          wavelength: 1200 - i * 30,
          phase: i * 0.25 + Math.PI / 2,
          lineWidth: 0.25, // Spessore minimo
          speed: 0.001,
          opacity: 0.05, // Opacità minima
        })
      );
    }
    // --- FINE CODICE CORRETTO ---

    console.log('Onde create:', waveGroups.length, 'iniziando da Y:', startY, 'altezza disponibile:', availableHeight);

    let animationFrameId: number;
    const animate = () => {
      if (!ctx || !canvas) return;

      // Non riempiamo lo sfondo per non coprire la foto hero
      // ctx.fillStyle = backgroundColor;
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveGroups.forEach((wave) => {
        wave.update();
        wave.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    console.log('Animazione avviata');

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      console.log('WavesBackground cleanup');
    };
  }, []);

  const canvasStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0, // Mantenuto a 0 per essere sopra la foto hero
    pointerEvents: 'none',
    // Rimosso il bordo di debug
  };

  return <canvas id="wavesBg" ref={canvasRef} style={canvasStyle} />;
};

export default WavesBackground;
