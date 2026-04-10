export type HeroSectionQueryResult = {
  _id: string;
  _updatedAt: string;
  greeting: string;
  intro: string;
  name: string;
  nicknamePrefix: string;
  nickname: string;
  summary: string;
  portrait?: {
    alt?: string;
    asset?: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: {
          width?: number;
          height?: number;
          aspectRatio?: number;
        };
        lqip?: string;
      };
    };
  } | null;
  ctaButtons: Array<{
    _key: string;
    label: string;
    href: string;
    variant?: 'default' | 'outline' | null;
    openInNewTab?: boolean | null;
  }>;
  socialLinks: Array<{
    _key: string;
    platform: string;
    label: string;
    href: string;
  }>;
} | null;

export const heroSectionQuery = `
  *[_type == "heroSection"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    greeting,
    intro,
    name,
    nicknamePrefix,
    nickname,
    summary,
    portrait{
      alt,
      asset->{
        _id,
        url,
        metadata{
          dimensions,
          lqip
        }
      }
    },
    "ctaButtons": coalesce(ctaButtons, [])[]{
      _key,
      label,
      href,
      variant,
      openInNewTab
    },
    "socialLinks": coalesce(socialLinks, [])[]{
      _key,
      platform,
      label,
      href
    }
  }
`;

export type AboutSectionQueryResult = {
  _id: string;
  _updatedAt: string;
  title: string;
  entries: Array<{
    _key: string;
    body: string;
    illustration?: {
      alt?: string;
      asset?: {
        _id: string;
        url: string;
        originalFilename?: string;
        mimeType?: string;
      };
    } | null;
  }>;
} | null;

export const aboutSectionQuery = `
  *[_type == "aboutSection"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    title,
    "entries": coalesce(entries, [])[]{
      _key,
      body,
      illustration{
        alt,
        asset->{
          _id,
          url,
          originalFilename,
          mimeType
        }
      }
    }
  }
`;

export type SkillsSectionQueryResult = {
  _id: string;
  _updatedAt: string;
  title: string;
  categories: Array<{
    _key: string;
    title: string;
    skills: Array<{
      _key: string;
      label: string;
      icon?: {
        asset?: {
          _id: string;
          url: string;
          originalFilename?: string;
          mimeType?: string;
        };
      } | null;
    }>;
  }>;
} | null;

export const skillsSectionQuery = `
  *[_type == "skillsSection"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    title,
    "categories": coalesce(categories, [])[]{
      _key,
      title,
      "skills": coalesce(skills, [])[]{
        _key,
        label,
        icon{
          asset->{
            _id,
            url,
            originalFilename,
            mimeType
          }
        }
      }
    }
  }
`;

export type ProjectsSectionQueryResult = {
  _id: string;
  _updatedAt: string;
  title: string;
  projects: Array<{
    _key: string;
    title: string;
    isVisible?: boolean | null;
    technologies: string[];
    projectUrl: string;
    sourceCodeUrl: string;
    image?: {
      alt?: string;
      asset?: {
        _id: string;
        url: string;
        metadata?: {
          dimensions?: {
            width?: number;
            height?: number;
            aspectRatio?: number;
          };
          lqip?: string;
        };
      };
    } | null;
  }>;
} | null;

export const projectsSectionQuery = `
  *[_type == "projectsSection"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    title,
    "projects": coalesce(projects, [])[]{
      _key,
      title,
      isVisible,
      technologies,
      projectUrl,
      sourceCodeUrl,
      image{
        alt,
        asset->{
          _id,
          url,
          metadata{
            dimensions,
            lqip
          }
        }
      }
    }
  }
`;

export type ContactSectionQueryResult = {
  _id: string;
  _updatedAt: string;
  title: string;
  introText: string;
  emailAddress: string;
  formText: string;
  submitButtonLabel: string;
} | null;

export const contactSectionQuery = `
  *[_type == "contactSection"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    title,
    introText,
    emailAddress,
    formText,
    submitButtonLabel
  }
`;

export type NavigationSettingsQueryResult = {
  _id: string;
  _updatedAt: string;
  navigationLinks: Array<{
    _key: string;
    label: string;
    href: string;
    isVisible?: boolean | null;
  }>;
} | null;

export const navigationSettingsQuery = `
  *[_type == "navigationSettings"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    "navigationLinks": coalesce(navigationLinks, [])[]{
      _key,
      label,
      href,
      isVisible
    }
  }
`;

export type GlobalSeoQueryResult = {
  _id: string;
  _updatedAt: string;
  seoTitle: string;
  seoDescription: string;
} | null;

export const globalSeoQuery = `
  *[_type == "globalSeo"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    seoTitle,
    seoDescription
  }
`;

export type FooterSettingsQueryResult = {
  _id: string;
  _updatedAt: string;
  footerOwnerName: string;
  footerRightsText: string;
} | null;

export const footerSettingsQuery = `
  *[_type == "footerSettings"] | order(_updatedAt desc)[0]{
    _id,
    _updatedAt,
    footerOwnerName,
    footerRightsText
  }
`;
