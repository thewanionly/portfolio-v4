export interface Project {
  id: string;
  imgSrc: string;
  imgAlt: string;
  imgWidth?: number;
  title: string;
  description?: string;
  technologies: string[];
  sourceCodeUrl: string;
  projectUrl: string;
}
