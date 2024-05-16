<template>
  <Container v-if="post" class="max-w-6xl">
    <div class="bg-white mt-4 py-4 px-4 rounded-lg">
      <h1 class="text-3xl font-medium text-gray-700 mb-4">
        {{ post.title }}
      </h1>
      <div class="grid grid-cols-12">
        <div class="col-span-12 lg:col-span-8">
          <p class="mb-2">{{ post.metadata?.excerpt }}</p>

          <article class="prose" v-html="post.content" />
        </div>
        <div class="col-span-12 lg:col-span-4">
          <div class="space-y-3">
            <div
              class="flex items-center space-x-2 text-gray-500"
              v-if="post.metadata?.salary"
            >
              <BadgeDollarSign class="w-6 h-6" />
              <div>
                <div>Salary</div>
                <div class="text-primary font-medium">
                  {{ post.metadata?.salary }}
                </div>
              </div>
            </div>
            <div
              class="flex items-center space-x-2 text-gray-500"
              v-if="post.metadata?.submissionDeadline"
            >
              <CalendarDays class="w-6 h-6" />
              <div>
                <div>Dates</div>
                <div class="text-primary font-medium">
                  {{ post.metadata?.submissionDeadline }}
                </div>
              </div>
            </div>
            <div
              class="flex items-center space-x-2 text-gray-500"
              v-if="post.metadata?.location"
            >
              <MapPin class="w-6 h-6" />
              <div>
                <div>Location</div>
                <div class="text-primary font-medium">
                  {{ post.metadata?.location }}
                </div>
              </div>
            </div>
            <div
              class="flex items-center space-x-2 text-gray-500"
              v-if="post.metadata?.workType"
            >
              <Clock class="w-6 h-6" />
              <div>
                <div>Work type</div>
                <div class="text-primary font-medium">
                  {{ workTypeDictionary[post.metadata?.workType] }}
                </div>
              </div>
            </div>
            <div
              class="flex items-center space-x-2 text-gray-500"
              v-if="post.metadata?.department"
            >
              <Factory class="w-6 h-6" />
              <div>
                <div>Department</div>
                <div class="text-primary font-medium">
                  {{ post.metadata?.department }}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-3 pl-8">
            <Button
              as="a"
              :href="`mailto:${post.metadata?.contactEmail}?subject=Application for ${post.title}`"
              variant="outline"
              class="w-full"
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>

<script setup lang="ts">
import { decodeId } from "~/lib/id";
import { useGetPost } from "~/lib/publiz";
import {
  Factory,
  MapPin,
  Clock,
  BadgeDollarSign,
  CalendarDays,
} from "lucide-vue-next";

const workTypeDictionary: Record<string, string> = {
  FULL_TIME: "Full time",
  PART_TIME: "Part time",
  CONTRACT: "Contract",
  FREELANCE: "Freelance",
  INTERNSHIP: "Internship",
};
const route = useRoute();
const idString = String(route.params.slug).split("-").pop();
const id = idString ? decodeId(idString) : 0;

const { data } = useGetPost(id);
const post = computed(() => data.value?.data);
</script>
