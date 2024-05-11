<template>
  <NuxtLink
    to="/devfeeds/stories/create"
    class="w-36 bg-gray-100 rounded-lg overflow-hidden block text-center"
  >
    <div class="overflow-hidden h-44 relative">
      <img
        v-if="$currentUser?.metadata?.avatar?.src"
        :src="$currentUser?.metadata?.avatar?.src"
        class="hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div class="pt-5 pb-3 relative">
      <div
        class="bg-primary text-white w-9 h-9 rounded-full grid place-content-center absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-gray-100 border-2"
      >
        <Plus />
      </div>
      <h3 class="font-medium text-gray-500">Create story</h3>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { Plus } from "lucide-vue-next";

const { $currentUser } = useNuxtApp();
</script>
