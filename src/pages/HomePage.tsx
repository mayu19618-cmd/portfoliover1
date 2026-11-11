import HeroSection from '../sections/HeroSection';
import WorksSection from '../sections/WorksSection';
import AboutSection from '../sections/AboutSection';
import ContactSection from '../sections/ContactSection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <WorksSection onCarrotDrop={() => {}} />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
