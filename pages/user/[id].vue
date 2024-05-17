<template>
  <Container v-if="dataUser" class="mt-2">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 lg:col-span-9 space-y-4">
        <UserCard v-if="user" :user="user" />
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
      </div>
      <div class="col-span-3"></div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { decodeId } from "~/lib/id";
import {
  useGetSystemMetaSchemas,
  useGetUser,
  useGetUserPosts,
  type MetaSchema,
  type Post,
} from "~/lib/publiz";

const route = useRoute();
const idString = String(route.params.id);
const id = idString ? decodeId(idString) : 0;

const { data: dataUser } = useGetUser(id);
const user = computed(() => dataUser.value?.data);

const { data: dataUserPosts } = useGetUserPosts(id);

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
