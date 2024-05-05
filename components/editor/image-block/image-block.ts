import { Node } from "@tiptap/core";
import { VueNodeViewRenderer, mergeAttributes } from "@tiptap/vue-3";
import Component from "./Component.vue";

export interface ImageUploadOptions {
  name: string;
  isolating: boolean;
  defining: boolean;
  group: string;
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageBlock: {
      setImageBlock: (options: {
        src: string;
        alt?: string;
        fileName?: string;
        fileSize?: string;
      }) => ReturnType;
      updateImageBlock: (options: {
        width?: string;
        height?: string;
        blurHash?: string;
        alt?: string;
      }) => ReturnType;
    };
  }
}

export default Node.create<ImageUploadOptions>({
  name: "imageBlock",
  isolating: true,
  defining: true,
  group: "block",

  addAttributes() {
    return {
      src: {
        default: "",
        parseHTML(element) {
          return element.getAttribute("src");
        },
        renderHTML(attributes) {
          return {
            src: attributes.src,
          };
        },
      },
      width: {
        default: "",
        parseHTML(element) {
          return element.getAttribute("data-width");
        },
        renderHTML(attributes) {
          return {
            "data-width": attributes.width,
          };
        },
      },
      height: {
        default: "",
        parseHTML(element) {
          return element.getAttribute("data-height");
        },
        renderHTML(attributes) {
          return {
            "data-height": attributes.height,
          };
        },
      },
      blurHash: {
        default: "",
        parseHTML(element) {
          return element.getAttribute("data-blur-hash");
        },
        renderHTML(attributes) {
          return {
            "data-blur-hash": attributes.blurHash,
          };
        },
      },
      alt: {
        default: "",
        parseHTML(element) {
          return element.getAttribute("alt");
        },
        renderHTML(attributes) {
          return {
            alt: attributes.alt,
          };
        },
      },
      fileName: {
        default: "",
        parseHTML(element) {
          return element.getAttribute("data-file-name");
        },
        renderHTML(attributes) {
          return {
            "data-file-name": attributes.fileName,
          };
        },
      },
      fileSize: {
        default: "",
        parseHTML(element) {
          return element.getAttribute("data-file-size");
        },
        renderHTML(attributes) {
          return {
            "data-file-size": attributes.fileSize,
          };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "img[src]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addCommands() {
    return {
      setImageBlock:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              src: options.src,
              fileName: options.fileName,
              fileSize: options.fileSize,
              alt: options.alt || "",
            },
          });
        },

      updateImageBlock:
        (options) =>
        ({ commands }) => {
          return commands.updateAttributes(this.name, options);
        },
    };
  },
  addNodeView() {
    return VueNodeViewRenderer(Component);
  },
});
