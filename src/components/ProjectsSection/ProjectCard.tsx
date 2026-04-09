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
      <a
        href={projectUrl}
        target="_blank"
        rel="noreferrer"
        className="group block mb-5 overflow-hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
      >
        <img
          className="object-cover aspect-[1.5] transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105"
          src={imgSrc}
          alt={imgAlt}
          loading="lazy"
        />
      </a>
      <p className="mb-4">
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          className="text-2xl font-bold leading-[1.3] transition-colors duration-200 hover:text-brand focus-visible:text-brand focus-visible:outline-none"
        >
          {title}
        </a>
      </p>
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
          rel="noreferrer"
          aria-label={`View project: ${title}`}
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
          rel="noreferrer"
          aria-label={`View code: ${title}`}
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
