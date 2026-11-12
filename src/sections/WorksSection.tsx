import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { works, categories, type WorkCategory } from '../data/works';
import styles from './WorksSection.module.css';
import { pub } from '../utils/assets';

interface WorksSectionProps {
  onCarrotDrop: (drop: boolean) => void;
}

export default function WorksSection({ onCarrotDrop }: WorksSectionProps) {
  const [activeCategory, setActiveCategory] = useState<WorkCategory | 'All'>('All');
  const [animatingId, setAnimatingId] = useState<string | null>(null);
  const navigate = useNavigate();
  const shouldReduce = useReducedMotion();

  const filtered = activeCategory === 'All'
    ? works
    : works.filter((w) => w.category === activeCategory);

  const handleCardClick = useCallback((id: string) => {
    const work = works.find((w) => w.id === id);
    const slug = work?.urlSlug ?? id;
    if (shouldReduce) { navigate(`/works/${slug}`); return; }
    if (animatingId) return;
    setAnimatingId(id);
    onCarrotDrop(true);
    window.dispatchEvent(new CustomEvent('rabbit-surprised'));
    setTimeout(() => {
      setAnimatingId(null);
      onCarrotDrop(false);
      navigate(`/works/${slug}`);
    }, 1400);
  }, [animatingId, navigate, onCarrotDrop, shouldReduce]);

  return (
    <section id="works" className={styles.section} aria-label="作品一覧">
      <div className={styles.bgDeco} aria-hidden="true">
        {[...Array(2)].map((_, i) => (
          <div key={i} className={styles.bgCircle} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className={styles.inner}>
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionNo}>02</span>
            <span className={styles.headerLine} aria-hidden="true" />
          </div>
          <h2 className={styles.title}>Selected Works</h2>
          <p className={styles.sub}>ひとつひとつ、想いを込めて。</p>
        </motion.div>

        <div className={styles.filterRow} role="group" aria-label="カテゴリフィルター">
          {(['All', ...categories] as const).map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''}`}
              onClick={() => setActiveCategory(cat)}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((work, i) => (
              <motion.article
                key={work.id}
                className={`${styles.card} ${animatingId === work.id ? styles.surprised : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                layout
                onClick={() => handleCardClick(work.id)}
                tabIndex={0}
                role="button"
                aria-label={`${work.title}の詳細を見る`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(work.id); }
                }}
              >
                <div className={styles.imgWrapper}>
                  {work.thumbnail ? (
                    <img src={pub(work.thumbnail)} alt={work.thumbnailAlt} className={styles.img} loading="lazy" />
                  ) : (
                    <WorkPlaceholder color={work.color} category={work.category} />
                  )}

                </div>
                <div className={styles.cardBody}>
                  <span className={styles.category}>{work.category}</span>
                  <h3 className={styles.cardTitle}>{work.title}</h3>
                  <span className={styles.year}>{work.year}</span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        <p className={styles.worksNote}>
          ✦ 作品は一例です。今後たくさんの作品を追加予定です ✦
        </p>
      </div>
    </section>
  );
}

function WorkPlaceholder({ color, category }: { color: string; category: string }) {
  return (
    <div className={styles.placeholder} style={{ background: color }} aria-hidden="true">
      <span className={styles.placeholderLabel}>{category}</span>
      <span className={styles.placeholderNote}>※ 架空の制作実績</span>
    </div>
  );
}
