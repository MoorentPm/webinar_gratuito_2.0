import React, { useRef, useEffect } from 'react';
import Matter from 'matter-js';

const PhysicsBall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const matterInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof Matter === 'undefined') {
      console.error('Matter.js not loaded');
      return;
    }

    const { Engine, Render, Runner, World, Bodies, Body, Events } = Matter;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const engine = Engine.create();
    const world = engine.world;
    world.gravity.y = 1.2;

    const render = Render.create({
      canvas: canvas,
      engine: engine,
      options: {
        width: window.innerWidth,
        height: document.body.scrollHeight, // Altezza dell'intera pagina
        wireframes: false,
        background: 'transparent'
      }
    });

    const ball = Bodies.circle(window.innerWidth / 2, 40, 15, {
      restitution: 0.7,
      friction: 0.1,
      density: 0.05,
      render: {
        fillStyle: '#F3DFD9'
      }
    });

    // Aggiunge un pavimento in fondo alla pagina
    const ground = Bodies.rectangle(
        window.innerWidth / 2, 
        document.body.scrollHeight + 30, 
        window.innerWidth, 
        60, 
        { isStatic: true, render: { visible: false } }
    );

    World.add(world, [ball, ground]);

    const obstacles: Matter.Body[] = [];

    const createObstacles = () => {
      World.remove(world, obstacles);
      obstacles.length = 0;

      const elements = document.querySelectorAll('[data-obstacle]');
      
      elements.forEach(elem => {
        const rect = elem.getBoundingClientRect();
        const body = Bodies.rectangle(
          rect.left + rect.width / 2,
          rect.top + window.scrollY + rect.height / 2, // Posizione relativa al documento
          rect.width,
          rect.height,
          { 
            isStatic: true,
            render: { visible: false }
          }
        );
        obstacles.push(body);
      });

      World.add(world, obstacles);
    };

    // Funzione per aggiornare la visuale del renderer
    const updateRenderView = () => {
        Render.lookAt(render, {
            min: { x: 0, y: window.scrollY },
            max: { x: window.innerWidth, y: window.scrollY + window.innerHeight }
        });
    };

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = document.body.scrollHeight;
      createObstacles();
      updateRenderView();
    };
    
    // Ritarda l'inizializzazione per assicurarsi che il DOM sia pronto
    const init = () => {
        createObstacles();
        updateRenderView();
    };

    // Esegui l'init dopo un breve ritardo
    const initTimeout = setTimeout(init, 100);

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateRenderView);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine);

    matterInstance.current = { render, runner, engine, world };

    return () => {
      clearTimeout(initTimeout);
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world, false);
      Engine.clear(engine);
      render.canvas.remove();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateRenderView);
    };
  }, []);

  return <canvas ref={canvasRef} id="physics-canvas" />;
};

export default PhysicsBall;
