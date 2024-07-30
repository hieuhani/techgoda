<template>
  <Container>
    <FormManagePost v-if="$currentUser" :post="post" />
  </Container>
</template>

<script setup lang="ts">
import { useGetPost } from "~/lib/publiz";

const { $currentUser } = useNuxtApp();
const route = useRoute();
const idString = String(route.params.slug).split("-").pop();

const { data } = useGetPost(idString || "");
const post = computed(() => data.value?.data);
</script>
