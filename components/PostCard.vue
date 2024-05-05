<template>
  <NuxtLink :to="`/${slug}`" class="bg-white block px-4 py-4 rounded-lg">
    <h3 class="font-medium text-lg mb-1">{{ post.title }}</h3>
    <p class="text-sm text-gray-500 mb-2">{{ post.metadata?.excerpt }}</p>
    <div v-if="post.metadata?.featuredImage" class="mb-2">
      <img
        class="w-full h-full object-cover rounded-lg"
        :src="post.metadata?.featuredImage.src"
        alt="post image"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Post } from "~/lib/publiz";
import { slugify } from "~/lib/slugify";
import { encodeId } from "~/lib/id";

const props = defineProps<{ post: Post }>();
const slug = computed(
  () => `${slugify(props.post.title.toLowerCase())}-${encodeId(props.post.id)}`
);
</script>
