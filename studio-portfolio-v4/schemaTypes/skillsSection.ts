import {defineArrayMember, defineField, defineType} from 'sanity'

export const skillsSectionType = defineType({
  name: 'skillsSection',
  title: 'Skills Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      description: 'Items rendered in the skills grid on the homepage.',
      of: [
        defineArrayMember({
          name: 'skill',
          title: 'Skill',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required().max(40),
            }),
            defineField({
              name: 'icon',
              title: 'Icon',
              type: 'file',
              description: 'Upload the icon asset rendered for this skill. SVG works best.',
              options: {
                accept: 'image/svg+xml,image/*',
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'label',
              media: 'icon',
              icon: 'icon',
            },
            prepare({title, media, icon}) {
              return {
                title: title || 'Untitled skill',
                subtitle: icon ? 'Icon uploaded' : 'No icon uploaded',
                media,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(24),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      skills: 'skills',
    },
    prepare({title, skills}) {
      const count = Array.isArray(skills) ? skills.length : 0

      return {
        title: title || 'Skills Section',
        subtitle: `${count} ${count === 1 ? 'skill' : 'skills'}`,
      }
    },
  },
})
