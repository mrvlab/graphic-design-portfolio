import DesktopSVG from './DesktopSVG';
import MobileSVG from './MobileSVG';

const ComingSoonText = ({ className = '' }: { className?: string }) => {
  return (
    <>
      <div className='w-full lg:hidden'>
        <MobileSVG />
      </div>
      <div className={`hidden lg:block w-full`}>
        <DesktopSVG className={className} />
      </div>
    </>
  );
};

export default ComingSoonText;
