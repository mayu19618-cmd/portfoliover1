import { useId } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export type RabbitState = 'idle' | 'surprised' | 'jump' | 'wave' | 'walking' | 'pickup';

interface RabbitSVGProps {
  state?: RabbitState;
  flipX?: boolean;
  size?: number;
  showCarrot?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * うさぎのSVGキャラクター
 * viewBox: 0 0 100 140
 * パーツ: 耳（左右）/ 体 / ふわふわ装飾 / 頭 / ほっぺ / 目 / 鼻 / 口 / 前足 / しっぽ / にんじん
 */
export default function RabbitSVG({
  state = 'idle',
  flipX = false,
  size = 80,
  showCarrot = true,
  style,
  className = '',
}: RabbitSVGProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, 'r');
  const shouldReduce = useReducedMotion();

  const aspect = 140 / 100;

  // ===== アニメーション =====
  const earLeftAnim = shouldReduce ? undefined
    : state === 'surprised'
      ? { rotate: -8, transition: { duration: 0.18 } }
      : state === 'walking'
        ? { rotate: [-6, 4, -6], transition: { duration: 0.55, repeat: Infinity } }
        : { rotate: [-3, 2.5, -3], transition: { duration: 2.8, repeat: Infinity } };

  const earRightAnim = shouldReduce ? undefined
    : state === 'surprised'
      ? { rotate: 8, transition: { duration: 0.18 } }
      : state === 'walking'
        ? { rotate: [6, -4, 6], transition: { duration: 0.55, repeat: Infinity } }
        : { rotate: [3, -2.5, 3], transition: { duration: 2.8, repeat: Infinity } };

  const bodyAnim = shouldReduce ? undefined
    : state === 'jump'
      ? { y: [0, -24, -20, 0], transition: { duration: 0.52, times: [0, 0.38, 0.6, 1] } }
      : state === 'walking'
        ? { y: [0, -6, 0], transition: { duration: 0.48, repeat: Infinity } }
        : { y: [0, -3.5, 0], transition: { duration: 2.6, repeat: Infinity } };

  const noseAnim = shouldReduce ? undefined
    : { scaleY: [1, 1.22, 1], transition: { duration: 1.5, repeat: Infinity } };

  const waveAnim = shouldReduce ? undefined
    : { rotate: [-22, 22, -22], transition: { duration: 0.65, repeat: Infinity } };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 140"
      width={size}
      height={size * aspect}
      className={className}
      style={{ transform: flipX ? 'scaleX(-1)' : undefined, overflow: 'visible', ...style }}
      aria-hidden="true"
    >
      <defs>
        {/* ===== 体・頭のグラデーション ===== */}
        {/* 光源：左上。中心は白、外側に向かってごくわずかにピンクがかった白 */}
        <radialGradient id={`${uid}-body`} cx="38%" cy="28%" r="68%">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="72%"  stopColor="#FEFBFC" />
          <stop offset="100%" stopColor="#F5EAF0" />
        </radialGradient>

        {/* ===== 耳内側のグラデーション ===== */}
        <radialGradient id={`${uid}-earIn`} cx="50%" cy="58%" r="50%">
          <stop offset="0%"   stopColor="#FFB8D8" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#F4B8CE" stopOpacity="0.12" />
        </radialGradient>

        {/* ===== ほっぺのグラデーション ===== */}
        <radialGradient id={`${uid}-cheek`} cx="44%" cy="40%" r="50%">
          <stop offset="0%"   stopColor="#FFB2D0" stopOpacity="0.68" />
          <stop offset="100%" stopColor="#FFB2D0" stopOpacity="0" />
        </radialGradient>

        {/* ===== しっぽのグラデーション ===== */}
        <radialGradient id={`${uid}-tail`} cx="36%" cy="30%" r="58%">
          <stop offset="0%"   stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F4EAF2" />
        </radialGradient>

        {/* ===== お腹ハイライト ===== */}
        <radialGradient id={`${uid}-belly`} cx="50%" cy="28%" r="52%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* ===== 頭ハイライト ===== */}
        <radialGradient id={`${uid}-headHi`} cx="36%" cy="26%" r="50%">
          <stop offset="0%"   stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>

        {/* ===== にんじん ===== */}
        <linearGradient id={`${uid}-carrot`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#FF9055" />
          <stop offset="100%" stopColor="#E8520F" />
        </linearGradient>

        {/* ===== ドロップシャドウ（しっぽ・耳） ===== */}
        <filter id={`${uid}-shadow`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#E0C8D8" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ========================================
          右耳（奥側）
          付け根 (57,46)～(65,46)、先端(60,8)あたり
      ======================================== */}
      <motion.g
        style={{ transformOrigin: '61px 46px' }}
        animate={earRightAnim as any}
      >
        {/* 右耳の外形 */}
        <path
          d="M 57 46 C 55 36 55 17 58 8 C 60 2 66 2 68 8 C 71 17 70 36 66 46 Z"
          fill={`url(#${uid}-body)`}
          stroke="#E0CDD8"
          strokeWidth="0.6"
          filter={`url(#${uid}-shadow)`}
        />
        {/* 右耳の内側ピンク */}
        <path
          d="M 58.5 44 C 57 36 57.5 19 60 11 C 61 7.5 64.5 7.5 66 11 C 67.5 16 67 34 64.5 43 Z"
          fill={`url(#${uid}-earIn)`}
        />
      </motion.g>

      {/* ========================================
          左耳（手前側）
          付け根 (35,46)～(43,46)、先端(39,8)あたり
      ======================================== */}
      <motion.g
        style={{ transformOrigin: '39px 46px' }}
        animate={earLeftAnim as any}
      >
        {/* 左耳の外形 */}
        <path
          d="M 32 46 C 29 36 30 17 32 8 C 34 2 40 2 42 8 C 45 17 44 36 42 46 Z"
          fill={`url(#${uid}-body)`}
          stroke="#E0CDD8"
          strokeWidth="0.6"
          filter={`url(#${uid}-shadow)`}
        />
        {/* 左耳の内側ピンク */}
        <path
          d="M 33.5 44 C 31.5 36 32 19 34 11 C 35 7.5 38.5 7.5 40 11 C 41.5 16 41.5 34 39.5 43 Z"
          fill={`url(#${uid}-earIn)`}
        />
      </motion.g>

      {/* ========================================
          体・頭・顔パーツ（上下アニメーション）
      ======================================== */}
      <motion.g animate={bodyAnim as any}>

        {/* ===== 体メイン ===== */}
        <ellipse
          cx="50" cy="112" rx="24" ry="25"
          fill={`url(#${uid}-body)`}
          stroke="#E0CDD8" strokeWidth="0.5"
        />

        {/* ===== 体のふわふわ感（輪郭周辺に白い毛玉を重ねる）===== */}
        {/* 体の左側 */}
        <ellipse cx="27.5" cy="103" rx="7" ry="9.5"
          fill="white" opacity="0.55"
          transform="rotate(-28 27.5 103)" />
        <ellipse cx="26.5" cy="116" rx="6" ry="8"
          fill="white" opacity="0.45"
          transform="rotate(-18 26.5 116)" />
        {/* 体の右側 */}
        <ellipse cx="72.5" cy="103" rx="7" ry="9.5"
          fill="white" opacity="0.55"
          transform="rotate(28 72.5 103)" />
        <ellipse cx="73.5" cy="116" rx="6" ry="8"
          fill="white" opacity="0.45"
          transform="rotate(18 73.5 116)" />
        {/* 体の下部 */}
        <ellipse cx="50" cy="134" rx="12" ry="5"
          fill="white" opacity="0.38" />

        {/* ===== お腹の胸毛ハイライト ===== */}
        <ellipse cx="48" cy="105" rx="13" ry="13"
          fill={`url(#${uid}-belly)`} />

        {/* ===== 頭と体の境界のモフモフ ===== */}
        <ellipse cx="36" cy="89" rx="12" ry="8.5"
          fill="white" opacity="0.52"
          transform="rotate(-18 36 89)" />
        <ellipse cx="64" cy="89" rx="12" ry="8.5"
          fill="white" opacity="0.52"
          transform="rotate(18 64 89)" />
        <ellipse cx="50" cy="88" rx="15" ry="7"
          fill="white" opacity="0.4" />

        {/* ===== 頭 ===== */}
        <circle
          cx="50" cy="62" r="28"
          fill={`url(#${uid}-body)`}
          stroke="#E0CDD8" strokeWidth="0.5"
        />

        {/* ===== 頭のふわふわ感 ===== */}
        {/* 頭の左側 */}
        <ellipse cx="23" cy="62" rx="8" ry="11"
          fill="white" opacity="0.48"
          transform="rotate(-8 23 62)" />
        {/* 頭の右側 */}
        <ellipse cx="77" cy="62" rx="8" ry="11"
          fill="white" opacity="0.48"
          transform="rotate(8 77 62)" />
        {/* 頭頂部の毛 */}
        <ellipse cx="50" cy="35" rx="12" ry="7"
          fill="white" opacity="0.42" />
        {/* あご下の毛 */}
        <ellipse cx="50" cy="89" rx="16" ry="8"
          fill="white" opacity="0.42" />

        {/* ===== 頭のハイライト（光の当たり具合）===== */}
        <ellipse cx="39" cy="49" rx="13" ry="10"
          fill={`url(#${uid}-headHi)`} />

        {/* ===== ほっぺ ===== */}
        <ellipse cx="28" cy="69" rx="10.5" ry="7.5"
          fill={`url(#${uid}-cheek)`} />
        <ellipse cx="72" cy="69" rx="10.5" ry="7.5"
          fill={`url(#${uid}-cheek)`} />

        {/* ===== 目（左）===== */}
        <EyeLeft state={state} shouldReduce={shouldReduce ?? false} />

        {/* ===== 目（右）===== */}
        <EyeRight state={state} shouldReduce={shouldReduce ?? false} />

        {/* ===== 鼻 ===== */}
        {/* 参考画像：小さな逆三角形に近いピンク色の鼻 */}
        <motion.g
          style={{ transformOrigin: '50px 70px' }}
          animate={noseAnim as any}
        >
          <path
            d="M 47.2 68.5 Q 50 71.5 52.8 68.5 Q 50 66.5 47.2 68.5 Z"
            fill="#CF6E8E"
          />
          {/* 鼻の内側（少し濃いめ） */}
          <ellipse cx="50" cy="69.2" rx="2" ry="1.4"
            fill="#B85A78" opacity="0.5" />
        </motion.g>

        {/* ===== 口元 ===== */}
        {/* 鼻から下に垂直線 → W字の笑顔 */}
        <path
          d="M 50 71.8 L 50 73.5"
          stroke="#C06080" strokeWidth="0.85" strokeLinecap="round"
        />
        <path
          d="M 46.5 73.8 Q 50 77.5 53.5 73.8"
          stroke="#C06080" strokeWidth="0.85" fill="none" strokeLinecap="round"
        />

        {/* ===== 前足（左）===== */}
        <ellipse cx="37" cy="130" rx="10.5" ry="6"
          fill={`url(#${uid}-body)`} stroke="#E0CDD8" strokeWidth="0.5" />
        {/* 前足のふわっと感 */}
        <ellipse cx="29" cy="128" rx="5.5" ry="5"
          fill="white" opacity="0.5" />

        {/* ===== 前足（右）===== */}
        {state !== 'wave' && (
          <>
            <ellipse cx="63" cy="130" rx="10.5" ry="6"
              fill={`url(#${uid}-body)`} stroke="#E0CDD8" strokeWidth="0.5" />
            <ellipse cx="71" cy="128" rx="5.5" ry="5"
              fill="white" opacity="0.5" />
          </>
        )}

        {/* ===== 手を振る腕（wave時）===== */}
        {state === 'wave' && (
          <motion.g
            style={{ transformOrigin: '70px 112px' }}
            animate={waveAnim as any}
          >
            <ellipse cx="72" cy="114" rx="10" ry="6"
              fill={`url(#${uid}-body)`} stroke="#E0CDD8" strokeWidth="0.5"
              transform="rotate(-28 72 114)" />
            <ellipse cx="79" cy="112" rx="5" ry="4.5"
              fill="white" opacity="0.5" transform="rotate(-28 79 112)" />
          </motion.g>
        )}

        {/* ===== しっぽ ===== */}
        <circle cx="71.5" cy="99" r="8.5"
          fill={`url(#${uid}-tail)`}
          stroke="#E0CDD8" strokeWidth="0.5"
          filter={`url(#${uid}-shadow)`}
        />
        {/* しっぽのふわふわハイライト */}
        <ellipse cx="70" cy="97" rx="4.8" ry="4.2"
          fill="white" opacity="0.6" />
        <ellipse cx="69" cy="96" rx="2.5" ry="2.2"
          fill="white" opacity="0.4" />

        {/* ===== にんじん ===== */}
        {showCarrot && state !== 'pickup' && (
          <Carrot uid={uid} />
        )}

      </motion.g>
    </svg>
  );
}

// ===== 目サブコンポーネント =====

function EyeLeft({ state, shouldReduce }: { state: RabbitState; shouldReduce: boolean }) {
  const isWave = state === 'wave';
  const isSurprised = state === 'surprised';

  const scaleAnim = shouldReduce ? undefined
    : isSurprised
      ? { scale: 1.4, transition: { duration: 0.14 } }
      : { scale: 1, transition: { duration: 0.2 } };

  if (isWave) {
    // 左目ウィンク
    return (
      <path
        d="M 36.5 61.5 Q 40.5 58.5 44.5 61.5"
        stroke="#1E1828" strokeWidth="1.8" fill="none" strokeLinecap="round"
      />
    );
  }

  return (
    <motion.g
      style={{ transformOrigin: '40.5px 62px' }}
      animate={scaleAnim as any}
    >
      {/* 目の白目（わずかに） */}
      <ellipse cx="40.5" cy="62" rx="5" ry="5.5" fill="#2A2235" />
      {/* 瞳 */}
      <ellipse cx="40.5" cy="62.5" rx="3.8" ry="4.2" fill="#150E1F" />
      {/* 大きいハイライト（右上） */}
      <ellipse cx="42.5" cy="59.8" rx="2.0" ry="2.2" fill="white" opacity="0.92" />
      {/* 小さいハイライト（左下） */}
      <circle cx="39.5" cy="64.2" r="0.85" fill="white" opacity="0.32" />
    </motion.g>
  );
}

function EyeRight({ state, shouldReduce }: { state: RabbitState; shouldReduce: boolean }) {
  const isSurprised = state === 'surprised';

  const scaleAnim = shouldReduce ? undefined
    : isSurprised
      ? { scale: 1.4, transition: { duration: 0.14 } }
      : { scale: 1, transition: { duration: 0.2 } };

  return (
    <motion.g
      style={{ transformOrigin: '59.5px 62px' }}
      animate={scaleAnim as any}
    >
      <ellipse cx="59.5" cy="62" rx="5" ry="5.5" fill="#2A2235" />
      <ellipse cx="59.5" cy="62.5" rx="3.8" ry="4.2" fill="#150E1F" />
      <ellipse cx="61.5" cy="59.8" rx="2.0" ry="2.2" fill="white" opacity="0.92" />
      <circle cx="58.5" cy="64.2" r="0.85" fill="white" opacity="0.32" />
    </motion.g>
  );
}

// ===== にんじんサブコンポーネント =====

function Carrot({ uid }: { uid: string }) {
  return (
    <g transform="rotate(-16, 50, 90)">
      {/* にんじん本体（コンパクトに） */}
      <path
        d="M 46.5 85.5 C 46 88 47.5 93.5 50 96 C 52.5 93.5 54 88 53.5 85.5 C 52 83.5 48 83.5 46.5 85.5 Z"
        fill={`url(#${uid}-carrot)`}
      />
      {/* にんじんのリブ（表面の線） */}
      <path d="M 47.5 88 Q 50 87.2 52.5 88" stroke="#D44810" strokeWidth="0.5" fill="none" opacity="0.6" />
      <path d="M 47.8 91 Q 50 90.2 52.2 91" stroke="#D44810" strokeWidth="0.45" fill="none" opacity="0.5" />
      {/* にんじんのハイライト */}
      <ellipse cx="48.5" cy="88" rx="1.5" ry="3" fill="white" opacity="0.25" transform="rotate(-10 48.5 88)" />
      {/* 葉（3本） */}
      <path d="M 49.5 85.5 Q 48 78 49.5 72" stroke="#66BB6A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M 49.5 85.5 Q 44.5 80 45 74" stroke="#66BB6A" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 50.5 85.5 Q 54.5 79.5 53.5 74" stroke="#55A85A" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    </g>
  );
}
