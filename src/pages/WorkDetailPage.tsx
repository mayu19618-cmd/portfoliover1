import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { works } from '../data/works';
import styles from './WorkDetailPage.module.css';
import { pub } from '../utils/assets';

export default function WorkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const index = works.findIndex((w) => w.id === id);
  const work = works[index];

  if (!work) {
    return (
      <div className={styles.notFound}>
        <p>作品が見つかりませんでした。</p>
        <Link to="/" className={styles.backLink}>← トップページへ戻る</Link>
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
          <button
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            aria-label="前のページに戻る"
          >
            ← 作品一覧へ戻る
          </button>
        </motion.div>

        {/* ヘッダー */}
        <motion.header
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
<span className={styles.category}>{work.category}</span>
          <h1 className={styles.title}>{work.title}</h1>
          <p className={styles.year}>{work.year}年制作</p>
        </motion.header>

        {/* メインビジュアル */}
        <motion.div
          className={styles.mainVisual}
          style={{ background: work.color }}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {work.thumbnail ? (
            <img src={pub(work.thumbnail)} alt={work.thumbnailAlt} className={styles.mainImg} />
          ) : (
            <div className={styles.visualPlaceholder}>
              <span className={styles.visualIcon}>
                {work.category === 'Web Design' ? '🌐' : work.category === 'Graphic Design' ? '🎨' : work.category === 'Branding' ? '✨' : '📌'}
              </span>
              <p className={styles.visualTitle}>{work.title}</p>
              <p className={styles.visualNote}>※ 架空の制作実績 — 画像は後から追加できます</p>
            </div>
          )}
        </motion.div>

        {/* 詳細情報 */}
        <motion.div
          className={styles.details}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.overview}>
            <SectionLabel>制作概要</SectionLabel>
            <p className={styles.overviewText}>{work.overview}</p>
          </div>

          <div className={styles.meta}>
            <MetaItem label="制作目的" value={work.purpose} />
            <MetaItem label="ターゲット" value={work.target} />
            <MetaItem label="デザインコンセプト" value={work.concept} />
            {work.duration && <MetaItem label="制作期間" value={work.duration} />}
          </div>

          <div className={styles.toolsSection}>
            <SectionLabel>使用ツール</SectionLabel>
            <div className={styles.tags}>
              {work.tools.map((tool) => (
                <span key={tool} className={styles.tag}>{tool}</span>
              ))}
            </div>
          </div>

          <div className={styles.highlightsSection}>
            <SectionLabel>工夫したポイント</SectionLabel>
            <ul className={styles.highlights}>
              {work.highlights.map((h, i) => (
                <li key={i} className={styles.highlightItem}>
                  <span className={styles.highlightBullet} aria-hidden="true">✦</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* 公開サイトURL */}
          {work.siteUrl && (
            <div className={styles.siteUrlSection}>
              <SectionLabel>公開サイト</SectionLabel>
              <a
                href={work.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.siteLink}
              >
                {work.siteUrl} →
              </a>
            </div>
          )}

          {/* 追加画像 */}
          {work.images.length > 0 && (
            <div className={styles.imagesSection}>
              <SectionLabel>制作画像</SectionLabel>
              <div className={styles.imageGrid}>
                {work.images.map((img, i) => (
                  <img key={i} src={pub(img.url)} alt={img.alt} className={styles.workImg} loading="lazy" />
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* 前後ナビ */}
        <nav className={styles.pagination} aria-label="前後の作品">
          <div className={styles.paginationItem}>
            {prevWork && (
              <Link to={`/works/${prevWork.id}`} className={styles.pageLink}>
                <span className={styles.pageLinkDir}>← PREV</span>
                <span className={styles.pageLinkTitle}>{prevWork.title}</span>
              </Link>
            )}
          </div>
          <Link to="/#works" className={styles.allLink}>一覧へ</Link>
          <div className={`${styles.paginationItem} ${styles.paginationRight}`}>
            {nextWork && (
              <Link to={`/works/${nextWork.id}`} className={styles.pageLink}>
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <h2 className={styles.sectionLabel}>{children}</h2>;
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.metaItem}>
      <dt className={styles.metaLabel}>{label}</dt>
      <dd className={styles.metaValue}>{value}</dd>
    </div>
  );
}
