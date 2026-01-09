import { Node, mergeAttributes } from '@tiptap/core'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        rating: {
            setRating: (value: number) => ReturnType
        }
    }
}


export const Rating = Node.create({
    name: 'rating',

    group: 'inline',
    inline: true,
    atom: false,

    addAttributes() {
        return {
            value: {
                default: 0,
                parseHTML: el => Number(el.getAttribute('data-value') || 0),
            },
            max: {
                default: 5,
                parseHTML: el => Number(el.getAttribute('data-max') || 5),
            },
        }
    },

    parseHTML() {
        return [
            { tag: 'span[data-rating]' },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        const value = HTMLAttributes['data-value'] || 0
        const max = HTMLAttributes['data-max'] || 5

        // Build stars string
        const stars =
            '★'.repeat(value) + '☆'.repeat(max - value)

        return [
            'span',
            mergeAttributes(HTMLAttributes, {
                'data-rating': '',
                'data-value': value.toString(),
                'data-max': max.toString(),
                class: 'text-yellow-500 cursor-pointer select-none',
                contenteditable: 'true',
            }),
            stars,
        ]
    },

    addCommands() {
        return {           
            setRating:
                (value: number) =>
                    ({ tr, state, dispatch }) => {
                        const { selection } = state
                        const pos = selection.from
                        const node = state.doc.nodeAt(pos)

                        if (!node || node.type.name !== 'rating') return false

                        const stars =  '★★★★★'
                                .split('')
                                .map((s, i) => (i < value ? '★' : '☆'))
                                .join('')

                        // update attrs
                        tr.setNodeMarkup(pos, undefined, {
                            ...node.attrs,
                            value,
                        })

                        // replace content inside node
                        tr.replaceWith(
                            pos + 1,
                            pos + 1 + node.content.size,
                            state.schema.text(stars)
                        )
                        dispatch?.(tr)
                        return true
                    }
        }
    },
})
