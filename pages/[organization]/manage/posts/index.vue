<template>
  <div>
    <div class="flex justify-between items-center mb-2">
      <h3 class="text-xl font-medium text-gray-600">Posts</h3>
    </div>
    <div
      class="bg-gray-100 mb-2 px-1 py-1 flex items-center flex-row rounded-lg"
    >
      <NuxtLink
        class="font-medium px-3 py-2 hover:bg-gray-200 rounded"
        to="/manage/posts"
      >
        All
      </NuxtLink>
      <NuxtLink
        v-for="metaSchema in applicableOrganizationMetaSchemas"
        class="font-medium px-3 py-2 hover:bg-gray-200 rounded capitalize"
        :to="`/manage/posts?metaSchema=${metaSchema.name}:${metaSchema.version}`"
      >
        {{ metaSchema.name }}
      </NuxtLink>
      <NuxtLink
        :class="[buttonVariants(), 'ml-auto space-x-2 pl-2 rounded-full']"
        to="/manage/posts/add"
      >
        <PlusIcon />
        <span>New post</span>
      </NuxtLink>
    </div>

    <div>
      <div v-if="posts.length === 0" class="py-2">
        <p class="text-gray-500">No content</p>
      </div>
      <div v-else class="divide-y divide-slate-100">
        <div
          v-for="post in posts"
          :key="post.id"
          class="py-2 flex items-center"
        >
          <div class="w-16 h-16">
            <img
              v-if="post.metadata?.featuredImage"
              class="w-full h-full object-cover rounded-md"
              :src="post.metadata?.featuredImage.src"
              alt="post image"
            />
            <div v-else class="border-2 w-16 h-16 rounded border-dashed"></div>
          </div>
          <div class="ml-3">
            <h3 class="text-lg font-medium">{{ post.title }}</h3>
            <p v-if="post.metadata?.excerpt">{{ post.metadata.excerpt }}</p>
            <time class="text-xs">
              {{ $dayjs(post.createdAt).fromNow() }}
            </time>
          </div>
          <div class="ml-auto flex text-gray-400 items-center">
            <NuxtLink
              :to="`/${slugify(post.title.toLowerCase())}-${post.id}`"
              class="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
            >
              <EyeIcon class="h-5 w-5" />
            </NuxtLink>
            <NuxtLink
              :to="`/manage/posts/${post.id}`"
              class="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
            >
              <Pencil class="h-4 w-4" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { buttonVariants } from "~/components/ui/button";
import { PlusIcon, EyeIcon, Pencil } from "lucide-vue-next";
import {
  useGetApplicableOrganizationMetaSchemas,
  usePublizFetch,
  type BaseResponse,
  type Organization,
  type Post,
} from "~/lib/publiz";
import { encodeId } from "~/lib/id";
import { slugify } from "~/lib/slugify";

const route = useRoute();
const postsFilter = ref({
  pageSize: 80,
  before: "",
  after: "",
});
const filter = computed(() => ({
  ...postsFilter.value,
  metaSchema: route.query.metaSchema ? route.query.metaSchema.toString() : "",
}));

const tenant = useTenant();
const organization = inject<Ref<Organization | undefined>>("organization");
const { data: dataApplicableOrganizationMetaSchemas } =
  useGetApplicableOrganizationMetaSchemas(organization?.value?.id!!);
const applicableOrganizationMetaSchemas = computed(
  () => dataApplicableOrganizationMetaSchemas.value?.data || []
);
const { data: dataOrganizationPosts } = usePublizFetch<BaseResponse<Post[]>>(
  `api/v1/organizations/${tenant}/posts`,
  {
    params: filter,
  }
);

const posts = computed(() => dataOrganizationPosts.value?.data || []);
</script>
