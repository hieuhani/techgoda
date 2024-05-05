<template>
  <Container>
    <FormManagePost v-if="$currentUser" />
  </Container>
</template>

<script setup lang="ts">
const { $currentUser } = useNuxtApp();
</script>
