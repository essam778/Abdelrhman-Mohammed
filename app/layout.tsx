import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import FontLoader from '@/components/FontLoader';

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
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-page-custom-font */}
          <link
            href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700&family=Fira+Code:wght@400;500;600&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body>
        <FontLoader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
