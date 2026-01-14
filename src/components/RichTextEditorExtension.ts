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
import { Checkmark } from "./Checkmark";
import { RawHTML } from "./RawHTML";
import Image from '@tiptap/extension-image'
import { Rating } from "./Rating";
import { RatingUserSelection } from "./RatingUserSelection";
import { SvgIconTipTapExtension } from "./SvgIconTipTapExtension";
import { IndentableParagraph } from "./IndentableParagraph";


import ParagraphWithLineHeight from "./ParagraphWithLineHeight";

import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'

export const tiptapExtensions = [
  StarterKit.configure({
    bulletList: false,
    orderedList: false,
    paragraph: false,
  }),

  TextStyle, // ✅ named export
  FontFamily,
  TaskList,
  TaskItem,
  Checkmark,
  RawHTML,
  Rating,
  RatingUserSelection,
  SvgIconTipTapExtension,
  IndentableParagraph,
  Color,
  Image,
  FontSize,
  ParagraphWithLineHeight,
  BulletList,
  OrderedList,
  ListItem,

  Highlight.configure({ multicolor: true }),

  Placeholder.configure({
    placeholder: "Write something…",
  }),
];
