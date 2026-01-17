import { Editor, type Content, } from "@tiptap/react";
import { ModalSelectHTMLbits } from "./ModalSelectHTMLbits";
import { useState } from "react";
import type { htmlBit } from "./ModalSelectHTMLbits";
import { UnicodeIconPicker } from "../UnicodeIconPicker";
import { FileCodeCorner, FileTypeCorner, ALargeSmall } from "lucide-react";
import type { CommandProps } from '@tiptap/core'
import baseUrl from "../../config";

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

const fonts = [
  { label: "Arial", value: "Arial" },
  { label: "Serif", value: "Georgia" },
  { label: 'Roboto', value: 'Roboto' }
];

const lineHeightoptions = [
  { value: "1.0", label: "1.0" },
  { value: "1.5", label: "1.5" },
  { value: "2.0", label: "2.0" },
  { value: "2.5", label: "2.5" },
  { value: "3.0", label: "3.0" },
  { value: "4.0", label: "4.0" },
  { value: "5.0", label: "5.0" },
]

const iconButtonSize = 30;
const sizes = [
  { value: "8px", label: "8px" },
  { value: "10px", label: "10px" },
  { value: "11px", label: "11px" },
  { value: "12px", label: "12px" },
  { value: "14px", label: "14px" },
  { value: "16px", label: "16px" },
  { value: "18px", label: "18px" },
  { value: "20px", label: "20px" },
  { value: "24px", label: "24px" },
  { value: "28px", label: "28px" },
  { value: "32px", label: "32px" },
  { value: "36px", label: "36px" },

];

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

     editor.chain().focus().command( ({ state, tr }: CommandProps) => {
        const { from, to } = state.selection

        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'paragraph') {
            const indent = node.attrs.indent ?? 0

            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              indent: indent + 10,
            })
          }
        })

        return true
      }
    ).run()
  }

  const decreaseIndent = (editor: any) => {
    if (!editor) return

    editor.chain().focus().command( ({ state, tr }: CommandProps) => {
        const { from, to } = state.selection

        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'paragraph') {
            const indent = node.attrs.indent ?? 0

            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              indent: indent -10,
            })
          }
        })

        return true
      }
    ).run()
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

  function setLineHeight(selectedLineHeight: string) {
     editor.chain().focus().command( ({ state, tr }: CommandProps) => {
        const { from, to } = state.selection

        state.doc.nodesBetween(from, to, (node, pos) => {
          if (node.type.name === 'paragraph') {
            const lineHeight = node.attrs.lineHeight ?? 0

            tr.setNodeMarkup(pos, undefined, {
              ...node.attrs,
              lineHeight: selectedLineHeight
            })
          }
        })

        return true
      }
    ).run()
  }

  function setFontSize(fontSize: string) {

    editor?.chain().focus().setMark('textStyle', { fontSize: fontSize }).run()
  }

  function toggleFontTypeSelectionOpen() {
    fontSelectOpen ? setFontSelectOpen(false) : setFontSelectOpen(true)
  }

  function toggleFontLineHeightSelectionOpen() {
    lineHeightSelectOpen ? setLineHeightSelectOpen(false) : setLineHeightSelectOpen(true)
  }

  function toggleFontSizeSelectionOpen() {
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

      <button
        onClick={() => editor.chain().focus().toggleSubscript().run()}
        className={editor.isActive('subscript') ? 'active' : ''}
      >
         <img src='/images/subscript.svg' alt="Logo" height={iconButtonSize} width={iconButtonSize} />
      </button>
 <Divider />
      <button
        onClick={() => editor.chain().focus().toggleSuperscript().run()}
        className={editor.isActive('subscript') ? 'active' : ''}
      >
         <img src= '/images/superscript.svg'alt="Logo" height={iconButtonSize} width={iconButtonSize} />       
      </button>

 <Divider />
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

      {/*  {fontSelectOpen ? <select onChange={(e) => setFont(e.target.value)}>
        <option value="Arial">Arial</option>
        <option value="Georgia">Georgia</option>
        <option value="Roboto">Roboto</option>
      </select> : ''} */}


      {fontSelectOpen &&

        <div
          className="fixed top-[120px] left-[500px] 
         p-4 bg-primaryBackgroundColor text-primaryTextColor 
         max-h-[60vh] overflow-y-auto"
        >
          Linjehøjde
          <div className="p-4 bg-primaryBackgroundColor text-secondaryTextColor max-h-[60vh]  border-4 border-white overflow-y-auto">
            {fonts.map(option => (
              <div
                className="m-5 bg-thirdBackgroundColor  border-2 border-white overflow-y-auto  rounded-lg"
                key={option.value}
                onClick={() => {
                  setFont(option.value)
                  toggleFontTypeSelectionOpen()
                }}
                style={{
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>}

      <Divider />

      <div onClick={toggleFontLineHeightSelectionOpen}>
        <img src="/images/LineHeight.svg" alt="Logo" height={iconButtonSize} width={iconButtonSize} />
      </div>

      {lineHeightSelectOpen &&

        <div
          className="fixed top-[120px] left-[500px] 
         p-4 bg-primaryBackgroundColor text-primaryTextColor 
         max-h-[60vh] overflow-y-auto"
        >
          Linjehøjde
          <div className="p-4 bg-primaryBackgroundColor text-secondaryTextColor max-h-[60vh]  border-4 border-white overflow-y-auto">
            {lineHeightoptions.map(option => (
              <div
                className="m-5 bg-thirdBackgroundColor  border-2 border-white overflow-y-auto  rounded-lg"
                key={option.value}
                onClick={() => {
                  setLineHeight(option.value)
                  toggleFontLineHeightSelectionOpen()
                }}
                style={{
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>}


      <Divider />

      <div onClick={toggleFontSizeSelectionOpen}>
        <img
          src="/images/FontSize.svg"
          height={iconButtonSize}
          width={iconButtonSize}
          alt="Font-størrelse"
        />
      </div>

      {fontSizeSelectOpen &&
        <div
          className="fixed top-[120px] left-[100px] 
         p-4 bg-primaryBackgroundColor text-primaryTextColor"
        >
          font-størrelse
          <div className="p-4 bg-primaryBackgroundColor text-secondaryTextColor  border-4 border-white ">
            {sizes.map(option => (
              <div
                className="m-5 bg-thirdBackgroundColor  border-2 border-white  rounded-lg"
                key={option.value}
                onClick={() => {
                  setFontSize(option.value)
                  toggleFontSizeSelectionOpen()
                }}
                style={{
                  padding: "6px 10px",
                  cursor: "pointer",
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      }

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


