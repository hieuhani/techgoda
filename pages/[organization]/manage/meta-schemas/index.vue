<template>
  <div>
    <h3 class="text-xl font-medium text-gray-600">Meta schemas</h3>
    <div class="mb-2">
      <h1 class="font-medium text-gray-600 mb-1">System</h1>
      <div class="flex items-center flex-row -translate-x-2">
        <div v-for="metaSchema in metaSchemas" class="font-medium px-2">
          {{ metaSchema.name }}
        </div>
      </div>
    </div>
    <div class="mb-2">
      <div class="flex items-center">
        <h1 class="font-medium text-gray-600 mr-2">Organization</h1>
        <ButtonNewMetaSchema :key="renderKey" @submit="handleSaveMetaSchema" />
      </div>
      <div class="flex items-center flex-row -translate-x-2">
        <div
          v-for="metaSchema in organizationMetaSchemas"
          class="font-medium px-2 flex items-center"
        >
          <span>
            {{ metaSchema.name }}
          </span>
          <ButtonNewMetaSchema
            :key="renderKey"
            :metaSchema="metaSchema"
            @submit="handleSaveMetaSchema"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  createOrganizationMetaSchema,
  updateOrganizationMetaSchema,
  useGetOrganizationMetaSchemas,
  useGetSystemMetaSchemas,
  type Organization,
} from "~/lib/publiz";
const renderKey = ref(0);
const organization = inject<Ref<Organization | undefined>>("organization");

const { data: dataMetaSchemas } = useGetSystemMetaSchemas();
const { data: dataOrganizationMetaSchemas, refresh } =
  useGetOrganizationMetaSchemas(organization?.value?.id!!);

const metaSchemas = computed(() => dataMetaSchemas.value?.data || []);
const organizationMetaSchemas = computed(
  () => dataOrganizationMetaSchemas.value?.data || []
);
const handleSaveMetaSchema = async ({
  updateMetaSchemaId,
  ...values
}: {
  name: string;
  schema: string;
  target: string;
  version: number;
  updateMetaSchemaId?: number;
}) => {
  const payload = {
    ...values,
    schema: JSON.parse(values.schema),
  };

  if (updateMetaSchemaId) {
    await updateOrganizationMetaSchema(
      organization?.value?.id!!,
      updateMetaSchemaId,
      payload
    );
  } else {
    await createOrganizationMetaSchema(organization?.value?.id!!, payload);
  }

  await refresh();
  renderKey.value++;
};
</script>
