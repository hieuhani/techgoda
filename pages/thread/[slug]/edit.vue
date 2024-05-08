<template>
  <Container>
    <FormManagePost v-if="$currentUser" :post="post" />
  </Container>
</template>

<script setup lang="ts">
import { decodeId } from "~/lib/id";
import { useGetPost } from "~/lib/publiz";

const { $currentUser } = useNuxtApp();
const route = useRoute();
const idString = String(route.params.slug).split("-").pop();
const id = idString ? decodeId(idString) : 0;

const { data } = useGetPost(id);
const post = computed(() => data.value?.data);
</script>
