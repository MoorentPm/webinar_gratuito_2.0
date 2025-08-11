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

    // Colore delle linee - bianco per massima visibilità
    const lineColor = '#ffffff';

    // Classe semplificata per le linee ondulate
    class WaveLine {
      y: number;
      amplitude: number;
      wavelength: number;
      frequency: number;
      phase: number;
      lineWidth: number;
      speed: number;
      opacity: number;

      constructor(y: number) {
        this.y = y;
        this.amplitude = 30 + Math.random() * 50;
        this.wavelength = 200 + Math.random() * 400;
        this.frequency = Math.PI * 2 / this.wavelength;
        this.phase = Math.random() * Math.PI * 2;
        this.lineWidth = 2.0; // Spessore fisso per visibilità
        this.speed = 0.002;
        this.opacity = 0.8; // Opacità alta per visibilità
      }

      update() {
        this.phase += this.speed;
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = this.lineWidth;
        ctx.globalAlpha = this.opacity;

        // Disegna una singola onda
        for (let x = 0; x < canvas.width; x += 2) {
          const y = this.y + Math.sin(this.frequency * x + this.phase) * this.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    // Crea poche onde semplici
    const waves = [
      new WaveLine(canvas.height * 0.3),
      new WaveLine(canvas.height * 0.5),
      new WaveLine(canvas.height * 0.7),
    ];

    console.log('🌊 Onde create:', waves.length);

    // Funzione di animazione semplificata
    function animate() {
      if (!ctx || !canvas) return;
      
      // Pulisci il canvas
      ctx.fillStyle = '#1a1616';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Aggiorna e disegna tutte le onde
      waves.forEach(wave => {
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
        zIndex: -1,
      }}>
        ERRORE: {error}
      </div>
    );
  }

  return (
    <canvas 
      id="wavesBg" 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        backgroundColor: '#1a1616',
        border: '5px solid red', // Bordo rosso più spesso per debug
      }} 
    />
  );
};

export default WavesBackground;
