import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './HeroSection.module.css';
import { pub } from '../utils/assets';

export default function HeroSection() {
  const shouldReduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 花びらアニメーション
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

    for (let i = 0; i < 16; i++) {
      petals.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * -1,
        size: Math.random() * 7 + 3,
        opacity: Math.random() * 0.3 + 0.08,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: Math.random() * 0.5 + 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
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
        ctx.fillStyle = '#F4B8CE';
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

      <div className={styles.bgDeco} aria-hidden="true">
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.circle3} />
      </div>

      <div className={styles.content}>
        {/* うさぎ */}
        <motion.div
          className={styles.rabbitHero}
          initial={shouldReduce ? undefined : { opacity: 0, scale: 0.85 }}
          animate={shouldReduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          aria-hidden="true"
        >
          <motion.div
            animate={shouldReduce ? undefined : ({ y: [0, -10, 0] } as any)}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'relative',
              display: 'inline-block',
              filter: 'drop-shadow(0 16px 36px rgba(215,130,160,0.36))',
            }}
          >
            <img
              src={pub('/rabbit1.png')}
              alt=""
              width={148}
              style={{ display: 'block' }}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        <motion.p
          className={styles.subEn}
          initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          Creative Design &amp; Web Portfolio
        </motion.p>

        <motion.h1
          className={styles.mainTitle}
          initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          PORTFOLIO
        </motion.h1>

        <motion.p
          className={styles.subJa}
          initial={shouldReduce ? undefined : { opacity: 0, y: 24 }}
          animate={shouldReduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          想いを、デザインでかたちに。
        </motion.p>

        <motion.div
          className={styles.scrollDown}
          initial={shouldReduce ? undefined : { opacity: 0 }}
          animate={shouldReduce ? undefined : { opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          aria-label="下にスクロール"
        >
          <span className={styles.scrollText}>SCROLL</span>
          <motion.div
            className={styles.scrollLine}
            animate={shouldReduce ? undefined : { scaleY: [0, 1, 0], y: [0, 8, 16] } as any}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </section>
  );
}
