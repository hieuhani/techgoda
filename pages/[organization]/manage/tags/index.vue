<template>
  <div>
    <h3 class="text-xl font-medium text-gray-600">Tags</h3>
    <div>
      <div>
        <div class="flex">
          <div class="w-48 font-medium text-gray-600">System tags</div>
          <div class="font-medium text-gray-600">Organization tags</div>
        </div>
        <div class="-translate-x-2">
          <div v-for="(options, taxonomyId) in tagsByTaxonomyId">
            <h3 class="font-medium mb-1 px-2">
              {{ taxonomyById[taxonomyId] }}
            </h3>
            <div
              v-for="option in options"
              :key="option.value"
              class="hover:bg-gray-50 py-1 px-2 rounded-lg flex items-center"
            >
              <div class="w-48">
                {{ option.label }}
              </div>
              <div class="flex items-center divide-x-2">
                <form
                  @submit.prevent="onCreateTag"
                  v-if="parentTagId === option.value"
                  class="relative mr-2"
                >
                  <input
                    @keyup.esc="handleTagInputEsc"
                    class="border rounded px-1"
                    v-model="newTag"
                  />
                  <div
                    class="absolute right-1 top-1 bottom-1 bg-gray-200 px-1 rounded flex items-center"
                  >
                    <CornerDownLeft class="h-3 w-3 text-gray-500" />
                  </div>
                </form>
                <button v-else @click="parentTagId = option.value" class="mr-2">
                  <PlusCircleIcon class="h-4 w-4" />
                </button>

                <div
                  v-for="tag in organizationTagsByParentId[option.value] || []"
                  :key="tag.id"
                  class="px-2"
                >
                  {{ tag.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PlusCircleIcon, CornerDownLeft } from "lucide-vue-next";
import {
  useGetTags,
  useGetTaxonomies,
  useGetOrganizationTags,
  createOrganizationTag,
  type Organization,
  type Tag,
} from "~/lib/publiz";

const { data: dataTaxonomies } = useGetTaxonomies();
const { data: dataTags } = useGetTags();
const organization = inject<Ref<Organization | undefined>>("organization");

const { data: dataOrganizationTags, refresh: refreshOrganizationTags } =
  useGetOrganizationTags(organization?.value?.id!!);

const organizationTagsByParentId = computed(() => {
  return (dataOrganizationTags.value?.data || []).reduce<Record<string, Tag[]>>(
    (prev, current) => {
      return {
        ...prev,
        [current.parentId || "0"]: [
          ...(prev[current.parentId || "0"] || []),
          current,
        ],
      };
    },
    {}
  );
});
const parentTagId = ref<number | undefined>();
const newTag = ref("");
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
const handleTagInputEsc = () => {
  parentTagId.value = undefined;
  newTag.value = "";
};
const onCreateTag = async () => {
  if (!newTag.value) {
    return;
  }
  try {
    await createOrganizationTag(organization!.value?.id!!, {
      parentId: parentTagId.value,
      name: newTag.value,
    });
    refreshOrganizationTags();
  } catch (error) {
    console.error(error);
  }
  parentTagId.value = undefined;
  newTag.value = "";
};
</script>
