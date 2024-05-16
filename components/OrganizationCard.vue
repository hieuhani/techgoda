<template>
  <div class="bg-white rounded-xl pb-4">
    <div class="min-h-36 lg:min-h-72 bg-gray-200 rounded-xl relative">
      <div
        v-if="organization.metadata?.cover?.src"
        class="absolute inset-0 rounded-xl overflow-hidden"
      >
        <img
          :src="getGoogleImage(organization.metadata.cover.src, 'w1000-rw')"
          alt=""
          class="w-full h-full object-cover"
        />
      </div>
      <div class="absolute bottom-0 left-0 z-10">
        <Avatar
          class="ml-4 md:ml-6 translate-y-1/2 h-20 w-20 text-2xl md:h-32 md:w-32 md:text-5xl"
        >
          <AvatarImage :src="organization.metadata?.avatar?.src ?? ''" alt="" />
        </Avatar>
      </div>
    </div>
    <div class="pl-28 md:pl-40 pt-1 flex items-center">
      <div>
        <div class="flex items-center space-x-2 mb-1">
          <h1 class="text-xl font-medium text-gray-800">
            {{ organization.name }}
          </h1>
          <span class="text-green-600"><BadgeCheckIcon /></span>
        </div>
        <p>{{ organization.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Organization } from "~/lib/publiz";
import { BadgeCheckIcon } from "lucide-vue-next";
import { getGoogleImage } from "@/lib/google-image";
defineProps<{ organization: Organization }>();
</script>
