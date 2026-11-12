import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';
import { profileData } from '../data/siteData';
import { pub } from '../utils/assets';
import { formatText } from '../utils/formatText';

export default function AboutSection() {
  const photoSrc = profileData.photo ? pub(profileData.photo) : null;

  return (
    <section id="about" className={styles.section} aria-label="自己紹介">
      {/* blob clip path — ID はドキュメント全体で一意 */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="aboutBlobClip" clipPathUnits="objectBoundingBox">
            <path d="M 0.50,0.03 C 0.67,0.00 0.90,0.04 0.96,0.22 C 1.02,0.40 0.94,0.58 0.97,0.74 C 1.00,0.90 0.86,1.02 0.67,0.99 C 0.48,0.96 0.26,1.03 0.10,0.93 C -0.04,0.83 0.03,0.64 0.03,0.46 C 0.03,0.28 0.10,0.07 0.28,0.03 C 0.37,0.01 0.44,0.04 0.50,0.03 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className={styles.bgDeco} aria-hidden="true">
        {[...Array(2)].map((_, i) => (
          <div key={i} className={styles.bgCircle} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className={styles.inner}>
        <div className={styles.layout}>
          {/* 左：プロフィール写真 */}
          <motion.div
            className={styles.photoCol}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.photoFrame} aria-label="プロフィール写真">
              {photoSrc ? (
                <img src={photoSrc} alt={`${profileData.name}のプロフィール写真`} className={styles.photo} />
              ) : (
                <div className={styles.photoPlaceholder} aria-label="プロフィール写真（未設定）" />
              )}
            </div>
          </motion.div>

          {/* 右：テキスト */}
          <motion.div
            className={styles.textCol}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className={styles.eyebrowRow}>
              <span className={styles.sectionNo}>03</span>
              <span className={styles.headerLine} aria-hidden="true" />
            </div>
            <h2 className={styles.title}>About Me</h2>

            <p className={styles.name}>{profileData.name}</p>
            <p className={styles.role}>{profileData.role}</p>

            <p className={styles.bio}>
              {formatText(profileData.bio)}
            </p>

            {profileData.features && profileData.features.length > 0 && (
              <ul className={styles.featureList}>
                {profileData.features.map((f) => (
                  <li key={f.heading} className={styles.featureItem}>
                    <span className={styles.featureHeading}>{f.heading}</span>
                    <p className={styles.featureBody}>{f.body}</p>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
