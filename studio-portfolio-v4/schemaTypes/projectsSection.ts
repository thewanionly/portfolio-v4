import {defineArrayMember, defineField, defineType} from 'sanity'

export const projectsSectionType = defineType({
  name: 'projectsSection',
  title: 'Projects Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      description: 'Projects shown in the homepage carousel and grid.',
      of: [
        defineArrayMember({
          name: 'project',
          title: 'Project',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required().max(80),
            }),
            defineField({
              name: 'isVisible',
              title: 'Display Project',
              type: 'boolean',
              description: 'Turn off to hide this project from the homepage without deleting it.',
              initialValue: true,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Screenshot',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) =>
                    Rule.required().error('Add descriptive alt text for the project screenshot.'),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'technologies',
              title: 'Technologies',
              type: 'array',
              description: 'Tech tags displayed under the project title.',
              of: [
                defineArrayMember({
                  type: 'string',
                  validation: (Rule) => Rule.required().max(40),
                }),
              ],
              validation: (Rule) => Rule.required().min(1).max(16),
            }),
            defineField({
              name: 'projectUrl',
              title: 'Project URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
            defineField({
              name: 'sourceCodeUrl',
              title: 'Source Code URL',
              type: 'url',
              validation: (Rule) =>
                Rule.required().uri({
                  scheme: ['http', 'https'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'projectUrl',
              media: 'image',
              isVisible: 'isVisible',
            },
            prepare({title, subtitle, media, isVisible}) {
              return {
                title: title || 'Untitled project',
                subtitle: `${isVisible === false ? 'Hidden' : 'Visible'} - ${subtitle || 'No link set'}`,
                media,
              }
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      projects: 'projects',
    },
    prepare({title, projects}) {
      const count = Array.isArray(projects) ? projects.length : 0

      return {
        title: title || 'Projects Section',
        subtitle: `${count} ${count === 1 ? 'project' : 'projects'}`,
      }
    },
  },
})
