import React from 'react';

const SecondLayout = () => {
  return (
    <>
      <div className='flex flex-col relative' id='second-layout'>
        <section
          id='second-media-section'
          className='flex flex-col justify-center items-center sticky top-0 min-h-dvh flex-1 bg-transparent z-10'
        >
          <span>Text section</span>
          <span>With lots of text</span>
        </section>

        <div className='relative '>
          <section
            id='second-media-section'
            className='grid grid-cols-16 sticky top-0 min-h-dvh lg:aspect-[5/4] lg:h-fit lg:flex-1 bg-transparent lg:grid-cols-24 z-20'
          >
            second media 2
          </section>
          <section
            id='third-media-section'
            className='grid grid-cols-16 relative min-h-dvh lg:aspect-[5/4] lg:h-fit lg:flex-1 bg-transparent lg:grid-cols-24 z-20'
          >
            <div className='aspect-16/9 col-start-2 col-span-14 self-center lg:col-start-6 lg:col-span-14 bg-amber-600 '>
              Third media 3
            </div>
          </section>
          <section
            id='fourth-media-section'
            className='grid grid-cols-16 relative h-fit bg-transparent lg:grid lg:grid-cols-24 mt-[500px] z-20'
          >
            <div className='aspect-3/4 col-start-2 col-span-14 lg:col-start-2 lg:col-span-6  bg-amber-800 '>
              Fourth media 4
            </div>
          </section>
          <section
            id='fifth-media-section'
            className='grid grid-cols-16 relative h-fit bg-transparent lg:grid lg:grid-cols-24 z-20'
          >
            <div className='aspect-3/4 col-start-2 col-span-14 lg:col-start-17 lg:col-span-6 mt-[45px]  bg-amber-800 '>
              Fifth media 5
            </div>
          </section>
          <section
            id='sixth-media-section'
            className='grid grid-cols-16 relative h-fit bg-transparent lg:grid lg:grid-cols-24 mt-[110px] z-20'
          >
            <div className='aspect-3/4 col-start-2 col-span-14 lg:col-start-2 lg:col-span-6  bg-amber-800 '>
              Sixth media 6
            </div>
          </section>
          <section
            id='seventh-media-section'
            className='grid grid-cols-16 relative min-h-dvh lg:aspect-[5/4] lg:h-fit lg:flex-1 bg-transparent lg:grid-cols-24 mt-[240px] z-20'
          >
            <div className='aspect-16/9 col-start-2 col-span-14 self-center lg:col-start-6 lg:col-span-14 bg-amber-600 '>
              Seventh media 7
            </div>
          </section>
        </div>

        <div id='eighth-media-section' className='grid gap-y-[100px] relative'>
          <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24'>
            <div className='col-start-2 col-span-8 lg:col-start-2 lg:col-span-5 z-10'>
              <div className='w-full aspect-4/5 bg-amber-200 bg-opacity-80 backdrop-blur'>
                first media 8
              </div>
            </div>
          </section>

          <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24'>
            <div className='col-start-8 col-span-8 lg:col-start-10 lg:col-span-5 z-10'>
              <div className='w-full aspect-4/5 bg-amber-400 bg-opacity-80 backdrop-blur'>
                second media 8
              </div>
            </div>
          </section>

          <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24'>
            <div className='col-start-2 col-span-8 lg:col-start-19 lg:col-span-5 z-10'>
              <div className='w-full aspect-4/5 bg-amber-600 bg-opacity-80 backdrop-blur'>
                third media 8
              </div>
            </div>
          </section>

          <div className='flex flex-col items-center justify-center max-lg:pb-[100px] lg:py-[90px]'>
            <p>Designed during the pandemic</p>
            <p>All rights reserved to former employer</p>
          </div>
        </div>

        <section
          id='first-media-section'
          className='grid absolute top-0 left-0 right-0 lg:aspect-[5/4] min-h-dvh'
        >
          <div className='grid grid-cols-24 pt-[69px]'>
            <div className='aspect-4/5 col-start-2 col-span-14 lg:col-start-2 lg:col-span-7 lg:row-start-1 bg-amber-200 '>
              First media 1
            </div>
            <div className='aspect-4/5 col-start-2 col-span-14 lg:col-start-16 lg:col-span-6 lg:row-start-2 bg-amber-400 lg:-translate-y-[20%]'>
              Second media 2
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SecondLayout;
