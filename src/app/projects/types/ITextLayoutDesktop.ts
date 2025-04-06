import IIndexProject from './IIndexProject';

type ITextLayoutDesktop = {
  index: number;
  project: IIndexProject;
  setIsHovered: (isHovered: boolean) => void;
  isHovered: boolean;
};

export default ITextLayoutDesktop;
