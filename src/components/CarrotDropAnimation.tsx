import { motion } from 'framer-motion';
import styles from './CarrotDropAnimation.module.css';
import { pub } from '../utils/assets';

interface CarrotDropAnimationProps {
  startX: number;
  startY: number;
}

export default function CarrotDropAnimation({ startX, startY }: CarrotDropAnimationProps) {
  const floorY = window.innerHeight - 80;
  // carrot.png は横長(1536×1024)なので表示高さを固定して横幅は自動
  const carrotH = 44;
  const carrotW = Math.round(carrotH * (1536 / 1024)); // ≈ 66px
  const offsetX = carrotW / 2;

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <motion.div
        className={styles.carrot}
        initial={{ x: startX - offsetX, y: startY, rotate: -20, opacity: 1 }}
        animate={{
          y: [startY, floorY - 44, floorY - 22, floorY - 36, floorY - 18],
          rotate: [-20, 100, 200, 240, 260],
          opacity: [1, 1, 1, 0.9, 0],
        }}
        transition={{
          duration: 1.3,
          times: [0, 0.5, 0.65, 0.82, 1],
          ease: 'easeIn',
        }}
        style={{ height: carrotH }}
      >
        <img
          src={pub('/carrot.png')}
          alt=""
          height={carrotH}
          style={{ display: 'block', height: carrotH, width: 'auto' }}
        />
      </motion.div>

      {/* 着地エフェクト */}
      <motion.div
        className={styles.impact}
        style={{ left: startX, top: floorY - 16 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 0.7, 0], scale: [0, 1.4, 2] }}
        transition={{ duration: 0.35, delay: 0.84 }}
      />
    </div>
  );
}
