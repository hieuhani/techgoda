<template>
  <Container v-if="post" class="max-w-3xl bg-white mt-2 py-6 rounded-xl">
    <div>
      <h1 class="text-3xl font-medium text-gray-700 mb-4">
        {{ post.title }}
      </h1>
      <p class="mb-2">{{ post.metadata?.excerpt }}</p>

      <article class="prose" v-html="post.content" />
    </div>
    <div
      v-if="isOwner"
      class="fixed bottom-0 left-0 right-0 bg-white shadow-md z-10 flex justify-end"
    >
      <NuxtLink
        :class="cn(buttonVariants({ variant: 'link' }), 'space-x-2 px-1')"
        :to="`/thread/${route.params.slug}/edit`"
      >
        <Pencil />
        <span>Edit</span>
      </NuxtLink>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { useGetPost } from "~/lib/publiz";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { Pencil } from "lucide-vue-next";

const route = useRoute();
const idString = String(route.params.slug).split("-").pop();
const { $currentUser } = useNuxtApp();

const { data } = useGetPost(idString || "");
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

const isOwner = computed(() => {
  return (
    !!$currentUser?.value?.id &&
    $currentUser?.value?.id === post.value?.authorId
  );
});
</script>
