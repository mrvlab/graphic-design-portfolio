import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DraftMode/disableDraftMode';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import Navigation from '@/components/NavBar/NavigationMenu';
import Footer from '@/components/Footer/Footer';
import { lausanne } from '@/fonts/Lausanne';
import BlurDown from '@/components/NavBar/BlurDown';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <div
      className={`${lausanne.className} flex flex-col h-dvh pt-4 pb-2 lg:pt-3`}
    >
      <nav className='flex max-lg:flex-col items-center px-2 z-50 max-lg:py-2'>
        <BlurDown />
        <Navigation hideFirstSection hideThirdSection />
      </nav>
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
    </div>
  );
}
