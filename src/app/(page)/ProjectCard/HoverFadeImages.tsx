import { useMemo } from 'react';
import { imgData } from '@/sanity/lib/image';
import NextImage from '../../../components/Media/NextImage';
import IHoverFadeImages from '../types/IHoverFadeImages';

export default function HoverFadeImages({
  mediaGallery,
  projectId,
  comingSoon = false,
}: IHoverFadeImages) {
  const firstImage = useMemo(() => mediaGallery?.[0], [mediaGallery]);

  const imageData = useMemo(() => {
    if (!firstImage) return null;
    const ref = firstImage.asset?._id;
    return {
      ref,
      ...imgData({
        ref: ref || '',
        alt: firstImage.alt?.trim(),
      }),
    };
  }, [firstImage]);

  if (!imageData?.imageUrl) return null;

  return (
    <div className='flex flex-1 lg:max-w-[25%] w-full h-full'>
      <div 
        className={`relative w-full h-full ${comingSoon ? 'opacity-20' : ''}`}
      >
        <NextImage
          refId={imageData.ref}
          priority={true}
          className={'w-full h-full'}
          sizes='(min-width: 1024px) 80vw, 100vw'
          loading='eager'
          fetchPriority='high'
          width={800}
          height={1067}
        />
      </div>
    </div>
  );
}
