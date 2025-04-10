import { FirstLayoutHeightCalculator } from '@/app/project/ProjectLayouts/FirstLayout/FirstLayoutHeightCalculator';
import React from 'react';
import { SingleProjectQueryResult } from '../../../../../sanity.types';

const FirstLayout = ({ project }: { project: SingleProjectQueryResult }) => {
  return (
    <>
      <FirstLayoutHeightCalculator />
      <div className='flex flex-col relative' id='first-layout'>
        <section className='flex flex-col justify-center items-center sticky top-0 min-h-dvh flex-1 bg-transparent z-10'>
          First section
        </section>
        <div>
          <section
            id='first-bg-media-section'
            className='flex flex-col absolute top-0 left-0 right-0 flex-1 min-h-dvh h-[calc(200dvh+var(--first-media-section-height))] bg-red-400 z-0'
          >
            Background image
          </section>
          <section
            id='first-media-section'
            className='grid grid-cols-16 relative h-dvh lg:h-fit bg-transparent lg:grid-cols-24 z-20'
          >
            <div className='aspect-3/4 col-start-4 col-span-10 lg:col-start-2 lg:col-span-6 bg-amber-200 mt-[7.5rem]'>
              <div>First media 1</div>
            </div>
          </section>
          <section
            id='second-media-section'
            className='grid grid-cols-16 relative h-dvh lg:min-h-dvh bg-transparent lg:grid lg:grid-cols-24 z-20'
          >
            <div className='aspect-3/4 col-start-2 col-span-14 lg:col-start-15 lg:col-span-9  bg-amber-400 lg:-translate-y-[10%]'>
              Second media 2
            </div>
          </section>

          <section
            id='third-media-section'
            className='grid grid-cols-16 sticky top-0 min-h-dvh lg:grid-cols-24 bg-transparent p-6 z-20'
          >
            <div className='aspect-16/9 col-start-2 col-span-14 self-center lg:col-start-6 lg:col-span-14 bg-amber-600 '>
              Third media 3
            </div>
          </section>
        </div>

        <div>
          <section
            id='second-bg-media-section'
            className='flex flex-col justify-center items-center sticky top-0 min-h-dvh flex-1 bg-blue-400 z-20'
          >
            Second background image
          </section>
          <section
            id='fourth-media-section'
            className='grid grid-cols-16 sticky top-0 min-h-dvh lg:aspect-[5/4] lg:h-fit lg:flex-1 bg-transparent lg:grid-cols-24 z-20'
          >
            <div className='aspect-4/5 col-start-4 col-span-10 self-center lg:col-start-9 lg:col-span-8 bg-amber-200'>
              <div>Fourth media 4</div>
            </div>
          </section>
        </div>

        <div className='flex flex-col max-lg:gap-y-[6.25rem] relative bg-green-600 h-fit'>
          <div className='flex flex-col relative'>
            <section
              id='third-bg-media-section'
              className='grid grid-cols-16 lg:sticky h-fit lg:top-0 min-lg:aspect-[5/4] lg:grid-cols-24 z-20'
            >
              <div className='col-start-2 col-span-12 lg:col-start-3 lg:col-span-5 lg:h-full relative'>
                <div className='flex flex-col py-[6.25rem] lg:sticky lg:top-20 lg:mt-[25%] lg:mb-[40%]'>
                  Bröd text
                </div>
              </div>
              <div className='col-start-2 col-span-14 lg:col-start-14 lg:col-span-9 h-fit relative'>
                <div className='grid lg:flex lg:flex-col lg:w-full aspect-4/5 lg:mt-[15%] bg-amber-200'>
                  Fourth media 4
                </div>
              </div>
            </section>
          </div>

          <div className='grid gap-y-[6.25rem] relative bg-green-600'>
            <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24'>
              <div className='col-start-2 col-span-8 lg:col-start-2 lg:col-span-5 z-10'>
                <div className='w-full aspect-4/5 bg-amber-200 bg-opacity-80 backdrop-blur'>
                  Fifth media 5
                </div>
              </div>
            </section>

            <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24'>
              <div className='col-start-8 col-span-8 lg:col-start-10 lg:col-span-5 z-10'>
                <div className='w-full aspect-4/5 bg-amber-400 bg-opacity-80 backdrop-blur'>
                  Sixth media 6
                </div>
              </div>
            </section>

            <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24'>
              <div className='col-start-2 col-span-8 lg:col-start-19 lg:col-span-5 z-10'>
                <div className='w-full aspect-4/5 bg-amber-600 bg-opacity-80 backdrop-blur'>
                  Seventh media 7
                </div>
              </div>
            </section>

            <div className='flex flex-col items-center justify-center max-lg:pb-[6.25rem] lg:py-[5.625rem]'>
              <p>Designed during the pandemic</p>
              <p>All rights reserved to former employer</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstLayout;
