import { motion } from 'framer-motion';
import styles from './SkillsSection.module.css';

const skillGroups = [
  {
    category: 'Design',
    icon: '🎨',
    color: '#FCE4EC',
    skills: [
      { name: 'Adobe Illustrator', level: 'Advanced' },
      { name: 'Adobe Photoshop', level: 'Advanced' },
      { name: 'Figma', level: 'Advanced' },
    ],
  },
  {
    category: 'Web',
    icon: '💻',
    color: '#E8EAF6',
    skills: [
      { name: 'HTML', level: 'Advanced' },
      { name: 'CSS', level: 'Advanced' },
      { name: 'JavaScript', level: 'Intermediate' },
      { name: 'WordPress', level: 'Intermediate' },
      { name: 'Elementor', level: 'Intermediate' },
    ],
  },
  {
    category: 'Marketing',
    icon: '📱',
    color: '#E8F5E9',
    skills: [
      { name: 'SNS Marketing', level: 'Intermediate' },
      { name: 'Content Planning', level: 'Intermediate' },
      { name: 'Branding', level: 'Advanced' },
    ],
  },
];

const levelLabel: Record<string, { label: string; color: string }> = {
  Advanced: { label: '上級', color: '#D782A0' },
  Intermediate: { label: '中級', color: '#F4B8CE' },
  Beginner: { label: '初級', color: '#FCE4EC' },
};

export default function SkillsSection() {
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
          <span className={styles.sectionNo}>04</span>
          <h2 className={styles.title}>My Skills</h2>
          <p className={styles.sub}>得意なツールとスキルセット</p>
        </motion.div>

        <div className={styles.note} role="note">
          ※ 習熟度は上級・中級・初級で表示しています（後から編集可）
        </div>

        <div className={styles.groups}>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              className={styles.group}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: gi * 0.12 }}
            >
              <div className={styles.groupHeader} style={{ background: group.color }}>
                <span className={styles.groupIcon} aria-hidden="true">{group.icon}</span>
                <h3 className={styles.groupTitle}>{group.category}</h3>
              </div>
              <ul className={styles.skillList}>
                {group.skills.map((skill, si) => (
                  <motion.li
                    key={skill.name}
                    className={styles.skillItem}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: gi * 0.12 + si * 0.07 }}
                  >
                    <span className={styles.skillName}>{skill.name}</span>
                    <span
                      className={styles.levelBadge}
                      style={{
                        background: levelLabel[skill.level]?.color + '30',
                        color: levelLabel[skill.level]?.color,
                        borderColor: levelLabel[skill.level]?.color + '50',
                      }}
                    >
                      {levelLabel[skill.level]?.label ?? skill.level}
                    </span>
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
