<template>
  <NuxtLink :to="getPostPath(post)" :key="post.id" class="py-2 flex">
    <div class="w-16 h-16">
      <img
        v-if="post.metadata?.featuredImage"
        class="w-full h-full object-cover rounded-md"
        :src="post.metadata?.featuredImage.src"
        alt="post image"
      />
      <div v-else class="border-2 w-16 h-16 rounded border-dashed"></div>
    </div>
    <div class="ml-3 flex-1">
      <h3 class="text-lg font-medium">{{ post.title }}</h3>
      <p v-if="post.metadata?.excerpt">{{ post.metadata.excerpt }}</p>
      <time class="text-xs">
        {{ $dayjs(post.createdAt).fromNow() }}
      </time>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { type Post, getPostPath } from "~/lib/publiz";

defineProps<{ post: Post }>();
</script>
