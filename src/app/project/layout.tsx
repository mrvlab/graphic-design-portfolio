import '../globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SanityLive } from '@/sanity/lib/live';
import { DisableDraftMode } from '@/components/DraftMode/disableDraftMode';
import { VisualEditing } from 'next-sanity';
import { draftMode } from 'next/headers';
import Navigation from '@/components/NavBar/NavigationMenu';
import Footer from '@/components/Footer/Footer';
import BlurDown from '@/components/NavBar/BlurDown';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <div className='flex flex-col h-full pt-4 pb-2 lg:pt-0 '>
      <Navigation hideFirstSection hideThirdSection hideAllOnDesktop />
      <nav className='max-lg:hidden flex max-lg:flex-col items-center px-2 z-50 max-lg:py-2 sticky top-0 lg:pt-3 lg:fixed lg:w-full'>
        <BlurDown />
        <div className='hidden lg:block z-10'>50%</div>
        <Navigation hideFirstSection hideThirdSection />
        <div className='hidden lg:block z-10'>Close</div>
      </nav>

      <div
        className={`flex  justify-between w-full sticky max-lg:top-0 max-lg:pt-[6px] z-50`}
      >
        <div className='block lg:hidden z-10'>50%</div>
        <div className='block lg:hidden z-10'>Close</div>
      </div>
      {/* Main content */}
      <main className='flex flex-col flex-1 h-full'>{children}</main>

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
