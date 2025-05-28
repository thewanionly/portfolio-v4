import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { ProjectCard } from './ProjectCard';

import type { Project } from './ProjectsSection.types';

export const ProjectCarousel = ({ projects }: { projects: Project[] }) => (
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
