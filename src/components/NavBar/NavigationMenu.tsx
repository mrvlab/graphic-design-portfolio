import { navigationQuery, settingsQuery } from '@/sanity/lib/queries';
import { getCurrentYear } from '@/utils/getCurrentYear';
import React from 'react';
import NavItems from './NavItems';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import {
  NavigationQueryResult,
  SettingsQueryResult,
} from '../../../sanity.types';
import { PortableText } from 'next-sanity';
type Props = {
  hideSideSections?: boolean;
};

const NavigationMenu = async ({ hideSideSections = false }: Props) => {
  const { data: navItems }: { data: NavigationQueryResult } = await sanityFetch(
    {
      query: navigationQuery,
    }
  );
  const { data: settings }: { data: SettingsQueryResult } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <nav className='flex max-lg:flex-col items-center px-2'>
      {/* LEFT SECTION */}
      {!hideSideSections && (
        <div className='hidden lg:flex lg:flex-col lg:flex-1'>
          <span>&copy; {getCurrentYear()}</span>
          <span>Creative Services</span>
        </div>
      )}

      {/* CENTER SECTION */}
      <Link href='/home' className='flex flex-col items-center flex-2'>
        <h1>{settings?.title}</h1>
        {settings?.description && (
          <div>
            <PortableText value={settings.description} />
          </div>
        )}
      </Link>

      {/* RIGHT SECTION */}
      {!hideSideSections && <NavItems navItems={navItems} />}
    </nav>
  );
};

export default NavigationMenu;
