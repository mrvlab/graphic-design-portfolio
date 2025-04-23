import './globals.css';
import { lausanne } from '@/fonts/Lausanne';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Martina Quirici',
  description: 'Graphic Designer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={lausanne.className}>{children}</body>
    </html>
  );
}
