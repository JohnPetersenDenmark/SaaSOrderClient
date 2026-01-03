import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from '@tiptap/extension-font-family'
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { FontSize } from "@tiptap/extension-text-style";

export const tiptapExtensions = [
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
  }),

  TextStyle, // ✅ named export
  FontFamily,
  Color,
  FontSize,
  BulletList,
  OrderedList,
  ListItem,

  Highlight.configure({ multicolor: true }),

  Placeholder.configure({
    placeholder: "Write something…",
  }),
];
