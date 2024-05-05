<template>
  <div class="space-y-3">
    <div v-for="(options, taxonomyId) in tagsByTaxonomyId">
      <h3 class="mb-3">{{ taxonomyById[taxonomyId] }}</h3>
      <div class="space-y-3">
        <div
          class="items-top flex gap-x-2"
          v-for="option in options"
          :key="option.value"
        >
          <Checkbox
            :id="`cb-${option.value}`"
            :checked="modelValue?.includes(option.value)"
            @update:checked="(checked: boolean) =>  {
          modelValue = checked
            ? [...(modelValue || []), option.value]
            : (modelValue || []).filter((v) => v !== option.value)
        }"
          />
          <div class="grid gap-1.5 leading-none w-full">
            <label :for="`cb-${option.value}`">
              {{ option.label }}
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useGetTags,
  useGetTaxonomies,
  usePublizFetch,
  type BaseResponse,
  type Tag,
} from "~/lib/publiz";
import type { HTMLAttributes } from "vue";
import { useVModel } from "@vueuse/core";

const { data: dataTaxonomies } = useGetTaxonomies();

const props = defineProps<{
  defaultValue?: number[];
  modelValue?: number[];
  organizationId?: number;
  class?: HTMLAttributes["class"];
}>();

const { data: dataTags } = usePublizFetch<BaseResponse<Tag[]>>(
  props.organizationId
    ? `api/v1/my_organizations/${props.organizationId}/applicable_tags`
    : "api/v1/tags"
);

const tagsByTaxonomyId = computed(() =>
  (dataTags.value?.data || []).reduce<
    Record<string, { label: string; value: number }[]>
  >((prev, current) => {
    return {
      ...prev,
      [current.taxonomyId || "0"]: [
        ...(prev[current.taxonomyId || "0"] || []),
        { label: current.name, value: current.id },
      ],
    };
  }, {})
);
const taxonomyById = computed(() =>
  (dataTaxonomies.value?.data || []).reduce<Record<string, string>>(
    (prev, current) => {
      return {
        ...prev,
        [current.id]: current.name,
      };
    },
    {}
  )
);

const emits = defineEmits<{
  (e: "update:modelValue", payload: number[]): void;
}>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
});
</script>
