<template>
  <div class="space-y-3">
    <NuxtLink
      v-for="post in devfeedPosts"
      :post="post"
      :key="post.id"
      :to="getPostPath(post)"
      class="bg-gray-100 rounded-lg px-3 py-3 flex"
    >
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
      <div class="ml-3">
        <h3>
          {{ post.title }}
        </h3>
        <time class="text-xs text-gray-600 leading-none">
          {{ $dayjs(post.createdAt).fromNow() }}
        </time>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useGetMetaSchemaPosts, getPostPath } from "~/lib/publiz";

const { data: dataDevFeedPosts } = useGetMetaSchemaPosts("devfeed:1", {
  pageSize: 32,
});

const devfeedPosts = computed(() => dataDevFeedPosts?.value?.data || []);
</script>
