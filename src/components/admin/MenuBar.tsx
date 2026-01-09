import { Editor, } from "@tiptap/react";
import { ModalSelectHTMLbits } from "./ModalSelectHTMLbits";
import { useState } from "react";
import type { htmlBit } from "./ModalSelectHTMLbits";
import { UnicodeIconPicker } from "../UnicodeIconPicker";


import { FileCodeCorner, FileTypeCorner, ALargeSmall } from "lucide-react";

import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Type,
  Palette,
  PaintBucket,
  RotateCcw,
} from "lucide-react";

type editorImageTag = {
  src: string,
  alt: string
}

const testSvgIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 36 36"><path fill="#C60C30" d="M32 5H15v11h21V9a4 4 0 0 0-4-4zM15 31h17c2.209 0 4-1.791 4-4.5V20H15v11zM0 20v6.5C0 29.209 1.791 31 4 31h7V20H0zM11 5H4a4 4 0 0 0-4 4v7h11V5z"></path><path fill="#EEE" d="M15 5h-4v11H0v4h11v11h4V20h21v-4H15z"></path></svg>`

type MenuBarProps = {
  editor: Editor
};

const fonts = [
  { name: "Arial", value: "Arial" },
  { name: "Serif", value: "Georgia" },
  { name: 'Roboto', value: 'Roboto' }
];

const iconButtonSize = 30;
const sizes = ["12px", "14px", "16px", "20px", "24px", "28px", "32px", "36px"];

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [isIconPickerOpen, setIconPickerOpen] = useState(false);

  const [count, setCount] = useState(0);

  const [isRangeSelected, setIsRangeSelected] = useState(false);

  const resetStyles = () => {
    editor.chain().focus()
      .unsetAllMarks()
      .clearNodes()
      .run();
  };

  function onClose() {
    setIsOpen(false);
    return;
  }

  function setFont(fontValue: any) {
    setIsOpen(false);
    //let myFontType : string = font.value;
    editor?.chain().focus().setFontFamily(fontValue).run()
    // editor?.chain().focus().setFontFamily("Roboto").run()
    return;
  }

  function onSelectedHTMLbit(userSelectedHTMLbit: htmlBit) {
    setIsOpen(false);

    findHtmlSnippetHTMLtag(userSelectedHTMLbit.html, editor)

    const tmpCount: number = count + 1
    setCount(tmpCount)
    return ("");
  }

  function insertHTMLclick(editor: Editor) {
    setIsOpen(true);
  }

  return (
    <div className="flex flex-wrap items-center gap-1 border-b pb-1 mb-2">

      {/* Bold */}
      <IconButton
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={iconButtonSize} />
      </IconButton>

      <Divider />

      {/* Italic */}
      <IconButton
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={iconButtonSize} />
      </IconButton>

      <Divider />

      {/* Bullet list */}
      <IconButton
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={iconButtonSize} />
      </IconButton>

      <Divider />

      {/* Ordered list */}
      <IconButton
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={iconButtonSize} />
      </IconButton>

      <Divider />

      {/*  <button onClick={() => editor.commands.setRating(4)}>
        Give 2 stars
      </button> */}

      {/*    {!isRangeSelected && <select
        onChange={e =>
          editor.commands.setRating(Number(e.target.value))
        }
      >
        <option value="1">★</option>
        <option value="2">★★</option>
        <option value="3">★★★</option>
        <option value="4">★★★★</option>
        <option value="5">★★★★★</option>
      </select>
      } */}

      <select onChange={(e) => editor.commands.setRating(Number(e.target.value))}>
        <option value="1">1 ★</option>
        <option value="2">2 ★★</option>
        <option value="3">3 ★★★</option>
        <option value="4">4 ★★★★</option>
        <option value="5">5 ★★★★★</option>
      </select>

      <button
        type="button"
        onClick={() => setIconPickerOpen(true)}
      >
        Ikoner
      </button>

      {isIconPickerOpen && <UnicodeIconPicker
        editor={editor}
        onClose={() => setIconPickerOpen(false)}
      />
      }

      {/* Insert HTML snippet */}
      <button
        type="button"
        onClick={() => insertHTMLclick(editor)}
      >
        <FileCodeCorner size={iconButtonSize} />
      </button>

      {isOpen && <ModalSelectHTMLbits open={true} onClose={onClose} onhandleSelected={onSelectedHTMLbit} />}

      <Divider />

      <FileTypeCorner size={iconButtonSize} />
      {/* Font family */}
      {fonts.map(font => (
        <IconButton
          key={font.value}
          onClick={() =>
            setFont(font.value)
          }
          title={font.name}
        >
          {font.name}
        </IconButton>
      ))}

      <Divider />

      {/* Font size */}
      {/*   <ALargeSmall  size={iconButtonSize} /> 
      {sizes.map(size => (
        <>
          
          <IconButton
            key={size}
            onClick={() =>
              editor.chain().focus().setMark("textStyle", {
                fontSize: size,
              }).run()
            }
            title={size}

          >
            <span className="text-4xl">{size.replace("px", "")}</span>
             
          </IconButton>
        </>
      ))} */}

      <ALargeSmall size={iconButtonSize} />
      <select
        className="rounded border px-1 text-sm"
        value={editor?.getAttributes('textStyle').fontSize ?? ''}
        onChange={e =>
          editor
            ?.chain()
            .focus()
            .setMark('textStyle', { fontSize: e.target.value })
            .run()
        }
      >
        <option value="">Size</option>

        {sizes.map(size => (
          <option key={size} value={size}>
            {size.replace('px', '')}
          </option>
        ))}
      </select>

      <Divider />

      {/* Text color */}
      <label className="cursor-pointer">
        <Palette size={iconButtonSize} />
        <input
          type="color"
          className="hidden"
          onChange={e =>
            editor.chain().focus().setColor(e.target.value).run()
          }
        />
      </label>

      <Divider />

      {/* Background color */}
      <label className="cursor-pointer">
        <PaintBucket size={iconButtonSize} />
        <input
          type="color"
          className="hidden"
          onChange={(e) => {
            editor
              .chain()
              .focus()
              .setMark("highlight", {
                color: e.target.value,
              })
              .run();
          }}
        />
      </label>

      <Divider />

      {/* Reset styles */}
      <IconButton onClick={resetStyles} title="Reset formatting">
        <RotateCcw size={iconButtonSize} />
      </IconButton>
    </div>
  );
};

/* ---------- Helpers ---------- */

type IconButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  title?: string;
};

const IconButton = ({ children, onClick, active, title }: IconButtonProps) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`p - 1 rounded hover: bg - gray - 200 ${active ? "bg-gray-300" : ""
      }`}
  >
    {children}
  </button>
);

const Divider = () => (
  <span className="mx-3 h-10 w-px bg-gray-300" />
);

/* function htmlToTaskList(html: string) {
  // Create a temporary DOM parser
  const container = document.createElement('div')
  container.innerHTML = html

  const ul = document.createElement('ul')
  ul.setAttribute('data-type', 'taskList')

  // Convert each input + label to a taskItem
  container.querySelectorAll('input[type="checkbox"]').forEach(input => {
    const li = document.createElement('li')
    li.setAttribute('data-type', 'taskItem')
    // li.setAttribute('data-checked', input.checked ? 'true' : 'false')
     li.setAttribute('data-checked', true ? 'true' : 'false')
    li.textContent = input.parentElement?.textContent?.trim() || ''
    ul.appendChild(li)
  })

  return ul.outerHTML
} */

/* function htmlToTaskList(html: string) {
const container = document.createElement('div')
container.innerHTML = html

const wrapper = document.createElement('div')

container.querySelectorAll('input[type="checkbox"]').forEach(el => {
 // container.querySelectorAll('input').forEach(el => {
  if (!(el instanceof HTMLInputElement)) return

  const span = document.createElement('span')
  span.setAttribute('data-checkbox', '')
  span.setAttribute('data-checked', el.checked ? 'true' : 'false')

  wrapper.appendChild(span)
  wrapper.appendChild(document.createTextNode(' '))
  wrapper.appendChild(
    document.createTextNode(el.parentElement?.textContent?.trim() || '')
  )
})

return wrapper.innerHTML
} */

function htmlToCheckmark(nodeList: NodeListOf<Element>, editor?: Editor) {

  const xy = Array.from(
    nodeList
  )
    .map(el => {
      if (!(el instanceof HTMLInputElement)) return ''
      return `<span data-checkmark data-checked="${el.checked ? 'true' : 'false'
        }"></span>`
    })
    .join(' ')


  //editor?.chain().focus().insertContent(xy).run()

  return (xy);
}

function htmlImageToEditorImage(imageNode: HTMLImageElement, editor?: Editor): any {

  let node: any;

  if (imageNode !== null) {


    if (imageNode.src !== null || imageNode.src !== undefined) {
      node = {
        src: imageNode.getAttribute('src'),
        alt: 'Example image',
      }
    }
  }

  // editor?.chain().focus().setImage(node).run()
  return node;
}

function findHtmlSnippetHTMLtag(html: string, editor: Editor) {
  const container = document.createElement('div')
  container.innerHTML = html

  const nodesToInsert: any[] = []

  // ✅ Supported: Images
  const imageNode = container.querySelector<HTMLImageElement>('img')
  if (imageNode) {
    nodesToInsert.push({
      type: 'image',
      attrs: {
        src: imageNode.src,
        alt: imageNode.alt || '',
      },
    })
    imageNode.remove() // remove from container to avoid double-processing
  }

  // ✅ Supported: Checkboxes → Checkmark nodes
  const checkBoxNodeList = container.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')
  checkBoxNodeList.forEach(input => {
    nodesToInsert.push({
      type: 'checkmark',
      attrs: { checked: input.checked },
    })
    input.remove()
  })

  const ratingNodes = container.querySelectorAll('[data-rating]')

  ratingNodes.forEach(el => {
    nodesToInsert.push({
      type: 'rating',
      attrs: {
        value: Number(el.getAttribute('data-value') || 0),
        max: Number(el.getAttribute('data-max') || 5)
      },
      //content: [{ type: 'text', text: el.textContent || '' }]
    })
    el.remove()
  })

  /* const iconSpans = container.querySelectorAll('span[data-icon]')
  iconSpans.forEach(span => {
    const svg = span.querySelector('svg')
    if (svg) {
      const pathEl = svg.querySelector('path')
      if (!pathEl) return

      nodesToInsert.push({
        type: 'icon',
        attrs: {
          name: span.getAttribute('data-icon') || '',
          color: '#000000',
          size: 20,
          path: pathEl.getAttribute('d') || '', // <-- important: get "d" attribute
        },
      })

      span.remove()
    }
  }) */

  const svgNodes = container.querySelectorAll('svg')

  svgNodes.forEach(svg => {
    // Store entire SVG markup as a string
    const svgMarkup = svg.outerHTML    
     nodesToInsert.push({
      type: 'svgicon',
      attrs: {   
        svg : svgMarkup
      },
    }) 

     // Remove the svg from the temporary container
    svg.remove()
   
  })

  // ✅ Supported: <mark> highlights
  container.querySelectorAll('mark').forEach(markEl => {
    nodesToInsert.push({
      type: 'highlight',
      attrs: { color: markEl.getAttribute('data-color') || 'yellow' },
      content: [{ type: 'text', text: markEl.textContent || '' }],
    })
    markEl.remove()
  })

  // ✅ Remaining unsupported content → wrap as rawHTML
  if (container.innerHTML.trim()) {
    nodesToInsert.push({
      type: 'RawHTML',
      attrs: { html: container.innerHTML },
    })
  }

  // ✅ Insert everything at once 
  if (nodesToInsert.length > 0) {
     editor?.chain().focus().insertContent(nodesToInsert).run()
     // editor?.chain().focus().insertContent(testSvgIcon).run()
    
  }


}


