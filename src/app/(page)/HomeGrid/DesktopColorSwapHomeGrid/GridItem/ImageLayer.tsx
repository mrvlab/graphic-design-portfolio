import { motion } from 'framer-motion';
import NextImage from '@/components/Media/NextImage';
import { ANIMATION_CONFIG } from '../constants';

type ImageLayerProps = {
  imageRef: (el: HTMLDivElement | null) => void;
  imageAssetId: string;
  alt: string | undefined;
  shouldShow: boolean;
  comingSoon: boolean;
};

/**
 * Animated image layer that fades in when loaded
 */
export function ImageLayer({
  imageRef,
  imageAssetId,
  alt,
  shouldShow,
  comingSoon,
}: ImageLayerProps) {
  return (
    <motion.div
      ref={imageRef}
      className="absolute inset-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{
        opacity: shouldShow ? (comingSoon ? 0.2 : 1) : 0,
      }}
      transition={{
        duration: ANIMATION_CONFIG.TRANSITION_DURATION,
        ease: 'easeInOut',
      }}
    >
      <NextImage
        refId={imageAssetId}
        alt={alt}
        className="w-full h-full object-cover !opacity-100"
        width={800}
        height={1000}
      />
    </motion.div>
  );
}
