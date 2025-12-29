import {defineField, defineType} from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title (50-60 characters recommended). If not set, the main title will be used.',
      validation: (Rule) =>
        Rule.max(60).warning('Title should be under 60 characters for optimal display'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'SEO description (150-160 characters recommended). If not set, the excerpt will be used.',
      validation: (Rule) =>
        Rule.max(160).warning('Description should be under 160 characters for optimal display'),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Focus Keyword',
      type: 'string',
      description: 'Primary keyword this article targets for SEO',
    }),
    defineField({
      name: 'keywords',
      title: 'Additional Keywords',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Additional keywords or phrases for SEO (comma-separated)',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Custom image for social media sharing (1200x630px recommended). If not set, the main image will be used.',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility',
        },
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Override the canonical URL if this content is published elsewhere first',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'Prevent search engines from indexing this page',
      initialValue: false,
    }),
    defineField({
      name: 'ogType',
      title: 'Open Graph Type',
      type: 'string',
      description: 'Type of content for social media sharing',
      options: {
        list: [
          {title: 'Article', value: 'article'},
          {title: 'Website', value: 'website'},
          {title: 'Blog', value: 'blog'},
        ],
      },
      initialValue: 'article',
    }),
  ],
})
