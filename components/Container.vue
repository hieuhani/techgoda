<template>
  <div :class="cn('mx-auto max-w-7xl px-2 sm:px-6 lg:px-8', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
  }>(),
  {}
);
</script>
