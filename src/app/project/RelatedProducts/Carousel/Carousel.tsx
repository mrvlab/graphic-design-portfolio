'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';

import { SingleProjectQueryResult } from '../../../../../sanity.types';
import Link from 'next/link';
import ProjectCarouselContent from './ProjectCarouselContent';

type RelatedSection = Extract<
  NonNullable<NonNullable<SingleProjectQueryResult>['sectionList']>[number],
  { _type: 'relatedProjects' }
>;

type ICarousel = {
  relatedProducts: RelatedSection;
};

const TWEEN_FACTOR_BASE = 0.52;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

const defaultOptions: EmblaOptionsType = {
  loop: true,
  active: true,
  breakpoints: {
    '(max-width: 1023px)': { active: true },
    '(min-width: 1024px)': { active: false },
  },
};

const Carousel: React.FC<ICarousel> = ({ relatedProducts }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(defaultOptions);
  const [activeIndex, setActiveIndex] = useState(0);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, []);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__number') as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenScale = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === 'scroll';

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 0.9 - Math.abs(diffToTarget * tweenFactor.current);
          const scale = numberWithinRange(tweenValue, 0, 1).toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    []
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);
    onSelect(emblaApi);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenScale)
      .on('scroll', tweenScale)
      .on('select', onSelect)
      .on('slideFocus', tweenScale);
  }, [emblaApi, tweenScale, onSelect, setTweenNodes, setTweenFactor]);

  return (
    <div className='embla w-full'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container lg:grid lg:grid-cols-24'>
          {relatedProducts.projects?.map((project, index: number) => {
            const textClass =
              activeIndex === index ? 'opacity-100' : 'opacity-0';
            const gridStartClass = `lg:col-start-${6 + index * 4}`;

            return project.slug && !project.comingSoon ? (
              <Link
                href={project.slug ? `/project/${project.slug}` : '/home'}
                className={`embla__slide ${gridStartClass} lg:col-span-2`}
                key={project._id}
              >
                <ProjectCarouselContent
                  project={project}
                  index={index}
                  textClass={textClass}
                />
              </Link>
            ) : (
              <div
                key={project._id}
                className={`embla__slide ${gridStartClass} lg:col-span-2`}
              >
                <ProjectCarouselContent
                  project={project}
                  index={index}
                  textClass={textClass}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
