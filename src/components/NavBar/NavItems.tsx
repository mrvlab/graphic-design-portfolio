'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FetchHeaderQueryResult } from '../../../sanity.types';
import { dataAttr } from '@/sanity/lib/utils';

type NavItem = NonNullable<
  NonNullable<FetchHeaderQueryResult>['navigationItems']
>[number];

type Props = {
  navItems: NavItem[];
  headerId?: string;
};

const NavItems = ({ navItems, headerId }: Props) => {
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
    item: NavItem,
    alignment: 'left' | 'center' | 'right'
  ) => {
    const slug = item.slug;
    if (!slug) return null;

    // Menu items are now inline on the header, so click-to-edit targets the
    // header document and addresses the item by its array key.
    const sanityAttr = headerId
      ? dataAttr({
          id: headerId,
          type: 'header',
          path: `navigationItems[_key=="${item._key}"].name`,
        }).toString()
      : undefined;

    return (
      <li
        key={item._key}
        className={`flex w-full ${alignmentClasses[alignment]} py-2.5 px-3 lg:w-fit lg:px-0 z-10`}
        data-sanity={sanityAttr}
      >
        <Link href={`/${slug}`}>
          <div className="flex gap-1 group">
            <span
              className={`transition-opacity duration-400 ${isActive(slug) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            >
              (
            </span>
            {item.name}
            <span
              className={`transition-opacity duration-400 ${isActive(slug) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            >
              )
            </span>
          </div>
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
