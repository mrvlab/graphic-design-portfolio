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
    <div className="flex flex-col h-screen">
      <NavigationMenu hideFirstSection hideAllOnDesktop />

      <nav className="max-lg:hidden flex max-lg:flex-col lg:grid lg:grid-cols-24 items-center px-2 lg:pt-3 z-200 max-lg:py-2 sticky top-0">
        <BlurDown />
        <NavigationMenu />
      </nav>
      {/* Main content */}
      <main className="flex flex-col flex-1 min-h-0 max-lg:pb-12 lg:py-[3%] lg:pr-[9.59%] lg:pl-[3.73%] lg:min-h-[calc(100dvh-var(--nav-footer-total-desktop))] lg:overflow-hidden lg:mx-auto lg:w-full">
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
