import { Node } from '@tiptap/core'

export const SvgIconTipTapExtension = Node.create({
  name: 'svgicon',
  inline: true,
  group: 'inline',
  atom: true,

  addAttributes() {
    return {
      svg: {
        default: '',
      },
      /*  width: {
         default: 24,
       },
       height: {
         default: 24,
       },
       viewBox: {
         default: '0 0 24 24',
       }, */
    }
  },

  parseHTML() {
    return [
      { tag: 'span[data-svgicon]' },
    ]
  },

  // IMPORTANT: must return a DOMSpec array 👇
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      {
        ...HTMLAttributes,
        'data-svgicon': 'true',
      },
    ]
  },

  // Live SVG rendering while editing
  addNodeView() {
    return ({ node }) => {
      const dom = document.createElement('span')
      dom.setAttribute('data-svgicon', 'true')
    //  dom.style.display = 'inline-block'
    //  dom.style.lineHeight = '200'
      
      dom.innerHTML = node.attrs.svg
      return { dom }
    }
  },
})
