<template>
  <Container class="pt-3 space-y-6">
    <div class="grid grid-cols-12 gap-5">
      <div class="grid grid-cols-12 col-span-12 lg:col-span-8 gap-4">
        <div v-if="featuredPosts.topPost" class="col-span-12 lg:col-span-8">
          <NuxtLink :to="getPostPath(featuredPosts.topPost)" class="block mb-4">
            <div
              v-if="featuredPosts.topPost.metadata?.featuredImage"
              class="mb-2"
            >
              <img
                class="w-full object-cover rounded-lg aspect-[3/2]"
                :src="
                  getGoogleImage(
                    featuredPosts.topPost.metadata?.featuredImage.src,
                    'w600-rw'
                  )
                "
                alt="post image"
              />
            </div>
            <h3 class="font-medium text-lg mb-1">
              {{ featuredPosts.topPost.title }}
            </h3>
          </NuxtLink>
        </div>
        <div v-if="featuredPosts.secondPost" class="col-span-6 lg:col-span-4">
          <NuxtLink :to="getPostPath(featuredPosts.secondPost)" class="block">
            <div
              v-if="featuredPosts.secondPost.metadata?.featuredImage"
              class="mb-2"
            >
              <img
                class="w-full object-cover rounded-lg aspect-[3/2]"
                :src="
                  getGoogleImage(
                    featuredPosts.secondPost.metadata?.featuredImage.src,
                    'w600-rw'
                  )
                "
                alt="post image"
              />
            </div>
            <h3 class="font-medium text-lg mb-1">
              {{ featuredPosts.secondPost.title }}
            </h3>

            <p class="hidden lg:block text-sm text-gray-500">
              {{ featuredPosts.secondPost.metadata?.excerpt }}
            </p>
          </NuxtLink>
        </div>
        <div
          class="col-span-6 lg:col-span-4"
          v-for="post in threeOtherPosts"
          :key="post.id"
        >
          <NuxtLink :to="getPostPath(post)" class="block">
            <div v-if="post.metadata?.featuredImage" class="mb-2">
              <img
                class="w-full object-cover rounded-lg aspect-[3/2]"
                :src="
                  getGoogleImage(post.metadata?.featuredImage.src, 'w600-rw')
                "
                alt="post image"
              />
            </div>
            <h3 class="font-medium mb-1 line-clamp-2">
              {{ post.title }}
            </h3>
          </NuxtLink>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-4">
        <ul
          class="space-y-4 border-l border-b rounded-bl-2xl border-dotted pl-5 pb-5 border-primary"
        >
          <li v-for="post in next8Posts" :key="post.id" class="relative">
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
    </div>
    <div class="grid grid-cols-12">
      <div class="col-span-8">
        <div class="grid grid-cols-12 gap-6 mb-10">
          <NuxtLink
            v-for="(post, index) in next6Posts"
            :key="post.id"
            :to="getPostPath(post)"
            class="col-span-6 flex space-x-3"
          >
            <div>
              <span class="text-4xl font-medium text-gray-500">
                #{{ index + 1 }}
              </span>
            </div>
            <div>
              <h3 class="font-medium line-clamp-2">
                {{ post.title }}
              </h3>
              <p class="text-sm">
                {{ post.author?.displayName }}
              </p>
            </div>
          </NuxtLink>
        </div>
        <div class="space-y-6">
          <NuxtLink
            v-for="post in otherPosts"
            :to="getPostPath(post)"
            class="flex space-x-4"
          >
            <div v-if="post.metadata?.featuredImage" class="w-48">
              <img
                class="w-full object-cover rounded-lg aspect-[3/2]"
                :src="
                  getGoogleImage(post.metadata?.featuredImage.src, 'w200-rw')
                "
                alt="post image"
              />
            </div>
            <div class="flex-1">
              <h3 class="line-clamp-3 font-medium">
                {{ post.title }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ $dayjs(post.createdAt).fromNow() }}
              </p>
            </div>
          </NuxtLink>
        </div>
      </div>
      <div class="col-span-4">
        <ClientOnly>
          <DevfeedSideBar />
        </ClientOnly>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { useGetCollectionPosts, getPostPath } from "~/lib/publiz";
import { getGoogleImage } from "@/lib/google-image";

const { data: dataPosts } = useGetCollectionPosts("featured-posts", {
  pageSize: 27,
  before: "",
  after: "",
});

const featuredPosts = computed(() => {
  const [topPost, secondPost, ...otherPosts] = dataPosts?.value?.data || [];

  return {
    topPost,
    secondPost,
    otherPosts,
  };
});
const threeOtherPosts = computed(() =>
  featuredPosts.value.otherPosts.slice(0, 3)
);
const next8Posts = computed(() => featuredPosts.value.otherPosts.slice(3, 11));
const next6Posts = computed(() => featuredPosts.value.otherPosts.slice(11, 17));
const otherPosts = computed(() => featuredPosts.value.otherPosts.slice(17));
</script>
