<template>
  <div class="lg:w-48">
    <ul
      class="-translate-x-1 flex flex-row lg:flex-col overflow-x-auto flex-nowrap"
    >
      <li v-for="tag in communityTags" :key="tag.id" class="shrink-0">
        <NuxtLink
          :to="`/forums/${tag.slug}`"
          :class="[
            'flex items-center space-x-2 hover:bg-primary/10 px-2 py-1.5 rounded-lg transition-colors duration-200 ease-in-out',
            {
              'bg-primary/20': route.params.slug === tag.slug,
            },
          ]"
        >
          <div
            class="w-6 h-6 rounded-full grid place-content-center bg-red-300"
            :style="{ backgroundColor: generateColor(tag.name) }"
          >
            <span class="text-white text-sm">{{ tag.name[0] }}</span>
          </div>
          <span class="text-sm">{{ tag.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useGetTaxonomyTags } from "~/lib/publiz";
import { generateColor } from "~/lib/color";

const { data: dataCommunityTags } = useGetTaxonomyTags("community");
const communityTags = computed(() => dataCommunityTags?.value?.data || []);
const route = useRoute();
</script>
