<template>
  <a
    :href="jobLink"
    target="_blank"
    class="bg-white rounded-lg px-4 py-3 block"
  >
    <div class="flex items-start">
      <div class="w-14 aspect-square mr-3">
        <Avatar
          v-if="post.organization?.metadata?.avatar?.src"
          shape="square"
          class="w-full h-full"
        >
          <AvatarImage :src="post.organization.metadata.avatar.src" alt="" />
        </Avatar>
      </div>
      <div class="flex-1">
        <h3 class="leading-6 text-lg">{{ post.title }}</h3>
        <p class="mb-6 text-sm text-gray-600">
          At {{ post.organization?.name }}
        </p>
        <div class="space-y-2">
          <div class="flex items-center space-x-1 text-sm text-gray-500">
            <BadgeDollarSign class="w-4 h-4" />
            <span>Salary</span>:
            <span class="text-green-600 font-medium">{{
              post.metadata?.salary
            }}</span>
          </div>
          <div
            class="flex items-center space-x-1 text-sm text-gray-500"
            v-if="post.metadata?.submissionDeadline"
          >
            <CalendarDays class="w-4 h-4" />
            <span>Dates</span>:
            <span>
              {{ post.metadata?.submissionDeadline }}
            </span>
          </div>
        </div>
      </div>
      <div class="flex space-x-2">
        <div
          class="flex bg-red-100 text-red-400 rounded-full px-2 py-1 text-sm items-center space-x-1"
          v-if="post.metadata?.location"
        >
          <MapPin class="w-4 h-4" />
          <span>
            {{ post.metadata?.location }}
          </span>
        </div>
        <div
          class="bg-green-100 text-green-500 rounded-full px-2 py-1 text-sm items-center space-x-1 hidden lg:flex"
        >
          <Clock class="w-4 h-4" />
          <span>
            {{ workTypeDictionary[post.metadata?.workType] }}
          </span>
        </div>
      </div>
    </div>
  </a>
</template>

<script setup lang="ts">
import { MapPin, Clock, BadgeDollarSign, CalendarDays } from "lucide-vue-next";
import { type Post, getPostPath } from "~/lib/publiz";
import { useBuildTenantUrl } from "~/lib/utils";

const workTypeDictionary: Record<string, string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
};

const props = defineProps<{ post: Post }>();

const jobLink = computed(() => {
  if (props.post.organization) {
    const tenantBase = useBuildTenantUrl(props.post.organization.slug);
    return `${tenantBase}${getPostPath(props.post, "job")}`;
  }
  return getPostPath(props.post, "job");
});
</script>
