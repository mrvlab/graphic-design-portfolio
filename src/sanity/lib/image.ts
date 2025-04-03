import createImageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { dataset, projectId } from '../env';

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};

type ImageData = {
  ref: SanityImageSource;
  alt?: string;
  width?: number;
  height?: number;
  lqipWidth?: number;
  lqipHeight?: number;
  lqipBlurAmount?: number;
};

export const imgData = ({
  ref,
  alt,
  width = 400,
  height = 533,
  lqipWidth = 24,
  lqipHeight = 24,
  lqipBlurAmount = 10,
}: ImageData) => {
  if (!ref) {
    return {
      imageUrl: '',
      blurDataURL: '',
      altText: alt?.trim() || 'Image',
    };
  }

  const imageUrl = builder.image(ref).width(width).height(height).url();
  const blurDataURL = builder
    .image(ref)
    .width(lqipWidth)
    .height(lqipHeight)
    .blur(lqipBlurAmount)
    .url();

  return {
    imageUrl,
    blurDataURL,
    altText: alt?.trim() || 'Image',
  };
};
