import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import styles from './Loading.module.css';
import { pub } from '../utils/assets';

interface LoadingProps {
  onComplete: () => void;
}

export default function Loading({ onComplete }: LoadingProps) {
  const [dotIndex, setDotIndex] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'jump' | 'fadeout'>('loading');
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    if (shouldReduce) {
      onComplete();
      return;
    }

    const dotTimer = setInterval(() => {
      setDotIndex((i) => (i + 1) % 4);
    }, 400);

    const doneTimer = setTimeout(() => {
      clearInterval(dotTimer);
      setPhase('jump');
      setTimeout(() => {
        setPhase('fadeout');
        setTimeout(onComplete, 600);
      }, 700);
    }, 2200);

    return () => {
      clearInterval(dotTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete, shouldReduce]);

  return (
    <AnimatePresence>
      {phase !== 'fadeout' && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.bgDeco}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={styles.bgCircle} style={{ '--i': i } as React.CSSProperties} />
            ))}
          </div>

          <div className={styles.rabbitWrap} aria-hidden="true">
            {/* 影：アニメーション要素と分離し filter を持つ */}
            <div className={styles.rabbitShadow} />
            <motion.img
              src={pub('/rabbit1.png')}
              alt=""
              width={80}
              className={styles.rabbit}
              animate={
                phase === 'jump'
                  ? ({ y: [0, -44, 0], scaleY: [1, 1.12, 0.88, 1], scaleX: [1, 0.88, 1.10, 1] } as any)
                  : ({ y: [0, -8, 0] } as any)
              }
              transition={
                phase === 'jump'
                  ? { duration: 0.52, ease: 'easeOut' }
                  : { duration: 0.9, repeat: Infinity, ease: 'easeInOut' }
              }
              style={{ display: 'block', transformOrigin: 'center bottom' }}
            />
          </div>

          <div className={styles.text}>
            <span className={styles.loading}>Loading</span>
            <span className={styles.dots}>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={i < (dotIndex % 4) ? { opacity: 1, y: -3 } : { opacity: 0.25, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  .
                </motion.span>
              ))}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
