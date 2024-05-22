<template>
  <Dialog>
    <DialogTrigger as-child>
      <button
        class="w-36 bg-gray-100 rounded-lg overflow-hidden h-full relative"
      >
        <img
          v-if="story.metadata?.featuredImage?.src"
          :src="getGoogleImage(story.metadata?.featuredImage?.src, 'w200-rw')"
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
    </DialogTrigger>
    <DialogContent
      class="max-w-full h-full sm:rounded-none bg-black/60 backdrop-blur-sm border-0 p-0 grid-cols-12 gap-0"
    >
      <div class="col-span-12 lg:col-span-9 h-full">
        <img
          v-if="story.metadata?.featuredImage?.src"
          :src="getGoogleImage(story.metadata?.featuredImage?.src, 'w500-rw')"
          class="h-full mx-auto"
        />
      </div>
      <div class="bg-white col-span-12 lg:col-span-3 lg:h-full px-4 py-4">
        <NuxtLink
          v-if="story.author"
          :to="story.author?.id ? `/user/${encodeId(story.author.id)}` : '/'"
          class="flex items-center mb-3"
        >
          <Avatar class="h-10 w-10 text-md">
            <AvatarImage
              :src="
                story.author?.metadata?.avatar?.src
                  ? story.author.metadata.avatar.src
                  : '/hi.webp'
              "
              alt=""
            />
          </Avatar>
          <div class="ml-2">
            <h3 class="leading-none">
              {{ story.author?.displayName || "Anonymous" }}
            </h3>
            <time class="text-xs text-gray-600 leading-none">
              {{ $dayjs(story.createdAt).fromNow() }}
            </time>
          </div>
        </NuxtLink>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { type Post } from "~/lib/publiz";
import { encodeId } from "~/lib/id";

import { getGoogleImage } from "@/lib/google-image";

defineProps<{ story: Post }>();
</script>
