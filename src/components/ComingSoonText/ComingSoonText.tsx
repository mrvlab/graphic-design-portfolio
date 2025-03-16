import DesktopSVG from './DesktopSVG';
import MobileSVG from './MobileSVG';

const ComingSoonText = () => {
  return (
    <>
      <div className='w-full lg:hidden'>
        <MobileSVG />
      </div>
      <div className='hidden lg:block w-full'>
        <DesktopSVG />
      </div>
    </>
  );
};

export default ComingSoonText;
