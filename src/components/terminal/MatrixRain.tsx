import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface MatrixRainProps {
  onComplete?: () => void;
  durationMs?: number;
}

export default function MatrixRain({ onComplete, durationMs = 3200 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Set canvas dimensions
    const width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const characters = '0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ9876543210';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops: number[] = Array.from({ length: columns }, () => Math.floor(Math.random() * -30));

    // Theme color mapping
    let textColor = '#22c55e'; // default emerald matrix green
    let headColor = '#86efac';
    if (theme === 'cute' || theme === 'sakura') {
      textColor = '#f472b6';
      headColor = '#fdf2f8';
    } else if (theme === 'devil') {
      textColor = '#ef4444';
      headColor = '#fecaca';
    } else if (theme === 'dreamy' || theme === 'candy') {
      textColor = '#a855f7';
      headColor = '#f3e8ff';
    }

    const render = () => {
      ctx.fillStyle = 'rgba(9, 11, 22, 0.15)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Head character is brighter
        ctx.fillStyle = headColor;
        ctx.fillText(text, x, y);

        // Body character
        ctx.fillStyle = textColor;
        ctx.fillText(characters[Math.floor(Math.random() * characters.length)], x, y - fontSize);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      if (!isReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, durationMs);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [theme, onComplete, durationMs]);

  return (
    <div className="relative w-full h-56 rounded-lg overflow-hidden border border-emerald-500/30 bg-[#090b16] my-2 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 border border-emerald-500/40 text-[10px] text-emerald-400 font-mono">
        MATRIX.SYS · DECRYPTING
      </div>
    </div>
  );
}
