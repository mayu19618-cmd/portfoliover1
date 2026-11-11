import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './HeroSection.module.css';
import { siteData } from '../data/siteData';

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (shouldReduce) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const petals: Array<{
      x: number; y: number; size: number; opacity: number;
      speedX: number; speedY: number; rotation: number; rotSpeed: number;
    }> = [];

    for (let i = 0; i < 10; i++) {
      petals.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * -1,
        size: Math.random() * 5 + 2,
        opacity: Math.random() * 0.07 + 0.02,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: Math.random() * 0.4 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#E8A0B4';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [shouldReduce]);

  return (
    <section id="home" className={styles.hero} aria-label="ヒーローセクション">
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.bgText} aria-hidden="true">DESIGN</div>

      <div className={styles.content}>
        <motion.p
          className={styles.eyebrow}
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {siteData.heroEyebrow}
        </motion.p>

        <motion.h1
          className={styles.mainTitle}
          initial={shouldReduce ? undefined : { opacity: 0, y: 32 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          PORTFOLIO
        </motion.h1>

        <motion.p
          className={styles.subJa}
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {siteData.heroTaglineJa}
        </motion.p>

        <motion.div
          className={styles.cta}
          initial={shouldReduce ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.56 }}
        >
          <a
            href="#works"
            className={styles.ctaPrimary}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View Works
          </a>
          <a
            href="#about"
            className={styles.ctaSecondary}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            About Me
          </a>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollDown}
        initial={shouldReduce ? undefined : { opacity: 0 }}
        animate={shouldReduce ? undefined : { opacity: 1 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        aria-label="下にスクロール"
      >
        <motion.div
          className={styles.scrollLine}
          animate={shouldReduce ? undefined : ({ scaleY: [0, 1, 0], y: [0, 8, 16] } as any)}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className={styles.scrollText}>SCROLL</span>
      </motion.div>
    </section>
  );
}
