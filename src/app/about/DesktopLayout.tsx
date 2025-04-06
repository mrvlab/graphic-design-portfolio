import React from 'react';
import IMobileLayout from './types/IAbout';
import ViewPortraitOnHover from './ViewPortraitOnHover';
import { PortableText } from 'next-sanity';
import formatDate from '@/utils/formatDate';

const DesktopLayout = ({ about }: IMobileLayout) => {
  const {
    languages,
    experiences,
    studies,
    publications,
    portrait,
    bodyTextSections,
  } = about;

  return (
    <div className='hidden lg:grid lg:grid-cols-24 lg:grid-rows-2 gap-2 lg:h-full'>
      <div className='grid h-fit row-start-1 col-span-9'>
        <h2 className='pl-12 font-bold'>Languages</h2>
        <div className='flex flex-col gap-2'>
          {languages?.map((language) => (
            <div key={language._id} className='flex flex-col w-full'>
              <span>{language.language}</span>
              <span>{language.level}</span>
            </div>
          ))}
        </div>
      </div>

      <div className='row-start-2 col-span-9 h-fit'>
        <div className='flex flex-col gap-2 pb-4'>
          <h2 className='pl-12 font-bold' id='experience-section'>
            Experience
          </h2>
          <div className='grid grid-cols-3 gap-2'>
            {experiences?.map((experience) => (
              <div key={experience._id}>
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

        <div className='flex flex-col gap-x-2 gap-y-1 pb-4'>
          <h2 className='pl-12 font-bold' id='education-section'>
            Studies
          </h2>
          <div
            className='grid grid-cols-3 gap-2'
            aria-labelledby='education-section'
          >
            {studies?.map((study) => (
              <div key={study._id} className=''>
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

        <div className='flex flex-col gap-2'>
          <h2 className='pl-12 font-bold' id='publications-section'>
            Publications
          </h2>
          <div
            className='grid grid-cols-3 gap-2'
            aria-labelledby='publications-section'
          >
            {publications?.map((publication) => (
              <div key={publication._id}>
                <h3>{publication.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='col-start-10 col-span-6 row-start-1 row-span-full self-center'>
        <ViewPortraitOnHover portrait={portrait} />
      </div>

      <div className='col-start-16 col-span-full row-start-1 row-span-full pb-[20%]'>
        <div className='grid gap-4'>
          <div className='flex flex-col gap-4 h-fit'>
            {bodyTextSections?.map(
              (section) =>
                section.content && (
                  <div
                    key={`section-${section.title}`}
                    className='flex flex-col gap-1 h-fit'
                  >
                    <h2
                      className='pl-[59px] font-bold'
                      id={`section-${section.title?.toLowerCase()}`}
                    >
                      {section.title}
                    </h2>
                    <div
                      aria-labelledby={`section-${section.title?.toLowerCase()}`}
                    >
                      <PortableText value={section.content} />
                    </div>
                  </div>
                )
            )}
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <div className='flex flex-col gap-1'>
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

            <div className='flex flex-col gap-1 pr-[49px]'>
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
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
