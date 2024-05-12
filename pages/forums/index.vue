<template>
  <Container class="lg:flex lg:space-x-3 pt-3">
    <CommunityTags />
    <div class="flex-1 space-y-4">
      <PostCard v-for="post in posts" :post="post" :key="post.id" />
    </div>
    <div class="w-80"></div>
  </Container>
</template>

<script setup lang="ts">
import { useGetTaxonomyPosts } from "~/lib/publiz";

const filter = ref({
  pageSize: 80,
  before: "",
  after: "",
});

const { data: dataPosts } = useGetTaxonomyPosts("community", filter);

const posts = computed(() => dataPosts?.value?.data || []);
</script>
