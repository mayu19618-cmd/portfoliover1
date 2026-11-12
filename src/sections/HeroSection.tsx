import { motion, useReducedMotion } from 'framer-motion';
import styles from './HeroSection.module.css';
import { siteData } from '../data/siteData';
import { pub } from '../utils/assets';

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="home" className={styles.hero} aria-label="ヒーローセクション">
      {/* Loadingと同じ水玉装飾 */}
      <div className={styles.bgDeco} aria-hidden="true">
        {[...Array(2)].map((_, i) => (
          <div key={i} className={styles.bgCircle} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

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
          <motion.a
            href="#works"
            className={styles.carrotBtn}
            whileHover={shouldReduce ? undefined : { y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className={styles.carrotWrapper}>
              <img src={pub('/carrot-deco.png')} alt="" className={styles.carrotImg} aria-hidden="true" />
              <span className={styles.carrotLabel}>View Works</span>
            </div>
          </motion.a>
          <motion.a
            href="#about"
            className={styles.carrotBtn}
            whileHover={shouldReduce ? undefined : { y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <div className={styles.carrotWrapper}>
              <img src={pub('/carrot-deco.png')} alt="" className={styles.carrotImg} aria-hidden="true" />
              <span className={styles.carrotLabel}>About Me</span>
            </div>
          </motion.a>
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
