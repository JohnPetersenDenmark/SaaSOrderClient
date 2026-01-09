import { Node } from '@tiptap/core'

export const RawHTML = Node.create({
  name: 'rawHTML',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      html: { default: '' },
    }
  },

  parseHTML() {
    return [{ tag: 'div[data-raw-html]' }]
  },

  renderHTML({ node }) {
    return ['div', { 'data-raw-html': '', style: 'color: gray; font-style: italic;' }, node.attrs.html]
  },
})