<template>
  <ClientOnly>
    <div v-if="$currentUser">
      <ModerationPosts />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const { $currentUser } = useNuxtApp();
</script>
