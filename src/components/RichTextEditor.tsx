import { useEditor, EditorContent } from "@tiptap/react";

import { tiptapExtensions } from "./RichTextEditorExtension";


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
    extensions: tiptapExtensions,
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
