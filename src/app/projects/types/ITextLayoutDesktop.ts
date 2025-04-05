import IProject from './IProject';

type ITextLayoutDesktop = {
  index: number;
  project: IProject;
  setIsHovered: (isHovered: boolean) => void;
};

export default ITextLayoutDesktop;
