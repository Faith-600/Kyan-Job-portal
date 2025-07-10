import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'application',
  title: 'Job Application',
  type: 'document',
  __experimental_actions: [/*'create',*/ 'update', 'delete', 'publish'],

  fields: [
    defineField({
      name: 'job',
      title: 'Applied For',
      type: 'reference',
      to: [{type: 'job'}], 
      readOnly: true,
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
    }),
    defineField({
      name: 'formResponses',
      title: 'Form Responses',
      type: 'array',
      readOnly: true,
      of: [
        defineField({
          type: 'object',
          name: 'response',
          fields: [
            defineField({name: 'question', type: 'string'}),
            defineField({name: 'answer', type: 'text'}),
          ],
        }),
      ],
    }),
    defineField({
      name: 'cvFile',
      title: 'CV/Resume File',
      type: 'file',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      jobTitle: 'job.title',
      date: 'submittedAt',
      applicantName: 'formResponses.0.answer', 
    },
    prepare({jobTitle, date, applicantName}) {
      const submittedDate = date ? new Date(date).toLocaleDateString() : 'No date';
      return {
        title: applicantName || 'Unnamed Application',
        subtitle: `For: ${jobTitle || 'N/A'} on ${submittedDate}`,
      };
    },
  },
})