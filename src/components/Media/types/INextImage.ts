import { ImageProps } from 'next/image';

export type INextImage = {
  refId?: string;
  src?: string;
  alt?: string;
  lqip?: boolean;
  blurStrength?: number;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
} & Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'placeholder' | 'blurDataURL'
>;
