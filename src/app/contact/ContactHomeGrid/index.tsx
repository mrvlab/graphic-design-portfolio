import React from 'react';
import { DesktopHomeGrid } from './DesktopHomeGrid';
import { MobileHomeGrid } from './MobileHomeGrid';
import { IProjects } from '@/app/(page)/types/IProject';

export const ContactHomeGrid = ({ projects }: { projects: IProjects }) => {
  return (
    <>
      <div className="hidden lg:block lg:my-auto lg:w-full lg:h-full">
        <DesktopHomeGrid projects={projects} />
      </div>

      <div className="block lg:hidden overflow-hidden h-[calc(100dvh-var(--nav-footer-total-mobile))]">
        <MobileHomeGrid projects={projects} />
      </div>
    </>
  );
};
