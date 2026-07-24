'use client';

import { useEffect } from 'react';

const FONT_URL = 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Cairo:wght@400;600;700;800&family=Tajawal:wght@400;500;700&family=Fira+Code:wght@400;500;600&display=swap';

export default function FontLoader() {
  useEffect(() => {
    const link = document.createElement('link');
    link.href = FONT_URL;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return null;
}
