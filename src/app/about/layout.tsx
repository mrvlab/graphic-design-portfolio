import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DraftMode/disableDraftMode';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import NavigationMenu from '@/components/NavBar/NavigationMenu';
import Footer from '@/components/Footer/Footer';
import LenisScroller from '@/components/LenisScroller';
import BlurDown from '@/components/NavBar/BlurDown';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <div className="flex flex-col h-full lg:h-dvh">
      <NavigationMenu hideFirstSection hideAllOnDesktop />

      <nav className="max-lg:hidden flex max-lg:flex-col lg:grid lg:grid-cols-24 items-center px-2 lg:pt-3 z-200 max-lg:py-2 sticky top-0">
        <BlurDown />

        <NavigationMenu />
      </nav>
      {/* Main content */}
      <main className="flex flex-col flex-1">
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
