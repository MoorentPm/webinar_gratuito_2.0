import React, { useRef, useEffect } from 'react';
import Matter from 'matter-js';

const PhysicsBall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Controlla se Matter.js è stato caricato
    if (typeof Matter === 'undefined') {
      console.error('Matter.js not loaded');
      return;
    }

    const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Crea il motore fisico
    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 1.2; // Aumenta un po' la gravità

    // Crea il renderer che disegnerà sul canvas
    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: window.innerHeight,
        wireframes: false, // Mostra le forme piene
        background: 'transparent' // Sfondo trasparente
      }
    });

    // Crea la pallina
    const ball = Bodies.circle(window.innerWidth / 2, -50, 15, {
      restitution: 0.7, // Elasticità (rimbalzo)
      friction: 0.1,
      density: 0.05,
      render: {
        fillStyle: '#F3DFD9' // Colore rosa/beige
      }
    });
    World.add(world, ball);

    // Array per contenere gli ostacoli fisici
    const obstacles: Matter.Body[] = [];

    // Funzione per creare gli ostacoli basandosi sugli elementi HTML
    const createObstacles = () => {
      // Rimuove i vecchi ostacoli
      World.remove(world, obstacles);
      obstacles.length = 0;

      // Seleziona tutti gli elementi che devono essere "solidi"
      const elements = document.querySelectorAll('[data-obstacle]');
      
      elements.forEach(elem => {
        const rect = elem.getBoundingClientRect();
        const body = Bodies.rectangle(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          rect.width,
          rect.height,
          { 
            isStatic: true, // Li rende immobili
            render: { visible: false } // Non li disegna, vediamo solo gli elementi HTML
          }
        );
        obstacles.push(body);
      });

      World.add(world, obstacles);
    };

    // Gestione dello scroll
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollDelta = scrollY - lastScrollY;
      
      // Sposta la "visuale" del mondo fisico insieme allo scroll
      Body.translate(ball, { x: 0, y: -scrollDelta });
      obstacles.forEach(obstacle => {
        Body.translate(obstacle, { x: 0, y: -scrollDelta });
      });

      lastScrollY = scrollY;
    };

    // Aggiorna le dimensioni e le posizioni al resize della finestra
    const handleResize = () => {
      render.options.width = window.innerWidth;
      render.options.height = window.innerHeight;
      Render.setPixelRatio(render, window.devicePixelRatio);
      Render.setSize(render, window.innerWidth, window.innerHeight);
      createObstacles();
    };

    // Inizializzazione
    createObstacles();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Avvia il rendering e il motore fisico
    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Pulisce tutto quando il componente viene smontato
    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
      (render.canvas as any) = null;
      (render.context as any) = null;
      (render as any).textures = {};
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} id="physics-canvas" />;
};

export default PhysicsBall;
