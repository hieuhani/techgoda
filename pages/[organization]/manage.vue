<template>
  <Container class="grid grid-cols-12 gap-3" v-if="amIOrganizationAdmin">
    <div class="col-span-2">
      <div v-if="organization" class="px-2 py-2 mb-4 text-center space-y-3">
        <Avatar size="lg">
          <AvatarImage
            :src="organization.metadata.avatar.src"
            v-if="organization.metadata?.avatar?.src"
            alt=""
          />
        </Avatar>
        <div>
          <h3 class="font-medium leading-5">{{ organization.name }}</h3>
        </div>
      </div>
      <ul
        class="space-y-1 flex items-center lg:block flex-nowrap overflow-x-auto mb-4"
      >
        <li v-for="item in menuItems" :key="item.path" class="shrink-0">
          <NuxtLink
            :to="item.path"
            :class="[
              'block py-1 px-3 rounded-full',
              route.fullPath.startsWith(item.path) && item.path !== '/'
                ? 'bg-primary text-white'
                : 'hover:bg-gray-50',
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="col-span-10">
      <ClientOnly>
        <NuxtPage />
      </ClientOnly>
    </div>
  </Container>
  <Container v-else>
    <h3 class="text-4xl text-center pt-24 text-gray-700">403</h3>
  </Container>
</template>

<script setup lang="ts">
import type { Organization } from "~/lib/publiz";

definePageMeta({
  layout: "tenant",
});

const organization = inject<Ref<Organization | undefined>>("organization");

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Posts",
    path: "/manage/posts",
  },
  {
    name: "Taxonomies",
    path: "/manage/taxonomies",
  },
  {
    name: "Tags",
    path: "/manage/tags",
  },
  {
    name: "Meta schemas",
    path: "/manage/meta-schemas",
  },
  {
    name: "Settings",
    path: "/manage/settings",
  },
];

const route = useRoute();
const amIOrganizationAdmin = inject<boolean>("amIOrganizationAdmin");
</script>
