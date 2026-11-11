import { motion } from 'framer-motion';
import styles from './ContactSection.module.css';
import { siteData } from '../data/siteData';
import { pub } from '../utils/assets';

export default function ContactSection() {
  const snsLinks = [
    { name: 'Instagram', url: siteData.instagramUrl },
    { name: 'X / Twitter', url: siteData.twitterUrl },
    { name: 'Pinterest', url: siteData.pinterestUrl },
  ].filter((s) => s.url);

  return (
    <section id="contact" className={styles.section} aria-label="お問い合わせ">
      <div className={styles.inner}>
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionNo}>05</span>
            <span className={styles.headerLine} aria-hidden="true" />
          </div>
          <h2 className={styles.title}>
            Let's create<br />
            <span className={styles.titleAccent}>something lovely.</span>
          </h2>
          <p className={styles.sub}>あなたの想いを、一緒にかたちにしませんか？</p>
        </motion.div>

        <motion.div
          className={styles.contactArea}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {siteData.contactText && (
            <p className={styles.contactText}>
              {siteData.contactText.split('\n').map((line, i, arr) => (
                <span key={i}>
                  {line}
                  {i < arr.length - 1 && <br />}
                </span>
              ))}
            </p>
          )}

          <div className={styles.buttons}>
            <a href={`mailto:${siteData.contactEmail}`} className={styles.btnPrimary}>
              お問い合わせはこちら
            </a>
            <a href={`mailto:${siteData.contactEmail}`} className={styles.btnEmail}>
              {siteData.contactEmail}
            </a>
          </div>

          {snsLinks.length > 0 && (
            <div className={styles.sns}>
              <p className={styles.snsLabel}>SNS</p>
              <div className={styles.snsLinks}>
                {snsLinks.map(({ name, url }) => (
                  <a
                    key={name}
                    href={url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.snsBtn}
                    aria-label={name}
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          className={styles.farewellRabbit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          aria-hidden="true"
        >
          <motion.div
            animate={{ rotate: [0, 7, -3, 7, 0] } as any}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
            style={{ filter: 'drop-shadow(0 8px 20px rgba(232,160,180,0.3))', transformOrigin: 'center bottom' }}
          >
            <img
              src={pub('/rabbit1.png')}
              alt=""
              width={80}
              style={{ display: 'block' }}
              aria-hidden="true"
            />
          </motion.div>
          <p className={styles.farewellText}>またね！</p>
        </motion.div>
      </div>

      <footer className={styles.footer}>
        <p>© 2024 mayu. All rights reserved.</p>
        <p className={styles.footerNote}>※ このサイトはポートフォリオ用のサンプルサイトです</p>
      </footer>
    </section>
  );
}
