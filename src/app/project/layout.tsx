import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DraftMode/disableDraftMode';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import Navigation from '@/components/NavBar/NavigationMenu';
import Footer from '@/components/Footer/Footer';
import { lausanne300 } from '@/fonts/Lausanne';
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <html lang='en'>
      <body
        className={`$ ${lausanne300.className}  flex flex-col h-dvh pt-4 pb-2 lg:pt-3`}
      >
        <Navigation hideSideSections />
        {/* Main content */}
        <main className='flex flex-col flex-1'>{children}</main>

        {/* Footer */}
        <Footer />

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
