import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Youtube from "@tiptap/extension-youtube";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import Commands from "./slash-commands/commands.js";
import suggestion from "./slash-commands/suggestion.js";
import ImageUpload from "./image-upload/image-upload";
import ImageBlock from "./image-block/image-block";

export const extensions = [
  StarterKit,
  Placeholder.configure({
    includeChildren: true,
    placeholder: "Type / for commands",
  }),
  Commands.configure({
    suggestion,
  }),
  Youtube.configure({
    inline: false,
  }),
  Underline.configure({}),
  Link.configure({
    protocols: ["ftp", "mailto"],
    autolink: false,
    linkOnPaste: false,
  }),
  Image.configure({
    allowBase64: true,
  }),
  ImageUpload,
  ImageBlock,
  Color.configure({
    types: ["textStyle"],
  }),
];
