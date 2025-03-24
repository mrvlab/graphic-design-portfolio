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
  hideSideSections?: boolean;
};

const NavigationMenu = async ({ hideSideSections = false }: Props) => {
  const { data: navItems }: { data: NavigationQueryResult } = await sanityFetch(
    {
      query: navigationQuery,
    }
  );
  const { data: header }: { data: FetchHeaderQueryResult } = await sanityFetch({
    query: fetchHeaderQuery,
  });

  return (
    <nav className='flex max-lg:flex-col items-center px-2'>
      {/* LEFT SECTION */}
      {!hideSideSections && (
        <div className='hidden lg:flex lg:flex-col lg:flex-1'>
          <span>&copy; {getCurrentYear()}</span>
          <span>{header?.lefttext}</span>
        </div>
      )}

      {/* CENTER SECTION */}
      <Link href='/home' className='flex flex-col items-center flex-2'>
        <h1>{header?.name}</h1>
        <h1>{header?.workTitle}</h1>
      </Link>

      {/* RIGHT SECTION */}
      {!hideSideSections && <NavItems navItems={navItems} />}
    </nav>
  );
};

export default NavigationMenu;
