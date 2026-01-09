import React, { useState } from 'react'

import { UNICODE_ICON_GROUPS } from './UnicodeIcons'

export function UnicodeIconPicker({
  editor,
  onClose,
}: {
  editor: any
  onClose: () => void
}) {
  const [currentCategory, setCurrentCategory] = useState(Object.keys(UNICODE_ICON_GROUPS)[0])

  const handlePick = (symbol: string) => {
    editor.chain().focus().insertContent(symbol).run()
    onClose()
  }

  // @ts-ignore
  const filteredIcons : string[] = UNICODE_ICON_GROUPS[currentCategory] ?? []

  return (
    <div
      style={{
        position: 'absolute',
        top: '40px',
        right: '0',
        zIndex: 100,
        background: 'white',
        border: '1px solid #ddd',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 8px 30px rgba(0,0,0,.1)',
        display: 'flex',
        gap: '12px',
      }}
    >
      {/* Categories */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {Object.keys(UNICODE_ICON_GROUPS).map(cat => (
          <button
            key={cat}
            onClick={() => setCurrentCategory(cat)}
            style={{
              padding: '4px 8px',
              fontWeight: currentCategory === cat ? 'bold' : 'normal',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Icons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: '8px',
          fontSize: '22px',
          minWidth: '200px',
        }}
      >
         
        {filteredIcons.map(symbol => (
          <button
            key={symbol}
            onClick={() => handlePick(symbol)}
            style={{
              fontSize: '22px',
              padding: '6px',
            }}
          >
            {symbol}
          </button>
        ))}
      </div>
    </div>
  )
}
