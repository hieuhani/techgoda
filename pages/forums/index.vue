<template>
  <Container class="lg:flex lg:space-x-4 pt-3">
    <CommunityTags />
    <div class="flex-1 space-y-4">
      <PostCard v-for="post in posts" :post="post" :key="post.id" />
    </div>
    <div class="w-96 pl-2">
      <ul
        class="space-y-4 border-l border-b rounded-bl-2xl border-dotted pl-5 pb-5 border-primary"
      >
        <li v-for="post in collectionPosts" :key="post.id" class="relative">
          <span
            class="bg-primary w-2 h-2 rounded-full absolute -left-6 top-2"
          />
          <NuxtLink :to="getPostPath(post)" class="flex space-x-4">
            <div class="flex-1">
              <h3 class="line-clamp-3 text-sm font-medium">
                {{ post.title }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ $dayjs(post.createdAt).fromNow() }}
              </p>
            </div>
            <div v-if="post.metadata?.featuredImage" class="w-28">
              <img
                class="w-full object-cover rounded-lg aspect-[3/2]"
                :src="
                  getGoogleImage(post.metadata?.featuredImage.src, 'w200-rw')
                "
                alt="post image"
              />
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Container>
</template>

<script setup lang="ts">
import {
  useGetCollectionPosts,
  useGetTaxonomyPosts,
  getPostPath,
} from "~/lib/publiz";
import { getGoogleImage } from "@/lib/google-image";

const filter = ref({
  pageSize: 80,
  before: "",
  after: "",
});

const { data: dataPosts } = useGetTaxonomyPosts("community", filter);

const posts = computed(() => dataPosts?.value?.data || []);

const { data: dataCollectionPosts } = useGetCollectionPosts("featured-posts", {
  pageSize: 10,
  before: "",
  after: "",
});
const collectionPosts = computed(() => dataCollectionPosts?.value?.data || []);
</script>
