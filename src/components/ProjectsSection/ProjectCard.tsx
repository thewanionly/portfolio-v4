import { cn } from '@/lib/utils';
import type { Project } from './ProjectsSection.types';
import { buttonVariants } from '../ui/button';

export const ProjectCard = ({
  project: { imgSrc, imgAlt, title, technologies, projectUrl, sourceCodeUrl },
}: {
  project: Project;
}) => {
  return (
    <div>
      <div className="mb-5">
        <img className=" object-cover aspect-[1.5]" src={imgSrc} alt={imgAlt} loading="lazy" />
      </div>
      <p className="text-2xl font-bold leading-[1.3] mb-4">{title}</p>
      <div className="flex flex-wrap gap-2 text-sm font-medium mb-8 text-grey-light">
        {technologies.map((tech) => (
          <span key={tech} className="px-2.5 py-1 rounded-full bg-grey-light/10">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-6 justify-between">
        <a
          href={projectUrl}
          target="_blank"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'flex-1 md:text-base md:h-10 md:px-6'
          )}
        >
          View Project
        </a>
        <a
          href={sourceCodeUrl}
          target="_blank"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'flex-1 md:text-base md:h-10 md:px-6 '
          )}
        >
          View code
        </a>
      </div>
    </div>
  );
};
