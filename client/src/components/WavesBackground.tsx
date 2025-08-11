import React, { useRef, useEffect, useState } from 'react';

const WavesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🚀 WavesBackground useEffect iniziato');
    
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('❌ Canvas non trovato');
      setError('Canvas non trovato');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('❌ Context 2D non disponibile');
      setError('Context 2D non disponibile');
      return;
    }

    console.log('✅ WavesBackground inizializzato');
    console.log('📐 Dimensioni canvas:', canvas.width, 'x', canvas.height);

    // Impostazione dimensioni canvas
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      console.log('📐 Canvas ridimensionato:', canvas.width, 'x', canvas.height);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Colore delle linee - identico al codice HTML
    const lineColor = '#d6c4bf';

    // Classe WaveLine identica al codice HTML
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

      constructor(options: {
        y?: number;
        amplitude?: number;
        wavelength?: number;
        phase?: number;
        lineWidth?: number;
        speed?: number;
        opacity?: number;
      }) {
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

        // Crea i punti della linea - identico al codice HTML
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

    // Crea gruppi di linee ondulate - IDENTICI al codice HTML
    const waveGroups: WaveLine[] = [];
    
    // Primo gruppo - parte alta del canvas (dopo la hero section)
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
    
    // Secondo gruppo - parte centrale del canvas
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
    
    // Terzo gruppo - parte bassa del canvas
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

    console.log('🌊 Onde create:', waveGroups.length);

    // Funzione di animazione - IDENTICA al codice HTML
    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Aggiorna e disegna tutte le linee ondulate
      waveGroups.forEach(wave => {
        wave.update();
        wave.draw();
      });
      
      requestAnimationFrame(animate);
    }

    // Avvia l'animazione
    animate();
    setIsInitialized(true);
    console.log('🎬 Animazione avviata');

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      console.log('🧹 WavesBackground cleanup');
    };
  }, []);

  // Fallback visibile se c'è un errore
  if (error) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#ff0000',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        zIndex: 0,
      }}>
        ERRORE: {error}
      </div>
    );
  }

  return (
    <>
      {/* Div noise come nel codice HTML originale */}
      <div 
        className="noise"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.015,
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      
      {/* Canvas per le onde - con z-index corretto */}
      <canvas 
        id="wavesBg" 
        ref={canvasRef} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1, // Tornato a -1 per essere sotto la hero page
          pointerEvents: 'none',
          backgroundColor: '#1a1616',
          border: '3px solid red', // Bordo rosso per debug
        }} 
      />
    </>
  );
};

export default WavesBackground;
