import { defu } from "defu";
import type { UseFetchOptions } from "nuxt/app";
import { slugify } from "./slugify";
import { encodeId } from "./id";

export type BaseResponse<T> = {
  data: T;
  pagination?: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};
export type User = {
  id: number;
  authId: string;
  displayName: string;
  avatarUrl?: string;
  coverUrl?: string;
  metadata: any;
};

export type Organization = {
  id: number;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string;
  coverUrl?: string;
  verified: boolean;
  ownerId: number;
  metadata: any;
};

export type Taxonomy = {
  id: number;
  name: string;
  slug: string;
};

export type TagType = "SYSTEM" | "DEFAULT";
export type Tag = {
  id: number;
  name: string;
  slug: string;
  type: TagType;
  organizationId?: number;
  userId: number;
  parentId?: number;
  taxonomyId?: number;
};

export type MetaSchema = {
  id: number;
  name: string;
  version: number;
  target: string;
  isDefault: boolean;
  schema: any;
  organizationId?: number;
  createdAt: string;
  updatedAt: string;
};

export type MetadataSchema = {
  type: string;
  required: string[];
  properties: Record<
    string,
    {
      type: string;
      [key: string]: string;
    }
  >;
};

export type CreatePostInput = {
  title: string;
  content: string;
  contentJson?: unknown;
  status: "DRAFT" | "PUBLISHED";
  metadata?: unknown;
  metaSchemaId?: number;
  tagIds?: number[];
};

export type PublizFile = {
  id: number;
  contentType: string;
  fileName: string;
  filePath: string;
  metadata?: Partial<{
    size: string;
    userId: number;
    modelId: string;
    blurHash: string;
    fileName: string;
    modelName: string;
    gcsImageServingUrl: string;
  }>;
  title?: string;
  description?: string;
  userId: number;
  fileUrl: string;
};

export type UpdatePostInput = CreatePostInput;
export type UpdateUserInput = {
  displayName: string;
};

export type MyOrganization = Organization & {
  organizationRoleIds: number[];
};

export type OrganizationUser = User & {
  organizationRoleIds: number[];
};

export type Post = {
  id: string;
  title: string;
  content: string;
  parentId?: number;
  type: "POST" | "REVISION";
  status: "PUBLISHED" | "DRAFT";
  metadata: any;
  createdAt: string;
  contentJson: any;
  metaSchema: string;
  tags?: Tag[];
  authorId: number;
  author?: Omit<User, "authId">;
  organization?: Organization;
};

type GetTaxonomiesPostsQuery = {
  before?: string;
  after?: string;
  pageSize?: number;
  tag?: string;
  context?: string;
};
export const publizFetch = $fetch.create({
  baseURL: import.meta.env.VITE_PUBLIZ_API_URL,
  async onRequest(ctx) {
    const currentUser = await getCurrentUser();
    const token = await currentUser?.getIdToken();

    if (token) {
      ctx.options.headers = {
        ...ctx.options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  },
});

export function usePublizFetch<T>(
  url: string | (() => string),
  options: UseFetchOptions<T> = {}
) {
  const runtimeConfig = useRuntimeConfig();
  const defaults: UseFetchOptions<T> = {
    baseURL: runtimeConfig.public.publizApiUrl,
    async onRequest(ctx) {
      const currentUser = await getCurrentUser();
      const token = await currentUser?.getIdToken();

      if (token) {
        ctx.options.headers = {
          ...ctx.options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    },
  };

  const params = defu(options, defaults);
  return useFetch(url, params);
}

export const useGetMyProfile = (
  options: UseFetchOptions<BaseResponse<User>> = {}
) => {
  return usePublizFetch<BaseResponse<User>>("api/v1/users/my_profile", options);
};

export const useGetMyOrganizations = (
  options: UseFetchOptions<BaseResponse<MyOrganization[]>>
) => {
  return usePublizFetch<BaseResponse<MyOrganization[]>>(
    "api/v1/my_organizations",
    options
  );
};

export const useGetTaxonomies = () => {
  return usePublizFetch<BaseResponse<Taxonomy[]>>("api/v1/taxonomies");
};

export const useGetTaxonomyTags = (taxonomy: string | number) => {
  return usePublizFetch<BaseResponse<Tag[]>>(
    `api/v1/taxonomies/${taxonomy}/tags`
  );
};

export const useGetTags = () => {
  return usePublizFetch<BaseResponse<Tag[]>>("api/v1/tags");
};

export const useGetSystemMetaSchemas = () => {
  return usePublizFetch<BaseResponse<MetaSchema[]>>("api/v1/meta_schemas");
};

export const uploadMyFile = (formData: FormData) => {
  return publizFetch<BaseResponse<PublizFile>>("api/v1/my_files", {
    body: formData,
    method: "POST",
  });
};

export const useGetMetaSchema = async (identifier: string) => {
  return usePublizFetch<BaseResponse<MetaSchema>>(
    `api/v1/meta_schemas/${identifier}`
  );
};

export const createOrganizationPost = (
  organizationId: number,
  input: CreatePostInput
) => {
  return publizFetch<BaseResponse<Post>>(
    `api/v1/my_organizations/${organizationId}/posts`,
    {
      body: input,
      method: "POST",
    }
  );
};

export const updateOrganizationPost = (
  organizationId: number,
  id: string,
  input: UpdatePostInput
) => {
  return publizFetch<BaseResponse<Post>>(
    `api/v1/my_organizations/${organizationId}/posts/${id}`,
    {
      body: input,
      method: "PUT",
    }
  );
};

export const updateMyProfile = (input: UpdateUserInput) => {
  return publizFetch<BaseResponse<User>>("api/v1/users/my_profile", {
    body: input,
    method: "PUT",
  });
};

export const createMyPost = (input: CreatePostInput) => {
  return publizFetch<BaseResponse<Post>>("api/v1/my_posts", {
    body: input,
    method: "POST",
  });
};

export const updateMyPost = (id: string, input: UpdatePostInput) => {
  return publizFetch<BaseResponse<Post>>(`api/v1/my_posts/${id}`, {
    body: input,
    method: "PUT",
  });
};

export const useGetTaxonomyPosts = (
  taxonomy: string | number,
  query: GetTaxonomiesPostsQuery | Ref<GetTaxonomiesPostsQuery>
) => {
  return usePublizFetch<BaseResponse<Post[]>>(
    `api/v1/taxonomies/${taxonomy}/posts`,
    {
      params: query,
    }
  );
};

type GetCollectionPostsQuery = {
  before?: string;
  after?: string;
  pageSize?: number;
  tag?: string;
};

export const useGetCollectionPosts = (
  collection: string | number,
  query: GetCollectionPostsQuery | Ref<GetCollectionPostsQuery>
) => {
  return usePublizFetch<BaseResponse<Post[]>>(
    `api/v1/collections/${collection}/posts`,
    {
      params: query,
    }
  );
};

type GetModeratingPostsQuery = {
  before?: string;
  after?: string;
  pageSize?: number;
};
export const useGetModeratingPosts = (
  query: GetModeratingPostsQuery | Ref<GetModeratingPostsQuery>
) => {
  return usePublizFetch<BaseResponse<Post[]>>("api/v1/moderating_posts", {
    params: query,
  });
};

type GetPostQuery = {
  context?: string;
};

export const useGetPost = (
  id: number | string,
  query?: GetPostQuery | Ref<GetPostQuery>
) => {
  return usePublizFetch<BaseResponse<Post>>(`api/v1/posts/${id}`, {
    params: query,
  });
};

export const useGetUser = (id: number | string) => {
  return usePublizFetch<BaseResponse<Post>>(`api/v1/users/${id}`);
};

export const uploadMyProfileImage = (formData: FormData) => {
  return publizFetch<BaseResponse<PublizFile>>(
    "api/v1/users/my_profile/image",
    {
      body: formData,
      method: "PATCH",
    }
  );
};

export const getPostPath = (post: Post, schema = "thread") =>
  `/${schema}/${slugify(post.title.toLowerCase())}-${post.id}`;

type GetMetaSchemaPostsQuery = {
  before?: string;
  after?: string;
  pageSize?: number;
};

export const useGetMetaSchemaPosts = (
  metaSchemaId: number | string,
  query?: GetMetaSchemaPostsQuery | Ref<GetMetaSchemaPostsQuery>
) => {
  return usePublizFetch<BaseResponse<Post[]>>(
    `api/v1/meta_schemas/${metaSchemaId}/posts`,
    {
      params: query,
    }
  );
};

export type OrganizationRole = {
  name: string;
  id: number;
  organizationId: number;
};

export const getOrganizationRoles = (organizationId: number) => {
  return publizFetch<BaseResponse<OrganizationRole[]>>(
    `api/v1/my_organizations/${organizationId}/roles`
  );
};

export const useGetOrganizationById = (idOrSlug: number | string) => {
  return usePublizFetch<BaseResponse<Organization>>(
    `api/v1/organizations/${idOrSlug}`
  );
};

export const uploadOrganizationImage = (
  organizationId: number,
  formData: FormData
) => {
  return publizFetch<BaseResponse<PublizFile>>(
    `api/v1/my_organizations/${organizationId}/image`,
    {
      body: formData,
      method: "PATCH",
    }
  );
};

export const useGetApplicableOrganizationMetaSchemas = (
  organizationId: number
) => {
  return usePublizFetch<BaseResponse<MetaSchema[]>>(
    `api/v1/my_organizations/${organizationId}/applicable_meta_schemas`
  );
};

export const updateOrganizationMetadata = (
  organizationId: number,
  payload: { metaSchemaId: number; metadata: Record<string, string> }
) => {
  return publizFetch<BaseResponse<any>>(
    `api/v1/my_organizations/${organizationId}/metadata`,
    {
      body: payload,
      method: "PATCH",
    }
  );
};

export const useGetOrganizationPosts = (
  organizationId: number | string,
  options?: UseFetchOptions<BaseResponse<Post[]>>
) => {
  return usePublizFetch<BaseResponse<Post[]>>(
    `api/v1/organizations/${organizationId}/posts`,
    options
  );
};

export const useGetMyOrganizationPost = (
  organizationId: number,
  id: number
) => {
  return usePublizFetch<BaseResponse<Post>>(
    `api/v1/my_organizations/${organizationId}/posts/${id}`
  );
};

export const useGetOrganizations = () => {
  return usePublizFetch<BaseResponse<Organization[]>>("api/v1/organizations");
};

export const useGetUserPosts = (userId: number | string) => {
  return usePublizFetch<BaseResponse<Post[]>>(`api/v1/users/${userId}/posts`);
};

export const useGetMyPosts = () => {
  return usePublizFetch<BaseResponse<Post[]>>("api/v1/my_posts");
};
