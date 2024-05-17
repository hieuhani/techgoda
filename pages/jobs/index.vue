<template>
  <Container class="pt-3 max-w-6xl">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-3">
        <JobTags />
      </div>
      <div class="col-span-12 lg:col-span-9">
        <div class="space-y-4">
          <JobCard v-for="post in posts" :post="post" :key="post.id" />
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { useGetTaxonomyPosts } from "~/lib/publiz";

const filter = ref({
  pageSize: 80,
  before: "",
  after: "",
  context: JSON.stringify({ withOrganization: true }),
});

const { data: dataPosts } = useGetTaxonomyPosts("job", filter);

const posts = computed(() => dataPosts?.value?.data || []);
</script>
