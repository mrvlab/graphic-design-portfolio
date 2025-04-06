import { PortableText } from 'next-sanity';
import React from 'react';
import IMobileLayout from './types/IAbout';
import ViewPortraitOnScroll from './ViewPortraitOnScroll';
import formatDate from '@/utils/formatDate';

const MobileLayout = ({ about }: IMobileLayout) => {
  return (
    <div
      className='flex flex-col gap-6 lg:hidden'
      aria-hidden='true'
      role='complementary'
      aria-label='Mobile layout version'
    >
      {about.bodyTextSections?.map(
        (section) =>
          section.content && (
            <div
              key={`section-${section.title}`}
              className='flex flex-col gap-1'
            >
              <h2
                className='pl-[59px] font-bold'
                id={`section-${section.title?.toLowerCase()}`}
              >
                {section.title}
              </h2>
              <div aria-labelledby={`section-${section.title?.toLowerCase()}`}>
                <PortableText value={section.content} />
              </div>
            </div>
          )
      )}

      <div>
        <div className='grid grid-cols-2 gap-1'>
          <div>
            <h2 className='pl-[59px] font-bold' id='skills-section'>
              Skills
            </h2>
            <ul
              className='flex flex-wrap gap-1'
              aria-labelledby='skills-section'
            >
              {about.skills?.map((skill) => (
                <li key={skill._id} className='w-full'>
                  {skill.title}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='pl-[59px] font-bold' id='software-tools-section'>
              Software Tools
            </h2>
            <div
              className='flex flex-col gap-2'
              aria-labelledby='software-tools-section'
            >
              {about.softwareTools?.map(
                (tool) =>
                  tool.richText && (
                    <PortableText key={tool._id} value={tool.richText} />
                  )
              )}
            </div>
          </div>
        </div>

        <ViewPortraitOnScroll about={about} />
      </div>

      <div className='flex flex-col gap-1'>
        <h2 className='pl-[59px] font-bold' id='languages-section'>
          Languages
        </h2>
        <div
          className='grid grid-cols-2 gap-x-1 gap-y-2'
          aria-labelledby='languages-section'
        >
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
              <span>{language.language}</span>
              <span>{language.level}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <h2 className='pl-[59px] font-bold' id='experience-section'>
          Experience
        </h2>
        <div
          className='grid grid-cols-2 gap-x-1 gap-y-2'
          aria-labelledby='experience-section'
        >
          {about.experiences?.map((experience) => (
            <div key={experience._id} className='pr-3'>
              <h3>{experience.title}</h3>
              <p>{experience.location}</p>
              <p>{experience.role}</p>
              <p>
                {formatDate(experience.startDate)}
                {' - '}
                {formatDate(experience.endDate)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <h2 className='pl-[59px] font-bold' id='education-section'>
          Studies
        </h2>
        <div
          className='grid grid-cols-2 gap-x-1 gap-y-2'
          aria-labelledby='education-section'
        >
          {about.studies?.map((study) => (
            <div key={study._id} className='pr-3'>
              <h3>{study.degree}</h3>
              <p>{study.institution}</p>
              <p>
                {formatDate(study.startDate)}
                {' - '}
                {formatDate(study.endDate)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-1'>
        <h2 className='pl-[59px] font-bold' id='publications-section'>
          Publications
        </h2>
        <div
          className='grid grid-cols-2 gap-x-1 gap-y-2'
          aria-labelledby='publications-section'
        >
          {about.publications?.map((publication) => (
            <div key={publication._id} className='pr-3'>
              <h3>{publication.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
