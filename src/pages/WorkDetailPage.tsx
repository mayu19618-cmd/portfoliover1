import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { works } from '../data/works';
import styles from './WorkDetailPage.module.css';
import { pub } from '../utils/assets';
import { formatText } from '../utils/formatText';

export default function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const index = works.findIndex((w) => w.urlSlug === id || w.id === id);
  const work = works[index];

  if (!work) {
    return (
      <div className={styles.notFound}>
        <p className={styles.notFoundTitle}>404</p>
        <p className={styles.notFoundMsg}>作品が見つかりませんでした。</p>
        <Link to="/" className={styles.backLink}>← 作品一覧へ戻る</Link>
      </div>
    );
  }

  const prevWork = index > 0 ? works[index - 1] : null;
  const nextWork = index < works.length - 1 ? works[index + 1] : null;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* 戻るボタン */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button className={styles.backBtn} onClick={() => navigate(-1)} aria-label="前のページに戻る">
            ← 作品一覧へ戻る
          </button>
        </motion.div>

        {/* ヘッダー */}
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.category}>{work.category}</span>
          <h1 className={styles.title}>{work.title}</h1>
          <p className={styles.year}>{work.year}年制作{work.duration ? `　／　${work.duration}` : ''}</p>
        </motion.header>

        {/* ── 2カラム ── */}
        <div className={styles.twoCol}>

          {/* 左：画像 */}
          <motion.div
            className={styles.leftCol}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={styles.imgCard} style={!work.thumbnail ? { background: work.color } : undefined}>
              {work.thumbnail ? (
                <img
                  src={pub(work.thumbnail)}
                  alt={work.thumbnailAlt}
                  className={styles.mainImg}
                />
              ) : (
                <div className={styles.visualPlaceholder}>
                  <span className={styles.visualIcon}>
                    {work.category === 'Web Design' ? '🌐' : work.category === 'Graphic Design' ? '🎨' : work.category === 'Branding' ? '✨' : '📌'}
                  </span>
                  <p className={styles.visualTitle}>{work.title}</p>
                </div>
              )}
            </div>

            {work.siteUrl && (
              <a href={work.siteUrl} target="_blank" rel="noopener noreferrer" className={styles.siteLink}>
                公開サイトを見る →
              </a>
            )}
          </motion.div>

          {/* 右：制作情報パネル */}
          <motion.div
            className={styles.rightCol}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
          >
            <div className={styles.infoPanel}>
              <InfoItem label="制作概要">
                <p className={styles.infoText}>{formatText(work.overview)}</p>
              </InfoItem>

              <InfoItem label="制作目的">
                <p className={styles.infoText}>{formatText(work.purpose)}</p>
              </InfoItem>

              <InfoItem label="ターゲット">
                <p className={styles.infoText}>{formatText(work.target)}</p>
              </InfoItem>

              <InfoItem label="デザインコンセプト">
                <p className={styles.infoText}>{formatText(work.concept)}</p>
              </InfoItem>

              <InfoItem label="使用ツール">
                <div className={styles.tags}>
                  {(work.tools ?? []).map((tool) => (
                    <span key={tool} className={styles.tag}>{tool}</span>
                  ))}
                </div>
              </InfoItem>

              <InfoItem label="工夫したポイント" last>
                <ul className={styles.highlights}>
                  {(work.highlights ?? []).map((h, i) => (
                    <li key={i} className={styles.highlightItem}>
                      <span className={styles.highlightBullet} aria-hidden="true">✦</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </InfoItem>
            </div>
          </motion.div>
        </div>

        {/* 追加画像（フル幅） */}
        {(work.images ?? []).length > 0 && (
          <motion.div
            className={styles.imagesSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className={styles.sectionLabel}>制作画像</h2>
            <div className={styles.imageGrid}>
              {(work.images ?? []).map((img, i) => (
                <img key={i} src={pub(img.url)} alt={img.alt} className={styles.workImg} loading="lazy" />
              ))}
            </div>
          </motion.div>
        )}

        {/* 前後ナビ */}
        <nav className={styles.pagination} aria-label="前後の作品">
          <div className={styles.paginationItem}>
            {prevWork && (
              <Link to={`/works/${prevWork.urlSlug}`} className={styles.pageLink}>
                <span className={styles.pageLinkDir}>← PREV</span>
                <span className={styles.pageLinkTitle}>{prevWork.title}</span>
              </Link>
            )}
          </div>
          <Link to="/#works" className={styles.allLink}>一覧へ</Link>
          <div className={`${styles.paginationItem} ${styles.paginationRight}`}>
            {nextWork && (
              <Link to={`/works/${nextWork.urlSlug}`} className={styles.pageLink}>
                <span className={styles.pageLinkDir}>NEXT →</span>
                <span className={styles.pageLinkTitle}>{nextWork.title}</span>
              </Link>
            )}
          </div>
        </nav>

      </div>
    </div>
  );
}

function InfoItem({ label, children, last }: { label: string; children: React.ReactNode; last?: boolean }) {
  return (
    <div className={`${styles.infoItem} ${last ? styles.infoItemLast : ''}`}>
      <span className={styles.infoLabel}>{label}</span>
      {children}
    </div>
  );
}
