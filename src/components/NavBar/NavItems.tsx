'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationQueryResult } from '../../../sanity.types';
import HoverableTitle from '@/components/HoverableTitle';

type Props = {
  navItems: NavigationQueryResult;
};

const NavItems = ({ navItems }: Props) => {
  const pathname = usePathname();

  if (navItems.length < 3) return null;

  const first = navItems[0];
  const last = navItems[navItems.length - 1];
  const middle = navItems.slice(1, -1);

  const isActive = (slug: string) => pathname === `/${slug}`;

  const alignmentClasses = {
    left: 'justify-start lg:justify-end',
    center: 'justify-center lg:justify-end',
    right: 'justify-end lg:justify-end',
  };

  const renderNavLink = (
    item: (typeof navItems)[number],
    alignment: 'left' | 'center' | 'right'
  ) => {
    const slug = item.slug;
    if (!slug) return null;

    return (
      <li
        key={item._id}
        className={`flex w-full ${alignmentClasses[alignment]} py-2.5 max-lg:px-3 lg:w-fit z-10`}
        data-sanity-id={item._id}
        data-sanity-type='navigation'
      >
        <Link href={`/${slug}`} className='flex gap-1'>
          <HoverableTitle name={item.name} isHovered={isActive(slug)} />
        </Link>
      </li>
    );
  };

  return (
    <>
      {renderNavLink(first, 'left')}
      {middle.map((item) => renderNavLink(item, 'center'))}
      {renderNavLink(last, 'right')}
    </>
  );
};

export default NavItems;
