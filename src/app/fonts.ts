import { Playfair_Display, Public_Sans } from 'next/font/google';

export const fontDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-display',
  display: 'swap',
});

export const fontSansBody = Public_Sans({
  subsets: ['latin'],
  variable: '--font-sans-body',
  display: 'swap',
});
