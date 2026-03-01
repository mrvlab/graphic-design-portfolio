import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DraftMode/disableDraftMode';
import { VisualEditing } from 'next-sanity/visual-editing';
import { draftMode } from 'next/headers';
import NavigationMenu from '@/components/NavBar/NavigationMenu';
import Footer from '@/components/Footer/Footer';
import { lausanne } from '@/fonts/Lausanne';
import LenisScroller from '@/components/LenisScroller';
import BlurDown from '@/components/NavBar/BlurDown';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <div className={`${lausanne.className} flex flex-col h-full lg:h-dvh pb-2`}>
      <NavigationMenu hideFirstSection hideAllOnDesktop />

      <nav
        id="desktop-nav-height"
        className="max-lg:hidden flex max-lg:flex-col lg:grid lg:grid-cols-24 items-center px-2 lg:pt-3 z-200 max-lg:py-2 sticky top-0"
      >
        <BlurDown />
        <NavigationMenu />
      </nav>
      {/* Main content */}
      <main className="flex flex-col flex-1">
        <LenisScroller />
        {children}
      </main>

      <div className="flex max-lg:flex-col w-full items-center z-50 max-lg:py-2 lg:sticky lg:bottom-0">
        {/* <BlurDown /> */}
        {/* Footer */}
        {await Footer()}
      </div>

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
