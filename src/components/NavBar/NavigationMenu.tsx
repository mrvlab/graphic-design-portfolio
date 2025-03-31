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

  const isMobile = hideAllOnMobile ? 'hidden' : '';
  const isDesktop = hideAllOnDesktop ? 'lg:hidden' : '';

  return (
    <>
      {/* LEFT SECTION */}
      {!hideFirstSection && (
        <div
          className={`${isMobile} ${isDesktop} lg:flex lg:flex-col lg:flex-1 relative`}
        >
          <span>&copy; {getCurrentYear()}</span>
          <span>{header?.lefttext}</span>
        </div>
      )}

      {/* CENTER SECTION */}
      {!hideSecondSection && (
        <Link
          href='/home'
          className={`flex flex-col items-center flex-2 relative ${isMobile} ${isDesktop} `}
        >
          <h1>{header?.name}</h1>
          <h1>{header?.workTitle}</h1>
        </Link>
      )}

      {/* RIGHT SECTION */}
      {!hideThirdSection && (
        <ul
          className={`${isMobile} ${isDesktop} flex w-full items-center flex-1 lg:justify-end sticky max-lg:top-0 max-lg:pt-[6px] backdrop-blur-md`}
        >
          <NavItems navItems={navItems} />
        </ul>
      )}
    </>
  );
};

export default NavigationMenu;
