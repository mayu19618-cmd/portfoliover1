import { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useAnimation, useReducedMotion } from 'framer-motion';
import CarrotDropAnimation from './CarrotDropAnimation';
import styles from './RabbitCursor.module.css';
import { pub } from '../utils/assets';

type RabbitState = 'idle' | 'jump' | 'land' | 'surprised';

/* ── 定数 ── */
const W = 80;
const CONTAINER_H = 110;
const LERP = 0.1;
const MOVE_VEL = 1.4;
const IDLE_DIST = 16;
const JUMP_PERIOD = 500;
const JUMP_DUR = 440;
const LAND_DUR = 160;
const SURPRISE_MS = 2200;
const CARROT_DROP_Y = 48;

/* モバイル定数 */
const M_LERP = 0.07;
const M_JUMP_PERIOD = 480;
const M_JUMP_DUR = 440;
const M_LAND_DUR = 160;
const M_MOVE_VEL = 0.8;
const M_IDLE_DIST = 20;
const M_MARGIN = 16;    // 画面端マージン

const IMGS: Record<RabbitState, string> = {
  idle: pub('/rabbit1.png'),
  jump: pub('/rabbit2.png'),
  land: pub('/rabbit3.png'),
  surprised: pub('/rabbit4.png'),
};

function preload() {
  Object.values(IMGS).forEach((src) => {
    const img = new window.Image();
    img.src = src;
  });
  new window.Image().src = pub('/carrot.png');
}

export default function RabbitCursor() {
  const shouldReduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [rabbitState, setRabbitState] = useState<RabbitState>('idle');
  const [flipX, setFlipX] = useState(false);
  const [carrotPortal, setCarrotPortal] = useState<{ x: number; y: number } | null>(null);

  const anim = useAnimation();

  /* ── 位置・ループ用 Ref ── */
  const containerRef = useRef<HTMLDivElement>(null);
  const curX = useRef(-600);
  const curY = useRef(-600);
  const tgtX = useRef(-600);
  const tgtY = useRef(-600);
  const lastT = useRef(0);
  const rafId = useRef(0);
  const initRef = useRef(false);

  /* ── 状態管理 Ref ── */
  const stateRef = useRef<RabbitState>('idle');
  const flipRef = useRef(false);
  const lastJumpT = useRef(-JUMP_PERIOD);
  const jumpTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const landTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const surpriseTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const carrotTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const isMobileRef = useRef(false);

  useEffect(() => { preload(); }, []);

  useEffect(() => {
    // 判定基準: (any-pointer: fine) = マウス/トラックパッドが使える環境
    // 'ontouchstart' in window はPC Chromeでも true になるケースがあるため使用しない
    // window.innerWidth < 768 はPCの幅次第で誤判定するため使用しない
    const mq = window.matchMedia('(any-pointer: fine)');
    const check = () => {
      // fine pointer（マウス・トラックパッド）が1つでもあればPC mode
      const mobile = !mq.matches;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
    };
    check();
    // ハイブリッド端末でマウスが接続/切断された際にも対応
    mq.addEventListener('change', check);
    return () => mq.removeEventListener('change', check);
  }, []);

  /* ── アニメーション ── */
  const playAnim = useCallback((s: RabbitState) => {
    switch (s) {
      case 'idle':
        anim.start({
          scale: [1, 1.028, 1], rotate: 0, scaleX: 1, scaleY: 1, y: 0,
          transition: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
        } as any);
        break;
      case 'jump':
        anim.start({
          y: [0, -20, 0], scale: 1, rotate: 0,
          transition: { duration: JUMP_DUR / 1000, ease: 'easeInOut' },
        } as any);
        break;
      case 'land':
        anim.start({
          y: 0,
          scaleY: [1, 0.76, 1.07, 1.01, 1],
          scaleX: [1, 1.27, 0.94, 0.99, 1],
          rotate: [0, -2.8, 2.2, -1.2, 0.5, 0],
          transition: { duration: LAND_DUR / 1000, ease: 'easeOut' },
        } as any);
        break;
      case 'surprised':
        anim.start({
          y: [0, -22, 0], scale: 1, rotate: 0,
          transition: { duration: 0.42, ease: 'easeOut' },
        } as any);
        break;
    }
  }, [anim]);

  const setStateFn = useCallback((s: RabbitState) => {
    if (stateRef.current === s) return;
    stateRef.current = s;
    setRabbitState(s);
    playAnim(s);
  }, [playAnim]);

  const triggerJump = useCallback((now: number) => {
    lastJumpT.current = now;
    setStateFn('jump');
    clearTimeout(jumpTimer.current);
    clearTimeout(landTimer.current);
    jumpTimer.current = setTimeout(() => {
      if (stateRef.current === 'jump') {
        setStateFn('land');
        landTimer.current = setTimeout(() => {
          if (stateRef.current === 'land') setStateFn('idle');
        }, isMobileRef.current ? M_LAND_DUR : LAND_DUR);
      }
    }, isMobileRef.current ? M_JUMP_DUR : JUMP_DUR);
  }, [setStateFn]);

  const triggerSurprised = useCallback((x: number, y: number) => {
    clearTimeout(surpriseTimer.current);
    clearTimeout(carrotTimer.current);
    clearTimeout(jumpTimer.current);
    clearTimeout(landTimer.current);

    setStateFn('surprised');

    if (x > -100) {
      setCarrotPortal({ x, y: y - CARROT_DROP_Y });
      carrotTimer.current = setTimeout(() => setCarrotPortal(null), 1600);
    }

    surpriseTimer.current = setTimeout(() => setStateFn('idle'), SURPRISE_MS);
  }, [setStateFn]);

  /* ── PC: マウス追従 RAF ループ ── */
  useEffect(() => {
    if (isMobile || shouldReduce) return;

    const onMove = (e: MouseEvent) => {
      if (!initRef.current) {
        initRef.current = true;
        curX.current = e.clientX;
        curY.current = e.clientY + 60;
        if (containerRef.current) {
          containerRef.current.style.left = `${curX.current}px`;
          containerRef.current.style.top = `${curY.current}px`;
        }
      }
      tgtX.current = e.clientX;
      tgtY.current = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const onSurprised = () => {
      triggerSurprised(curX.current, curY.current);
    };
    window.addEventListener('rabbit-surprised', onSurprised);

    const loop = (t: number) => {
      const dt = lastT.current ? Math.min(t - lastT.current, 50) : 16;
      lastT.current = t;

      if (stateRef.current !== 'surprised' && containerRef.current) {
        const f = 1 - Math.pow(1 - LERP, dt / 16.67);

        const prevX = curX.current;
        const prevY = curY.current;

        curX.current += (tgtX.current - curX.current) * f;
        curY.current += (tgtY.current - curY.current) * f;

        const movedX = curX.current - prevX;
        const movedY = curY.current - prevY;
        const vel = Math.hypot(movedX, movedY);
        const dist = Math.hypot(tgtX.current - curX.current, tgtY.current - curY.current);

        containerRef.current.style.left = `${curX.current}px`;
        containerRef.current.style.top = `${curY.current}px`;

        if (vel > 0.3) {
          const shouldFlip = movedX < -0.1;
          if (shouldFlip !== flipRef.current) {
            flipRef.current = shouldFlip;
            setFlipX(shouldFlip);
          }
        }

        const isMoving = vel > MOVE_VEL && dist > IDLE_DIST;
        if (isMoving && stateRef.current === 'idle' && t - lastJumpT.current > JUMP_PERIOD) {
          triggerJump(t);
        }

        if (!isMoving && dist < IDLE_DIST &&
            stateRef.current !== 'idle' &&
            stateRef.current !== 'land' &&
            stateRef.current !== 'jump') {
          setStateFn('idle');
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('rabbit-surprised', onSurprised);
      cancelAnimationFrame(rafId.current);
      clearTimeout(jumpTimer.current);
      clearTimeout(landTimer.current);
      clearTimeout(surpriseTimer.current);
      clearTimeout(carrotTimer.current);
    };
  }, [isMobile, shouldReduce, triggerJump, triggerSurprised, setStateFn]);

  /* ── モバイル: タップ追従 RAF ループ ── */
  useEffect(() => {
    if (!isMobile || shouldReduce) return;

    /* 初期位置: 右下 */
    const initMobilePos = () => {
      const x = window.innerWidth - W / 2 - M_MARGIN;
      const y = window.innerHeight - CONTAINER_H - M_MARGIN;
      curX.current = x;
      curY.current = y;
      tgtX.current = x;
      tgtY.current = y;
      if (containerRef.current) {
        containerRef.current.style.left = `${x}px`;
        containerRef.current.style.top = `${y}px`;
      }
      initRef.current = true;
    };
    initMobilePos();

    /* タップ: インタラクティブ要素・スクロール操作を除外 */
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartT = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      touchStartT = Date.now();
    };

    const onTouchEnd = (e: TouchEvent) => {
      const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
      const dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
      const dt = Date.now() - touchStartT;
      /* スクロール操作（移動量 > 10px or 長押し > 300ms）は無視 */
      if (dx > 10 || dy > 10 || dt > 300) return;

      const target = e.target as Element;
      /* ボタン・リンク・入力欄はうさぎの移動先にしない */
      if (target.closest('a, button, input, textarea, select, [role="button"]')) return;

      const tx = e.changedTouches[0].clientX;
      const ty = e.changedTouches[0].clientY;

      /* うさぎの中心付近に目標を設定（画面端クランプ） */
      const clampedX = Math.max(W / 2 + M_MARGIN, Math.min(window.innerWidth - W / 2 - M_MARGIN, tx));
      const clampedY = Math.max(CONTAINER_H + M_MARGIN, Math.min(window.innerHeight - M_MARGIN, ty));
      tgtX.current = clampedX;
      tgtY.current = clampedY;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });

    /* モバイル驚きイベント */
    const onSurprised = () => {
      triggerSurprised(curX.current, curY.current);
    };
    window.addEventListener('rabbit-surprised', onSurprised);

    /* モバイル RAF ループ */
    const loop = (t: number) => {
      const dt = lastT.current ? Math.min(t - lastT.current, 50) : 16;
      lastT.current = t;

      if (stateRef.current !== 'surprised' && containerRef.current) {
        const f = 1 - Math.pow(1 - M_LERP, dt / 16.67);

        const prevX = curX.current;
        const prevY = curY.current;

        curX.current += (tgtX.current - curX.current) * f;
        curY.current += (tgtY.current - curY.current) * f;

        const movedX = curX.current - prevX;
        const movedY = curY.current - prevY;
        const vel = Math.hypot(movedX, movedY);
        const dist = Math.hypot(tgtX.current - curX.current, tgtY.current - curY.current);

        /* 画面端クランプ */
        curX.current = Math.max(W / 2 + M_MARGIN, Math.min(window.innerWidth - W / 2 - M_MARGIN, curX.current));
        curY.current = Math.max(CONTAINER_H + M_MARGIN, Math.min(window.innerHeight - M_MARGIN, curY.current));

        containerRef.current.style.left = `${curX.current}px`;
        containerRef.current.style.top = `${curY.current}px`;

        /* 左右反転 */
        if (vel > 0.3) {
          const shouldFlip = movedX < -0.1;
          if (shouldFlip !== flipRef.current) {
            flipRef.current = shouldFlip;
            setFlipX(shouldFlip);
          }
        }

        /* ジャンプサイクル */
        const isMoving = vel > M_MOVE_VEL && dist > M_IDLE_DIST;
        if (isMoving && stateRef.current === 'idle' && t - lastJumpT.current > M_JUMP_PERIOD) {
          triggerJump(t);
        }

        if (!isMoving && dist < M_IDLE_DIST &&
            stateRef.current !== 'idle' &&
            stateRef.current !== 'land' &&
            stateRef.current !== 'jump') {
          setStateFn('idle');
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('rabbit-surprised', onSurprised);
      cancelAnimationFrame(rafId.current);
      clearTimeout(jumpTimer.current);
      clearTimeout(landTimer.current);
      clearTimeout(surpriseTimer.current);
      clearTimeout(carrotTimer.current);
    };
  }, [isMobile, shouldReduce, triggerJump, triggerSurprised, setStateFn]);

  if (shouldReduce) return null;

  /* ── 共通レンダリング（PC・モバイル共用） ── */
  return (
    <>
      <div
        ref={containerRef}
        className={isMobile ? styles.mobileWrapper : styles.cursorWrapper}
        aria-hidden="true"
        style={isMobile ? { cursor: 'default' } : undefined}
      >
        <div style={{ transform: flipX ? 'scaleX(-1)' : 'none', transformOrigin: 'center bottom' }}>
          <motion.div
            animate={anim}
            style={{
              transformOrigin: 'center bottom',
              position: 'relative',
              width: W,
              height: CONTAINER_H,
            }}
          >
            {(Object.entries(IMGS) as [RabbitState, string][]).map(([s, src]) => (
              <img
                key={s}
                src={src}
                alt=""
                width={W}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: W,
                  height: 'auto',
                  opacity: rabbitState === s ? 1 : 0,
                  transition: 'opacity 0.07s linear',
                  filter: 'drop-shadow(0 5px 12px rgba(215,130,160,0.4))',
                  pointerEvents: 'none',
                }}
                aria-hidden="true"
              />
            ))}
          </motion.div>
        </div>
      </div>

      {carrotPortal && createPortal(
        <CarrotDropAnimation startX={carrotPortal.x} startY={carrotPortal.y} />,
        document.body
      )}
    </>
  );
}
