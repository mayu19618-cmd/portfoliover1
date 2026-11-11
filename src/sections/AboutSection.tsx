import { motion } from 'framer-motion';
import styles from './AboutSection.module.css';
import { pub } from '../utils/assets';

const aboutItems = [
  {
    icon: '💫',
    heading: 'デザインへの想い',
    body: 'デザインは、想いを言葉以上に伝えられる魔法だと思っています。見た瞬間に「かわいい」「素敵」と感じてもらえる、そんなときめきのあるデザインを大切にしています。',
  },
  {
    icon: '🎨',
    heading: '得意ジャンル',
    body: '女性向けのブランディング・WebデザインやSNSコンテンツ制作が得意です。ナチュラル・ガーリー・北欧テイストなど、やわらかくて温かみのあるデザインを多く手がけています。',
  },
  {
    icon: '✨',
    heading: '提供できるサービス',
    body: 'ロゴ・名刺・フライヤーなどのグラフィックデザイン、WebサイトのデザインおよびコーディングWordPressでのサイト構築、SNSコンテンツの制作まで幅広くお手伝いします。',
  },
  {
    icon: '🌸',
    heading: '制作で大切にしていること',
    body: 'クライアントさんの「こうしたい」という想いをヒアリングし、ターゲットに響くデザインを一緒に作り上げること。納品後に「作ってよかった！」と思っていただける制作を心がけています。',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className={styles.section} aria-label="自己紹介">
      <div className={styles.inner}>
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className={styles.sectionNo}>03</span>
          <h2 className={styles.title}>About Me</h2>
          <p className={styles.sub}>デザインに、ちょっとしたときめきを。</p>
        </motion.div>

        <div className={styles.layout}>
          {/* プロフィール */}
          <motion.div
            className={styles.profileCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                <img
                  src={pub('/rabbit1.png')}
                  alt="うさぎのキャラクター"
                  width={88}
                  style={{ display: 'block', filter: 'drop-shadow(0 4px 12px rgba(215,130,160,0.3))' }}
                />
              </div>
            </div>
            <div className={styles.profileInfo}>
              <p className={styles.name}>mayu.</p>
              <p className={styles.role}>Graphic Designer / Web Designer</p>
              <p className={styles.intro}>
                {/* 後から編集できます */}
                はじめまして、mayuです。<br />
                女性向けのやわらかくてかわいいデザインを得意としています。<br /><br />
                クライアントさんの想いに寄り添い、ブランドの世界観を丁寧に言語化しながら、見ている人の心がときめくデザインをお届けしています。<br /><br />
                "かわいい"と"機能的"を両立したデザインで、あなたのブランドをもっと輝かせます。
              </p>
            </div>
          </motion.div>

          {/* 詳細 */}
          <div className={styles.detailCol}>
            {aboutItems.map((item, i) => (
              <motion.div
                key={item.heading}
                className={styles.card}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className={styles.cardIcon} aria-hidden="true">{item.icon}</span>
                <div>
                  <h3 className={styles.cardHeading}>{item.heading}</h3>
                  <p className={styles.cardBody}>{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
