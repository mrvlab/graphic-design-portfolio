import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DraftMode/disableDraftMode';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import NavigationMenu from '@/components/NavBar/NavigationMenu';
import Footer from '@/components/Footer/Footer';
import BlurDown from '@/components/NavBar/BlurDown';
import LenisScroller from '@/components/LenisScroller';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <div className='flex flex-col h-dvh pt-4 pb-2 lg:pt-3'>
      <NavigationMenu hideFirstSection hideAllOnDesktop />

      <nav className='max-lg:hidden flex max-lg:flex-col items-center px-2 z-50 max-lg:py-2 sticky top-0'>
        <BlurDown />
        <NavigationMenu />
      </nav>
      {/* Main content */}
      <main className='flex flex-col flex-1'>
        <LenisScroller />
        {children}
      </main>

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
    </div>
  );
}
