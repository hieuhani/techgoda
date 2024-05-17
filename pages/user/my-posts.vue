<template>
  <ClientOnly>
    <Container v-if="$currentUser" class="mt-2">
      <div class="bg-white rounded-lg px-4 py-4 space-y-3">
        <div>
          <h3 class="text-primary uppercase text-sm font-medium">Posts</h3>
          <PostRow v-for="post in posts" :post="post" :key="post.id" />
        </div>
        <div>
          <h3 class="text-primary uppercase text-sm font-medium">Devfeeds</h3>
          <PostRow v-for="post in devfeedPosts" :post="post" :key="post.id" />
        </div>
      </div>
    </Container>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  useGetSystemMetaSchemas,
  useGetMyPosts,
  type MetaSchema,
  type Post,
} from "~/lib/publiz";

const { $currentUser } = useNuxtApp();
const { data: dataUserPosts } = useGetMyPosts();

const { data: dataSystemMetaSchemas } = useGetSystemMetaSchemas();

const systemMetaSchemaMap = computed(() =>
  (dataSystemMetaSchemas.value?.data || ([] as const)).reduce<
    Record<string, MetaSchema>
  >(
    (prev, current) => ({
      ...prev,
      [current.name]: current,
    }),
    {}
  )
);

const postsByMetaSchemaId = computed(() =>
  (dataUserPosts.value?.data || ([] as const)).reduce<Record<string, Post[]>>(
    (prev, current) => {
      const { metaSchemaId = 0 } = current.metadata;
      return {
        ...prev,
        [metaSchemaId]: [...(prev[metaSchemaId] || []), current],
      };
    },
    {}
  )
);

const posts = computed(() => {
  if (!systemMetaSchemaMap.value.post?.id) return [];
  return postsByMetaSchemaId.value[systemMetaSchemaMap.value.post?.id] || [];
});

const devfeedPosts = computed(() => {
  if (!systemMetaSchemaMap.value.devfeed?.id) return [];
  return postsByMetaSchemaId.value[systemMetaSchemaMap.value.devfeed?.id] || [];
});
</script>
