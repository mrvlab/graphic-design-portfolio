import { fetchHeaderQuery, navigationQuery } from '@/sanity/lib/queries';
import { getCurrentYear } from '@/utils/getCurrentYear';
import React from 'react';
import NavItems from './NavItems';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import {
  FetchHeaderQueryResult,
  NavigationQueryResult,
} from '../../../sanity.types';
import BlurDown from './BlurDown';

type Props = {
  hideFirstSection?: boolean;
  hideSecondSection?: boolean;
  hideThirdSection?: boolean;
  hideAllOnMobile?: boolean;
  hideAllOnDesktop?: boolean;
};

const NavigationMenu = async ({
  hideFirstSection = false,
  hideSecondSection = false,
  hideThirdSection = false,
  hideAllOnMobile = false,
  hideAllOnDesktop = false,
}: Props) => {
  const { data: navItems }: { data: NavigationQueryResult } = await sanityFetch(
    {
      query: navigationQuery,
    }
  );
  const { data: header }: { data: FetchHeaderQueryResult } = await sanityFetch({
    query: fetchHeaderQuery,
  });

  // Combine mobile and desktop visibility
  const getVisibilityClasses = () => {
    if (hideAllOnMobile && hideAllOnDesktop) return 'hidden';
    if (hideAllOnMobile) return 'hidden lg:block';
    if (hideAllOnDesktop) return 'block lg:hidden';
    return 'block';
  };

  const visibilityClasses = getVisibilityClasses();

  return (
    <>
      {/* LEFT SECTION */}
      {!hideFirstSection && (
        <div
          className={`${visibilityClasses} lg:flex lg:flex-col w-full relative z-10 lg:col-span-4`}
        >
          <span>&copy; {getCurrentYear()}</span>
          <span>{header?.lefttext}</span>
        </div>
      )}

      {/* CENTER SECTION */}
      {!hideSecondSection && (
        <Link
          href='/'
          className={`${visibilityClasses} flex flex-col items-center relative w-full z-50 py-4 lg:py-0 lg:col-span-16`}
          aria-label={`${header?.name} - ${header?.workTitle}`}
        >
          <h1>{header?.name}</h1>
          <p>{header?.workTitle}</p>
        </Link>
      )}

      {/* RIGHT SECTION */}
      {!hideThirdSection && (
        <div
          className={`${visibilityClasses} flex w-full sticky max-lg:top-0 z-10 lg:col-span-4 lg:justify-end`}
        >
          <div className='block lg:hidden'>
            <BlurDown />
          </div>
          <ul className='max-lg:border-b-[0.5px] flex items-center z-10 w-full lg:gap-3 lg:justify-between lg:max-w-[225px] bg-white'>
            <NavItems navItems={navItems} />
          </ul>
        </div>
      )}
    </>
  );
};

export default NavigationMenu;
