<template>
  <div>
    <h3 v-if="title" class="font-medium mb-2 text-gray-800">
      {{ title }}
    </h3>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>
