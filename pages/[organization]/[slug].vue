<template>
  <Container v-if="post" class="max-w-3xl">
    <div>
      <h1 class="text-3xl font-medium text-gray-700 mb-4">
        {{ post.title }}
      </h1>
      <NuxtLink
        v-if="organization"
        class="flex items-center space-x-2 group mb-4"
        to="/"
      >
        <Avatar size="sm" class="border-2">
          <AvatarImage
            :src="organization.metadata.avatar.src"
            v-if="organization.metadata?.avatar?.src"
            alt=""
          />
          <AvatarFallback>LN</AvatarFallback>
        </Avatar>
        <div>
          <h1 class="font-medium leading-3 group-hover:text-primary">
            {{ organization.name }}
          </h1>
          <time class="text-xs"> {{ $dayjs(post.createdAt).fromNow() }}</time>
        </div>
      </NuxtLink>
      <p class="mb-2">{{ post.metadata?.excerpt }}</p>

      <article class="prose" v-html="post.content" />
    </div>
  </Container>
</template>

<script setup lang="ts">
import { decodeId } from "~/lib/id";
import { useGetPost, type Organization } from "~/lib/publiz";

definePageMeta({
  layout: "tenant",
});

const route = useRoute();
const idString = String(route.params.slug).split("-").pop();
const id = idString ? decodeId(idString) : 0;

const { data } = useGetPost(id);
const post = computed(() => data.value?.data);
const organization = inject<Ref<Organization | undefined>>("organization");
</script>
