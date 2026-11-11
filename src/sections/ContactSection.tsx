import { motion } from 'framer-motion';
import styles from './ContactSection.module.css';
import { pub } from '../utils/assets';

export default function ContactSection() {
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
          <span className={styles.sectionNo}>05</span>
          <h2 className={styles.title}>Let's create something lovely.</h2>
          <p className={styles.sub}>あなたの想いを、一緒にかたちにしませんか？</p>
        </motion.div>

        <motion.div
          className={styles.contactBox}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className={styles.contactText}>
            お仕事のご依頼・ご相談はお気軽にどうぞ。<br />
            まずはお問い合わせフォームまたはメールにてご連絡ください。
          </p>

          <div className={styles.buttons}>
            <a
              href="mailto:mayu@example.com"
              className={styles.btnPrimary}
              aria-label="メールでお問い合わせ（架空のアドレス）"
            >
              お問い合わせはこちら
            </a>
            <a href="mailto:mayu@example.com" className={styles.btnSecondary}>
              mayu@example.com
            </a>
          </div>

          <div className={styles.sns}>
            <p className={styles.snsLabel}>SNS</p>
            <div className={styles.snsLinks}>
              {['Instagram', 'X / Twitter', 'Pinterest'].map((name) => (
                <a
                  key={name}
                  href="https://example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.snsBtn}
                  aria-label={`${name}（架空）`}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* うさぎのお見送り */}
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
            style={{ filter: 'drop-shadow(0 10px 24px rgba(215,130,160,0.3))', transformOrigin: 'center bottom' }}
          >
            <img
              src={pub('/rabbit1.png')}
              alt=""
              width={88}
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
