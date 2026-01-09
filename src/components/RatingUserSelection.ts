import { Node } from '@tiptap/core'

export const RatingUserSelection = Node.create({
  name: 'rating',
  inline: true,
  group: 'inline',
  atom: false,

  addAttributes() {
    return {
      value: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-rating]',
      },
    ]
  },

  renderHTML({ node }) {
    const value = Number(node.attrs.value) || 0
    const stars = '★'.repeat(value) + '☆'.repeat(5 - value)

    return [
      'span',
      { 'data-rating': value },
      stars,
    ]
  },

  addCommands() {
    return {
      setRating:
        (value: number) =>
        ({ tr, state, dispatch }) => {
          const { selection } = state
          const node = state.doc.nodeAt(selection.from)

          // update existing rating node
          if (node && node.type.name === 'rating') {
            dispatch?.(
              tr.setNodeMarkup(selection.from, undefined, {
                ...node.attrs,
                value,
              }),
            )
            return true
          }

          // otherwise insert new one
          dispatch?.(
            tr.insertText('', selection.from, selection.to),
          )

          dispatch?.(
            tr.insert(
              selection.from,
              state.schema.nodes.rating.create({ value }),
            ),
          )

          return true
        }
    }
  },
})
