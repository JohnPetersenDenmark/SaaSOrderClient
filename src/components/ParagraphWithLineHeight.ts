import { Paragraph } from '@tiptap/extension-paragraph'

 const ParagraphWithLineHeight = Paragraph.extend({
  addAttributes() {
    return {
      lineHeight: {
        default: null,
        renderHTML: attributes => {
          if (!attributes.lineHeight) return {}
          return {
            style: `line-height: ${attributes.lineHeight}`,
          }
        },
        parseHTML: element => element.style.lineHeight || null,
      },
    }
  },
})

export default ParagraphWithLineHeight