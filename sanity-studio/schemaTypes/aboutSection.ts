import {defineArrayMember, defineField, defineType} from 'sanity'

export const aboutSectionType = defineType({
  name: 'aboutSection',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'entries',
      title: 'Entries',
      type: 'array',
      description: 'Rows rendered in the About section.',
      of: [
        defineArrayMember({
          name: 'aboutEntry',
          title: 'About Entry',
          type: 'object',
          fields: [
            defineField({
              name: 'body',
              title: 'Body',
              type: 'text',
              rows: 6,
              validation: (Rule) => Rule.required().max(1200),
            }),
            defineField({
              name: 'illustration',
              title: 'Illustration',
              type: 'file',
              options: {
                accept: 'image/*',
              },
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Add descriptive alt text for the illustration.'),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              body: 'body',
              illustration: 'illustration',
            },
            prepare({body, illustration}) {
              const previewText =
                typeof body === 'string' && body.trim()
                  ? `${body.trim().slice(0, 72)}${body.trim().length > 72 ? '...' : ''}`
                  : 'No copy set'

              return {
                title: previewText,
                media: illustration,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(6),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      entries: 'entries',
    },
    prepare({title, entries}) {
      const count = Array.isArray(entries) ? entries.length : 0

      return {
        title: title || 'About Section',
        subtitle: `${count} ${count === 1 ? 'entry' : 'entries'}`,
      }
    },
  },
})
