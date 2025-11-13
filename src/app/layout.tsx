import './globals.css';
import { lausanne } from '@/fonts/Lausanne';
import { Metadata } from 'next';
import { entranceOverlay } from '@/app/project/utils/entranceOverlayConstants';

export const metadata: Metadata = {
  title: 'Martina Quirici',
  description: 'Graphic Designer Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Script that runs before React to prevent layout flash
  const initScript = `
    (function() {
      try {
        var hasEntered = sessionStorage.getItem('${entranceOverlay.storage.hasEnteredKey}');
        if (hasEntered) {
          document.documentElement.classList.add('${entranceOverlay.classes.contentVisible}', '${entranceOverlay.classes.userEntered}');
        }
      } catch (e) {
        document.documentElement.classList.add('${entranceOverlay.classes.contentVisible}', '${entranceOverlay.classes.userEntered}');
      }
    })();
  `;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: initScript }} />
      </head>
      <body className={lausanne.className}>{children}</body>
    </html>
  );
}
