import React, { useRef, useEffect } from 'react';
import './FancyEffect.css';

const FancyEffect = () => {
    const canvasRef = useRef(null);
    const pointsRef = useRef([]);
    const requestRef = useRef();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const addPoint = (x, y) => {
            pointsRef.current.push({ x, y, age: 0 });
        };

        const updatePoints = () => {
            pointsRef.current.forEach((point, index) => {
                point.age += 1;
                if (point.age > 50) {
                    pointsRef.current.splice(index, 1);
                }
            });
        };

        const drawPoints = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';

            for (let i = 0; i < pointsRef.current.length - 1; i++) {
                const point = pointsRef.current[i];
                const nextPoint = pointsRef.current[i + 1];
                const age = point.age / 50;

                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(nextPoint.x, nextPoint.y);
                ctx.globalAlpha = 1 - age;
                ctx.stroke();

                // Add spreading effect
                ctx.beginPath();
                ctx.arc(point.x, point.y, 20 * age, 0, 2 * Math.PI);
                ctx.globalAlpha = 0.1 * (1 - age);
                ctx.fillStyle = '#00ffff';
                ctx.fill();
            }
        };

        const animate = () => {
            updatePoints();
            drawPoints();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            addPoint(e.clientX, e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="fancy-effect-canvas" />;
};

export default FancyEffect;

