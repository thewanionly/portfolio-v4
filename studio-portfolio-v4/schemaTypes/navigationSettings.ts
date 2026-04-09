import {defineArrayMember, defineField, defineType} from 'sanity'

export const navigationSettingsType = defineType({
  name: 'navigationSettings',
  title: 'Navigation Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'navigationLinks',
      title: 'Navigation Links',
      type: 'array',
      description: 'Controls the desktop and mobile navigation order and labels.',
      of: [
        defineArrayMember({
          name: 'navigationLink',
          title: 'Navigation Link',
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
              name: 'isVisible',
              title: 'Display Link',
              type: 'boolean',
              description: 'Turn off to hide this link from the site navigation.',
              initialValue: true,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'href',
              isVisible: 'isVisible',
            },
            prepare({title, subtitle, isVisible}) {
              return {
                title: title || 'Untitled link',
                subtitle: `${isVisible === false ? 'Hidden' : 'Visible'} - ${subtitle || 'No link set'}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
  ],
  preview: {
    select: {
      navigationLinks: 'navigationLinks',
    },
    prepare({navigationLinks}) {
      const count = Array.isArray(navigationLinks) ? navigationLinks.length : 0

      return {
        title: 'Navigation Settings',
        subtitle: `${count} ${count === 1 ? 'nav link' : 'nav links'}`,
      }
    },
  },
})
