import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { generateMetadata } from '@/utils/generateMetadata';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DraftMode/disableDraftMode';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import Navigation from '@/components/NavBar/NavigationMenu';
import Footer from '@/components/Footer/Footer';

export { generateMetadata };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang='en'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Liter&display=swap'
          rel='stylesheet'
        />
      </head>
      <body className='flex flex-col h-dvh pt-4 pb-2 lg:pt-3'>
        <Navigation />
        {/* Main content */}
        <main className='flex flex-col flex-1'>{children}</main>

        {/* Footer */}
        {await Footer()}
        {/* Other global utilities */}
        <SanityLive />
        {isDraft && (
          <>
            <DisableDraftMode />
            <VisualEditing />
          </>
        )}
        <Analytics />
      </body>
    </html>
  );
}
