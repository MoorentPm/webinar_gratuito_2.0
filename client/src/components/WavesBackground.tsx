import React, { useRef, useEffect } from 'react';

const WavesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Funzione per ridimensionare il canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Colore delle linee
    const lineColor = '#d6c4bf';

    // Classe per creare le linee ondulate
    class WaveLine {
      x: number;
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
        this.x = 0;
        this.y = options.y || Math.random() * canvas.height;
        this.amplitude = options.amplitude || (30 + Math.random() * 80);
        this.wavelength = options.wavelength || (100 + Math.random() * 300);
        this.frequency = Math.PI * 2 / this.wavelength;
        this.phase = options.phase || Math.random() * Math.PI * 2;
        this.lineWidth = options.lineWidth || (0.2 + Math.random() * 0.6);
        this.speed = options.speed || (0.002 + Math.random() * 0.008);
        this.opacity = options.opacity || (0.1 + Math.random() * 0.3);
        this.segments = [];
        this.segmentLength = 2;

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

    // Crea i gruppi di onde
    const waveGroups: WaveLine[] = [];
    // Gruppo 1
    for (let i = 0; i < 15; i++) {
        waveGroups.push(new WaveLine({
            y: canvas.height * 0.3 + i * 10,
            amplitude: 40 + i * 2,
            wavelength: 1200 + i * 10,
            phase: i * 0.2,
            lineWidth: 0.4,
            speed: 0.002,
            opacity: 0.15
        }));
    }
    // Gruppo 2
    for (let i = 0; i < 20; i++) {
        waveGroups.push(new WaveLine({
            y: canvas.height * 0.5 + i * 8,
            amplitude: 35 - i * 0.5,
            wavelength: 800 + i * 50,
            phase: i * 0.1 + Math.PI,
            lineWidth: 0.5,
            speed: 0.003,
            opacity: 0.25
        }));
    }
    // Gruppo 3
    for (let i = 0; i < 15; i++) {
        waveGroups.push(new WaveLine({
            y: canvas.height * 0.7 + i * 12,
            amplitude: 30 + i * 1.5,
            wavelength: 1000 - i * 20,
            phase: i * 0.15 + Math.PI / 2,
            lineWidth: 0.4,
            speed: 0.0015,
            opacity: 0.2
        }));
    }

    // Funzione di animazione
    let animationFrameId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      waveGroups.forEach(wave => {
        wave.update();
        wave.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    // Pulisce l'animazione e l'event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // L'array vuoto assicura che l'effetto venga eseguito solo una volta

  return <canvas id="wavesBg" ref={canvasRef} />;
};

export default WavesBackground;
