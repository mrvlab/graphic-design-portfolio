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

  const renderNavLink = (
    item: (typeof navItems)[number],
    alignment: 'left' | 'center' | 'right'
  ) => {
    const slug = item.slug;
    if (!slug) return null;

    return (
      <li
        key={item._id}
        className={`flex-1 text-${alignment} py-2.5 px-3`}
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
        <li className='flex-1 text-center py-2.5 px-3'>
          {middle.map((item) =>
            item.slug ? (
              <span
                key={item._id}
                data-sanity-id={item._id}
                data-sanity-type='navigation'
                className='mx-2'
              >
                <Link href={`/${item.slug}`}>
                  {isActive(item.slug) ? `( ${item.name} )` : item.name}
                </Link>
              </span>
            ) : null
          )}
        </li>

        {renderNavLink(last, 'right')}
      </div>
    </ul>
  );
};

export default NavItems;
