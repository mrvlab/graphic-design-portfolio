import { getCurrentYear } from '@/utils/getCurrentYear';
import React from 'react';
import CityClock from '../CityClock/CityClock';

const Footer = () => {
  return (
    <footer className='flex flex-col items-center'>
      <div>
        <CityClock />
      </div>
      <span>&copy; {getCurrentYear()} All rights reserved</span>
    </footer>
  );
};

export default Footer;
