<template>
  <div class="mb-3">
    <div v-if="modelValue">
      <h4 class="text-sm">Cover image</h4>
      <img
        :src="modelValue.src"
        :alt="modelValue.fileName"
        class="max-w-full border-1 rounded"
      />
    </div>
    <div
      v-else
      class="bg-gray-100 p-3 rounded text-center text-sm text-gray-500"
    >
      Add image to the post, then select one as cover image
    </div>
  </div>

  <h4 v-if="modelValue" class="text-sm">Images from this post</h4>
  <div class="columns-5 lg:columns-2 gap-1">
    <button
      v-for="image in contentImages"
      :key="image.src"
      class="break-inside-avoid mb-1 hover:opacity-80"
      title="Set as cover image"
      @click="modelValue = image"
      type="button"
    >
      <img
        :src="image.src"
        :alt="image.fileName"
        :class="[
          'h-auto max-w-full border-2 rounded',
          modelValue?.src === image.src
            ? 'border-green-500'
            : 'border-transparent',
        ]"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";
import type { ImageBlockAttrs } from "./FormManagePost/types";

const props = defineProps<{
  defaultValue?: ImageBlockAttrs["attrs"] | null;
  modelValue?: ImageBlockAttrs["attrs"] | null;
  class?: HTMLAttributes["class"];
  contentImages: ImageBlockAttrs["attrs"][];
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: ImageBlockAttrs["attrs"] | null): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>
