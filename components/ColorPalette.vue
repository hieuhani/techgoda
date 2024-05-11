<template>
  <div class="grid grid-cols-6 gap-2">
    <button
      v-for="color in colors"
      :key="color"
      @click="modelValue = color"
      :style="{ backgroundColor: color }"
      class="w-full aspect-square rounded-full col-span-1"
    />
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  colors: string[];
  defaultValue?: string | null;
  modelValue?: string | null;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>
