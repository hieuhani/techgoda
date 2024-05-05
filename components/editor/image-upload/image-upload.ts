import { Node } from "@tiptap/core";
import { VueNodeViewRenderer } from "@tiptap/vue-3";
import ImageUploader from "./ImageUploader.vue";

export interface ImageUploadOptions {
  name: string;
  isolating: boolean;
  defining: boolean;
  group: string;
  draggable: boolean;
  selectable: boolean;
  inline: boolean;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    imageUpload: {
      setImageUpload: () => ReturnType;
    };
  }
}

export default Node.create<ImageUploadOptions>({
  name: "imageUploader",
  isolating: true,
  defining: true,
  group: "block",
  draggable: true,
  selectable: true,
  inline: false,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="'.concat(this.name, '"]'),
      },
    ];
  },
  renderHTML() {
    return [
      "div",
      {
        "data-type": this.name,
      },
    ];
  },
  addCommands() {
    return {
      setImageUpload:
        () =>
        ({ commands }) => {
          return commands.insertContent(
            '<div data-type="'.concat(this.name, '"></div>')
          );
        },
    };
  },
  addNodeView() {
    return VueNodeViewRenderer(ImageUploader);
  },
});
