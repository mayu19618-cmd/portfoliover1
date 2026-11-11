/**
 * うさぎデザイン確認用ページ（開発時のみ使用）
 * URL: /rabbit-preview
 */
import RabbitSVG, { type RabbitState } from '../components/RabbitSVG';

const states: RabbitState[] = ['idle', 'walking', 'surprised', 'jump', 'wave', 'pickup'];

export default function RabbitPreviewPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF9FB 0%, #FCE4EC 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '48px 24px',
      fontFamily: 'sans-serif',
      gap: 48,
    }}>
      <h1 style={{ color: '#D782A0', fontSize: '1.4rem', letterSpacing: '0.15em' }}>
        RABBIT DESIGN PREVIEW
      </h1>

      {/* サイズバリエーション */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <h2 style={{ color: '#8a7a80', fontSize: '0.8rem', letterSpacing: '0.2em' }}>SIZE VARIATIONS — idle state</h2>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 32, background: 'white', borderRadius: 24, padding: '32px 48px', boxShadow: '0 8px 32px rgba(215,130,160,0.14)' }}>
          {[40, 60, 90, 130, 180].map((s) => (
            <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <RabbitSVG size={s} state="idle" showCarrot />
              <span style={{ fontSize: '0.65rem', color: '#8a7a80' }}>{s}px</span>
            </div>
          ))}
        </div>
      </section>

      {/* ステートバリエーション */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, width: '100%', maxWidth: 900 }}>
        <h2 style={{ color: '#8a7a80', fontSize: '0.8rem', letterSpacing: '0.2em' }}>STATE VARIATIONS — 96px</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 24,
          width: '100%',
        }}>
          {states.map((s) => (
            <div key={s} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
              background: 'white',
              borderRadius: 20,
              padding: '32px 24px 20px',
              boxShadow: '0 4px 20px rgba(215,130,160,0.12)',
            }}>
              <RabbitSVG size={96} state={s} showCarrot={s !== 'pickup'} />
              <code style={{ fontSize: '0.72rem', color: '#D782A0', background: '#FCE4EC', padding: '3px 10px', borderRadius: 100 }}>{s}</code>
            </div>
          ))}
        </div>
      </section>

      {/* にんじんあり/なし */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <h2 style={{ color: '#8a7a80', fontSize: '0.8rem', letterSpacing: '0.2em' }}>CARROT ON / OFF</h2>
        <div style={{ display: 'flex', gap: 48, background: 'white', borderRadius: 24, padding: '32px 48px', boxShadow: '0 8px 32px rgba(215,130,160,0.14)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <RabbitSVG size={100} state="idle" showCarrot={true} />
            <span style={{ fontSize: '0.65rem', color: '#8a7a80' }}>showCarrot: true</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <RabbitSVG size={100} state="idle" showCarrot={false} />
            <span style={{ fontSize: '0.65rem', color: '#8a7a80' }}>showCarrot: false</span>
          </div>
        </div>
      </section>

      {/* 背景色別確認 */}
      <section style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <h2 style={{ color: '#8a7a80', fontSize: '0.8rem', letterSpacing: '0.2em' }}>BACKGROUND CHECK</h2>
        <div style={{ display: 'flex', gap: 24 }}>
          {['#FFF9FB', '#FCE4EC', '#FFFFFF', '#F4B8CE', '#D782A0'].map((bg) => (
            <div key={bg} style={{
              background: bg,
              borderRadius: 16,
              padding: '24px 20px 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 8,
              border: '1px solid rgba(215,130,160,0.2)',
            }}>
              <RabbitSVG size={80} state="idle" showCarrot />
              <span style={{ fontSize: '0.6rem', color: '#8a7a80' }}>{bg}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
