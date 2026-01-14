import { Node } from '@tiptap/core'

export const SvgIconTipTapExtension = Node.create({
  name: 'svgicon',

  inline: true,
  group: 'inline',
  atom: false,            // NOT atomic → caret can be before/after
  selectable: true,
 draggable : true,

  addAttributes() {
    return {
      svg: {
        default: null,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-svgicon]',
        getAttrs: el => ({
          svg: el.innerHTML,
        }),
      },
    ]
  },

  renderHTML({ node }) {
    //return `<span data-svgicon="true">${node.attrs.svg}</span>`

    
      const dom = document.createElement('span')
      dom.setAttribute('data-svgicon', 'true')
      dom.innerHTML = node.attrs.svg
      return { dom }
    
  },

  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('span')
      dom.setAttribute('data-svgicon', 'true')
      dom.innerHTML = node.attrs.svg
      return { dom }
    }
  },
})
