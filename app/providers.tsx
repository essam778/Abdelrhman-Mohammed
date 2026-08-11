'use client';

import { type ReactNode } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { SectionTransitionProvider } from '@/components/SectionTransition';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SectionTransitionProvider>
          {children}
        </SectionTransitionProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
