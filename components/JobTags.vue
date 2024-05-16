<template>
  <div>
    <ul
      class="-translate-x-2 flex flex-row lg:flex-col overflow-x-auto flex-nowrap lg:space-y-1"
    >
      <li v-for="tag in communityTags" :key="tag.id" class="shrink-0">
        <NuxtLink
          :to="`/jobs/${tag.slug}`"
          :class="[
            'flex items-center space-x-2 hover:bg-primary/10 px-2 py-2 rounded-lg transition-colors duration-200 ease-in-out text-gray-600',
            {
              'bg-primary/20': route.params.slug === tag.slug,
            },
          ]"
        >
          <span>{{ tag.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useGetTaxonomyTags } from "~/lib/publiz";

const { data: dataCommunityTags } = useGetTaxonomyTags("job");
const communityTags = computed(() => dataCommunityTags?.value?.data || []);
const route = useRoute();
</script>
