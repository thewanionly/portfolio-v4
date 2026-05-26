import { cn } from '@/lib/utils';
import type { Project } from './ProjectsSection.types';
import { buttonVariants } from '../ui/button';

const PROJECT_IMAGE_ASPECT_RATIO = 1.5;
const PROJECT_IMAGE_TARGET_WIDTHS = [320, 480, 640, 768, 960, 1200];
const PROJECT_IMAGE_SIZES =
  '(min-width: 1152px) 512px, (min-width: 768px) calc((100vw - 6.5rem) / 2), calc(100vw - 3rem)';

const buildProjectImageUrl = (url: string, width: number) => {
  const imageUrl = new URL(url);
  const height = Math.round(width / PROJECT_IMAGE_ASPECT_RATIO);

  imageUrl.searchParams.set('w', String(width));
  imageUrl.searchParams.set('h', String(height));
  imageUrl.searchParams.set('fit', 'crop');
  imageUrl.searchParams.set('auto', 'format');
  imageUrl.searchParams.set('q', '82');

  return imageUrl.toString();
};

const getProjectImageWidths = (sourceWidth?: number) => {
  if (!sourceWidth) return PROJECT_IMAGE_TARGET_WIDTHS;

  if (sourceWidth < PROJECT_IMAGE_TARGET_WIDTHS[0]) return [sourceWidth];

  const imageWidths = PROJECT_IMAGE_TARGET_WIDTHS.filter((width) => width <= sourceWidth);
  const largestTargetWidth = PROJECT_IMAGE_TARGET_WIDTHS.at(-1)!;

  if (sourceWidth < largestTargetWidth && !imageWidths.includes(sourceWidth)) {
    return [...imageWidths, sourceWidth];
  }

  return imageWidths;
};

export const ProjectCard = ({
  project: {
    imgSrc,
    imgAlt,
    imgWidth,
    title,
    description,
    technologies,
    projectUrl,
    sourceCodeUrl,
  },
}: {
  project: Project;
}) => {
  const imageWidths = getProjectImageWidths(imgWidth);
  const fallbackImageWidth = imageWidths.at(-1) ?? PROJECT_IMAGE_TARGET_WIDTHS.at(-1)!;
  const fallbackImageHeight = Math.round(fallbackImageWidth / PROJECT_IMAGE_ASPECT_RATIO);
  const optimizedImgSrc = imgSrc ? buildProjectImageUrl(imgSrc, fallbackImageWidth) : imgSrc;
  const placeholderImgSrc = imgSrc ? buildProjectImageUrl(imgSrc, 48) : undefined;
  const optimizedImgSrcSet = imgSrc
    ? imageWidths.map((width) => `${buildProjectImageUrl(imgSrc, width)} ${width}w`).join(', ')
    : undefined;

  return (
    <div className="flex h-full flex-col">
      <a
        href={projectUrl}
        target="_blank"
        rel="noreferrer"
        className="group relative mb-5 block aspect-[1.5] overflow-hidden rounded-md bg-grey-light/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4"
      >
        {placeholderImgSrc && (
          <div
            aria-hidden="true"
            className="absolute inset-0 scale-110 bg-cover bg-center bg-no-repeat blur-lg"
            style={{ backgroundImage: `url("${placeholderImgSrc}")` }}
          />
        )}
        <img
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 group-focus-visible:scale-105"
          src={optimizedImgSrc}
          srcSet={optimizedImgSrcSet}
          sizes={PROJECT_IMAGE_SIZES}
          alt={imgAlt}
          width={fallbackImageWidth}
          height={fallbackImageHeight}
          loading="lazy"
          decoding="async"
        />
      </a>
      <p className="mb-2">
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          className="line-clamp-2 rounded-sm text-2xl font-bold leading-[1.3] transition-colors duration-200 hover:text-brand focus-visible:text-brand focus-visible:underline focus-visible:decoration-2 focus-visible:underline-offset-4 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {title}
        </a>
      </p>
      <p className="mb-5 min-h-24 line-clamp-4 text-sm leading-6 text-muted-foreground md:min-h-28 md:text-base md:leading-7">
        {description}
      </p>
      <div className="mb-8 flex max-h-[6.25rem] flex-wrap gap-2 overflow-hidden text-sm font-medium leading-5 text-grey-light">
        {technologies.map((tech) => (
          <span key={tech} className="px-2.5 py-1 rounded-full bg-grey-light/10">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-3 xs:flex-row xs:gap-6 xs:justify-between">
        <a
          href={projectUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`View project: ${title}`}
          className={cn(
            buttonVariants({ variant: 'default' }),
            'w-full min-w-0 xs:flex-1 md:text-base md:h-10 md:px-6'
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
            'w-full min-w-0 xs:flex-1 md:text-base md:h-10 md:px-6'
          )}
        >
          View code
        </a>
      </div>
    </div>
  );
};
