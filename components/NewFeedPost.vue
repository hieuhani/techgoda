<template>
  <div class="bg-white rounded-lg px-3 py-3">
    <div class="flex space-x-3 mb-3">
      <Avatar class="h-10 w-10 text-md">
        <AvatarImage src="/hi.webp" alt="" />
      </Avatar>
      <button
        class="bg-gray-100 flex-1 text-left px-3 rounded-full text-gray-600"
      >
        What's on your mind, Hieu?
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
  </div>
</template>

<script setup lang="ts">
import { Image, Vote, CalendarDays, MapPin } from "lucide-vue-next";

const { $currentUser } = useNuxtApp();
</script>
