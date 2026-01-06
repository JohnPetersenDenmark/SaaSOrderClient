import { Editor, } from "@tiptap/react";
import { generateJSON } from "@tiptap/react";
import { ModalSelectHTMLbits } from "./ModalSelectHTMLbits";
import { useState } from "react";
import type { htmlBit } from "./ModalSelectHTMLbits";

import { tiptapExtensions } from "../RichTextEditorExtension";
import {  FileCodeCorner, FileTypeCorner, ALargeSmall } from "lucide-react";

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

type MenuBarProps = {
  editor: Editor | null;
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

  function onSelectedHTMLbit(selectedHTMLbitA: htmlBit) {
    setIsOpen(false);
   // let htmlWithCheckBox = htmlToTaskList(selectedHTMLbitA.html)
    let AhtmlToCheckmark = htmlToCheckmark(selectedHTMLbitA.html)
    const parsedContent = generateJSON(AhtmlToCheckmark, tiptapExtensions)    
    editor?.chain().focus().setTextSelection(editor.state.selection).insertContent(parsedContent).run()
    return;
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

  function htmlToTaskList(html: string) {
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
}

function htmlToCheckmark(html: string) {
  const container = document.createElement('div')
  container.innerHTML = html

  return Array.from(
    container.querySelectorAll('input[type="checkbox"]')
  )
    .map(el => {
      if (!(el instanceof HTMLInputElement)) return ''
      return `<span data-checkmark data-checked="${
        el.checked ? 'true' : 'false'
      }"></span>`
    })
    .join(' ')
}

