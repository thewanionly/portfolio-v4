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
