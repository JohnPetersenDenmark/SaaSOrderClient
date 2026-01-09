import { Node, mergeAttributes } from '@tiptap/core'

export const Checkmark = Node.create({
  name: 'checkmark',

  inline: true,
  group: 'inline',
  atom: true,

  addAttributes() {
    return {
      checked: {
        default: false,
        parseHTML: element =>
          element.getAttribute('data-checked') === 'true',
        renderHTML: attrs => ({
          'data-checked': attrs.checked ? 'true' : 'false',
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-checkmark]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    const checked = HTMLAttributes['data-checked'] === 'true'

    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-checkmark': '',
        class: checked
          ? 'text-green-600 font-bold'
          : 'text-hoverMenuActionsColor font-bold',
      }),
      checked ? '✔' : '✖',
    ]
  },
})
