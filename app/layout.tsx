import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Space_Grotesk, Alfa_Slab_One, Cairo, Tajawal } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-space-grotesk', display: 'swap' });
const alfaSlabOne = Alfa_Slab_One({ subsets: ['latin'], weight: '400', variable: '--font-alfa-slab', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['400', '600', '700', '800'], variable: '--font-cairo', display: 'swap' });
const tajawal = Tajawal({ subsets: ['arabic', 'latin'], weight: ['400', '500', '700'], variable: '--font-tajawal', display: 'swap' });


export const metadata: Metadata = {
  title: 'Abdulrahman Mohamed — AI Engineer & Data Scientist',
  description: 'AI Engineer & Data Scientist specializing in machine learning, deep learning, NLP and embedded systems. Building intelligent systems that make real-world impact.',
  keywords: ['AI Engineer', 'Data Scientist', 'Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'PyTorch'],
  authors: [{ name: 'Abdulrahman Mohamed' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Abdulrahman Mohamed — AI Engineer & Data Scientist',
    description: 'AI Engineer & Data Scientist building intelligent systems with ML, DL & embedded systems.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abdulrahman Mohamed — AI Engineer',
    description: 'AI Engineer & Data Scientist building intelligent systems.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark" className={`${spaceGrotesk.variable} ${alfaSlabOne.variable} ${cairo.variable} ${tajawal.variable}`} suppressHydrationWarning>
      <head>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
