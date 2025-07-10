
import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'checkboxGroup',
  title: 'Checkbox Group',
  type: 'object',
  fields: [
    defineField({
      name: 'groupTitle',
      title: 'Group Title',
      type: 'string',
      description: 'Optional: The heading for this row of checkboxes (e.g., "Tools").'
    }),
    defineField({
      name: 'options', 
      title: 'Checkbox Options',
      type: 'array',
      of: [{type: 'string'}],
      description: 'The labels for each checkbox in this group.'
    }),
  ],
})