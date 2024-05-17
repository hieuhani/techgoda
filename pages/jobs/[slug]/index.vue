<template>
  <Container class="pt-3">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-2">
        <JobTags />
      </div>
      <div class="col-span-12 lg:col-span-7">
        <div class="space-y-4">
          <JobCard v-for="post in posts" :post="post" :key="post.id" />
          <NoPost v-if="posts.length === 0" />
        </div>
      </div>
      <div class="col-span-12 lg:col-span-3 space-y-4">
        <a
          v-for="organization in organizations"
          :key="organization.id"
          class="block"
          :href="useBuildTenantUrl(organization.slug)"
        >
          <OrganizationCardLite :organization="organization" />
        </a>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { useGetTaxonomyPosts, useGetOrganizations } from "~/lib/publiz";
import { useBuildTenantUrl } from "~/lib/utils";

const route = useRoute();
const postsFilter = ref({
  pageSize: 80,
  before: "",
  after: "",
  context: JSON.stringify({ withOrganization: true }),
});

const filter = computed(() => ({
  ...postsFilter.value,
  tag: route.params.slug.toString(),
}));

const { data: dataPosts } = useGetTaxonomyPosts("job", filter);

const posts = computed(() => dataPosts?.value?.data || []);
const { data: dataOrganizations } = useGetOrganizations();
const organizations = computed(() => dataOrganizations?.value?.data || []);
</script>
