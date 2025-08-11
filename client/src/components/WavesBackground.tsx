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
    const startY = heroHeight * 0.8; // Le onde iniziano dall'80% dell'altezza hero

    // Gruppo 1 - onde più leggere, posizionate dopo la sezione hero
    for (let i = 0; i < 15; i++) {
      waveGroups.push(
        new WaveLine(canvas, ctx, { // Passa canvas e ctx
          y: startY + i * 8, // Posizionate dopo la sezione hero
          amplitude: 25 + i * 1.5, // Ampiezza ridotta
          wavelength: 1200 + i * 10,
          phase: i * 0.2,
          lineWidth: 0.6, // Spessore molto leggero
          speed: 0.002,
          opacity: 0.12, // Opacità molto leggera
        })
      );
    }

    // Gruppo 2 - onde più leggere
    for (let i = 0; i < 20; i++) {
      waveGroups.push(
        new WaveLine(canvas, ctx, { // Passa canvas e ctx
          y: startY + 120 + i * 6, // Posizionate più in basso
          amplitude: 20 - i * 0.3, // Ampiezza ridotta
          wavelength: 800 + i * 50,
          phase: i * 0.1 + Math.PI,
          lineWidth: 0.7, // Spessore leggero
          speed: 0.003,
          opacity: 0.15, // Opacità leggera
        })
      );
    }

    // Gruppo 3 - onde più leggere
    for (let i = 0; i < 15; i++) {
      waveGroups.push(
        new WaveLine(canvas, ctx, { // Passa canvas e ctx
          y: startY + 240 + i * 10, // Posizionate ancora più in basso
          amplitude: 18 + i * 1.2, // Ampiezza ridotta
          wavelength: 1000 - i * 20,
          phase: i * 0.15 + Math.PI / 2,
          lineWidth: 0.5, // Spessore molto leggero
          speed: 0.0015,
          opacity: 0.1, // Opacità molto leggera
        })
      );
    }
    // --- FINE CODICE CORRETTO ---

    console.log('Onde create:', waveGroups.length, 'iniziando da Y:', startY);

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
