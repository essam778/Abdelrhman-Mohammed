import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import SkipLink from '@/components/SkipLink';
import SectionRenderer from '@/components/SectionRenderer';

const NeuralCanvas = dynamic(() => import('@/components/NeuralCanvas'));
const CustomCursor = dynamic(() => import('@/components/CustomCursor'));
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'));
const RevealObserver = dynamic(() => import('@/components/RevealObserver'));

export default function Home() {
  return (
    <>
      <SkipLink />
      <NeuralCanvas />
      <CustomCursor />
      <ScrollProgress />
      <RevealObserver />
      <Navbar />
      <SectionRenderer />
    </>
  );
}
