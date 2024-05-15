<template>
  <div></div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "tenant",
});
onMounted(() => {
  navigateTo("/manage/posts");
});
</script>
