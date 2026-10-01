import { prefersReducedMotion } from './html';

const COLORS: string[] = ['#f5b025', '#3ddc97', '#4aa8ff', '#c38bff', '#ff6b6b', '#5fd3c6'];

interface Particle {
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  rotation: number;
  spin: number;
  color: string;
}

/** Celebration burst drawn on a temporary full-page canvas. */
export class Confetti {
  public static burst(durationMs: number = 2600): void {
    if (prefersReducedMotion()) return;
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.className = 'confetti-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
    if (context === null) {
      canvas.remove();
      return;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 160; i++) {
      const angle: number = Math.random() * Math.PI - Math.PI;
      const speed: number = 6 + Math.random() * 10;
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.35,
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed - 2,
        size: 5 + Math.random() * 6,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.4,
        color: COLORS[i % COLORS.length],
      });
    }

    const start: number = performance.now();
    const frame = (now: number): void => {
      const elapsed: number = now - start;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.globalAlpha = Math.max(0, 1 - elapsed / durationMs);
      for (const particle of particles) {
        particle.speedY += 0.25;
        particle.speedX *= 0.99;
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.rotation += particle.spin;
        context.save();
        context.translate(particle.x, particle.y);
        context.rotate(particle.rotation);
        context.fillStyle = particle.color;
        context.fillRect(-particle.size / 2, -particle.size / 4, particle.size, particle.size / 2);
        context.restore();
      }
      if (elapsed < durationMs) window.requestAnimationFrame(frame);
      else canvas.remove();
    };
    window.requestAnimationFrame(frame);
  }
}
