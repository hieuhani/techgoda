<template>
  <FormManagePost v-if="post" :post="post" />
</template>

<script setup lang="ts">
import { useGetMyOrganizationPost, type Organization } from "~/lib/publiz";

const route = useRoute();
const organization = inject<Ref<Organization | undefined>>("organization");

const { data } = useGetMyOrganizationPost(
  organization?.value?.id!!,
  +route.params.id
);

const post = computed(() => data?.value?.data);
</script>
