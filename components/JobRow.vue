<template>
  <div class="hover:bg-gray-50 rounded-lg w-full -translate-x-2">
    <NuxtLink
      :to="getPostPath(job, 'job')"
      class="px-2 py-2 duration-600 ease-in-out transition-colors block"
    >
      <div class="flex">
        <div class="flex-1">
          <h3 class="leading-6 mb-1">{{ job.title }}</h3>
        </div>
        <div class="flex space-x-2">
          <div
            class="hidden lg:flex bg-red-200 text-red-500 rounded-full px-2 py-1/2 lg:py-1 text-sm items-center space-x-1"
            v-if="job.metadata?.location"
          >
            <MapPin class="w-4 h-4" />
            <span>
              {{ job.metadata?.location }}
            </span>
          </div>
          <div
            class="flex bg-green-200 text-green-600 rounded-full px-2 py-1 text-xs lg:text-sm items-center space-x-1"
          >
            <Clock class="w-4 h-4" />
            <span>
              {{ workTypeDictionary[job.metadata?.workType] }}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center space-x-1 text-sm text-gray-500">
          <BadgeDollarSign class="w-4 h-4" />
          <span>Salary</span>:
          <span class="text-green-600 font-medium">{{
            job.metadata?.salary
          }}</span>
        </div>
        <div
          class="flex items-center space-x-1 text-sm text-gray-500"
          v-if="job.metadata?.submissionDeadline"
        >
          <CalendarDays class="w-4 h-4" />
          <span>Dates</span>:
          <span class="text-green-600 font-medium">
            {{ job.metadata?.submissionDeadline }}
          </span>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Clock, BadgeDollarSign, CalendarDays } from "lucide-vue-next";
import { type Post, getPostPath } from "~/lib/publiz";

const workTypeDictionary: Record<string, string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
};

defineProps<{ job: Post }>();
</script>
