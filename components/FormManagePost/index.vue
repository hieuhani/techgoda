<template>
  <ClientOnly>
    <SelectSchemaDialog
      :organizationId="organization?.id"
      v-model="selectedMetaSchema"
      :preferredMetaSchemaId="post?.metadata?.metaSchemaId"
    />
    <div
      v-if="isPosting"
      class="fixed inset-0 bg-slate-200/50 z-10 backdrop-blur-sm flex items-center justify-center"
    >
      <div class="flex items-center flex-col bg-white rounded-md px-3 py-2">
        <div class="text-gray-900 text-3xl mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            class="animate-spin"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
        <h3 class="text-xs text-gray-600">
          Your post is submitting, don't leave the window
        </h3>
      </div>
    </div>
    <form
      v-if="selectedMetaSchema"
      class="lg:flex space-x-3 mt-3"
      @submit.prevent="onSubmit"
    >
      <div class="flex-1 bg-white rounded-lg px-3">
        <input
          type="text"
          v-model="body.title"
          placeholder="Title"
          class="w-full text-2xl outline-0 py-2"
        />
        <TiptapEditor v-model="body.content" />
      </div>
      <div class="w-full lg:w-60 flex flex-col">
        <div class="lg:order-1 space-y-3">
          <div v-for="(value, key) in properties">
            <BlockWithTitle title="Image" v-if="key === 'featuredImage'">
              <SelectFeatureImage
                v-model="body.featuredImage"
                :contentImages="contentImages"
              />
            </BlockWithTitle>
            <BlockWithTitle v-else :title="key">
              <textarea
                v-model="postMetadata[key]"
                class="w-full p-2 border rounded"
              />
            </BlockWithTitle>
          </div>

          <BlockWithTitle title="Tagging">
            <SelectPostTags
              :organizationId="organization?.id"
              v-model="body.tagIds"
            />
          </BlockWithTitle>
        </div>
        <Button
          class="w-full lg:order-0 mb-4"
          type="submit"
          :disabled="isPosting"
        >
          {{ postTitle }}
        </Button>
      </div>
    </form>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  type Organization,
  type Post,
  createOrganizationPost,
  updateOrganizationPost,
  type MetaSchema,
  createMyPost,
  updateMyPost,
} from "~/lib/publiz";
import { useToast } from "../ui/toast";
import SelectPostTags from "../SelectPostTags.vue";
import SelectFeatureImage from "../SelectFeatureImage.vue";
import type { ImageBlockAttrs, PostBody } from "./types";
import SelectSchemaDialog from "../SelectSchemaDialog.vue";
import {
  buildFormFiles,
  buildPostBody,
  getBlobContentImages,
  getInitialPostBody,
  replaceBlobContentImages,
  replaceFeatureImage,
  uploadFormFiles,
} from "./helpers";

const { toast } = useToast();

const props = defineProps<{
  post?: Post;
}>();

const selectedMetaSchema = ref<MetaSchema | null>(null);

const isPosting = ref(false);
const postTitle = computed(() => (props.post ? "Edit" : "Create"));
const organization = inject<Ref<Organization | undefined>>(
  "organization",
  ref(undefined)
);
const schemaHasFeaturedImage = computed(
  () => !!selectedMetaSchema.value?.schema?.properties?.featuredImage
);

const properties = computed<Record<string, { type: string }>>(
  () => selectedMetaSchema.value?.schema?.properties || {}
);
const body = reactive<PostBody>({
  title: props.post?.title ?? "",
  content:
    !!props.post?.contentJson && Object.keys(props.post?.contentJson).length > 0
      ? props.post?.contentJson
      : {
          type: "doc",
          content: [],
        },
  featuredImage: props.post?.metadata?.featuredImage ?? null,
  tagIds: props.post?.tags?.map((tag) => tag.id) || [],
});

const normalizePostMetadata = (metadata: Record<string, string>) => {
  return Object.keys(metadata)
    .filter((field) => !["featuredImage", "metaSchemaId"].includes(field))
    .reduce((prev, current) => {
      return {
        ...prev,
        [current]: metadata[current],
      };
    }, {});
};
const postMetadata = reactive<Record<string, string>>({
  ...normalizePostMetadata(props.post?.metadata || {}),
});

const contentImages = computed(() =>
  body.content.content
    .filter((item) => item.type === "imageBlock")
    .map((item) => (item as ImageBlockAttrs).attrs)
);

const onSubmit = async () => {
  isPosting.value = true;
  try {
    const organizationId = organization.value?.id;

    const blobContentImages = getBlobContentImages(contentImages.value);
    if (blobContentImages.length > 0) {
      let initialPostId = props.post?.id;
      if (!initialPostId) {
        if (organizationId) {
          // create organization post
          const { data: initialPost } = await createOrganizationPost(
            organizationId,
            getInitialPostBody(body)
          );
          initialPostId = initialPost.id;
        } else {
          // create user post
          const { data: initialPost } = await createMyPost(
            getInitialPostBody(body)
          );
          initialPostId = initialPost.id;
        }
      }

      const formFiles = buildFormFiles(initialPostId, blobContentImages);

      const uploadedFiles = await uploadFormFiles(formFiles);
      const contentWithFile = replaceBlobContentImages(body, uploadedFiles);
      const featuredImage = replaceFeatureImage(body, uploadedFiles);

      if (organizationId) {
        const { data: post } = await updateOrganizationPost(
          organizationId,
          initialPostId,
          buildPostBody(body, contentWithFile, selectedMetaSchema.value!.id, {
            ...props.post?.metadata,
            ...(featuredImage && schemaHasFeaturedImage
              ? { featuredImage }
              : {}),
            ...postMetadata,
          })
        );
      } else {
        const { data: post } = await updateMyPost(
          initialPostId,
          buildPostBody(body, contentWithFile, selectedMetaSchema.value!.id, {
            ...props.post?.metadata,
            ...(featuredImage && schemaHasFeaturedImage
              ? { featuredImage }
              : {}),
            ...postMetadata,
          })
        );
      }
    } else {
      // when there are no files to upload
      const updatePost = buildPostBody(
        body,
        body.content,
        selectedMetaSchema.value!.id,
        {
          ...props.post?.metadata,
          ...(body.featuredImage && schemaHasFeaturedImage
            ? { featuredImage: body.featuredImage }
            : {}),
          ...postMetadata,
        }
      );

      if (organizationId) {
        const postWithoutImages = props.post
          ? await updateOrganizationPost(
              organizationId,
              props.post.id,
              updatePost
            )
          : await createOrganizationPost(organizationId, updatePost);
      } else {
        const postWithoutImages = props.post
          ? await updateMyPost(props.post.id, updatePost)
          : await createMyPost(updatePost);
      }
    }
    if (organizationId) {
      navigateTo("/manage/posts");
    } else {
      navigateTo("/");
    }

    toast({
      title: `Đã ${props.post ? "sửa" : "tạo"} bài viết thành công`,
    });
  } catch (error) {
    console.error(error);
    toast({
      title: "Có lỗi xảy ra khi tạo bài viết",
    });
  }

  isPosting.value = false;
};
</script>
