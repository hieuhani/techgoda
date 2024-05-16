<template>
  <Container class="grid pt-3 grid-cols-12 gap-4">
    <div class="col-span-12 lg:col-span-2">
      <ul class="flex flex-row lg:flex-col flex-nowrap overflow-x-auto">
        <li class="shrink-0">
          <a href="#" class="flex items-center space-x-3 py-2 px-2">
            <Sparkle />
            <span>For you</span>
          </a>
        </li>
        <li class="shrink-0">
          <a href="#" class="flex items-center space-x-3 py-2 px-2">
            <UserSearch />
            <span>Following</span>
          </a>
        </li>
        <li class="shrink-0">
          <a href="#" class="flex items-center space-x-3 py-2 px-2">
            <Users />
            <span>Friends</span>
          </a>
        </li>
        <li class="shrink-0">
          <a href="#" class="flex items-center space-x-3 py-2 px-2">
            <Telescope />
            <span>Explore</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="col-span-12 lg:col-span-6 space-y-4">
      <Carousel class="relative">
        <CarouselContent>
          <CarouselItem class="basis-auto">
            <NewStoryButton />
          </CarouselItem>
          <CarouselItem
            v-for="story in storyPosts"
            :key="story.id"
            class="basis-auto"
          >
            <button
              class="w-36 bg-gray-100 rounded-lg overflow-hidden h-full relative"
            >
              <img
                v-if="story.metadata?.featuredImage?.src"
                :src="
                  getGoogleImage(story.metadata?.featuredImage?.src, 'w200')
                "
                class="hover:scale-110 transition-transform duration-300 object-cover h-full w-full"
              />
              <div class="absolute bottom-0 left-0 right-0 text-white py-2">
                <h3 class="z-20 relative">
                  {{ story.author?.displayName }}
                </h3>
                <div
                  class="inset-0 absolute bg-gradient-to-t from-gray-900 to-transparent"
                />
              </div>
            </button>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="left-2 disabled:hidden" />
        <CarouselNext class="right-2" />
      </Carousel>
      <NewFeedPost v-if="$currentUser" />
      <PostCard v-for="post in devfeedPosts" :post="post" :key="post.id" />
    </div>
    <div class="col-span-12 lg:col-span-4">
      <div class="space-y-4">
        <JobCardLite v-for="post in jobs" :post="post" :key="post.id" />
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { Sparkle, Users, Telescope, UserSearch } from "lucide-vue-next";
import { useGetMetaSchemaPosts, useGetTaxonomyPosts } from "~/lib/publiz";
import { getGoogleImage } from "@/lib/google-image";

const { $currentUser } = useNuxtApp();
const { data: dataPosts } = useGetMetaSchemaPosts("story:1", {
  pageSize: 32,
});

const { data: dataDevFeedPosts } = useGetMetaSchemaPosts("devfeed:1", {
  pageSize: 32,
});

const storyPosts = computed(() => dataPosts?.value?.data || []);

const devfeedPosts = computed(() => dataDevFeedPosts?.value?.data || []);

const { data: dataJobs } = useGetTaxonomyPosts("job", {
  pageSize: 80,
  before: "",
  after: "",
});

const jobs = computed(() => dataJobs?.value?.data || []);
</script>
