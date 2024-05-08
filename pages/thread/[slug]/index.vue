<template>
  <Container v-if="post" class="max-w-3xl bg-white mt-2 py-6 rounded-xl">
    <div>
      <h1 class="text-3xl font-medium text-gray-700 mb-4">
        {{ post.title }}
      </h1>
      <p class="mb-2">{{ post.metadata?.excerpt }}</p>

      <article class="prose" v-html="post.content" />
    </div>
  </Container>
</template>

<script setup lang="ts">
import { decodeId } from "~/lib/id";
import { useGetPost } from "~/lib/publiz";

const route = useRoute();
const idString = String(route.params.slug).split("-").pop();
const id = idString ? decodeId(idString) : 0;

const { data } = useGetPost(id);
const post = computed(() => data.value?.data);

useSeoMeta({
  title: post.value?.title || "Techgoda",
  ogTitle: post.value?.title || "Techgoda",
  description:
    post.value?.metadata?.excerpt ||
    "Techgoda is a publishing platform for developers.",
  ogDescription:
    post.value?.metadata?.excerpt ||
    "Techgoda is a publishing platform for developers.",
});
</script>
