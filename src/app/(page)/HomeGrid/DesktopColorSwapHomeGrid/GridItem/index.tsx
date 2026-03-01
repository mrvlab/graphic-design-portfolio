import { motion } from 'framer-motion';
import Link from 'next/link';
import { getImageAssetId, getBackgroundColor } from '@/utils/homeProjectUtils';
import { dataAttr } from '@/sanity/lib/utils';
import { IBoxState } from '../../../types/IBoxState';
import { IProjects } from '../../../types/IProject';
import { Z_INDEX } from '../constants';
import { ProjectNumber } from './ProjectNumber';
import { ColorLayer } from './ColorLayer';
import { ImageLayer } from './ImageLayer';
import { GRID_STYLES } from '../gridStyles';

type GridItemProps = {
  box: IBoxState;
  index: number;
  projects: IProjects;
  hoveredIndex: number | null;
  elevatedIndex: number | null;
  animationComplete: boolean;
  boxRefs: { current: (HTMLDivElement | null)[] };
  imageRefs: { current: (HTMLDivElement | null)[] };
  onHoverStart: () => void;
  onHoverEnd: () => void;
};

/**
 * Individual grid item containing project number, color layer, and image layer
 */
export function GridItem({
  box,
  index,
  projects,
  hoveredIndex,
  elevatedIndex,
  animationComplete,
  boxRefs,
  imageRefs,
  onHoverStart,
  onHoverEnd,
}: GridItemProps) {
  const isElevated = elevatedIndex === index;
  const isHovered = hoveredIndex === index;
  const project = projects[index];

  const sanityAttr = project._id
    ? dataAttr({ id: project._id, type: 'projects', path: 'title' }).toString()
    : undefined;

  // Use currentProjectIndex for rotating colors (creates ladder effect)
  const currentColor =
    getBackgroundColor(projects[box.currentProjectIndex]) || box.color;

  // Determine if item should be linkable
  const isLinkable = project.slug && !project.comingSoon;
  const projectUrl = isLinkable ? `/project/${project.slug}` : undefined;

  // Calculate visibility states
  const shouldShowColor =
    !box.loaded || (animationComplete && hoveredIndex !== null && !isHovered);

  const shouldShowImage = hoveredIndex === null || isHovered;

  const gridContent = (
    <>
      <ProjectNumber index={index} isHovered={isHovered} />

      {/* Image container */}
      <div
        className={`${GRID_STYLES.IMAGE_CONTAINER} ${GRID_STYLES.RELATIVE_POSITION} ${GRID_STYLES.OVERFLOW_HIDDEN}`}
      >
        <ColorLayer
          boxRef={(el) => {
            boxRefs.current[index] = el;
          }}
          currentColor={currentColor}
          shouldShowColor={shouldShowColor}
        />

        {box.imageLoaded && (
          <ImageLayer
            imageRef={(el) => {
              imageRefs.current[index] = el;
            }}
            imageAssetId={getImageAssetId(project)}
            alt={project.title || undefined}
            shouldShow={shouldShowImage}
            comingSoon={project.comingSoon || false}
          />
        )}
      </div>
    </>
  );

  const motionProps = {
    className: GRID_STYLES.GRID_ITEM,
    style: { zIndex: isElevated ? Z_INDEX.ELEVATED : Z_INDEX.BASE },
    onHoverStart,
    onHoverEnd,
    suppressHydrationWarning: true,
    'data-sanity': sanityAttr,
  };

  // Wrap in Link if linkable, otherwise just motion.div
  return isLinkable && projectUrl ? (
    <Link key={index} href={projectUrl} className="grid">
      <motion.div {...motionProps}>{gridContent}</motion.div>
    </Link>
  ) : (
    <motion.div key={index} {...motionProps}>
      {gridContent}
    </motion.div>
  );
}
