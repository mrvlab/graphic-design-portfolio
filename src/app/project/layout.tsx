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
import CloseButton from './CloseButton';
import { ScrollProgress } from './ScrollProgress';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraft = (await draftMode()).isEnabled;

  return (
    <div className='flex flex-col h-full pt-4 pb-2 lg:pt-0 '>
      <NavigationMenu hideFirstSection hideThirdSection hideAllOnDesktop />
      <nav className='max-lg:hidden flex max-lg:flex-col lg:grid lg:grid-cols-24 items-center px-2 z-50 max-lg:py-2 sticky top-0 lg:pt-3 lg:fixed lg:w-full'>
        <BlurDown />
        <div className='hidden lg:block z-10 px-3 py-2.5 lg:col-span-4'>
          <ScrollProgress />
        </div>
        <NavigationMenu hideFirstSection hideThirdSection />
        <CloseButton
          className='hidden lg:flex justify-end z-10 px-3 py-2.5 lg:col-span-4'
          id='desktop-close'
        />
      </nav>

      <div
        className={`flex  justify-between w-full sticky max-lg:top-0 max-lg:pt-[6px] z-50`}
      >
        <BlurDown />
        <div className='block lg:hidden z-10 px-3 py-2.5'>
          <ScrollProgress />
        </div>
        <CloseButton
          className='block lg:hidden z-10 px-3 py-2.5'
          id='mobile-close'
          ariaHidden={true}
        />
      </div>
      {/* Main content */}
      <main className='flex flex-col flex-1 h-full'>
        <LenisScroller />
        {children}
      </main>

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
