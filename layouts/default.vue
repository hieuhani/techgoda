<template>
  <Header />
  <slot />
  <div class="h-16 lg:hidden" />
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Techgoda",
  ogTitle: "Techgoda",
  description: "Techgoda is a publishing platform for developers.",
  ogDescription: "Techgoda is a publishing platform for developers.",
});
</script>
