<template>
  <NuxtLink
    to="/write?schema=devfeed"
    class="bg-white rounded-lg px-3 py-3 block"
  >
    <div class="flex space-x-3 mb-3">
      <Avatar class="h-10 w-10 text-md">
        <AvatarImage
          :src="
            $currentUser?.metadata?.avatar?.src
              ? $currentUser?.metadata?.avatar?.src
              : '/hi.webp'
          "
          role="img"
          alt="Avatar"
        />
      </Avatar>
      <button
        class="bg-gray-100 flex-1 text-left px-3 rounded-full text-gray-600"
      >
        What's on your mind?
      </button>
    </div>
    <div class="flex justify-around ml-12">
      <button class="text-left flex items-center space-x-2">
        <Image />
        <span>Image</span>
      </button>

      <button class="text-left flex items-center space-x-2">
        <Vote />
        <span>Poll</span>
      </button>
      <button class="text-left flex items-center space-x-2">
        <CalendarDays />
        <span>Event</span>
      </button>
      <button class="text-left flex items-center space-x-2">
        <MapPin />
        <span>Location</span>
      </button>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Image, Vote, CalendarDays, MapPin } from "lucide-vue-next";

const { $currentUser } = useNuxtApp();
</script>
