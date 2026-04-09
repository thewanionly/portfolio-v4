import {defineField, defineType} from 'sanity'

export const globalSeoType = defineType({
  name: 'globalSeo',
  title: 'Global SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Used for the browser title and search engine title.',
      validation: (Rule) => Rule.required().max(70),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 3,
      description: 'Used for the homepage meta description.',
      validation: (Rule) => Rule.required().max(160),
    }),
  ],
  preview: {
    select: {
      seoTitle: 'seoTitle',
    },
    prepare({seoTitle}) {
      return {
        title: 'Global SEO',
        subtitle: seoTitle || 'No SEO title set',
      }
    },
  },
})
