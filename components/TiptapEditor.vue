<template>
  <div class="relative flex-grow" v-if="editor">
    <text-bubble-menu :editor="editor" />

    <editor-content class="prose prose-slate" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { generateHTML } from "@tiptap/html";
import TextBubbleMenu from "./editor/bubble-menus/TextBubbleMenu.vue";
import { extensions } from "./editor/extensions";
import { browserFileTable } from "~/lib/browser-file-table";

const props = defineProps<{
  defaultValue?: object;
  modelValue?: object;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: object): void;
}>();

const pastedImages = new Set();
const editor = useEditor({
  content: generateHTML(
    props.modelValue ?? props.defaultValue ?? { type: "doc", content: [] },
    extensions
  ),
  autofocus: true,
  extensions,

  onUpdate: () => {
    const { from, to, attributes } =
      editor.value?.$doc.querySelector("image") || {};
    const { src, alt, title } = attributes || {};
    if (from !== 0 && from && to && pastedImages.has(src) === false) {
      pastedImages.add(src);
      const convertToImageBlock = async () => {
        if (src) {
          const imageBlockAttrs = await fetch(src)
            .then((res) => res.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              const fileName: string = src.split("/").pop() ?? "image.jpg";
              browserFileTable[url] = new File([blob], fileName, {
                type: blob.type,
              });
              return {
                src: url,
                fileName: browserFileTable[url].name,
                fileSize: browserFileTable[url].size.toString(),
                alt,
              };
            })
            .catch(() => undefined);
          if (imageBlockAttrs) {
            editor
              .value!!.chain()
              .deleteRange({ from: from - 1, to: to - 1 })
              .insertContentAt(from - 1, {
                type: "imageBlock",
                attrs: imageBlockAttrs,
              })
              .run();
          }
        }
      };
      convertToImageBlock();
    }

    emits("update:modelValue", editor.value?.getJSON() ?? {});
  },
});
</script>
