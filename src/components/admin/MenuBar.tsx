import { Editor } from "@tiptap/react";
import { ModalSelectHTMLbits } from "./ModalSelectHTMLbits";
import { useState } from "react";
import type { htmlBit } from "./ModalSelectHTMLbits";

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
  { name: "Mono", value: "Courier New" },
];

const iconButtonSize = 30;
const sizes = ["12px", "14px", "16px", "20px", "24px"];

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  const [selectedHTMLbit, setSelectedHTMLbit] = useState<htmlBit | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const resetStyles = () => {
    editor.chain().focus()
      .unsetAllMarks()
      .clearNodes()
      .run();
  };

  function onClose() {
    setSelectedHTMLbit(null);
    setIsOpen(false);
    return;
  }

 
  function onSelectedHTMLbit(selectedHTMLbitA: htmlBit) {
    setSelectedHTMLbit(selectedHTMLbitA);   
    setIsOpen(false);
    return;
  }

  function insertHTMLclick(editor: Editor) {   
    setIsOpen(true);
  }

  /* let htmlBitArray: htmlBit[] = [];

  let htmlbit: htmlBit = {
    name: "ball",
    html: `
            <div class="box">
            <p class="bg-red">Hello from HTML</p>
            <p><strong>Bold</strong> and <em>italic</em></p>
            </div>
          `
  }

  htmlBitArray.push(htmlbit);
  htmlbit = {
    name: "face",
    html: `
            <div class="box">
            <p class="bg-red">Hello from HTML</p>
            <p><strong>Bold</strong> and <em>italic</em></p>
            </div>
          `
  }

  htmlBitArray.push(htmlbit); */


  return (
    <div className="flex flex-wrap items-center gap-1 border-b pb-1 mb-2">

      {/* Bold */}
      <IconButton
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={iconButtonSize} />
      </IconButton>

      {/* Italic */}
      <IconButton
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={iconButtonSize} />
      </IconButton>

      {/* Bullet list */}
      <IconButton
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={iconButtonSize} />
      </IconButton>

      {/* Ordered list */}
      {/*   <IconButton
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={iconButtonSize} />
      </IconButton> */}

      <button
        type="button"
        onClick={() => insertHTMLclick(editor)}
      >
        Insert HTML Box
      </button>

      {isOpen && <ModalSelectHTMLbits open={true} onClose={onClose} onhandleSelected={onSelectedHTMLbit}  />}

      {selectedHTMLbit && editor.chain().focus().insertContent(selectedHTMLbit.html).run()}



      <Divider />

      {/* Font family */}
      {fonts.map(font => (
        <IconButton
          key={font.value}
          onClick={() =>
            editor.chain().focus().setMark("textStyle", {
              fontFamily: font.value,
            }).run()
          }
          title={font.name}
        >
          <Type size={iconButtonSize} />
        </IconButton>
      ))}

      {/* Font size */}
      {sizes.map(size => (
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
      ))}

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
  <span className="mx-1 h-4 w-px bg-gray-300" />
);
