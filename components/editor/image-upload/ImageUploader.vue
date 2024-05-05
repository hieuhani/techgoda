<template>
  <node-view-wrapper>
    <label
      for="selectFile"
      class="w-full min-h-28 border border-dashed flex items-center justify-center cursor-pointer rounded-md"
    >
      Chọn ảnh
    </label>
    <input
      id="selectFile"
      @change="onSelectFile"
      class="w-0 h-0 overflow-hidden opacity-0"
      accept=".jpg,.jpeg,.png,.webp,.gif"
      type="file"
    />
    <node-view-content />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import {
  NodeViewWrapper,
  NodeViewContent,
  type NodeViewProps,
} from "@tiptap/vue-3";
import { browserFileTable } from "~/lib/browser-file-table";

const props = defineProps<NodeViewProps>();
const onSelectFile = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file?.type.startsWith("image/")) {
    const url = URL.createObjectURL(file);
    browserFileTable[url] = file;
    onUpload(url, file.name, file.size);
  }
};

const onUpload = (src: string, fileName: string, fileSize: number) => {
  const pos = props.getPos();
  props.editor
    .chain()
    .setImageBlock({ src, fileName, fileSize: fileSize.toString() })
    .deleteRange({ from: pos, to: pos })
    .focus()
    .run();
};
</script>
