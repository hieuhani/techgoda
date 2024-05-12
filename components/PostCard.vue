<template>
  <div class="bg-white px-4 py-4 rounded-lg">
    <div class="flex items-center mb-3">
      <Avatar class="h-10 w-10 text-md">
        <AvatarImage
          :src="
            post.author?.metadata?.avatar?.src
              ? post.author.metadata.avatar.src
              : '/hi.webp'
          "
          alt=""
        />
      </Avatar>
      <div class="ml-2">
        <h3 class="leading-none">
          {{ post.author?.displayName || "Anonymous" }}
        </h3>
        <time class="text-xs text-gray-600 leading-none">
          {{ $dayjs(post.createdAt).fromNow() }}
        </time>
      </div>
    </div>
    <NuxtLink :to="`/thread/${slug}`" class="block">
      <h3 class="font-medium text-lg mb-1">{{ post.title }}</h3>
      <p class="text-sm text-gray-500 mb-2">{{ post.metadata?.excerpt }}</p>
      <div v-if="post.metadata?.featuredImage" class="mb-2">
        <img
          class="w-full h-full object-cover rounded-lg"
          :src="getGoogleImage(post.metadata?.featuredImage.src, 'w1000')"
          alt="post image"
        />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Post } from "~/lib/publiz";
import { slugify } from "~/lib/slugify";
import { encodeId } from "~/lib/id";
import { getGoogleImage } from "@/lib/google-image";

const props = defineProps<{ post: Post }>();
const slug = computed(
  () => `${slugify(props.post.title.toLowerCase())}-${encodeId(props.post.id)}`
);
</script>
