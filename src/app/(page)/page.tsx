import { sanityFetch } from '@/sanity/lib/live';
import { fetchHomePageQuery } from '@/sanity/lib/queries';
import React from 'react';
import { FetchHomePageQueryResult } from '../../../sanity.types';
import { generateSeoMetadata } from '@/utils/generateMetadata';
import { DesktopColorSwapHomeGrid } from './HomeGrid/DesktopColorSwapHomeGrid';
import { MobileHomeGrid } from './HomeGrid/MobileHomeGrid';
import HomeGridCursor from './HomeGrid/HomeGridCursor/indtex';

export async function generateMetadata() {
  const { data: page } = await sanityFetch({
    query: fetchHomePageQuery,
  });

  return generateSeoMetadata({
    slug: 'home',
    page: page,
  });
}

const page = async () => {
  const { data }: { data: FetchHomePageQueryResult } = await sanityFetch({
    query: fetchHomePageQuery,
  });

  if (!data) {
    return (
      <div className="py-40 text-center text-3xl text-gray-500">
        404 – Home Not Found
      </div>
    );
  }

  const projects = data.projects;

  if (!projects?.length) {
    return (
      <div className="py-40 text-center text-3xl text-gray-500">
        No Projects Found
      </div>
    );
  }

  const testList = [
    {
      title: 'Project 1',
      color: '#377724',
      image: 'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62',
      targetPosition: 4,
    }, // Shift 4: P1 color → Pos 5, image loads at 1
    {
      title: 'Project 2',
      color: '#A9ADAC',
      image: 'https://i.scdn.co/image/ab67616d0000b273ff5429125128b43572dbdccd',
      targetPosition: 5,
    }, // Shift 5: P1 color → Pos 6, image loads at 2
    {
      title: 'Project 3',
      color: '#AA7026',
      image:
        'https://m.media-amazon.com/images/I/81Yl6KvkzmL._UF1000,1000_QL80_.jpg',
      targetPosition: 6,
    }, // Shift 6: P1 color → Pos 7, image loads at 3
    {
      title: 'Project 4',
      color: '#A6947E',
      image: 'https://i.scdn.co/image/ab67616d0000b2735da90b8a4dd6060cbcc0a6d9',
      targetPosition: 7,
    }, // Shift 7: P1 color → Pos 8, image loads at 4
    {
      title: 'Project 5',
      color: '#000000',
      image:
        'https://media.pitchfork.com/photos/608839f84c67840074db8afb/master/pass/Billie-Eilish-Happier-Than-Ever.jpeg',
      targetPosition: 8,
    }, // Shift 8: P1 color → Pos 9, image loads at 5
    {
      title: 'Project 6',
      color: '#DAD5B3',
      image:
        'https://upload.wikimedia.org/wikipedia/en/a/a0/Ariana_Grande_-_Positions.png',
      targetPosition: 9,
    }, // Shift 9: P1 color → Pos 10, image loads at 6
    {
      title: 'Project 7',
      color: '#9FAFBA',
      image:
        'https://imusic.b-cdn.net/images/item/original/131/4988031635131.jpg?ariana-grande-2024-eternal-sunshine-cd&class=scaled&v=1709206841',
      targetPosition: 10,
    }, // Shift 10: P1 color → Pos 11, image loads at 7
    {
      title: 'Project 8',
      color: '#4C192A',
      image:
        'https://upload.wikimedia.org/wikipedia/en/1/1e/Troye_Sivan_-_Bloom_(Official_Album_Cover).png',
      targetPosition: 11,
    }, // Shift 11: P1 color → Pos 12, image loads at 8
    {
      title: 'Project 9',
      color: '#C11D69',
      image: 'https://i.scdn.co/image/ab67616d0000b2736be9bac15995f089579074de',
      targetPosition: 0,
    }, // Shift 12: P1 color → Pos 1, image loads at 9
    {
      title: 'Project 10',
      color: '#D2AB91',
      image: 'https://i.scdn.co/image/ab67616d0000b27321a0329a398c9f726822f8b8',
      targetPosition: 1,
    }, // Shift 13: P1 color → Pos 2, image loads at 10
    {
      title: 'Project 11',
      color: '#000000',
      image:
        'https://m.media-amazon.com/images/I/710S2XwBrUL._UF1000,1000_QL80_.jpg',
      targetPosition: 2,
    }, // Shift 14: P1 color → Pos 3, image loads at 11
    {
      title: 'Project 12',
      color: '#6D80AB',
      image:
        'https://upload.wikimedia.org/wikipedia/en/0/08/Justin_Bieber_-_Justice.png',
      targetPosition: 3,
    }, // Shift 15: P1 color → Pos 4, image loads at 12
  ];

  return (
    <>
      <HomeGridCursor />

      <div className="hidden lg:block lg:my-auto">
        <DesktopColorSwapHomeGrid projects={testList} />
      </div>

      {/* Mobile version - simple static grid */}
      <div className="block lg:hidden">
        <MobileHomeGrid projects={testList} />
      </div>
    </>
  );
};

export default page;
