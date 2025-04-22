import './globals.css';
import { lausanne } from '@/fonts/Lausanne';
import { Metadata } from 'next';
import CustomCursor from '@/components/CustomCursor/CustomCursor';

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
      <body className={lausanne.className}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
