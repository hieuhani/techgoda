<template>
  <Container class="lg:flex lg:space-x-3 pt-3">
    <div class="lg:w-48">
      <ul
        class="-translate-x-1 flex flex-row lg:flex-col overflow-x-auto flex-nowrap"
      >
        <li v-for="tag in communityTags" :key="tag.id" class="shrink-0">
          <NuxtLink
            :to="`/forums/${tag.slug}`"
            class="flex items-center space-x-2 hover:bg-primary/10 px-2 py-1.5 rounded-lg transition-colors duration-200 ease-in-out"
          >
            <div
              class="w-6 h-6 rounded-full grid place-content-center bg-red-300"
              :style="{ backgroundColor: generateColor(tag.name) }"
            >
              <span class="text-white text-sm">{{ tag.name[0] }}</span>
            </div>
            <span class="text-sm">{{ tag.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="flex-1 space-y-4">
      <PostCard v-for="post in posts" :post="post" :key="post.id" />
    </div>
    <div class="w-80"></div>
  </Container>
</template>

<script setup lang="ts">
import { useGetTaxonomyPosts, useGetTaxonomyTags } from "~/lib/publiz";
import { generateColor } from "~/lib/color";

const { data: dataCommunityTags } = useGetTaxonomyTags("community");
const communityTags = computed(() => dataCommunityTags?.value?.data || []);

const filter = ref({
  pageSize: 80,
  before: "",
  after: "",
});

const { data: dataPosts } = useGetTaxonomyPosts("community", filter);

const posts = computed(() => dataPosts?.value?.data || []);
</script>
