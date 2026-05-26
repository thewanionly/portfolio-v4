export interface Project {
  id: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description?: string;
  technologies: string[];
  sourceCodeUrl: string;
  projectUrl: string;
}
