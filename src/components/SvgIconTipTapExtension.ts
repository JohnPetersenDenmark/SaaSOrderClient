import { Node, mergeAttributes } from '@tiptap/core'

export const SvgIconTipTapExtension = Node.create({
  name: 'icon',
  inline: true,
  group: 'inline',
  atom: false,

  addAttributes() {
    return {
      name: { default: 'star' },
      color: { default: '#000' },
      size: { default: 20 },
      path: { default: '' },
    }
  },

  renderHTML({ HTMLAttributes }) {
    const { name, color, size, path } = HTMLAttributes

    return [
      'span',
      mergeAttributes({ 'data-icon': name }),
      [
        'svg',
        { width: size, height: size, viewBox: '0 0 24 24' },
        ['path', { fill: color, d: path }]
      ],
    ]
  },

  parseHTML() {
    return [{ tag: 'span[data-icon]' }]
  },
})
