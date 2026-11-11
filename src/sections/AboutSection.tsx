import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';
import { profileData } from '../data/siteData';
import { pub } from '../utils/assets';

export default function AboutSection() {
  const photoSrc = profileData.photo ? pub(profileData.photo) : null;

  return (
    <section id="about" className={styles.section} aria-label="自己紹介">
      <div className={styles.bgDeco} aria-hidden="true">
        {[...Array(5)].map((_, i) => (
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
                <div className={styles.photoPlaceholder} aria-label="プロフィール写真（未設定）">
                  <span className={styles.photoPlaceholderIcon} aria-hidden="true">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                      <circle cx="20" cy="15" r="7" stroke="#F4B8CE" strokeWidth="2" />
                      <path d="M4 36c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#F4B8CE" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.photoPlaceholderText}>管理画面から写真を追加</span>
                </div>
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
              {profileData.bio.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  {i < profileData.bio.split('\n').length - 1 && <br />}
                </span>
              ))}
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
