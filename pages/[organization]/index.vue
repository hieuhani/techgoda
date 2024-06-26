<template>
  <Container class="max-w-6xl mb-4">
    <div v-if="organization" class="pt-2 lg:pt-4">
      <OrganizationCard :organization="organization" class="mb-4" />
      <div
        v-if="amIOrganizationAdmin"
        class="fixed bottom-0 left-0 right-0 shadow-md z-10 flex justify-end"
      >
        <NuxtLink
          :class="cn(buttonVariants({ variant: 'link' }), 'space-x-2 px-1')"
          to="/manage/posts"
        >
          <ShieldIcon />
          <span>Manage</span>
        </NuxtLink>
        <OrganizationAppearance :organizationId="organization.id" />
      </div>
    </div>
    <div class="grid grid-cols-12 gap-6 bg-white px-6 py-4 rounded-lg">
      <div class="col-span-12 lg:col-span-8 space-y-3 order-1 lg:order-0">
        <div>
          <h3 class="text-primary uppercase text-sm font-medium mb-3">
            Featured products
          </h3>
          <div class="space-y-2 -translate-x-2">
            <NuxtLink
              :to="getPostPath(product)"
              v-for="product in products"
              class="flex space-x-3 hover:bg-gray-50 rounded-lg px-2 py-2 duration-600 ease-in-out transition-colors"
            >
              <div class="w-16">
                <img
                  v-if="product.metadata?.featuredImage"
                  :src="
                    getGoogleImage(
                      product.metadata.featuredImage.src,
                      'w200-rw'
                    )
                  "
                  alt="product image"
                  class="w-full aspect-square object-cover rounded-lg"
                />
              </div>
              <div class="flex-1">
                <h3>{{ product.title }}</h3>
                <p class="text-sm text-gray-500 mb-2 max-w-96">
                  {{ product.metadata?.excerpt }}
                </p>
              </div>
            </NuxtLink>
          </div>
        </div>
        <div>
          <h3 class="text-primary uppercase text-sm font-medium mb-1">Jobs</h3>
          <div class="space-y-2">
            <JobRow v-for="job in jobs" :key="job.id" :job="job" />
          </div>
        </div>
      </div>
      <div class="col-span-12 order:0 lg:order-1 lg:col-span-4">
        <OrganizationInfo
          v-if="organization"
          :metadata="organization.metadata"
        />
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { ShieldIcon } from "lucide-vue-next";
import { buttonVariants } from "@/components/ui/button";
import {
  type Organization,
  useGetOrganizationPosts,
  type Post,
  useGetSystemMetaSchemas,
  type MetaSchema,
  getPostPath,
} from "~/lib/publiz";
import { cn } from "@/lib/utils";
import { getGoogleImage } from "@/lib/google-image";

definePageMeta({
  layout: "tenant",
});

const organization = inject<Ref<Organization | undefined>>("organization");
const tenant = useTenant();
const amIOrganizationAdmin = inject<boolean>("amIOrganizationAdmin");
const { data } = useGetOrganizationPosts(tenant);
const { data: dataSystemMetaSchemas } = useGetSystemMetaSchemas();
const workTypeDictionary: Record<string, string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
};
const systemMetaSchemaMap = computed(() =>
  (dataSystemMetaSchemas.value?.data || ([] as const)).reduce<
    Record<string, MetaSchema>
  >(
    (prev, current) => ({
      ...prev,
      [current.name]: current,
    }),
    {}
  )
);

const postsByMetaSchemaId = computed(() =>
  (data.value?.data || ([] as const)).reduce<Record<string, Post[]>>(
    (prev, current) => {
      const { metaSchemaId = 0 } = current.metadata;
      return {
        ...prev,
        [metaSchemaId]: [...(prev[metaSchemaId] || []), current],
      };
    },
    {}
  )
);

const products = computed(() => {
  if (!systemMetaSchemaMap.value.product?.id) return [];
  return postsByMetaSchemaId.value[systemMetaSchemaMap.value.product?.id] || [];
});

const jobs = computed(() => {
  if (!systemMetaSchemaMap.value.job?.id) return [];
  return postsByMetaSchemaId.value[systemMetaSchemaMap.value.job?.id] || [];
});
</script>
