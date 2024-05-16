<template>
  <NuxtLink
    :to="getPostPath(post, 'job')"
    class="bg-white rounded-lg px-4 py-3 block"
  >
    <div class="flex items-start">
      <div class="flex-1">
        <h3 class="leading-6 mb-3">{{ post.title }}</h3>

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
            <span class="text-green-600 font-medium">
              {{ post.metadata?.submissionDeadline }}
            </span>
          </div>
          <div
            class="flex items-center space-x-1 text-sm text-gray-500"
            v-if="post.metadata?.location"
          >
            <MapPin class="w-4 h-4" />
            <span>Location</span>:
            <span class="text-green-600 font-medium">
              {{ post.metadata?.location }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { MapPin, Clock, BadgeDollarSign, CalendarDays } from "lucide-vue-next";
import { type Post, getPostPath } from "~/lib/publiz";
import { slugify } from "~/lib/slugify";
import { encodeId } from "~/lib/id";

const workTypeDictionary: Record<string, string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
};

const props = defineProps<{ post: Post }>();
</script>
