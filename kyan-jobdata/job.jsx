
import {defineField, defineType} from 'sanity'



export default defineType({
  name: 'job',
  title: 'Job Posting',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Job Title (for listing card)',
      type: 'string',
      description: 'e.g., Operations and Administrative Assistant',
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      description: 'A number to control the display order. Lower numbers appear first (e.g., 1, 2, 3...).',
      validation: (Rule) => Rule.integer().positive().warning('Order should be a positive number.'),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured (Has Details Page)',
      type: 'boolean',
      description:
        'Turn this ON to make the job clickable with a "View Details" button. Featured jobs will appear at the top of the list.',
      initialValue: false,
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'A unique URL identifier for this job. Click "Generate".',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'avatar',
      title: 'Company Avatar or Logo',
      type: 'image',
    }),
    defineField({
      name: 'description',
      title: 'Short Description (for listing card)',
      type: 'text',
      description: 'A brief 1-2 sentence summary for the main jobs page.',
    }),
    defineField({
      name: 'level',
      title: 'Job Level',
      type: 'string',
      options: {
        list: ['Officer', 'Manager', 'Intern', 'Senior Level', 'Executive', 'Any Level'],
      },
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      description: 'e.g., Full-Time, Part-Time, Contract',
      options: {
        list: [
          {title: 'Full-Time', value: 'full-time'},
          {title: 'Part-Time', value: 'part-time'},
          {title: 'Contract', value: 'contract'},
          {title: 'Internship', value: 'internship'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'posted_ago',
      title: 'Date Posted',
      type: 'date',
    }),
    defineField({
      name: 'summaryTitle',
      title: 'Summary Section Title',
      type: 'string',
      initialValue: 'Job Summary',
    }),
    defineField({
      name: 'titleTwo',
      title: 'Full Job Title (for details page)',
      type: 'string',
      description: 'The title that appears at the top of the job details page.',
    }),
    defineField({
      name: 'summary',
      title: 'Full Job Summary',
      type: 'text',
      description: 'The main summary paragraph for the details page.',
    }),
    defineField({
      name: 'detailsTitle',
      title: 'Job Details Section Title',
      type: 'string',
      initialValue: 'Job Details',
    }),
    defineField({
      name: 'details',
      title: 'Job Detail Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({name: 'section', title: 'Section Title', type: 'string'}),
            defineField({
              name: 'responsibilities',
              title: 'Responsibilities',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'requirementsTitle',
      title: 'Requirements Section Title',
      type: 'string',
      initialValue: 'Requirements',
    }),
    defineField({
      name: 'requirementDetails',
      title: 'List of Requirements',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'benefitTitle',
      title: 'Benefits Section Title',
      type: 'string',
      initialValue: 'Benefits',
    }),
    defineField({
      name: 'benefitDetails',
      title: 'List of Benefits',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'applyContent',
      title: 'Application Form Content',
      type: 'object',
      fields: [
        defineField({name: 'intro', title: 'Intro Paragraphs', type: 'array', of: [{type: 'string'}]}),
        defineField({name: 'notesTitle', title: 'Notes Title', type: 'string'}),
        defineField({name: 'notes', title: 'List of Notes', type: 'array', of: [{type: 'string'}]}),
        defineField({name: 'outro', title: 'Outro Paragraphs', type: 'array', of: [{type: 'string'}]}),
      ],
    }),
    defineField({
      name: 'formFields',
      title: 'Custom Application Form Fields',
      description: "Define the questions for this job's application form.",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'formField',
          fields: [
            defineField({
              name: 'fieldName',
              title: 'Field Name / ID',
              type: 'slug',
              description: 'A unique ID for this field (e.g., "full_name", "relevant_experience").',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Field Label',
              type: 'string',
              description: 'The question you want to ask (e.g., "What is your full name?")',
              validation: (Rule) => Rule.required(),
            }),
            {
           name: 'placeholder', 
            title: 'Placeholder Text',
          type: 'string',
        description: 'Optional: The gray text inside the input box (e.g., "Answer Here").',
        hidden: ({ parent }) => !['text', 'email', 'tel', 'textarea','file'].includes(parent?.fieldType),
       },
            defineField({
              name: 'fieldType',
              title: 'Field Type',
              type: 'string',
              validation: (Rule) => Rule.required(),
              options: {
                list: [
                  {title: 'Short Text (Single Line)', value: 'text'},
                  {title: 'Email', value: 'email'},
                  {title: 'Phone Number', value: 'tel'},
                  {title: 'Paragraph (Multi-line)', value: 'textarea'},
                  {title: 'Radio Buttons (Select one)', value: 'radio'},
                  {title: 'Checkboxes (Grouped Rows)', value: 'checkbox_grouped'}, 
                 {title: 'Checkboxes (Simple Grid)', value: 'checkbox_grid'},                 
                   {title: 'File Upload', value: 'file'},
                ],
              },
            }),
            defineField({
              name: 'options',
              title: 'Options (for Radio/Checkbox)',
              type: 'array',
              of: [{type: 'string'}],
        hidden: ({parent}) => parent?.fieldType === 'checkbox_grouped',            }),
           
       defineField({
                name: 'checkboxGroups',
                title: 'Checkbox Groups',
                type: 'array',
                of: [{type: 'checkboxGroup'}], 
                hidden: ({parent}) => parent?.fieldType !== 'checkbox_grouped',
            }),


             {
         name: 'allowOther', 
      title: 'Allow an "Other" option with a text input?',
      type: 'boolean',
     initialValue: false,
      hidden: ({ parent }) => !['radio', 'checkbox'].includes(parent?.fieldType),
},
     
            defineField({
              name: 'isRequired',
              title: 'Is this field required?',
              type: 'boolean',
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              label: 'label',
              type: 'fieldType',
            },
            prepare({label, type}) {
              return {
                title: label,
                subtitle: `Type: ${type}`,
              }
            },
          },
        },
      ],
    }),
  ],
})