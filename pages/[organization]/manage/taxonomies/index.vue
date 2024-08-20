<template>
  <div>
    <h3 class="text-xl font-medium text-gray-600">Taxonomies</h3>
    <div class="mb-2">
      <h1 class="font-medium text-gray-600 mb-1">System</h1>
      <div class="flex items-center flex-row -translate-x-2">
        <div v-for="taxonomy in taxonomies" class="font-medium px-2">
          {{ taxonomy.name }}
        </div>
      </div>
    </div>
    <div>
      <div class="flex items-center">
        <h1 class="font-medium text-gray-600 mr-2">Organization</h1>
        <ButtonNewTaxonomy :key="renderKey" @submit="handleSaveTaxonomy" />
      </div>
      <div class="flex items-center flex-row -translate-x-2">
        <div
          v-for="taxonomy in organizationTaxonomies"
          class="font-medium px-2"
        >
          {{ taxonomy.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createOrganizationTaxonomy,
  useGetTaxonomies,
  useGetOrganizationTaxonomies,
  type Organization,
} from "~/lib/publiz";
import type ButtonNewTaxonomy from "~/components/ButtonNewTaxonomy.vue";

const renderKey = ref(0);
const { data: dataTaxonomies } = useGetTaxonomies();
const taxonomies = computed(() => dataTaxonomies.value?.data || []);
const organization = inject<Ref<Organization | undefined>>("organization");
const { data: dataOrganizationTaxonomies, refresh } =
  useGetOrganizationTaxonomies(organization?.value?.id!!);

const organizationTaxonomies = computed(
  () => dataOrganizationTaxonomies.value?.data || []
);
const handleSaveTaxonomy = async (values: { name: string; slug: string }) => {
  await createOrganizationTaxonomy(organization?.value?.id!!, values);
  await refresh();
  renderKey.value++;
};
</script>
