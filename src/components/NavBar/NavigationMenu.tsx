import { fetchHeaderQuery } from '@/sanity/lib/queries';
import { getCurrentYear } from '@/utils/getCurrentYear';
import React from 'react';
import NavItems from './NavItems';
import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { FetchHeaderQueryResult } from '../../../sanity.types';
import BlurDown from './BlurDown';
import { dataAttr } from '@/sanity/lib/utils';

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

  const headerAttr = header?._id
    ? dataAttr({ id: header._id, type: 'header', path: 'name' }).toString()
    : undefined;

  return (
    <>
      {/* LEFT SECTION */}
      {!hideFirstSection && (
        <div
          className={`${visibilityClasses} lg:flex lg:flex-col w-full relative z-10 lg:col-span-4 lf`}
        >
          <span>&copy; {getCurrentYear()}</span>
          <span>{header?.lefttext}</span>
        </div>
      )}

      {/* CENTER SECTION */}
      {!hideSecondSection && (
        <Link
          href="/"
          id="mobile-nav-home"
          className={`${visibilityClasses} flex flex-col items-center relative w-full z-200 py-4 lg:py-0 lg:col-span-16`}
          aria-label={`${header?.name} - ${header?.workTitle}`}
          data-sanity={headerAttr}
        >
          <h1>{header?.name}</h1>
          <p>{header?.workTitle}</p>
        </Link>
      )}

      {/* RIGHT SECTION */}
      {!hideThirdSection && (
        <div
          id="mobile-nav-height"
          className={`${visibilityClasses} flex w-full sticky max-lg:top-0 z-200 lg:col-span-4 lg:justify-end`}
        >
          <div className="block lg:hidden">
            <BlurDown />
          </div>
          <div className="w-full relative lg:flex lg:justify-end">
            <ul className="flex items-center z-200 w-full lg:gap-3 lg:justify-between lg:max-w-[225px] ">
              <NavItems
                navItems={header?.navigationItems ?? []}
                headerId={header?._id}
              />
            </ul>
            <div
              className="absolute bottom-0 left-0 right-0 h-[0.5px] bg-black pointer-events-none z-200 lg:hidden "
              style={{ mixBlendMode: 'normal' }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default NavigationMenu;
