import {defineArrayMember, defineField, defineType} from 'sanity'

export const heroSectionType = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'greeting',
      title: 'Greeting',
      type: 'string',
      description: 'Short line shown above the highlighted name.',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'string',
      description: 'Text shown immediately before the highlighted name.',
      validation: (Rule) => Rule.required().max(20),
    }),
    defineField({
      name: 'name',
      title: 'Highlighted Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'nicknamePrefix',
      title: 'Nickname Prefix',
      type: 'string',
      description: 'Lead-in text for the nickname line.',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'nickname',
      title: 'Nickname',
      type: 'string',
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
      description: 'Main paragraph shown under the hero introduction.',
      validation: (Rule) => Rule.required().max(240),
    }),
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      description: 'Profile image displayed in the hero section.',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) =>
            Rule.required().error('Add descriptive alt text for the hero portrait.'),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      description: 'Buttons rendered below the hero summary.',
      of: [
        defineArrayMember({
          name: 'ctaButton',
          title: 'CTA Button',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'string',
              description: 'Use an anchor like #projects, a relative path, or a full URL.',
              validation: (Rule) =>
                Rule.required()
                  .max(200)
                  .custom((value) => {
                    if (typeof value !== 'string' || !value.trim()) {
                      return 'Link is required.'
                    }

                    if (
                      value.startsWith('#') ||
                      value.startsWith('/') ||
                      value.startsWith('http://') ||
                      value.startsWith('https://')
                    ) {
                      return true
                    }

                    return 'Use a page anchor, relative path, or full URL.'
                  }),
            }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: {
                layout: 'radio',
                list: [
                  {title: 'Primary', value: 'default'},
                  {title: 'Secondary', value: 'outline'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'openInNewTab',
              title: 'Open In New Tab',
              type: 'boolean',
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              variant: 'variant',
            },
            prepare({title, subtitle, variant}) {
              const variantLabel = variant === 'outline' ? 'Secondary' : 'Primary'

              return {
                title: title || 'Untitled button',
                subtitle: `${variantLabel} button - ${subtitle || 'No link set'}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(2),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      description: 'Links displayed below the image and in the mobile layout.',
      of: [
        defineArrayMember({
          name: 'socialLink',
          title: 'Social Link',
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'GitHub', value: 'github'},
                  {title: 'LinkedIn', value: 'linkedin'},
                  {title: 'Website', value: 'website'},
                  {title: 'Other', value: 'other'},
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Accessible Label',
              type: 'string',
              description: 'Used for screen readers and hover text.',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'href',
              title: 'Link',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              platform: 'platform',
            },
            prepare({title, subtitle, platform}) {
              return {
                title: title || platform || 'Social link',
                subtitle: subtitle || 'No link set',
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      summary: 'summary',
    },
    prepare({name, summary}) {
      return {
        title: name ? `Hero Section: ${name}` : 'Hero Section',
        subtitle: summary || 'No summary set',
      }
    },
  },
})
