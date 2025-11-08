'use client';

interface Project {
  title: string;
  color: string;
  image: string;
}

interface MobileHomeGridProps {
  projects: Project[];
}

export function MobileHomeGrid({ projects }: MobileHomeGridProps) {
  return (
    <div
      className="mobile-home-grid gap-y-16 gap-x-24 px-12"
      suppressHydrationWarning
    >
      {projects.map((project, index) => (
        <div
          key={project.title}
          className="mobile-home-grid-item"
          suppressHydrationWarning
        >
          <div className="flex flex-[0.5] w-full justify-center lg:hidden">
            {`( ${(index + 1).toFixed(1)} )`}
          </div>

          <div className="relative flex-1 aspect-4/5">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
