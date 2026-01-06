import React, { useEffect, useRef } from 'react';

const Background = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.3)' : 'rgba(188, 19, 254, 0.3)';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        const init = () => {
            resize();
            particles = [];
            for (let i = 0; i < 50; i++) {
                particles.push(new Particle());
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Gradient Mesh manually or assume CSS handles main blobs
            // This is just for subtle sparkles

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            requestAnimationFrame(animate);
        };

        init();
        window.addEventListener('resize', resize);
        animate();

        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <div className="fixed inset-0 -z-10 bg-[#050505] overflow-hidden pointer-events-none">
            {/* CSS Gradients for Ambient Light */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]" />

            {/* Canvas for Particles */}
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>
    );
};

export default Background;
