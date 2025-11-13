import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DraftMode/disableDraftMode';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import NavigationMenu from '@/components/NavBar/NavigationMenu';
import Footer from '@/components/Footer/Footer';
import BlurDown from '@/components/NavBar/BlurDown';
import { EntranceOverlay } from '@/components/EntranceOverlay/EntranceOverlay';
import { sanityFetch } from '@/sanity/lib/live';
import { fetchHomePageQuery } from '@/sanity/lib/queries';
import { LayoutHeightTracker } from '@/components/MobileNavHeightTracker';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  // Fetch entrance text from CMS
  const { data } = await sanityFetch({
    query: fetchHomePageQuery,
  });

  return (
    <>
      <EntranceOverlay
        enterSiteText={data?.enterSiteText || 'Enter Site'}
        enterSiteLogo={data?.enterSiteLogo}
      />
      <LayoutHeightTracker />

      {/* Wrapper for content that should be hidden behind overlay */}
      <div id="main-content-wrapper" className="flex flex-col h-full lg:h-dvh">
        <NavigationMenu hideFirstSection hideAllOnDesktop />

        <nav
          id="desktop-nav-height"
          className="max-lg:hidden flex max-lg:flex-col lg:grid lg:grid-cols-24 items-center px-2 lg:pt-3 z-200 max-lg:py-2 sticky top-0"
        >
          <BlurDown />
          <NavigationMenu />
        </nav>
        {/* Main content */}
        <main className="flex flex-col flex-1 min-h-0 lg:flex-row lg:my-auto">
          {children}
        </main>

        {/* Footer */}
        <Footer />
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
    </>
  );
}
