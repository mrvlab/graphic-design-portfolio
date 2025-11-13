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
import { useProjectMobileScrollVisibility } from '@/app/project/utils/useProjectMobileScrollVisibility';
import MobileScrollText from '../../MobileScrollText/MobileScrollText';

const FirstLayout = ({ project }: { project: SingleProjectQueryResult }) => {
  const { showScrollText, hideScrollRef } = useProjectMobileScrollVisibility();

  if (!project?.sectionList) return null;

  const sections = project.sectionList.filter(
    (item) => item._type === 'section'
  );
  if (!sections) return null;

  const firstSection = sections[0];
  const secondSection = sections[1];
  const thirdSection = sections[2];
  const fourthSection = sections[3];

  return (
    <>
      <div className="flex flex-col relative" id="first-layout">
        {firstSection && (
          <>
            <section className="flex flex-col justify-center items-center text-center fixed inset-0 h-svh flex-1 bg-transparent z-[5] pointer-events-none select-none ">
              <div className="flex flex-col justify-center items-center text-center w-2/3">
                {firstSection.richText && (
                  <RichText content={firstSection.richText} />
                )}
              </div>
            </section>

            <MobileScrollText showScrollText={showScrollText} />

            {/* // firstSection */}
            <div>
              <section
                id="first-bg-media-section"
                className="flex flex-col sticky top-0 flex-1 h-screen z-0 w-full aspect-4/5 lg:aspect-3/2"
              >
                {firstSection.mediaGallery?.mediaItems?.[0].asset?.url ? (
                  <NextImage
                    refId={firstSection.mediaGallery.mediaItems[0].asset._id}
                    alt={firstSection.mediaGallery.mediaItems[0].alt || ''}
                    className="aspect-3/2 w-full h-full object-cover"
                    {...aspectRatio3to2}
                    loading="eager"
                    quality={100}
                    priority
                  />
                ) : (
                  firstSection.mediaGallery?.mediaItems?.[0].asset
                    ?.playbackId && (
                    <MuxVideo
                      playbackId={
                        firstSection.mediaGallery.mediaItems[0].asset.playbackId
                      }
                      className="aspect-3/2 w-full h-full object-cover"
                    />
                  )
                )}
              </section>
              <section
                id="first-media-section"
                ref={hideScrollRef}
                className="grid grid-cols-16 relative h-screen lg:h-fit bg-transparent lg:grid-cols-24 z-20"
              >
                <div className="aspect-4/5 col-start-4 col-span-10 lg:col-start-2 lg:col-span-6 mt-[7.5rem]">
                  {firstSection.mediaGallery?.mediaItems?.[1].asset?.url ? (
                    <NextImage
                      refId={firstSection.mediaGallery.mediaItems[1].asset._id}
                      alt={firstSection.mediaGallery.mediaItems[1].alt || ''}
                      className="aspect-4/5 w-full h-full object-cover"
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
                        className="aspect-4/5 w-full h-full object-cover"
                      />
                    )
                  )}
                </div>
              </section>
              <section
                id="second-media-section"
                className="grid grid-cols-16 relative h-screen lg:min-h-screen bg-transparent lg:grid lg:grid-cols-24 z-20"
              >
                <div className="aspect-4/5 col-start-2 col-span-14 lg:col-start-15 lg:col-span-9 lg:-translate-y-[10%]">
                  {firstSection.mediaGallery?.mediaItems?.[2].asset?.url ? (
                    <NextImage
                      refId={firstSection.mediaGallery.mediaItems[2].asset._id}
                      alt={firstSection.mediaGallery.mediaItems[2].alt || ''}
                      {...aspectRatio4to5}
                      className="aspect-4/5 w-full h-full object-cover"
                    />
                  ) : (
                    firstSection.mediaGallery?.mediaItems?.[2].asset
                      ?.playbackId && (
                      <MuxVideo
                        playbackId={
                          firstSection.mediaGallery.mediaItems[2].asset
                            .playbackId
                        }
                        className="aspect-4/5 w-full h-full object-cover"
                      />
                    )
                  )}
                </div>
              </section>
            </div>
          </>
        )}

        {/* // secondSection */}
        {secondSection && (
          <section
            id="third-media-section"
            className="grid grid-cols-16 sticky top-0 min-h-screen lg:grid-cols-24 bg-transparent p-6 z-10"
          >
            <div className="aspect-3/2 col-start-2 col-span-14 self-center lg:col-start-6 lg:col-span-14 ">
              {secondSection.mediaGallery?.mediaItems?.[0].asset?.url ? (
                <NextImage
                  refId={secondSection.mediaGallery.mediaItems[0].asset._id}
                  alt={secondSection.mediaGallery.mediaItems[0].alt || ''}
                  className="aspect-3/2 w-full h-full object-cover"
                  {...aspectRatio3to2}
                  quality={100}
                />
              ) : (
                secondSection.mediaGallery?.mediaItems?.[0].asset
                  ?.playbackId && (
                  <MuxVideo
                    playbackId={
                      secondSection.mediaGallery.mediaItems[0].asset.playbackId
                    }
                    className="aspect-3/2 w-full h-full object-cover"
                  />
                )
              )}
            </div>
          </section>
        )}

        {/* // thirdSection */}
        {thirdSection && (
          <div>
            <section
              id="first-bg-media-section"
              className="flex flex-col sticky top-0 flex-1 h-screen z-20 w-full"
              style={{
                backgroundColor: `${fourthSection.sectionBgColor}`,
              }}
            >
              {thirdSection.mediaGallery?.mediaItems?.[0]?.asset && (
                <div className="aspect-3/2 w-full h-full object-cover col-span-full sticky top-0">
                  {thirdSection.mediaGallery?.mediaItems?.[0].asset?.url ? (
                    <NextImage
                      refId={thirdSection.mediaGallery.mediaItems[0].asset._id}
                      alt={thirdSection.mediaGallery.mediaItems[0].alt || ''}
                      className="aspect-3/2 w-full h-full object-cover"
                      {...aspectRatio3to2}
                      quality={100}
                    />
                  ) : (
                    thirdSection.mediaGallery?.mediaItems?.[0].asset
                      ?.playbackId && (
                      <MuxVideo
                        playbackId={
                          thirdSection.mediaGallery.mediaItems[0].asset
                            .playbackId
                        }
                        className="aspect-3/2 w-full h-full object-cover"
                      />
                    )
                  )}
                </div>
              )}
            </section>
            <section
              id="fourth-media-section"
              className="grid grid-cols-16 sticky top-0 min-h-screen w-full lg:aspect-5/4 lg:h-fit lg:flex-1 bg-transparent lg:grid-cols-24 z-20"
            >
              <div className="aspect-4/5 col-start-4 col-span-10 self-center lg:col-start-9 lg:col-span-8">
                {thirdSection.mediaGallery?.mediaItems?.[1].asset?.url ? (
                  <NextImage
                    refId={thirdSection.mediaGallery.mediaItems[1].asset._id}
                    alt={thirdSection.mediaGallery.mediaItems[1].alt || ''}
                    className="aspect-4/5 w-full h-full object-cover"
                    {...aspectRatio4to5}
                  />
                ) : (
                  thirdSection.mediaGallery?.mediaItems?.[1].asset
                    ?.playbackId && (
                    <MuxVideo
                      playbackId={
                        thirdSection.mediaGallery.mediaItems[1].asset.playbackId
                      }
                      className="aspect-4/5 w-full h-full object-cover"
                    />
                  )
                )}
              </div>
            </section>
          </div>
        )}

        {/* // fourthSection */}
        {fourthSection && (
          <div
            className="flex flex-col max-lg:gap-y-[6.25rem] bg-transparent relative h-fit  z-20"
            style={{
              backgroundColor: `${fourthSection.sectionBgColor}`,
            }}
          >
            <div className="flex flex-col relative">
              <section
                id="third-bg-media-section"
                className="grid grid-cols-16 lg:sticky h-fit lg:top-0 min-lg:aspect-5/4 lg:grid-cols-24"
              >
                <div className="col-start-2 col-span-12 lg:col-start-2 lg:col-span-5 lg:h-full relative">
                  <div className="flex flex-col py-[6.25rem] lg:sticky lg:top-20 lg:mt-[25%] lg:mb-[40%]">
                    {fourthSection.richText && (
                      <RichText content={fourthSection.richText} />
                    )}
                  </div>
                </div>
                <div className="col-start-2 col-span-14 lg:col-start-15 lg:col-span-9 h-fit relative lg:pt-[6.25rem]">
                  <div className="grid lg:flex lg:flex-col lg:w-full aspect-4/5 lg:mt-[15%]">
                    {fourthSection.mediaGallery?.mediaItems?.[0].asset?.url ? (
                      <NextImage
                        refId={
                          fourthSection.mediaGallery.mediaItems[0].asset._id
                        }
                        alt={fourthSection.mediaGallery.mediaItems[0].alt || ''}
                        className="aspect-4/5 object-cover w-full h-full"
                        {...aspectRatio4to5}
                      />
                    ) : (
                      fourthSection.mediaGallery?.mediaItems?.[0].asset
                        ?.playbackId && (
                        <MuxVideo
                          playbackId={
                            fourthSection.mediaGallery.mediaItems[0].asset
                              .playbackId
                          }
                          className="aspect-4/5 w-full h-full object-cover"
                        />
                      )
                    )}
                  </div>
                </div>
              </section>
            </div>

            <div className={`grid gap-y-[6.25rem] relative`}>
              <section className="grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24">
                <div className="col-start-2 col-span-8 lg:col-start-2 lg:col-span-5 z-10">
                  <div className="w-full aspect-4/5">
                    {fourthSection.mediaGallery?.mediaItems?.[1].asset?.url ? (
                      <NextImage
                        refId={
                          fourthSection.mediaGallery.mediaItems[1].asset._id
                        }
                        alt={fourthSection.mediaGallery.mediaItems[1].alt || ''}
                        className="aspect-4/5 w-full h-full object-cover"
                        {...aspectRatio4to5}
                      />
                    ) : (
                      fourthSection.mediaGallery?.mediaItems?.[1].asset
                        ?.playbackId && (
                        <MuxVideo
                          playbackId={
                            fourthSection.mediaGallery.mediaItems[1].asset
                              .playbackId
                          }
                          className="aspect-4/5 w-full h-full object-cover"
                        />
                      )
                    )}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24">
                <div className="col-start-8 col-span-8 lg:col-start-11 lg:w-[125%] -translate-x-[10%] lg:col-span-4 z-10">
                  <div className="w-full aspect-4/5">
                    {fourthSection.mediaGallery?.mediaItems?.[2].asset?.url ? (
                      <NextImage
                        refId={
                          fourthSection.mediaGallery.mediaItems[2].asset._id
                        }
                        alt={fourthSection.mediaGallery.mediaItems[2].alt || ''}
                        className="aspect-4/5 w-full h-full object-cover"
                        {...aspectRatio4to5}
                      />
                    ) : (
                      fourthSection.mediaGallery?.mediaItems?.[2].asset
                        ?.playbackId && (
                        <MuxVideo
                          playbackId={
                            fourthSection.mediaGallery.mediaItems[2].asset
                              .playbackId
                          }
                          className="aspect-4/5 w-full h-full object-cover"
                        />
                      )
                    )}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-16 lg:min-h-screen lg:sticky lg:top-0 z-20 lg:items-center lg:justify-center lg:grid-cols-24">
                <div className="col-start-2 col-span-8 lg:col-start-19 lg:col-span-5 z-10">
                  <div className="w-full aspect-4/5">
                    {fourthSection.mediaGallery?.mediaItems?.[3].asset?.url ? (
                      <NextImage
                        refId={
                          fourthSection.mediaGallery.mediaItems[3].asset._id
                        }
                        alt={fourthSection.mediaGallery.mediaItems[3].alt || ''}
                        className="aspect-4/5 w-full h-full object-cover"
                        {...aspectRatio4to5}
                      />
                    ) : (
                      fourthSection.mediaGallery?.mediaItems?.[3].asset
                        ?.playbackId && (
                        <MuxVideo
                          playbackId={
                            fourthSection.mediaGallery.mediaItems[3].asset
                              .playbackId
                          }
                          className="aspect-4/5 w-full h-full object-cover"
                        />
                      )
                    )}
                  </div>
                </div>
              </section>

              <div className="flex flex-col items-center justify-center max-lg:pb-[6.25rem] lg:py-[5.625rem] text-center">
                <div className="w-2/3">
                  {fourthSection.richTextBottom && (
                    <RichText content={fourthSection.richTextBottom} />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default FirstLayout;
