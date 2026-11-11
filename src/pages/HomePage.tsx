import HeroSection from '../sections/HeroSection';
import WorksSection from '../sections/WorksSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ContactSection from '../sections/ContactSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WorksSection onCarrotDrop={() => {}} />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
