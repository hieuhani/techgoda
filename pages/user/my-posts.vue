<template>
  <Container v-if="$currentUser" class="mt-2">
    <div class="bg-white rounded-lg px-4 py-4 space-y-3">
      <div v-for="(value, key) in postsByMetaSchemaId">
        <h3 class="text-primary uppercase text-sm font-medium">
          {{ key || "No schema" }}
        </h3>
        <PostRow v-for="post in value" :post="post" :key="post.id" />
      </div>
    </div>
  </Container>
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
      const { metaSchema = "" } = current;
      return {
        ...prev,
        [metaSchema]: [...(prev[metaSchema] || []), current],
      };
    },
    {}
  )
);
</script>
