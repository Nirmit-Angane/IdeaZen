import { useEffect, useRef } from 'react';

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulsePhase: number;
      pulseSpeed: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 4 + 2;
        
        const colors = ['#7C6CF6', '#22D3EE', '#1F3C88', '#22C55E'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        this.pulsePhase += this.pulseSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        const currentRadius = this.radius * (0.8 + pulse * 0.4);

        // Outer glow
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentRadius * 3);
        gradient.addColorStop(0, this.color + '40');
        gradient.addColorStop(1, this.color + '00');
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius * 3, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.8 + pulse * 0.2;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    // Create nodes in layers
    const layers = 4;
    const nodesPerLayer = 6;
    const nodes: Node[] = [];

    for (let layer = 0; layer < layers; layer++) {
      const x = (canvas.width / (layers + 1)) * (layer + 1);
      for (let i = 0; i < nodesPerLayer; i++) {
        const y = (canvas.height / (nodesPerLayer + 1)) * (i + 1);
        // Add some randomness to positions
        const offsetX = (Math.random() - 0.5) * 60;
        const offsetY = (Math.random() - 0.5) * 40;
        nodes.push(new Node(x + offsetX, y + offsetY));
      }
    }

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.01;

      // Draw connections first (so they appear behind nodes)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Only connect nearby nodes
          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.15;
            
            // Animate some connections
            const pulse = Math.sin(time + i * 0.5) * 0.5 + 0.5;
            const finalOpacity = opacity * (0.5 + pulse * 0.5);

            // Gradient line
            const gradient = ctx.createLinearGradient(
              nodes[i].x, nodes[i].y,
              nodes[j].x, nodes[j].y
            );
            gradient.addColorStop(0, nodes[i].color);
            gradient.addColorStop(1, nodes[j].color);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = finalOpacity;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Update and draw nodes
      nodes.forEach(node => {
        node.update(canvas.width, canvas.height);
        node.draw(ctx);
      });

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
      style={{ opacity: 0.4 }}
    />
  );
}
