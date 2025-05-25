import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { ProjectCard } from './ProjectCard';
import type { Project } from './ProjectsSection.types';

import img1 from '@/assets/images/entertainment-web-app-wani.png';
import img2 from '@/assets/images/audiophile-wani.png';
import img3 from '@/assets/images/devfinder-wani.png';
import img4 from '@/assets/images/password-generator-wani.png';
import img5 from '@/assets/images/rock-paper-scissors.png';
import img6 from '@/assets/images/todo-app-wani.png';

// TODO: move these to CMS
const projects: Project[] = [
  {
    id: '1',
    imgSrc: img1.src,
    imgAlt: 'Screenshot of the desktop view of entertainment web app',
    title: 'Entertainment Web App',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Jest',
      'React Testing Library',
      'Storybook',
      'Zustand',
      'shadcn',
      'Framer Motion',
    ],
    projectUrl: 'https://entertainment-web-app-wani.vercel.app',
    sourceCodeUrl: 'https://github.com/thewanionly/entertainment-web-app',
  },
  {
    id: '2',
    imgSrc: img2.src,
    imgAlt: 'Screenshot of the desktop view of Audiophile app',
    title: 'Audiophile',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'JavaScript',
      'emotion styled',
      'Jest',
      'React Testing Library',
      'Zustand',
      'React Hook Form',
      'Zod',
      'Sanity CMS',
    ],
    projectUrl: 'https://audiophile-wani.vercel.app',
    sourceCodeUrl: 'https://github.com/thewanionly/audiophile',
  },
  {
    id: '3',
    imgSrc: img3.src,
    imgAlt: 'Screenshot of the desktop view of Dev Finder app',
    title: 'Dev Finder',
    technologies: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'styled-components',
      'Jest',
      'React Testing Library',
      'Vite',
    ],
    projectUrl: 'https://devfinder-wani.vercel.app',
    sourceCodeUrl: 'https://github.com/thewanionly/devfinder',
  },
  {
    id: '4',
    imgSrc: img4.src,
    imgAlt: 'Screenshot of the desktop view of Password Generator app',
    title: 'Password Generator',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Storybook',
      'Jest',
      'React Testing Library',
      'ShadcnUI',
    ],
    projectUrl: 'https://password-generator-wani.vercel.app',
    sourceCodeUrl: 'https://github.com/thewanionly/password-generator',
  },
  {
    id: '5',
    imgSrc: img5.src,
    imgAlt: 'Screenshot of the desktop view of Rock Paper Scissors app',
    title: 'Rock Paper Scissors',
    technologies: [
      'React',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'styled-components',
      'Jest',
      'React Testing Library',
      'Vite',
    ],
    projectUrl: 'https://rockpaperscissors-wani.vercel.app',
    sourceCodeUrl: 'https://github.com/thewanionly/rock-paper-scissors',
  },
  {
    id: '6',
    imgSrc: img6.src,
    imgAlt: 'Screenshot of the desktop view of Todo app',
    title: 'Todo App',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Storybook',
      'Jest',
      'React Testing Library',
    ],
    projectUrl: 'https://todo-app-wani.vercel.app',
    sourceCodeUrl: 'https://github.com/thewanionly/todo-app',
  },
];

export const ProjectList = () => {
  return (
    <Carousel className="flex flex-col w-full max-w-md mx-auto">
      <CarouselContent>
        {projects.map((project) => (
          <CarouselItem key={project.id}>
            <div className="p-1">
              <ProjectCard project={project} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-12.5 flex justify-center gap-3">
        <CarouselPrevious className="static" />
        <CarouselNext className="static" />
      </div>
    </Carousel>
  );
};
