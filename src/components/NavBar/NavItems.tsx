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
        className={`flex w-full ${alignmentClasses[alignment]} py-2.5 px-3 lg:w-fit`}
        data-sanity-id={item._id}
        data-sanity-type='navigation'
      >
        <Link href={`/${slug}`}>
          {isActive(slug) ? (
            <div className='flex gap-1'>
              <span>(</span>
              {item.name}
              <span>)</span>
            </div>
          ) : (
            <div className='flex'>{item.name}</div>
          )}
        </Link>
      </li>
    );
  };

  return (
    <ul className='flex w-full items-center flex-1 lg:justify-end'>
      {renderNavLink(first, 'left')}
      {middle.map((item) => renderNavLink(item, 'center'))}
      {renderNavLink(last, 'right')}
    </ul>
  );
};

export default NavItems;
