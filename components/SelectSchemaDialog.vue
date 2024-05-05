<template>
  <Dialog :open="!modelValue">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Select post schema</DialogTitle>
      </DialogHeader>
      <ul>
        <li v-for="metaSchema in metaSchemas" :key="metaSchema.id">
          <button
            @click="modelValue = metaSchema"
            class="hover:bg-gray-200 w-full text-left py-2 px-3 rounded"
          >
            {{ metaSchema.name }}
          </button>
        </li>
      </ul>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import {
  useGetSystemMetaSchemas,
  usePublizFetch,
  type BaseResponse,
  type MetaSchema,
} from "~/lib/publiz";

type SelectSchemaEmits = {
  (e: "update:modelValue", payload: MetaSchema | null): void;
};
const props = defineProps<{
  modelValue?: MetaSchema | null;
  preferredMetaSchemaId?: number;
  organizationId?: number;
}>();
const emits = defineEmits<SelectSchemaEmits>();

const modelValue = useVModel(props, "modelValue", emits, {
  defaultValue: null,
  passive: true,
});

const { data: dataMetaSchemas } = usePublizFetch<BaseResponse<MetaSchema[]>>(
  props.organizationId
    ? `api/v1/my_organizations/${props.organizationId}/applicable_meta_schemas`
    : "api/v1/meta_schemas"
);

const metaSchemas = computed(() => dataMetaSchemas.value?.data || []);

watchEffect(() => {
  if (
    props.preferredMetaSchemaId &&
    metaSchemas.value.length > 0 &&
    !modelValue.value
  ) {
    const preferredMetaSchema = metaSchemas.value.find(
      (schema) => schema.id === props.preferredMetaSchemaId
    );
    if (preferredMetaSchema) {
      modelValue.value = preferredMetaSchema;
    }
  }
});
</script>
