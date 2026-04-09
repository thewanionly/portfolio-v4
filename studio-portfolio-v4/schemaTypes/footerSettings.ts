import {defineField, defineType} from 'sanity'

export const footerSettingsType = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'footerOwnerName',
      title: 'Footer Owner Name',
      type: 'string',
      description: 'Name shown in the copyright line.',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'footerRightsText',
      title: 'Footer Rights Text',
      type: 'string',
      description: 'Text shown after the owner name in the copyright line.',
      validation: (Rule) => Rule.required().max(80),
    }),
  ],
  preview: {
    select: {
      footerOwnerName: 'footerOwnerName',
      footerRightsText: 'footerRightsText',
    },
    prepare({footerOwnerName, footerRightsText}) {
      return {
        title: 'Footer Settings',
        subtitle: `${footerOwnerName || 'No owner set'}${footerRightsText ? ` - ${footerRightsText}` : ''}`,
      }
    },
  },
})
