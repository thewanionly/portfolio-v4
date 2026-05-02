import {defineField, defineType} from 'sanity'

export const contactSectionType = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(80),
    }),
    defineField({
      name: 'introText',
      title: 'Intro Text',
      type: 'text',
      rows: 4,
      description: 'First paragraph shown before the contact email link.',
      validation: (Rule) => Rule.required().max(280),
    }),
    defineField({
      name: 'emailAddress',
      title: 'Email Address',
      type: 'string',
      validation: (Rule) =>
        Rule.required().email().error('Enter a valid email address for the contact link.'),
    }),
    defineField({
      name: 'formText',
      title: 'Form Text',
      type: 'text',
      rows: 3,
      description: 'Second paragraph shown above the contact form.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
      description: 'Label shown on the contact form submit button.',
      validation: (Rule) => Rule.required().max(40),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      emailAddress: 'emailAddress',
    },
    prepare({title, emailAddress}) {
      return {
        title: title || 'Contact Section',
        subtitle: emailAddress || 'No email address set',
      }
    },
  },
})
