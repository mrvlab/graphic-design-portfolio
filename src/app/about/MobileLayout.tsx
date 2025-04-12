import React from 'react';
import IMobileLayout from './types/IAbout';
import ViewPortraitOnScroll from './ViewPortraitOnScroll';
import formatDate from '@/utils/formatDate';
import RichText from '@/components/RichText/RichText';

const MobileLayout = ({ about }: IMobileLayout) => {
  return (
    <div className='flex flex-col gap-6 lg:hidden'>
      {about.bodyTextSections?.map(
        (section) =>
          section.content && (
            <section
              key={`section-${section.title}`}
              className='flex flex-col gap-1'
              aria-labelledby={`mobile-section-${section.title?.toLowerCase()}`}
            >
              <h2
                className='pl-[59px] font-bold'
                id={`mobile-section-${section.title?.toLowerCase()}`}
              >
                {section.title}
              </h2>
              <div className='leading-[125%]'>
                <RichText content={section.content} />
              </div>
            </section>
          )
      )}

      <div>
        <div className='grid grid-cols-2 gap-1'>
          <section
            className='flex flex-col gap-1'
            aria-labelledby='mobile-skills-section'
          >
            <h2 className='pl-[59px] font-bold' id='mobile-skills-section'>
              Skills
            </h2>
            <ul className='flex flex-wrap gap-1'>
              {about.skills?.map((skill) => (
                <li key={skill._id} className='w-full'>
                  {skill.title}
                </li>
              ))}
            </ul>
          </section>

          <section
            className='flex flex-col gap-1'
            aria-labelledby='mobile-software-tools-section'
          >
            <h2
              className='pl-[59px] font-bold'
              id='mobile-software-tools-section'
            >
              Software Tools
            </h2>
            <div className='flex flex-col gap-2'>
              {about.softwareTools?.map(
                (tool) =>
                  tool.richText && (
                    <RichText key={tool._id} content={tool.richText} />
                  )
              )}
            </div>
          </section>
        </div>

        <ViewPortraitOnScroll about={about} />
      </div>

      <section
        className='flex flex-col gap-1'
        aria-labelledby='mobile-languages-section'
      >
        <h2 className='pl-[59px] font-bold' id='mobile-languages-section'>
          Languages
        </h2>
        <div className='grid grid-cols-2 gap-x-1 gap-y-2'>
          {about.languages?.map((language) => (
            <div
              key={language._id}
              className={`flex flex-col w-full pr-3 ${
                language.language?.toLowerCase() === 'spanish'
                  ? 'order-2'
                  : language.language?.toLowerCase() === 'english'
                    ? 'order-3'
                    : ''
              }`}
            >
              <span role='heading' aria-level={3}>
                {language.language}
              </span>
              <span>{language.level}</span>
            </div>
          ))}
        </div>
      </section>

      <section
        className='flex flex-col gap-1'
        aria-labelledby='mobile-experience-section'
      >
        <h2 className='pl-[59px] font-bold' id='mobile-experience-section'>
          Experience
        </h2>
        <ul className='grid grid-cols-2 gap-x-1 gap-y-2'>
          {about.experiences?.map((experience) => (
            <li key={experience._id} className='pr-3 list-none'>
              <h3>{experience.title}</h3>
              <p>{experience.location}</p>
              <p>{experience.role}</p>
              <p>
                <time dateTime={experience.startDate || undefined}>
                  {formatDate(experience.startDate)}
                </time>
                {' - '}
                <time dateTime={experience.endDate || undefined}>
                  {formatDate(experience.endDate)}
                </time>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className='flex flex-col gap-1'
        aria-labelledby='mobile-education-section'
      >
        <h2 className='pl-[59px] font-bold' id='mobile-education-section'>
          Studies
        </h2>
        <ul className='grid grid-cols-2 gap-x-1 gap-y-2'>
          {about.studies?.map((study) => (
            <li key={study._id} className='pr-3 list-none'>
              <h3>{study.degree}</h3>
              <p>{study.institution}</p>
              <p>
                <time dateTime={study.startDate || undefined}>
                  {formatDate(study.startDate)}
                </time>
                {' - '}
                <time dateTime={study.endDate || undefined}>
                  {formatDate(study.endDate)}
                </time>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section
        className='flex flex-col gap-1'
        aria-labelledby='mobile-publications-section'
      >
        <h2 className='pl-[59px] font-bold' id='mobile-publications-section'>
          Publications
        </h2>
        <ul className='grid grid-cols-2 gap-x-1 gap-y-2'>
          {about.publications?.map((publication) => (
            <li key={publication._id} className='pr-3 list-none'>
              <h3>{publication.title}</h3>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default MobileLayout;
