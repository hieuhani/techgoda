<template>
  <div class="bg-white rounded-xl px-3 py-3 flex space-x-3">
    <div>
      <Avatar size="base">
        <AvatarImage :src="organization.metadata?.avatar?.src ?? ''" alt="" />
      </Avatar>
    </div>
    <div>
      <div class="flex items-center space-x-1 mb-1">
        <h1 class="font-medium text-gray-800">
          {{ organization.name }}
        </h1>
        <span class="text-green-600"><BadgeCheckIcon class="w-4 h-4" /></span>
      </div>
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ organization.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Organization } from "~/lib/publiz";
import { BadgeCheckIcon } from "lucide-vue-next";
defineProps<{ organization: Organization }>();
</script>
