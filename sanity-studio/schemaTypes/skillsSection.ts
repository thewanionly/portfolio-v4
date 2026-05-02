import {defineArrayMember, defineField, defineType} from 'sanity'

const skillFields = [
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
  }),
]

const skillPreview = {
  select: {
    title: 'label',
    media: 'icon',
    icon: 'icon',
  },
  prepare({title, media, icon}: {title?: string; media?: unknown; icon?: unknown}) {
    return {
      title: title || 'Untitled skill',
      subtitle: icon ? 'Icon uploaded' : 'No icon uploaded',
      media,
    }
  },
}

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
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Manage the four broad skill groups shown on the homepage.',
      of: [
        defineArrayMember({
          name: 'category',
          title: 'Category',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Category Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'skills',
              title: 'Skills',
              type: 'array',
              description: 'Items rendered within this category on the homepage.',
              of: [
                defineArrayMember({
                  name: 'skill',
                  title: 'Skill',
                  type: 'object',
                  fields: skillFields,
                  preview: skillPreview,
                }),
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              skills: 'skills',
            },
            prepare({title, skills}: {title?: string; skills?: Array<unknown>}) {
              const count = Array.isArray(skills) ? skills.length : 0

              return {
                title: title || 'Untitled category',
                subtitle: `${count} ${count === 1 ? 'skill' : 'skills'}`,
              }
            },
          },
        }),
      ],
      validation: (Rule) =>
        Rule.custom((categories) => {
          if (categories == null) {
            return true
          }

          if (!Array.isArray(categories) || categories.length !== 4) {
            return 'Add exactly 4 categories.'
          }

          return true
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categories: 'categories',
    },
    prepare({title, categories}: {title?: string; categories?: Array<unknown>}) {
      const categoryCount = Array.isArray(categories) ? categories.length : 0

      return {
        title: title || 'Skills Section',
        subtitle: `${categoryCount} ${categoryCount === 1 ? 'category' : 'categories'}`,
      }
    },
  },
})
