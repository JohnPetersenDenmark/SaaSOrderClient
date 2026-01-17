import { Paragraph } from '@tiptap/extension-paragraph'
import { mergeAttributes } from '@tiptap/core'

const ParagraphWithLineHeightAndIndent = Paragraph.extend({
    addAttributes() {
        return {
            indent: {
                default: null,
                parseHTML: element =>
                    element.style.marginInline
                        ? parseInt(element.style.marginInline)
                        : null,
            },

            lineHeight: {
                default: null,
                parseHTML: element => element.style.lineHeight || null,
            },
        }
    },

    renderHTML({ HTMLAttributes }) {
        const styles: string[] = []

        if (HTMLAttributes.indent) {
            styles.push(`margin-inline: ${HTMLAttributes.indent}px`)
            delete HTMLAttributes.indent
        }

        if (HTMLAttributes.lineHeight) {
            styles.push(`line-height: ${HTMLAttributes.lineHeight}`)
            delete HTMLAttributes.lineHeight
        }

        if (styles.length) {
            HTMLAttributes.style = styles.join('; ')
        }

        return ['p', HTMLAttributes, 0]
    },
})

export default ParagraphWithLineHeightAndIndent
