'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavigationQueryResult } from '../../../sanity.types';

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
    left: 'text-left lg:text-right',
    center: 'text-center lg:text-right',
    right: 'text-right lg:text-right',
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
        className={`flex-1 ${alignmentClasses[alignment]} py-2.5 px-3`}
        data-sanity-id={item._id}
        data-sanity-type='navigation'
      >
        <Link href={`/${slug}`}>
          {isActive(slug) ? `( ${item.name} )` : item.name}
        </Link>
      </li>
    );
  };

  return (
    <ul className='flex w-full items-center flex-1 lg:justify-end'>
      <div className='flex w-full lg:w-[260px]'>
        {renderNavLink(first, 'left')}
        {middle.map((item) => renderNavLink(item, 'center'))}
        {renderNavLink(last, 'right')}
      </div>
    </ul>
  );
};

export default NavItems;
