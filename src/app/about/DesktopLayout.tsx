import React from 'react';
import IMobileLayout from './types/IAbout';
import ViewPortraitOnHover from './ViewPortraitOnHover';
import formatDate from '@/utils/formatDate';
import RichText from '@/components/RichText/RichText';

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
      <section
        className='grid h-fit row-start-1 col-span-9'
        aria-labelledby='languages-section'
      >
        <h2 className='pl-12 font-bold' id='languages-section'>
          Languages
        </h2>
        <div className='flex flex-col gap-2'>
          {languages?.map((language) => (
            <div key={language._id} className='flex flex-col w-full'>
              <span role='heading' aria-level={3}>
                {language.language}
              </span>
              <span>{language.level}</span>
            </div>
          ))}
        </div>
      </section>

      <div className='row-start-2 col-span-9 h-fit'>
        <section
          className='flex flex-col gap-2 pb-4'
          aria-labelledby='experience-section'
        >
          <h2 className='pl-12 font-bold' id='experience-section'>
            Experience
          </h2>
          <ul className='grid grid-cols-3 gap-2'>
            {experiences?.map((experience) => (
              <li key={experience._id} className='list-none'>
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
          className='flex flex-col gap-x-2 gap-y-1 pb-4'
          aria-labelledby='education-section'
        >
          <h2 className='pl-12 font-bold' id='education-section'>
            Studies
          </h2>
          <ul className='grid grid-cols-3 gap-2'>
            {studies?.map((study) => (
              <li key={study._id} className='list-none'>
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
          className='flex flex-col gap-2'
          aria-labelledby='publications-section'
        >
          <h2 className='pl-12 font-bold' id='publications-section'>
            Publications
          </h2>
          <ul className='grid grid-cols-3 gap-2'>
            {publications?.map((publication) => (
              <li key={publication._id} className='list-none'>
                <h3>{publication.title}</h3>
                {publication.href && (
                  <p>
                    <a
                      href={publication.href || ''}
                      target='_blank'
                      rel='noreferrer'
                    >
                      ( Read more )
                    </a>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
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
                  <section
                    key={`section-${section.title}`}
                    className='flex flex-col gap-1 h-fit'
                    aria-labelledby={`section-${section.title?.toLowerCase()}`}
                  >
                    <h2
                      className='pl-[59px] font-bold'
                      id={`section-${section.title?.toLowerCase()}`}
                    >
                      {section.title}
                    </h2>
                    <RichText content={section.content} />
                  </section>
                )
            )}
          </div>

          <div className='grid grid-cols-2 gap-2'>
            <section
              className='flex flex-col gap-1'
              aria-labelledby='skills-section'
            >
              <h2 className='pl-[59px] font-bold' id='skills-section'>
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
              className='flex flex-col gap-1 pr-[49px]'
              aria-labelledby='software-tools-section'
            >
              <h2 className='pl-[59px] font-bold' id='software-tools-section'>
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
        </div>
      </div>
    </div>
  );
};

export default DesktopLayout;
