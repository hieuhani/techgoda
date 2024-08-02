<template>
  <Container v-if="post" class="max-w-3xl mt-2 py-6 rounded-xl">
    <h1 class="text-5xl font-medium text-gray-700 mb-4">
      {{ post.title }}
    </h1>

    <p class="mb-6 text-xl text-gray-600">{{ post.metadata?.excerpt }}</p>
    <NuxtLink
      :to="post.author?.id ? `/user/${encodeId(post.author.id)}` : '/'"
      class="flex items-center mb-4"
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
      <div class="ml-2">
        <h3 class="leading-none">
          {{ post.author?.displayName || "Anonymous" }}
        </h3>
        <time class="text-xs text-gray-600 leading-none">
          {{ $dayjs(post.createdAt).fromNow() }}
        </time>
      </div>
    </NuxtLink>
    <article
      class="prose [&>img]:w-full w-full max-w-full"
      v-html="post.content"
    />
    <div
      v-if="isOwner"
      class="fixed bottom-0 left-0 right-0 shadow-md z-10 flex justify-end"
    >
      <NuxtLink
        :class="cn(buttonVariants({ variant: 'link' }), 'space-x-2 px-1')"
        :to="`/thread/${route.params.slug}/edit`"
      >
        <Pencil />
        <span>Edit</span>
      </NuxtLink>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { useGetPost } from "~/lib/publiz";
import { cn } from "~/lib/utils";
import { buttonVariants } from "~/components/ui/button";
import { Pencil } from "lucide-vue-next";
import { encodeId } from "~/lib/id";

const route = useRoute();
const idString = String(route.params.slug).split("-").pop();
const { $currentUser } = useNuxtApp();

const { data } = useGetPost(idString || "");
const post = computed(() => data.value?.data);

useSeoMeta({
  title: post.value?.title || "Techgoda",
  ogTitle: post.value?.title || "Techgoda",
  description:
    post.value?.metadata?.excerpt ||
    "Techgoda is a publishing platform for developers.",
  ogDescription:
    post.value?.metadata?.excerpt ||
    "Techgoda is a publishing platform for developers.",
});

const isOwner = computed(() => {
  return (
    !!$currentUser?.value?.id &&
    $currentUser?.value?.id === post.value?.authorId
  );
});
</script>
