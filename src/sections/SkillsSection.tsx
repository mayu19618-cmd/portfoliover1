import { motion } from 'framer-motion';
import styles from './SkillsSection.module.css';
import { skillsData } from '../data/siteData';

function SkillDots({ level }: { level: number }) {
  return (
    <span className={styles.dots} aria-label={`レベル ${level}/5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= level ? styles.dotFilled : styles.dotEmpty} />
      ))}
    </span>
  );
}

export default function SkillsSection() {
  const groups = skillsData.groups;

  return (
    <section id="skills" className={styles.section} aria-label="スキル一覧">
      <div className={styles.inner}>
        <motion.div
          className={styles.heading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className={styles.eyebrowRow}>
            <span className={styles.sectionNo}>04</span>
            <span className={styles.headerLine} aria-hidden="true" />
          </div>
          <h2 className={styles.title}>My Skills</h2>
          <p className={styles.sub}>得意なツールとスキルセット</p>
        </motion.div>

        <div className={styles.groups}>
          {groups.map((group, gi) => (
            <motion.div
              key={group.category}
              className={styles.group}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
            >
              <h3 className={styles.groupTitle}>{group.category}</h3>
              <ul className={styles.skillList}>
                {group.skills.map((skill, si) => (
                  <motion.li
                    key={skill.name}
                    className={styles.skillItem}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.1 + si * 0.06 }}
                  >
                    <span className={styles.skillName}>{skill.name}</span>
                    <SkillDots level={skill.level} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
