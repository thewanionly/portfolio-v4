import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronDown } from 'lucide-react';

type Skill = {
  _key: string;
  label: string;
  icon?: {
    asset?: {
      url: string;
    } | null;
  } | null;
};

type SkillCategory = {
  _key: string;
  title: string;
  skills: Skill[];
};

type SkillsAccordionProps = {
  categories: SkillCategory[];
};

export const SkillsAccordion = ({ categories }: SkillsAccordionProps) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(() =>
    categories.reduce<Record<string, boolean>>((accumulator, category) => {
      accumulator[category._key] = true;
      return accumulator;
    }, {})
  );
  const [isDesktop, setIsDesktop] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateDesktopState = () => setIsDesktop(mediaQuery.matches);

    updateDesktopState();
    mediaQuery.addEventListener('change', updateDesktopState);

    return () => mediaQuery.removeEventListener('change', updateDesktopState);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {categories.map(({ _key, title, skills }) => {
        const isOpen = openCategories[_key] ?? true;
        const shouldShowContent = isDesktop || isOpen;
        const contentId = `skills-category-${_key}`;

        return (
          <section
            key={_key}
            className="rounded-3xl border border-border/70 bg-background/80 p-5 shadow-sm backdrop-blur-sm md:p-6"
            data-category-key={_key}
          >
            <div className="md:flex md:items-start md:gap-6 lg:gap-7 xl:gap-8">
              <div className="flex items-center justify-between gap-4 md:w-56 md:flex-none md:items-start lg:w-64 xl:w-72">
                <h3 className="text-lg font-semibold tracking-normal text-foreground md:text-xl">
                  {title}
                </h3>

                <div className="flex shrink-0 items-center">
                  <button
                    type="button"
                    className="flex size-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground/80 transition-colors focus-visible:outline-none focus-visible:border-brand focus-visible:ring-4 focus-visible:ring-brand/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background md:hidden"
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${title}`}
                    onClick={() =>
                      setOpenCategories((current) => ({
                        ...current,
                        [_key]: !current[_key],
                      }))
                    }
                  >
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { duration: 0.24, ease: [0.22, 1, 0.36, 1] }
                      }
                      className="flex items-center justify-center"
                    >
                      <ChevronDown className="size-5" aria-hidden="true" />
                    </motion.span>
                  </button>
                </div>
              </div>

              <motion.div
                id={contentId}
                initial={false}
                animate={
                  shouldShowContent
                    ? { height: 'auto', opacity: 1 }
                    : prefersReducedMotion
                      ? { height: 0, opacity: 1 }
                      : { height: 0, opacity: 0 }
                }
                transition={
                  prefersReducedMotion
                    ? { duration: 0 }
                    : {
                        height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 0.18, ease: 'easeOut' },
                      }
                }
                className="overflow-hidden md:min-w-0 md:flex-1"
                aria-hidden={!shouldShowContent}
              >
                <ul className="flex flex-wrap gap-3 pt-5 md:pt-0">
                  {skills.map(({ _key: skillKey, label, icon }) => (
                    <li key={skillKey}>
                      <div
                        className="flex min-h-14 items-center gap-3 rounded-2xl border border-border/70 bg-background/90 px-3 py-2.5 shadow-sm"
                        data-skill-key={skillKey}
                      >
                        {icon?.asset?.url && (
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background-secondary ring-1 ring-border/60">
                            <img
                              className="size-5 object-contain"
                              src={icon.asset.url}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              decoding="async"
                            />
                          </span>
                        )}
                        <span className="text-sm font-medium text-foreground/90">{label}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </section>
        );
      })}
    </div>
  );
};
