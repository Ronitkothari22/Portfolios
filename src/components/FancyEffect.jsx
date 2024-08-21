// import React, { useRef, useEffect } from 'react';
// import './FancyEffect.css';

// const FancyEffect = () => {
//     const canvasRef = useRef(null);
//     const pointsRef = useRef([]);
//     const requestRef = useRef();

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext('2d');
//         let animationFrameId;

//         const resizeCanvas = () => {
//             canvas.width = window.innerWidth;
//             canvas.height = window.innerHeight;
//         };

//         const addPoint = (x, y) => {
//             pointsRef.current.push({ x, y, age: 0 });
//         };

//         const updatePoints = () => {
//             pointsRef.current.forEach((point, index) => {
//                 point.age += 1;
//                 if (point.age > 50) {
//                     pointsRef.current.splice(index, 1);
//                 }
//             });
//         };

//         const drawPoints = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);
//             ctx.strokeStyle = '#00ffff';
//             ctx.lineWidth = 2;
//             ctx.lineCap = 'round';

//             for (let i = 0; i < pointsRef.current.length - 1; i++) {
//                 const point = pointsRef.current[i];
//                 const nextPoint = pointsRef.current[i + 1];
//                 const age = point.age / 50;

//                 ctx.beginPath();
//                 ctx.moveTo(point.x, point.y);
//                 ctx.lineTo(nextPoint.x, nextPoint.y);
//                 ctx.globalAlpha = 1 - age;
//                 ctx.stroke();

//                 // Add spreading effect
//                 ctx.beginPath();
//                 ctx.arc(point.x, point.y, 20 * age, 0, 2 * Math.PI);
//                 ctx.globalAlpha = 0.1 * (1 - age);
//                 ctx.fillStyle = '#00ffff';
//                 ctx.fill();
//             }
//         };

//         const animate = () => {
//             updatePoints();
//             drawPoints();
//             animationFrameId = requestAnimationFrame(animate);
//         };

//         const handleMouseMove = (e) => {
//             addPoint(e.clientX, e.clientY);
//         };

//         window.addEventListener('mousemove', handleMouseMove);
//         window.addEventListener('resize', resizeCanvas);
//         resizeCanvas();
//         animate();

//         return () => {
//             window.removeEventListener('mousemove', handleMouseMove);
//             window.removeEventListener('resize', resizeCanvas);
//             cancelAnimationFrame(animationFrameId);
//         };
//     }, []);

//     return <canvas ref={canvasRef} className="fancy-effect-canvas" />;
// };

// export default FancyEffect;
import React, { useRef, useEffect } from 'react';
import './FancyEffect.css';

const FancyEffect = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let running = true;
    let animationFrameId;

    const AnimationFeature = {
      friction: 0.5,
      trails: 20,
      size: 40,
      dampening: 0.2,
      tension: 0.98,
    };

    const cursorPosition = { x: 0, y: 0 };

    class NewNode {
      constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
      }
    }

    class Line {
      constructor(spring) {
        this.spring = spring + 0.1 * Math.random() - 0.05;
        this.friction = AnimationFeature.friction + 0.01 * Math.random() - 0.005;
        this.nodes = Array(AnimationFeature.size).fill().map(() => new NewNode());
      }

      update() {
        let e = this.spring;
        let t = this.nodes[0];
        t.vx += (cursorPosition.x - t.x) * e;
        t.vy += (cursorPosition.y - t.y) * e;
        for (let i = 0, a = this.nodes.length; i < a; i++) {
          t = this.nodes[i];
          if (i > 0) {
            const n = this.nodes[i - 1];
            t.vx += (n.x - t.x) * e;
            t.vy += (n.y - t.y) * e;
            t.vx += n.vx * AnimationFeature.dampening;
            t.vy += n.vy * AnimationFeature.dampening;
          }
          t.vx *= this.friction;
          t.vy *= this.friction;
          t.x += t.vx;
          t.y += t.vy;
          e *= AnimationFeature.tension;
        }
      }

      draw() {
        let n = this.nodes[0].x;
        let i = this.nodes[0].y;
        ctx.beginPath();
        ctx.moveTo(n, i);
        for (let a = 1, o = this.nodes.length - 2; a < o; a++) {
          const e = this.nodes[a];
          const t = this.nodes[a + 1];
          n = 0.5 * (e.x + t.x);
          i = 0.5 * (e.y + t.y);
          ctx.quadraticCurveTo(e.x, e.y, n, i);
        }
        const e = this.nodes[this.nodes.length - 2];
        const t = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    let newLines = [];

    const renderAnimation = () => {
      if (running) {
        ctx.globalCompositeOperation = 'source-over';
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = '#a66cff';
        ctx.lineWidth = 1;
        for (let t = 0; t < AnimationFeature.trails; t++) {
          if (newLines[t]) {
            newLines[t].update();
            newLines[t].draw();
          }
        }
        animationFrameId = window.requestAnimationFrame(renderAnimation);
      }
    };

    const move = (event) => {
      cursorPosition.x = event.clientX;
      cursorPosition.y = event.clientY;
      event.preventDefault();
    };

    const onMouseMove = (e) => {
      newLines = [];
      for (let i = 0; i < AnimationFeature.trails; i++) {
        newLines.push(new Line(0.45 + (i / AnimationFeature.trails) * 0.025));
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.addEventListener('mousemove', move);
      move(e);
      renderAnimation();
    };

    const resizeCanvas = () => {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      running = false;
      window.cancelAnimationFrame(animationFrameId);
      document.removeEventListener('mousemove', move);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="fancy-effect-canvas" />;
};

export default FancyEffect;
