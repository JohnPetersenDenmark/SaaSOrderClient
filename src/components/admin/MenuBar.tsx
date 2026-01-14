import { Editor, type Content, } from "@tiptap/react";
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


type MenuBarProps = {
  editor: Editor
};

/* const fonts = [
  { name: "Arial", value: "Arial" },
  { name: "Serif", value: "Georgia" },
  { name: 'Roboto', value: 'Roboto' }
]; */

const iconButtonSize = 30;
const sizes = ["12px", "14px", "16px", "20px", "24px", "28px", "32px", "36px"];

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [isIconPickerOpen, setIconPickerOpen] = useState(false);

  const [svgTagFound, setSvgTagFound] = useState(false);

  const [fontSelectOpen, setFontSelectOpen] = useState(false);

  const [lineHeightSelectOpen, setLineHeightSelectOpen] = useState(false);

  const [fontSizeSelectOpen, setFontSizeSelectOpen] = useState(false);






  const increaseIndent = (editor: any) => {
    if (!editor) return

    const current = editor.getAttributes('paragraph').indent ?? 0

    editor
      .chain()
      .updateAttributes('paragraph', { indent: current + 1 })
      .focus()
      .run()
  }

  const decreaseIndent = (editor: any) => {
    if (!editor) return

    const current = editor.getAttributes('paragraph').indent ?? 0

    editor
      .chain()
      .updateAttributes('paragraph', { indent: Math.max(0, current - 1) })
      .focus()
      .run()
  }

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

  function setLineHeight(lineHeight: string) {
    editor.chain().focus().setNode('paragraph', { lineHeight: lineHeight }).run()
  }

  function toggleFontTypeSelectionOpen() {
    fontSelectOpen ? setFontSelectOpen(false) : setFontSelectOpen(true)
  }

  function toggleFontLineHeightSelectionOpen() {
    lineHeightSelectOpen ? setLineHeightSelectOpen(false) : setLineHeightSelectOpen(true)
  }

  function toggleFontFontSizeSelectionOpen() {
    fontSizeSelectOpen ? setFontSizeSelectOpen(false) : setFontSizeSelectOpen(true)
  }



  function setFont(fontValue: any) {
    setIsOpen(false);
    //let myFontType : string = font.value;
    editor?.chain().focus().setFontFamily(fontValue).run()
    // editor?.chain().focus().setFontFamily("Roboto").run()
    return;
  }

  function onSelectedHTMLbit(userSelectedHTMLbit: htmlBit | null) {
    setIsOpen(false);

    if (userSelectedHTMLbit) {
      findHtmlSnippetHTMLtag(userSelectedHTMLbit.html, editor)
    }



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

      <button onClick={() => increaseIndent(editor)}>
        <img src="/images/IndentLeft.svg" alt="Logo" height={iconButtonSize} width={iconButtonSize} />
      </button>

      <button onClick={() => decreaseIndent(editor)}>
        <img src="/images/outdentLeft.svg" alt="Logo" height={iconButtonSize} width={iconButtonSize} />
      </button>

      <Divider />

      {/* Ordered list */}
      <IconButton
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={iconButtonSize} />
      </IconButton>

      <Divider />

      {/* <select onChange={(e) => editor.commands.setRating(Number(e.target.value))}>
        <option value="1">1 ★</option>
        <option value="2">2 ★★</option>
        <option value="3">3 ★★★</option>
        <option value="4">4 ★★★★</option>
        <option value="5">5 ★★★★★</option>
      </select> */}

      <button
        type="button"
        onClick={() => setIconPickerOpen(true)}
      >
        <img src="/images/Icons.svg" alt="Logo" height={iconButtonSize} width={iconButtonSize} />
      </button>

      {isIconPickerOpen && <UnicodeIconPicker
        editor={editor}
        onClose={() => setIconPickerOpen(false)}
      />
      }
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

      <div onClick={toggleFontTypeSelectionOpen}>
        <FileTypeCorner size={iconButtonSize} />
      </div>

      {fontSelectOpen ? <select onChange={(e) => setFont(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Roboto">Roboto</option>
      </select> : ''}



      <Divider />

      <div onClick={toggleFontLineHeightSelectionOpen}>
        <img src="/images/LineHeight.svg" alt="Logo" height={iconButtonSize} width={iconButtonSize} />
      </div>

      {lineHeightSelectOpen ? <select onChange={(e) => setLineHeight(e.target.value)}>
        <option value="1.0">1.0</option>
        <option value="1.5">1.5</option>
        <option value="2.0">2.0</option>
        <option value="3.0">3.0</option>
        <option value="4.0">4.0</option>
      </select> : ''}


      <Divider />

      <div onClick={toggleFontFontSizeSelectionOpen}>
        <img src="/images/FontSize.svg" alt="Logo" height={iconButtonSize} width={iconButtonSize} />
      </div>
      {fontSizeSelectOpen ?
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
        </select> : ''}

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

  const svgNodes = container.querySelectorAll('svg')
  svgNodes.forEach(svg => {

    editor.chain().focus().insertContent([
      {
        type: 'svgicon',
        attrs: { svg: svg.outerHTML },
      },
      {
        type: 'text',
        text: ' ',        // space → caret anchor
      },
    ]).run()

    svg.remove
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


