import { useEffect, useRef } from 'react';

export function AIParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      pulseSpeed: number;
      pulsePhase: number;

      constructor(canvasWidth: number, canvasHeight: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        
        // IdeaZen colors
        const colors = [
          '#7C6CF6', // AI Purple
          '#22D3EE', // Match Cyan
          '#1F3C88', // Deep Blue
          '#22C55E', // Success Green
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.5 + 0.3;
        this.pulseSpeed = Math.random() * 0.02 + 0.01;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off edges
        if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;

        // Pulse effect
        this.pulsePhase += this.pulseSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulseFactor = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        const currentSize = this.size * (0.7 + pulseFactor * 0.6);
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity * (0.6 + pulseFactor * 0.4);
        ctx.fill();
        
        // Glow effect
        ctx.globalAlpha = (this.opacity * 0.3) * pulseFactor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.globalAlpha = 1;
      }
    }

    // Connection line class
    class Connection {
      from: Particle;
      to: Particle;
      opacity: number;

      constructor(from: Particle, to: Particle) {
        this.from = from;
        this.to = to;
        this.opacity = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const dx = this.to.x - this.from.x;
        const dy = this.to.y - this.from.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          this.opacity = (1 - distance / 150) * 0.3;
          
          const gradient = ctx.createLinearGradient(
            this.from.x, this.from.y,
            this.to.x, this.to.y
          );
          gradient.addColorStop(0, this.from.color);
          gradient.addColorStop(1, this.to.color);
          
          ctx.beginPath();
          ctx.moveTo(this.from.x, this.from.y);
          ctx.lineTo(this.to.x, this.to.y);
          ctx.strokeStyle = gradient;
          ctx.globalAlpha = this.opacity;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    }

    // Create particles
    const particleCount = 50;
    const particles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const connection = new Connection(particles[i], particles[j]);
          connection.draw(ctx);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}
