import { Paragraph } from '@tiptap/extension-paragraph'

export const IndentableParagraph = Paragraph.extend({
  addAttributes() {
    return {
      indent: {
        default: 0,
        parseHTML: el => Number(el.getAttribute('data-indent') ?? 0),
        renderHTML: attrs => {
          if (!attrs.indent) return {}
          return {
            'data-indent': attrs.indent,
          }
        },
      },
    }
  },
})
