import type { Metadata } from 'next';
import './globals.css';
import Providers from './providers';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import { fontDisplay, fontSansBody } from './fonts';

export const metadata: Metadata = {
  title: 'My next book',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontDisplay.variable} ${fontSansBody.variable}`}>
        <Providers>
          <Theme
            accentColor="green"
            grayColor="sand"
            radius="full"
            appearance="light"
            panelBackground="solid"
            hasBackground={false}
          >
            {children}
          </Theme>
        </Providers>
      </body>
    </html>
  );
}
