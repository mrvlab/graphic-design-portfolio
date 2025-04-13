'use client';

import React from 'react';
import { SingleProjectQueryResult } from '../../../../../sanity.types';
import NextImage from '@/components/Media/NextImage';
import MuxVideo from '@/components/Media/MuxVideo';
import RichText from '@/components/RichText/RichText';
import {
  aspectRatio4to5,
  aspectRatio3to2,
} from '@/utils/aspectRatioMeasurements';
import { useProjectMobileScrollVisibility } from '../../utils/useProjectMobileScrollVisibility';
import MobileScrollText from '../../MobileScrollText/MobileScrollText';

const ThirdLayout = ({ project }: { project: SingleProjectQueryResult }) => {
  const { showScrollText, hideScrollRef } = useProjectMobileScrollVisibility();

  if (!project?.sectionList) return null;

  const sections = project.sectionList.filter(
    (item) => item._type === 'section'
  );
  if (!sections) return null;

  const firstSection = sections[0];
  const secondSection = sections[1];
  const thirdSection = sections[2];

  return (
    <>
      <div className='flex flex-col relative' id='second-layout'>
        {firstSection && (
          <>
            <section
              id='first-text-section'
              className='flex flex-col justify-center items-center text-center fixed inset-0 min-h-screen lg:min-h-dvh flex-1 bg-transparent z-[5] pointer-events-none select-none'
            >
              <div className='flex flex-col justify-center items-center text-center w-2/3'>
                {firstSection.richText && (
                  <RichText content={firstSection.richText} />
                )}
              </div>
            </section>
            <MobileScrollText showScrollText={showScrollText} />

            <section
              id='first-media-section'
              className='flex flex-col justify-end h-fit min-h-screen lg:min-h-screen w-full'
            >
              <div className='grid grid-cols-16 lg:grid-cols-24 pt-[34rem] max-lg:pb-[12.5rem] gap-y-[12.5rem] lg:pt-[4.3125rem] lg:gap-y-0 w-full z-10'>
                <div className='aspect-4/5 col-start-2 col-span-12 lg:col-start-2 lg:col-span-7 lg:row-start-1'>
                  {firstSection.mediaGallery?.mediaItems?.[0].asset?.url ? (
                    <NextImage
                      refId={firstSection.mediaGallery.mediaItems[0].asset._id}
                      alt={firstSection.mediaGallery.mediaItems[0].alt || ''}
                      className='w-full h-full object-cover'
                      {...aspectRatio4to5}
                      priority
                    />
                  ) : (
                    firstSection.mediaGallery?.mediaItems?.[0].asset
                      ?.playbackId && (
                      <MuxVideo
                        playbackId={
                          firstSection.mediaGallery.mediaItems[0].asset
                            .playbackId
                        }
                        className='w-full h-full object-cover'
                      />
                    )
                  )}
                </div>
                <div
                  ref={hideScrollRef}
                  className='aspect-4/5 col-start-6 col-span-10 lg:col-start-16 lg:col-span-6 lg:row-start-2 lg:-translate-y-[20%]'
                >
                  {firstSection.mediaGallery?.mediaItems?.[1].asset?.url ? (
                    <NextImage
                      refId={firstSection.mediaGallery.mediaItems[1].asset._id}
                      alt={firstSection.mediaGallery.mediaItems[1].alt || ''}
                      className='w-full h-full object-cover'
                      {...aspectRatio4to5}
                      priority
                    />
                  ) : (
                    firstSection.mediaGallery?.mediaItems?.[1].asset
                      ?.playbackId && (
                      <MuxVideo
                        playbackId={
                          firstSection.mediaGallery.mediaItems[1].asset
                            .playbackId
                        }
                        className='w-full h-full object-cover'
                      />
                    )
                  )}
                </div>
              </div>
            </section>
          </>
        )}

        {secondSection && (
          <div className='relative w-full max-lg:z-20'>
            <section
              id='second-media-section'
              className='grid grid-cols-16 sticky top-0 min-h-screen w-full lg:h-fit lg:flex-1 lg:grid-cols-24 z-20'
            >
              <div className='aspect-3/2 w-full h-full object-cover col-span-full absolute inset-0'>
                {secondSection.mediaGallery?.mediaItems?.[0].asset?.url ? (
                  <NextImage
                    refId={
                      secondSection.mediaGallery?.mediaItems?.[0]?.asset?._id
                    }
                    alt={secondSection.mediaGallery?.mediaItems?.[0]?.alt || ''}
                    {...aspectRatio3to2}
                    priority
                    className='object-cover w-full h-full'
                  />
                ) : (
                  secondSection.mediaGallery?.mediaItems?.[0].asset
                    ?.playbackId && (
                    <MuxVideo
                      playbackId={
                        secondSection.mediaGallery.mediaItems[0].asset
                          .playbackId
                      }
                      className='w-full h-full object-cover'
                    />
                  )
                )}
              </div>
            </section>

            <div className='sticky top-0 w-full max-lg:z-20 lg:bg-transparent z-20'>
              <section className='grid grid-cols-16 relative min-h-screen lg:h-fit lg:flex-1 bg-transparent lg:grid-cols-24 lg:z-10 w-full'>
                <div className='aspect-3/2 col-start-2 col-span-14 self-center lg:col-start-6 lg:col-span-14'>
                  {secondSection.mediaGallery?.mediaItems?.[1].asset?.url ? (
                    <NextImage
                      refId={
                        secondSection.mediaGallery?.mediaItems?.[1]?.asset?._id
                      }
                      alt={
                        secondSection.mediaGallery?.mediaItems?.[1]?.alt || ''
                      }
                      {...aspectRatio3to2}
                      className='object-cover w-full h-full'
                    />
                  ) : (
                    secondSection.mediaGallery?.mediaItems?.[1].asset
                      ?.playbackId && (
                      <MuxVideo
                        playbackId={
                          secondSection.mediaGallery.mediaItems[1].asset
                            .playbackId
                        }
                        className='w-full h-full object-cover'
                      />
                    )
                  )}
                </div>
              </section>
            </div>
          </div>
        )}

        {thirdSection && (
          <div
            id='third-media-section'
            className='grid gap-y-[100px] max-lg:pt-[100px] relative bg-white lg:bg-transparent z-20'
            style={{
              backgroundColor: `${thirdSection.sectionBgColor}`,
            }}
          >
            <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 lg:items-center lg:justify-center lg:grid-cols-24 z-[25]'>
              <div className='col-start-2 col-span-8 lg:col-start-2 lg:col-span-5 z-10'>
                <div className='w-full aspect-4/5'>
                  {thirdSection.mediaGallery?.mediaItems?.[0].asset?.url ? (
                    <NextImage
                      refId={thirdSection.mediaGallery.mediaItems[0].asset._id}
                      alt={thirdSection.mediaGallery.mediaItems[0].alt || ''}
                      className='w-full h-full object-cover'
                      {...aspectRatio4to5}
                    />
                  ) : (
                    thirdSection.mediaGallery?.mediaItems?.[0].asset
                      ?.playbackId && (
                      <MuxVideo
                        playbackId={
                          thirdSection.mediaGallery.mediaItems[0].asset
                            .playbackId
                        }
                        className='w-full h-full object-cover'
                      />
                    )
                  )}
                </div>
              </div>
            </section>

            <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 lg:items-center lg:justify-center lg:grid-cols-24 z-[25]'>
              <div className='col-start-8 col-span-8 lg:col-start-11 lg:w-[125%] -translate-x-[10%] lg:col-span-4 z-10'>
                <div className='w-full aspect-4/5'>
                  {thirdSection.mediaGallery?.mediaItems?.[1].asset?.url ? (
                    <NextImage
                      refId={thirdSection.mediaGallery.mediaItems[1].asset._id}
                      alt={thirdSection.mediaGallery.mediaItems[1].alt || ''}
                      className='w-full h-full object-cover'
                      {...aspectRatio4to5}
                    />
                  ) : (
                    thirdSection.mediaGallery?.mediaItems?.[1].asset
                      ?.playbackId && (
                      <MuxVideo
                        playbackId={
                          thirdSection.mediaGallery.mediaItems[1].asset
                            .playbackId
                        }
                        className='w-full h-full object-cover'
                      />
                    )
                  )}
                </div>
              </div>
            </section>

            <section className='grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 items-center justify-center lg:grid-cols-24 z-20 bg-white w-full'>
              <div className='col-start-2 col-span-8 lg:col-start-19 lg:col-span-5 z-10'>
                <div className='w-full aspect-4/5'>
                  {thirdSection.mediaGallery?.mediaItems?.[2].asset?.url ? (
                    <NextImage
                      refId={thirdSection.mediaGallery.mediaItems[2].asset._id}
                      alt={thirdSection.mediaGallery.mediaItems[2].alt || ''}
                      className='w-full h-full object-cover'
                      {...aspectRatio4to5}
                    />
                  ) : (
                    thirdSection.mediaGallery?.mediaItems?.[2].asset
                      ?.playbackId && (
                      <MuxVideo
                        playbackId={
                          thirdSection.mediaGallery.mediaItems[2].asset
                            .playbackId
                        }
                        className='w-full h-full object-cover'
                      />
                    )
                  )}
                </div>
              </div>
            </section>

            <div className='flex flex-col items-center justify-center text-center max-lg:pb-[100px] lg:py-[90px] bg-white z-20'>
              <div className='w-2/3'>
                {thirdSection.richTextBottom && (
                  <RichText content={thirdSection.richTextBottom} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ThirdLayout;
