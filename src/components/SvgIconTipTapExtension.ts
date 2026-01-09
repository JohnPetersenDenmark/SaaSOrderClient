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
    }
  },

  parseHTML() {
    return [
      { tag: 'svg' },
    ]
  },

  renderHTML({ node }) {
    // node.attrs.svg already contains full <svg>…</svg>
    return {
      dom: (() => {
        const wrapper = document.createElement('span')
        wrapper.innerHTML = node.attrs.svg
        return wrapper.firstElementChild as HTMLElement
      })(),
    }
  },
})
