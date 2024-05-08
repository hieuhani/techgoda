<template>
  <Header />
  <slot />
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Techgoda",
  ogTitle: "Techgoda",
  description: "Techgoda is a publishing platform for developers.",
  ogDescription: "Techgoda is a publishing platform for developers.",
});
</script>
