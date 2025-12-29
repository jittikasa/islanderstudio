import {StructureBuilder} from 'sanity/structure'
import {SEOPreview} from '../components/SEOPreview'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Blog Posts with SEO Preview
      S.listItem()
        .title('Blog Posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Blog Posts')
            .child((documentId) =>
              S.document()
                .documentId(documentId)
                .schemaType('post')
                .views([
                  S.view.form(),
                  S.view
                    .component(SEOPreview)
                    .title('SEO Preview')
                    .icon(() => '🔍'),
                ]),
            ),
        ),
      // Divider
      S.divider(),
      // Authors
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      // Categories
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .child(S.documentTypeList('category').title('Categories')),
    ])
