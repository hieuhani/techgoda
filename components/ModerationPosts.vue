<template>
  <Container>
    <PostRow v-for="post in posts" :post="post" :key="post.id" />
  </Container>
</template>

<script setup lang="ts">
import { useGetModeratingPosts } from "~/lib/publiz";
const postsFilter = ref({
  pageSize: 80,
  before: "",
  after: "",
});
const { data } = useGetModeratingPosts(postsFilter);
const posts = computed(() => data.value?.data || []);
</script>
