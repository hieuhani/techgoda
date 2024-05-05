<template>
  <node-view-wrapper>
    <canvas ref="canvasRef" class="hidden" />
    <img v-bind="markupAttrs" @load="onImageLoaded" />
  </node-view-wrapper>
</template>

<script setup lang="ts">
import BlurhashWorker from "@/assets/workers/blurhash?worker";

import { NodeViewWrapper, type NodeViewProps } from "@tiptap/vue-3";

const canvasRef = ref<HTMLCanvasElement | null>(null);

const props = defineProps<NodeViewProps>();
const worker = new BlurhashWorker();

onMounted(() => {
  worker.onmessage = (e: MessageEvent) => {
    if (e.data.type === "BLURHASH_ENCODED") {
      const blurHash = e.data.payload;
      props.editor?.commands.updateImageBlock({
        blurHash,
      });
    }
  };
});

onUnmounted(() => {
  worker.terminate();
});

const dataKey: Record<string, string> = {
  width: "data-width",
  height: "data-height",
  blurHash: "data-blur-hash",
  fileName: "data-file-name",
  fileSize: "data-file-size",
};

const markupAttrs = computed(() => {
  return Object.keys(props.node.attrs).reduce((acc, key) => {
    return {
      ...acc,
      [dataKey[key] || key]: props.node.attrs[key],
    };
  }, {});
});
const onImageLoaded = (e: any) => {
  const width = e.currentTarget.naturalWidth;
  const height = e.currentTarget.naturalHeight;
  if (canvasRef.value) {
    canvasRef.value.width = width;
    canvasRef.value.height = height;

    const context = canvasRef.value?.getContext("2d");
    context?.drawImage(e.currentTarget, 0, 0);

    const imgData = context?.getImageData(0, 0, width, height);

    if (imgData) {
      worker.postMessage({
        type: "BLURHASH_ENCODING",
        payload: {
          width,
          height,
          data: imgData.data,
        },
      });
    }

    props.editor?.commands.updateImageBlock({
      width,
      height,
    });
  } else {
    // do waiting for the canvasRef if it's null, but I'm not sure whether it's necessary so just logging for now
    console.error("canvasRef is null");
  }
};
</script>
