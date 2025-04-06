import localFont from 'next/font/local';

export const lausanne = localFont({
  src: [
    {
      path: './Lausanne-300.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Lausanne-300.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Lausanne-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Lausanne-500.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: './Lausanne-300Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './Lausanne-300Italic.woff',
      weight: '400',
      style: 'italic',
    },
  ],
  display: 'swap',
  variable: '--font-lausanne',
});
