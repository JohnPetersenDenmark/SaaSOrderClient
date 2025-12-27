import { useEditor, EditorContent } from "@tiptap/react";

import Document from '@tiptap/extension-document'
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import { FontSize } from "@tiptap/extension-text-style";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { useEffect } from "react";

import { MenuBar } from "./admin/MenuBar";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  readOnly?: boolean;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  readOnly = false,
}) => {

  const editor = useEditor({
    editable: !readOnly,
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
      }),
      Document,
      TextStyle,
      FontSize,
      Color,
      BulletList,
      OrderedList,
      ListItem,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({
        placeholder: "Write something…",
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();

    // Only update editor if value truly changed
    if (value !== current) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border rounded p-2 bg-white">
      {/* 👇 THIS is how you use MenuBar */}
      {!readOnly && <MenuBar editor={editor} />}

      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
