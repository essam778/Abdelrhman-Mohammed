import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SkipLink from '@/components/SkipLink';

const NeuralCanvas = dynamic(() => import('@/components/NeuralCanvas'));
const CustomCursor = dynamic(() => import('@/components/CustomCursor'));
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'));
const RevealObserver = dynamic(() => import('@/components/RevealObserver'));
const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'));
const Projects = dynamic(() => import('@/components/Projects'));
const Experience = dynamic(() => import('@/components/Experience'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <>
      <SkipLink />
      <NeuralCanvas />
      <CustomCursor />
      <ScrollProgress />
      <RevealObserver />
      <Navbar />
      <main id="main-content" aria-label="Portfolio content">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
