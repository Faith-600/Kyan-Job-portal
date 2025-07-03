// schemas/job.js

export default {
  name: 'job',
  // This is the user-friendly title in the Studio
  title: 'Job Posting',
  // This is the type of schema
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Job Title (for listing card)',
      type: 'string',
      description: 'e.g., Operations and Administrative Assistant',
    },

      {
    name: 'sortOrder',
    title: 'Sort Order',
     type: 'number', 
  description: 'A number to control the display order. Lower numbers appear first (e.g., 1, 2, 3...).',
  validation: Rule => Rule.integer().positive().warning('Order should be a positive number.')
  },
      {
    name: 'isFeatured',
    title: 'Featured (Has Details Page)',
    type: 'boolean',
    description: 'Turn this ON to make the job clickable with a "View Details" button. Featured jobs will appear at the top of the list.',
    initialValue: false,
  },
    {
        name: 'slug',
        title: 'Slug (URL)',
        type: 'slug',
        description: 'A unique URL identifier for this job. Click "Generate".',
        options: {
        source: 'title', 
        maxLength: 96,
        },
    },
    {
      name: 'avatar',
      title: 'Company Avatar or Logo',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Short Description (for listing card)',
      type: 'text',
      description: 'A brief 1-2 sentence summary for the main jobs page.',
    },
    {
      name: 'level',
      title: 'Job Level',
      type: 'string',
      options: {
        list: ['Officer', 'Manager', 'Intern', 'Senior Level', 'Executive','Any Level'],
      },
    },

    {
  name: 'employmentType',
  title: 'Employment Type',
  type: 'string',
  description: 'e.g., Full-Time, Part-Time, Contract',
  options: {
    list: [
      { title: 'Full-Time', value: 'full-time' },
      { title: 'Part-Time', value: 'part-time' },
      { title: 'Contract', value: 'contract' },
      { title: 'Internship', value: 'internship' },
    ],
    layout: 'radio' 
  }
},
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'posted_ago', 
      title: 'Date Posted',
      type: 'date',
    },
    {
      name: 'summaryTitle',
      title: 'Summary Section Title',
      type: 'string',
      initialValue: 'Job Summary'
    },
    {
      name: 'titleTwo',
      title: 'Full Job Title (for details page)',
      type: 'string',
      description: 'The title that appears at the top of the job details page.'
    },
    {
        name: 'summary',
        title: 'Full Job Summary',
        type: 'text',
        description: 'The main summary paragraph for the details page.'
    },
    {
        name: 'detailsTitle',
        title: 'Job Details Section Title',
        type: 'string',
        initialValue: 'Job Details'
    },
    // This is how we handle your nested 'details' array
    {
      name: 'details',
      title: 'Job Detail Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'section', title: 'Section Title', type: 'string' },
            {
              name: 'responsibilities',
              title: 'Responsibilities',
              type: 'array',
              of: [{ type: 'string' }], // An array of strings
            },
          ],
        },
      ],
    },
    {
        name: 'requirementsTitle',
        title: 'Requirements Section Title',
        type: 'string',
        initialValue: 'Requirements'
    },
    {
        name: 'requirementDetails',
        title: 'List of Requirements',
        type: 'array',
        of: [{type: 'string'}]
    },
    {
        name: 'benefitTitle',
        title: 'Benefits Section Title',
        type: 'string',
        initialValue: 'Benefits'
    },
    {
        name: 'benefitDetails',
        title: 'List of Benefits',
        type: 'array',
        of: [{type: 'string'}]
    },
    // And here's the applyContent object
    {
        name: 'applyContent',
        title: 'Application Form Content',
        type: 'object',
        fields: [
            { name: 'intro', title: 'Intro Paragraphs', type: 'array', of: [{type: 'string'}]},
            { name: 'notesTitle', title: 'Notes Title', type: 'string' },
            { name: 'notes', title: 'List of Notes', type: 'array', of: [{type: 'string'}]},
            { name: 'outro', title: 'Outro Paragraphs', type: 'array', of: [{type: 'string'}]},
        ]
    }
  ],
};