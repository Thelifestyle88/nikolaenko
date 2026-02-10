import { Header } from '@/components/Header/Header';
import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { Projects } from '@/components/Projects/Projects';
import { Experience } from '@/components/Experience/Experience';
import { Contacts } from '@/components/Contacts/Contacts';
import { Footer } from '@/components/Footer/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
