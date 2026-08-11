"use client";

import { useSectionTransition } from "@/components/SectionTransition";
import Hero from "@/components/Hero";
import dynamic from 'next/dynamic';

const About = dynamic(() => import('@/components/About'), { ssr: false });
const Skills = dynamic(() => import('@/components/Skills'), { ssr: false });
const Projects = dynamic(() => import('@/components/Projects'), { ssr: false });
const Experience = dynamic(() => import('@/components/Experience'), { ssr: false });
const Contact = dynamic(() => import('@/components/Contact'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

export default function SectionRenderer() {
  const { activeSectionId } = useSectionTransition();

  return (
    <main id="main-content" aria-label="Portfolio content" style={{ paddingBottom: activeSectionId === '#contact' ? 0 : '10vh' }}>
      {activeSectionId === '#hero' && <Hero />}
      {activeSectionId === '#about' && <About />}
      {activeSectionId === '#skills' && <Skills />}
      {activeSectionId === '#projects' && <Projects />}
      {activeSectionId === '#experience' && <Experience />}
      {activeSectionId === '#contact' && (
        <>
          <Contact />
          <Footer />
        </>
      )}
    </main>
  );
}
